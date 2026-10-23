"use client";

import React from "react";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";
import SanctuaryShell from "@/components/SanctuaryShell";
import Act3PersonaRealmSwitcher from "@/components/Act3PersonaRealmSwitcher";

export default function RealmsPage() {
  return (
    <SanctuaryShell properties={CURATED_PROPERTIES}>
      {({
        lightingMode,
        selectedProperty,
        setSelectedProperty,
        onRequestDossier,
      }) => (
        <div className="pt-16">
          <Act3PersonaRealmSwitcher
            properties={CURATED_PROPERTIES}
            lightingMode={lightingMode}
            selectedProperty={selectedProperty}
            onSelectPropertyForAudit={(prop) => setSelectedProperty(prop)}
            onSelectPropertyForMatchmaker={(prop) => setSelectedProperty(prop)}
            onRequestDossier={(prop) => onRequestDossier(prop)}
          />
        </div>
      )}
    </SanctuaryShell>
  );
}
