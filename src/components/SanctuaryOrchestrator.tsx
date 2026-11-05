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
    href: "/properties",
    tag: "VERIFIED INVENTORY",
    title: "Verified Properties",
    description: "Explore luxury flats, private villas, and commercial offices in Patia, Pahala, Saheed Nagar, and Infocity.",
    metric: "28 Verified Properties",
    doorLeft: "EXPLORE",
    doorRight: "PROPERTIES",
  },
  {
    href: "/why-us",
    tag: "OUR STANDARDS",
    title: "Why Choose Us",
    description: "Detailed breakdown of 114 rejected Bhubaneswar projects disqualified for unverified Kissam titles, inflated super built-up loading, or flood risk.",
    metric: "80.2% Projects Disqualified",
    doorLeft: "QUALITY",
    doorRight: "STANDARDS",
  },
  {
    href: "/verification",
    tag: "100-POINT INSPECTION",
    title: "Property Verification Audit",
    description: "4-Layer telemetry combining ORERA legal purity, Bhulekh 30-year mutation records, Leica laser carpet audits, and Vastu orientation.",
    metric: "Bhulekh & Laser Verified",
    doorLeft: "INSPECTION",
    doorRight: "AUDIT",
  },
  {
    href: "/calculator",
    tag: "STAMP DUTY & ROI",
    title: "Financial & Duty Calculator",
    description: "Interactive calculator: Female 6% vs. Male 7% Stamp Duty savings in Odisha, 12-month cost of waiting, and commercial rent-to-wealth analysis.",
    metric: "6% Female vs 7% Male Duty Math",
    doorLeft: "ODISHA",
    doorRight: "CALCULATOR",
  },
  {
    href: "/exclusive",
    tag: "OFF-MARKET & EXCLUSIVE",
    title: "Exclusive Off-Market Properties",
    description: "Unlisted pre-launch inventory, direct developer allotments, and private 4:30 PM site walkthroughs.",
    metric: "Private Advisory Allocations",
    doorLeft: "EXCLUSIVE",
    doorRight: "OFF-MARKET",
  },
];

