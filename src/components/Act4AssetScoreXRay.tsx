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
}

export default function Act4AssetScoreXRay({
  properties,
  selectedProperty,
  onSelectProperty,
  onRequestDossier,
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
      className="relative border-t border-[#D4AF37]/10 py-40 sm:py-52"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        {/* Minimal Header */}
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
            ACT IV // THE 100-POINT X-RAY
          </div>
          <h2 className="mt-6 font-serif text-4xl font-light text-[#F4F1EA] sm:text-6xl">
            {selectedProperty.title}
          </h2>

          {/* Minimal Property Selector Pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {properties.slice(0, 5).map((prop) => (
              <button
                key={prop.id}
                type="button"
                onClick={() => {
                  onSelectProperty(prop);
                  setActiveLayerIndex(0);
                }}
                className={`rounded-full px-5 py-2 font-mono text-[9px] uppercase tracking-[0.24em] transition ${
                  selectedProperty.id === prop.id
                    ? "bg-[#D4AF37] font-semibold text-[#05070B]"
                    : "border border-[#D4AF37]/20 text-[#949BA6] hover:border-[#D4AF37]"
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
          className="mt-20 rounded-2xl border border-[#D4AF37]/20 bg-[#0B101B]/50 p-10 sm:p-16"
        >
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
            {/* Left: Monumental Score Numeral + 5 Hairline Bars */}
            <div className="lg:col-span-5">
              <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#949BA6]">
                ASSET SCORE™
              </div>
              <div className="mt-2 font-serif text-7xl font-light text-[#D4AF37] sm:text-8xl">
                {selectedProperty.assetScoreTotal}
                <span className="text-2xl text-[#949BA6]">/100</span>
              </div>

              <div className="mt-10 space-y-5">
                {scoreMetrics.map((metric) => {
                  const pct = Math.round((metric.score / metric.max) * 100);
                  return (
                    <div key={metric.label}>
                      <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
                        <span className="text-[#F4F1EA]">{metric.label}</span>
                        <span className="text-[#D4AF37]">
                          {metric.score}/{metric.max}
                        </span>
                      </div>
                      <div className="mt-2 h-[2px] w-full bg-[#05070B]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full bg-[#D4AF37]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Minimal 4-Layer X-Ray Selector */}
            <div className="lg:col-span-7 lg:pl-8 lg:border-l lg:border-[#D4AF37]/15">
              <div className="grid grid-cols-4 gap-2">
                {selectedProperty.xrayLayers.map((layer, idx) => (
                  <button
                    key={layer.layerNumber}
                    type="button"
                    onClick={() => setActiveLayerIndex(idx)}
                    className={`rounded-xl border py-3 font-mono text-[10px] uppercase tracking-[0.22em] transition ${
                      activeLayerIndex === idx
                        ? "border-[#D4AF37] bg-[#D4AF37] text-[#05070B] font-semibold"
                        : "border-[#D4AF37]/20 text-[#949BA6] hover:border-[#D4AF37]"
                    }`}
                  >
                    L0{layer.layerNumber}
                  </button>
                ))}
              </div>

              <div className="mt-12">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#2E9B68]">
                  {activeLayer.verificationCode}
                </div>
                <div className="mt-3 font-serif text-4xl font-light text-[#F4F1EA] sm:text-5xl">
                  {activeLayer.metricValue}
                </div>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#949BA6]">
                  {activeLayer.auditFinding}
                </p>
              </div>

              {/* Distilled Trade-Off Note */}
              <div className="mt-10 border-t border-[#D4AF37]/15 pt-6">
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#D4AF37]">
                  CURATOR TRADE-OFF NOTE
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#949BA6]">
                  {selectedProperty.curatorTradeOffNote}
                </p>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => onRequestDossier(selectedProperty)}
                  className="rounded-full bg-[#D4AF37] px-7 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#05070B] hover:bg-[#e5c349] transition"
                >
                  Unlock Signed Legal Dossier
                </button>
              </div>
            </div>
          </div>
        </ArchitecturalDoorReveal>
      </div>
    </section>
  );
}
