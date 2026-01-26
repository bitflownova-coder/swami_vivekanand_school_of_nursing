import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const [workshops] = await db.query<RowDataPacket[]>(
      'SELECT * FROM workshops WHERE id = ?',
      [id]
    );

    if (workshops.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Workshop not found' },
        { status: 404 }
      );
    }

    const workshop = { ...workshops[0], _id: workshops[0].id };

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
    const { id } = await context.params;
    const body = await request.json();
    
    const updates: string[] = [];
    const params: any[] = [];
    
    if (body.title) { updates.push('title = ?'); params.push(body.title); }
    if (body.description) { updates.push('description = ?'); params.push(body.description); }
    if (body.date) { updates.push('date = ?'); params.push(new Date(body.date)); }
    if (body.dayOfWeek) { updates.push('dayOfWeek = ?'); params.push(body.dayOfWeek); }
    if (body.venue) { updates.push('venue = ?'); params.push(body.venue); }
    if (body.venueLink !== undefined) { updates.push('venueLink = ?'); params.push(body.venueLink); }
    if (body.fee !== undefined) { updates.push('fee = ?'); params.push(Number(body.fee)); }
    if (body.credits !== undefined) { updates.push('credits = ?'); params.push(Number(body.credits)); }
    if (body.maxSeats !== undefined) { updates.push('maxSeats = ?'); params.push(Number(body.maxSeats)); }
    if (body.status) { updates.push('status = ?'); params.push(body.status); }
    if (body.spotRegistrationEnabled !== undefined) { updates.push('spotRegistrationEnabled = ?'); params.push(body.spotRegistrationEnabled); }
    if (body.spotRegistrationLimit !== undefined) { updates.push('spotRegistrationLimit = ?'); params.push(Number(body.spotRegistrationLimit)); }
    if (body.paymentQRCode !== undefined) { updates.push('paymentQRCode = ?'); params.push(body.paymentQRCode); }
    if (body.upiId !== undefined) { updates.push('upiId = ?'); params.push(body.upiId); }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    params.push(id);
    const query = `UPDATE workshops SET ${updates.join(', ')} WHERE id = ?`;
    
    const [result] = await db.query<ResultSetHeader>(query, params);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Workshop not found' },
        { status: 404 }
      );
    }

    const [workshops] = await db.query<RowDataPacket[]>(
      'SELECT * FROM workshops WHERE id = ?',
      [id]
    );

    const workshop = { ...workshops[0], _id: workshops[0].id };

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
    const { id } = await context.params;

    const [result] = await db.query<ResultSetHeader>(
      'DELETE FROM workshops WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
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
