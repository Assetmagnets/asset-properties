"use client";

import React from "react";
import { CuratedProperty } from "@/types/property";

interface Mod6DecoyMatchmakerProps {
  properties: CuratedProperty[];
  selectedProperty: CuratedProperty;
  onSelectProperty: (property: CuratedProperty) => void;
  onRequestDossier: (property: CuratedProperty) => void;
}

export default function Mod6DecoyMatchmaker({
  selectedProperty,
  onRequestDossier,
}: Mod6DecoyMatchmakerProps) {
  const decoy = selectedProperty.decoyComparison;

  return (
    <section
      id="mod-matchmaker"
      className="relative border-t border-[#D4AF37]/10 py-40 sm:py-52"
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-12">
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
            ASYMMETRIC BENCHMARK
          </div>
          <h2 className="mt-6 font-serif text-4xl font-light text-[#F4F1EA] sm:text-6xl">
            Illusion vs. <span className="italic text-[#D4AF37]">True Carpet</span>.
          </h2>
        </div>

        {/* Clean 2-Column Stark Contrast */}
        <div className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Market Decoy */}
          <div className="rounded-2xl border border-red-500/20 bg-[#0B101B]/40 p-10 text-center">
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-red-400">
              PORTAL AVERAGE (REJECTED)
            </div>
            <div className="mt-3 font-serif text-2xl text-[#949BA6]">
              {decoy.marketAnchorName}
            </div>

            <div className="mt-10 font-serif text-5xl font-light text-red-400">
              {decoy.marketAnchorLoadingPct}%
            </div>
            <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.28em] text-[#949BA6]">
              Super Built-Up Loading
            </div>

            <div className="mt-8 border-t border-[#D4AF37]/10 pt-6 font-mono text-xs text-[#949BA6]">
              Effective Carpet: ₹
              {decoy.marketAnchorEffectiveCarpetRate.toLocaleString()} / sf
            </div>
          </div>

          {/* Approved Sanctuary */}
          <div className="rounded-2xl border border-[#D4AF37] bg-[#0B101B] p-10 text-center shadow-gold-glow">
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#D4AF37]">
              APPROVED SANCTUARY
            </div>
            <div className="mt-3 font-serif text-2xl text-[#F4F1EA]">
              {selectedProperty.title}
            </div>

            <div className="mt-10 font-serif text-5xl font-light text-[#2E9B68]">
              {selectedProperty.loadingPercentage}%
            </div>
            <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.28em] text-[#949BA6]">
              True RERA Loading
            </div>

            <div className="mt-8 border-t border-[#D4AF37]/15 pt-6 font-mono text-xs text-[#D4AF37]">
              Effective Carpet: ₹
              {selectedProperty.effectiveCarpetPricePerSqFt.toLocaleString()} / sf
            </div>

            <button
              type="button"
              onClick={() => onRequestDossier(selectedProperty)}
              className="mt-8 rounded-full bg-[#D4AF37] px-7 py-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-[#05070B] hover:bg-[#e5c349] transition"
            >
              Request Dossier
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
