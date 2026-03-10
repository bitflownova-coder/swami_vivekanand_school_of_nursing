import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = 'SELECT * FROM workshops';
    let params: any[] = [];
    
    if (status === 'active') {
      query += ' WHERE status IN (?, ?, ?)';
      params = ['active', 'full', 'spot'];
    } else if (status) {
      query += ' WHERE status = ?';
      params = [status];
    }
    
    query += ' ORDER BY date ASC';

    const [workshops] = await db.query<RowDataPacket[]>(query, params);

    // Map id to _id for frontend compatibility
    const mappedWorkshops = workshops.map(w => ({
      ...w,
      _id: w.id
    }));

    return NextResponse.json({
      success: true,
      workshops: mappedWorkshops
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
    const formData = await request.formData();

    const workshopId = uuidv4();
    const query = `
      INSERT INTO workshops (
        id, title, description, date, dayOfWeek, venue, venueLink,
        fee, credits, maxSeats, status, spotRegistrationEnabled,
        spotRegistrationLimit
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      workshopId,
      formData.get('title') as string,
      formData.get('description') as string,
      new Date(formData.get('date') as string),
      formData.get('dayOfWeek') as string,
      formData.get('venue') as string,
      (formData.get('venueLink') as string) || '',
      Number(formData.get('fee')),
      Number(formData.get('credits')),
      Number(formData.get('maxSeats')) || 500,
      (formData.get('status') as string) || 'draft',
      formData.get('spotRegistrationEnabled') === 'true',
      Number(formData.get('spotRegistrationLimit')) || 50,
    ];

    await db.query<ResultSetHeader>(query, params);

    const [workshops] = await db.query<RowDataPacket[]>(
      'SELECT * FROM workshops WHERE id = ?',
      [workshopId]
    );

    const workshop = { ...workshops[0], _id: workshops[0].id };

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
