import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const workshopId = formData.get('workshopId') as string;
    const fullName = formData.get('fullName') as string;
    const mncUID = (formData.get('mncUID') as string)?.toUpperCase();
    const mncRegistrationNumber = (formData.get('mncRegistrationNumber') as string)?.toUpperCase();
    const mobileNumber = formData.get('mobileNumber') as string;
    const paymentUTR = formData.get('paymentUTR') as string;
    const paymentScreenshot = formData.get('paymentScreenshot') as File;
    const registrationType = (formData.get('registrationType') as string) || 'online';

    // Validation
    if (!workshopId || !fullName || !mncUID || !mncRegistrationNumber || !mobileNumber || !paymentUTR || !paymentScreenshot) {
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

    // Check if workshop exists and is active
    const workshop = await prisma.workshop.findUnique({
      where: { id: workshopId }
    });

    if (!workshop) {
      return NextResponse.json(
        { success: false, error: 'Workshop not found' },
        { status: 404 }
      );
    }

    if (!['active', 'spot'].includes(workshop.status)) {
      return NextResponse.json(
        { success: false, error: 'Workshop is not accepting registrations' },
        { status: 400 }
      );
    }

    // Check for duplicate registration
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        workshopId,
        mncUID
      }
    });

    if (existingRegistration) {
      return NextResponse.json(
        { success: false, error: 'You have already registered for this workshop' },
        { status: 400 }
      );
    }

    // Check seat availability
    if (registrationType === 'online' && workshop.currentRegistrations >= workshop.maxSeats) {
      return NextResponse.json(
        { success: false, error: 'Workshop is full' },
        { status: 400 }
      );
    }

    if (registrationType === 'spot' && workshop.currentSpotRegistrations >= workshop.spotRegistrationLimit) {
      return NextResponse.json(
        { success: false, error: 'Spot registration limit reached' },
        { status: 400 }
      );
    }

    // Save payment screenshot
    const bytes = await paymentScreenshot.arrayBuffer();
    const buffer = new Uint8Array(bytes);
    
    const filename = `${Date.now()}-${mncUID}-${paymentScreenshot.name}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'payments');
    
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    // Get next form number
    const lastRegistration = await prisma.registration.findFirst({
      where: { workshopId },
      orderBy: { formNumber: 'desc' }
    });
    
    const formNumber = lastRegistration ? lastRegistration.formNumber + 1 : 1;

    // Get IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0] : 'unknown';

    // Create registration
    const registration = await prisma.registration.create({
      data: {
        workshopId,
        formNumber,
        fullName: fullName.trim(),
        mncUID,
        mncRegistrationNumber,
        mobileNumber,
        paymentUTR: paymentUTR.trim(),
        paymentScreenshot: filename,
        registrationType,
        ipAddress
      }
    });

    // Update workshop registration count
    if (registrationType === 'spot') {
      await prisma.workshop.update({
        where: { id: workshopId },
        data: {
          currentSpotRegistrations: { increment: 1 },
          currentRegistrations: { increment: 1 }
        }
      });
    } else {
      await prisma.workshop.update({
        where: { id: workshopId },
        data: {
          currentRegistrations: { increment: 1 }
        }
      });
    }

    // Check if workshop is now full
    const updatedWorkshop = await prisma.workshop.findUnique({
      where: { id: workshopId }
    });
    
    if (updatedWorkshop && updatedWorkshop.currentRegistrations >= updatedWorkshop.maxSeats) {
      await prisma.workshop.update({
        where: { id: workshopId },
        data: { status: 'full' }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      data: {
        formNumber,
        fullName: registration.fullName,
        workshopTitle: workshop.title,
        workshopDate: workshop.date
      }
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error submitting registration:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Duplicate registration detected' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit registration' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workshopId = searchParams.get('workshopId');

    const where: any = {};
    if (workshopId) {
      where.workshopId = workshopId;
    }

    const registrations = await prisma.registration.findMany({
      where,
      include: {
        workshop: {
          select: { title: true, date: true, venue: true }
        }
      },
      orderBy: { submittedAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      registrations
    });
  } catch (error: any) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}
