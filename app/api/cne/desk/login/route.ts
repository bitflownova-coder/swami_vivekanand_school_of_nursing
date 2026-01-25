import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Get credentials from environment variables
    const deskUsername = process.env.DESK_USERNAME || 'desk';
    const deskPassword = process.env.DESK_PASSWORD || 'desk123';

    if (username !== deskUsername || password !== deskPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('desk_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 12 // 12 hours
    });

    return NextResponse.json({
      success: true,
      message: 'Login successful'
    });
  } catch (error: any) {
    console.error('Desk login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}
