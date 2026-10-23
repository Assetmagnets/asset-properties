import { NextRequest, NextResponse } from "next/server";
import { CURATED_PROPERTIES, REJECTED_PROJECT_AUDITS } from "@/data/curatedProperties";
import { getScoreOverrides } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const corridor = searchParams.get("corridor");
  const includeVault = searchParams.get("vault") !== "false";

  const overrides = getScoreOverrides();

  let properties = CURATED_PROPERTIES.map((prop) => ({
    ...prop,
    assetScoreTotal: overrides[prop.id] ?? prop.assetScoreTotal,
  }));

  if (category && category !== "ALL") {
    properties = properties.filter((p) => p.category === category);
  }

  if (corridor && corridor !== "ALL") {
    properties = properties.filter((p) => p.corridor === corridor);
  }

  if (!includeVault) {
    properties = properties.filter((p) => !p.isOffMarketVault);
  }

  return NextResponse.json({
    status: "success",
    count: properties.length,
    auditSummary: {
      totalProjectsAudited: 142,
      totalProjectsRejected: 114,
      totalProjectsApproved: 28,
      lastUpdated: "October 2026 • Bhubaneswar Revenue & ORERA Registry",
    },
    properties,
    rejectedAudits: REJECTED_PROJECT_AUDITS,
  });
}
