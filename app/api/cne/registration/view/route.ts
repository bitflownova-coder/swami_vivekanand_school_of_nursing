import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Registration from '@/models/Registration';
import Workshop from '@/models/Workshop';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { mncUID, mobileNumber } = body;

    if (!mncUID || !mobileNumber) {
      return NextResponse.json(
        { success: false, error: 'MNC UID and Mobile Number are required' },
        { status: 400 }
      );
    }

    const registrations = await Registration.find({
      mncUID: mncUID.toUpperCase(),
      mobileNumber
    })
      .populate('workshopId', 'title date venue dayOfWeek fee credits')
      .sort({ submittedAt: -1 })
      .lean();

    if (registrations.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No registration found with provided details' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      registrations
    });
  } catch (error: any) {
    console.error('Error viewing registration:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to view registration' },
      { status: 500 }
    );
  }
}
