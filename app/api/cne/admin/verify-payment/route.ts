import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import db from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { checkTransactionStatus, isPaymentSuccess } from '@/lib/icici-pg';

/**
 * POST /api/cne/admin/verify-payment
 *
 * Admin endpoint to reconcile a registration's payment by calling ICICI status check API.
 * Requires admin session.
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin session
    const cookieStore = await cookies();
    const session = cookieStore.get('cne_admin_session');
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { registrationId } = body;

    if (!registrationId) {
      return NextResponse.json(
        { success: false, error: 'registrationId is required' },
        { status: 400 }
      );
    }

    // Find the latest payment transaction for this registration
    const [txns] = await db.query<RowDataPacket[]>(
      `SELECT pt.*, r.paymentStatus as regPaymentStatus, r.fullName, r.formNumber,
              r.registrationType, r.workshopId,
              w.title as workshopTitle
       FROM payment_transactions pt
       JOIN registrations r ON pt.registrationId = r.id
       JOIN workshops w ON pt.workshopId = w.id
       WHERE pt.registrationId = ?
       ORDER BY pt.initiatedAt DESC
       LIMIT 1`,
      [registrationId]
    );

    if (txns.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No payment transaction found for this registration' },
        { status: 404 }
      );
    }

    const txn = txns[0];

    // Call ICICI status check API
    const statusResult = await checkTransactionStatus(txn.merchantTxnNo);

    if (!statusResult.success || !statusResult.data) {
      return NextResponse.json({
        success: false,
        error: statusResult.error || 'Failed to check transaction status with ICICI',
        currentStatus: {
          merchantTxnNo: txn.merchantTxnNo,
          txnStatus: txn.status,
          regPaymentStatus: txn.regPaymentStatus,
        },
      });
    }

    const iciciData = statusResult.data;
    const responseCode = iciciData.responseCode || iciciData.ResponseCode || '';
    const paymentSuccess = isPaymentSuccess(responseCode);

    // Update the payment_transactions record
    await db.query<ResultSetHeader>(
      `UPDATE payment_transactions SET
        iciciResponseCode = COALESCE(?, iciciResponseCode),
        iciciResponseDesc = COALESCE(?, iciciResponseDesc),
        iciciPaymentId = COALESCE(?, iciciPaymentId),
        iciciTxnId = COALESCE(?, iciciTxnId),
        paymentMode = COALESCE(?, paymentMode),
        rawResponse = ?,
        status = ?,
        completedAt = COALESCE(completedAt, NOW())
      WHERE merchantTxnNo = ?`,
      [
        responseCode || null,
        iciciData.respdescription || iciciData.ResponseDescription || null,
        iciciData.paymentID || iciciData.PaymentID || null,
        iciciData.txnID || iciciData.TxnID || null,
        iciciData.paymentMode || iciciData.PaymentMode || null,
        statusResult.rawResponse || null,
        paymentSuccess ? 'success' : (txn.status === 'initiated' ? 'failed' : txn.status),
        txn.merchantTxnNo,
      ]
    );

    // If ICICI says success but registration is not yet success, process it
    if (paymentSuccess && txn.regPaymentStatus !== 'success') {
      const connection = await db.getConnection();
      try {
        await connection.beginTransaction();

        const [regs] = await connection.query<RowDataPacket[]>(
          "SELECT id, registrationType, workshopId FROM registrations WHERE id = ? AND paymentStatus != 'success' FOR UPDATE",
          [registrationId]
        );

        if (regs.length > 0) {
          const reg = regs[0];
          const paymentRef = iciciData.paymentID || iciciData.PaymentID || txn.merchantTxnNo;

          await connection.query<ResultSetHeader>(
            `UPDATE registrations SET
              paymentStatus = 'success', paymentUTR = ?,
              attendanceStatus = ?
            WHERE id = ?`,
            [paymentRef, reg.registrationType === 'spot' ? 'present' : 'applied', reg.id]
          );

          if (reg.registrationType === 'spot') {
            await connection.query<ResultSetHeader>(
              `UPDATE workshops SET
                currentSpotRegistrations = currentSpotRegistrations + 1,
                currentRegistrations = currentRegistrations + 1
              WHERE id = ?`,
              [reg.workshopId]
            );
          } else {
            await connection.query<ResultSetHeader>(
              'UPDATE workshops SET currentRegistrations = currentRegistrations + 1 WHERE id = ?',
              [reg.workshopId]
            );
          }
        }

        await connection.commit();
      } catch (err) {
        await connection.rollback();
        throw err;
      } finally {
        connection.release();
      }
    }

    return NextResponse.json({
      success: true,
      paymentVerified: paymentSuccess,
      previousStatus: txn.regPaymentStatus,
      newStatus: paymentSuccess ? 'success' : txn.regPaymentStatus,
      transaction: {
        merchantTxnNo: txn.merchantTxnNo,
        iciciResponseCode: responseCode,
        iciciResponseDesc: iciciData.respdescription || iciciData.ResponseDescription || '',
        iciciPaymentId: iciciData.paymentID || iciciData.PaymentID || '',
        paymentMode: iciciData.paymentMode || iciciData.PaymentMode || '',
      },
      registration: {
        fullName: txn.fullName,
        formNumber: txn.formNumber,
        workshopTitle: txn.workshopTitle,
      },
    });
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
