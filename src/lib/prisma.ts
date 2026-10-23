import { PrismaClient } from "@prisma/client";
import { AdvisoryLeadRecord } from "@/types/property";
import { encryptPII, maskPhoneNumber } from "@/lib/security";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  inMemoryLeads: AdvisoryLeadRecord[] | undefined;
  scoreOverrides: Record<string, number> | undefined;
};

// Initialize Prisma Client when live Neon DB credentials are configured
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Pre-seeded HNI Advisory Leads for the Admin Vault (/admin/vault) & instant local demo
const initialLeads: AdvisoryLeadRecord[] = [
  {
    id: "lead-vip-01",
    fullName: "Dr. Siddharth Mohanty (Senior Cardiologist, Apollo)",
    whatsappNumberMasked: maskPhoneNumber("+919861048291"),
    whatsappNumberEncrypted: encryptPII("+919861048291"),
    buyerPersona: "The End-Use Luxury Family (Flats & Villas)",
    coDecisionMakers: ["Spouse", "Parents (Vastu Compass Kit)"],
    preferredTourSlot: "4:30 PM Golden Hour Slot (West-Glare & Breeze Audit)",
    interestedPropertyId: "prop-aurelia-patia-01",
    interestedPropertyTitle: "The Sovereign Crest • Patia",
    utmSource: "instagram_bio_asset_properties17",
    status: "GOLDEN_HOUR_CONFIRMED",
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  },
  {
    id: "lead-vip-02",
    fullName: "Subhransu Patnaik (Principal Architect, Palo Alto / NRI)",
    whatsappNumberMasked: maskPhoneNumber("+919437019284"),
    whatsappNumberEncrypted: encryptPII("+919437019284"),
    buyerPersona: "The Outstation Odia / NRI Investor",
    coDecisionMakers: ["Legal Counsel (Bhulekh & 34-Yr EC Kit)", "Parents"],
    preferredTourSlot: "7:00 AM East Vastu Sunlight Live Drone Stream",
    interestedPropertyId: "prop-pahala-villa-03",
    interestedPropertyTitle: "Vanamali Courtyard Estates • Pahala",
    utmSource: "instagram_reel_pahala_drone",
    status: "DOSSIER_DISPATCHED",
    createdAt: new Date(Date.now() - 9 * 3600 * 1000).toISOString(),
  },
  {
    id: "lead-vip-03",
    fullName: "CA Pratyush Das & Partners",
    whatsappNumberMasked: maskPhoneNumber("+919937188420"),
    whatsappNumberEncrypted: encryptPII("+919937188420"),
    buyerPersona: "The Commercial Wealth Builder (Offices)",
    coDecisionMakers: ["Chartered Accountant (Depreciation & GST Kit)"],
    preferredTourSlot: "4:30 PM Golden Hour Slot (HVAC & Parking Audit)",
    interestedPropertyId: "prop-monolith-infocity-05",
    interestedPropertyTitle: "One Kalinga Monolith • Infocity",
    utmSource: "instagram_bio_asset_properties17",
    status: "NEW_VIP",
    createdAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
  },
];

export function getLeadsStore(): AdvisoryLeadRecord[] {
  if (!globalForPrisma.inMemoryLeads) {
    globalForPrisma.inMemoryLeads = [...initialLeads];
  }
  return globalForPrisma.inMemoryLeads;
}

export function addLeadToStore(lead: AdvisoryLeadRecord): AdvisoryLeadRecord {
  const store = getLeadsStore();
  store.unshift(lead);
  return lead;
}

export function getScoreOverrides(): Record<string, number> {
  if (!globalForPrisma.scoreOverrides) {
    globalForPrisma.scoreOverrides = {};
  }
  return globalForPrisma.scoreOverrides;
}

export function setScoreOverride(propertyId: string, newScore: number) {
  const overrides = getScoreOverrides();
  overrides[propertyId] = newScore;
}
