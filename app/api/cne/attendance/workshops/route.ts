import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: NextRequest) {
  try {
    // First, ensure every active workshop has an attendance QR token
    const [missing] = await db.query<RowDataPacket[]>(
      `SELECT id FROM workshops WHERE status = 'active' AND (attendanceQRToken = '' OR attendanceQRToken IS NULL)`
    );
    for (const row of missing) {
      await db.query<ResultSetHeader>(
        `UPDATE workshops SET attendanceQRToken = ? WHERE id = ?`,
        [uuidv4(), row.id]
      );
    }

    const [workshops] = await db.query<RowDataPacket[]>(
      `SELECT id, title, date, dayOfWeek, venue, attendanceQRToken, status
       FROM workshops
       WHERE status = 'active'
       ORDER BY date ASC`
    );

    return NextResponse.json(
      { success: true, workshops },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    );
  } catch (error: any) {
    console.error('Error fetching active workshops:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch workshops' },
      { status: 500 }
    );
  }
}
