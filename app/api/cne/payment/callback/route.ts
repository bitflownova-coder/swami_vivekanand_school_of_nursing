import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { verifySecureHash, isPaymentSuccess } from '@/lib/icici-pg';

/**
 * ICICI Orange PG Callback Handler
 *
 * ICICI redirects the user here (via browser POST/GET) after payment.
 * We process the response, update DB, then redirect to our frontend result page.
 */

async function handleCallback(params: Record<string, string>) {
  const {
    merchantTxnNo,
    responseCode,
    respdescription,
    paymentID,
    txnID,
    amount,
    paymentMode,
    paymentSubInstType,
    paymentDateTime,
    securehash,
    addlParam1: registrationId,
    addlParam2: workshopId,
    merchantId,
    customerEmailID,
    customerMobileNo,
    addlParam1,
    addlParam2,
  } = params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!merchantTxnNo) {
    return NextResponse.redirect(
      `${baseUrl}/cne/payment/result?status=error&message=Missing+transaction+reference`,
      { status: 302 }
    );
  }

  // Look up the payment transaction record
  const [txns] = await db.query<RowDataPacket[]>(
    'SELECT * FROM payment_transactions WHERE merchantTxnNo = ?',
    [merchantTxnNo]
  );

  if (txns.length === 0) {
    return NextResponse.redirect(
      `${baseUrl}/cne/payment/result?status=error&message=Transaction+not+found`,
      { status: 302 }
    );
  }

  const txn = txns[0];

  // Verify secure hash from ICICI response
  const hashValid = securehash
    ? verifySecureHash(params, securehash)
    : false;

  if (!hashValid) {
    await db.query<ResultSetHeader>(
      `UPDATE payment_transactions SET
        status = 'failed',
        iciciResponseDesc = COALESCE(?, iciciResponseDesc),
        secureHashReceived = ?,
        rawResponse = ?,
        completedAt = NOW()
      WHERE merchantTxnNo = ?`,
      [
        'Invalid secure hash in callback',
        securehash || null,
        JSON.stringify(params),
        merchantTxnNo,
      ]
    );

    return NextResponse.redirect(
      `${baseUrl}/cne/payment/result?merchantTxnNo=${merchantTxnNo}&status=error&message=Invalid+payment+signature`,
      { status: 302 }
    );
  }

  // Store the raw response
  const rawResponse = JSON.stringify(params);

  // Determine if payment was successful
  const paymentSuccess = responseCode ? isPaymentSuccess(responseCode) : false;

  // Update the payment transaction record
  await db.query<ResultSetHeader>(
    `UPDATE payment_transactions SET
      status = ?,
      iciciResponseCode = ?,
      iciciResponseDesc = ?,
      iciciPaymentId = ?,
      iciciTxnId = ?,
      paymentMode = ?,
      paymentSubInstType = ?,
      secureHashReceived = ?,
      rawResponse = ?,
      completedAt = NOW()
    WHERE merchantTxnNo = ?`,
    [
      paymentSuccess ? 'success' : 'failed',
      responseCode || null,
      respdescription || null,
      paymentID || null,
      txnID || null,
      paymentMode || null,
      paymentSubInstType || null,
      securehash || null,
      rawResponse,
      merchantTxnNo,
    ]
  );

  if (paymentSuccess) {
    // Use a DB transaction to atomically:
    // 1. Update registration to success
    // 2. Increment workshop seat count
    // 3. Handle workshop full status
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Check if registration is still pending (avoid double-processing)
      const [regs] = await connection.query<RowDataPacket[]>(
        "SELECT id, paymentStatus, registrationType, workshopId FROM registrations WHERE id = ? FOR UPDATE",
        [txn.registrationId]
      );

      if (regs.length === 0) {
        await connection.rollback();
        return NextResponse.redirect(
          `${baseUrl}/cne/payment/result?status=error&message=Registration+not+found`,
          { status: 302 }
        );
      }

      const reg = regs[0];

      if (reg.paymentStatus === 'success') {
        // Already processed (e.g., duplicate callback) — just redirect to success
        await connection.rollback();
        return NextResponse.redirect(
          `${baseUrl}/cne/payment/result?merchantTxnNo=${merchantTxnNo}&status=success`,
          { status: 302 }
        );
      }

      // Check seat availability one more time inside the transaction
      const [workshop] = await connection.query<RowDataPacket[]>(
        'SELECT maxSeats, currentRegistrations, currentSpotRegistrations, spotRegistrationLimit FROM workshops WHERE id = ? FOR UPDATE',
        [reg.workshopId]
      );

      if (workshop.length === 0) {
        await connection.rollback();
        return NextResponse.redirect(
          `${baseUrl}/cne/payment/result?status=error&message=Workshop+not+found`,
          { status: 302 }
        );
      }

      const ws = workshop[0];

      // Final seat availability check
      if (ws.currentRegistrations >= ws.maxSeats) {
        await connection.rollback();
        // Mark payment as success but registration can't be completed — needs refund
        await db.query<ResultSetHeader>(
          "UPDATE registrations SET paymentStatus = 'failed' WHERE id = ?",
          [txn.registrationId]
        );
        return NextResponse.redirect(
          `${baseUrl}/cne/payment/result?merchantTxnNo=${merchantTxnNo}&status=full`,
          { status: 302 }
        );
      }

      // Update registration to success
      await connection.query<ResultSetHeader>(
        `UPDATE registrations SET
          paymentStatus = 'success',
          paymentUTR = ?,
          attendanceStatus = ?
        WHERE id = ?`,
        [
          paymentID || txnID || merchantTxnNo,
          reg.registrationType === 'spot' ? 'present' : 'applied',
          txn.registrationId,
        ]
      );

      // Increment seat count
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

      // Check if workshop is now full
      const [updatedWs] = await connection.query<RowDataPacket[]>(
        'SELECT currentRegistrations, maxSeats FROM workshops WHERE id = ?',
        [reg.workshopId]
      );
      if (updatedWs.length > 0 && updatedWs[0].currentRegistrations >= updatedWs[0].maxSeats) {
        await connection.query<ResultSetHeader>(
          "UPDATE workshops SET status = 'full' WHERE id = ?",
          [reg.workshopId]
        );
      }

      await connection.commit();
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }

    return NextResponse.redirect(
      `${baseUrl}/cne/payment/result?merchantTxnNo=${merchantTxnNo}&status=success`,
      { status: 302 }
    );
  } else {
    // Payment failed — update registration
    await db.query<ResultSetHeader>(
      "UPDATE registrations SET paymentStatus = 'failed' WHERE id = ?",
      [txn.registrationId]
    );

    return NextResponse.redirect(
      `${baseUrl}/cne/payment/result?merchantTxnNo=${merchantTxnNo}&status=failed`,
      { status: 302 }
    );
  }
}

/**
 * POST handler — ICICI typically sends a form POST to the return URL.
 */
export async function POST(request: NextRequest) {
  try {
    // ICICI may send as form-urlencoded or as query params
    let params: Record<string, string> = {};

    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        params[key] = value.toString();
      });
    } else if (contentType.includes('application/json')) {
      params = await request.json();
    }

    // Also merge any query string params (ICICI may append some)
    const url = new URL(request.url);
    url.searchParams.forEach((value, key) => {
      if (!params[key]) params[key] = value;
    });

    return await handleCallback(params);
  } catch (error: any) {
    console.error('Error in payment callback POST:', error);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    return NextResponse.redirect(
      `${baseUrl}/cne/payment/result?status=error&message=Internal+server+error`,
      { status: 302 }
    );
  }
}

/**
 * GET handler — Fallback in case ICICI redirects via GET.
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const params: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return await handleCallback(params);
  } catch (error: any) {
    console.error('Error in payment callback GET:', error);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    return NextResponse.redirect(
      `${baseUrl}/cne/payment/result?status=error&message=Internal+server+error`,
      { status: 302 }
    );
  }
}
