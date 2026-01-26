import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

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
    const [workshops] = await db.query<RowDataPacket[]>(
      'SELECT * FROM workshops WHERE id = ?',
      [workshopId]
    );

    if (workshops.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Workshop not found' },
        { status: 404 }
      );
    }

    const workshop = workshops[0];

    if (!['active', 'spot'].includes(workshop.status)) {
      return NextResponse.json(
        { success: false, error: 'Workshop is not accepting registrations' },
        { status: 400 }
      );
    }

    // Check for duplicate registration
    const [existingRegs] = await db.query<RowDataPacket[]>(
      'SELECT id FROM registrations WHERE workshopId = ? AND mncUID = ?',
      [workshopId, mncUID]
    );

    if (existingRegs.length > 0) {
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

    // Convert screenshot to base64
    const bytes = await paymentScreenshot.arrayBuffer();
    const screenshotBase64 = `data:${paymentScreenshot.type};base64,${Buffer.from(bytes).toString('base64')}`;

    // Get next form number
    const [lastReg] = await db.query<RowDataPacket[]>(
      'SELECT formNumber FROM registrations WHERE workshopId = ? ORDER BY formNumber DESC LIMIT 1',
      [workshopId]
    );
    
    const formNumber = lastReg.length > 0 ? lastReg[0].formNumber + 1 : 1;

    // Create registration
    const registrationId = uuidv4();
    await db.query<ResultSetHeader>(
      `INSERT INTO registrations (
        id, workshopId, formNumber, fullName, mncUID, mncRegistrationNumber, 
        mobileNumber, paymentUTR, paymentScreenshot, registrationType
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [registrationId, workshopId, formNumber, fullName.trim(), mncUID, mncRegistrationNumber, 
       mobileNumber, paymentUTR.trim(), screenshotBase64, registrationType]
    );

    // Update workshop registration count
    if (registrationType === 'spot') {
      await db.query<ResultSetHeader>(
        `UPDATE workshops 
         SET currentSpotRegistrations = currentSpotRegistrations + 1,
             currentRegistrations = currentRegistrations + 1
         WHERE id = ?`,
        [workshopId]
      );
    } else {
      await db.query<ResultSetHeader>(
        `UPDATE workshops SET currentRegistrations = currentRegistrations + 1 WHERE id = ?`,
        [workshopId]
      );
    }

    // Check if workshop is now full
    const [updatedWorkshops] = await db.query<RowDataPacket[]>(
      'SELECT currentRegistrations, maxSeats FROM workshops WHERE id = ?',
      [workshopId]
    );
    
    if (updatedWorkshops.length > 0 && updatedWorkshops[0].currentRegistrations >= updatedWorkshops[0].maxSeats) {
      await db.query<ResultSetHeader>(
        `UPDATE workshops SET status = 'full' WHERE id = ?`,
        [workshopId]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      data: {
        formNumber,
        fullName: fullName.trim(),
        workshopTitle: workshop.title,
        workshopDate: workshop.date
      }
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error submitting registration:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
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

    let query = `
      SELECT r.*, w.title as workshopTitle, w.date as workshopDate, w.venue as workshopVenue
      FROM registrations r
      JOIN workshops w ON r.workshopId = w.id
    `;
    const params: any[] = [];

    if (workshopId) {
      query += ' WHERE r.workshopId = ?';
      params.push(workshopId);
    }

    query += ' ORDER BY r.submittedAt DESC';

    const [registrations] = await db.query<RowDataPacket[]>(query, params);

    // Map id to _id for frontend compatibility
    const mappedRegistrations = registrations.map(reg => ({
      _id: reg.id,
      formNumber: reg.formNumber,
      fullName: reg.fullName,
      mncUID: reg.mncUID,
      mncRegistrationNumber: reg.mncRegistrationNumber,
      mobileNumber: reg.mobileNumber,
      paymentUTR: reg.paymentUTR,
      paymentScreenshot: reg.paymentScreenshot,
      registrationType: reg.registrationType,
      attendanceStatus: reg.attendanceStatus,
      submittedAt: reg.submittedAt,
      downloadCount: reg.downloadCount,
      workshopId: {
        _id: reg.workshopId,
        title: reg.workshopTitle,
        date: reg.workshopDate,
        venue: reg.workshopVenue
      }
    }));

    return NextResponse.json({
      success: true,
      registrations: mappedRegistrations
    });
  } catch (error: any) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}
