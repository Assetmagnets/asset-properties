import { CuratedProperty, RejectedProjectAudit } from "@/types/property";

export const CURATED_PROPERTIES: CuratedProperty[] = [
  {
    id: "prop-aurelia-patia-01",
    slug: "the-sovereign-crest-patia",
    title: "The Sovereign Crest",
    subtitle: "Single-Core Biophilic Sky Residences • 2 Units Per Floor",
    category: "LUXURY_FLAT",
    corridor: "PATIA_INFOCITY",
    corridorDisplayName: "Patia – Infocity High-Growth Corridor",
    microLocation: "800m off Infocity–Nandankanan 200ft Master Plan Road, Patia",

    basePriceInr: 24500000, // ₹2.45 Cr
    priceDisplay: "₹2.45 Cr",
    pricePerSqFt: 8305,
    effectiveCarpetPricePerSqFt: 10698,
    superBuiltUpSqFt: 2950,
    reraCarpetSqFt: 2290,
    loadingPercentage: 22.3,
    udsLandSqFt: 985,
    estimatedRentalYield: 4.4,
    configuration: "4 BHK + Private Lift Foyer + Staff Suite",
    possessionTimeline: "Dec 2026 (Structure Topped Out)",
    totalUnitsInProject: 56,
    densityPerAcre: "28 Families / Acre",

    oreraNumber: "RP/19/2024/01148",
    oreraVerifiedUrl: "https://rera.odisha.gov.in/",
    bdaSanctionNumber: "BDA/PLN-SANC/2024/0892",
    bhulekhKhataPlot: "Khata No. 412/89 • Plot No. 1184 (Mouza: Patia)",
    kissamStatus: "Gharabari Verified (100% Direct Mutation)",
    ecYearsVerified: 34,
    floodElevationMeters: "+43.8m MSL (4.2m Above 2019 Fani Surge Line)",
    approvedBanks: ["SBI Wealth", "HDFC Imperia", "ICICI Private", "Axis Burgundy"],

    assetScoreTotal: 95,
    scoreLegalPurity: 25,
    scoreMaterialGrade: 19,
    scoreCarpetEfficiency: 19,
    scoreCorridorGrowth: 18,
    scoreVastuLight: 14,

    curatorStrengths: [
      "22.3% True Loading vs. Patia's 33% bloated average — yields +240 sq.ft. of extra usable living room.",
      "100% Mivan Aluminum Formwork with 200mm AAC acoustic block partitions between master suites.",
      "Dedicated biometric private elevator opening directly into a 14ft East-facing Vastu foyer."
    ],
    curatorTradeOffNote:
      "Radical Candor: The approach road's final 180-meter stretch has active BMC underground storm-drainage widening scheduled until Q4 2026. Expect daytime dust on the south boundary for the next 5 months, after which it becomes a 60ft blacktop boulevard.",
    idealBuyerPersona: "Senior IT Architects, AIIMS/Care Consultants & Returning US/UK Odia Families",
    isGoldPick: true,

    dayHeroImageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    duskHeroImageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    rawSiteVideoUrl: "https://res.cloudinary.com/demo/video/upload/v1/drone_patia_audit.mp4",
    instagramReelUrl: "https://instagram.com/asset_properties17",
    instagramReelViews: "148K Uncut Drone Audit Views",
    isOffMarketVault: false,

    xrayLayers: [
      {
        layerNumber: 1,
        title: "Layer 01 • Sub-Soil, Kissam & Flood Basin Telemetry",
        subtitle: "Bhulekh RoR & Hydrological Audit",
        metricLabel: "Elevation & Kissam",
        metricValue: "+43.8m MSL • Gharabari",
        verificationCode: "BHULEKH-PATIA-K412-P1184",
        auditFinding:
          "34-year unbroken chain of title verified. Zero Chaka or Jalasaya (waterbody) history. Laterite bedrock reached at 4.1m depth with raft-pile foundation rated to Seismic Zone III+.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 2,
        title: "Layer 02 • Structural Mivan & Acoustic Envelope",
        subtitle: "Core Material Forensics",
        metricLabel: "Concrete & Glazing",
        metricValue: "M40 Grade + Saint-Gobain DGU",
        verificationCode: "LAB-CORE-TEST-99.2%",
        auditFinding:
          "Full shear-wall Mivan construction eliminates beam drops in the 26ft x 16ft living deck. Double-Glazed Low-E glass reduces Bhubaneswar summer solar heat gain by 41%.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 3,
        title: "Layer 03 • RERA Carpet vs. Super Built-Up Forensic Ratio",
        subtitle: "Laser-Measured Floor Plate Audit",
        metricLabel: "True Carpet Efficiency",
        metricValue: "77.7% Usable (2,290 Sq.Ft.)",
        verificationCode: "LEICA-DISTO-AUDIT-09",
        auditFinding:
          "Most Patia builders quote ₹7,500/sq.ft. on 35% loading (effective carpet rate: ₹11,538/sq.ft.). Sovereign Crest delivers ₹10,698/sq.ft. on true RERA carpet with 985 sq.ft. Undivided Land Share.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 4,
        title: "Layer 04 • Solar Vastu & 7:00 AM East Lux Penetration",
        subtitle: "Heliodon Sun-Path & Cross-Ventilation Simulation",
        metricLabel: "East/North Openness",
        metricValue: "3-Side Open • 640 Lux @ 7AM",
        verificationCode: "VASTU-NE-ISANYA-100%",
        auditFinding:
          "Isanya (North-East) Puja & Morning Deck receives unobstructed 7:00 AM winter & summer sunlight. Master suite anchored in Nairutya (South-West) with zero shared walls.",
        status: "OPTIMAL",
      },
    ],
    decoyComparison: {
      marketAnchorName: "Typical Patia High-Density Tower (Broker Portal Avg.)",
      marketAnchorLocation: "Nandankanan Main Road Belt",
      marketAnchorPriceInr: 23200000,
      marketAnchorPricePerSqFt: 7864,
      marketAnchorLoadingPct: 34.5,
      marketAnchorEffectiveCarpetRate: 12006,
      marketAnchorKissamStatus: "Partial Conversion Pending (Sub-Plot 4B)",
      marketAnchorWeakness: "6 Flats/Floor, 95 Families/Acre, 34.5% inflated loading & highway noise",
    },
  },
  {
    id: "prop-kalinga-saheed-02",
    slug: "atelier-27-saheed-nagar",
    title: "Atelier 27 Sanctuary",
    subtitle: "Boutique Low-Density Urban Suites in Central Bhubaneswar",
    category: "LUXURY_FLAT",
    corridor: "SAHEED_NAGAR_CORE",
    corridorDisplayName: "Saheed Nagar – Janpath Institutional Core",
    microLocation: "Quiet Cul-de-Sac 450m from Maharshi College & Esplanade One",

    basePriceInr: 31000000, // ₹3.10 Cr
    priceDisplay: "₹3.10 Cr",
    pricePerSqFt: 9687,
    effectiveCarpetPricePerSqFt: 12262,
    superBuiltUpSqFt: 3200,
    reraCarpetSqFt: 2528,
    loadingPercentage: 21.0,
    udsLandSqFt: 1240,
    estimatedRentalYield: 4.1,
    configuration: "4.5 BHK Single-Floor Residence + Wrap-Around Sky Verandah",
    possessionTimeline: "Ready to Fit-Out (OC Applied)",
    totalUnitsInProject: 18,
    densityPerAcre: "22 Families / Acre",

    oreraNumber: "RP/19/2023/00914",
    oreraVerifiedUrl: "https://rera.odisha.gov.in/",
    bdaSanctionNumber: "BDA/PLN-SANC/2023/0411",
    bhulekhKhataPlot: "Khata No. 119/14 • Plot No. 602 (Mouza: Saheed Nagar)",
    kissamStatus: "Gharabari Freehold (Zero Litigation 40-Yr Chain)",
    ecYearsVerified: 40,
    floodElevationMeters: "+46.1m MSL (Natural Ridge Zone)",
    approvedBanks: ["SBI Wealth", "HDFC Imperia", "Kotak Privy"],

    assetScoreTotal: 96,
    scoreLegalPurity: 25,
    scoreMaterialGrade: 20,
    scoreCarpetEfficiency: 20,
    scoreCorridorGrowth: 17,
    scoreVastuLight: 14,

    curatorStrengths: [
      "Irreplaceable central Bhubaneswar pin-code with an extraordinary 1,240 sq.ft. Undivided Land Share (UDS).",
      "Only 18 ultra-private families — zero Airbnb/bachelor tenant clause written into the Association Bylaws.",
      "Italian Botticino marble flooring laid in-situ and Mitsubishi VRV ducted air-conditioning included."
    ],
    curatorTradeOffNote:
      "Radical Candor: Because this is a boutique 18-residence enclave on prime central land, you do not get a 2-acre sprawling lawn or Olympic lap pool—instead, you get a heated rooftop infinity plunge pool, private wellness lounge, and 8-minute drive to Bhubaneswar Airport.",
    idealBuyerPersona: "Established Cuttack/Bhubaneswar Industrial Families & Senior Medical Directors",
    isGoldPick: false,

    dayHeroImageUrl:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
    duskHeroImageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
    rawSiteVideoUrl: "https://res.cloudinary.com/demo/video/upload/v1/saheed_nagar_audit.mp4",
    instagramReelUrl: "https://instagram.com/asset_properties17",
    instagramReelViews: "92K Uncut Walkthrough Views",
    isOffMarketVault: false,

    xrayLayers: [
      {
        layerNumber: 1,
        title: "Layer 01 • Central Freehold Title & 40-Year EC Trace",
        subtitle: "Saheed Nagar Revenue Record Verification",
        metricLabel: "UDS Land Ownership",
        metricValue: "1,240 Sq.Ft. Freehold UDS",
        verificationCode: "BHULEKH-SN-K119-P602",
        auditFinding:
          "Direct freehold Gharabari plot (not leasehold GAD conversion) with 40 years of clean Encumbrance Certificates audited by our empaneled High Court advocate.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 2,
        title: "Layer 02 • VRV Climate & Acoustic Isolation",
        subtitle: "MEP & Interior Finish Audit",
        metricLabel: "Floor-to-Floor Height",
        metricValue: "11 Ft. 4 In. Clear Slab",
        verificationCode: "MEP-VRV-AUDIT-A27",
        auditFinding:
          "11.3ft floor-to-floor height accommodates concealed VRV ducting while preserving a 10.2ft grand coffered ceiling height.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 3,
        title: "Layer 03 • 21.0% Ultra-Low Loading Architecture",
        subtitle: "Carpet Area Verification",
        metricLabel: "RERA Carpet Area",
        metricValue: "2,528 Sq.Ft. (79% Efficiency)",
        verificationCode: "ORERA-CARPET-914",
        auditFinding:
          "Single-core elevator shaft directly serving 2 residences per level cuts dead corridor wastage to near zero.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 4,
        title: "Layer 04 • Mature Canopy Micro-Climate & East Orientation",
        subtitle: "Solar & Airflow Telemetry",
        metricLabel: "Ambient Temp Delta",
        metricValue: "-2.4°C Cooler Micro-Pocket",
        verificationCode: "THERMAL-IR-SCAN-04",
        auditFinding:
          "Surrounded by 35-year-old avenue trees on the East and North setbacks, shielding the facade from harsh afternoon radiation.",
        status: "OPTIMAL",
      },
    ],
    decoyComparison: {
      marketAnchorName: "Standard Janpath/Bomikhal Mixed-Use Apartment",
      marketAnchorLocation: "Cuttack-Puri Road Belt",
      marketAnchorPriceInr: 28500000,
      marketAnchorPricePerSqFt: 9193,
      marketAnchorLoadingPct: 32.0,
      marketAnchorEffectiveCarpetRate: 13520,
      marketAnchorKissamStatus: "Commercial-Cum-Residential Shared Access",
      marketAnchorWeakness: "Retail crowd in ground+2 floors, only 510 sq.ft. UDS, high traffic congestion",
    },
  },
  {
    id: "prop-pahala-villa-03",
    slug: "vanamali-courtyard-estates-pahala",
    title: "Vanamali Courtyard Estates",
    subtitle: "Gated Triplex Courtyard Villas with Private Soil & Plunge Pool",
    category: "LANDED_VILLA",
    corridor: "PAHALA_NH16",
    corridorDisplayName: "Pahala – Hanspal Luxury Villa Belt",
    microLocation: "600m Inside Green Buffer Zone off NH-16 Service Corridor, Pahala",

    basePriceInr: 36500000, // ₹3.65 Cr
    priceDisplay: "₹3.65 Cr",
    pricePerSqFt: 8690,
    effectiveCarpetPricePerSqFt: 10345,
    superBuiltUpSqFt: 4200,
    reraCarpetSqFt: 3528,
    loadingPercentage: 16.0,
    udsLandSqFt: 3200,
    estimatedRentalYield: 3.8,
    configuration: "5 BHK Triplex Villa + Central Double-Height Courtyard + Home Elevator",
    possessionTimeline: "Aug 2027 (Phase-1 Handover)",
    totalUnitsInProject: 34,
    densityPerAcre: "6.8 Villas / Acre",

    oreraNumber: "RP/19/2024/01209",
    oreraVerifiedUrl: "https://rera.odisha.gov.in/",
    bdaSanctionNumber: "BDA/PLN-VILLA/2024/0519",
    bhulekhKhataPlot: "Khata No. 287/51 • Plot No. 910–924 (Mouza: Pahala)",
    kissamStatus: "Individual Sub-Plot Gharabari Patta (Independent Land Title)",
    ecYearsVerified: 32,
    floodElevationMeters: "+41.2m MSL (Engineered 2.8m Raised Plinth + Recharge Wells)",
    approvedBanks: ["SBI Wealth", "HDFC Imperia", "ICICI Private", "Bank of Baroda Premier"],

    assetScoreTotal: 94,
    scoreLegalPurity: 25,
    scoreMaterialGrade: 19,
    scoreCarpetEfficiency: 20,
    scoreCorridorGrowth: 16,
    scoreVastuLight: 14,

    curatorStrengths: [
      "Independent 3,200 sq.ft. demarcated Gharabari land plot registered in your name (not merely fractional apartment UDS).",
      "16% loading ratio — 3,528 sq.ft. of true usable indoor carpet area plus 900 sq.ft. of private lawn & terrace decks.",
      "Pre-installed Mitsubishi 4-person hydraulic home lift shaft for multi-generational parents' comfort."
    ],
    curatorTradeOffNote:
      "Radical Candor: While Pahala offers unmatched serenity and quick NH-16 connectivity to both Bhubaneswar and Cuttack, the nearest IB/Cambridge international schools in Patia are a 19-minute morning drive. Ideal for families with chauffeur support or hybrid professionals.",
    idealBuyerPersona: "Multi-Generational Business Families, Senior Doctors & NRI Investors Seeking Landed Legacy",
    isGoldPick: true,

    dayHeroImageUrl:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85",
    duskHeroImageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
    rawSiteVideoUrl: "https://res.cloudinary.com/demo/video/upload/v1/pahala_villa_drone.mp4",
    instagramReelUrl: "https://instagram.com/asset_properties17",
    instagramReelViews: "215K Uncut Villa Audit Views",
    isOffMarketVault: false,

    xrayLayers: [
      {
        layerNumber: 1,
        title: "Layer 01 • Independent Sub-Plot RoR & Hydrology Audit",
        subtitle: "Pahala Mouza Land & Drainage Verification",
        metricLabel: "Direct Land Title",
        metricValue: "3,200 Sq.Ft. Individual Patta",
        verificationCode: "BHULEKH-PAHALA-K287",
        auditFinding:
          "Unlike row-houses built on unpartitioned agricultural Chaka land, every villa has an individually sub-divided Gharabari plot and storm-water retention trench.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 2,
        title: "Layer 02 • Laterite Thermal Wall & Terracotta Roof Insulation",
        subtitle: "Bioclimatic Odisha Architecture",
        metricLabel: "Wall Assembly",
        metricValue: "250mm Cavity + Khondalite Cladding",
        verificationCode: "MAT-KHONDALITE-03",
        auditFinding:
          "Hand-dressed Odisha Khondalite stone accents paired with insulated cavity walls keep interior temperatures 4°C cooler during May peak summer.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 3,
        title: "Layer 03 • 84% Net Usable Space & Private Lift Core",
        subtitle: "Triplex Spatial Efficiency",
        metricLabel: "Carpet-to-Built Ratio",
        metricValue: "3,528 Sq.Ft. True Carpet",
        verificationCode: "VILLA-LASER-3528",
        auditFinding:
          "Zero common-corridor loading penalty. Every square foot you pay for sits inside your private boundary wall.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 4,
        title: "Layer 04 • Brahmasthana Central Courtyard Vastu",
        subtitle: "Traditional Odia Courtyard Reimagined",
        metricLabel: "Natural Daylight",
        metricValue: "100% Daylight in All 5 Suites",
        verificationCode: "VASTU-BRAHMA-98%",
        auditFinding:
          "Central sky-lit courtyard creates a natural stack-effect breeze, pulling cool air across the lily pond into the living pavilion.",
        status: "VERIFIED_GOLD",
      },
    ],
    decoyComparison: {
      marketAnchorName: "Unorganized Hanspal/Balianta Row-Villa Project",
      marketAnchorLocation: "Low-Lying Canal Periphery",
      marketAnchorPriceInr: 31500000,
      marketAnchorPricePerSqFt: 8289,
      marketAnchorLoadingPct: 28.0,
      marketAnchorEffectiveCarpetRate: 11513,
      marketAnchorKissamStatus: "Undivided Common Chaka Conversion Pending",
      marketAnchorWeakness: "Shared walls, narrow 24ft internal road, waterlogging risk during monsoon",
    },
  },
  {
    id: "prop-trisulia-villa-04",
    slug: "mahanadi-ridge-estates-trisulia",
    title: "Mahanadi Ridge Estates",
    subtitle: "Low-Density Resort Villas Along the Upcoming Trisulia Metro Corridor",
    category: "LANDED_VILLA",
    corridor: "TRISULIA_METRO_BELT",
    corridorDisplayName: "Trisulia – New Cuttack-Bhubaneswar Twin-City Belt",
    microLocation: "1.1 km from Proposed Trisulia Metro Terminal & Judicial Academy",

    basePriceInr: 21500000, // ₹2.15 Cr
    priceDisplay: "₹2.15 Cr",
    pricePerSqFt: 6718,
    effectiveCarpetPricePerSqFt: 8193,
    superBuiltUpSqFt: 3200,
    reraCarpetSqFt: 2624,
    loadingPercentage: 18.0,
    udsLandSqFt: 2600,
    estimatedRentalYield: 3.9,
    configuration: "4 BHK Duplex Villa + 2-Car Covered Pergola + Backyard Orchard",
    possessionTimeline: "Mar 2027",
    totalUnitsInProject: 48,
    densityPerAcre: "8 Villas / Acre",

    oreraNumber: "RP/07/2024/01082",
    oreraVerifiedUrl: "https://rera.odisha.gov.in/",
    bdaSanctionNumber: "CDA-BDA/JOINT/2024/0312",
    bhulekhKhataPlot: "Khata No. 509/22 • Plot No. 1420 (Mouza: Trisulia)",
    kissamStatus: "Gharabari Verified (100% Bank Mortgageable)",
    ecYearsVerified: 30,
    floodElevationMeters: "+40.5m MSL (Elevated Riverbank Ridge — Outside Flood Plain)",
    approvedBanks: ["SBI", "HDFC", "ICICI", "Union Bank"],

    assetScoreTotal: 91,
    scoreLegalPurity: 24,
    scoreMaterialGrade: 18,
    scoreCarpetEfficiency: 19,
    scoreCorridorGrowth: 19,
    scoreVastuLight: 11,

    curatorStrengths: [
      "Highest 5-year capital appreciation potential (+14.8% CAGR projected) driven by the Bhubaneswar-Cuttack Metro Phase-1 & Sri Sri University belt.",
      "Entry at ₹8,193/sq.ft. effective carpet with 2,600 sq.ft. of landed plot ownership.",
      "40ft internal concrete boulevards with underground power cabling and sewage treatment plant."
    ],
    curatorTradeOffNote:
      "Radical Candor: Immediate retail convenience (fine dining and luxury supermarkets) around Trisulia is still 24 months behind Patia. This is a conviction wealth-compounding play for buyers with a 3-to-5 year horizon.",
    idealBuyerPersona: "Outstation Odia / NRI Investors & Cuttack-Bhubaneswar Dual-City Professionals",
    isGoldPick: false,

    dayHeroImageUrl:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85",
    duskHeroImageUrl:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
    rawSiteVideoUrl: "https://res.cloudinary.com/demo/video/upload/v1/trisulia_drone.mp4",
    instagramReelUrl: "https://instagram.com/asset_properties17",
    instagramReelViews: "118K Uncut Corridor Analysis Views",
    isOffMarketVault: false,

    xrayLayers: [
      {
        layerNumber: 1,
        title: "Layer 01 • River Basin Buffer & Gharabari Verification",
        subtitle: "Hydrological & Revenue Audit",
        metricLabel: "Setback from River Zone",
        metricValue: "1.8 km Elevated Ridge",
        verificationCode: "BHULEKH-TRISULIA-K509",
        auditFinding:
          "Verified outside the Mahanadi/Kathajodi regulatory flood zone with clean Gharabari conversion completed in 2021.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 2,
        title: "Layer 02 • Earthquake-Resistant RCC Frame & Red Brick Thermal Core",
        subtitle: "Structural Quality Audit",
        metricLabel: "Foundation Spec",
        metricValue: "Isolated + Tie-Beam Raft",
        verificationCode: "STRUCT-TR-2024",
        auditFinding:
          "Engineered for future +1 floor vertical expansion if the owner wishes to add a rooftop studio later.",
        status: "OPTIMAL",
      },
      {
        layerNumber: 3,
        title: "Layer 03 • 82% Carpet Ratio + 650 Sq.Ft. Private Garden",
        subtitle: "Spatial Audit",
        metricLabel: "Garden + Deck Area",
        metricValue: "650 Sq.Ft. Unbilled Open Land",
        verificationCode: "PLOT-SURVEY-2600",
        auditFinding:
          "Private backyard soil accommodates mature mango/frangipani trees and a gazebos deck.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 4,
        title: "Layer 04 • River Breeze Corridor Orientation",
        subtitle: "Wind Rose & Sunlight Audit",
        metricLabel: "Evening Breeze Velocity",
        metricValue: "14 km/h South-East Breeze",
        verificationCode: "AERO-SCAN-TR04",
        auditFinding:
          "Positioned to capture the natural Kathajodi evening breeze across the first-floor family terrace.",
        status: "OPTIMAL",
      },
    ],
    decoyComparison: {
      marketAnchorName: "Unregulated Trisulia Plotted Speculation Scheme",
      marketAnchorLocation: "Interior Village Approach Road",
      marketAnchorPriceInr: 19500000,
      marketAnchorPricePerSqFt: 6500,
      marketAnchorLoadingPct: 26.5,
      marketAnchorEffectiveCarpetRate: 8843,
      marketAnchorKissamStatus: "Sarada (Agricultural) — Conversion Promised Post-Sale",
      marketAnchorWeakness: "High risk of ORERA freeze & non-sanctioned 18ft panchayat road",
    },
  },
  {
    id: "prop-monolith-infocity-05",
    slug: "one-kalinga-monolith-infocity",
    title: "One Kalinga Monolith",
    subtitle: "Grade-A LEED Platinum Commercial Office Suites & Doctor Chambers",
    category: "COMMERCIAL_OFFICE",
    corridor: "PATIA_INFOCITY",
    corridorDisplayName: "Infocity – Chandaka IT & Institutional SEZ Belt",
    microLocation: "Direct Frontage on Infocity Avenue, 400m from DLF Cybercity",

    basePriceInr: 18500000, // ₹1.85 Cr
    priceDisplay: "₹1.85 Cr",
    pricePerSqFt: 9250,
    effectiveCarpetPricePerSqFt: 11858,
    superBuiltUpSqFt: 2000,
    reraCarpetSqFt: 1560,
    loadingPercentage: 22.0,
    udsLandSqFt: 490,
    estimatedRentalYield: 8.6,
    configuration: "Column-Free Grade-A Office Suite + Executive Wet Pantry + 3 Reserved Bays",
    possessionTimeline: " Jun 2026 (Facade Glazing Active)",
    totalUnitsInProject: 64,
    densityPerAcre: "1:750 Sq.Ft. Parking Ratio",

    oreraNumber: "RP/19/2024/01033",
    oreraVerifiedUrl: "https://rera.odisha.gov.in/",
    bdaSanctionNumber: "BDA/COMM-SANC/2024/0204",
    bhulekhKhataPlot: "Khata No. 88/12 • Plot No. 304 (Mouza: Chandaka-Patia)",
    kissamStatus: "Commercial Institutional Verified (100% Clear OC Track)",
    ecYearsVerified: 35,
    floodElevationMeters: "+45.0m MSL (High Plateau IT Corridor)",
    approvedBanks: ["SBI Commercial", "HDFC Business", "ICICI Corporate", "SIDBI"],

    assetScoreTotal: 94,
    scoreLegalPurity: 25,
    scoreMaterialGrade: 19,
    scoreCarpetEfficiency: 18,
    scoreCorridorGrowth: 19,
    scoreVastuLight: 13,

    curatorStrengths: [
      "8.6% projected gross rental yield + 15% annual commercial WDV depreciation tax shield for CAs, Clinics & IT Firms.",
      "22% commercial loading vs. the 38–42% loading common in Bhubaneswar malls-cum-office complexes.",
      "100% DG power backup with chilled-water central HVAC and 6 high-speed Destination Control Elevators."
    ],
    curatorTradeOffNote:
      "Radical Candor: Ground and 1st floor retail spaces are strictly zoned for institutional banking and fine dining (no loud pubs or coaching centers). If your business relies on student footfall, this is too corporate; if you host HNI clients, patients, or enterprise teams, it is unmatched.",
    idealBuyerPersona: "Chartered Accountants, Super-Specialty Clinic Owners, Law Partners & IT Founders",
    isGoldPick: true,

    dayHeroImageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    duskHeroImageUrl:
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1600&q=85",
    rawSiteVideoUrl: "https://res.cloudinary.com/demo/video/upload/v1/commercial_infocity.mp4",
    instagramReelUrl: "https://instagram.com/asset_properties17",
    instagramReelViews: "84K Commercial Rent-vs-Buy Views",
    isOffMarketVault: false,

    xrayLayers: [
      {
        layerNumber: 1,
        title: "Layer 01 • Commercial Fire NOC & Institutional Zoning",
        subtitle: "Statutory & Fire Safety Compliance",
        metricLabel: "Fire & Seismic Spec",
        metricValue: " Dual Staircase + NBC 2016 Compliant",
        verificationCode: "ODISHA-FIRE-NOC-2024-88",
        auditFinding:
          "Pre-cleared for medical diagnostics, corporate headquarters, and financial institutions—avoiding the fire-NOC retrofitting nightmare of converted residential buildings.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 2,
        title: "Layer 02 • Post-Tensioned Column-Free Floor Plate",
        subtitle: "Structural Span Audit",
        metricLabel: "Column Grid Span",
        metricValue: "11.5m Column-Free Span",
        verificationCode: "PT-SLAB-LOAD-500KG",
        auditFinding:
          "500 kg/sq.m live load capacity (suitable for server racks or medical imaging equipment) with zero intrusive interior pillars.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 3,
        title: "Layer 03 • 78% Carpet Efficiency vs. 60% Market Norm",
        subtitle: "Workstation Yield Audit",
        metricLabel: "Seating / Cabin Yield",
        metricValue: "38 Workstations + 3 Director Suites",
        verificationCode: "CAD-TESTFIT-2000",
        auditFinding:
          "A 2,000 sq.ft. unit here fits the same headcount as a 2,650 sq.ft. unit in typical Esplanade/Janpath commercial buildings with 40% loading.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 4,
        title: "Layer 04 • Glare-Free North-East Curtain Wall",
        subtitle: "Daylight & HVAC Load Optimization",
        metricLabel: "Solar Heat Gain (SHGC)",
        metricValue: "0.24 SHGC Acoustic Curtain Wall",
        verificationCode: "LEED-DAYLIGHT-92%",
        auditFinding:
          "Abundant natural workspace daylight without monitor glare, cutting monthly electricity OPEX by ₹14/sq.ft.",
        status: "OPTIMAL",
      },
    ],
    decoyComparison: {
      marketAnchorName: "Typical Retail-Heavy Commercial Tower (39% Loading)",
      marketAnchorLocation: "Patia Station Road / Jayadev Vihar",
      marketAnchorPriceInr: 17800000,
      marketAnchorPricePerSqFt: 8900,
      marketAnchorLoadingPct: 39.0,
      marketAnchorEffectiveCarpetRate: 14590,
      marketAnchorKissamStatus: "Mixed-Use Conversion (Parking Deficit)",
      marketAnchorWeakness: "39% loading leaves only 1,220 sq.ft. carpet; severe visitor parking bottleneck",
    },
  },
  // OFF-MARKET PRIVATE VAULT PROPERTIES (MOD-07)
  {
    id: "vault-aiims-kalinga-06",
    slug: "vault-doctors-enclave-kalinga-nagar",
    title: "VAULT // The Aesculapius Enclave",
    subtitle: "Pre-Launch Doctors & HNI Sanctuary • 4 Mins from AIIMS Bhubaneswar",
    category: "LUXURY_FLAT",
    corridor: "KALINGA_NAGAR_AIIMS",
    corridorDisplayName: "Kalinga Nagar – AIIMS Institutional Belt",
    microLocation: "Off 100ft Kalinga Nagar Master Plan Road (Confidential Plot)",

    basePriceInr: 19200000, // ₹1.92 Cr
    priceDisplay: "₹1.92 Cr (Pre-Launch Institutional Allocation)",
    pricePerSqFt: 7111,
    effectiveCarpetPricePerSqFt: 9001,
    superBuiltUpSqFt: 2700,
    reraCarpetSqFt: 2133,
    loadingPercentage: 21.0,
    udsLandSqFt: 910,
    estimatedRentalYield: 4.7,
    configuration: "4 BHK + Study/Consultation Room + Soundproof Rest Suite",
    possessionTimeline: "Oct 2027 (Early Underwriter Tranche)",
    totalUnitsInProject: 40,
    densityPerAcre: "24 Families / Acre",

    oreraNumber: "RP/19/2025/00112",
    oreraVerifiedUrl: "https://rera.odisha.gov.in/",
    bdaSanctionNumber: "BDA/PLN-SANC/2025/0078",
    bhulekhKhataPlot: "Khata No. [VAULT-REDACTED] • Mouza: Ghatikia-Kalinga Nagar",
    kissamStatus: "Gharabari Direct Allotment (BDA Plotted Belt)",
    ecYearsVerified: 35,
    floodElevationMeters: "+48.4m MSL (Highest Laterite Plateau in Bhubaneswar)",
    approvedBanks: ["SBI Wealth", "HDFC Imperia", "ICICI Private"],

    assetScoreTotal: 93,
    scoreLegalPurity: 25,
    scoreMaterialGrade: 19,
    scoreCarpetEfficiency: 19,
    scoreCorridorGrowth: 17,
    scoreVastuLight: 13,

    curatorStrengths: [
      "₹1,150/sq.ft. below public launch price for the first 6 underwriter families via Asset Properties Private Vault.",
      "Built on Kalinga Nagar's highest natural laterite plateau (+48.4m MSL) — zero waterlogging in recorded history.",
      "Dedicated acoustic insulation for senior surgeons/physicians needing uninterrupted daytime sleep post-night-shift."
    ],
    curatorTradeOffNote:
      "Radical Candor: Public marketing launch is scheduled 90 days from now. Early allocation requires 20% milestone commitment within 30 days of legal title verification by your personal counsel.",
    idealBuyerPersona: "Senior Surgeons & Faculty (AIIMS / SUM / Manipal) & Early-Stage HNI Underwriters",
    isGoldPick: false,

    dayHeroImageUrl:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85",
    duskHeroImageUrl:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
    instagramReelUrl: "https://instagram.com/asset_properties17",
    instagramReelViews: "Private Vault Dossier Only",
    isOffMarketVault: true,

    xrayLayers: [
      {
        layerNumber: 1,
        title: "Layer 01 • BDA Master-Planned Laterite Plateau",
        subtitle: "Geotechnical & Title Audit",
        metricLabel: "Bedrock Elevation",
        metricValue: "+48.4m MSL Solid Laterite",
        verificationCode: "VAULT-KN-GEO-01",
        auditFinding: "Direct BDA comprehensive development zone with underground utilities.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 2,
        title: "Layer 02 • Hospital-Grade Acoustic & Air Filtration",
        subtitle: "Wellness Engineering",
        metricLabel: "Acoustic Rating",
        metricValue: "STC 56 Master Suite",
        verificationCode: "VAULT-ACOUSTIC-56",
        auditFinding: "Triple-sealed acoustic windows & treated fresh air handling unit.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 3,
        title: "Layer 03 • 79% True RERA Carpet Ratio",
        subtitle: "Floor Plate Efficiency",
        metricLabel: "RERA Carpet",
        metricValue: "2,133 Sq.Ft.",
        verificationCode: "VAULT-CARPET-2133",
        auditFinding: "Includes separate external entry to home-office/consultation chamber.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 4,
        title: "Layer 04 • Chandaka Reserve Forest Breeze Corridor",
        subtitle: "Micro-Climate Telemetry",
        metricLabel: "AQI Advantage",
        metricValue: "38% Lower PM2.5 vs City Core",
        verificationCode: "VAULT-AQI-SCAN",
        auditFinding: "Unobstructed green views toward the western forest reserve buffer.",
        status: "OPTIMAL",
      },
    ],
    decoyComparison: {
      marketAnchorName: "Khandagiri Highway-Facing High-Rise",
      marketAnchorLocation: "NH-16 Service Lane",
      marketAnchorPriceInr: 20500000,
      marketAnchorPricePerSqFt: 7884,
      marketAnchorLoadingPct: 33.0,
      marketAnchorEffectiveCarpetRate: 11767,
      marketAnchorKissamStatus: "Gharabari Verified",
      marketAnchorWeakness: "Heavy NH-16 truck decibels (78 dB) and 33% super-built-up loading",
    },
  },
  {
    id: "vault-jayadev-penthouse-07",
    slug: "vault-crown-penthouse-jayadev-vihar",
    title: "VAULT // The Ekamra Crown Sky-Villa",
    subtitle: "Off-Market Family Office Distress/Resale Trophy Asset • Nayapalli–Jayadev Vihar",
    category: "LUXURY_FLAT",
    corridor: "SAHEED_NAGAR_CORE",
    corridorDisplayName: "Jayadev Vihar – Nayapalli VVIP Corridor",
    microLocation: "Overlooking Ekamra Kanan Botanical Gardens, Nayapalli",

    basePriceInr: 49000000, // ₹4.90 Cr
    priceDisplay: "₹4.90 Cr (Direct HNI Family Office Mandate)",
    pricePerSqFt: 10208,
    effectiveCarpetPricePerSqFt: 12449,
    superBuiltUpSqFt: 4800,
    reraCarpetSqFt: 3936,
    loadingPercentage: 18.0,
    udsLandSqFt: 1680,
    estimatedRentalYield: 4.0,
    configuration: "5 BHK Duplex Penthouse + Private Heated Lap Pool + 4 Covered Car Parks",
    possessionTimeline: "Immediate Ready Registry (OC Received)",
    totalUnitsInProject: 12,
    densityPerAcre: "16 Families / Acre",

    oreraNumber: "RP/19/2022/00641",
    oreraVerifiedUrl: "https://rera.odisha.gov.in/",
    bdaSanctionNumber: "BDA/PLN-SANC/2022/0119",
    bhulekhKhataPlot: "Khata No. [VAULT-REDACTED] • Mouza: Nayapalli",
    kissamStatus: "Gharabari Freehold + Occupancy Certificate Issued",
    ecYearsVerified: 42,
    floodElevationMeters: "+47.2m MSL (Botanical Ridge)",
    approvedBanks: ["SBI Wealth", "HDFC Imperia", "Kotak Privy", "Julius Baer / Citi"],

    assetScoreTotal: 97,
    scoreLegalPurity: 25,
    scoreMaterialGrade: 20,
    scoreCarpetEfficiency: 20,
    scoreCorridorGrowth: 18,
    scoreVastuLight: 14,

    curatorStrengths: [
      "Zero GST (Occupancy Certificate already received) — saves ₹24.5 Lakhs in immediate tax outflow.",
      "Unobstructed 270-degree permanent green panorama over Ekamra Kanan Botanical Park.",
      "18% loading with 3,936 sq.ft. of RERA carpet and a private double-height entertainment deck."
    ],
    curatorTradeOffNote:
      "Radical Candor: The seller is an industrialist relocating family office operations to Singapore and requires a 100% white-cheque/RTGS institutional transaction within 45 days. Non-negotiable for cash-component buyers.",
    idealBuyerPersona: "Industrial Promoters, Mining/Infra Directors & Global NRI CXOs",
    isGoldPick: true,

    dayHeroImageUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
    duskHeroImageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
    instagramReelUrl: "https://instagram.com/asset_properties17",
    instagramReelViews: "Confidential Mandate — Not Publicly Posted",
    isOffMarketVault: true,

    xrayLayers: [
      {
        layerNumber: 1,
        title: "Layer 01 • Occupancy Certificate (OC) & Zero-GST Status",
        subtitle: "Ready Title & Tax Audit",
        metricLabel: "GST Savings",
        metricValue: "0% GST (Saves ₹24.5 Lakhs)",
        verificationCode: "BDA-OC-2025-641",
        auditFinding: "Complete OC and Society formation verified; ready for immediate Khata mutation.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 2,
        title: "Layer 02 • Schüco German Fenestration & Acoustic Slab",
        subtitle: "Envelope Audit",
        metricLabel: "Wind Load Rating",
        metricValue: "240 km/h Cyclone Tested",
        verificationCode: "SCHUCO-CYCLONE-240",
        auditFinding: "Engineered to withstand Category-5 coastal cyclones with zero water ingress.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 3,
        title: "Layer 03 • 3,936 Sq.Ft. Net Carpet + Private Pool Deck",
        subtitle: "Laser Spatial Audit",
        metricLabel: "True Loading",
        metricValue: "18.0% (Ultra-Efficient)",
        verificationCode: "VAULT-PENT-3936",
        auditFinding: "Includes private internal glass elevator between lower and upper levels.",
        status: "VERIFIED_GOLD",
      },
      {
        layerNumber: 4,
        title: "Layer 04 • Botanical Park Oxygen & Sunrise Axis",
        subtitle: "Environmental Telemetry",
        metricLabel: "Green View Index",
        metricValue: "Permanent No-Build Park Frontage",
        verificationCode: "EKAMRA-VIEW-LOCK",
        auditFinding: "Protected botanical reserve guarantees no future tower can block your East view.",
        status: "VERIFIED_GOLD",
      },
    ],
    decoyComparison: {
      marketAnchorName: "Under-Construction Luxury Penthouse (34% Loading + 5% GST)",
      marketAnchorLocation: "Jayadev Vihar Periphery",
      marketAnchorPriceInr: 47500000,
      marketAnchorPricePerSqFt: 9895,
      marketAnchorLoadingPct: 34.0,
      marketAnchorEffectiveCarpetRate: 14993,
      marketAnchorKissamStatus: "Under Construction (2028 Delivery)",
      marketAnchorWeakness: "Requires ₹23.75L extra GST + 30 months waiting period + 34% loading",
    },
  },
];

