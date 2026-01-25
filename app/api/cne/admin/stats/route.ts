import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workshopId = searchParams.get('workshopId');

    if (!workshopId || workshopId === 'all') {
      // Get overall stats
      const totalRegistrations = await prisma.registration.count();
      const presentCount = await prisma.registration.count({ where: { attendanceStatus: 'present' } });
      const appliedCount = await prisma.registration.count({ where: { attendanceStatus: 'applied' } });
      const spotCount = await prisma.registration.count({ where: { registrationType: 'spot' } });
      const onlineCount = await prisma.registration.count({ where: { registrationType: 'online' } });

      const workshops = await prisma.workshop.findMany();
      const totalSeats = workshops.reduce((sum, w) => sum + (w.maxSeats || 0), 0);

      return NextResponse.json({
        success: true,
        stats: {
          total: totalRegistrations,
          present: presentCount,
          applied: appliedCount,
          spot: spotCount,
          online: onlineCount,
          totalSeats,
          remaining: totalSeats - totalRegistrations
        }
      });
    } else {
      // Get workshop-specific stats
      const workshop = await prisma.workshop.findUnique({
        where: { id: workshopId }
      });
      
      if (!workshop) {
        return NextResponse.json(
          { success: false, error: 'Workshop not found' },
          { status: 404 }
        );
      }

      const totalRegistrations = await prisma.registration.count({ where: { workshopId } });
      const presentCount = await prisma.registration.count({ where: { workshopId, attendanceStatus: 'present' } });
      const appliedCount = await prisma.registration.count({ where: { workshopId, attendanceStatus: 'applied' } });
      const spotCount = await prisma.registration.count({ where: { workshopId, registrationType: 'spot' } });
      const onlineCount = await prisma.registration.count({ where: { workshopId, registrationType: 'online' } });

      return NextResponse.json({
        success: true,
        stats: {
          total: totalRegistrations,
          present: presentCount,
          applied: appliedCount,
          spot: spotCount,
          online: onlineCount,
          totalSeats: workshop.maxSeats,
          remaining: workshop.maxSeats - totalRegistrations
        }
      });
    }
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
