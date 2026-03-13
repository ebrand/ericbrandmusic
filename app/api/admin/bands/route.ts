import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/lib/auth";
import { getBands, createBand, updateBand, deleteBand } from "@/lib/data";

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
  const bands = await getBands();
  return NextResponse.json(bands);
}

export async function POST(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const body = await request.json();
  const id = body.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const newBand = await createBand({ ...body, id });
  return NextResponse.json(newBand, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const { id, ...fields } = await request.json();
  const updated = await updateBand(id, fields);
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const { id } = await request.json();
  await deleteBand(id);
  return NextResponse.json({ success: true });
}
