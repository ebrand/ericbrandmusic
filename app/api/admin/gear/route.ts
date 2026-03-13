import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/lib/auth";
import { getGear, writeGear } from "@/lib/data";

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
  return NextResponse.json(getGear());
}

export async function PUT(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const body = await request.json();
  writeGear(body);
  return NextResponse.json(body);
}
