import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { registrationId } = body;

    if (!registrationId) {
      return NextResponse.json(
        { success: false, error: 'Registration ID is required' },
        { status: 400 }
      );
    }

    const [registrations] = await db.query<RowDataPacket[]>(
      'SELECT downloadCount FROM registrations WHERE id = ?',
      [registrationId]
    );

    if (registrations.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 }
      );
    }

    const downloadCount = registrations[0].downloadCount || 0;

    if (downloadCount >= 2) {
      return NextResponse.json(
        { success: false, error: 'Maximum download limit (2) reached' },
        { status: 400 }
      );
    }

    await db.query<ResultSetHeader>(
      'UPDATE registrations SET downloadCount = downloadCount + 1 WHERE id = ?',
      [registrationId]
    );

    return NextResponse.json({
      success: true,
      downloadCount: downloadCount + 1,
      remainingDownloads: 1 - downloadCount
    });
  } catch (error: any) {
    console.error('Error incrementing download:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to increment download' },
      { status: 500 }
    );
  }
}
