"use client";

import React from "react";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";
import SanctuaryShell from "@/components/SanctuaryShell";
import SubpageHeroStage from "@/components/SubpageHeroStage";
import Act3PersonaRealmSwitcher from "@/components/Act3PersonaRealmSwitcher";

export default function RealmsClient() {
  return (
    <SanctuaryShell properties={CURATED_PROPERTIES}>
      {({
        lightingMode,
        selectedProperty,
        setSelectedProperty,
        onRequestDossier,
      }) => (
        <div className="w-full">
          <SubpageHeroStage
            badge="CHAMBER 03 • CURATED PORTFOLIO • 3 ADVISORY REALMS"
            badgeDotColor="bg-[#D4AF37]"
            titlePrefix="Select your "
            titleAccent="Sanctuary"
            titleSuffix="."
            description="Filtered across 28 approved mandates in Bhubaneswar. Every property carries full ORERA registration, 30-year Bhulekh title clearance, and Leica laser-verified carpet areas."
            metrics={[
              { value: "28", label: "Curated Mandates", color: "text-[#10B981]" },
              { value: "3", label: "Core Typologies", color: "text-[#D4AF37]" },
              { value: "100%", label: "Gharabari Cleared", color: "text-[#F8F9FA]" },
            ]}
            scrollPrompt="Explore Curated Sanctuaries"
            lightingMode={lightingMode}
          />
          <Act3PersonaRealmSwitcher
            properties={CURATED_PROPERTIES}
            lightingMode={lightingMode}
            selectedProperty={selectedProperty}
            onSelectPropertyForAudit={(prop) => setSelectedProperty(prop)}
            onRequestDossier={(prop) => onRequestDossier(prop)}
            hideHeader={true}
          />
        </div>
      )}
    </SanctuaryShell>
  );
}
