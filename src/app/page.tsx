import React from "react";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";
import { getScoreOverrides } from "@/lib/prisma";
import SanctuaryOrchestrator from "@/components/SanctuaryOrchestrator";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const overrides = getScoreOverrides();

  const hydratedProperties = CURATED_PROPERTIES.map((prop) => ({
    ...prop,
    assetScoreTotal: overrides[prop.id] ?? prop.assetScoreTotal,
  }));

  return <SanctuaryOrchestrator initialProperties={hydratedProperties} />;
}
