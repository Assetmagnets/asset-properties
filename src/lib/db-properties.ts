import { prisma, getScoreOverrides } from "@/lib/prisma";
import { CuratedProperty } from "@/types/property";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";

export async function getDynamicProperties(): Promise<CuratedProperty[]> {
  const overrides = getScoreOverrides();

  try {
    const dbProps = await prisma.property.findMany({
      orderBy: { assetScoreTotal: "desc" },
    });

    if (dbProps && dbProps.length > 0) {
      // Map database rows and merge with fallback defaults for strictly UI calculations
      const fallbackMap = new Map<string, CuratedProperty>(
        CURATED_PROPERTIES.map((p) => [p.id, p])
      );

      return dbProps.map((p) => {
        const fallback = fallbackMap.get(p.id) || CURATED_PROPERTIES[0];
        const reraCarpet = p.reraCarpetSqFt || fallback.reraCarpetSqFt;
        const basePrice = Number(p.basePriceInr);
        const effectiveCarpetPrice = reraCarpet > 0 ? Math.round(basePrice / reraCarpet) : fallback.effectiveCarpetPricePerSqFt;

        return {
          id: p.id,
          slug: p.slug,
          title: p.title,
          subtitle: p.subtitle || fallback.subtitle,
          category: p.category as CuratedProperty["category"],
          corridor: p.corridor as CuratedProperty["corridor"],
          corridorDisplayName: p.corridorDisplayName || fallback.corridorDisplayName,
          microLocation: p.microLocation,
          basePriceInr: basePrice,
          priceDisplay: p.priceDisplay || fallback.priceDisplay,
          pricePerSqFt: p.pricePerSqFt,
          effectiveCarpetPricePerSqFt: effectiveCarpetPrice,
          superBuiltUpSqFt: p.superBuiltUpSqFt,
          reraCarpetSqFt: reraCarpet,
          loadingPercentage: p.loadingPercentage,
          udsLandSqFt: p.udsLandSqFt ?? fallback.udsLandSqFt,
          estimatedRentalYield: p.estimatedRentalYield ?? fallback.estimatedRentalYield,
          configuration: p.configuration || fallback.configuration,
          possessionTimeline: p.possessionTimeline || fallback.possessionTimeline,
          totalUnitsInProject: fallback.totalUnitsInProject,
          densityPerAcre: fallback.densityPerAcre,
          oreraNumber: p.oreraNumber,
          oreraVerifiedUrl: p.oreraVerifiedUrl || fallback.oreraVerifiedUrl,
          bdaSanctionNumber: p.bdaSanctionNumber || fallback.bdaSanctionNumber,
          bhulekhKhataPlot: p.bhulekhKhataPlot || fallback.bhulekhKhataPlot,
          kissamStatus: p.kissamStatus,
          ecYearsVerified: p.ecYearsVerified,
          floodElevationMeters: fallback.floodElevationMeters,
          approvedBanks: p.approvedBanks,
          assetScoreTotal: overrides[p.id] ?? p.assetScoreTotal,
          scoreLegalPurity: p.scoreLegalPurity,
          scoreMaterialGrade: p.scoreMaterialGrade,
          scoreCorridorGrowth: p.scoreCorridorGrowth,
          scoreCarpetEfficiency: p.scoreCarpetEfficiency,
          scoreVastuLight: p.scoreVastuLight,
          curatorStrengths: p.curatorStrengths,
          curatorTradeOffNote: p.curatorTradeOffNote,
          idealBuyerPersona: p.idealBuyerPersona,
          dayHeroImageUrl: p.dayHeroImageUrl,
          duskHeroImageUrl: p.duskHeroImageUrl,
          rawSiteVideoUrl: p.rawSiteVideoUrl || fallback.rawSiteVideoUrl,
          instagramReelUrl: p.instagramReelUrl || fallback.instagramReelUrl,
          isOffMarketVault: p.isOffMarketVault,
          isGoldPick: p.isGoldPick,
          xrayLayers: fallback.xrayLayers,
          decoyComparison: fallback.decoyComparison,
        };
      });
    }
  } catch (err) {
    console.warn("Neon DB query error in getDynamicProperties:", err);
  }

  // Graceful fallback if database connection drops
  return CURATED_PROPERTIES.map((prop) => ({
    ...prop,
    assetScoreTotal: overrides[prop.id] ?? prop.assetScoreTotal,
  }));
}
