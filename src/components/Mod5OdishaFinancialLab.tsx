"use client";

import React, { useState, useMemo } from "react";
import { CORRIDOR_GROWTH_BENCHMARKS } from "@/data/curatedProperties";
import { formatInrCroreLakh } from "@/utils/formatters";

type LabTab = "STAMP_DUTY_BUILDER" | "COST_OF_WAITING" | "COMMERCIAL_RENT_TO_WEALTH";

export default function Mod5OdishaFinancialLab() {
  const [activeTab, setActiveTab] = useState<LabTab>("STAMP_DUTY_BUILDER");
  const [propertyValueCr, setPropertyValueCr] = useState<number>(2.45);
  const [registryGender, setRegistryGender] = useState<"FEMALE_6_PCT" | "MALE_7_PCT">("FEMALE_6_PCT");
  const [hasOC, setHasOC] = useState<boolean>(false);

  const calc = useMemo(() => {
    const baseInr = Math.round(propertyValueCr * 10000000);
    const dutyRate = registryGender === "FEMALE_6_PCT" ? 0.06 : 0.07;
    const stampDutyInr = Math.round(baseInr * dutyRate);
    const femaleSavedInr = Math.round(baseInr * 0.01);
    const gstInr = hasOC ? 0 : Math.round(baseInr * 0.05);
    const landedInr = baseInr + stampDutyInr + gstInr;

    const waitingPenaltyInr = Math.round(
      baseInr * (CORRIDOR_GROWTH_BENCHMARKS.PATIA_INFOCITY.annualAppreciationPct / 100)
    );
    const commercial5YrInr = Math.round(baseInr * Math.pow(1.128, 5));

    return {
      landedInr,
      stampDutyInr,
      femaleSavedInr,
      gstInr,
      waitingPenaltyInr,
      commercial5YrInr,
    };
  }, [propertyValueCr, registryGender, hasOC]);

  return (
    <section
      id="mod-financial-lab"
      className="relative border-t border-[#D4AF37]/10 py-40 sm:py-52"
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-12 text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
          ACT V // ODISHA STATUTORY CALCULUS
        </div>
        <h2 className="mt-6 font-serif text-4xl font-light text-[#F4F1EA] sm:text-6xl">
          True <span className="italic text-[#D4AF37]">acquisition</span> math.
        </h2>

        {/* Minimal 3-Pill Mode Switcher */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {[
            { id: "STAMP_DUTY_BUILDER", label: "01. Odisha Stamp Duty (6% vs 7%)" },
            { id: "COST_OF_WAITING", label: "02. 12-Month Delay Cost" },
            { id: "COMMERCIAL_RENT_TO_WEALTH", label: "03. 5-Year Compounding" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as LabTab)}
              className={`rounded-full px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] transition ${
                activeTab === tab.id
                  ? "bg-[#D4AF37] text-[#05070B] font-semibold"
                  : "border border-[#D4AF37]/20 text-[#949BA6] hover:border-[#D4AF37]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Minimalist Interactive Dial */}
        <div className="mt-20 rounded-2xl border border-[#D4AF37]/20 bg-[#0B101B]/50 p-10 sm:p-16">
          <div className="mx-auto max-w-xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#949BA6]">
              BASE MANDATE VALUE
            </div>
            <div className="mt-2 font-serif text-5xl font-light text-[#F4F1EA] sm:text-6xl">
              ₹{propertyValueCr.toFixed(2)} Cr
            </div>
            <input
              suppressHydrationWarning
              type="range"
              min={1.0}
              max={6.0}
              step={0.05}
              value={propertyValueCr}
              onChange={(e) => setPropertyValueCr(parseFloat(e.target.value))}
              className="mt-8 h-1 w-full cursor-pointer appearance-none bg-[#D4AF37]/30 accent-[#D4AF37]"
            />

            {activeTab === "STAMP_DUTY_BUILDER" && (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setRegistryGender("FEMALE_6_PCT")}
                  className={`rounded-full px-5 py-2 font-mono text-[9px] uppercase tracking-[0.24em] ${
                    registryGender === "FEMALE_6_PCT"
                      ? "bg-[#D4AF37] text-[#05070B] font-semibold"
                      : "border border-[#D4AF37]/25 text-[#949BA6]"
                  }`}
                >
                  Female Registry (6%)
                </button>
                <button
                  type="button"
                  onClick={() => setRegistryGender("MALE_7_PCT")}
                  className={`rounded-full px-5 py-2 font-mono text-[9px] uppercase tracking-[0.24em] ${
                    registryGender === "MALE_7_PCT"
                      ? "bg-[#D4AF37] text-[#05070B] font-semibold"
                      : "border border-[#D4AF37]/25 text-[#949BA6]"
                  }`}
                >
                  Male Registry (7%)
                </button>
                <button
                  type="button"
                  onClick={() => setHasOC(!hasOC)}
                  className={`rounded-full px-5 py-2 font-mono text-[9px] uppercase tracking-[0.24em] ${
                    hasOC
                      ? "bg-[#2E9B68] text-[#F4F1EA]"
                      : "border border-[#D4AF37]/25 text-[#949BA6]"
                  }`}
                >
                  {hasOC ? "Ready OC (0% GST)" : "5% GST"}
                </button>
              </div>
            )}
          </div>

          {/* Monumental Output Row */}
          <div className="mt-16 grid grid-cols-1 gap-10 border-t border-[#D4AF37]/15 pt-12 sm:grid-cols-3">
            {activeTab === "STAMP_DUTY_BUILDER" && (
              <>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#949BA6]">
                    True Landed Cost
                  </div>
                  <div className="mt-2 font-serif text-4xl text-[#D4AF37]">
                    {formatInrCroreLakh(calc.landedInr)}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#949BA6]">
                    Odisha Stamp &amp; Reg
                  </div>
                  <div className="mt-2 font-serif text-4xl text-[#F4F1EA]">
                    {formatInrCroreLakh(calc.stampDutyInr)}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#2E9B68]">
                    Female Duty Saved
                  </div>
                  <div className="mt-2 font-serif text-4xl text-[#2E9B68]">
                    {registryGender === "FEMALE_6_PCT"
                      ? formatInrCroreLakh(calc.femaleSavedInr)
                      : "₹0"}
                  </div>
                </div>
              </>
            )}

            {activeTab === "COST_OF_WAITING" && (
              <>
                <div className="sm:col-span-3">
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-red-400">
                    12-MONTH APPRECIATION DELTA IN PATIA–INFOCITY (+12.8%)
                  </div>
                  <div className="mt-3 font-serif text-6xl font-light text-red-400">
                    + {formatInrCroreLakh(calc.waitingPenaltyInr)}
                  </div>
                </div>
              </>
            )}

            {activeTab === "COMMERCIAL_RENT_TO_WEALTH" && (
              <>
                <div className="sm:col-span-3">
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#2E9B68]">
                    5-YEAR GRADE-A ASSET PROJECTION
                  </div>
                  <div className="mt-3 font-serif text-6xl font-light text-[#2E9B68]">
                    {formatInrCroreLakh(calc.commercial5YrInr)}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
