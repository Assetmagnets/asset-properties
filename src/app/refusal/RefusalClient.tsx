"use client";

import React from "react";
import { CuratedProperty } from "@/types/property";
import SanctuaryShell from "@/components/SanctuaryShell";
import SubpageHeroStage from "@/components/SubpageHeroStage";
import Act2PhilosophyOfRefusal from "@/components/Act2PhilosophyOfRefusal";

interface RefusalClientProps {
  initialProperties: CuratedProperty[];
}

export default function RefusalClient({ initialProperties }: RefusalClientProps) {
  return (
    <SanctuaryShell properties={initialProperties}>
      {({ lightingMode }) => (
        <div className="w-full">
          <SubpageHeroStage
            badge="WHY CHOOSE US • UNCOMPROMISED STANDARDS"
            badgeDotColor="bg-red-400"
            titlePrefix="Why "
            titleAccent="Asset Properties"
            titleSuffix="?"
            description="Unlike traditional brokers who sell any project for a commission, we reject 80% of properties in Bhubaneswar. If a project has disputed land titles, inflated carpet area, or drainage risks, we reject it."
            metrics={[
              { value: "142", label: "Projects Audited", color: "text-[#F8F9FA]" },
              { value: "114", label: "Disqualified (80%)", color: "text-[#D4AF37]" },
              { value: `${initialProperties.length}`, label: "Verified & Approved", color: "text-[#10B981]" },
            ]}
            scrollPrompt="See Why We Disqualify Bad Projects Below"
            lightingMode={lightingMode}
          />
          <Act2PhilosophyOfRefusal hideHeader={true} />
        </div>
      )}
    </SanctuaryShell>
  );
}
