"use client";

import React from "react";
import dynamic from "next/dynamic";
import { CuratedProperty } from "@/types/property";
import SanctuaryShell from "@/components/SanctuaryShell";
import SubpageHeroStage from "@/components/SubpageHeroStage";
import Act4AssetScoreXRay from "@/components/Act4AssetScoreXRay";

const Mod6DecoyMatchmaker = dynamic(
  () => import("@/components/Mod6DecoyMatchmaker"),
  { ssr: true }
);

interface XRayClientProps {
  initialProperties: CuratedProperty[];
}

export default function XRayClient({ initialProperties }: XRayClientProps) {
  return (
    <SanctuaryShell properties={initialProperties}>
      {({ lightingMode, selectedProperty, setSelectedProperty, onRequestConsult }) => (
        <div className="w-full">
          <SubpageHeroStage
            badge="100-POINT INSPECTION & VERIFICATION"
            badgeDotColor="bg-[#D4AF37]"
            titlePrefix="Property "
            titleAccent="Verification Audit"
            titleSuffix="."
            description="Every property undergoes a rigorous 5-point inspection: 30-year Bhulekh ownership history, true laser carpet area, building safety, sunlight orientation, and ORERA compliance."
            metrics={[
              { value: "100", label: "Quality Score", color: "text-[#D4AF37]" },
              { value: "5", label: "Core Inspections", color: "text-[#10B981]" },
              { value: "0%", label: "Hidden Surprises", color: "text-[#F8F9FA]" },
            ]}
            scrollPrompt="Examine Property Inspection Scores Below"
            lightingMode={lightingMode}
          />
          <Act4AssetScoreXRay
            properties={initialProperties}
            selectedProperty={selectedProperty}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            onRequestConsult={onRequestConsult}
            hideHeader={true}
          />
          <Mod6DecoyMatchmaker
            selectedProperty={selectedProperty}
            onRequestConsult={onRequestConsult}
          />
        </div>
      )}
    </SanctuaryShell>
  );
}
