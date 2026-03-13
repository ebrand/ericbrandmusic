import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/lib/auth";
import { getGearRows, createGearRow, updateGearRow, deleteGearRow } from "@/lib/data";

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
  const rows = await getGearRows();
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const body = await request.json();
  const row = await createGearRow(body);
  return NextResponse.json(row, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const { id, ...fields } = await request.json();
  const updated = await updateGearRow(id, fields);
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const { id } = await request.json();
  await deleteGearRow(id);
  return NextResponse.json({ success: true });
}
