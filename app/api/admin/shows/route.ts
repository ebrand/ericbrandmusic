import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/lib/auth";
import { getShows, writeShows } from "@/lib/data";

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
  return NextResponse.json(getShows());
}

export async function POST(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const body = await request.json();
  const shows = getShows();
  const maxId = shows.reduce((max, s) => Math.max(max, parseInt(s.id, 10) || 0), 0);
  const newShow = { ...body, id: String(maxId + 1) };
  shows.push(newShow);
  writeShows(shows);
  return NextResponse.json(newShow, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const body = await request.json();
  const shows = getShows();
  const idx = shows.findIndex((s) => s.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  shows[idx] = { ...shows[idx], ...body };
  writeShows(shows);
  return NextResponse.json(shows[idx]);
}

export async function DELETE(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const { id } = await request.json();
  const shows = getShows();
  const filtered = shows.filter((s) => s.id !== id);
  if (filtered.length === shows.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  writeShows(filtered);
  return NextResponse.json({ success: true });
}
