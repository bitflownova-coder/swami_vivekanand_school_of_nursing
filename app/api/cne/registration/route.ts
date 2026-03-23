import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { RowDataPacket } from 'mysql2';

// POST handler removed — all registrations now go through ICICI payment gateway
// via /api/cne/payment/initiate

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workshopId = searchParams.get('workshopId');

    let query = `
      SELECT r.*, w.title as workshopTitle, w.date as workshopDate, w.venue as workshopVenue
      FROM registrations r
      JOIN workshops w ON r.workshopId = w.id
    `;
    const params: any[] = [];

    if (workshopId) {
      query += ' WHERE r.workshopId = ?';
      params.push(workshopId);
    }

    query += ' ORDER BY r.submittedAt DESC';

    const [registrations] = await db.query<RowDataPacket[]>(query, params);

    // Map id to _id for frontend compatibility
    const mappedRegistrations = registrations.map(reg => ({
      _id: reg.id,
      formNumber: reg.formNumber,
      fullName: reg.fullName,
      mncUID: reg.mncUID,
      mncRegistrationNumber: reg.mncRegistrationNumber,
      mobileNumber: reg.mobileNumber,
      paymentUTR: reg.paymentUTR,
      paymentStatus: reg.paymentStatus || 'success',
      paymentMethod: reg.paymentMethod || 'manual',
      registrationType: reg.registrationType,
      attendanceStatus: reg.attendanceStatus,
      submittedAt: reg.submittedAt,
      downloadCount: reg.downloadCount,
      workshopId: {
        _id: reg.workshopId,
        title: reg.workshopTitle,
        date: reg.workshopDate,
        venue: reg.workshopVenue
      }
    }));

    return NextResponse.json({
      success: true,
      registrations: mappedRegistrations
    });
  } catch (error: any) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}
