"use client";

import React from "react";
import { CuratedProperty } from "@/types/property";
import SanctuaryShell from "@/components/SanctuaryShell";
import SubpageHeroStage from "@/components/SubpageHeroStage";
import Act3PersonaRealmSwitcher from "@/components/Act3PersonaRealmSwitcher";

interface RealmsClientProps {
  initialProperties: CuratedProperty[];
}

export default function RealmsClient({ initialProperties }: RealmsClientProps) {
  return (
    <SanctuaryShell properties={initialProperties}>
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
            description="Filtered across approved mandates in Bhubaneswar. Every property carries full ORERA registration, 30-year Bhulekh title clearance, and Leica laser-verified carpet areas."
            metrics={[
              { value: `${initialProperties.length}`, label: "Curated Mandates", color: "text-[#10B981]" },
              { value: "3", label: "Core Typologies", color: "text-[#D4AF37]" },
              { value: "100%", label: "Gharabari Cleared", color: "text-[#F8F9FA]" },
            ]}
            scrollPrompt="Explore Curated Sanctuaries"
            lightingMode={lightingMode}
          />
          <Act3PersonaRealmSwitcher
            properties={initialProperties}
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
