import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workshopId = searchParams.get('workshopId');

    if (!workshopId || workshopId === 'all') {
      // Get overall stats (only count successful payments)
      const [totalRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE paymentStatus = 'success'");
      const [presentRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE attendanceStatus = 'present' AND paymentStatus = 'success'");
      const [appliedRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE attendanceStatus = 'applied' AND paymentStatus = 'success'");
      const [spotRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE registrationType = 'spot' AND paymentStatus = 'success'");
      const [onlineRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE registrationType = 'online' AND paymentStatus = 'success'");
      const [pendingRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE paymentStatus = 'pending'");
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
          pending: pendingRegs[0].count,
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

      const [totalRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE workshopId = ? AND paymentStatus = 'success'", [workshopId]);
      const [presentRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE workshopId = ? AND attendanceStatus = 'present' AND paymentStatus = 'success'", [workshopId]);
      const [appliedRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE workshopId = ? AND attendanceStatus = 'applied' AND paymentStatus = 'success'", [workshopId]);
      const [spotRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE workshopId = ? AND registrationType = 'spot' AND paymentStatus = 'success'", [workshopId]);
      const [onlineRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE workshopId = ? AND registrationType = 'online' AND paymentStatus = 'success'", [workshopId]);
      const [pendingRegs] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM registrations WHERE workshopId = ? AND paymentStatus = 'pending'", [workshopId]);

      const totalRegistrations = totalRegs[0].count;

      return NextResponse.json({
        success: true,
        stats: {
          total: totalRegistrations,
          present: presentRegs[0].count,
          applied: appliedRegs[0].count,
          spot: spotRegs[0].count,
          online: onlineRegs[0].count,
          pending: pendingRegs[0].count,
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
