"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CuratedProperty } from "@/types/property";
import { CORRIDOR_GROWTH_BENCHMARKS } from "@/data/curatedProperties";
import SanctuaryShell from "@/components/SanctuaryShell";
import Act1HeroThreshold from "@/components/Act1HeroThreshold";
import { ArchitecturalDoorReveal } from "@/components/SanctuaryDoorPortal";
import {
  ArrowUpRight,
  TrendingUp,
  Layers,
  XCircle,
  CheckCircle2,
} from "lucide-react";

interface SanctuaryOrchestratorProps {
  initialProperties: CuratedProperty[];
}

const SANCTUARY_PORTAL_PAGES = [
  {
    href: "/refusal",
    tag: "FORENSIC DISQUALIFICATION",
    title: "The Philosophy of Refusal",
    description: "Detailed breakdown of 114 rejected Bhubaneswar projects disqualified for unverified Kissam titles, inflated super built-up loading, or flood risk.",
    metric: "80.2% Projects Disqualified",
    doorLeft: "FORENSIC",
    doorRight: "REFUSAL",
  },
  {
    href: "/realms",
    tag: "CURATED INVENTORY",
    title: "Three Curated Realms",
    description: "Sky Sanctuaries (Flats), Landed Estates (Duplex Villas), and Commercial Monoliths in Patia, Pahala, Saheed Nagar, and Infocity.",
    metric: "28 Approved Sanctuaries",
    doorLeft: "CURATED",
    doorRight: "REALMS",
  },
  {
    href: "/xray",
    tag: "DUE DILIGENCE AUDIT",
    title: "The 100-Point Asset Score™ X-Ray",
    description: "4-Layer telemetry combining ORERA legal purity, Bhulekh 30-year mutation records, Leica laser carpet audits, and Vastu orientation.",
    metric: "Bhulekh & Leica Laser Verified",
    doorLeft: "100-POINT",
    doorRight: "X-RAY",
  },
  {
    href: "/calculus",
    tag: "STATUTORY PRECISION",
    title: "Odisha Financial & Loss Lab",
    description: "Interactive statutory calculus: Female 6% vs. Male 7% Stamp Duty savings, 12-month cost of waiting, and commercial rent-to-wealth analysis.",
    metric: "6% Female vs 7% Male Duty Math",
    doorLeft: "ODISHA",
    doorRight: "CALCULUS",
  },
  {
    href: "/vault",
    tag: "CONFIDENTIAL MANDATES",
    title: "The Private Vault & Golden-Hour Tour",
    description: "Off-market pre-launch inventory, 15-minute dynamically watermarked legal dossiers, and 4:30 PM chauffeur site inspections.",
    metric: "DPDP 2023 Signed Dossier Protocol",
    doorLeft: "PRIVATE",
    doorRight: "VAULT",
  },
];

