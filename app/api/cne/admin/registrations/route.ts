import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workshopId = searchParams.get('workshopId');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '100');

    let query = `
      SELECT r.*, w.title as workshopTitle, w.date as workshopDate, w.venue as workshopVenue
      FROM registrations r
      JOIN workshops w ON r.workshopId = w.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (workshopId && workshopId !== 'all') {
      query += ' AND r.workshopId = ?';
      params.push(workshopId);
    }

    if (search) {
      query += ` AND (
        r.fullName LIKE ? OR 
        r.mncUID LIKE ? OR 
        r.mncRegistrationNumber LIKE ? OR 
        r.mobileNumber LIKE ? OR 
        r.paymentUTR LIKE ?
      )`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    query += ` ORDER BY r.submittedAt ${sort === 'oldest' ? 'ASC' : 'DESC'}`;
    query += ' LIMIT ? OFFSET ?';
    params.push(limit, (page - 1) * limit);

    const [registrations] = await db.query<RowDataPacket[]>(query, params);

    // Count total records
    let countQuery = 'SELECT COUNT(*) as total FROM registrations r WHERE 1=1';
    const countParams: any[] = [];
    
    if (workshopId && workshopId !== 'all') {
      countQuery += ' AND r.workshopId = ?';
      countParams.push(workshopId);
    }

    if (search) {
      countQuery += ` AND (
        r.fullName LIKE ? OR 
        r.mncUID LIKE ? OR 
        r.mncRegistrationNumber LIKE ? OR 
        r.mobileNumber LIKE ? OR 
        r.paymentUTR LIKE ?
      )`;
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    const [countResult] = await db.query<RowDataPacket[]>(countQuery, countParams);
    const total = countResult[0].total;

    // Map to expected format with _id for frontend compatibility
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
        _id: reg.workshopId,
        title: reg.workshopTitle,
        date: reg.workshopDate,
        venue: reg.workshopVenue
      }
    }));

    return NextResponse.json({
      success: true,
      registrations: mappedRegistrations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}
