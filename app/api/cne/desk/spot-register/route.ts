import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
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
    const workshop = await prisma.workshop.findUnique({
      where: { id: workshopId }
    });
    
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
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        workshopId,
        OR: [
          { mncUID },
          { mobileNumber }
        ]
      }
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
    const count = await prisma.registration.count({ where: { workshopId } });
    const formNumber = count + 1;

    // Create registration
    const registration = await prisma.registration.create({
      data: {
        workshopId,
        formNumber,
        fullName,
        mncUID,
        mncRegistrationNumber,
        mobileNumber,
        paymentUTR,
        paymentScreenshot: screenshotBase64,
        registrationType: 'spot',
        attendanceStatus: 'applied'
      }
    });

    // Update workshop spot count
    await prisma.workshop.update({
      where: { id: workshopId },
      data: {
        currentSpotRegistrations: { increment: 1 },
        currentRegistrations: { increment: 1 }
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
    
    if (error.code === 'P2002') {
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
