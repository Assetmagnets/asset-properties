"use client";

import React from "react";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";
import SanctuaryShell from "@/components/SanctuaryShell";
import SubpageHeroStage from "@/components/SubpageHeroStage";
import Mod5OdishaFinancialLab from "@/components/Mod5OdishaFinancialLab";

export default function CalculusClient() {
  return (
    <SanctuaryShell properties={CURATED_PROPERTIES}>
      {({ lightingMode }) => (
        <div className="w-full">
          <SubpageHeroStage
            badge="CHAMBER 05 • ODISHA FINANCIAL LAB • INVESTMENT CALCULUS"
            badgeDotColor="bg-[#D4AF37]"
            titlePrefix="The True-Cost "
            titleAccent="Calculus"
            titleSuffix="."
            description="De-anonymize the true price per square foot of RERA carpet area, calculate Odisha stamp duty & IGR registration fees, and expose hidden loading inflation before signing any agreement."
            metrics={[
              { value: "IGR", label: "Odisha Benchmark", color: "text-[#D4AF37]" },
              { value: "100%", label: "True Carpet Math", color: "text-[#10B981]" },
              { value: "Zero", label: "Hidden Markups", color: "text-[#F8F9FA]" },
            ]}
            scrollPrompt="Simulate Investment Mathematics"
            lightingMode={lightingMode}
          />
          <Mod5OdishaFinancialLab hideHeader={true} />
        </div>
      )}
    </SanctuaryShell>
  );
}
