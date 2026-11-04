import { NextRequest, NextResponse } from "next/server";
import { GoldenHourLeadSchema } from "@/lib/validations";
import {
  decryptPII,
  encryptPII,
  maskPhoneNumber,
  verifyAdminSessionToken,
} from "@/lib/security";
import {
  prisma,
  addLeadToStore,
  getLeadsStore,
  getScoreOverrides,
  setScoreOverride,
} from "@/lib/prisma";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";

function getAuthenticatedAdminRole(request: NextRequest): string {
  // Check cookie first
  const cookie = request.cookies.get("asset_admin_session")?.value;
  if (cookie) {
    const verified = verifyAdminSessionToken(cookie);
    if (verified.valid && verified.payload) {
      return verified.payload.role;
    }
  }

  // Check Authorization header
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    const verified = verifyAdminSessionToken(token);
    if (verified.valid && verified.payload) {
      return verified.payload.role;
    }
  }

  // Fallback to simulated role header if provided (e.g. for curator demo)
  return request.headers.get("x-admin-role") || "CONTENT_CURATOR";
}

export async function GET(request: NextRequest) {
  const role = getAuthenticatedAdminRole(request);
  let leads: any[] = [];

  try {
    const dbLeads = await prisma.advisoryLead.findMany({
      include: {
        property: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (dbLeads && dbLeads.length > 0) {
      leads = dbLeads.map((lead) => {
        let plainPhone = "";
        try {
          plainPhone = decryptPII(lead.whatsappNumber);
        } catch {
          plainPhone = lead.whatsappNumber;
        }

        const maskedPhone = lead.whatsappNumberMasked || maskPhoneNumber(plainPhone || lead.whatsappNumber);

        return {
          id: lead.id,
          fullName: lead.fullName,
          whatsappNumberMasked: maskedPhone,
          whatsappNumberEncrypted: lead.whatsappNumber,
          whatsappNumberDecrypted: role === "SUPER_ADMIN" ? plainPhone : null,
          buyerPersona: lead.buyerPersona,
          coDecisionMakers: lead.coDecisionMakers || [],
          preferredTourSlot: lead.preferredTourSlot,
          interestedPropertyId: lead.interestedPropertyId,
          interestedPropertyTitle: lead.interestedPropertyTitle || lead.property?.title || "Bhubaneswar Sanctuary",
          utmSource: lead.utmSource,
          status: lead.status,
          leadType: lead.leadType,
          createdAt: lead.createdAt.toISOString(),
        };
      });
    }
  } catch (error) {
    console.warn("Neon DB query fallback to memory store:", error);
  }

  // If DB query returned nothing, check memory store for real leads submitted during this runtime
  if (leads.length === 0) {
    const memoryLeads = getLeadsStore();
    leads = memoryLeads.map((lead) => ({
      ...lead,
      whatsappNumberDecrypted:
        role === "SUPER_ADMIN"
          ? decryptPII(lead.whatsappNumberEncrypted)
          : null,
    }));
  }

  return NextResponse.json({
    role,
    rbacPolicy:
      role === "SUPER_ADMIN"
        ? "Full HNI Decryption, Neon DB Real-Time Sync & Asset Score Override Enabled"
        : "Content Curator Mode: HNI Phone Numbers Masked & Bulk Export Restricted",
    leads,
    scoreOverrides: getScoreOverrides(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const role = getAuthenticatedAdminRole(request);

    // 1. Admin Asset Score Override Action
    if (body.action === "OVERRIDE_ASSET_SCORE") {
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

      // Persist in Neon DB
      try {
        await prisma.property.update({
          where: { id: propertyId },
          data: { assetScoreTotal: newScore },
        });
      } catch (err) {
        console.warn("Unable to persist score override in DB:", err);
      }

      return NextResponse.json({
        status: "UPDATED",
        propertyId,
        newScore,
      });
    }

    // 2. Admin Lead Status Update Action
    if (body.action === "UPDATE_LEAD_STATUS") {
      const { leadId, newStatus } = body;
      if (!leadId || !newStatus) {
        return NextResponse.json(
          { error: "INVALID_PARAMETERS", message: "leadId and newStatus are required." },
          { status: 400 }
        );
      }

      try {
        await prisma.advisoryLead.update({
          where: { id: leadId },
          data: { status: newStatus },
        });
      } catch (err) {
        console.warn("Unable to update lead in DB:", err);
      }

      // Update in memory store as well
      const store = getLeadsStore();
      const existing = store.find((l) => l.id === leadId);
      if (existing) {
        existing.status = newStatus;
      }

      return NextResponse.json({
        status: "UPDATED",
        leadId,
        newStatus,
      });
    }

    // 3. Admin Delete Lead Action
    if (body.action === "DELETE_LEAD") {
      if (role !== "SUPER_ADMIN") {
        return NextResponse.json(
          { error: "FORBIDDEN_RBAC", message: "Only SUPER_ADMIN can delete records." },
          { status: 403 }
        );
      }
      const { leadId } = body;
      try {
        await prisma.advisoryLead.delete({ where: { id: leadId } });
      } catch (err) {
        console.warn("Unable to delete lead from DB:", err);
      }
      return NextResponse.json({ status: "DELETED", leadId });
    }

    // 4. Standard Golden-Hour Concierge Booking
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

    let propertyTitle = "The Sovereign Crest • Patia";
    let validPropertyId: string | null = null;

    // Check if property exists in DB
    try {
      if (interestedPropertyId) {
        const found = await prisma.property.findUnique({
          where: { id: interestedPropertyId },
        });
        if (found) {
          validPropertyId = found.id;
          propertyTitle = found.title;
        }
      }
    } catch {
      // Fallback to static check
      const staticProp = CURATED_PROPERTIES.find((p) => p.id === interestedPropertyId);
      if (staticProp) {
        propertyTitle = staticProp.title;
      }
    }

    // Determine bespoke kit
    const bespokeKit: string[] = [
      "Leica Laser Carpet Distance Meter",
      "Original Bhulekh & 30-Yr EC Binder",
    ];
    if (
      coDecisionMakers.some(
        (d) => d.toLowerCase().includes("parent") || d.toLowerCase().includes("spouse")
      )
    ) {
      bespokeKit.push("Physical Copper Vastu Compass & Heliodon Sun-Path Chart");
    }
    if (
      coDecisionMakers.some(
        (d) =>
          d.toLowerCase().includes("ca") ||
          d.toLowerCase().includes("accountant") ||
          d.toLowerCase().includes("legal")
      )
    ) {
      bespokeKit.push("Odisha Female Stamp-Duty & Section 24/Depreciation Tax Audit Sheet");
    }

    const encryptedPhone = encryptPII(whatsappNumber);
    const maskedPhone = maskPhoneNumber(whatsappNumber);

    // Persist into Neon DB
    let createdLeadId = `lead-gh-${Date.now()}`;
    try {
      const dbLead = await prisma.advisoryLead.create({
        data: {
          fullName,
          whatsappNumber: encryptedPhone,
          whatsappNumberMasked: maskedPhone,
          buyerPersona,
          coDecisionMakers,
          preferredTourSlot,
          interestedPropertyId: validPropertyId,
          interestedPropertyTitle: propertyTitle,
          utmSource: utmSource || "golden_hour_scheduler",
          status: "GOLDEN_HOUR_CONFIRMED",
          leadType: "GOLDEN_HOUR",
        },
      });
      createdLeadId = dbLead.id;
    } catch (dbErr) {
      console.error("Neon DB write error, storing in memory:", dbErr);
    }

    addLeadToStore({
      id: createdLeadId,
      fullName,
      whatsappNumberMasked: maskedPhone,
      whatsappNumberEncrypted: encryptedPhone,
      buyerPersona,
      coDecisionMakers,
      preferredTourSlot,
      interestedPropertyId: validPropertyId || interestedPropertyId || CURATED_PROPERTIES[0].id,
      interestedPropertyTitle: propertyTitle,
      utmSource: utmSource || "golden_hour_scheduler",
      status: "GOLDEN_HOUR_CONFIRMED",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      status: "CONFIRMED",
      bookingId: createdLeadId,
      assignedSlot: preferredTourSlot,
      bespokeKitPrepared: bespokeKit,
      maskedContact: maskedPhone,
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
