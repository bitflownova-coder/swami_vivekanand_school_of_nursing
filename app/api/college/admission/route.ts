import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName, dateOfBirth, gender, phone, email = '', address,
      tenthBoard, tenthPercent = '', twelthBoard, twelthPercent = '', twelthStream,
      category = 'General', hasDisability = false, isAnmRegistered = false,
    } = body;

    // Validate required fields
    const required: Record<string, string> = {
      fullName, dateOfBirth, gender, phone, address,
      tenthBoard, twelthBoard, twelthStream,
    };
    for (const [field, value] of Object.entries(required)) {
      if (!value || !String(value).trim()) {
        return NextResponse.json({ success: false, error: `${field} is required` }, { status: 400 });
      }
    }
    const cleanPhone = phone.trim().replace(/^\+91[-\s]?/, '').replace(/\s/g, '');
    if (!/^[0-9]{10}$/.test(cleanPhone)) {
      return NextResponse.json({ success: false, error: 'Valid 10-digit phone number is required' }, { status: 400 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || '';

    const id = `adm_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    await db.execute(
      `INSERT INTO admission_applications
        (id, fullName, dateOfBirth, gender, phone, email, address,
         tenthBoard, tenthPercent, twelthBoard, twelthPercent, twelthStream,
         category, hasDisability, isAnmRegistered,
         status, notes, ipAddress, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', '', ?, NOW(), NOW())`,
      [
        id,
        fullName.trim(), dateOfBirth.trim(), gender.trim(), cleanPhone,
        email.trim(), address.trim(),
        tenthBoard.trim(), tenthPercent.trim(), twelthBoard.trim(), twelthPercent.trim(), twelthStream.trim(),
        category.trim(), hasDisability ? 1 : 0, isAnmRegistered ? 1 : 0,
        ip,
      ]
    );

    return NextResponse.json({ success: true, id, message: 'Application submitted successfully' });
  } catch (error: any) {
    console.error('Admission submission error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit application' }, { status: 500 });
  }
}
