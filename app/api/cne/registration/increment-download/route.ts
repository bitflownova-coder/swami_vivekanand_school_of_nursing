import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { registrationId } = body;

    if (!registrationId) {
      return NextResponse.json(
        { success: false, error: 'Registration ID is required' },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.findUnique({
      where: { id: registrationId }
    });

    if (!registration) {
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 }
      );
    }

    if (registration.downloadCount >= 2) {
      return NextResponse.json(
        { success: false, error: 'Maximum download limit (2) reached' },
        { status: 400 }
      );
    }

    const updatedRegistration = await prisma.registration.update({
      where: { id: registrationId },
      data: { downloadCount: registration.downloadCount + 1 }
    });

    return NextResponse.json({
      success: true,
      downloadCount: updatedRegistration.downloadCount,
      remainingDownloads: 2 - updatedRegistration.downloadCount
    });
  } catch (error: any) {
    console.error('Error incrementing download:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to increment download' },
      { status: 500 }
    );
  }
}
