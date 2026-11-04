"use client";

import React from "react";
import { CuratedProperty } from "@/types/property";
import SanctuaryShell from "@/components/SanctuaryShell";
import SubpageHeroStage from "@/components/SubpageHeroStage";
import Mod5OdishaFinancialLab from "@/components/Mod5OdishaFinancialLab";

interface CalculusClientProps {
  initialProperties: CuratedProperty[];
}

export default function CalculusClient({ initialProperties }: CalculusClientProps) {
  return (
    <SanctuaryShell properties={initialProperties}>
      {({ lightingMode }) => (
        <div className="w-full">
          <SubpageHeroStage
            badge="ODISHA REAL ESTATE FINANCIAL CALCULATOR"
            badgeDotColor="bg-[#D4AF37]"
            titlePrefix="Property & "
            titleAccent="Stamp Duty Calculator"
            titleSuffix="."
            description="Calculate exact registration fees (Female 6% vs. Male 7% Stamp Duty savings in Odisha), real carpet rate vs. super built-up loading, and monthly EMI payments with zero hidden markups."
            metrics={[
              { value: "6% vs 7%", label: "Odisha Stamp Duty", color: "text-[#D4AF37]" },
              { value: "100%", label: "Real Carpet Math", color: "text-[#10B981]" },
              { value: "Zero", label: "Hidden Costs", color: "text-[#F8F9FA]" },
            ]}
            scrollPrompt="Use the Financial Calculator Below"
            lightingMode={lightingMode}
          />
          <Mod5OdishaFinancialLab hideHeader={true} />
        </div>
      )}
    </SanctuaryShell>
  );
}
