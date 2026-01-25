import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let where: any = {};
    
    if (status === 'active') {
      where.status = { in: ['active', 'spot'] };
    } else if (status === 'upcoming') {
      where.status = 'upcoming';
    } else if (status) {
      where.status = status;
    }

    const workshops = await prisma.workshop.findMany({
      where,
      orderBy: { date: 'asc' }
    });

    return NextResponse.json({
      success: true,
      workshops
    });
  } catch (error: any) {
    console.error('Error fetching workshops:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch workshops' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const workshop = await prisma.workshop.create({
      data: {
        title: body.title,
        description: body.description,
        date: new Date(body.date),
        dayOfWeek: body.dayOfWeek,
        venue: body.venue,
        venueLink: body.venueLink || '',
        fee: Number(body.fee),
        credits: Number(body.credits),
        maxSeats: Number(body.maxSeats) || 500,
        status: body.status || 'draft',
        spotRegistrationEnabled: body.spotRegistrationEnabled || false,
        spotRegistrationLimit: Number(body.spotRegistrationLimit) || 50,
        paymentQRCode: body.paymentQRCode || '',
        upiId: body.upiId || ''
      }
    });

    return NextResponse.json({
      success: true,
      workshop,
      message: 'Workshop created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating workshop:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create workshop' },
      { status: 500 }
    );
  }
}
