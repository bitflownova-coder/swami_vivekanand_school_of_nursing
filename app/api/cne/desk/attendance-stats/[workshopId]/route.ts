import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Registration from '@/models/Registration';
import Attendance from '@/models/Attendance';

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

    // Get total registrations
    const total = await Registration.countDocuments({ workshopId });
    
    // Get registrations by type
    const applied = await Registration.countDocuments({ 
      workshopId, 
      registrationType: 'applied' 
    });
    
    const spot = await Registration.countDocuments({ 
      workshopId, 
      registrationType: 'spot' 
    });

    // Get attendance count
    const present = await Attendance.countDocuments({ workshopId });

    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return NextResponse.json({
      success: true,
      stats: {
        total,
        present,
        applied,
        spot,
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
