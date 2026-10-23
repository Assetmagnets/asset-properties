import { z } from "zod";

const indianPhoneRegex = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/;

export const DossierRequestSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Name exceeds maximum length")
    .trim(),
  whatsappNumber: z
    .string()
    .trim()
    .regex(indianPhoneRegex, "Enter a valid 10-digit Indian WhatsApp number"),
  buyerPersona: z
    .enum([
      "END_USE_FAMILY",
      "NRI_OUTSTATION_INVESTOR",
      "COMMERCIAL_WEALTH_BUILDER",
    ])
    .default("END_USE_FAMILY"),
  propertySlug: z.string().min(1, "Property slug is required"),
  utmSource: z.string().optional().default("instagram_asset_properties17"),
  investmentTicketNote: z.string().max(300).optional(),
});

export const GoldenHourLeadSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name is required")
    .max(80)
    .trim(),
  whatsappNumber: z
    .string()
    .trim()
    .regex(indianPhoneRegex, "Enter a valid 10-digit WhatsApp number"),
  buyerPersona: z.string().min(2),
  coDecisionMakers: z
    .array(z.string())
    .min(1, "Select at least one decision-maker profile so we prepare the right kit"),
  preferredTourSlot: z.string().min(3, "Select a preferred tour slot"),
  interestedPropertyId: z.string().optional(),
  preferredDate: z.string().optional(),
  specialNotes: z.string().max(400).optional(),
  utmSource: z.string().optional().default("direct_concierge"),
});

export const OdishaCalculatorSchema = z.object({
  mode: z.enum([
    "STAMP_DUTY_BUILDER",
    "COST_OF_WAITING",
    "COMMERCIAL_RENT_TO_WEALTH",
  ]),
  basePropertyValueInr: z.number().min(5000000).max(250000000),
  registryGender: z.enum(["FEMALE_6_PCT", "MALE_7_PCT", "JOINT_6_5_PCT"]).optional(),
  isReadyToMoveOC: z.boolean().optional(),
  corridor: z.string().optional(),
  monthlyCommercialRentInr: z.number().min(25000).max(2000000).optional(),
  corporateTaxBracketPct: z.number().min(15).max(42).optional(),
});
