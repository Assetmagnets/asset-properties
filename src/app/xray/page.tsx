"use client";

import React from "react";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";
import SanctuaryShell from "@/components/SanctuaryShell";
import Act4AssetScoreXRay from "@/components/Act4AssetScoreXRay";
import Mod6DecoyMatchmaker from "@/components/Mod6DecoyMatchmaker";

export default function XRayPage() {
  return (
    <SanctuaryShell properties={CURATED_PROPERTIES}>
      {({ selectedProperty, setSelectedProperty, onRequestDossier }) => (
        <div className="pt-16">
          <Act4AssetScoreXRay
            properties={CURATED_PROPERTIES}
            selectedProperty={selectedProperty}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            onRequestDossier={(prop) => onRequestDossier(prop)}
          />
          <Mod6DecoyMatchmaker
            properties={CURATED_PROPERTIES}
            selectedProperty={selectedProperty}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            onRequestDossier={(prop) => onRequestDossier(prop)}
          />
        </div>
      )}
    </SanctuaryShell>
  );
}
