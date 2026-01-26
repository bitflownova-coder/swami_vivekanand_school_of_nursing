import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const workshopId = formData.get('workshopId') as string;
    const token = formData.get('token') as string;
    const fullName = formData.get('fullName') as string;
    const mncUID = (formData.get('mncUID') as string)?.toUpperCase().trim();
    const mncRegistrationNumber = formData.get('mncRegistrationNumber') as string;
    const mobileNumber = (formData.get('mobileNumber') as string)?.trim();
    const paymentUTR = formData.get('paymentUTR') as string;
    const paymentScreenshot = formData.get('paymentScreenshot') as File;

    // Validate required fields
    if (!workshopId || !token || !fullName || !mncUID || !mncRegistrationNumber || !mobileNumber || !paymentUTR) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate mobile number
    if (!/^[0-9]{10}$/.test(mobileNumber)) {
      return NextResponse.json(
        { success: false, error: 'Mobile number must be 10 digits' },
        { status: 400 }
      );
    }

    // Get workshop and verify token
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

    if (workshop.spotRegistrationQRToken !== token) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired registration token' },
        { status: 400 }
      );
    }

    if (!workshop.spotRegistrationEnabled) {
      return NextResponse.json(
        { success: false, error: 'Spot registration is not enabled' },
        { status: 400 }
      );
    }

    // Check spot availability
    if (workshop.currentSpotRegistrations >= workshop.spotRegistrationLimit) {
      return NextResponse.json(
        { success: false, error: 'Spot registration limit reached' },
        { status: 400 }
      );
    }

    // Check if already registered
    const [existingRegs] = await db.query<RowDataPacket[]>(
      'SELECT id FROM registrations WHERE workshopId = ? AND (mncUID = ? OR mobileNumber = ?)',
      [workshopId, mncUID, mobileNumber]
    );

    if (existingRegs.length > 0) {
      return NextResponse.json(
        { success: false, error: 'You are already registered for this workshop' },
        { status: 400 }
      );
    }

    // Convert screenshot to base64 if provided
    let screenshotBase64 = '';
    if (paymentScreenshot) {
      const bytes = await paymentScreenshot.arrayBuffer();
      screenshotBase64 = `data:${paymentScreenshot.type};base64,${Buffer.from(bytes).toString('base64')}`;
    }

    // Generate form number
    const [countResult] = await db.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM registrations WHERE workshopId = ?',
      [workshopId]
    );
    const formNumber = countResult[0].count + 1;

    // Create registration - auto mark as present since done in front of desk
    const registrationId = uuidv4();
    await db.query<ResultSetHeader>(
      `INSERT INTO registrations (
        id, workshopId, formNumber, fullName, mncUID, mncRegistrationNumber,
        mobileNumber, paymentUTR, paymentScreenshot, registrationType, attendanceStatus
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'spot', 'present')`,
      [
        registrationId, workshopId, formNumber, fullName, mncUID,
        mncRegistrationNumber, mobileNumber, paymentUTR, screenshotBase64
      ]
    );

    // Update workshop spot count
    await db.query<ResultSetHeader>(
      `UPDATE workshops 
       SET currentSpotRegistrations = currentSpotRegistrations + 1,
           currentRegistrations = currentRegistrations + 1
       WHERE id = ?`,
      [workshopId]
    );

    return NextResponse.json({
      success: true,
      message: 'Spot registration successful',
      data: {
        formNumber,
        fullName,
        mncUID,
        workshopTitle: workshop.title
      }
    });
  } catch (error: any) {
    console.error('Error in spot registration:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { success: false, error: 'Duplicate registration detected' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
