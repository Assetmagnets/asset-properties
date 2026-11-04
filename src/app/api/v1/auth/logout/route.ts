import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    status: "LOGGED_OUT",
    message: "Admin session cleared successfully.",
  });

  response.cookies.set("asset_admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
