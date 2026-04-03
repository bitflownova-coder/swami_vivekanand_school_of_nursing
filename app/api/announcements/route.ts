import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "announcements.json");
const ADMIN_TOKEN = process.env.ANNOUNCEMENTS_ADMIN_TOKEN || "SVSAdmin@2024";

async function readAnnouncements(): Promise<string[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeAnnouncements(items: string[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}

export async function GET() {
  const data = await readAnnouncements();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (body.token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!body.text || typeof body.text !== "string" || !body.text.trim()) {
    return NextResponse.json({ error: "Announcement text is required" }, { status: 400 });
  }
  const items = await readAnnouncements();
  items.push(body.text.trim());
  await writeAnnouncements(items);
  return NextResponse.json({ success: true, announcements: items });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  if (body.token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (typeof body.index !== "number") {
    return NextResponse.json({ error: "Index is required" }, { status: 400 });
  }
  const items = await readAnnouncements();
  if (body.index < 0 || body.index >= items.length) {
    return NextResponse.json({ error: "Index out of range" }, { status: 400 });
  }
  items.splice(body.index, 1);
  await writeAnnouncements(items);
  return NextResponse.json({ success: true, announcements: items });
}
