"use client";

import React from "react";
import { CuratedProperty } from "@/types/property";

interface Mod6DecoyMatchmakerProps {
  selectedProperty: CuratedProperty;
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
      className="relative py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-12">
        <div className="text-center">
          <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
            ASYMMETRIC BENCHMARK • RADICAL TRANSPARENCY
          </div>
          <h2 className="mt-4 font-serif text-4xl sm:text-6xl font-medium text-[#F8F9FA]">
            Market Illusion vs. <span className="italic font-normal text-[#D4AF37]">True Carpet Value</span>.
          </h2>
          <p className="mt-4 font-sans text-base sm:text-lg text-[#CBD5E1] max-w-2xl mx-auto">
            Traditional real estate portals market low &ldquo;super built-up&rdquo; base rates while concealing 35%+ loading. See the true mathematical difference for {selectedProperty.title}.
          </p>
        </div>

        {/* 2-Column Stark Comparison Matrix */}
        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Market Decoy (Portal Average) */}
          <div className="rounded-2xl border border-red-500/30 bg-[#0B101B]/80 p-8 sm:p-10 shadow-lg">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-red-500/35 bg-red-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-red-400">
              ✕ REJECTED PORTAL AVERAGE
            </div>
            <h3 className="mt-4 font-serif text-2xl font-medium text-[#F8F9FA]">
              {decoy.marketAnchorName}
            </h3>
            <p className="text-xs text-[#A6B0BF] font-sans mt-1">
              Location: {decoy.marketAnchorLocation}
            </p>

            <div className="mt-8 border-t border-red-500/20 pt-6">
              <div className="font-sans text-xs uppercase tracking-wider text-[#A6B0BF]">
                Advertised Super Built-Up Loading
              </div>
              <div className="mt-1 font-serif text-5xl font-semibold text-red-400">
                {decoy.marketAnchorLoadingPct}%
              </div>
              <p className="text-xs text-red-400/90 font-sans mt-1">
                Inflated by shafts, clubhouse, and lift corridor bloat
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
          <div className="rounded-2xl border-2 border-[#D4AF37] bg-[#0B101B] p-8 sm:p-10 shadow-[0_0_35px_rgba(212,175,55,0.15)] relative">
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
              <div className="mt-1 font-serif text-5xl font-semibold text-[#10B981]">
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

            <button
              type="button"
              onClick={() => onRequestDossier(selectedProperty)}
              className="mt-8 w-full rounded-full bg-[#D4AF37] py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-[#05070B] shadow-gold-glow hover:bg-[#e5c349] transition"
            >
              Request Comparative Verification Dossier
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
