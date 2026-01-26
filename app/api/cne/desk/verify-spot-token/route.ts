import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, workshopId } = body;

    if (!token || !workshopId) {
      return NextResponse.json(
        { success: false, error: 'Invalid token or workshop' },
        { status: 400 }
      );
    }

    const [workshops] = await db.query<RowDataPacket[]>(
      'SELECT * FROM workshops WHERE id = ?',
      [workshopId]
    );
    
    if (workshops.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Workshop not found' },
        { status: 404 }
      );
    }

    const workshop = workshops[0];

    // Verify token matches
    if (workshop.spotRegistrationQRToken !== token) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Check if spot registration is enabled
    if (!workshop.spotRegistrationEnabled) {
      return NextResponse.json(
        { success: false, error: 'Spot registration is not enabled for this workshop' },
        { status: 400 }
      );
    }

    // Check if spots are available
    const remainingSpots = workshop.spotRegistrationLimit - workshop.currentSpotRegistrations;
    if (remainingSpots <= 0) {
      return NextResponse.json(
        { success: false, error: 'Spot registration is full for this workshop' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      workshop: {
        id: workshop.id,
        _id: workshop.id, // For compatibility
        title: workshop.title,
        description: workshop.description,
        date: workshop.date,
        dayOfWeek: workshop.dayOfWeek,
        venue: workshop.venue,
        venueLink: workshop.venueLink,
        fee: workshop.fee,
        credits: workshop.credits,
        paymentQRCode: workshop.paymentQRCode,
        upiId: workshop.upiId,
        remainingSpots
      }
    });
  } catch (error: any) {
    console.error('Error verifying spot token:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify token' },
      { status: 500 }
    );
  }
}
