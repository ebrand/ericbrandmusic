import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/lib/auth";
import { getBands, writeBands } from "@/lib/data";

async function guard() {
  const session = await validateSession();
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  return NextResponse.json(getBands());
}

export async function POST(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const body = await request.json();
  const bands = getBands();
  const id = body.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const newBand = { ...body, id };
  bands.push(newBand);
  writeBands(bands);
  return NextResponse.json(newBand, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const body = await request.json();
  const bands = getBands();
  const idx = bands.findIndex((b) => b.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  bands[idx] = { ...bands[idx], ...body };
  writeBands(bands);
  return NextResponse.json(bands[idx]);
}

export async function DELETE(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const { id } = await request.json();
  const bands = getBands();
  const filtered = bands.filter((b) => b.id !== id);
  if (filtered.length === bands.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  writeBands(filtered);
  return NextResponse.json({ success: true });
}
