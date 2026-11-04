"use client";

import React from "react";
import dynamic from "next/dynamic";
import { CuratedProperty } from "@/types/property";
import SanctuaryShell from "@/components/SanctuaryShell";
import SubpageHeroStage from "@/components/SubpageHeroStage";
import Mod7PrivateVaultDossier from "@/components/Mod7PrivateVaultDossier";

const Mod8GoldenHourScheduler = dynamic(
  () => import("@/components/Mod8GoldenHourScheduler"),
  { ssr: true }
);

interface VaultClientProps {
  initialProperties: CuratedProperty[];
}

export default function VaultClient({ initialProperties }: VaultClientProps) {
  const vaultProperties = initialProperties.filter((p) => p.isOffMarketVault);

  return (
    <SanctuaryShell properties={initialProperties}>
      {({ lightingMode, onRequestConsult }) => (
        <div className="w-full">
          <SubpageHeroStage
            badge="OFF-MARKET & EXCLUSIVE ALLOCATIONS"
            badgeDotColor="bg-[#D4AF37]"
            titlePrefix="Exclusive "
            titleAccent="Off-Market Properties"
            titleSuffix="."
            description="Private access to unlisted luxury penthouses, private villas, and pre-launch developer allotments across Saheed Nagar, Patia, and Trisulia not advertised on public portals."
            metrics={[
              { value: "Off-Market", label: "Private Inventory", color: "text-[#D4AF37]" },
              { value: "Direct", label: "Developer Allotments", color: "text-[#10B981]" },
              { value: "Verified", label: "Clear Title", color: "text-[#F8F9FA]" },
            ]}
            scrollPrompt="View Exclusive Properties & Book Tour"
            lightingMode={lightingMode}
          />
          <Mod7PrivateVaultDossier
            vaultProperties={vaultProperties.length > 0 ? vaultProperties : initialProperties.slice(0, 3)}
            onRequestConsult={onRequestConsult}
            hideHeader={true}
          />
          <Mod8GoldenHourScheduler properties={initialProperties} />
        </div>
      )}
    </SanctuaryShell>
  );
}
