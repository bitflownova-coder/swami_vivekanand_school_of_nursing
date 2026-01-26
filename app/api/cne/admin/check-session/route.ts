import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('cne_admin_session');

    if (session && session.value === 'authenticated') {
      return NextResponse.json({
        success: true,
        authenticated: true
      });
    }

    return NextResponse.json({
      success: true,
      authenticated: false
    });
  } catch (error: any) {
    console.error('Error checking session:', error);
    // Return unauthenticated instead of error to prevent 503
    return NextResponse.json({
      success: true,
      authenticated: false
    });
  }
}
