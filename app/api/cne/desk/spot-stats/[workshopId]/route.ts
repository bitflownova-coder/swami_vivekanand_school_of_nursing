import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Workshop from '@/models/Workshop';

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

    await dbConnect();
    const { workshopId } = await context.params;

    const workshop = await Workshop.findById(workshopId);
    
    if (!workshop) {
      return NextResponse.json(
        { success: false, error: 'Workshop not found' },
        { status: 404 }
      );
    }

    const total = workshop.currentSpotRegistrations || 0;
    const limit = workshop.spotRegistrationLimit || 50;
    const remaining = Math.max(0, limit - total);
    const isFull = remaining <= 0;

    return NextResponse.json({
      success: true,
      stats: {
        total,
        limit,
        remaining,
        isFull
      }
    });
  } catch (error: any) {
    console.error('Error fetching spot stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
