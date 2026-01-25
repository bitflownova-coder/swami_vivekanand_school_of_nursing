import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Workshop from '@/models/Workshop';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query: any = {};
    
    if (status === 'active') {
      query.status = { $in: ['active', 'spot'] };
    } else if (status === 'upcoming') {
      query.status = 'upcoming';
    } else if (status) {
      query.status = status;
    }

    const workshops = await Workshop.find(query)
      .sort({ date: 1 })
      .lean();

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
    await dbConnect();

    const body = await request.json();
    
    const workshop = new Workshop({
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
    });

    await workshop.save();

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
