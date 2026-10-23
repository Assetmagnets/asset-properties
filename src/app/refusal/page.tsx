"use client";

import React from "react";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";
import SanctuaryShell from "@/components/SanctuaryShell";
import Act2PhilosophyOfRefusal from "@/components/Act2PhilosophyOfRefusal";

export default function RefusalPage() {
  return (
    <SanctuaryShell properties={CURATED_PROPERTIES}>
      {() => (
        <div className="pt-16">
          <Act2PhilosophyOfRefusal />
        </div>
      )}
    </SanctuaryShell>
  );
}
