/**
 * Admission Form Backend Audit Endpoint
 * GET  /api/test/admission-audit?key=<AUDIT_KEY>
 *
 * Protected by AUDIT_KEY env var (or falls back to a hardcoded dev key).
 * Runs entirely server-side so it uses the real DB connection.
 * Safe to deploy: cleans up its own seed data after tests.
 *
 * REMOVE or gate this route before go-live.
 */

import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

const AUDIT_KEY = process.env.AUDIT_KEY || 'svs_audit_2026';

interface Step {
  name: string;
  pass: boolean;
  detail: string;
  data?: Record<string, unknown>;
}

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key');
  if (key !== AUDIT_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const steps: Step[] = [];
  const seedId = `adm_audit_${Date.now()}`;
  let dbOk = false;

  // ── 1. DB Connection ────────────────────────────────────────────────────────
  try {
    const [rows] = await (db as any).query('SELECT 1 AS ping');
    dbOk = (rows as any)[0].ping === 1;
    steps.push({ name: 'DB Connection', pass: dbOk, detail: dbOk ? 'Connected' : 'Ping failed' });
  } catch (e: any) {
    steps.push({ name: 'DB Connection', pass: false, detail: e.message });
    return summary(steps, seedId, false);
  }

  // ── 2. Table existence ──────────────────────────────────────────────────────
  try {
    const dbName = process.env.DB_NAME;
    const [rows] = await (db as any).query(
      "SELECT COUNT(*) AS cnt FROM information_schema.tables WHERE table_schema = ? AND table_name = 'admission_applications'",
      [dbName]
    );
    const exists = (rows as any)[0].cnt > 0;
    steps.push({ name: 'Table: admission_applications', pass: exists, detail: exists ? 'Exists' : 'NOT FOUND — run schema.sql' });
    if (!exists) return summary(steps, seedId, false);
  } catch (e: any) {
    steps.push({ name: 'Table check', pass: false, detail: e.message });
    return summary(steps, seedId, false);
  }

  // ── 3. Existing record count ────────────────────────────────────────────────
  try {
    const [rows] = await (db as any).query('SELECT COUNT(*) AS total FROM admission_applications');
    const total = (rows as any)[0].total;
    const [recent] = await (db as any).query(
      'SELECT id, fullName, phone, status, createdAt FROM admission_applications ORDER BY createdAt DESC LIMIT 5'
    );
    steps.push({
      name: 'Existing Records',
      pass: true,
      detail: `${total} total record(s)`,
      data: { total, recentFive: recent },
    });
  } catch (e: any) {
    steps.push({ name: 'Existing Records', pass: false, detail: e.message });
  }

  // ── 4. Direct INSERT ────────────────────────────────────────────────────────
  const SEED = {
    fullName: 'Priya Sharma (Audit)',
    dateOfBirth: '2000-06-15',
    gender: 'Female',
    phone: '9876543210',
    email: 'audit@svsnursing.test',
    address: '12 MG Road, Udgir, Latur 413517',
    tenthBoard: 'Maharashtra State Board',
    tenthPercent: '78.40',
    twelthBoard: 'Maharashtra State Board',
    twelthPercent: '72.60',
    twelthStream: 'Science',
    category: 'OBC',
  };
  try {
    await (db as any).execute(
      `INSERT INTO admission_applications
        (id, fullName, dateOfBirth, gender, phone, email, address,
         tenthBoard, tenthPercent, twelthBoard, twelthPercent, twelthStream,
         category, hasDisability, isAnmRegistered,
         status, notes, ipAddress, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 'pending', 'audit-seed', '127.0.0.1', NOW(), NOW())`,
      [
        seedId, SEED.fullName, SEED.dateOfBirth, SEED.gender, SEED.phone,
        SEED.email, SEED.address,
        SEED.tenthBoard, SEED.tenthPercent, SEED.twelthBoard, SEED.twelthPercent, SEED.twelthStream,
        SEED.category,
      ]
    );
    steps.push({ name: 'Direct INSERT', pass: true, detail: `Inserted seed: ${seedId}`, data: SEED });
  } catch (e: any) {
    steps.push({ name: 'Direct INSERT', pass: false, detail: e.message });
    return summary(steps, seedId, false);
  }

  // ── 5. Read-back verify ─────────────────────────────────────────────────────
  try {
    const [rows] = await (db as any).query('SELECT * FROM admission_applications WHERE id = ?', [seedId]);
    const r = (rows as any)[0];
    const pass = !!r;
    steps.push({
      name: 'Read-back Verify',
      pass,
      detail: pass ? 'Record read correctly' : 'Record not found after insert',
      data: r ? {
        id: r.id, fullName: r.fullName, gender: r.gender, phone: r.phone,
        tenthBoard: r.tenthBoard, twelthBoard: r.twelthBoard, status: r.status, createdAt: r.createdAt,
      } : undefined,
    });
  } catch (e: any) {
    steps.push({ name: 'Read-back Verify', pass: false, detail: e.message });
  }

  // ── 6. API validation logic test (phone cleaning + required fields) ─────────
  const phoneTests = [
    { input: '9876543210',   expect: true },
    { input: '+919876543210', expect: true },
    { input: '+91 9876543210', expect: true },
    { input: '98765',         expect: false },
    { input: 'abcdefghij',   expect: false },
    { input: '',              expect: false },
  ];
  const phoneResults = phoneTests.map(t => {
    const clean = t.input.replace(/^\+91[-\s]?/, '').replace(/\s/g, '');
    const valid = /^[0-9]{10}$/.test(clean);
    return { input: t.input, cleaned: clean, valid, expectedPass: t.expect, testPass: valid === t.expect };
  });
  const allPhoneOk = phoneResults.every(r => r.testPass);
  steps.push({
    name: 'Phone Validation Logic',
    pass: allPhoneOk,
    detail: allPhoneOk ? 'All 6 phone format tests passed' : 'Some phone tests failed',
    data: { tests: phoneResults },
  });

  // ── 7. Field-level required validation test ─────────────────────────────────
  const requiredTests: { label: string; body: Record<string, string>; expectError: string | null }[] = [
    {
      label: 'Missing fullName',
      body: { fullName: '', dateOfBirth: '2000-01-01', gender: 'Female', phone: '9876543210', address: 'Test', tenthBoard: 'Board', twelthBoard: 'Board', twelthStream: 'Science' },
      expectError: 'fullName is required',
    },
    {
      label: 'Missing phone',
      body: { fullName: 'Test User', dateOfBirth: '2000-01-01', gender: 'Female', phone: '', address: 'Test', tenthBoard: 'Board', twelthBoard: 'Board', twelthStream: 'Science' },
      expectError: 'phone is required',
    },
    {
      label: 'Bad phone format',
      body: { fullName: 'Test User', dateOfBirth: '2000-01-01', gender: 'Female', phone: '12345', address: 'Test', tenthBoard: 'Board', twelthBoard: 'Board', twelthStream: 'Science' },
      expectError: 'Valid 10-digit phone number is required',
    },
  ];

  const fieldTests: { label: string; pass: boolean; gotError: string | null }[] = [];
  for (const t of requiredTests) {
    // Replicate the API validation logic inline
    const { fullName, dateOfBirth, gender, phone, address, tenthBoard, twelthBoard, twelthStream } = t.body;
    const required: Record<string, string> = { fullName, dateOfBirth, gender, phone, address, tenthBoard, twelthBoard, twelthStream };
    let gotError: string | null = null;
    for (const [field, value] of Object.entries(required)) {
      if (!value || !String(value).trim()) { gotError = `${field} is required`; break; }
    }
    if (!gotError) {
      const cleanPhone = phone.replace(/^\+91[-\s]?/, '').replace(/\s/g, '');
      if (!/^[0-9]{10}$/.test(cleanPhone)) gotError = 'Valid 10-digit phone number is required';
    }
    const pass = gotError === t.expectError;
    fieldTests.push({ label: t.label, pass, gotError });
  }
  const allFieldOk = fieldTests.every(f => f.pass);
  steps.push({
    name: 'Required Field Validation Logic',
    pass: allFieldOk,
    detail: allFieldOk ? 'All 3 validation tests passed' : 'Some validation tests failed',
    data: { tests: fieldTests },
  });

  // ── 8. Cleanup ──────────────────────────────────────────────────────────────
  try {
    const [result] = await (db as any).execute(
      "DELETE FROM admission_applications WHERE notes = 'audit-seed'"
    );
    const deleted = (result as any).affectedRows;
    steps.push({ name: 'Cleanup', pass: deleted > 0, detail: `Removed ${deleted} audit seed record(s)` });
  } catch (e: any) {
    steps.push({ name: 'Cleanup', pass: false, detail: e.message });
  }

  return summary(steps, seedId, true);
}

function summary(steps: Step[], seedId: string, complete: boolean) {
  const passed = steps.filter(s => s.pass).length;
  const failed = steps.filter(s => !s.pass).length;
  return NextResponse.json({
    audit: 'Admission Form Backend Audit',
    seedId,
    complete,
    passed,
    failed,
    allPassed: failed === 0,
    steps,
  }, { status: failed === 0 ? 200 : 207 });
}
