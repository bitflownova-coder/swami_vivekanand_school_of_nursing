import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mncUID, mobileNumber } = body;

    if (!mncUID || !mobileNumber) {
      return NextResponse.json(
        { success: false, error: 'MNC UID and Mobile Number are required' },
        { status: 400 }
      );
    }

    const registrations = await prisma.registration.findMany({
      where: {
        mncUID: mncUID.toUpperCase(),
        mobileNumber
      },
      include: {
        workshop: {
          select: { id: true, title: true, date: true, venue: true, dayOfWeek: true, fee: true, credits: true }
        }
      },
      orderBy: { submittedAt: 'desc' }
    });

    if (registrations.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No registration found with provided details' },
        { status: 404 }
      );
    }

    // Map to expected format with workshopId field for compatibility
    const mappedRegistrations = registrations.map(reg => ({
      ...reg,
      workshopId: reg.workshop
    }));

    return NextResponse.json({
      success: true,
      registrations: mappedRegistrations
    });
  } catch (error: any) {
    console.error('Error viewing registration:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to view registration' },
      { status: 500 }
    );
  }
}