export const REJECTED_PROJECT_AUDITS: RejectedProjectAudit[] = [
  {
    id: "rej-01",
    anonymizedCode: "AUDIT #R-089 • PATIA NORTH EXTENSION",
    corridor: "Patia – Nandankanan Belt",
    claimedType: "Ultra-Luxury 4 BHK High-Rise",
    advertisedRate: "₹7,100 / Sq.Ft. (SBUA)",
    rejectionCategory: "LOADING_INFLATION",
    rejectionHeadline: "Rejected for 37.8% Hidden Super-Built-Up Loading Inflation",
    forensicFinding:
      "Brochure claimed '2,650 sq.ft. palatial 4 BHK'. Our Leica laser audit & ORERA filing check revealed just 1,648 sq.ft. of RERA carpet area—meaning buyers were paying ₹11,414/sq.ft. for invisible shafts, flower beds, and club corridors.",
    financialRiskAvoided: "₹38.4 Lakhs in Phantom Area Overpayment",
    auditDate: "Sept 2026",
  },
  {
    id: "rej-02",
    anonymizedCode: "AUDIT #R-104 • HANSPAL – BALIANTA CANAL BELT",
    corridor: "Pahala – Hanspal Corridor",
    claimedType: "Gated Spanish Duplex Villas",
    advertisedRate: "₹1.85 Cr All-Inclusive",
    rejectionCategory: "KISSAM_DEFECT",
    rejectionHeadline: "Rejected for Unconverted 'Jalasaya-II / Chaka' Sub-Plots on Bhulekh",
    forensicFinding:
      "While the front 3 showcase villas sat on Gharabari land, plots #14 through #32 in the rear phase were mapped on historical drainage/agricultural Kissam without collector OLR 8(A) conversion certificates.",
    financialRiskAvoided: "100% Title Litigation & Bank Mortgage Rejection Risk",
    auditDate: "Aug 2026",
  },
  {
    id: "rej-03",
    anonymizedCode: "AUDIT #R-112 • SUNDARPADA – HIGH-TECH BELT",
    corridor: "Sundarpada – Jatni Road",
    claimedType: "Podium Lifestyle Towers",
    advertisedRate: "₹5,900 / Sq.Ft.",
    rejectionCategory: "FLOOD_BASIN",
    rejectionHeadline: "Rejected for -1.9m Flood Basin Depression & Gangua Nallah Backflow",
    forensicFinding:
      "Topographical contour mapping showed the basement parking ramp sits 1.9 meters below the 10-year monsoon high-water mark, with no independent storm-water pumping station.",
    financialRiskAvoided: "Basement Submergence & 22% Resale Liquidity Discount",
    auditDate: "Oct 2026",
  },
  {
    id: "rej-04",
    anonymizedCode: "AUDIT #R-119 • TRISULIA APPROACH BELT",
    corridor: "Trisulia – Cuttack Border",
    claimedType: "Pre-Launch Plotted Villa Community",
    advertisedRate: "₹4,800 / Sq.Ft.",
    rejectionCategory: "ORERA_LAPSE",
    rejectionHeadline: "Rejected for Collecting 25% Advances Prior to ORERA Escrow Registration",
    forensicFinding:
      "Developer was routing 'Expression of Interest' cheques into a general current account rather than a statutory 70% RERA ring-fenced construction escrow account.",
    financialRiskAvoided: "Unsecured Capital Exposure & Indefinite Delivery Delay",
    auditDate: "Oct 2026",
  },
  {
    id: "rej-05",
    anonymizedCode: "AUDIT #R-126 • KHANDAGIRI FOOTHILLS BELT",
    corridor: "Khandagiri – Jayadev Vatika",
    claimedType: "14-Storey Biophilic High-Rise",
    advertisedRate: "₹6,400 / Sq.Ft.",
    rejectionCategory: "BDA_VIOLATION",
    rejectionHeadline: "Rejected for BDA Mandatory 6m Fire Setback Deviation on East Flank",
    forensicFinding:
      "Physical laser survey showed peripheral driveway narrowed to 4.2m on East boundary due to compound encroachment. Severe risk of Odisha Fire Safety recommendation refusal and withheld Occupancy Certificate (OC).",
    financialRiskAvoided: "OC Withholding & ₹52L Developer Rectification Penalty Exposure",
    auditDate: "Nov 2026",
  },
  {
    id: "rej-06",
    anonymizedCode: "AUDIT #R-131 • TAMANDO INDUSTRIAL CORRIDOR",
    corridor: "Tamando – NH16 Expansion",
    claimedType: "Gated Townhome Community",
    advertisedRate: "₹1.45 Cr All-Inclusive",
    rejectionCategory: "KISSAM_DEFECT",
    rejectionHeadline: "Rejected for Defective Joint Development GPA Without Mutation Rights",
    forensicFinding:
      "Original land record reflected co-parcenary dispute among 5 legal heirs. The General Power of Attorney registered in 2021 lacked statutory right of alienating fractional shares under OLR Act Section 22.",
    financialRiskAvoided: "High Court Injunction & 5+ Year Freezing of Mutation Rights",
    auditDate: "Nov 2026",
  },
  {
    id: "rej-07",
    anonymizedCode: "AUDIT #R-138 • NAYAPALLI IRC VILLAGE",
    corridor: "Nayapalli – Jayadev Vihar Belt",
    claimedType: "Boutique Residential Suites",
    advertisedRate: "₹9,200 / Sq.Ft.",
    rejectionCategory: "UDS_DILUTION",
    rejectionHeadline: "Rejected for Diluted 14.8% Undivided Land Share (UDS) Allocation",
    forensicFinding:
      "Project cramped 72 luxury units onto a mere 0.38-acre footprint, delivering only 229 sq.ft. of UDS land share per 3 BHK flat. Real asset value resided entirely in depreciating brick, not prime Nayapalli land.",
    financialRiskAvoided: "Severe Asset Depreciation & Zero Long-Term Redevelopment Capital",
    auditDate: "Dec 2026",
  },
  {
    id: "rej-08",
    anonymizedCode: "AUDIT #R-145 • PAHALA NH16 BYPASS",
    corridor: "Pahala – Jagannath Temple Approach",
    claimedType: "Semi-Detached Triplex Residences",
    advertisedRate: "₹2.10 Cr Fixed",
    rejectionCategory: "LOADING_INFLATION",
    rejectionHeadline: "Rejected for 39.4% SBUA Inflation Concealed Under 'Terrace Usufruct'",
    forensicFinding:
      "Developer billed private open-air terrace at 100% covered super built-up rate without RERA sanction. True usable carpet measured just 1,840 sq.ft. against advertised 3,050 sq.ft.",
    financialRiskAvoided: "₹63.2 Lakhs in Air-Space Valuation Overpayment",
    auditDate: "Dec 2026",
  },
];

