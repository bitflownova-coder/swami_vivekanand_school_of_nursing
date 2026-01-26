import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Admin credentials - in production, use environment variables and proper hashing
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'svsnursing',
  password: process.env.ADMIN_PASSWORD || 'SVSNursing@2025'
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const cookieStore = await cookies();
      
      // Set session cookie
      cookieStore.set('cne_admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 30, // 30 minutes
        path: '/'
      });

      return NextResponse.json({
        success: true,
        message: 'Login successful'
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Login failed' },
      { status: 500 }
    );
  }
}
