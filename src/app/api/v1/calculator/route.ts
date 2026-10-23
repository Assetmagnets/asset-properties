import { NextRequest, NextResponse } from "next/server";
import { OdishaCalculatorSchema } from "@/lib/validations";
import { CORRIDOR_GROWTH_BENCHMARKS } from "@/data/curatedProperties";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = OdishaCalculatorSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "VALIDATION_ERROR",
          message: parsed.error.issues[0]?.message || "Invalid calculator payload",
        },
        { status: 400 }
      );
    }

    const {
      mode,
      basePropertyValueInr,
      registryGender = "FEMALE_6_PCT",
      isReadyToMoveOC = false,
      corridor = "PATIA_INFOCITY",
      monthlyCommercialRentInr = 125000,
      corporateTaxBracketPct = 30,
    } = parsed.data;

    // Odisha Statutory Stamp Duty + Registration Rules:
    // Male: 5% Stamp Duty + 2% Registration = 7.0%
    // Female: 4% Stamp Duty + 2% Registration = 6.0% (1% statutory concession in Odisha)
    // Joint (Male + Female): 6.5% effective
    const stampDutyRate =
      registryGender === "FEMALE_6_PCT"
        ? 0.06
        : registryGender === "JOINT_6_5_PCT"
        ? 0.065
        : 0.07;

    const stampDutyAndRegInr = Math.round(basePropertyValueInr * stampDutyRate);
    const maleBenchmarkDutyInr = Math.round(basePropertyValueInr * 0.07);
    const femaleRegistrySavingsInr = maleBenchmarkDutyInr - stampDutyAndRegInr;

    // GST: 5% on Under-Construction Luxury Residential, 0% if Occupancy Certificate (OC) received
    const gstRate = isReadyToMoveOC ? 0 : 0.05;
    const gstAmountInr = Math.round(basePropertyValueInr * gstRate);

    // Society Corpus & Legal Verification Fixed Estimate
    const corpusAndMutationInr = Math.round(basePropertyValueInr * 0.01);

    const totalTrueLandedCostInr =
      basePropertyValueInr +
      stampDutyAndRegInr +
      gstAmountInr +
      corpusAndMutationInr;

    // Tab 2: Cost of Waiting 12 Months in Bhubaneswar Corridors
    const corridorData =
      CORRIDOR_GROWTH_BENCHMARKS[corridor] ||
      CORRIDOR_GROWTH_BENCHMARKS.PATIA_INFOCITY;

    const appreciationLoss12MoInr = Math.round(
      basePropertyValueInr * (corridorData.annualAppreciationPct / 100)
    );
    const rentalIncomeForegone12MoInr = Math.round(
      basePropertyValueInr * (corridorData.avgRentalYieldResidential / 100)
    );
    const stampDutyEscalationInr = Math.round(appreciationLoss12MoInr * stampDutyRate);
    const totalCostOfWaiting12MoInr =
      appreciationLoss12MoInr +
      rentalIncomeForegone12MoInr +
      stampDutyEscalationInr;

    // Tab 3: Commercial Rent-to-Wealth Converter
    const annualRentOutflowInr = monthlyCommercialRentInr * 12;
    const fiveYearDeadRentBurnInr = Math.round(annualRentOutflowInr * 5.63); // 6% annual lease escalation
    const annualCommercialDepreciationShieldInr = Math.round(
      basePropertyValueInr * 0.1 * (corporateTaxBracketPct / 100)
    );
    const projected5YrCommercialEquityInr = Math.round(
      basePropertyValueInr * Math.pow(1 + corridorData.annualAppreciationPct / 100, 5)
    );

    return NextResponse.json({
      mode,
      trueCostBreakdown: {
        basePropertyValueInr,
        stampDutyRatePct: stampDutyRate * 100,
        stampDutyAndRegInr,
        femaleRegistrySavingsInr,
        gstRatePct: gstRate * 100,
        gstAmountInr,
        corpusAndMutationInr,
        totalTrueLandedCostInr,
      },
      costOfWaiting12Months: {
        corridorName: corridorData.name,
        annualAppreciationPct: corridorData.annualAppreciationPct,
        appreciationLoss12MoInr,
        rentalIncomeForegone12MoInr,
        stampDutyEscalationInr,
        totalCostOfWaiting12MoInr,
        infraCatalyst: corridorData.infraCatalyst,
      },
      commercialWealthConverter: {
        annualRentOutflowInr,
        fiveYearDeadRentBurnInr,
        annualCommercialDepreciationShieldInr,
        projected5YrCommercialEquityInr,
        netWealthDelta5YrInr:
          projected5YrCommercialEquityInr -
          basePropertyValueInr +
          fiveYearDeadRentBurnInr +
          annualCommercialDepreciationShieldInr * 5,
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "CALCULATION_ERROR",
        message: err instanceof Error ? err.message : "Calculation error",
      },
      { status: 500 }
    );
  }
}
