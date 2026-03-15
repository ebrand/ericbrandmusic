import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/lib/auth";
import {
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "@/lib/data";

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
  const posts = await getBlogPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const body = await request.json();
  const newPost = await createBlogPost(body);
  return NextResponse.json(newPost, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const { id, ...fields } = await request.json();
  const updated = await updateBlogPost(id, fields);
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const { id } = await request.json();
  await deleteBlogPost(id);
  return NextResponse.json({ success: true });
}
