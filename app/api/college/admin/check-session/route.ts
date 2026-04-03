import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('college_admin_session');
    return NextResponse.json({
      success: true,
      authenticated: session?.value === 'authenticated',
    });
  } catch (error: any) {
    console.error('College admin check-session error:', error);
    return NextResponse.json({ success: true, authenticated: false });
  }
}
