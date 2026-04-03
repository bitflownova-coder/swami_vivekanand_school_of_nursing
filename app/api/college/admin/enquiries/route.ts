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

    let query = `SELECT id, name, phone, email, course, message, source, createdAt FROM enquiries`;
    const params: any[] = [];

    if (search) {
      query += ` WHERE (name LIKE ? OR phone LIKE ? OR email LIKE ? OR course LIKE ?)`;
      const like = `%${search}%`;
      params.push(like, like, like, like);
    }

    query += ` ORDER BY createdAt ${sort}`;

    const [rows] = await db.execute(query, params);
    return NextResponse.json({ success: true, enquiries: rows });
  } catch (error: any) {
    console.error('Enquiries fetch error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}
