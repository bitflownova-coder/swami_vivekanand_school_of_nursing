import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import {
  generateMerchantTxnNo,
  initiateSale,
  getICICIConfig,
} from '@/lib/icici-pg';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      workshopId,
      fullName,
      mncUID: rawMncUID,
      mncRegistrationNumber,
      mobileNumber,
      registrationType = 'online',
      spotToken,
    } = body;

    const mncUID = rawMncUID?.toUpperCase()?.trim();

    // Validation
    if (!workshopId || !fullName || !mncUID || !mncRegistrationNumber || !mobileNumber) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!/^[0-9]{10}$/.test(mobileNumber)) {
      return NextResponse.json(
        { success: false, error: 'Mobile number must be 10 digits' },
        { status: 400 }
      );
    }

    // Check workshop exists and is active
    const [workshops] = await db.query<RowDataPacket[]>(
      'SELECT * FROM workshops WHERE id = ?',
      [workshopId]
    );

    if (workshops.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Workshop not found' },
        { status: 404 }
      );
    }

    const workshop = workshops[0];

    // For spot registration, verify the spot token
    if (registrationType === 'spot') {
      if (!spotToken || workshop.spotRegistrationQRToken !== spotToken) {
        return NextResponse.json(
          { success: false, error: 'Invalid or expired spot registration token' },
          { status: 400 }
        );
      }
      if (!workshop.spotRegistrationEnabled) {
        return NextResponse.json(
          { success: false, error: 'Spot registration is not enabled' },
          { status: 400 }
        );
      }
    } else {
      if (!['active', 'spot'].includes(workshop.status)) {
        return NextResponse.json(
          { success: false, error: 'Workshop is not accepting registrations' },
          { status: 400 }
        );
      }
    }

    // Check seat availability (only count successful payments)
    const [successCount] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) as count FROM registrations WHERE workshopId = ? AND paymentStatus = 'success'",
      [workshopId]
    );
    const successfulRegs = successCount[0].count;

    if (registrationType === 'spot') {
      const [spotSuccessCount] = await db.query<RowDataPacket[]>(
        "SELECT COUNT(*) as count FROM registrations WHERE workshopId = ? AND registrationType = 'spot' AND paymentStatus = 'success'",
        [workshopId]
      );
      if (spotSuccessCount[0].count >= workshop.spotRegistrationLimit) {
        return NextResponse.json(
          { success: false, error: 'Spot registration limit reached' },
          { status: 400 }
        );
      }
    } else {
      if (successfulRegs >= workshop.maxSeats) {
        return NextResponse.json(
          { success: false, error: 'Workshop is full' },
          { status: 400 }
        );
      }
    }

    // Check for duplicate registration
    const [existingRegs] = await db.query<RowDataPacket[]>(
      'SELECT id, paymentStatus FROM registrations WHERE workshopId = ? AND mncUID = ?',
      [workshopId, mncUID]
    );

    let registrationId: string;
    let formNumber: number;

    if (existingRegs.length > 0) {
      const existingReg = existingRegs[0];

      if (existingReg.paymentStatus === 'success') {
        return NextResponse.json(
          { success: false, error: 'You have already registered for this workshop' },
          { status: 400 }
        );
      }

      // Reuse the existing pending/failed registration for retry
      registrationId = existingReg.id;

      // Get the form number of the existing registration
      const [existingFormNo] = await db.query<RowDataPacket[]>(
        'SELECT formNumber FROM registrations WHERE id = ?',
        [registrationId]
      );
      formNumber = existingFormNo[0].formNumber;

      // Update the registration details in case they changed
      await db.query<ResultSetHeader>(
        `UPDATE registrations SET 
          fullName = ?, mncRegistrationNumber = ?, mobileNumber = ?, 
          paymentStatus = 'pending', registrationType = ?
        WHERE id = ?`,
        [fullName.trim(), mncRegistrationNumber, mobileNumber, registrationType, registrationId]
      );
    } else {
      // Create new registration with pending status
      registrationId = uuidv4();

      // Get next form number
      const [lastReg] = await db.query<RowDataPacket[]>(
        'SELECT formNumber FROM registrations WHERE workshopId = ? ORDER BY formNumber DESC LIMIT 1',
        [workshopId]
      );
      formNumber = lastReg.length > 0 ? lastReg[0].formNumber + 1 : 1;

      await db.query<ResultSetHeader>(
        `INSERT INTO registrations (
          id, workshopId, formNumber, fullName, mncUID, mncRegistrationNumber,
          mobileNumber, paymentStatus, paymentMethod, registrationType
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', 'gateway', ?)`,
        [
          registrationId, workshopId, formNumber, fullName.trim(), mncUID,
          mncRegistrationNumber, mobileNumber, registrationType,
        ]
      );
    }

    // Generate transaction number and initiate payment with ICICI
    const merchantTxnNo = generateMerchantTxnNo();
    const amount = parseFloat(workshop.fee).toFixed(2);

    const iciciResult = await initiateSale({
      merchantTxnNo,
      amount,
      customerName: fullName.trim(),
      customerMobileNo: mobileNumber,
      addlParam1: registrationId,
      addlParam2: workshopId,
    });

    // Create payment transaction record
    const txnId = uuidv4();
    await db.query<ResultSetHeader>(
      `INSERT INTO payment_transactions (
        id, registrationId, workshopId, merchantTxnNo, amount, status,
        tranCtx, secureHashSent, rawRequest, rawResponse
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        txnId,
        registrationId,
        workshopId,
        merchantTxnNo,
        amount,
        iciciResult.success ? 'initiated' : 'failed',
        iciciResult.tranCtx || null,
        iciciResult.secureHashSent,
        iciciResult.rawRequest,
        iciciResult.rawResponse || null,
      ]
    );

    if (!iciciResult.success) {
      return NextResponse.json(
        { success: false, error: iciciResult.error || 'Failed to initiate payment' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      redirectUrl: iciciResult.redirectUrl,
      merchantTxnNo,
      registrationId,
      formNumber,
    });
  } catch (error: any) {
    console.error('Error initiating payment:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to initiate payment' },
      { status: 500 }
    );
  }
}
