"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AssetCategory,
  CuratedProperty,
  LightingMode,
} from "@/types/property";
import { ArchitecturalDoorReveal } from "@/components/SanctuaryDoorPortal";
import { ArrowUpRight, Layers } from "lucide-react";

interface Act3PersonaRealmSwitcherProps {
  properties: CuratedProperty[];
  lightingMode: LightingMode;
  selectedProperty: CuratedProperty;
  onSelectPropertyForAudit: (property: CuratedProperty) => void;
  onSelectPropertyForMatchmaker: (property: CuratedProperty) => void;
  onRequestDossier: (property: CuratedProperty) => void;
}

const REALMS: { id: AssetCategory | "ALL"; label: string }[] = [
  { id: "ALL", label: "All Sanctuaries" },
  { id: "LUXURY_FLAT", label: "Sky Sanctuaries" },
  { id: "LANDED_VILLA", label: "Landed Estates" },
  { id: "COMMERCIAL_OFFICE", label: "Commercial Monoliths" },
];

export default function Act3PersonaRealmSwitcher({
  properties,
  lightingMode,
  selectedProperty,
  onSelectPropertyForAudit,
  onRequestDossier,
}: Act3PersonaRealmSwitcherProps) {
  const [activeRealm, setActiveRealm] = useState<AssetCategory | "ALL">("ALL");
  const isDay = lightingMode === "SOLAR_DAYLIGHT";

  const publicProperties = properties.filter((p) => !p.isOffMarketVault);
  const filteredProperties =
    activeRealm === "ALL"
      ? publicProperties
      : publicProperties.filter((p) => p.category === activeRealm);

  return (
    <section
      id="act-realms"
      className="relative border-t border-[#D4AF37]/10 py-40 sm:py-52"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        {/* Minimal Centered Header */}
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
            ACT III // THE THREE REALMS
          </div>
          <h2 className="mt-6 font-serif text-4xl font-light text-[#F4F1EA] sm:text-6xl">
            Select your <span className="italic text-[#D4AF37]">sanctuary</span>.
          </h2>

          {/* Minimal Realm Pills */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {REALMS.map((realm) => {
              const active = activeRealm === realm.id;
              return (
                <button
                  key={realm.id}
                  type="button"
                  onClick={() => setActiveRealm(realm.id)}
                  data-cursor="OPEN REALM"
                  className={`rounded-full px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] transition ${
                    active
                      ? "bg-[#D4AF37] text-[#05070B] font-semibold"
                      : "border border-[#D4AF37]/20 text-[#949BA6] hover:border-[#D4AF37] hover:text-[#F4F1EA]"
                  }`}
                >
                  {realm.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Spacious Gallery Grid with 3D Architectural Door Opening on Scroll */}
        <div className="mt-24 grid grid-cols-1 gap-20 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property) => {
              const isSelected = selectedProperty.id === property.id;
              return (
                <motion.article
                  key={property.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6 }}
                  className="group"
                >
                  {/* 3D Double Door Reveal Wrapping the Property Portrait */}
                  <ArchitecturalDoorReveal
                    doorLabelLeft={property.corridor.split("_")[0]}
                    doorLabelRight={`${property.assetScoreTotal}/100`}
                    className={`rounded-2xl border transition-all duration-500 ${
                      isSelected
                        ? "border-[#D4AF37]"
                        : "border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <div className="relative h-[400px] w-full overflow-hidden bg-[#05070B]">
                      <img
                        src={
                          isDay
                            ? property.dayHeroImageUrl
                            : property.duskHeroImageUrl
                        }
                        alt={property.title}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-transparent" />

                      {/* Minimal Top-Right Score Numeral */}
                      <div className="absolute right-6 top-6 rounded-full border border-[#D4AF37]/40 bg-[#05070B]/85 px-4 py-1.5 backdrop-blur-md">
                        <span className="font-serif text-lg text-[#D4AF37]">
                          {property.assetScoreTotal}
                        </span>
                        <span className="font-mono text-[9px] text-[#949BA6]">
                          {" "}
                          / 100
                        </span>
                      </div>

                      {/* Bottom Title Inside Frame */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="font-mono text-[9px] uppercase tracking-[0.32em] text-[#D4AF37]">
                          {property.corridorDisplayName}
                        </div>
                        <h3 className="mt-1 font-serif text-3xl font-light text-[#F4F1EA] sm:text-4xl">
                          {property.title}
                        </h3>
                      </div>
                    </div>
                  </ArchitecturalDoorReveal>

                  {/* Ultra-Clean 3-Metric Row + Minimal Actions Below Portrait */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/15 pb-6">
                    <div className="flex items-center gap-8">
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#949BA6]">
                          Valuation
                        </div>
                        <div className="mt-0.5 font-serif text-2xl text-[#F4F1EA]">
                          {property.priceDisplay}
                        </div>
                      </div>

                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#949BA6]">
                          RERA Carpet
                        </div>
                        <div className="mt-0.5 font-serif text-2xl text-[#F4F1EA]">
                          {property.reraCarpetSqFt.toLocaleString()} sf
                        </div>
                      </div>

                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#949BA6]">
                          Loading
                        </div>
                        <div className="mt-0.5 font-serif text-2xl text-[#2E9B68]">
                          {property.loadingPercentage}%
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={`/xray?slug=${property.slug}`}
                        onClick={() => onSelectPropertyForAudit(property)}
                        data-cursor="X-RAY"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[#F4F1EA] hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
                      >
                        <Layers className="h-3 w-3 text-[#D4AF37]" />
                        X-Ray
                      </a>

                      <button
                        type="button"
                        onClick={() => onRequestDossier(property)}
                        data-cursor="DOSSIER"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-5 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-[#05070B] hover:bg-[#e5c349] transition"
                      >
                        Dossier
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
