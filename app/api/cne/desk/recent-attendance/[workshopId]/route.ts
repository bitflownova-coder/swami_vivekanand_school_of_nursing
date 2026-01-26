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

    const [attendance] = await db.query<RowDataPacket[]>(
      'SELECT * FROM attendances WHERE workshopId = ? ORDER BY markedAt DESC LIMIT 10',
      [workshopId]
    );

    // Map id to _id for frontend compatibility
    const mappedAttendance = attendance.map(a => ({
      ...a,
      _id: a.id
    }));

    return NextResponse.json({
      success: true,
      attendance: mappedAttendance
    });
  } catch (error: any) {
    console.error('Error fetching recent attendance:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch attendance' },
      { status: 500 }
    );
  }
}
