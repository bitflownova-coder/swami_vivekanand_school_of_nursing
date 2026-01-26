import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import db from '@/lib/db';
import crypto from 'crypto';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

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

    const [workshops] = await db.query<RowDataPacket[]>(
      'SELECT spotRegistrationQRToken FROM workshops WHERE id = ?',
      [workshopId]
    );
    
    if (workshops.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Workshop not found' },
        { status: 404 }
      );
    }

    // Generate or get spot registration token
    let token = workshops[0].spotRegistrationQRToken;
    
    if (!token) {
      token = crypto.randomBytes(32).toString('hex');
      await db.query<ResultSetHeader>(
        'UPDATE workshops SET spotRegistrationQRToken = ? WHERE id = ?',
        [token, workshopId]
      );
    }

    return NextResponse.json({
      success: true,
      token
    });
  } catch (error: any) {
    console.error('Error generating spot QR token:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
