import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  verifyPassword,
  createAdminSessionToken,
  hashPassword,
} from "@/lib/security";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "MISSING_CREDENTIALS", message: "Email and password are required." },
        { status: 400 }
      );
    }

    const trimmedEmail = String(email).trim().toLowerCase();

    // Query AdminUser from Neon PostgreSQL
    let admin = await prisma.adminUser.findUnique({
      where: { email: trimmedEmail },
    });

    // Auto-seed admin if database was freshly initialized with matching credentials
    if (!admin && trimmedEmail === "properties@assetmagnets.com") {
      const passwordHash = hashPassword("Assetmagnets@2026");
      admin = await prisma.adminUser.create({
        data: {
          email: "properties@assetmagnets.com",
          passwordHash,
          name: "Asset Magnets CIO",
          role: "SUPER_ADMIN",
        },
      });
    }

    if (!admin) {
      return NextResponse.json(
        { error: "INVALID_CREDENTIALS", message: "Invalid administrator email or password." },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "INVALID_CREDENTIALS", message: "Invalid administrator email or password." },
        { status: 401 }
      );
    }

    // Generate signed session token
    const token = createAdminSessionToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
      name: admin.name,
    });

    const response = NextResponse.json({
      status: "AUTHENTICATED",
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
      message: "Admin authentication successful.",
    });

    // Set secure HTTP-only cookie
    response.cookies.set("asset_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Admin Login Error:", error);
    return NextResponse.json(
      {
        error: "INTERNAL_ERROR",
        message: error instanceof Error ? error.message : "Authentication failed.",
      },
      { status: 500 }
    );
  }
}
