import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { checkTransactionStatus, isPaymentSuccess } from '@/lib/icici-pg';

/**
 * GET /api/cne/payment/status?merchantTxnNo=...
 * 
 * Calls ICICI status check API and updates local records.
 * Useful for reconciliation or when callback was missed.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantTxnNo = searchParams.get('merchantTxnNo');

    if (!merchantTxnNo) {
      return NextResponse.json(
        { success: false, error: 'merchantTxnNo is required' },
        { status: 400 }
      );
    }

    // Look up local transaction record
    const [txns] = await db.query<RowDataPacket[]>(
      `SELECT pt.*, r.paymentStatus as regPaymentStatus, r.fullName, r.formNumber,
              w.title as workshopTitle, w.date as workshopDate, w.venue as workshopVenue
       FROM payment_transactions pt
       JOIN registrations r ON pt.registrationId = r.id
       JOIN workshops w ON pt.workshopId = w.id
       WHERE pt.merchantTxnNo = ?`,
      [merchantTxnNo]
    );

    if (txns.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Transaction not found' },
        { status: 404 }
      );
    }

    const txn = txns[0];

    // Call ICICI status check API
    const statusResult = await checkTransactionStatus(merchantTxnNo);

    if (statusResult.success && statusResult.data) {
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
          merchantTxnNo,
        ]
      );

      // If ICICI says success but we haven't updated the registration yet
      if (paymentSuccess && txn.regPaymentStatus !== 'success') {
        // Process the successful payment (same logic as callback)
        const connection = await db.getConnection();
        try {
          await connection.beginTransaction();

          const [regs] = await connection.query<RowDataPacket[]>(
            "SELECT id, registrationType, workshopId FROM registrations WHERE id = ? AND paymentStatus != 'success' FOR UPDATE",
            [txn.registrationId]
          );

          if (regs.length > 0) {
            const reg = regs[0];
            const paymentRef = iciciData.paymentID || iciciData.PaymentID || merchantTxnNo;

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
        transaction: {
          merchantTxnNo: txn.merchantTxnNo,
          status: paymentSuccess ? 'success' : txn.status,
          amount: txn.amount,
          iciciResponseCode: responseCode,
          iciciResponseDesc: iciciData.respdescription || iciciData.ResponseDescription,
        },
        registration: {
          fullName: txn.fullName,
          formNumber: txn.formNumber,
          paymentStatus: paymentSuccess ? 'success' : txn.regPaymentStatus,
          workshopTitle: txn.workshopTitle,
        },
        iciciRawResponse: statusResult.data,
      });
    }

    // If ICICI call failed, return local data
    return NextResponse.json({
      success: true,
      transaction: {
        merchantTxnNo: txn.merchantTxnNo,
        status: txn.status,
        amount: txn.amount,
        iciciResponseCode: txn.iciciResponseCode,
        iciciResponseDesc: txn.iciciResponseDesc,
      },
      registration: {
        fullName: txn.fullName,
        formNumber: txn.formNumber,
        paymentStatus: txn.regPaymentStatus,
        workshopTitle: txn.workshopTitle,
      },
      iciciStatusCheckError: statusResult.error,
    });
  } catch (error: any) {
    console.error('Error checking payment status:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to check payment status' },
      { status: 500 }
    );
  }
}
