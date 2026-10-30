"use client";

import React from "react";
import dynamic from "next/dynamic";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";
import SanctuaryShell from "@/components/SanctuaryShell";
import SubpageHeroStage from "@/components/SubpageHeroStage";
import Mod7PrivateVaultDossier from "@/components/Mod7PrivateVaultDossier";

const Mod8GoldenHourScheduler = dynamic(
  () => import("@/components/Mod8GoldenHourScheduler"),
  { ssr: true }
);

export default function VaultClient() {
  const vaultProperties = CURATED_PROPERTIES.filter((p) => p.isOffMarketVault);

  return (
    <SanctuaryShell properties={CURATED_PROPERTIES}>
      {({ lightingMode, onRequestDossier }) => (
        <div className="w-full">
          <SubpageHeroStage
            badge="CHAMBER 06 • OFF-MARKET SANCTUARY • PRIVATE MANDATES"
            badgeDotColor="bg-[#D4AF37]"
            titlePrefix="The Private "
            titleAccent="Vault"
            titleSuffix="."
            description="Restricted institutional access to undisclosed landed estates, legacy generational plots, and pre-ORERA private investor allocations across Saheed Nagar, Patia, and Trisulia."
            metrics={[
              { value: "Off-Market", label: "Curated Portfolios", color: "text-[#D4AF37]" },
              { value: "AES-256", label: "Encrypted Dossiers", color: "text-[#10B981]" },
              { value: "Strict", label: "Private Mandate", color: "text-[#F8F9FA]" },
            ]}
            scrollPrompt="Enter Confidential Vault & Schedule Briefing"
            lightingMode={lightingMode}
          />
          <Mod7PrivateVaultDossier
            vaultProperties={vaultProperties}
            onRequestDossier={(prop) => onRequestDossier(prop)}
            hideHeader={true}
          />
          <Mod8GoldenHourScheduler properties={CURATED_PROPERTIES} />
        </div>
      )}
    </SanctuaryShell>
  );
}
