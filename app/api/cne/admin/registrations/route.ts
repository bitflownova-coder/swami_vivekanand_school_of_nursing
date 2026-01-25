import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Registration from '@/models/Registration';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const workshopId = searchParams.get('workshopId');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '100');

    let query: any = {};

    if (workshopId && workshopId !== 'all') {
      query.workshopId = workshopId;
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { mncUID: { $regex: search, $options: 'i' } },
        { mncRegistrationNumber: { $regex: search, $options: 'i' } },
        { mobileNumber: { $regex: search, $options: 'i' } },
        { paymentUTR: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOrder = sort === 'oldest' ? 1 : -1;

    const registrations = await Registration.find(query)
      .populate('workshopId', 'title date venue')
      .sort({ submittedAt: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Registration.countDocuments(query);

    return NextResponse.json({
      success: true,
      registrations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}
