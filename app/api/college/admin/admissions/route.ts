import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import db from '@/lib/db';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('college_admin_session');
  return session?.value === 'authenticated';
}

export async function GET(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') === 'oldest' ? 'ASC' : 'DESC';
    const status = searchParams.get('status') || '';

    let query = `SELECT id, fullName, dateOfBirth, gender, phone, email, address,
      tenthBoard, tenthPercent, twelthBoard, twelthPercent, twelthStream,
      category, hasDisability, isAnmRegistered, status, notes, createdAt
      FROM admission_applications WHERE 1=1`;
    const params: any[] = [];

    if (search) {
      query += ` AND (fullName LIKE ? OR phone LIKE ? OR email LIKE ?)`;
      const like = `%${search}%`;
      params.push(like, like, like);
    }
    if (status) {
      query += ` AND status = ?`;
      params.push(status);
    }

    query += ` ORDER BY createdAt ${sort}`;

    const [rows] = await db.execute(query, params);

    // Stats
    const [statsRows] = await db.execute(
      `SELECT status, COUNT(*) as count FROM admission_applications GROUP BY status`
    ) as any[];

    const stats: Record<string, number> = { total: 0, pending: 0, shortlisted: 0, admitted: 0, rejected: 0 };
    for (const row of statsRows as any[]) {
      stats[row.status] = Number(row.count);
      stats.total += Number(row.count);
    }

    return NextResponse.json({ success: true, admissions: rows, stats });
  } catch (error: any) {
    console.error('Admissions fetch error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch admissions' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const { status, notes } = body;

    const allowed = ['pending', 'shortlisted', 'admitted', 'rejected'];
    if (status && !allowed.includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
    }

    const updates: string[] = ['updatedAt = NOW()'];
    const params: any[] = [];

    if (status) { updates.push('status = ?'); params.push(status); }
    if (notes !== undefined) { updates.push('notes = ?'); params.push(notes); }

    params.push(id);
    await db.execute(`UPDATE admission_applications SET ${updates.join(', ')} WHERE id = ?`, params);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Admission update error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update application' }, { status: 500 });
  }
}
