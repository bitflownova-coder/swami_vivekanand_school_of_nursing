import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workshopId = searchParams.get('workshopId');

    if (!workshopId || workshopId === 'all') {
      // Get overall stats
      const [totalRegs] = await db.query<RowDataPacket[]>('SELECT COUNT(*) as count FROM registrations');
      const [presentRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE attendanceStatus = 'present'");
      const [appliedRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE attendanceStatus = 'applied'");
      const [spotRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE registrationType = 'spot'");
      const [onlineRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE registrationType = 'online'");
      const [workshopSeats] = await db.query<RowDataPacket[]>('SELECT SUM(maxSeats) as totalSeats FROM workshops');

      const totalRegistrations = totalRegs[0].count;
      const totalSeats = workshopSeats[0].totalSeats || 0;

      return NextResponse.json({
        success: true,
        stats: {
          total: totalRegistrations,
          present: presentRegs[0].count,
          applied: appliedRegs[0].count,
          spot: spotRegs[0].count,
          online: onlineRegs[0].count,
          totalSeats,
          remaining: totalSeats - totalRegistrations
        }
      });
    } else {
      // Get workshop-specific stats
      const [workshops] = await db.query<RowDataPacket[]>(
        'SELECT maxSeats FROM workshops WHERE id = ?',
        [workshopId]
      );
      
      if (workshops.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Workshop not found' },
          { status: 404 }
        );
      }

      const [totalRegs] = await db.query<RowDataPacket[]>('SELECT COUNT(*) as count FROM registrations WHERE workshopId = ?', [workshopId]);
      const [presentRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE workshopId = ? AND attendanceStatus = 'present'", [workshopId]);
      const [appliedRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE workshopId = ? AND attendanceStatus = 'applied'", [workshopId]);
      const [spotRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE workshopId = ? AND registrationType = 'spot'", [workshopId]);
      const [onlineRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE workshopId = ? AND registrationType = 'online'", [workshopId]);

      const totalRegistrations = totalRegs[0].count;

      return NextResponse.json({
        success: true,
        stats: {
          total: totalRegistrations,
          present: presentRegs[0].count,
          applied: appliedRegs[0].count,
          spot: spotRegs[0].count,
          online: onlineRegs[0].count,
          totalSeats: workshops[0].maxSeats,
          remaining: workshops[0].maxSeats - totalRegistrations
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
