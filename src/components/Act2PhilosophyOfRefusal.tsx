"use client";

import React, { useState, useEffect, useRef } from "react";
import { REJECTED_PROJECT_AUDITS } from "@/data/curatedProperties";
import { ArchitecturalDoorReveal } from "@/components/SanctuaryDoorPortal";

interface Act2PhilosophyOfRefusalProps {
  hideHeader?: boolean;
}

export default function Act2PhilosophyOfRefusal({
  hideHeader = false,
}: Act2PhilosophyOfRefusalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const auditedRef = useRef<HTMLDivElement>(null);
  const rejectedRef = useRef<HTMLDivElement>(null);
  const approvedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    let animFrameId: number;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          observer.disconnect();
          const startTime = performance.now();
          const duration = 1800; // 1.8s
          const easeOutPower3 = (t: number) => 1 - Math.pow(1 - t, 3);

          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeOutPower3(progress);

            if (auditedRef.current) {
              auditedRef.current.textContent = String(Math.round(142 * ease));
            }
            if (rejectedRef.current) {
              rejectedRef.current.textContent = String(Math.round(114 * ease));
            }
            if (approvedRef.current) {
              approvedRef.current.textContent = String(Math.round(28 * ease));
            }

            if (progress < 1) {
              animFrameId = requestAnimationFrame(step);
            }
          };

          animFrameId = requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  const currentAudit = REJECTED_PROJECT_AUDITS[activeIndex];

  return (
    <section
      id="act-refusal"
      ref={sectionRef}
      className={`relative ${hideHeader ? "py-12 sm:py-16" : "py-24 sm:py-36"}`}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        {/* Authoritative Eyebrow + Headline (shown on Home, hidden when page has SubpageHeroStage) */}
        {!hideHeader && (
          <div className="text-center">
            <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              FORENSIC ELIMINATION • 80.2% DISQUALIFICATION
            </div>
            <h2 className="mt-4 font-serif text-4xl sm:text-6xl font-medium text-[#F8F9FA]">
              Curated by <span className="italic font-normal text-[#D4AF37]">Elimination</span>.
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg text-[#CBD5E1] max-w-2xl mx-auto">
              Institutional advisory begins with what we reject. In a market clouded by unverified land titles, phantom super built-up loading, and non-ORERA marketing, our refusal rate is our greatest client asset.
            </p>
          </div>
        )}

        {/* 3 Monumental Numbers with Crisp Authority */}
        <div className={`${hideHeader ? "mt-4" : "mt-20"} grid grid-cols-1 gap-10 text-center sm:grid-cols-3`}>
          <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B101B]/60 p-8 sm:p-10">
            <div ref={auditedRef} className="font-serif text-6xl sm:text-7xl font-medium text-[#F8F9FA]">
              142
            </div>
            <div className="mt-3 font-sans text-sm font-semibold uppercase tracking-wider text-[#A6B0BF]">
              Bhubaneswar Projects Audited
            </div>
            <div className="mt-1 text-xs text-[#A6B0BF]/70 font-sans">
              Patia, Pahala, Saheed Nagar, Trisulia
            </div>
          </div>

          <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#0B101B]/80 p-8 sm:p-10 shadow-[0_0_30px_rgba(212,175,55,0.08)]">
            <div ref={rejectedRef} className="font-serif text-6xl sm:text-7xl font-semibold text-[#D4AF37]">
              114
            </div>
            <div className="mt-3 font-sans text-sm font-semibold uppercase tracking-wider text-[#D4AF37]">
              Disqualified (80.2%)
            </div>
            <div className="mt-1 text-xs text-[#D4AF37]/80 font-sans">
              Failed legal, structural or area audits
            </div>
          </div>

          <div className="rounded-2xl border border-[#10B981]/30 bg-[#0B101B]/60 p-8 sm:p-10">
            <div ref={approvedRef} className="font-serif text-6xl sm:text-7xl font-semibold text-[#10B981]">
              28
            </div>
            <div className="mt-3 font-sans text-sm font-semibold uppercase tracking-wider text-[#10B981]">
              Sanctuaries Approved
            </div>
            <div className="mt-1 text-xs text-[#10B981]/80 font-sans">
              100-Point Asset Score verified
            </div>
          </div>
        </div>

        {/* 4-Pillar Disqualification Vault Doorway */}
        <div className="mt-24">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { idx: 0, label: "01. Loading Inflation (>34%)" },
              { idx: 1, label: "02. Kissam Defect (Jalasaya/Chaka)" },
              { idx: 2, label: "03. Flood Basin & Gangua Backflow" },
              { idx: 3, label: "04. ORERA Escrow Lapse" },
            ].map((pill) => (
              <button
                key={pill.idx}
                type="button"
                onClick={() => setActiveIndex(pill.idx)}
                className={`rounded-full px-5 py-2.5 font-sans text-xs uppercase tracking-wider font-medium transition-all ${
                  activeIndex === pill.idx
                    ? "bg-[#D4AF37] text-[#05070B] font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                    : "border border-[#D4AF37]/25 bg-[#0B101B]/50 text-[#A6B0BF] hover:border-[#D4AF37] hover:text-[#F8F9FA]"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          <ArchitecturalDoorReveal
            doorLabelLeft="FORENSIC"
            doorLabelRight="REJECTION"
            className="mt-10 rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B]/80 p-8 sm:p-14 text-left shadow-xl"
          >
            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D4AF37]/15 pb-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/35 bg-red-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-red-400">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                {currentAudit.anonymizedCode} • DISQUALIFIED
              </div>
              <div className="font-mono text-xs text-[#A6B0BF]">
                Audit Date: <span className="text-[#F8F9FA]">{currentAudit.auditDate}</span> &nbsp;•&nbsp; Corridor: <span className="text-[#D4AF37]">{currentAudit.corridor}</span>
              </div>
            </div>

            {/* Rejection Headline */}
            <h3 className="mt-6 font-serif text-2xl sm:text-3xl font-medium text-[#F8F9FA]">
              {currentAudit.rejectionHeadline}
            </h3>

            {/* Forensic Detail Box */}
            <div className="mt-6 rounded-xl border border-white/5 bg-[#05070B]/80 p-5 sm:p-6">
              <div className="font-sans text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-2">
                Forensic Investigation Findings &amp; Ground Reality:
              </div>
              <p className="font-sans text-sm sm:text-base leading-relaxed text-[#CBD5E1]">
                {currentAudit.forensicFinding}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-[#A6B0BF] border-t border-white/5 pt-3">
                <div>
                  Claimed Type: <span className="text-[#F8F9FA]">{currentAudit.claimedType}</span>
                </div>
                <div>
                  Advertised Rate: <span className="text-[#F8F9FA]">{currentAudit.advertisedRate}</span>
                </div>
              </div>
            </div>

            {/* Risk Avoided Trust Stamp */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#10B981]/30 bg-[#10B981]/10 px-5 py-3.5">
              <div className="flex items-center gap-2.5 font-sans text-xs sm:text-sm font-semibold text-[#10B981]">
                <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                Client Financial Capital Protected: {currentAudit.financialRiskAvoided}
              </div>
              <span className="font-mono text-xs text-[#10B981]/80">Asset Properties Legal Shield</span>
            </div>
          </ArchitecturalDoorReveal>
        </div>

        {/* COMPREHENSIVE FORENSIC REJECTION REGISTRY & AUDIT LOG TABLE */}
        <div className="mt-28">
          <div className="text-center">
            <div className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              BHUBANESWAR FORENSIC REGISTRY • 114 DISQUALIFICATIONS
            </div>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-medium text-[#F8F9FA]">
              Forensic Rejection <span className="italic font-normal text-[#D4AF37]">Audit Ledger</span>.
            </h3>
            <p className="mt-2 font-sans text-xs sm:text-sm text-[#CBD5E1] max-w-xl mx-auto">
              Examine anonymized field telemetry reports across Bhubaneswar micro-markets. We reject unviable projects before they consume client capital.
            </p>
          </div>

          {/* Audit Registry Table */}
          <div className="mt-10 overflow-x-auto rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B]/90 shadow-2xl">
            <table className="w-full text-left text-xs font-sans">
              <thead className="border-b border-[#D4AF37]/20 bg-[#05070B] uppercase tracking-wider text-[#A6B0BF]">
                <tr>
                  <th className="py-4 px-5">Audit ID &amp; Corridor</th>
                  <th className="py-4 px-5">Claimed Typology</th>
                  <th className="py-4 px-5">Advertised Rate</th>
                  <th className="py-4 px-5">Forensic Ground Reality</th>
                  <th className="py-4 px-5">Capital Protected</th>
                  <th className="py-4 px-5 text-right">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {REJECTED_PROJECT_AUDITS.map((audit) => (
                  <tr key={audit.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-mono font-semibold text-[#F8F9FA]">{audit.anonymizedCode.split("•")[0]}</div>
                      <div className="text-[11px] text-[#D4AF37] mt-0.5">{audit.corridor}</div>
                    </td>
                    <td className="py-4 px-5 text-[#CBD5E1] font-medium">{audit.claimedType}</td>
                    <td className="py-4 px-5 font-mono text-[#F8F9FA]">{audit.advertisedRate}</td>
                    <td className="py-4 px-5 text-xs text-[#A6B0BF] max-w-xs leading-relaxed">
                      <span className="font-semibold text-red-400">{audit.rejectionHeadline.split("for ")[1] || audit.rejectionHeadline}: </span>
                      {audit.forensicFinding.slice(0, 110)}...
                    </td>
                    <td className="py-4 px-5 font-mono font-semibold text-[#10B981]">
                      {audit.financialRiskAvoided}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <span className="inline-flex items-center rounded-full border border-red-500/40 bg-red-500/10 px-2.5 py-1 font-mono text-[10px] font-bold text-red-400">
                        DISQUALIFIED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* THE 7 NON-NEGOTIABLE FORENSIC RULES OF BHUBANESWAR REAL ESTATE */}
        <div className="mt-28">
          <div className="text-center">
            <div className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              INSTITUTIONAL UNDERWRITING PROTOCOL
            </div>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-medium text-[#F8F9FA]">
              The 7 Non-Negotiable <span className="italic font-normal text-[#D4AF37]">Forensic Rules</span>.
            </h3>
            <p className="mt-2 font-sans text-xs sm:text-sm text-[#CBD5E1] max-w-xl mx-auto">
              Odisha real estate laws differ significantly from national markets. Here is what every HNI family must verify before handing over an advance cheque.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                rule: "Rule 01",
                title: "Sabik vs. Hal Khata Mutation",
                desc: "Ensure the land has been mutated to Hal Gharabari status in the Tahasil records with an unbroken chain of title exceeding 30 years.",
              },
              {
                rule: "Rule 02",
                title: "Leica True Carpet Laser Audit",
                desc: "Never contract on Super Built-Up Area without a digital Leica Disto laser audit. Bhubaneswar average loading is 34-39%; our standard is under 24%.",
              },
              {
                rule: "Rule 03",
                title: "ORERA Ring-Fenced Escrow Only",
                desc: "Under Section 4(2)(l)(D) of RERA, 70% of buyer funds must be deposited into a dedicated bank escrow account used exclusively for project construction.",
              },
              {
                rule: "Rule 04",
                title: "+4.0m Above 2019 Cyclone Fani Baseline",
                desc: "Basements and ground podiums must sit at least 4 meters above the 2019 Fani storm-surge line to eliminate basement flooding and Gangua backflow risk.",
              },
              {
                rule: "Rule 05",
                title: "Undivided Land Share (UDS) > 35%",
                desc: "High-density projects dilute UDS below 18%, leaving buyers with paper equity. We mandate a minimum 35% UDS share of carpet area.",
              },
              {
                rule: "Rule 06",
                title: "6m BDA Fire Tender Setback Clearance",
                desc: "High-rise structures must have an unobstructed 6-meter peripheral setback on all four boundaries to receive the final Occupancy Certificate (OC).",
              },
              {
                rule: "Rule 07",
                title: "Registered JDA with Power of Alienation",
                desc: "In joint developments, confirm the builder possesses a registered General Power of Attorney granting explicit rights to alienate specific allocated units.",
              },
            ].map((item, idx) => (
              <div
                key={item.rule}
                className={`rounded-2xl border border-[#D4AF37]/20 bg-[#0B101B]/80 p-6 flex flex-col justify-between ${
                  idx === 6 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    {item.rule}
                  </div>
                  <h4 className="mt-2 font-serif text-lg font-semibold text-[#F8F9FA]">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs text-[#CBD5E1] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-[#10B981]">
                  <span>✓</span> Mandated by Asset Properties
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
