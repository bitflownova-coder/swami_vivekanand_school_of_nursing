import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

type RouteContext = { params: Promise<{ workshopId: string }> };

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const session = cookieStore.get('desk_session');
    
    if (session?.value !== 'authenticated') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { workshopId } = await context.params;

    const workshop = await prisma.workshop.findUnique({
      where: { id: workshopId }
    });
    
    if (!workshop) {
      return NextResponse.json(
        { success: false, error: 'Workshop not found' },
        { status: 404 }
      );
    }

    // Generate or get spot registration token
    let token = workshop.spotRegistrationQRToken;
    
    if (!token) {
      token = crypto.randomBytes(32).toString('hex');
      await prisma.workshop.update({
        where: { id: workshopId },
        data: { spotRegistrationQRToken: token }
      });
    }

    return NextResponse.json({
      success: true,
      token
    });
  } catch (error: any) {
    console.error('Error generating spot QR token:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
