import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import db from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { checkTransactionStatus, isPaymentSuccess } from '@/lib/icici-pg';

/**
 * GET /api/cne/payment/cleanup
 * 
 * Admin-only endpoint to clean up stale pending payments.
 * Finds registrations with paymentStatus='pending' older than 30 minutes,
 * checks each with ICICI, and updates accordingly.
 */
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const cookieStore = await cookies();
    const session = cookieStore.get('cne_admin_session');

    if (session?.value !== 'authenticated') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Find stale pending transactions (older than 30 minutes)
    const [staleTxns] = await db.query<RowDataPacket[]>(
      `SELECT pt.*, r.paymentStatus as regPaymentStatus, r.registrationType
       FROM payment_transactions pt
       JOIN registrations r ON pt.registrationId = r.id
       WHERE pt.status IN ('initiated', 'redirected')
         AND pt.initiatedAt < DATE_SUB(NOW(), INTERVAL 30 MINUTE)
       ORDER BY pt.initiatedAt ASC
       LIMIT 50`
    );

    const results = {
      total: staleTxns.length,
      resolved: 0,
      markedSuccess: 0,
      markedTimeout: 0,
      errors: 0,
      details: [] as any[],
    };

    for (const txn of staleTxns) {
      try {
        // Check with ICICI
        const statusResult = await checkTransactionStatus(txn.merchantTxnNo);

        if (statusResult.success && statusResult.data) {
          const responseCode = statusResult.data.responseCode || statusResult.data.ResponseCode || '';
          const paymentSuccess = isPaymentSuccess(responseCode);

          if (paymentSuccess && txn.regPaymentStatus !== 'success') {
            // Payment was actually successful — process it
            const connection = await db.getConnection();
            try {
              await connection.beginTransaction();

              const [regs] = await connection.query<RowDataPacket[]>(
                "SELECT id, registrationType, workshopId FROM registrations WHERE id = ? AND paymentStatus != 'success' FOR UPDATE",
                [txn.registrationId]
              );

              if (regs.length > 0) {
                const reg = regs[0];
                const paymentRef = statusResult.data.paymentID || statusResult.data.PaymentID || txn.merchantTxnNo;

                await connection.query<ResultSetHeader>(
                  "UPDATE registrations SET paymentStatus = 'success', paymentUTR = ?, attendanceStatus = ? WHERE id = ?",
                  [paymentRef, reg.registrationType === 'spot' ? 'present' : 'applied', reg.id]
                );

                if (reg.registrationType === 'spot') {
                  await connection.query<ResultSetHeader>(
                    `UPDATE workshops SET currentSpotRegistrations = currentSpotRegistrations + 1, currentRegistrations = currentRegistrations + 1 WHERE id = ?`,
                    [reg.workshopId]
                  );
                } else {
                  await connection.query<ResultSetHeader>(
                    'UPDATE workshops SET currentRegistrations = currentRegistrations + 1 WHERE id = ?',
                    [reg.workshopId]
                  );
                }
              }

              await connection.query<ResultSetHeader>(
                `UPDATE payment_transactions SET status = 'success', rawResponse = ?, completedAt = NOW() WHERE id = ?`,
                [statusResult.rawResponse || null, txn.id]
              );

              await connection.commit();
              results.markedSuccess++;
            } catch (err) {
              await connection.rollback();
              throw err;
            } finally {
              connection.release();
            }
          } else if (!paymentSuccess) {
            // Payment failed or not found — mark as timeout
            await db.query<ResultSetHeader>(
              "UPDATE payment_transactions SET status = 'timeout', rawResponse = ?, completedAt = NOW() WHERE id = ?",
              [statusResult.rawResponse || null, txn.id]
            );
            await db.query<ResultSetHeader>(
              "UPDATE registrations SET paymentStatus = 'timeout' WHERE id = ? AND paymentStatus = 'pending'",
              [txn.registrationId]
            );
            results.markedTimeout++;
          }
          results.resolved++;
        } else {
          // ICICI status check failed — mark as timeout for very old transactions
          const initiatedTime = new Date(txn.initiatedAt).getTime();
          const now = Date.now();
          const hoursSinceInitiated = (now - initiatedTime) / (1000 * 60 * 60);

          if (hoursSinceInitiated > 2) {
            await db.query<ResultSetHeader>(
              "UPDATE payment_transactions SET status = 'timeout', completedAt = NOW() WHERE id = ?",
              [txn.id]
            );
            await db.query<ResultSetHeader>(
              "UPDATE registrations SET paymentStatus = 'timeout' WHERE id = ? AND paymentStatus = 'pending'",
              [txn.registrationId]
            );
            results.markedTimeout++;
            results.resolved++;
          }
        }

        results.details.push({
          merchantTxnNo: txn.merchantTxnNo,
          registrationId: txn.registrationId,
          action: 'processed',
        });
      } catch (err: any) {
        results.errors++;
        results.details.push({
          merchantTxnNo: txn.merchantTxnNo,
          registrationId: txn.registrationId,
          action: 'error',
          error: err.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Cleanup complete: ${results.resolved} resolved, ${results.markedSuccess} marked success, ${results.markedTimeout} marked timeout, ${results.errors} errors`,
      results,
    });
  } catch (error: any) {
    console.error('Error in payment cleanup:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Cleanup failed' },
      { status: 500 }
    );
  }
}
