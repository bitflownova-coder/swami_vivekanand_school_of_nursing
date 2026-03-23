import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { checkTransactionStatus, isPaymentSuccess } from '@/lib/icici-pg';

/**
 * GET /api/cne/payment/verify?merchantTxnNo=...
 * 
 * Returns local payment status from the database (no ICICI API call).
 * Used by the frontend to check/display payment results.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantTxnNo = searchParams.get('merchantTxnNo');
    const forceRefresh = searchParams.get('forceRefresh') === 'true';

    if (!merchantTxnNo) {
      return NextResponse.json(
        { success: false, error: 'merchantTxnNo is required' },
        { status: 400 }
      );
    }

    const [txns] = await db.query<RowDataPacket[]>(
      `SELECT pt.merchantTxnNo, pt.amount, pt.status as txnStatus, 
              pt.workshopId as workshopDocId,
              pt.iciciResponseCode, pt.iciciResponseDesc, pt.iciciPaymentId,
              pt.paymentMode, pt.paymentSubInstType, pt.completedAt,
              r.id as registrationId, r.formNumber, r.fullName, r.mncUID, 
              r.mncRegistrationNumber, r.mobileNumber, r.paymentStatus, 
              r.paymentUTR, r.registrationType, r.attendanceStatus,
              w.title as workshopTitle, w.date as workshopDate, 
              w.venue as workshopVenue, w.dayOfWeek as workshopDayOfWeek,
              w.fee as workshopFee, w.credits as workshopCredits
       FROM payment_transactions pt
       JOIN registrations r ON pt.registrationId = r.id
       JOIN workshops w ON pt.workshopId = w.id
       WHERE pt.merchantTxnNo = ?
       ORDER BY pt.initiatedAt DESC
       LIMIT 1`,
      [merchantTxnNo]
    );

    if (txns.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Transaction not found' },
        { status: 404 }
      );
    }

    let txn = txns[0];

    // Optional reconciliation path: call ICICI and refresh local DB before returning data.
    if (forceRefresh) {
      const statusResult = await checkTransactionStatus(merchantTxnNo);

      if (statusResult.success && statusResult.data) {
        const iciciData = statusResult.data;
        const responseCode = iciciData.responseCode || iciciData.ResponseCode || '';
        const paymentSuccess = isPaymentSuccess(responseCode);

        await db.query<ResultSetHeader>(
          `UPDATE payment_transactions SET
            iciciResponseCode = COALESCE(?, iciciResponseCode),
            iciciResponseDesc = COALESCE(?, iciciResponseDesc),
            iciciPaymentId = COALESCE(?, iciciPaymentId),
            iciciTxnId = COALESCE(?, iciciTxnId),
            paymentMode = COALESCE(?, paymentMode),
            rawResponse = COALESCE(?, rawResponse),
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
            paymentSuccess ? 'success' : (txn.txnStatus === 'initiated' ? 'failed' : txn.txnStatus),
            merchantTxnNo,
          ]
        );

        if (paymentSuccess && txn.paymentStatus !== 'success') {
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

        // Re-read latest state after reconciliation updates.
        const [freshTxns] = await db.query<RowDataPacket[]>(
          `SELECT pt.merchantTxnNo, pt.amount, pt.status as txnStatus, 
              pt.workshopId as workshopDocId,
                  pt.iciciResponseCode, pt.iciciResponseDesc, pt.iciciPaymentId,
                  pt.paymentMode, pt.paymentSubInstType, pt.completedAt,
                  r.id as registrationId, r.formNumber, r.fullName, r.mncUID, 
                  r.mncRegistrationNumber, r.mobileNumber, r.paymentStatus, 
                  r.paymentUTR, r.registrationType, r.attendanceStatus,
                  w.title as workshopTitle, w.date as workshopDate, 
                  w.venue as workshopVenue, w.dayOfWeek as workshopDayOfWeek,
                  w.fee as workshopFee, w.credits as workshopCredits
           FROM payment_transactions pt
           JOIN registrations r ON pt.registrationId = r.id
           JOIN workshops w ON pt.workshopId = w.id
           WHERE pt.merchantTxnNo = ?
           ORDER BY pt.initiatedAt DESC
           LIMIT 1`,
          [merchantTxnNo]
        );

        if (freshTxns.length > 0) {
          txn = freshTxns[0];
        }
      }
    }

    return NextResponse.json({
      success: true,
      payment: {
        merchantTxnNo: txn.merchantTxnNo,
        amount: txn.amount,
        status: txn.txnStatus,
        responseCode: txn.iciciResponseCode,
        responseDesc: txn.iciciResponseDesc,
        paymentId: txn.iciciPaymentId,
        paymentMode: txn.paymentMode,
        paymentSubInstType: txn.paymentSubInstType,
        completedAt: txn.completedAt,
      },
      registration: {
        _id: txn.registrationId,
        formNumber: txn.formNumber,
        fullName: txn.fullName,
        mncUID: txn.mncUID,
        mncRegistrationNumber: txn.mncRegistrationNumber,
        mobileNumber: txn.mobileNumber,
        paymentStatus: txn.paymentStatus,
        paymentUTR: txn.paymentUTR,
        registrationType: txn.registrationType,
        attendanceStatus: txn.attendanceStatus,
        workshopId: {
          _id: txn.workshopDocId,
          title: txn.workshopTitle,
          date: txn.workshopDate,
          venue: txn.workshopVenue,
          dayOfWeek: txn.workshopDayOfWeek,
          fee: txn.workshopFee,
          credits: txn.workshopCredits,
        },
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
