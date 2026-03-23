import { NextResponse } from 'next/server';

// Legacy spot-register endpoint removed.
// All registrations (online + spot) now go through ICICI payment gateway
// via /api/cne/payment/initiate with registrationType='spot'.

export async function POST() {
  return NextResponse.json(
    { success: false, error: 'This endpoint has been deprecated. Use /api/cne/payment/initiate with registrationType=spot instead.' },
    { status: 410 }
  );
}
