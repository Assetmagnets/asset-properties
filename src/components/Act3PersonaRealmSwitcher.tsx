"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  AssetCategory,
  CuratedProperty,
  LightingMode,
} from "@/types/property";
import { ArchitecturalDoorReveal } from "@/components/SanctuaryDoorPortal";
import { ArrowUpRight, Layers, MessageCircle } from "lucide-react";

interface Act3PersonaRealmSwitcherProps {
  properties: CuratedProperty[];
  lightingMode: LightingMode;
  selectedProperty: CuratedProperty;
  onSelectPropertyForAudit: (property: CuratedProperty) => void;
  onRequestConsult?: () => void;
  hideHeader?: boolean;
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
  onRequestConsult,
  hideHeader = false,
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
      id="act-persona-switcher"
      className={`relative ${hideHeader ? "py-12 sm:py-16" : "py-14 sm:py-24 lg:py-32"}`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {!hideHeader && (
          <div className="text-center">
            <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              CURATED INVENTORY • VERIFIED SANCTUARIES
            </div>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#F8F9FA]">
              Three Curated <span className="italic font-normal text-[#D4AF37]">Realms</span>.
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg text-[#CBD5E1] max-w-2xl mx-auto">
              Every property carries direct Gharabari mutation title, verified ORERA registration, and Leica laser-measured carpet area.
            </p>
          </div>
        )}

        {/* Typology Switcher Tabs */}
        <div className={`${hideHeader ? "mt-4" : "mt-14"} flex flex-wrap items-center justify-center gap-2.5 sm:gap-4`}>
          {REALMS.map((realm) => (
            <button
              key={realm.id}
              type="button"
              onClick={() => setActiveRealm(realm.id)}
              className={`rounded-full px-5 py-2.5 font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                activeRealm === realm.id
                  ? "bg-[#D4AF37] text-[#05070B] shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                  : "border border-[#D4AF37]/25 bg-[#0B101B]/80 text-[#A6B0BF] hover:border-[#D4AF37] hover:text-[#F8F9FA]"
              }`}
            >
              {realm.label}
            </button>
          ))}
        </div>

        {/* 2-Column Responsive Property Grid */}
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property) => {
              const isSelected = selectedProperty.id === property.id;

              return (
                <motion.article
                  key={property.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="group rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B]/70 p-5 sm:p-7 shadow-xl hover:border-[#D4AF37]/60 transition-all duration-300"
                >
                  {/* 3D Double Door Reveal Wrapping the Property Portrait */}
                  <ArchitecturalDoorReveal
                    doorLabelLeft={property.corridor.split("_")[0]}
                    doorLabelRight={`${property.assetScoreTotal}/100`}
                    className={`rounded-xl border transition-all duration-500 overflow-hidden ${
                      isSelected
                        ? "border-[#D4AF37]"
                        : "border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <div className="relative h-[380px] w-full overflow-hidden bg-[#05070B]">
                      <Image
                        src={
                          isDay
                            ? property.dayHeroImageUrl
                            : property.duskHeroImageUrl
                        }
                        alt={property.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        quality={75}
                        loading="lazy"
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/30 to-transparent" />

                      {/* Top Badges Strip */}
                      <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-2 flex-wrap">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#10B981]/40 bg-[#05070B]/90 px-3 py-1 font-mono text-xs font-semibold text-[#10B981] backdrop-blur-md">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                          ORERA: {property.oreraNumber}
                        </div>

                        <div className="rounded-full border border-[#D4AF37]/50 bg-[#05070B]/90 px-3.5 py-1 backdrop-blur-md font-sans text-xs font-bold text-[#D4AF37]">
                          Asset Score™ {property.assetScoreTotal}/100
                        </div>
                      </div>

                      {/* Bottom Title Overlay */}
                      <div className="absolute bottom-5 left-5 right-5">
                        <div className="font-mono text-xs uppercase tracking-wider text-[#D4AF37]">
                          {property.corridorDisplayName}
                        </div>
                        <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-medium text-[#F8F9FA]">
                          {property.title}
                        </h3>
                        <p className="mt-1 text-xs text-[#CBD5E1] line-clamp-1">
                          {property.subtitle}
                        </p>
                      </div>
                    </div>
                  </ArchitecturalDoorReveal>

                  {/* 4-Metric Architectural Specifications Grid */}
                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/5 pt-5 sm:grid-cols-4">
                    <div>
                      <div className="font-sans text-xs uppercase tracking-wider text-[#A6B0BF]">
                        Base Valuation
                      </div>
                      <div className="mt-1 font-serif text-2xl font-semibold text-[#D4AF37]">
                        {property.priceDisplay}
                      </div>
                    </div>

                    <div>
                      <div className="font-sans text-xs uppercase tracking-wider text-[#A6B0BF]">
                        RERA Carpet
                      </div>
                      <div className="mt-1 font-serif text-2xl font-medium text-[#F8F9FA]">
                        {property.reraCarpetSqFt.toLocaleString()} sq.ft.
                      </div>
                    </div>

                    <div>
                      <div className="font-sans text-xs uppercase tracking-wider text-[#A6B0BF]">
                        True Loading
                      </div>
                      <div className="mt-1 font-serif text-2xl font-medium text-[#10B981]">
                        {property.loadingPercentage}%
                      </div>
                    </div>

                    <div>
                      <div className="font-sans text-xs uppercase tracking-wider text-[#A6B0BF]">
                        Carpet Rate
                      </div>
                      <div className="mt-1 font-serif text-2xl font-medium text-[#F8F9FA]">
                        ₹{property.effectiveCarpetPricePerSqFt.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Curator Top Strength Preview */}
                  <div className="mt-4 text-xs text-[#CBD5E1] font-sans leading-relaxed line-clamp-2">
                    <span className="font-semibold text-[#D4AF37]">Curator Audit: </span>
                    {property.curatorStrengths[0]}
                  </div>

                  {/* Action Buttons Below Portrait */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-2">
                    <a
                      href={`/verification?slug=${property.slug}`}
                      onClick={() => onSelectPropertyForAudit(property)}
                      data-cursor="INSPECT"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/35 bg-[#05070B] px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#F8F9FA] hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
                    >
                      <Layers className="h-3.5 w-3.5 text-[#D4AF37]" />
                      100-Point Inspection
                    </a>

                    {onRequestConsult && (
                      <button
                        type="button"
                        onClick={onRequestConsult}
                        data-cursor="CONSULT"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-5 py-2 font-sans text-xs font-bold uppercase tracking-wider text-[#05070B] shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:bg-[#e5c349] transition"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Schedule Advisory Briefing</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* MASTER CURATED PORTFOLIO COMPARATIVE SPECIFICATIONS MATRIX */}
        <div className="mt-28">
          <div className="text-center">
            <div className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              TECHNICAL DUE DILIGENCE • FULL INVENTORY AUDIT
            </div>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-medium text-[#F8F9FA]">
              Master Portfolio <span className="italic font-normal text-[#D4AF37]">Comparative Matrix</span>.
            </h3>
            <p className="mt-2 font-sans text-xs sm:text-sm text-[#CBD5E1] max-w-xl mx-auto">
              Compare all approved Bhubaneswar mandates across laser-measured RERA carpet area, true loading percentage, undivided land share (UDS), and legal mutation.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B]/90 shadow-2xl">
            <table className="w-full text-left text-xs font-sans">
              <thead className="border-b border-[#D4AF37]/20 bg-[#05070B] uppercase tracking-wider text-[#A6B0BF]">
                <tr>
                  <th className="py-4 px-5">Sanctuary &amp; Corridor</th>
                  <th className="py-4 px-5">RERA Carpet</th>
                  <th className="py-4 px-5">Super Built-Up</th>
                  <th className="py-4 px-5">True Loading</th>
                  <th className="py-4 px-5">UDS Land Share</th>
                  <th className="py-4 px-5">Valuation</th>
                  <th className="py-4 px-5">Carpet Rate</th>
                  <th className="py-4 px-5 text-right">Asset Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {publicProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-serif text-sm font-semibold text-[#F8F9FA]">{prop.title}</div>
                      <div className="text-[11px] text-[#D4AF37] font-mono mt-0.5">{prop.corridorDisplayName.split("–")[0]}</div>
                    </td>
                    <td className="py-4 px-5 font-mono text-[#F8F9FA] font-medium">
                      {prop.reraCarpetSqFt.toLocaleString()} sq.ft.
                    </td>
                    <td className="py-4 px-5 font-mono text-[#A6B0BF]">
                      {prop.superBuiltUpSqFt.toLocaleString()} sq.ft.
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1 font-mono font-bold text-[#10B981]">
                        {prop.loadingPercentage}%
                      </span>
                      <span className="text-[10px] text-[#A6B0BF]/60 block font-sans">vs 35% avg</span>
                    </td>
                    <td className="py-4 px-5 font-mono text-[#CBD5E1]">
                      {prop.udsLandSqFt ? `${prop.udsLandSqFt.toLocaleString()} sq.ft.` : "N/A (Full Land)"}
                    </td>
                    <td className="py-4 px-5 font-serif text-sm font-semibold text-[#D4AF37]">
                      {prop.priceDisplay}
                    </td>
                    <td className="py-4 px-5 font-mono text-[#F8F9FA]">
                      ₹{prop.effectiveCarpetPricePerSqFt.toLocaleString()} / sq.ft.
                    </td>
                    <td className="py-4 px-5 text-right">
                      <span className="inline-flex items-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-1 font-mono text-xs font-bold text-[#D4AF37]">
                        {prop.assetScoreTotal}/100
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* BHUBANESWAR CONNECTIVITY & INFRASTRUCTURE PROXIMITY INDEX */}
        <div className="mt-28">
          <div className="text-center">
            <div className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              INFRASTRUCTURE TELEMETRY • COMMUTE BENCHMARKS
            </div>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-medium text-[#F8F9FA]">
              Bhubaneswar Connectivity <span className="italic font-normal text-[#D4AF37]">Index</span>.
            </h3>
            <p className="mt-2 font-sans text-xs sm:text-sm text-[#CBD5E1] max-w-xl mx-auto">
              Average driving transit times verified during peak 9:00 AM and 6:30 PM traffic conditions across arterial flyovers and master plan roads.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                hub: "Biju Patnaik Int'l Airport",
                icon: "✈",
                corridors: [
                  { name: "Saheed Nagar", time: "14 mins" },
                  { name: "Patia / Infocity", time: "28 mins" },
                  { name: "Pahala / NH-16", time: "22 mins" },
                  { name: "Trisulia Metro", time: "35 mins" },
                ],
              },
              {
                hub: "Infocity IT Hub (TCS/Infy)",
                icon: "🏢",
                corridors: [
                  { name: "Patia / Infocity", time: "3 mins" },
                  { name: "Trisulia Metro", time: "16 mins" },
                  { name: "Saheed Nagar", time: "22 mins" },
                  { name: "Pahala / NH-16", time: "18 mins" },
                ],
              },
              {
                hub: "AIIMS Medical Enclave",
                icon: "🏥",
                corridors: [
                  { name: "Kalinga Nagar / AIIMS", time: "4 mins" },
                  { name: "Sundarpada", time: "14 mins" },
                  { name: "Saheed Nagar", time: "24 mins" },
                  { name: "Patia / Infocity", time: "32 mins" },
                ],
              },
              {
                hub: "Bhubaneswar Railway Station",
                icon: "🚆",
                corridors: [
                  { name: "Saheed Nagar", time: "8 mins" },
                  { name: "Pahala / NH-16", time: "16 mins" },
                  { name: "Patia / Infocity", time: "25 mins" },
                  { name: "Trisulia Metro", time: "30 mins" },
                ],
              },
            ].map((hub) => (
              <div
                key={hub.hub}
                className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B101B]/70 p-6 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{hub.icon}</span>
                  <h4 className="font-serif text-base font-semibold text-[#F8F9FA]">
                    {hub.hub}
                  </h4>
                </div>
                <div className="mt-4 space-y-2 border-t border-white/5 pt-4 text-xs font-sans">
                  {hub.corridors.map((c) => (
                    <div key={c.name} className="flex justify-between text-[#CBD5E1]">
                      <span>{c.name}</span>
                      <span className="font-mono font-semibold text-[#D4AF37]">{c.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
