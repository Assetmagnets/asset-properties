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
        onRequestConsult,
      }) => (
        <div className="w-full">
          <SubpageHeroStage
            badge="CURATED PROPERTIES • BHUBANESWAR"
            badgeDotColor="bg-[#D4AF37]"
            titlePrefix="Verified "
            titleAccent="Properties"
            titleSuffix="."
            description="Explore legally vetted luxury apartments, villas, and commercial spaces across Patia, Pahala, Saheed Nagar, and Infocity. Each property is 100% Gharabari title verified and ORERA registered."
            metrics={[
              { value: `${initialProperties.length}`, label: "Verified Properties", color: "text-[#10B981]" },
              { value: "3", label: "Categories", color: "text-[#D4AF37]" },
              { value: "100%", label: "Clear Land Title", color: "text-[#F8F9FA]" },
            ]}
            scrollPrompt="Browse Properties Below"
            lightingMode={lightingMode}
          />
          <Act3PersonaRealmSwitcher
            properties={initialProperties}
            lightingMode={lightingMode}
            selectedProperty={selectedProperty}
            onSelectPropertyForAudit={(prop) => setSelectedProperty(prop)}
            onRequestConsult={onRequestConsult}
            hideHeader={true}
          />
        </div>
      )}
    </SanctuaryShell>
  );
}
