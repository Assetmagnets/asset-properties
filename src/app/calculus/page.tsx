"use client";

import React from "react";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";
import SanctuaryShell from "@/components/SanctuaryShell";
import Mod5OdishaFinancialLab from "@/components/Mod5OdishaFinancialLab";

export default function CalculusPage() {
  return (
    <SanctuaryShell properties={CURATED_PROPERTIES}>
      {() => (
        <div className="pt-16">
          <Mod5OdishaFinancialLab />
        </div>
      )}
    </SanctuaryShell>
  );
}
