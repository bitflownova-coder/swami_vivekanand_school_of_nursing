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

    // Generate a time-based token (changes every 30 seconds)
    const timestamp = Math.floor(Date.now() / 30000);
    const token = Buffer.from(`attendance-${workshopId}-${timestamp}`).toString('base64');

    return NextResponse.json({
      success: true,
      token
    });
  } catch (error: any) {
    console.error('Error generating attendance QR token:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
