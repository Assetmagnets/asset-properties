import { PrismaClient } from "@prisma/client";
import { hashPassword, encryptPII, maskPhoneNumber } from "../src/lib/security";
import { CURATED_PROPERTIES } from "../src/data/curatedProperties";

const prisma = new PrismaClient();

async function main() {
  console.log("--- Starting Neon PostgreSQL Database Seed ---");

  // 1. Seed or Update Admin User
  const adminEmail = "properties@assetmagnets.com";
  const rawAdminPassword = "Assetmagnets@2026";
  const passwordHash = hashPassword(rawAdminPassword);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      role: "SUPER_ADMIN",
      name: "Asset Magnets CIO",
    },
    create: {
      email: adminEmail,
      passwordHash,
      name: "Asset Magnets CIO",
      role: "SUPER_ADMIN",
    },
  });
  console.log(`✓ Admin User created/updated: ${admin.email} [${admin.role}]`);

  // 2. Seed Curated Properties with explicit ID
  console.log(`Seeding ${CURATED_PROPERTIES.length} Curated Properties...`);
  for (const prop of CURATED_PROPERTIES) {
    await prisma.property.upsert({
      where: { id: prop.id },
      update: {
        slug: prop.slug,
        title: prop.title,
        subtitle: prop.subtitle,
        category: prop.category,
        corridor: prop.corridor,
        corridorDisplayName: prop.corridorDisplayName,
        microLocation: prop.microLocation,
        basePriceInr: BigInt(prop.basePriceInr),
        priceDisplay: prop.priceDisplay,
        pricePerSqFt: prop.pricePerSqFt,
        reraCarpetSqFt: prop.reraCarpetSqFt,
        superBuiltUpSqFt: prop.superBuiltUpSqFt,
        loadingPercentage: prop.loadingPercentage,
        udsLandSqFt: prop.udsLandSqFt ?? null,
        estimatedRentalYield: prop.estimatedRentalYield ?? null,
        configuration: prop.configuration,
        possessionTimeline: prop.possessionTimeline,
        oreraNumber: prop.oreraNumber,
        oreraVerifiedUrl: prop.oreraVerifiedUrl,
        bdaSanctionNumber: prop.bdaSanctionNumber,
        bhulekhKhataPlot: prop.bhulekhKhataPlot,
        kissamStatus: prop.kissamStatus,
        ecYearsVerified: prop.ecYearsVerified,
        approvedBanks: prop.approvedBanks,
        assetScoreTotal: prop.assetScoreTotal,
        scoreLegalPurity: prop.scoreLegalPurity,
        scoreMaterialGrade: prop.scoreMaterialGrade,
        scoreCorridorGrowth: prop.scoreCorridorGrowth,
        scoreCarpetEfficiency: prop.scoreCarpetEfficiency,
        scoreVastuLight: prop.scoreVastuLight,
        curatorStrengths: prop.curatorStrengths,
        curatorTradeOffNote: prop.curatorTradeOffNote || "",
        idealBuyerPersona: prop.idealBuyerPersona || "",
        dayHeroImageUrl: prop.dayHeroImageUrl,
        duskHeroImageUrl: prop.duskHeroImageUrl,
        rawSiteVideoUrl: prop.rawSiteVideoUrl,
        instagramReelUrl: prop.instagramReelUrl,
        isOffMarketVault: prop.isOffMarketVault || false,
        isGoldPick: prop.isGoldPick || false,
      },
      create: {
        id: prop.id,
        slug: prop.slug,
        title: prop.title,
        subtitle: prop.subtitle,
        category: prop.category,
        corridor: prop.corridor,
        corridorDisplayName: prop.corridorDisplayName,
        microLocation: prop.microLocation,
        basePriceInr: BigInt(prop.basePriceInr),
        priceDisplay: prop.priceDisplay,
        pricePerSqFt: prop.pricePerSqFt,
        reraCarpetSqFt: prop.reraCarpetSqFt,
        superBuiltUpSqFt: prop.superBuiltUpSqFt,
        loadingPercentage: prop.loadingPercentage,
        udsLandSqFt: prop.udsLandSqFt ?? null,
        estimatedRentalYield: prop.estimatedRentalYield ?? null,
        configuration: prop.configuration,
        possessionTimeline: prop.possessionTimeline,
        oreraNumber: prop.oreraNumber,
        oreraVerifiedUrl: prop.oreraVerifiedUrl,
        bdaSanctionNumber: prop.bdaSanctionNumber,
        bhulekhKhataPlot: prop.bhulekhKhataPlot,
        kissamStatus: prop.kissamStatus,
        ecYearsVerified: prop.ecYearsVerified,
        approvedBanks: prop.approvedBanks,
        assetScoreTotal: prop.assetScoreTotal,
        scoreLegalPurity: prop.scoreLegalPurity,
        scoreMaterialGrade: prop.scoreMaterialGrade,
        scoreCorridorGrowth: prop.scoreCorridorGrowth,
        scoreCarpetEfficiency: prop.scoreCarpetEfficiency,
        scoreVastuLight: prop.scoreVastuLight,
        curatorStrengths: prop.curatorStrengths,
        curatorTradeOffNote: prop.curatorTradeOffNote || "",
        idealBuyerPersona: prop.idealBuyerPersona || "",
        dayHeroImageUrl: prop.dayHeroImageUrl,
        duskHeroImageUrl: prop.duskHeroImageUrl,
        rawSiteVideoUrl: prop.rawSiteVideoUrl,
        instagramReelUrl: prop.instagramReelUrl,
        isOffMarketVault: prop.isOffMarketVault || false,
        isGoldPick: prop.isGoldPick || false,
      },
    });
  }
  console.log(`✓ Curated Properties synchronized in Neon DB.`);

  // 3. Seed Initial Leads if none exist
  const existingLeadsCount = await prisma.advisoryLead.count();
  if (existingLeadsCount === 0) {
    console.log("Seeding Initial HNI Advisory Leads...");
    const initialLeads = [
      {
        fullName: "Dr. Siddharth Mohanty (Senior Cardiologist, Apollo)",
        whatsappNumber: encryptPII("+919861048291"),
        whatsappNumberMasked: maskPhoneNumber("+919861048291"),
        buyerPersona: "The End-Use Luxury Family (Flats & Villas)",
        coDecisionMakers: ["Spouse", "Parents (Vastu Compass Kit)"],
        preferredTourSlot: "4:30 PM Golden Hour Slot (West-Glare & Breeze Audit)",
        interestedPropertyId: "prop-aurelia-patia-01",
        interestedPropertyTitle: "The Sovereign Crest • Patia",
        utmSource: "instagram_bio_asset_properties17",
        status: "GOLDEN_HOUR_CONFIRMED",
        leadType: "GOLDEN_HOUR",
      },
      {
        fullName: "Subhransu Patnaik (Principal Architect, Palo Alto / NRI)",
        whatsappNumber: encryptPII("+919437019284"),
        whatsappNumberMasked: maskPhoneNumber("+919437019284"),
        buyerPersona: "The Outstation Odia / NRI Investor",
        coDecisionMakers: ["Legal Counsel (Bhulekh & 34-Yr EC Kit)", "Parents"],
        preferredTourSlot: "7:00 AM East Vastu Sunlight Live Drone Stream",
        interestedPropertyId: "prop-pahala-villa-03",
        interestedPropertyTitle: "Vanamali Courtyard Estates • Pahala",
        utmSource: "instagram_reel_pahala_drone",
        status: "DOSSIER_DISPATCHED",
        leadType: "DOSSIER",
      },
      {
        fullName: "CA Pratyush Das & Partners",
        whatsappNumber: encryptPII("+919937188420"),
        whatsappNumberMasked: maskPhoneNumber("+919937188420"),
        buyerPersona: "The Commercial Wealth Builder (Offices)",
        coDecisionMakers: ["Chartered Accountant (Depreciation & GST Kit)"],
        preferredTourSlot: "4:30 PM Golden Hour Slot (HVAC & Parking Audit)",
        interestedPropertyId: "prop-monolith-infocity-05",
        interestedPropertyTitle: "One Kalinga Monolith • Infocity",
        utmSource: "instagram_bio_asset_properties17",
        status: "NEW_VIP",
        leadType: "GOLDEN_HOUR",
      },
      {
        fullName: "Justice (Retd.) B. K. Mishra & Family",
        whatsappNumber: encryptPII("+919437255109"),
        whatsappNumberMasked: maskPhoneNumber("+919437255109"),
        buyerPersona: "The Generational Legacy Homebuyer",
        coDecisionMakers: ["High Court Advocate Son", "Architect"],
        preferredTourSlot: "4:30 PM Golden Hour Slot (West-Glare & Breeze Audit)",
        interestedPropertyId: "prop-atelier-saheed-02",
        interestedPropertyTitle: "Atelier 27 • Saheed Nagar",
        utmSource: "referral_judicial_circle",
        status: "LEGAL_UNDERWRITING",
        leadType: "GOLDEN_HOUR",
      },
      {
        fullName: "Debashish Rout (Director, Silicon Valley MedTech)",
        whatsappNumber: encryptPII("+919777412033"),
        whatsappNumberMasked: maskPhoneNumber("+919777412033"),
        buyerPersona: "The Outstation Odia / NRI Investor",
        coDecisionMakers: ["Spouse", "Family Office Trust Officer"],
        preferredTourSlot: "7:00 AM East Vastu Sunlight Live Drone Stream",
        interestedPropertyId: "prop-mahanadi-trisulia-04",
        interestedPropertyTitle: "Mahanadi Ridge Estates • Trisulia",
        utmSource: "linkedin_inmail_advisory",
        status: "DOSSIER_DISPATCHED",
        leadType: "DOSSIER",
      },
      {
        fullName: "Rajen Agarwal (Managing Director, Mining & Steel Corp)",
        whatsappNumber: encryptPII("+919937004412"),
        whatsappNumberMasked: maskPhoneNumber("+919937004412"),
        buyerPersona: "The Commercial Wealth Builder (Offices)",
        coDecisionMakers: ["CFO", "Senior Structural Auditor"],
        preferredTourSlot: "4:30 PM Golden Hour Slot (HVAC & Parking Audit)",
        interestedPropertyId: "prop-vault-penthouse-jayadev-07",
        interestedPropertyTitle: "Crown Penthouse • Jayadev Vihar",
        utmSource: "direct_hni_briefing",
        status: "GOLDEN_HOUR_CONFIRMED",
        leadType: "GOLDEN_HOUR",
      },
    ];

    for (const lead of initialLeads) {
      await prisma.advisoryLead.create({
        data: lead,
      });
    }
    console.log(`✓ Seeded ${initialLeads.length} initial leads.`);
  } else {
    console.log(`✓ Leads table already populated with ${existingLeadsCount} records.`);
  }

  console.log("--- Neon PostgreSQL Database Seed Complete ---");
}

main()
  .catch((e) => {
    console.error("Error during database seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
