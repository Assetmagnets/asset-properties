"use client";

import React, { useState } from "react";
import { CuratedProperty } from "@/types/property";
import { MessageCircle, ArrowUpRight } from "lucide-react";

interface Mod6DecoyMatchmakerProps {
  selectedProperty: CuratedProperty;
  onRequestConsult?: () => void;
}

const DECOY_EXAMPLES = [
  {
    targetCorridor: "Patia – Infocity",
    marketAnchorProjectName: "Typical High-Rise in Patia North",
    marketAnchorPricePerSqFt: 7100,
    marketAnchorLoadingPercentage: 38.0,
    marketAnchorEffectiveCarpetRate: 11450,
    marketAnchorKissamStatus: "Disputed Agricultural Kissam (No Mutation)",
    marketAnchorWeakness: "38% Super Built-up loading means you lose ₹35+ Lakhs on flowerbeds and wide corridors.",
  },
  {
    targetCorridor: "Pahala – NH16",
    marketAnchorProjectName: "Standard Bypass Gated Villas",
    marketAnchorPricePerSqFt: 6200,
    marketAnchorLoadingPercentage: 35.0,
    marketAnchorEffectiveCarpetRate: 9540,
    marketAnchorKissamStatus: "Unconverted Jalasaya-II Land Records",
    marketAnchorWeakness: "Low-lying contour depression prone to rainwater backflow with unconverted land kissam.",
  },
  {
    targetCorridor: "Saheed Nagar",
    marketAnchorProjectName: "Generic Builder Floor Flats",
    marketAnchorPricePerSqFt: 8900,
    marketAnchorLoadingPercentage: 34.0,
    marketAnchorEffectiveCarpetRate: 13500,
    marketAnchorKissamStatus: "Undivided Land Share Dilution",
    marketAnchorWeakness: "Severe UDS dilution delivering only 15% land rights per flat.",
  },
];

