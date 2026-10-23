"use client";

import React from "react";
import Link from "next/link";
import { CuratedProperty } from "@/types/property";
import SanctuaryShell from "@/components/SanctuaryShell";
import Act1HeroThreshold from "@/components/Act1HeroThreshold";
import { ArchitecturalDoorReveal } from "@/components/SanctuaryDoorPortal";
import { ArrowUpRight } from "lucide-react";

interface SanctuaryOrchestratorProps {
  initialProperties: CuratedProperty[];
}

const SANCTUARY_PORTAL_PAGES = [
  {
    href: "/refusal",
    tag: "PHILOSOPHY OF REFUSAL",
    title: "114 Rejected Builders",
    metric: "80.2% Disqualified",
    doorLeft: "FORENSIC",
    doorRight: "REFUSAL",
  },
  {
    href: "/realms",
    tag: "THREE CURATED REALMS",
    title: "Sky, Land & Commerce",
    metric: "28 Approved Mandates",
    doorLeft: "CURATED",
    doorRight: "REALMS",
  },
  {
    href: "/xray",
    tag: "4-LAYER TELEMETRY",
    title: "The 100-Point X-Ray",
    metric: "Bhulekh & Leica Laser",
    doorLeft: "100-POINT",
    doorRight: "X-RAY",
  },
  {
    href: "/calculus",
    tag: "STATUTORY PRECISION",
    title: "Odisha Financial Lab",
    metric: "6% Female vs 7% Male Duty",
    doorLeft: "ODISHA",
    doorRight: "CALCULUS",
  },
  {
    href: "/vault",
    tag: "CONFIDENTIAL INVENTORY",
    title: "The Private Vault & 4:30 PM Tour",
    metric: "15-Min Signed Dossier",
    doorLeft: "PRIVATE",
    doorRight: "VAULT",
  },
];

export default function SanctuaryOrchestrator({
  initialProperties,
}: SanctuaryOrchestratorProps) {
  return (
    <SanctuaryShell properties={initialProperties}>
      {({ lightingMode, onToggleLighting, onRequestDossier }) => (
        <>
          {/* Hero with Sticky Text + Full-Width Left-to-Right Image Scroll-Over */}
          <Act1HeroThreshold
            lightingMode={lightingMode}
            onToggleLighting={onToggleLighting}
            onOpenDossierModal={() => onRequestDossier()}
          />

          {/* Spacious Multi-Page Sanctuary Chambers Index */}
          <section className="relative z-20 bg-[#05070B] py-40 sm:py-52">
            <div className="mx-auto max-w-6xl px-6 sm:px-12">
              <div className="text-center">
                <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-[#D4AF37]">
                  CHAMBERS OF UNDERWRITING
                </div>
                <h2 className="mt-6 font-serif text-4xl font-light text-[#F4F1EA] sm:text-6xl">
                  Enter a <span className="italic text-[#D4AF37]">chamber</span>.
                </h2>
              </div>

              <div className="mt-24 grid grid-cols-1 gap-12 md:grid-cols-2">
                {SANCTUARY_PORTAL_PAGES.map((chamber, idx) => (
                  <Link
                    key={chamber.href}
                    href={chamber.href}
                    data-cursor="ENTER"
                    className={`group block ${
                      idx === SANCTUARY_PORTAL_PAGES.length - 1
                        ? "md:col-span-2"
                        : ""
                    }`}
                  >
                    <ArchitecturalDoorReveal
                      doorLabelLeft={chamber.doorLeft}
                      doorLabelRight={chamber.doorRight}
                      className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B101B]/60 p-10 sm:p-14 transition-colors duration-500 group-hover:border-[#D4AF37]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#D4AF37]">
                          {chamber.tag}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-[#949BA6] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#D4AF37]" />
                      </div>

                      <h3 className="mt-6 font-serif text-3xl font-light text-[#F4F1EA] sm:text-5xl">
                        {chamber.title}
                      </h3>

                      <div className="mt-10 border-t border-[#D4AF37]/15 pt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#2E9B68]">
                        {chamber.metric}
                      </div>
                    </ArchitecturalDoorReveal>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </SanctuaryShell>
  );
}
