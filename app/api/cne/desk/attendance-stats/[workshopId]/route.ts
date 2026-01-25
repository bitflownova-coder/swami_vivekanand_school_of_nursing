import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

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
    const total = await prisma.registration.count({ where: { workshopId } });
    
    // Get registrations by type
    const online = await prisma.registration.count({ 
      where: { workshopId, registrationType: 'online' } 
    });
    
    const spot = await prisma.registration.count({ 
      where: { workshopId, registrationType: 'spot' } 
    });

    // Get attendance count
    const present = await prisma.attendance.count({ where: { workshopId } });

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
