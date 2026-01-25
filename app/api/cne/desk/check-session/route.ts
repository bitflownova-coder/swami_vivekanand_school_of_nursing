import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('desk_session');

    return NextResponse.json({
      success: true,
      authenticated: session?.value === 'authenticated'
    });
  } catch (error: any) {
    console.error('Desk session check error:', error);
    return NextResponse.json(
      { success: false, authenticated: false },
      { status: 500 }
    );
  }
}