export default function SanctuaryOrchestrator({
  initialProperties,
}: SanctuaryOrchestratorProps) {
  const publicProperties = initialProperties.filter((p) => !p.isOffMarketVault);

  return (
    <SanctuaryShell properties={initialProperties}>
      {({ lightingMode, onToggleLighting, onRequestConsult }) => (
        <>
          {/* Hero with Sticky Text + Full-Width Left-to-Right Image Scroll-Over */}
          <Act1HeroThreshold
            lightingMode={lightingMode}
            onToggleLighting={onToggleLighting}
            onOpenConsultModal={onRequestConsult}
          />

          {/* 5 CHAMBERS / ADVISORY SECTIONS */}
          <section className="relative z-20 bg-[#05070B] py-14 sm:py-24 lg:py-32 border-t border-[#D4AF37]/15">
            <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
              <div className="text-center">
                <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  ADVISORY FRAMEWORK • 5 CORE SERVICES
                </div>
                <h2 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#F8F9FA]">
                  Our Advisory <span className="italic font-normal text-[#D4AF37]">Services</span>.
                </h2>
                <p className="mt-4 font-sans text-base sm:text-lg text-[#CBD5E1] max-w-2xl mx-auto">
                  Explore our five core consulting frameworks designed to eliminate broker conflict of interest and verify every square foot.
                </p>
              </div>

              <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {SANCTUARY_PORTAL_PAGES.map((page, idx) => (
                  <ArchitecturalDoorReveal
                    key={page.href}
                    doorLabelLeft={page.doorLeft}
                    doorLabelRight={page.doorRight}
                    className="group flex flex-col justify-between rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B]/80 p-8 shadow-xl transition-all duration-300 hover:border-[#D4AF37]/60 hover:bg-[#0B101B]"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs uppercase tracking-wider text-[#D4AF37]">
                          0{idx + 1} // {page.tag}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-[#A6B0BF] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#D4AF37]" />
                      </div>

                      <h3 className="mt-4 font-serif text-2xl font-medium text-[#F8F9FA] group-hover:text-white">
                        {page.title}
                      </h3>

                      <p className="mt-3 font-sans text-xs sm:text-sm leading-relaxed text-[#CBD5E1]">
                        {page.description}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-white/5 pt-4">
                      <div className="font-mono text-xs font-semibold text-[#10B981]">
                        {page.metric}
                      </div>
                      <Link
                        href={page.href}
                        className="mt-3 inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:underline"
                      >
                        <span>View Details</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </ArchitecturalDoorReveal>
                ))}
              </div>
            </div>
          </section>

          {/* REAL ESTATE CORRIDOR GROWTH TELEMETRY (BHUBANESWAR) */}
          <section className="relative z-20 bg-[#080C14] py-14 sm:py-24 lg:py-32 border-t border-[#D4AF37]/15">
            <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
              <div className="text-center">
                <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  CAPITAL APPRECIATION TELEMETRY • BHUBANESWAR 2026–2030
                </div>
                <h2 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#F8F9FA]">
                  Corridor Growth <span className="italic font-normal text-[#D4AF37]">Benchmarks</span>.
                </h2>
                <p className="mt-4 font-sans text-base sm:text-lg text-[#CBD5E1] max-w-2xl mx-auto">
                  Historical 5-year compound annual growth rates (CAGR) and projected capital appreciation driven by Metro Phase-1, Infocity expansions, and NH-16 widening.
                </p>
              </div>

              <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(CORRIDOR_GROWTH_BENCHMARKS).map(([key, corridor]) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-[#D4AF37]/25 bg-[#05070B] p-6 shadow-xl transition-all duration-300 hover:border-[#D4AF37]/60"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                        Verified Corridor
                      </span>
                      <div className="flex items-center gap-1 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-2.5 py-0.5 font-mono text-xs font-bold text-[#10B981]">
                        <TrendingUp className="h-3 w-3" />
                        <span>+{corridor.annualAppreciationPct}% CAGR</span>
                      </div>
                    </div>

                    <h3 className="mt-4 font-serif text-xl font-medium text-[#F8F9FA]">
                      {corridor.name}
                    </h3>

                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/5 pt-4 font-sans text-xs">
                      <div>
                        <div className="text-[#A6B0BF]">Avg. Rate</div>
                        <div className="mt-0.5 font-serif text-base font-semibold text-[#F8F9FA]">
                          ₹{corridor.currentAvgRateSqFt.toLocaleString()} / sq.ft.
                        </div>
                      </div>
                      <div>
                        <div className="text-[#A6B0BF]">Rental Yield</div>
                        <div className="mt-0.5 font-serif text-base font-semibold text-[#D4AF37]">
                          {corridor.avgRentalYieldResidential}% - {corridor.avgRentalYieldCommercial}%
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-white/5 pt-3">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#A6B0BF]">
                        Infrastructure Catalyst:
                      </div>
                      <div className="mt-1 font-sans text-xs text-[#CBD5E1]">
                        {corridor.infraCatalyst}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3 CORE REALMS TEASER */}
          <section className="relative z-20 bg-[#05070B] py-14 sm:py-24 lg:py-32 border-t border-[#D4AF37]/15">
            <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                    CURATED TYPOLOGIES
                  </div>
                  <h2 className="mt-3 font-serif text-2xl sm:text-4xl lg:text-5xl font-medium text-[#F8F9FA]">
                    Featured <span className="italic font-normal text-[#D4AF37]">Properties</span>.
                  </h2>
                </div>
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#0B101B] px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#05070B] transition"
                >
                  <span>Explore Full Portfolio</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
                {[
                  {
                    title: "Sky Sanctuaries",
                    subtitle: "Luxury Flats & Penthouse Suites",
                    corridors: "Patia & Saheed Nagar",
                    features: "Single-core elevators, biophilic light crossways, <24% true loading",
                    img: "/images/properties/luxury-flats-bhubaneswar.png",
                  },
                  {
                    title: "Landed Estates",
                    subtitle: "Gated Villas & Courtyard Mansions",
                    corridors: "Pahala & Trisulia Belt",
                    features: "100% Gharabari mutation, private boundary wall, Vastu water courtyards",
                    img: "/images/properties/modern-villa-pahala.png",
                  },
                  {
                    title: "Commercial Monoliths",
                    subtitle: "Grade-A Corporate Offices & Retail",
                    corridors: "Infocity IT Corridor",
                    features: "High-yield leasing, multi-tier HVAC, institutional floor-plate efficiency",
                    img: "/images/properties/commercial-office-infocity.png",
                  },
                ].map((realm) => (
                  <div
                    key={realm.title}
                    className="group relative overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B] p-6 shadow-xl transition-all duration-300 hover:border-[#D4AF37]/60"
                  >
                    <div className="relative h-48 w-full overflow-hidden rounded-xl">
                      <Image
                        src={realm.img}
                        alt={realm.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B101B] via-transparent to-transparent" />
                    </div>

                    <div className="mt-5">
                      <div className="font-mono text-xs uppercase tracking-wider text-[#D4AF37]">
                        {realm.corridors}
                      </div>
                      <h3 className="mt-1 font-serif text-2xl font-medium text-[#F8F9FA]">
                        {realm.title}
                      </h3>
                      <p className="mt-1 font-sans text-xs text-[#A6B0BF]">
                        {realm.subtitle}
                      </p>
                      <p className="mt-3 font-sans text-xs leading-relaxed text-[#CBD5E1] border-t border-white/5 pt-3">
                        {realm.features}
                      </p>
                    </div>

                    <Link
                      href="/properties"
                      className="mt-5 inline-flex items-center gap-1 font-sans text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:underline"
                    >
                      <span>View Approved Units</span>
                      <span>→</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* THE 100-POINT ASScore SUMMARY TEASER */}
          <section className="relative z-20 bg-[#080C14] py-14 sm:py-24 lg:py-32 border-t border-[#D4AF37]/15">
            <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-6">
                  <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                    100-POINT QUALITY INSPECTION
                  </div>
                  <h2 className="mt-4 font-serif text-2xl sm:text-4xl lg:text-5xl font-medium text-[#F8F9FA]">
                    The 100-Point <span className="italic font-normal text-[#D4AF37]">Inspection Audit</span>.
                  </h2>
                  <p className="mt-4 font-sans text-base leading-relaxed text-[#CBD5E1]">
                    Every square foot evaluated across five uncompromised pillars: ORERA Purity, Bhulekh RoR Mutation, Leica Laser Carpet Efficiency, Corridor Growth Vector, and Vastu Helios alignment.
                  </p>

                  <div className="mt-8 space-y-3 font-sans text-sm">
                    {[
                      { pillar: "ORERA & BDA Sanction Purity", pts: "25 Points" },
                      { pillar: "Bhulekh 30-Year RoR Mutation Purity", pts: "20 Points" },
                      { pillar: "Laser-Measured True Carpet Efficiency", pts: "20 Points" },
                      { pillar: "Corridor CAGR & Infrastructure Proximity", pts: "20 Points" },
                      { pillar: "Vastu Helios & Micro-Climate Solar Path", pts: "15 Points" },
                    ].map((item) => (
                      <div
                        key={item.pillar}
                        className="flex items-center justify-between rounded-xl border border-white/5 bg-[#05070B] p-3.5 px-4"
                      >
                        <span className="text-[#F8F9FA]">{item.pillar}</span>
                        <span className="font-serif font-bold text-[#D4AF37]">{item.pts}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/verification"
                      className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 sm:px-8 py-3 sm:py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-[#05070B] shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:bg-[#e5c349] transition"
                    >
                      <Layers className="h-4 w-4" />
                      <span>Launch 100-Point Verification Audit</span>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#05070B] p-4 sm:p-8 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
                      <span className="font-mono text-xs uppercase tracking-wider text-[#A6B0BF]">
                        Sample Benchmark Analysis
                      </span>
                      <span className="rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-0.5 font-mono text-xs font-semibold text-[#10B981]">
                        Passed 95/100
                      </span>
                    </div>

                    <div className="mt-6 space-y-4">
                      {publicProperties.slice(0, 3).map((prop) => (
                        <div
                          key={prop.id}
                          className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0B101B] p-4"
                        >
                          <div>
                            <div className="font-serif text-base font-semibold text-[#F8F9FA]">
                              {prop.title}
                            </div>
                            <div className="font-mono text-xs text-stone-muted">
                              {prop.corridorDisplayName.split("–")[0]} • {prop.priceDisplay}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-serif text-2xl font-bold text-[#D4AF37]">
                              {prop.assetScoreTotal}
                            </span>
                            <span className="font-sans text-xs text-stone-muted">/100</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-4 text-xs font-sans text-[#CBD5E1]">
                      <span className="font-semibold text-[#D4AF37]">Rejection Policy: </span>
                      Any property scoring below 88/100 or lacking Gharabari land title conversion is disqualified from our advisory portfolio.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FORENSIC ADVISORY COMPARISON TABLE */}
          <section className="relative z-20 bg-[#05070B] py-14 sm:py-24 lg:py-32 border-t border-[#D4AF37]/15">
            <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-12">
              <div className="text-center">
                <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  TRANSPARENCY CHARTER • DIRECT CONTRAST
                </div>
                <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-medium text-[#F8F9FA]">
                  Traditional Brokerage vs. <span className="italic font-normal text-[#D4AF37]">Asset Advisory</span>.
                </h2>
                <p className="mt-4 font-sans text-xs sm:text-sm text-[#CBD5E1] max-w-xl mx-auto">
                  Why high-net-worth investors and outstation Odias choose forensic representation over commission-driven sales tactics.
                </p>
              </div>

              <div className="mt-14 overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-[#0B101B]">
                <div className="grid grid-cols-12 border-b border-[#D4AF37]/20 bg-[#05070B] p-4 sm:p-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#A6B0BF]">
                  <div className="col-span-4">Audit Parameter</div>
                  <div className="col-span-4 text-red-400">Traditional Broker</div>
                  <div className="col-span-4 text-[#D4AF37]">Asset Properties Advisory</div>
                </div>

                {[
                  {
                    pillar: "Financial Alignment",
                    broker: "Commission-driven (incentivized to push whichever builder pays the highest fee)",
                    advisory: "Fiduciary Underwriting (recommends rejection when title or loading is unfavorable)",
                  },
                  {
                    pillar: "Carpet Area Measurement",
                    broker: "Accepts inflated super built-up claims without verification (35%+ loading)",
                    advisory: "Leica laser-measured true usable carpet area audit with documented loading %",
                  },
                  {
                    pillar: "Land Title Verification",
                    broker: "Basic ORERA certificate check; ignores historical Bhulekh RoR mutations",
                    advisory: "Forensic 30-year Bhulekh chain-of-title, Kissam Gharabari audit & encumbrance kit",
                  },
                  {
                    pillar: "Trade-Off Disclosure",
                    broker: "Zero disclosure of water-logging, approach bottleneck, or sound corridors",
                    advisory: "Radical Candor Note: full written disclosure of current bottlenecks on every unit",
                  },
                  {
                    pillar: "Client Data Privacy",
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
            <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 text-center">
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

