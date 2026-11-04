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
    // 1. Anti-Scraper Rate Limiting (Max 5 Dossier Requests per IP per hour for seamless client UX)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    const rateStatus = await checkRateLimit(`dossier:${clientIp}`, 5, 60 * 60 * 1000);
    if (!rateStatus.allowed) {
      return NextResponse.json(
        {
          error: "RATE_LIMIT_EXCEEDED",
          message: `Anti-Scraper Safeguard Active: Maximum 5 legal dossier dispatches allowed per hour. Please retry in ${rateStatus.resetInMinutes} minutes or contact our Senior Advisor directly.`,
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

    // 5. Persist Lead to Neon PostgreSQL
    let savedLeadId = `lead-${Date.now()}`;
    try {
      // Find property in database if present
      let dbPropId: string | null = null;
      const dbProp = await prisma.property.findFirst({
        where: {
          OR: [{ id: targetProperty.id }, { slug: targetProperty.slug }],
        },
      });
      if (dbProp) {
        dbPropId = dbProp.id;
      }

      const dbLead = await prisma.advisoryLead.create({
        data: {
          fullName,
          whatsappNumber: encryptedPhone,
          whatsappNumberMasked: maskedPhone,
          buyerPersona,
          coDecisionMakers: ["WhatsApp Legal Dossier Request"],
          preferredTourSlot: "Pending Dossier Review",
          interestedPropertyId: dbPropId,
          interestedPropertyTitle: targetProperty.title,
          utmSource: utmSource || "instagram_asset_properties17",
          status: "DOSSIER_DISPATCHED",
          leadType: "DOSSIER",
        },
      });
      savedLeadId = dbLead.id;
    } catch (err) {
      console.warn("Neon DB lead insertion warning:", err);
    }

    const savedLead = addLeadToStore({
      id: savedLeadId,
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
