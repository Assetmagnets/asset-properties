import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieToken = request.cookies.get("asset_admin_session")?.value;
  const authHeader = request.headers.get("authorization");
  const headerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  const token = cookieToken || headerToken;
  // Check if token exists and has basic valid format (base64url payload.signature)
  const isAuth = !!(token && token.includes(".") && token.split(".")[0].length > 10);

  // 1. If visiting /admin/login while already logged in, redirect straight to /admin/vault
  if (pathname === "/admin/login" || pathname === "/admin") {
    if (isAuth) {
      return NextResponse.redirect(new URL("/admin/vault", request.url));
    }
    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // 2. If visiting protected /admin/vault without token, redirect to /admin/login
  if (pathname.startsWith("/admin/vault")) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
