export type AssetCategory = "LUXURY_FLAT" | "LANDED_VILLA" | "COMMERCIAL_OFFICE";

export type CorridorZone =
  | "PATIA_INFOCITY"
  | "PAHALA_NH16"
  | "SAHEED_NAGAR_CORE"
  | "KALINGA_NAGAR_AIIMS"
  | "TRISULIA_METRO_BELT"
  | "SUNDARPADA_JATNI";

export type LightingMode = "NOCTURNAL_DUSK" | "SOLAR_DAYLIGHT";

export interface XRayLayerSpec {
  layerNumber: number;
  title: string;
  subtitle: string;
  metricLabel: string;
  metricValue: string;
  verificationCode: string;
  auditFinding: string;
  status: "VERIFIED_GOLD" | "OPTIMAL" | "MONITORED";
}

export interface DecoyAnchorComparison {
  marketAnchorName: string;
  marketAnchorLocation: string;
  marketAnchorPriceInr: number;
  marketAnchorPricePerSqFt: number;
  marketAnchorLoadingPct: number;
  marketAnchorEffectiveCarpetRate: number;
  marketAnchorKissamStatus: string;
  marketAnchorWeakness: string;
}

export interface CuratedProperty {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: AssetCategory;
  corridor: CorridorZone;
  corridorDisplayName: string;
  microLocation: string;

  basePriceInr: number; // Stored as BigInt in DB, serialized as number/string in JSON
  priceDisplay: string;
  pricePerSqFt: number;
  effectiveCarpetPricePerSqFt: number;
  superBuiltUpSqFt: number;
  reraCarpetSqFt: number;
  loadingPercentage: number;
  udsLandSqFt: number | null;
  estimatedRentalYield: number | null;
  configuration: string;
  possessionTimeline: string;
  totalUnitsInProject: number;
  densityPerAcre: string;

  oreraNumber: string;
  oreraVerifiedUrl: string;
  bdaSanctionNumber: string;
  bhulekhKhataPlot: string;
  kissamStatus: string;
  ecYearsVerified: number;
  floodElevationMeters: string;
  approvedBanks: string[];

  assetScoreTotal: number;
  scoreLegalPurity: number;       // Max 25 (ORERA/BDA)
  scoreMaterialGrade: number;     // Max 20 (Bhulekh/Kissam & Structural Purity)
  scoreCarpetEfficiency: number;  // Max 20 (Carpet Efficiency)
  scoreCorridorGrowth: number;    // Max 20 (Corridor Growth)
  scoreVastuLight: number;        // Max 15 (Vastu/Light)

  curatorStrengths: string[];
  curatorTradeOffNote: string;
  idealBuyerPersona: string;
  isGoldPick?: boolean;

  dayHeroImageUrl: string;
  duskHeroImageUrl: string;
  rawSiteVideoUrl?: string;
  instagramReelUrl?: string;
  instagramReelViews?: string;
  isOffMarketVault: boolean;

  xrayLayers: XRayLayerSpec[];
  decoyComparison: DecoyAnchorComparison;
}

export interface RejectedProjectAudit {
  id: string;
  anonymizedCode: string;
  corridor: string;
  claimedType: string;
  advertisedRate: string;
  rejectionCategory:
    | "KISSAM_DEFECT"
    | "LOADING_INFLATION"
    | "ORERA_LAPSE"
    | "FLOOD_BASIN"
    | "BDA_VIOLATION"
    | "UDS_DILUTION";
  rejectionHeadline: string;
  forensicFinding: string;
  financialRiskAvoided: string;
  auditDate: string;
}

export interface AdvisoryLeadRecord {
  id: string;
  fullName: string;
  whatsappNumberMasked: string;
  whatsappNumberEncrypted: string;
  buyerPersona: string;
  coDecisionMakers: string[];
  preferredTourSlot: string | null;
  interestedPropertyId: string | null;
  interestedPropertyTitle?: string;
  utmSource: string | null;
  status: string;
  watermarkToken?: string;
  createdAt: string;
}
