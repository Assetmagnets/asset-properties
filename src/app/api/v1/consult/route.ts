import { NextRequest, NextResponse } from "next/server";
import { prisma, addLeadToStore } from "@/lib/prisma";
import { encryptPII, maskPhoneNumber } from "@/lib/security";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      phoneNumber,
      email,
      consultationMode,
      budgetRange,
      preferredLocation,
      notes,
    } = body;

    // Validate required fields
    if (!fullName || !fullName.trim()) {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", message: "Please provide your full name." },
        { status: 400 }
      );
    }

    const cleanPhone = String(phoneNumber || "").replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", message: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    const finalPhone = cleanPhone.slice(-10);
    const maskedPhone = maskPhoneNumber(finalPhone);
    const encryptedPhone = encryptPII(finalPhone);

    const modeText = consultationMode || "Phone Advisory";
    const budgetText = budgetRange || "Not Specified";
    const locationText = preferredLocation || "Bhubaneswar Sanctuary";

    // Format co-decision & consultation details
    const consultationDetails: string[] = [
      `Mode: ${modeText}`,
      `Budget: ${budgetText}`,
    ];
    if (email && email.trim()) {
      consultationDetails.push(`Email: ${email.trim()}`);
    }

    let savedLeadId = `consult-${Date.now()}`;

    // Persist directly to Neon PostgreSQL
    try {
      const dbLead = await prisma.advisoryLead.create({
        data: {
          fullName: fullName.trim(),
          whatsappNumber: encryptedPhone,
          whatsappNumberMasked: maskedPhone,
          buyerPersona: budgetText,
          coDecisionMakers: consultationDetails,
          preferredTourSlot: modeText,
          interestedPropertyTitle: locationText,
          encryptedNotes: notes ? encryptPII(notes.trim()) : null,
          utmSource: "direct_consultation_form",
          status: "NEW_VIP",
          leadType: "CONSULTATION",
        },
      });
      savedLeadId = dbLead.id;
    } catch (dbErr) {
      console.warn("Neon DB consultation insert warning:", dbErr);
    }

    // Keep memory cache updated
    addLeadToStore({
      id: savedLeadId,
      fullName: fullName.trim(),
      whatsappNumberMasked: maskedPhone,
      whatsappNumberEncrypted: encryptedPhone,
      buyerPersona: budgetText,
      coDecisionMakers: consultationDetails,
      preferredTourSlot: modeText,
      interestedPropertyId: "general-consultation",
      interestedPropertyTitle: locationText,
      utmSource: "direct_consultation_form",
      status: "NEW_VIP",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      status: "SUCCESS",
      consultationId: savedLeadId,
      message: `Thank you, ${fullName.trim()}. A Senior Real Estate Advisor will contact you on ${maskedPhone}.`,
      advisorContact: {
        phone: "+91 9777295707",
        whatsapp: "+91 9777295707",
        email: "info@assetmagnets.com",
        office: "Infocity Corridor, Patia, Bhubaneswar",
      },
    });
  } catch (error) {
    console.error("Consultation Submission Error:", error);
    return NextResponse.json(
      {
        error: "INTERNAL_ERROR",
        message: error instanceof Error ? error.message : "Unable to book consultation.",
      },
      { status: 500 }
    );
  }
}
