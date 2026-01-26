import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, mncUID, mobileNumber, workshopId } = body;

    if (!token || !mncUID || !mobileNumber || !workshopId) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate token (time-based, valid for current and previous 30-second windows)
    const currentTimestamp = Math.floor(Date.now() / 30000);
    const validTokens = [
      Buffer.from(`attendance-${workshopId}-${currentTimestamp}`).toString('base64'),
      Buffer.from(`attendance-${workshopId}-${currentTimestamp - 1}`).toString('base64')
    ];

    if (!validTokens.includes(token)) {
      return NextResponse.json(
        { success: false, error: 'QR code has expired. Please scan the current QR code from the registration desk.' },
        { status: 400 }
      );
    }

    // Find the registration
    const [registrations] = await db.query<RowDataPacket[]>(
      'SELECT * FROM registrations WHERE workshopId = ? AND mncUID = ? AND mobileNumber = ?',
      [workshopId, mncUID.toUpperCase().trim(), mobileNumber.trim()]
    );

    if (registrations.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Registration not found. Please check your MNC UID and mobile number.' },
        { status: 404 }
      );
    }

    const registration = registrations[0];

    // Check if already marked present
    const [existingAttendance] = await db.query<RowDataPacket[]>(
      'SELECT id FROM attendances WHERE workshopId = ? AND registrationId = ?',
      [workshopId, registration.id]
    );

    if (existingAttendance.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Attendance already marked for this registration.' },
        { status: 400 }
      );
    }

    // Create attendance record
    const attendanceId = uuidv4();
    await db.query<ResultSetHeader>(
      `INSERT INTO attendances (
        id, workshopId, registrationId, mncUID, mncRegistrationNumber, 
        studentName, qrToken
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        attendanceId, workshopId, registration.id, registration.mncUID,
        registration.mncRegistrationNumber, registration.fullName, token
      ]
    );

    // Update registration status
    await db.query<ResultSetHeader>(
      "UPDATE registrations SET attendanceStatus = 'present' WHERE id = ?",
      [registration.id]
    );

    return NextResponse.json({
      success: true,
      message: 'Attendance marked successfully',
      data: {
        studentName: registration.fullName,
        formNumber: registration.formNumber
      }
    });
  } catch (error: any) {
    console.error('Error marking attendance:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Attendance already marked' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to mark attendance' },
      { status: 500 }
    );
  }
}
