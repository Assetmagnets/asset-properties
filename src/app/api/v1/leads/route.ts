import { NextRequest, NextResponse } from "next/server";
import { GoldenHourLeadSchema } from "@/lib/validations";
import { decryptPII, encryptPII, maskPhoneNumber } from "@/lib/security";
import {
  addLeadToStore,
  getLeadsStore,
  getScoreOverrides,
  setScoreOverride,
} from "@/lib/prisma";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";

export async function GET(request: NextRequest) {
  const role = request.headers.get("x-admin-role") || "CONTENT_CURATOR";
  const leads = getLeadsStore();

  // RBAC Enforcement per security_compliance_architecture.md:
  // SUPER_ADMIN (Founders) gets decrypted PII & export access.
  // CONTENT_CURATOR (Marketing) cannot view raw phone numbers or export HNI database.
  const sanitizedLeads = leads.map((lead) => ({
    ...lead,
    whatsappNumberDecrypted:
      role === "SUPER_ADMIN"
        ? decryptPII(lead.whatsappNumberEncrypted)
        : null,
  }));

  return NextResponse.json({
    role,
    rbacPolicy:
      role === "SUPER_ADMIN"
        ? "Full HNI Decryption, Off-Market Pricing & Asset Score Override Enabled"
        : "Content Curator Mode: HNI Phone Numbers Masked & Bulk Export Restricted",
    leads: sanitizedLeads,
    scoreOverrides: getScoreOverrides(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if this is an Admin Asset Score Override action
    if (body.action === "OVERRIDE_ASSET_SCORE") {
      const role = request.headers.get("x-admin-role");
      if (role !== "SUPER_ADMIN") {
        return NextResponse.json(
          {
            error: "FORBIDDEN_RBAC",
            message: "Only SUPER_ADMIN (Founders) can override 100-Point Asset Scores.",
          },
          { status: 403 }
        );
      }
      const { propertyId, newScore } = body;
      if (typeof newScore !== "number" || newScore < 50 || newScore > 100) {
        return NextResponse.json(
          { error: "INVALID_SCORE", message: "Score must be between 50 and 100" },
          { status: 400 }
        );
      }
      setScoreOverride(propertyId, newScore);
      return NextResponse.json({
        status: "UPDATED",
        propertyId,
        newScore,
      });
    }

    // Standard Golden-Hour Concierge Booking Validation
    const parsed = GoldenHourLeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "VALIDATION_ERROR",
          message: parsed.error.issues[0]?.message || "Invalid booking details",
          issues: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const {
      fullName,
      whatsappNumber,
      buyerPersona,
      coDecisionMakers,
      preferredTourSlot,
      interestedPropertyId,
      utmSource,
    } = parsed.data;

    const property = CURATED_PROPERTIES.find((p) => p.id === interestedPropertyId);

    // Determine bespoke kit based on co-decision makers
    const bespokeKit: string[] = ["Leica Laser Carpet Distance Meter", "Original Bhulekh & 30-Yr EC Binder"];
    if (coDecisionMakers.some((d) => d.toLowerCase().includes("parent") || d.toLowerCase().includes("spouse"))) {
      bespokeKit.push("Physical Copper Vastu Compass & Heliodon Sun-Path Chart");
    }
    if (coDecisionMakers.some((d) => d.toLowerCase().includes("ca") || d.toLowerCase().includes("accountant") || d.toLowerCase().includes("legal"))) {
      bespokeKit.push("Odisha Female Stamp-Duty & Section 24/Depreciation Tax Audit Sheet");
    }

    const newLead = addLeadToStore({
      id: `lead-gh-${Date.now()}`,
      fullName,
      whatsappNumberMasked: maskPhoneNumber(whatsappNumber),
      whatsappNumberEncrypted: encryptPII(whatsappNumber),
      buyerPersona,
      coDecisionMakers,
      preferredTourSlot,
      interestedPropertyId: interestedPropertyId || CURATED_PROPERTIES[0].id,
      interestedPropertyTitle: property?.title || "The Sovereign Crest • Patia",
      utmSource: utmSource || "golden_hour_scheduler",
      status: "GOLDEN_HOUR_CONFIRMED",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      status: "CONFIRMED",
      bookingId: newLead.id,
      assignedSlot: preferredTourSlot,
      bespokeKitPrepared: bespokeKit,
      maskedContact: newLead.whatsappNumberMasked,
      message: `VIP Concierge Chauffeur & Audit Kit reserved for ${fullName}.`,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "SERVER_ERROR",
        message: err instanceof Error ? err.message : "Booking failed",
      },
      { status: 500 }
    );
  }
}
