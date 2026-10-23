import { NextRequest, NextResponse } from "next/server";
import { DossierRequestSchema } from "@/lib/validations";
import {
  checkRateLimit,
  createSignedDossierToken,
  encryptPII,
  generateWatermarkStamp,
  maskPhoneNumber,
} from "@/lib/security";
import { addLeadToStore, prisma } from "@/lib/prisma";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";

export async function POST(request: NextRequest) {
  try {
    // 1. Anti-Scraper Rate Limiting (Max 3 Dossier Requests per IP per hour)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    const rateStatus = await checkRateLimit(`dossier:${clientIp}`, 3, 60 * 60 * 1000);
    if (!rateStatus.allowed) {
      return NextResponse.json(
        {
          error: "RATE_LIMIT_EXCEEDED",
          message: `Anti-Scraper Safeguard Active: Maximum 3 legal dossier dispatches allowed per hour. Please retry in ${rateStatus.resetInMinutes} minutes or contact our Senior Advisor directly.`,
        },
        { status: 429 }
      );
    }

    // 2. Strict Zod Input Validation
    const body = await request.json();
    const parsed = DossierRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "VALIDATION_ERROR",
          message: parsed.error.issues[0]?.message || "Invalid input parameters",
          issues: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const { fullName, whatsappNumber, buyerPersona, propertySlug, utmSource } =
      parsed.data;

    const targetProperty =
      CURATED_PROPERTIES.find((p) => p.slug === propertySlug || p.id === propertySlug) ||
      CURATED_PROPERTIES[0];

    // 3. DPDP Act 2023 Compliance: Field-Level AES-256-GCM Encryption
    const encryptedPhone = encryptPII(whatsappNumber);
    const maskedPhone = maskPhoneNumber(whatsappNumber);

    // 4. Generate Dynamic Watermark & 15-Minute Signed Expiring URL
    const watermarkStamp = generateWatermarkStamp(whatsappNumber);
    const signedToken = createSignedDossierToken(
      targetProperty.slug,
      fullName,
      whatsappNumber,
      15
    );
    const signedDossierUrl = `/api/v1/concierge/dossier/download?token=${encodeURIComponent(
      signedToken
    )}`;

    // 5. Persist Lead (Attempts Neon PostgreSQL via Prisma, gracefully syncs with memory vault)
    try {
      if (
        process.env.DATABASE_URL &&
        !process.env.DATABASE_URL.includes("password@ep-bhubaneswar")
      ) {
        await prisma.advisoryLead.create({
          data: {
            fullName,
            whatsappNumber: encryptedPhone,
            buyerPersona,
            coDecisionMakers: ["Self (Dossier Gate)"],
            utmSource,
            status: "DOSSIER_DISPATCHED",
          },
        });
      }
    } catch {
      // Fallback to in-memory encrypted HNI store when local/demo DB is offline
    }

    const savedLead = addLeadToStore({
      id: `lead-${Date.now()}`,
      fullName,
      whatsappNumberMasked: maskedPhone,
      whatsappNumberEncrypted: encryptedPhone,
      buyerPersona,
      coDecisionMakers: ["WhatsApp Legal Dossier Request"],
      preferredTourSlot: "Pending Dossier Review",
      interestedPropertyId: targetProperty.id,
      interestedPropertyTitle: targetProperty.title,
      utmSource: utmSource || "instagram_asset_properties17",
      status: "DOSSIER_DISPATCHED",
      watermarkToken: signedToken,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      status: "DISPATCHED",
      message: `Watermarked Legal & Floor Plan Dossier prepared for ${maskedPhone}`,
      dossierMeta: {
        leadId: savedLead.id,
        propertyTitle: targetProperty.title,
        oreraNumber: targetProperty.oreraNumber,
        bhulekhKhataPlot: targetProperty.bhulekhKhataPlot,
        watermarkStamp,
        signedDossierUrl,
        expiresInMinutes: 15,
        remainingRequestsThisHour: rateStatus.remaining,
        dpdpCompliance: "AES-256-GCM Encrypted • DPDP Act 2023 Compliant",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "INTERNAL_ERROR",
        message:
          error instanceof Error
            ? error.message
            : "Unable to process dossier request",
      },
      { status: 500 }
    );
  }
}
