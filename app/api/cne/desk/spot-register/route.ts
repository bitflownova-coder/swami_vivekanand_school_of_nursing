import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Workshop from '@/models/Workshop';
import Registration from '@/models/Registration';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const formData = await request.formData();
    
    const workshopId = formData.get('workshopId') as string;
    const token = formData.get('token') as string;
    const fullName = formData.get('fullName') as string;
    const mncUID = (formData.get('mncUID') as string)?.toUpperCase().trim();
    const mncRegistrationNumber = formData.get('mncRegistrationNumber') as string;
    const mobileNumber = (formData.get('mobileNumber') as string)?.trim();
    const paymentUTR = formData.get('paymentUTR') as string;
    const paymentScreenshot = formData.get('paymentScreenshot') as File;

    // Validate required fields
    if (!workshopId || !token || !fullName || !mncUID || !mncRegistrationNumber || !mobileNumber || !paymentUTR) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate mobile number
    if (!/^[0-9]{10}$/.test(mobileNumber)) {
      return NextResponse.json(
        { success: false, error: 'Mobile number must be 10 digits' },
        { status: 400 }
      );
    }

    // Get workshop and verify token
    const workshop = await Workshop.findById(workshopId);
    
    if (!workshop) {
      return NextResponse.json(
        { success: false, error: 'Workshop not found' },
        { status: 404 }
      );
    }

    if (workshop.spotRegistrationQRToken !== token) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired registration token' },
        { status: 400 }
      );
    }

    if (!workshop.spotRegistrationEnabled) {
      return NextResponse.json(
        { success: false, error: 'Spot registration is not enabled' },
        { status: 400 }
      );
    }

    // Check spot availability
    if (workshop.currentSpotRegistrations >= workshop.spotRegistrationLimit) {
      return NextResponse.json(
        { success: false, error: 'Spot registration limit reached' },
        { status: 400 }
      );
    }

    // Check if already registered
    const existingRegistration = await Registration.findOne({
      workshopId,
      $or: [
        { mncUID },
        { mobileNumber }
      ]
    });

    if (existingRegistration) {
      return NextResponse.json(
        { success: false, error: 'You are already registered for this workshop' },
        { status: 400 }
      );
    }

    // Convert screenshot to base64 if provided
    let screenshotBase64 = '';
    if (paymentScreenshot) {
      const bytes = await paymentScreenshot.arrayBuffer();
      screenshotBase64 = `data:${paymentScreenshot.type};base64,${Buffer.from(bytes).toString('base64')}`;
    }

    // Generate form number
    const count = await Registration.countDocuments({ workshopId });
    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const formNumber = `SPOT-${dateStr}-${String(count + 1).padStart(4, '0')}`;

    // Create registration
    const registration = new Registration({
      workshopId,
      formNumber,
      fullName,
      mncUID,
      mncRegistrationNumber,
      mobileNumber,
      paymentUTR,
      paymentScreenshot: screenshotBase64,
      registrationType: 'spot',
      paymentStatus: 'pending',
      attendanceStatus: 'absent'
    });

    await registration.save();

    // Update workshop spot count
    await Workshop.findByIdAndUpdate(workshopId, {
      $inc: { 
        currentSpotRegistrations: 1,
        currentRegistrations: 1
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Spot registration successful',
      data: {
        formNumber,
        fullName,
        mncUID,
        workshopTitle: workshop.title
      }
    });
  } catch (error: any) {
    console.error('Error in spot registration:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Duplicate registration detected' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