export const CORRIDOR_GROWTH_BENCHMARKS: Record<
  string,
  {
    name: string;
    annualAppreciationPct: number;
    avgRentalYieldResidential: number;
    avgRentalYieldCommercial: number;
    infraCatalyst: string;
    currentAvgRateSqFt: number;
  }
> = {
  PATIA_INFOCITY: {
    name: "Patia – Infocity IT Corridor",
    annualAppreciationPct: 12.8,
    avgRentalYieldResidential: 4.3,
    avgRentalYieldCommercial: 8.6,
    infraCatalyst: "200ft Master Plan Ring Road + Tier-1 IT/FinTech Campus Expansion",
    currentAvgRateSqFt: 8300,
  },
  PAHALA_NH16: {
    name: "Pahala – NH16 Villa Corridor",
    annualAppreciationPct: 13.4,
    avgRentalYieldResidential: 3.8,
    avgRentalYieldCommercial: 7.9,
    infraCatalyst: "6-Lane NH-16 Elevated Corridor + Luxury Low-Density Zoning",
    currentAvgRateSqFt: 7900,
  },
  SAHEED_NAGAR_CORE: {
    name: "Saheed Nagar – Nayapalli Core",
    annualAppreciationPct: 10.5,
    avgRentalYieldResidential: 4.1,
    avgRentalYieldCommercial: 8.2,
    infraCatalyst: "Zero New Land Supply + High UDS Redevelopment Scarcity",
    currentAvgRateSqFt: 9800,
  },
  KALINGA_NAGAR_AIIMS: {
    name: "Kalinga Nagar – AIIMS Belt",
    annualAppreciationPct: 13.9,
    avgRentalYieldResidential: 4.6,
    avgRentalYieldCommercial: 8.1,
    infraCatalyst: "Medical Hub Expansion + 100ft CDP Master Plan Roads",
    currentAvgRateSqFt: 7100,
  },
  TRISULIA_METRO_BELT: {
    name: "Trisulia – Twin-City Metro Belt",
    annualAppreciationPct: 15.2,
    avgRentalYieldResidential: 3.9,
    avgRentalYieldCommercial: 7.5,
    infraCatalyst: "Bhubaneswar-Cuttack Metro Phase-1 Depot & Judicial Hub",
    currentAvgRateSqFt: 6500,
  },
};
