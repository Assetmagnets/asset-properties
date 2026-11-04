import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSessionToken } from "@/lib/security";

export async function GET(request: NextRequest) {
  // Check cookie or Authorization header
  const cookieToken = request.cookies.get("asset_admin_session")?.value;
  const authHeader = request.headers.get("authorization");
  const headerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  const token = cookieToken || headerToken;

  if (!token) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  const result = verifyAdminSessionToken(token);
  if (!result.valid || !result.payload) {
    return NextResponse.json(
      { authenticated: false, expired: result.expired || false, user: null },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: result.payload.adminId,
      email: result.payload.email,
      name: result.payload.name,
      role: result.payload.role,
    },
  });
}
