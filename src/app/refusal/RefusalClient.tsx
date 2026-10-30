"use client";

import React from "react";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";
import SanctuaryShell from "@/components/SanctuaryShell";
import SubpageHeroStage from "@/components/SubpageHeroStage";
import Act2PhilosophyOfRefusal from "@/components/Act2PhilosophyOfRefusal";

export default function RefusalClient() {
  return (
    <SanctuaryShell properties={CURATED_PROPERTIES}>
      {({ lightingMode }) => (
        <div className="w-full">
          <SubpageHeroStage
            badge="CHAMBER 02 • FORENSIC ELIMINATION • BHUBANESWAR"
            badgeDotColor="bg-red-400"
            titlePrefix="Curated by "
            titleAccent="Elimination"
            titleSuffix="."
            description="Institutional advisory begins with what we reject. In a market clouded by unverified land titles, phantom super built-up loading, and non-ORERA marketing, our refusal rate is our greatest client asset."
            metrics={[
              { value: "142", label: "Projects Audited", color: "text-[#F8F9FA]" },
              { value: "114", label: "Disqualified (80%)", color: "text-[#D4AF37]" },
              { value: "28", label: "Approved Sanctuaries", color: "text-[#10B981]" },
            ]}
            scrollPrompt="Inspect Forensic Rejection Dossiers"
            lightingMode={lightingMode}
          />
          <Act2PhilosophyOfRefusal hideHeader={true} />
        </div>
      )}
    </SanctuaryShell>
  );
}
