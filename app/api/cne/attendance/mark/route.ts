import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workshopId, token, mncUID, mobileNumber } = body;

    // --- Input validation ---
    if (!workshopId || !token || !mncUID || !mobileNumber) {
      return NextResponse.json(
        { success: false, error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const cleanMncUID = String(mncUID).trim().toUpperCase();
    const cleanMobile = String(mobileNumber).trim();

    if (!/^\d{10}$/.test(cleanMncUID)) {
      return NextResponse.json(
        { success: false, error: 'MNC UID must be exactly 10 digits.' },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(cleanMobile)) {
      return NextResponse.json(
        { success: false, error: 'Mobile number must be exactly 10 digits.' },
        { status: 400 }
      );
    }

    // --- Validate workshop & QR token ---
    const [workshops] = await db.query<RowDataPacket[]>(
      `SELECT id, title, attendanceQRToken, status FROM workshops WHERE id = ?`,
      [workshopId]
    );

    if (workshops.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Workshop not found.' },
        { status: 404 }
      );
    }

    const workshop = workshops[0];

    if (workshop.status !== 'active') {
      return NextResponse.json(
        { success: false, error: 'This workshop is not currently active.' },
        { status: 400 }
      );
    }

    if (!workshop.attendanceQRToken || workshop.attendanceQRToken !== token) {
      return NextResponse.json(
        { success: false, error: 'Invalid QR code. Please scan the official attendance QR code.' },
        { status: 400 }
      );
    }

    // --- Check for duplicate attendance ---
    const [existing] = await db.query<RowDataPacket[]>(
      `SELECT markedAt FROM attendance_spot WHERE workshopId = ? AND mncUID = ?`,
      [workshopId, cleanMncUID]
    );

    if (existing.length > 0) {
      // Already recorded — show confirmation with original timestamp
      const originalMarkedAt = existing[0].markedAt
        ? new Date(existing[0].markedAt).toISOString()
        : new Date().toISOString();
      return NextResponse.json({
        success: true,
        message: 'Your attendance was already recorded.',
        data: { workshopTitle: workshop.title, markedAt: originalMarkedAt }
      });
    }

    // --- Record attendance ---
    const ipAddress =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '';

    const id = uuidv4();
    await db.query<ResultSetHeader>(
      `INSERT INTO attendance_spot (id, workshopId, mncUID, mobileNumber, ipAddress)
       VALUES (?, ?, ?, ?, ?)`,
      [id, workshopId, cleanMncUID, cleanMobile, ipAddress]
    );

    const markedAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      message: 'Attendance recorded successfully.',
      data: { workshopTitle: workshop.title, markedAt }
    });
  } catch (error: any) {
    console.error('Error recording attendance spot:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record attendance. Please try again.' },
      { status: 500 }
    );
  }
}
