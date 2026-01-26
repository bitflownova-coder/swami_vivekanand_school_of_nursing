import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import db from '@/lib/db';
import { RowDataPacket } from 'mysql2';

type RouteContext = { params: Promise<{ workshopId: string }> };

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const session = cookieStore.get('desk_session');
    
    if (session?.value !== 'authenticated') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { workshopId } = await context.params;

    // Get total registrations
    const [totalResult] = await db.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM registrations WHERE workshopId = ?',
      [workshopId]
    );
    const total = totalResult[0].count;
    
    // Get registrations by type
    const [onlineResult] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) as count FROM registrations WHERE workshopId = ? AND registrationType = 'online'",
      [workshopId]
    );
    const online = onlineResult[0].count;
    
    const [spotResult] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) as count FROM registrations WHERE workshopId = ? AND registrationType = 'spot'",
      [workshopId]
    );
    const spot = spotResult[0].count;

    // Get attendance count
    const [presentResult] = await db.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM attendances WHERE workshopId = ?',
      [workshopId]
    );
    const present = presentResult[0].count;

    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return NextResponse.json({
      success: true,
      stats: {
        total,
        online,
        spot,
        present,
        absent: total - present,
        percentage
      }
    });
  } catch (error: any) {
    console.error('Error fetching attendance stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
