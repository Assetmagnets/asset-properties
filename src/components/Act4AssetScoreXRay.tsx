"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CuratedProperty } from "@/types/property";
import { ArchitecturalDoorReveal } from "@/components/SanctuaryDoorPortal";

interface Act4AssetScoreXRayProps {
  properties: CuratedProperty[];
  selectedProperty: CuratedProperty;
  onSelectProperty: (property: CuratedProperty) => void;
  onRequestDossier: (property: CuratedProperty) => void;
  hideHeader?: boolean;
}

export default function Act4AssetScoreXRay({
  properties,
  selectedProperty,
  onSelectProperty,
  onRequestDossier,
  hideHeader = false,
}: Act4AssetScoreXRayProps) {
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);

  const scoreMetrics = [
    { label: "ORERA & BDA Purity", score: selectedProperty.scoreLegalPurity, max: 25 },
    { label: "Bhulekh Gharabari Title", score: selectedProperty.scoreMaterialGrade, max: 20 },
    { label: "RERA Carpet Efficiency", score: selectedProperty.scoreCarpetEfficiency, max: 20 },
    { label: "Corridor Appreciation", score: selectedProperty.scoreCorridorGrowth, max: 20 },
    { label: "East Solar Vastu", score: selectedProperty.scoreVastuLight, max: 15 },
  ];

  const activeLayer =
    selectedProperty.xrayLayers[activeLayerIndex] ||
    selectedProperty.xrayLayers[0];

  return (
    <section
      id="act-xray"
      className={`relative ${hideHeader ? "py-12 sm:py-16" : "py-24 sm:py-36"}`}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        {/* Authoritative Advisory Header */}
        {!hideHeader && (
          <div className="text-center">
            <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              DUE DILIGENCE AUDIT • 100-POINT TELEMETRY
            </div>
            <h2 className="mt-4 font-serif text-4xl sm:text-6xl font-medium text-[#F8F9FA]">
              {selectedProperty.title}
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg text-[#CBD5E1] max-w-2xl mx-auto">
              The 100-Point Asset Score™ underwrites every property across statutory legality, Bhulekh land mutation, Leica laser carpet accuracy, corridor appreciation, and Vastu orientation.
            </p>
          </div>
        )}

        {/* High-Legibility Property Selector Pills */}
        <div className="text-center">
          <div className={`${hideHeader ? "mt-2" : "mt-10"} flex flex-wrap justify-center gap-2.5`}>
            {properties.slice(0, 5).map((prop) => (
              <button
                key={prop.id}
                type="button"
                onClick={() => {
                  onSelectProperty(prop);
                  setActiveLayerIndex(0);
                }}
                className={`rounded-full px-5 py-2.5 font-sans text-xs uppercase tracking-wider font-medium transition-all ${
                  selectedProperty.id === prop.id
                    ? "bg-[#D4AF37] font-bold text-[#05070B] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                    : "border border-[#D4AF37]/25 bg-[#0B101B]/50 text-[#A6B0BF] hover:border-[#D4AF37] hover:text-[#F8F9FA]"
                }`}
              >
                {prop.title.replace("VAULT // ", "")}
              </button>
            ))}
          </div>
        </div>

        {/* Spacious 2-Column Audit Wrapped in Architectural Door Reveal */}
        <ArchitecturalDoorReveal
          doorLabelLeft="100-PT"
          doorLabelRight="X-RAY AUDIT"
          className="mt-16 rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B]/80 p-8 sm:p-14 shadow-2xl"
        >
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-start">
            {/* Left: Score Numeral + 5 Detailed Metric Bars */}
            <div className="lg:col-span-5">
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#A6B0BF]">
                  TOTAL ASSET SCORE™
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10B981]/40 bg-[#10B981]/10 px-3 py-0.5 font-mono text-xs font-semibold text-[#10B981]">
                  ✓ AUDIT CERTIFIED
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-serif text-6xl sm:text-7xl font-bold text-[#D4AF37]">
                  {selectedProperty.assetScoreTotal}
                </span>
                <span className="text-2xl font-serif text-[#A6B0BF]">/ 100</span>
              </div>

              <p className="mt-2 text-xs text-[#CBD5E1] font-sans">
                Minimum threshold for Asset Properties Advisory representation is 88/100.
              </p>

              {/* 5 Dimension Progress Bars */}
              <div className="mt-8 space-y-5">
                {scoreMetrics.map((metric) => {
                  const pct = Math.round((metric.score / metric.max) * 100);
                  return (
                    <div key={metric.label}>
                      <div className="flex justify-between font-sans text-xs sm:text-sm font-medium">
                        <span className="text-[#F8F9FA]">{metric.label}</span>
                        <span className="text-[#D4AF37] font-semibold">
                          {metric.score} / {metric.max} pts
                        </span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-[#05070B] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full bg-gradient-to-r from-[#8C7034] to-[#D4AF37]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-xl border border-[#D4AF37]/20 bg-[#05070B]/60 p-4 font-mono text-xs text-[#A6B0BF]">
                ORERA Reg: <span className="text-[#F8F9FA]">{selectedProperty.oreraNumber}</span>
                <br />
                Bhulekh: <span className="text-[#F8F9FA]">{selectedProperty.bhulekhKhataPlot}</span>
              </div>
            </div>

            {/* Right: 4-Layer Forensic Audit Telemetry */}
            <div className="lg:col-span-7 lg:pl-8 lg:border-l lg:border-[#D4AF37]/20">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { layerNum: 1, shortTitle: "1. Legal Title" },
                  { layerNum: 2, shortTitle: "2. Bhulekh Land" },
                  { layerNum: 3, shortTitle: "3. Laser Carpet" },
                  { layerNum: 4, shortTitle: "4. Vastu & Light" },
                ].map((item, idx) => (
                  <button
                    key={item.layerNum}
                    type="button"
                    onClick={() => setActiveLayerIndex(idx)}
                    className={`rounded-xl border py-3 px-2 font-sans text-xs uppercase tracking-wider font-medium transition-all ${
                      activeLayerIndex === idx
                        ? "border-[#D4AF37] bg-[#D4AF37] text-[#05070B] font-bold shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                        : "border-[#D4AF37]/25 bg-[#05070B]/60 text-[#A6B0BF] hover:border-[#D4AF37] hover:text-[#F8F9FA]"
                    }`}
                  >
                    {item.shortTitle}
                  </button>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/5 bg-[#05070B]/70 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                    Layer 0{activeLayer.layerNumber}: {activeLayer.title}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#10B981]/40 bg-[#10B981]/10 px-3 py-0.5 font-mono text-xs text-[#10B981]">
                    {activeLayer.verificationCode}
                  </span>
                </div>

                <div className="mt-4 font-serif text-3xl sm:text-4xl font-medium text-[#F8F9FA]">
                  {activeLayer.metricValue}
                </div>
                <div className="text-xs text-[#A6B0BF] font-sans mt-1">
                  Metric Focus: {activeLayer.metricLabel}
                </div>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#CBD5E1] font-sans">
                  {activeLayer.auditFinding}
                </p>
              </div>

              {/* Distilled Trade-Off Note (Radical Candor) */}
              <div className="mt-6 rounded-2xl border border-[#D4AF37]/35 bg-[#D4AF37]/5 p-6">
                <div className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                  Curator&apos;s Honest Trade-Off Note (Radical Candor)
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-[#F8F9FA] font-sans italic">
                  &ldquo;{selectedProperty.curatorTradeOffNote}&rdquo;
                </p>
                <div className="mt-3 text-xs text-[#A6B0BF] font-sans">
                  Unlike traditional brokers who conceal ground realities, our advisors disclose every active infrastructure bottleneck upfront.
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => onRequestDossier(selectedProperty)}
                  className="rounded-full bg-[#D4AF37] px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-[#05070B] shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:bg-[#e5c349] transition"
                >
                  Unlock 30-Year Verified Legal Dossier
                </button>
              </div>
            </div>
          </div>
        </ArchitecturalDoorReveal>

        {/* CROSS-PORTFOLIO 100-POINT BENCHMARK SCORECARD */}
        <div className="mt-28">
          <div className="text-center">
            <div className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              CROSS-MANDATE TELEMETRY • BENCHMARK MATRIX
            </div>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-medium text-[#F8F9FA]">
              Portfolio 100-Point <span className="italic font-normal text-[#D4AF37]">Scoring Radar</span>.
            </h3>
            <p className="mt-2 font-sans text-xs sm:text-sm text-[#CBD5E1] max-w-xl mx-auto">
              Compare statutory, material, and spatial scores across our entire approved portfolio. Properties failing to achieve 88/100 are disqualified.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B]/90 shadow-2xl">
            <table className="w-full text-left text-xs font-sans">
              <thead className="border-b border-[#D4AF37]/20 bg-[#05070B] uppercase tracking-wider text-[#A6B0BF]">
                <tr>
                  <th className="py-4 px-5">Sanctuary</th>
                  <th className="py-4 px-5">ORERA / BDA (25)</th>
                  <th className="py-4 px-5">Bhulekh Title (20)</th>
                  <th className="py-4 px-5">Carpet Math (20)</th>
                  <th className="py-4 px-5">Corridor CAGR (20)</th>
                  <th className="py-4 px-5">Vastu &amp; Sun (15)</th>
                  <th className="py-4 px-5 text-right">Total Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {properties.map((prop) => {
                  const isCur = prop.id === selectedProperty.id;
                  return (
                    <tr
                      key={prop.id}
                      onClick={() => onSelectProperty(prop)}
                      className={`cursor-pointer transition-colors ${
                        isCur ? "bg-[#D4AF37]/10" : "hover:bg-white/[0.02]"
                      }`}
                    >
                      <td className="py-4 px-5">
                        <div className="font-serif text-sm font-semibold text-[#F8F9FA] flex items-center gap-2">
                          {isCur && <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />}
                          {prop.title.replace("VAULT // ", "")}
                        </div>
                        <div className="text-[11px] text-[#A6B0BF] mt-0.5">{prop.corridorDisplayName.split("–")[0]}</div>
                      </td>
                      <td className="py-4 px-5 font-mono text-[#F8F9FA]">{prop.scoreLegalPurity} / 25</td>
                      <td className="py-4 px-5 font-mono text-[#F8F9FA]">{prop.scoreMaterialGrade} / 20</td>
                      <td className="py-4 px-5 font-mono text-[#F8F9FA]">{prop.scoreCarpetEfficiency} / 20</td>
                      <td className="py-4 px-5 font-mono text-[#F8F9FA]">{prop.scoreCorridorGrowth} / 20</td>
                      <td className="py-4 px-5 font-mono text-[#F8F9FA]">{prop.scoreVastuLight} / 15</td>
                      <td className="py-4 px-5 text-right">
                        <span className="inline-flex items-center rounded-full border border-[#D4AF37]/50 bg-[#05070B] px-3.5 py-1 font-mono text-xs font-bold text-[#D4AF37]">
                          {prop.assetScoreTotal}/100
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 15-POINT PHYSICAL & LEGAL FORENSIC PROTOCOL CHECKLIST */}
        <div className="mt-28">
          <div className="text-center">
            <div className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              PHYSICAL ON-SITE AUDIT INSTRUMENTS
            </div>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-medium text-[#F8F9FA]">
              The 15-Point <span className="italic font-normal text-[#D4AF37]">Forensic Checklist</span>.
            </h3>
            <p className="mt-2 font-sans text-xs sm:text-sm text-[#CBD5E1] max-w-xl mx-auto">
              Every mandate underwritten by Asset Properties undergoes physical inspection using calibrated laboratory and surveying instruments.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { id: "01", name: "Leica Disto D2 Laser", test: "RERA carpet boundary audit to ±1mm accuracy", cat: "SPATIAL" },
              { id: "02", name: "Schmidt Rebound Hammer", test: "In-situ compressive strength test of M40 shear walls", cat: "STRUCTURAL" },
              { id: "03", name: "Tramex Moisture Encounter", test: "Sub-slab waterproofing & basement retaining wall telemetry", cat: "HYDROLOGY" },
              { id: "04", name: "Tahasil Register-IX Search", test: "30-year Hal RoR mutation mutation volume audit", cat: "LEGAL" },
              { id: "05", name: "District Sub-Registrar Book-I", test: "Encumbrance Certificate (EC) deed verification", cat: "LEGAL" },
              { id: "06", name: "BDA Sanction Sectional Match", test: "Floor height, FAR calculation & staircase width check", cat: "STATUTORY" },
              { id: "07", name: "Fani 2019 Surge Contour", test: "High-water elevation relative to MSL contour map", cat: "HYDROLOGY" },
              { id: "08", name: "Odisha Fire Recommendation", test: "6-meter peripheral fire tender turning radius verification", cat: "SAFETY" },
              { id: "09", name: "Saint-Gobain Low-E Telemetry", test: "Solar heat gain coefficient (SHGC) glass audit", cat: "THERMAL" },
              { id: "10", name: "Acoustic Decibel Sound Meter", test: "Ambient noise baseline under 42 dBA in master suites", cat: "ACOUSTIC" },
              { id: "11", name: "Heliodon Solar Path Analysis", test: "7:00 AM East solar penetration and cross-ventilation", cat: "VASTU" },
              { id: "12", name: "STP / WTP Tertiary Grade", test: "MBBR automated sewage & drinking water RO testing", cat: "UTILITIES" },
              { id: "13", name: "ORERA Escrow Statement", test: "Quarterly CA certificate of 70% bank withdrawals", cat: "STATUTORY" },
              { id: "14", name: "Undivided Land Share Audit", test: "Registered sale deed UDS ratio vs total plot area", cat: "LEGAL" },
              { id: "15", name: "Soil Borings & N-Value", test: "Standard Penetration Test (SPT) into hard laterite", cat: "GEOTECHNICAL" },
            ].map((check) => (
              <div key={check.id} className="rounded-xl border border-[#D4AF37]/20 bg-[#0B101B]/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#D4AF37]">#{check.id}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#A6B0BF]">
                    {check.cat}
                  </span>
                </div>
                <div className="mt-2 font-serif text-sm font-semibold text-[#F8F9FA]">{check.name}</div>
                <p className="mt-1 text-xs text-[#CBD5E1] leading-relaxed">{check.test}</p>
                <div className="mt-3 text-[11px] font-mono text-[#10B981] flex items-center gap-1">
                  <span>✓</span> Protocol Certified
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
