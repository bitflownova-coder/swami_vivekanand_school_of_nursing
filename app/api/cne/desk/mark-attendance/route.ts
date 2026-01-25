import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
    const registration = await prisma.registration.findFirst({
      where: {
        workshopId,
        mncUID: mncUID.toUpperCase().trim(),
        mobileNumber: mobileNumber.trim()
      }
    });

    if (!registration) {
      return NextResponse.json(
        { success: false, error: 'Registration not found. Please check your MNC UID and mobile number.' },
        { status: 404 }
      );
    }

    // Check if already marked present
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        workshopId,
        registrationId: registration.id
      }
    });

    if (existingAttendance) {
      return NextResponse.json(
        { success: false, error: 'Attendance already marked for this registration.' },
        { status: 400 }
      );
    }

    // Get request info
    const forwarded = request.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0] : 'unknown';
    const userAgent = request.headers.get('user-agent') || '';

    // Create attendance record
    await prisma.attendance.create({
      data: {
        workshopId,
        registrationId: registration.id,
        mncUID: registration.mncUID,
        mncRegistrationNumber: registration.mncRegistrationNumber,
        studentName: registration.fullName,
        qrToken: token,
        ipAddress,
        userAgent
      }
    });

    // Update registration status
    await prisma.registration.update({
      where: { id: registration.id },
      data: { attendanceStatus: 'present' }
    });

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
