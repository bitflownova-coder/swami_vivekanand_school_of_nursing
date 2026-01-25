import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Registration from '@/models/Registration';
import Workshop from '@/models/Workshop';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const workshopId = searchParams.get('workshopId');

    if (!workshopId || workshopId === 'all') {
      // Get overall stats
      const totalRegistrations = await Registration.countDocuments();
      const presentCount = await Registration.countDocuments({ attendanceStatus: 'present' });
      const appliedCount = await Registration.countDocuments({ attendanceStatus: 'applied' });
      const spotCount = await Registration.countDocuments({ registrationType: 'spot' });
      const onlineCount = await Registration.countDocuments({ registrationType: 'online' });

      const workshops = await Workshop.find().lean();
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
      const workshop = await Workshop.findById(workshopId).lean();
      
      if (!workshop) {
        return NextResponse.json(
          { success: false, error: 'Workshop not found' },
          { status: 404 }
        );
      }

      const totalRegistrations = await Registration.countDocuments({ workshopId });
      const presentCount = await Registration.countDocuments({ workshopId, attendanceStatus: 'present' });
      const appliedCount = await Registration.countDocuments({ workshopId, attendanceStatus: 'applied' });
      const spotCount = await Registration.countDocuments({ workshopId, registrationType: 'spot' });
      const onlineCount = await Registration.countDocuments({ workshopId, registrationType: 'online' });

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
