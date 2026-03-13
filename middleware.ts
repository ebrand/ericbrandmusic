import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login and authenticate pages through
  if (pathname === "/admin/login" || pathname === "/admin/authenticate") {
    return NextResponse.next();
  }

  // Check for session cookie
  const sessionJwt = request.cookies.get("stytch_session_jwt")?.value;
  if (!sessionJwt) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
