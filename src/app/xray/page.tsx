"use client";

import React from "react";
import dynamic from "next/dynamic";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";
import SanctuaryShell from "@/components/SanctuaryShell";
import SubpageHeroStage from "@/components/SubpageHeroStage";
import Act4AssetScoreXRay from "@/components/Act4AssetScoreXRay";

const Mod6DecoyMatchmaker = dynamic(
  () => import("@/components/Mod6DecoyMatchmaker"),
  { ssr: true }
);

export default function XRayPage() {
  return (
    <SanctuaryShell properties={CURATED_PROPERTIES}>
      {({ lightingMode, selectedProperty, setSelectedProperty, onRequestDossier }) => (
        <div className="w-full">
          <SubpageHeroStage
            badge="CHAMBER 04 • UNDERWRITING MATRIX • 100-POINT AUDIT"
            badgeDotColor="bg-[#D4AF37]"
            titlePrefix="The 100-Point "
            titleAccent="Forensic X-Ray™"
            titleSuffix="."
            description="We inspect 5 institutional pillars: Gharabari Title, True Loading Index, Structural & Seismic Grade, Spatial Quality, and ORERA Escrow Compliance before recommending any investment."
            metrics={[
              { value: "100", label: "Audit Benchmark", color: "text-[#D4AF37]" },
              { value: "5", label: "Forensic Pillars", color: "text-[#10B981]" },
              { value: "0%", label: "Broker Inflations", color: "text-[#F8F9FA]" },
            ]}
            scrollPrompt="Examine Scoring Radar & Decoys"
            lightingMode={lightingMode}
          />
          <Act4AssetScoreXRay
            properties={CURATED_PROPERTIES}
            selectedProperty={selectedProperty}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            onRequestDossier={(prop) => onRequestDossier(prop)}
            hideHeader={true}
          />
          <Mod6DecoyMatchmaker
            selectedProperty={selectedProperty}
            onRequestDossier={(prop) => onRequestDossier(prop)}
          />
        </div>
      )}
    </SanctuaryShell>
  );
}
