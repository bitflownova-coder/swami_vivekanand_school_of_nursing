import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const COLLEGE_ADMIN_USERNAME = process.env.COLLEGE_ADMIN_USERNAME || 'admin';
const COLLEGE_ADMIN_PASSWORD = process.env.COLLEGE_ADMIN_PASSWORD || 'admin_2026';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ success: false, error: 'Username and password are required' }, { status: 400 });
    }

    if (username === COLLEGE_ADMIN_USERNAME && password === COLLEGE_ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set('college_admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  } catch (error: any) {
    console.error('College admin login error:', error);
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
  }
}
