import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workshopId = searchParams.get('workshopId');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '100');

    const where: any = {};

    if (workshopId && workshopId !== 'all') {
      where.workshopId = workshopId;
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { mncUID: { contains: search } },
        { mncRegistrationNumber: { contains: search } },
        { mobileNumber: { contains: search } },
        { paymentUTR: { contains: search } }
      ];
    }

    const registrations = await prisma.registration.findMany({
      where,
      include: {
        workshop: {
          select: { title: true, date: true, venue: true }
        }
      },
      orderBy: { submittedAt: sort === 'oldest' ? 'asc' : 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });

    const total = await prisma.registration.count({ where });

    // Map to expected format with workshopId field for compatibility
    const mappedRegistrations = registrations.map(reg => ({
      ...reg,
      workshopId: reg.workshop
    }));

    return NextResponse.json({
      success: true,
      registrations: mappedRegistrations,
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
