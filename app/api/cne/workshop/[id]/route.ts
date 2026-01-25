import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Workshop from '@/models/Workshop';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await dbConnect();
    const { id } = await context.params;

    const workshop = await Workshop.findById(id).lean();

    if (!workshop) {
      return NextResponse.json(
        { success: false, error: 'Workshop not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      workshop
    });
  } catch (error: any) {
    console.error('Error fetching workshop:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch workshop' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await dbConnect();
    const { id } = await context.params;

    const body = await request.json();
    
    const updateData: any = {};
    
    if (body.title) updateData.title = body.title;
    if (body.description) updateData.description = body.description;
    if (body.date) updateData.date = new Date(body.date);
    if (body.dayOfWeek) updateData.dayOfWeek = body.dayOfWeek;
    if (body.venue) updateData.venue = body.venue;
    if (body.venueLink !== undefined) updateData.venueLink = body.venueLink;
    if (body.fee !== undefined) updateData.fee = Number(body.fee);
    if (body.credits !== undefined) updateData.credits = Number(body.credits);
    if (body.maxSeats !== undefined) updateData.maxSeats = Number(body.maxSeats);
    if (body.status) updateData.status = body.status;
    if (body.spotRegistrationEnabled !== undefined) updateData.spotRegistrationEnabled = body.spotRegistrationEnabled;
    if (body.spotRegistrationLimit !== undefined) updateData.spotRegistrationLimit = Number(body.spotRegistrationLimit);
    if (body.paymentQRCode !== undefined) updateData.paymentQRCode = body.paymentQRCode;
    if (body.upiId !== undefined) updateData.upiId = body.upiId;

    const workshop = await Workshop.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!workshop) {
      return NextResponse.json(
        { success: false, error: 'Workshop not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      workshop,
      message: 'Workshop updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating workshop:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update workshop' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await dbConnect();
    const { id } = await context.params;

    const workshop = await Workshop.findByIdAndDelete(id);

    if (!workshop) {
      return NextResponse.json(
        { success: false, error: 'Workshop not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Workshop deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting workshop:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete workshop' },
      { status: 500 }
    );
  }
}
