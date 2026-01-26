import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mncUID, mobileNumber } = body;

    if (!mncUID || !mobileNumber) {
      return NextResponse.json(
        { success: false, error: 'MNC UID and Mobile Number are required' },
        { status: 400 }
      );
    }

    const [registrations] = await db.query<RowDataPacket[]>(
      `SELECT r.*, w.id as workshop_id, w.title as workshop_title, w.date as workshop_date, 
              w.venue as workshop_venue, w.dayOfWeek as workshop_dayOfWeek, w.fee as workshop_fee, w.credits as workshop_credits
       FROM registrations r
       JOIN workshops w ON r.workshopId = w.id
       WHERE r.mncUID = ? AND r.mobileNumber = ?
       ORDER BY r.submittedAt DESC`,
      [mncUID.toUpperCase(), mobileNumber]
    );

    if (registrations.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No registration found with provided details' },
        { status: 404 }
      );
    }

    // Map to expected format with nested workshop object and _id for frontend compatibility
    const mappedRegistrations = registrations.map(reg => ({
      _id: reg.id,
      formNumber: reg.formNumber,
      fullName: reg.fullName,
      mncUID: reg.mncUID,
      mncRegistrationNumber: reg.mncRegistrationNumber,
      mobileNumber: reg.mobileNumber,
      paymentUTR: reg.paymentUTR,
      paymentScreenshot: reg.paymentScreenshot,
      registrationType: reg.registrationType,
      attendanceStatus: reg.attendanceStatus,
      submittedAt: reg.submittedAt,
      downloadCount: reg.downloadCount || 0,
      workshopId: {
        _id: reg.workshop_id,
        title: reg.workshop_title,
        date: reg.workshop_date,
        venue: reg.workshop_venue,
        dayOfWeek: reg.workshop_dayOfWeek,
        fee: reg.workshop_fee,
        credits: reg.workshop_credits
      }
    }));

    return NextResponse.json({
      success: true,
      registrations: mappedRegistrations
    });
  } catch (error: any) {
    console.error('Error viewing registration:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to view registration' },
      { status: 500 }
    );
  }
}