export default function Mod6DecoyMatchmaker({
  selectedProperty,
  onRequestConsult,
}: Mod6DecoyMatchmakerProps) {
  const [activeDecoyIndex, setActiveDecoyIndex] = useState(0);

  const decoy = DECOY_EXAMPLES[activeDecoyIndex] || DECOY_EXAMPLES[0];

  return (
    <section id="mod-decoy-matchmaker" className="relative bg-[#05070B] py-14 sm:py-24 lg:py-32 border-t border-[#D4AF37]/15">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
        <div className="text-center">
          <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
            DECISION CALCULUS • FORENSIC CONTRAST
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#F8F9FA]">
            Decoy <span className="italic font-normal text-[#D4AF37]">Matchmaker</span>.
          </h2>
          <p className="mt-4 font-sans text-base sm:text-lg text-[#CBD5E1] max-w-2xl mx-auto">
            Direct side-by-side technical comparison showing how conventional market advertisements inflate carpet loading and mask legal infirmities.
          </p>
        </div>

        {/* Corridor Decoy Selector Tabs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {DECOY_EXAMPLES.map((d, idx) => (
            <button
              key={d.targetCorridor}
              type="button"
              onClick={() => setActiveDecoyIndex(idx)}
              className={`rounded-full px-5 py-2 font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                activeDecoyIndex === idx
                  ? "bg-[#D4AF37] text-[#05070B] shadow-md"
                  : "border border-[#D4AF37]/25 bg-[#0B101B] text-[#A6B0BF] hover:text-[#F8F9FA]"
              }`}
            >
              {d.targetCorridor}
            </button>
          ))}
        </div>

        {/* Side-by-Side Architectural Contrast Card Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Market Decoy Listing (Typical Broker Pitch) */}
          <div className="rounded-2xl border border-red-500/30 bg-[#0B101B]/60 p-5 sm:p-8 lg:p-10 shadow-xl relative">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-red-400">
              ✕ TYPICAL MARKET ADVERTISEMENT
            </div>
            <h3 className="mt-4 font-serif text-2xl font-medium text-[#F8F9FA]">
              {decoy.marketAnchorProjectName}
            </h3>
            <p className="text-xs text-[#A6B0BF] font-sans mt-1">
              Corridor: {decoy.targetCorridor}
            </p>

            <div className="mt-8 border-t border-white/5 pt-6">
              <div className="font-sans text-xs uppercase tracking-wider text-[#A6B0BF]">
                Claimed Super Built-Up Loading
              </div>
              <div className="mt-1 font-serif text-3xl sm:text-5xl font-semibold text-red-400">
                {decoy.marketAnchorLoadingPercentage}%
              </div>
              <p className="text-xs text-red-300 font-sans mt-1">
                Significant space lost to corridors and builder inflation
              </p>
            </div>

            <div className="mt-6 space-y-3 border-t border-white/5 pt-6 font-sans text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#A6B0BF]">Advertised Rate:</span>
                <span className="text-[#F8F9FA] font-medium font-mono">₹{decoy.marketAnchorPricePerSqFt.toLocaleString()} / sq.ft.</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#A6B0BF]">Effective Carpet Rate:</span>
                <span className="text-red-400 font-bold font-mono">₹{decoy.marketAnchorEffectiveCarpetRate.toLocaleString()} / sq.ft.</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#A6B0BF]">Title / Kissam Status:</span>
                <span className="text-red-400 font-medium">{decoy.marketAnchorKissamStatus}</span>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-xs text-red-300 font-sans leading-relaxed">
              <span className="font-semibold text-red-400">Critical Risk: </span>
              {decoy.marketAnchorWeakness}
            </div>
          </div>

          {/* Approved Sanctuary (Asset Properties Gold Pick) */}
          <div className="rounded-2xl border-2 border-[#D4AF37] bg-[#0B101B] p-5 sm:p-8 lg:p-10 shadow-[0_0_35px_rgba(212,175,55,0.15)] relative">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#10B981]/40 bg-[#10B981]/10 px-3.5 py-1 font-mono text-xs font-semibold text-[#10B981]">
              ✓ ASSET PROPERTIES APPROVED
            </div>
            <h3 className="mt-4 font-serif text-2xl font-medium text-[#F8F9FA]">
              {selectedProperty.title}
            </h3>
            <p className="text-xs text-[#D4AF37] font-sans mt-1">
              Corridor: {selectedProperty.corridorDisplayName}
            </p>

            <div className="mt-8 border-t border-[#D4AF37]/25 pt-6">
              <div className="font-sans text-xs uppercase tracking-wider text-[#A6B0BF]">
                True RERA Carpet Loading
              </div>
              <div className="mt-1 font-serif text-3xl sm:text-5xl font-semibold text-[#10B981]">
                {selectedProperty.loadingPercentage}%
              </div>
              <p className="text-xs text-[#10B981] font-sans mt-1">
                Leica laser-audited usable interior carpet space
              </p>
            </div>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-6 font-sans text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#A6B0BF]">Base Sq.Ft. Rate:</span>
                <span className="text-[#F8F9FA] font-medium font-mono">₹{selectedProperty.pricePerSqFt.toLocaleString()} / sq.ft.</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#A6B0BF]">Effective Carpet Rate:</span>
                <span className="text-[#10B981] font-bold font-mono">₹{selectedProperty.effectiveCarpetPricePerSqFt.toLocaleString()} / sq.ft.</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#A6B0BF]">Title / Kissam Status:</span>
                <span className="text-[#10B981] font-medium">{selectedProperty.kissamStatus}</span>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-[#10B981]/30 bg-[#10B981]/10 p-4 text-xs text-[#10B981] font-sans leading-relaxed">
              <span className="font-semibold text-[#10B981]">Verified Advantage: </span>
              {selectedProperty.curatorStrengths[0]}
            </div>

            {onRequestConsult && (
              <button
                type="button"
                onClick={onRequestConsult}
                className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-[#05070B] shadow-gold-glow hover:bg-[#e5c349] transition"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Book Comparative Advisory Consultation</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
