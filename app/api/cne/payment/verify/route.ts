import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { RowDataPacket } from 'mysql2';

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

    if (!merchantTxnNo) {
      return NextResponse.json(
        { success: false, error: 'merchantTxnNo is required' },
        { status: 400 }
      );
    }

    const [txns] = await db.query<RowDataPacket[]>(
      `SELECT pt.merchantTxnNo, pt.amount, pt.status as txnStatus, 
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

    const txn = txns[0];

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
