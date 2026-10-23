"use client";

import React from "react";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";
import SanctuaryShell from "@/components/SanctuaryShell";
import Mod7PrivateVaultDossier from "@/components/Mod7PrivateVaultDossier";
import Mod8GoldenHourScheduler from "@/components/Mod8GoldenHourScheduler";

export default function VaultPage() {
  const vaultProperties = CURATED_PROPERTIES.filter((p) => p.isOffMarketVault);

  return (
    <SanctuaryShell properties={CURATED_PROPERTIES}>
      {({ onRequestDossier }) => (
        <div className="pt-16">
          <Mod7PrivateVaultDossier
            vaultProperties={vaultProperties}
            onRequestDossier={(prop) => onRequestDossier(prop)}
          />
          <Mod8GoldenHourScheduler properties={CURATED_PROPERTIES} />
        </div>
      )}
    </SanctuaryShell>
  );
}
