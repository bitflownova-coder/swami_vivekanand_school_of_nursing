import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Registration from '@/models/Registration';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { registrationId } = body;

    if (!registrationId) {
      return NextResponse.json(
        { success: false, error: 'Registration ID is required' },
        { status: 400 }
      );
    }

    const registration = await Registration.findById(registrationId);

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

    registration.downloadCount += 1;
    await registration.save();

    return NextResponse.json({
      success: true,
      downloadCount: registration.downloadCount,
      remainingDownloads: 2 - registration.downloadCount
    });
  } catch (error: any) {
    console.error('Error incrementing download:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to increment download' },
      { status: 500 }
    );
  }
}
