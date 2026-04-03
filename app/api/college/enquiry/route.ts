import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email = '', course = '', message = '', source = 'contact' } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    }
    if (!phone || !/^[0-9]{10}$/.test(phone.trim())) {
      return NextResponse.json({ success: false, error: 'Valid 10-digit phone number is required' }, { status: 400 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || '';

    const id = `enq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    await db.execute(
      `INSERT INTO enquiries (id, name, phone, email, course, message, source, ipAddress, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [id, name.trim(), phone.trim(), email.trim(), course.trim(), message.trim(), source, ip]
    );

    return NextResponse.json({ success: true, message: 'Enquiry submitted successfully' });
  } catch (error: any) {
    console.error('Enquiry submission error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit enquiry' }, { status: 500 });
  }
}