export default function SanctuaryOrchestrator({
  initialProperties,
}: SanctuaryOrchestratorProps) {
  const publicProperties = initialProperties.filter((p) => !p.isOffMarketVault);

  return (
    <SanctuaryShell properties={initialProperties}>
      {({ lightingMode, onToggleLighting, onRequestDossier, setSelectedProperty }) => (
        <>
          {/* Hero with Sticky Text + Full-Width Left-to-Right Image Scroll-Over */}
          <Act1HeroThreshold
            lightingMode={lightingMode}
            onToggleLighting={onToggleLighting}
            onOpenDossierModal={() => onRequestDossier()}
          />

          {/* 5 CHAMBERS OF UNDERWRITING INDEX */}
          <section className="relative z-20 bg-[#05070B] py-24 sm:py-36 border-t border-[#D4AF37]/15">
            <div className="mx-auto max-w-6xl px-6 sm:px-12">
              <div className="text-center">
                <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  ADVISORY METHODOLOGY • 5 CHAMBERS
                </div>
                <h2 className="mt-4 font-serif text-4xl sm:text-6xl font-medium text-[#F8F9FA]">
                  Chambers of <span className="italic font-normal text-[#D4AF37]">Underwriting</span>.
                </h2>
                <p className="mt-4 font-sans text-base sm:text-lg text-[#CBD5E1] max-w-2xl mx-auto">
                  Explore our five core consulting frameworks designed to eliminate broker conflict of interest and verify every square foot.
                </p>
              </div>

              <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
                {SANCTUARY_PORTAL_PAGES.map((chamber, idx) => (
                  <Link
                    key={chamber.href}
                    href={chamber.href}
                    data-cursor="ENTER"
                    className={`group block ${idx === SANCTUARY_PORTAL_PAGES.length - 1
                        ? "md:col-span-2"
                        : ""
                      }`}
                  >
                    <ArchitecturalDoorReveal
                      doorLabelLeft={chamber.doorLeft}
                      doorLabelRight={chamber.doorRight}
                      className="rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B]/80 p-8 sm:p-12 transition-all duration-300 group-hover:border-[#D4AF37] group-hover:shadow-[0_10px_35px_rgba(212,175,55,0.1)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                          {chamber.tag}
                        </span>
                        <ArrowUpRight className="h-5 w-5 text-[#A6B0BF] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#D4AF37]" />
                      </div>

                      <h3 className="mt-4 font-serif text-2xl sm:text-4xl font-medium text-[#F8F9FA] group-hover:text-[#D4AF37] transition-colors">
                        {chamber.title}
                      </h3>

                      <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-[#CBD5E1]">
                        {chamber.description}
                      </p>

                      <div className="mt-8 border-t border-[#D4AF37]/20 pt-4 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#10B981] flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                        {chamber.metric}
                      </div>
                    </ArchitecturalDoorReveal>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* BHUBANESWAR CORRIDOR MACRO INTELLIGENCE MATRIX */}
          <section className="relative z-20 bg-[#070A11] py-24 sm:py-32 border-t border-[#D4AF37]/15">
            <div className="mx-auto max-w-7xl px-6 sm:px-12">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#0B101B] px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  <TrendingUp className="h-3.5 w-3.5 text-[#10B981]" />
                  MACRO UNDERWRITING • 2026-2030 CAPITAL PROJECTIONS
                </div>
                <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-medium text-[#F8F9FA]">
                  Bhubaneswar Corridor <span className="italic font-normal text-[#D4AF37]">Growth Matrix</span>.
                </h2>
                <p className="mt-3 font-sans text-sm sm:text-base text-[#CBD5E1] max-w-2xl mx-auto">
                  Institutional data audited from Master Plan CDP 2030, Odisha Metro Rail Corporation (OMRC), and IGR benchmark registration figures.
                </p>
              </div>

              {/* Corridor Cards Grid */}
              <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(CORRIDOR_GROWTH_BENCHMARKS).map(([key, corridor]) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B101B]/90 p-6 sm:p-8 flex flex-col justify-between hover:border-[#D4AF37]/60 transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs uppercase tracking-wider text-[#A6B0BF]">
                          {key.replace("_", " ")}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#10B981]/40 bg-[#10B981]/10 px-2.5 py-0.5 font-mono text-xs font-bold text-[#10B981]">
                          +{corridor.annualAppreciationPct}% CAGR
                        </span>
                      </div>

                      <h3 className="mt-3 font-serif text-2xl font-medium text-[#F8F9FA]">
                        {corridor.name}
                      </h3>

                      <div className="mt-5 grid grid-cols-2 gap-3 border-y border-white/5 py-4">
                        <div>
                          <div className="text-[11px] font-sans uppercase tracking-wider text-[#A6B0BF]">
                            Residential Yield
                          </div>
                          <div className="mt-1 font-serif text-lg font-semibold text-[#D4AF37]">
                            {corridor.avgRentalYieldResidential}%
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] font-sans uppercase tracking-wider text-[#A6B0BF]">
                            Commercial Yield
                          </div>
                          <div className="mt-1 font-serif text-lg font-semibold text-[#10B981]">
                            {corridor.avgRentalYieldCommercial}%
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="text-[11px] font-sans uppercase tracking-wider text-[#A6B0BF]">
                          Average Corridor Rate
                        </div>
                        <div className="mt-1 font-mono text-base font-semibold text-[#F8F9FA]">
                          ₹{corridor.currentAvgRateSqFt.toLocaleString()} / Sq.Ft.
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-white/5 bg-[#05070B] p-3.5 text-xs text-[#CBD5E1]">
                      <span className="font-semibold text-[#D4AF37]">Key Infrastructure: </span>
                      {corridor.infraCatalyst}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* APPROVED SANCTUARIES SHOWCASE SPOTLIGHT */}
          <section className="relative z-20 bg-[#05070B] py-24 sm:py-32 border-t border-[#D4AF37]/15">
            <div className="mx-auto max-w-7xl px-6 sm:px-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D4AF37]/20 pb-8">
                <div>
                  <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                    AUDITED INVENTORY • ZERO BROKER CONFLICT
                  </div>
                  <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-medium text-[#F8F9FA]">
                    Signature Approved <span className="italic font-normal text-[#D4AF37]">Sanctuaries</span>.
                  </h2>
                  <p className="mt-2 font-sans text-sm sm:text-base text-[#CBD5E1] max-w-xl">
                    Every property carries 100% Gharabari Kissam mutation, RERA Escrow account verification, and Leica Disto laser-audited usable carpet.
                  </p>
                </div>

                <Link
                  href="/realms"
                  className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37] bg-[#D4AF37]/10 px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#05070B] transition-all"
                >
                  View All 28 Approved Real Estates
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Sanctuaries Spotlight Cards */}
              <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
                {publicProperties.slice(0, 3).map((property) => (
                  <div
                    key={property.id}
                    className="group rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B]/80 overflow-hidden shadow-xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-56 w-full overflow-hidden bg-[#05070B]">
                        <Image
                          src={property.dayHeroImageUrl}
                          alt={property.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          quality={75}
                          loading="lazy"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B101B] via-transparent to-transparent" />
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                          <span className="rounded-full border border-[#10B981]/50 bg-[#05070B]/90 px-3 py-1 font-mono text-xs font-semibold text-[#10B981]">
                            {property.kissamStatus.split(" ")[0]} Verified
                          </span>
                          <span className="rounded-full border border-[#D4AF37]/60 bg-[#05070B]/90 px-3 py-1 font-sans text-xs font-bold text-[#D4AF37]">
                            Score: {property.assetScoreTotal}/100
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="font-sans text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                          {property.corridorDisplayName.split("–")[0]}
                        </div>
                        <h3 className="mt-1 font-serif text-2xl font-medium text-[#F8F9FA] group-hover:text-[#D4AF37] transition-colors">
                          {property.title}
                        </h3>
                        <p className="mt-1 text-xs text-[#CBD5E1] line-clamp-1">
                          {property.configuration}
                        </p>

                        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/5 pt-4 text-center">
                          <div>
                            <div className="text-[10px] uppercase text-[#A6B0BF]">Valuation</div>
                            <div className="mt-0.5 font-serif text-base font-semibold text-[#D4AF37]">
                              {property.priceDisplay}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase text-[#A6B0BF]">RERA Carpet</div>
                            <div className="mt-0.5 font-serif text-base font-medium text-[#F8F9FA]">
                              {property.reraCarpetSqFt.toLocaleString()} sqft
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase text-[#A6B0BF]">Loading</div>
                            <div className="mt-0.5 font-serif text-base font-semibold text-[#10B981]">
                              {property.loadingPercentage}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 flex items-center justify-between gap-3">
                      <Link
                        href={`/xray?slug=${property.slug}`}
                        onClick={() => setSelectedProperty(property)}
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#A6B0BF] hover:text-[#D4AF37] transition"
                      >
                        <Layers className="h-3.5 w-3.5" />
                        Inspect X-Ray
                      </Link>

                      <button
                        type="button"
                        onClick={() => onRequestDossier(property)}
                        className="rounded-full bg-[#D4AF37] px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-wider text-[#05070B] hover:bg-[#e5c349] transition"
                      >
                        Request Dossier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* INSTITUTIONAL DUE DILIGENCE VS TRADITIONAL PORTALS COMPARISON */}
          <section className="relative z-20 bg-[#070A11] py-24 sm:py-32 border-t border-[#D4AF37]/15">
            <div className="mx-auto max-w-5xl px-6 sm:px-12">
              <div className="text-center">
                <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  OPERATIONAL PURITY • ZERO CONFLICT OF INTEREST
                </div>
                <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-medium text-[#F8F9FA]">
                  Traditional Brokerage vs. <span className="italic font-normal text-[#D4AF37]">Asset Properties</span>.
                </h2>
                <p className="mt-3 font-sans text-sm sm:text-base text-[#CBD5E1] max-w-2xl mx-auto">
                  Why Bhubaneswar&apos;s leading physicians, judges, industrialists, and Silicon Valley Odia families consult our private advisory rather than open listing portals.
                </p>
              </div>

              {/* Comparison Data Table */}
              <div className="mt-14 overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B]/90 shadow-2xl">
                <div className="grid grid-cols-12 border-b border-[#D4AF37]/20 bg-[#05070B] p-4 sm:p-6 text-xs font-semibold uppercase tracking-wider">
                  <div className="col-span-4 text-[#A6B0BF]">Underwriting Pillar</div>
                  <div className="col-span-4 text-red-400">Portal Aggregators &amp; Brokers</div>
                  <div className="col-span-4 text-[#10B981]">Asset Properties Advisory</div>
                </div>

                {[
                  {
                    pillar: "Title Search & Mutation",
                    broker: "Basic 3-year certificate, risks Chaka / Jalasaya Kissam defects",
                    advisory: "34-year unbroken Bhulekh chain of title with Tahasil mutation verification",
                  },
                  {
                    pillar: "Square Footage Math",
                    broker: "Advertises 35-42% inflated Super Built-Up Area (SBUA)",
                    advisory: "Leica Disto laser-measured RERA carpet area (0% phantom loading)",
                  },
                  {
                    pillar: "Flood & Soil Telemetry",
                    broker: "Ignored; basement risk concealed during dry-season marketing",
                    advisory: "+4m elevation above 2019 Fani surge & seismic soil test certification",
                  },
                  {
                    pillar: "Statutory Escrow Audit",
                    broker: "Routes booking advances to builder operating accounts",
                    advisory: "Audited statutory 70% ORERA ring-fenced construction escrow only",
                  },
                  {
                    pillar: "Client Privacy (DPDP)",
                    broker: "Client phone sold to 50+ aggressive third-party commission agents",
                    advisory: "DPDP Act 2023 AES-256 field encryption with zero spam guarantee",
                  },
                  {
                    pillar: "Rejection Filter",
                    broker: "0% Disqualification (every developer listing welcomed for fee)",
                    advisory: "80.2% Rejection Rate (114 of 142 Bhubaneswar projects disqualified)",
                  },
                ].map((row, idx) => (
                  <div
                    key={row.pillar}
                    className={`grid grid-cols-12 p-4 sm:p-6 text-xs sm:text-sm font-sans items-center gap-2 ${idx !== 5 ? "border-b border-white/5" : ""
                      }`}
                  >
                    <div className="col-span-4 font-semibold text-[#F8F9FA]">
                      {row.pillar}
                    </div>
                    <div className="col-span-4 text-red-300/80 flex items-start gap-1.5">
                      <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{row.broker}</span>
                    </div>
                    <div className="col-span-4 text-[#10B981] font-medium flex items-start gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{row.advisory}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* THE 5-POINT ADVISORY GUARANTEE */}
          <section className="relative z-20 bg-[#05070B] py-20 border-t border-[#D4AF37]/15">
            <div className="mx-auto max-w-6xl px-6 sm:px-12 text-center">
              <div className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                THE ADVISORY CHARTER
              </div>
              <h2 className="mt-3 font-serif text-2xl sm:text-4xl font-medium text-[#F8F9FA]">
                The Five Institutional Commitments
              </h2>
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 text-left">
                {[
                  { num: "01", title: "100% Gharabari", desc: "No agricultural, Chaka, or disputed Kissam plots admitted." },
                  { num: "02", title: "Leica Carpet Math", desc: "True interior usable area verified with digital laser meters." },
                  { num: "03", title: "ORERA Ringfence", desc: "100% compliance with statutory escrow bank regulations." },
                  { num: "04", title: "AES-256 Privacy", desc: "Direct DPDP Act compliance protecting HNI contact details." },
                  { num: "05", title: "Golden-Hour Test", desc: "4:30 PM on-site inspection for natural sun, wind, and acoustics." },
                ].map((item) => (
                  <div key={item.num} className="rounded-xl border border-[#D4AF37]/20 bg-[#0B101B]/70 p-5">
                    <div className="font-serif text-2xl font-bold text-[#D4AF37]">{item.num}</div>
                    <div className="mt-2 font-serif text-base font-semibold text-[#F8F9FA]">{item.title}</div>
                    <p className="mt-1.5 text-xs text-[#CBD5E1] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </SanctuaryShell>
  );
}
