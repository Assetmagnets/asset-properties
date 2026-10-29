import { PrismaClient } from "@prisma/client";
import { AdvisoryLeadRecord } from "@/types/property";
import { encryptPII, maskPhoneNumber } from "@/lib/security";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  inMemoryLeads: AdvisoryLeadRecord[] | undefined;
  scoreOverrides: Record<string, number> | undefined;
};

// Lazily initialize Prisma Client when accessed
function getPrismaInstance(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }
  try {
    const client = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error"] : ["error"],
    });
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = client;
    }
    return client;
  } catch (err) {
    console.warn("[Asset Properties Advisory] Prisma Client notice:", err);
    return new Proxy({} as PrismaClient, {
      get(_target, prop) {
        throw new Error(
          `Prisma client could not be initialized for '${String(prop)}'. Run 'npm run prisma:generate' or verify DATABASE_URL.`
        );
      },
    });
  }
}

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const instance = getPrismaInstance();
    const value = Reflect.get(instance, prop);
    if (typeof value === "function") {
      return value.bind(instance);
    }
    return value;
  },
});

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
  {
    id: "lead-vip-04",
    fullName: "Justice (Retd.) B. K. Mishra & Family",
    whatsappNumberMasked: maskPhoneNumber("+919437255109"),
    whatsappNumberEncrypted: encryptPII("+919437255109"),
    buyerPersona: "The Generational Legacy Homebuyer",
    coDecisionMakers: ["High Court Advocate Son", "Architect"],
    preferredTourSlot: "4:30 PM Golden Hour Slot (West-Glare & Breeze Audit)",
    interestedPropertyId: "prop-atelier-saheed-02",
    interestedPropertyTitle: "Atelier 27 • Saheed Nagar",
    utmSource: "referral_judicial_circle",
    status: "LEGAL_UNDERWRITING",
    createdAt: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
  },
  {
    id: "lead-vip-05",
    fullName: "Debashish Rout (Director, Silicon Valley MedTech)",
    whatsappNumberMasked: maskPhoneNumber("+919777412033"),
    whatsappNumberEncrypted: encryptPII("+919777412033"),
    buyerPersona: "The Outstation Odia / NRI Investor",
    coDecisionMakers: ["Spouse", "Family Office Trust Officer"],
    preferredTourSlot: "7:00 AM East Vastu Sunlight Live Drone Stream",
    interestedPropertyId: "prop-mahanadi-trisulia-04",
    interestedPropertyTitle: "Mahanadi Ridge Estates • Trisulia",
    utmSource: "linkedin_inmail_advisory",
    status: "DOSSIER_DISPATCHED",
    createdAt: new Date(Date.now() - 42 * 3600 * 1000).toISOString(),
  },
  {
    id: "lead-vip-06",
    fullName: "Rajen Agarwal (Managing Director, Mining & Steel Corp)",
    whatsappNumberMasked: maskPhoneNumber("+919937004412"),
    whatsappNumberEncrypted: encryptPII("+919937004412"),
    buyerPersona: "The Commercial Wealth Builder (Offices)",
    coDecisionMakers: ["CFO", "Senior Structural Auditor"],
    preferredTourSlot: "4:30 PM Golden Hour Slot (HVAC & Parking Audit)",
    interestedPropertyId: "prop-vault-penthouse-jayadev-07",
    interestedPropertyTitle: "Crown Penthouse • Jayadev Vihar",
    utmSource: "direct_hni_briefing",
    status: "GOLDEN_HOUR_CONFIRMED",
    createdAt: new Date(Date.now() - 56 * 3600 * 1000).toISOString(),
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
