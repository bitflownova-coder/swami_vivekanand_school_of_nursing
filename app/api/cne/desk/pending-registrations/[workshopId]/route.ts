import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import db from '@/lib/db';
import { RowDataPacket } from 'mysql2';

/**
 * GET /api/cne/desk/pending-registrations/[workshopId]
 *
 * Returns pending/failed registrations for a workshop.
 * Requires desk session.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ workshopId: string }> }
) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('desk_session');
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { workshopId } = await params;

    if (!workshopId) {
      return NextResponse.json(
        { success: false, error: 'workshopId is required' },
        { status: 400 }
      );
    }

    const [registrations] = await db.query<RowDataPacket[]>(
      `SELECT r.id, r.formNumber, r.fullName, r.mncUID, r.mobileNumber,
              r.paymentStatus, r.registrationType, r.submittedAt,
              pt.merchantTxnNo, pt.status as txnStatus
       FROM registrations r
       LEFT JOIN payment_transactions pt ON pt.registrationId = r.id
         AND pt.id = (SELECT pt2.id FROM payment_transactions pt2 WHERE pt2.registrationId = r.id ORDER BY pt2.initiatedAt DESC LIMIT 1)
       WHERE r.workshopId = ? AND r.paymentStatus IN ('pending', 'failed')
       ORDER BY r.submittedAt DESC
       LIMIT 50`,
      [workshopId]
    );

    const mapped = registrations.map(reg => ({
      _id: reg.id,
      formNumber: reg.formNumber,
      fullName: reg.fullName,
      mncUID: reg.mncUID,
      mobileNumber: reg.mobileNumber,
      paymentStatus: reg.paymentStatus,
      registrationType: reg.registrationType,
      submittedAt: reg.submittedAt,
      merchantTxnNo: reg.merchantTxnNo || null,
    }));

    return NextResponse.json({
      success: true,
      registrations: mapped,
    });
  } catch (error: any) {
    console.error('Error fetching pending registrations:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch pending registrations' },
      { status: 500 }
    );
  }
}
