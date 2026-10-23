"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REJECTED_PROJECT_AUDITS } from "@/data/curatedProperties";
import { ArchitecturalDoorReveal } from "@/components/SanctuaryDoorPortal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Act2PhilosophyOfRefusal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [counters, setCounters] = useState({
    audited: 142,
    rejected: 114,
    approved: 28,
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obj = { audited: 0, rejected: 0, approved: 0 };
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            audited: 142,
            rejected: 114,
            approved: 28,
            duration: 1.8,
            ease: "power3.out",
            onUpdate: () => {
              setCounters({
                audited: Math.round(obj.audited),
                rejected: Math.round(obj.rejected),
                approved: Math.round(obj.approved),
              });
            },
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const currentAudit = REJECTED_PROJECT_AUDITS[activeIndex];

  return (
    <section
      id="act-refusal"
      ref={sectionRef}
      className="relative border-t border-[#D4AF37]/10 py-40 sm:py-52"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        {/* Minimal Eyebrow + Headline */}
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
            ACT II // THE PHILOSOPHY OF REFUSAL
          </div>
          <h2 className="mt-6 font-serif text-4xl font-light text-[#F4F1EA] sm:text-6xl">
            Curated by <span className="italic text-[#D4AF37]">elimination</span>.
          </h2>
        </div>

        {/* 3 Monumental Numbers with Vast Breathing Room */}
        <div className="mt-24 grid grid-cols-1 gap-16 text-center sm:grid-cols-3">
          <div>
            <div className="font-serif text-7xl font-light text-[#F4F1EA] sm:text-8xl">
              {counters.audited}
            </div>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.35em] text-[#949BA6]">
              Projects Audited
            </div>
          </div>

          <div>
            <div className="font-serif text-7xl font-light text-[#D4AF37] sm:text-8xl">
              {counters.rejected}
            </div>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.35em] text-[#D4AF37]">
              Disqualified
            </div>
          </div>

          <div>
            <div className="font-serif text-7xl font-light text-[#2E9B68] sm:text-8xl">
              {counters.approved}
            </div>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.35em] text-[#2E9B68]">
              Sanctuaries Admitted
            </div>
          </div>
        </div>

        {/* Minimal 4-Pillar Disqualification Vault Doorway */}
        <div className="mt-28">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { idx: 0, label: "01. Loading Inflation (>34%)" },
              { idx: 1, label: "02. Kissam Defect" },
              { idx: 2, label: "03. Flood Basin" },
              { idx: 3, label: "04. Escrow Lapse" },
            ].map((pill) => (
              <button
                key={pill.idx}
                type="button"
                onClick={() => setActiveIndex(pill.idx)}
                className={`rounded-full px-5 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition ${
                  activeIndex === pill.idx
                    ? "bg-[#D4AF37] text-[#05070B] font-semibold"
                    : "border border-[#D4AF37]/20 text-[#949BA6] hover:border-[#D4AF37]"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          <ArchitecturalDoorReveal
            doorLabelLeft="FORENSIC"
            doorLabelRight="REJECTION"
            className="mt-10 rounded-2xl border border-[#D4AF37]/20 bg-[#0B101B]/60 p-10 sm:p-16 text-center"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-red-400">
              {currentAudit.anonymizedCode} • DISQUALIFIED
            </div>
            <h3 className="mx-auto mt-5 max-w-2xl font-serif text-2xl font-light text-[#F4F1EA] sm:text-4xl">
              {currentAudit.rejectionHeadline}
            </h3>
            <div className="mt-8 inline-block rounded-full border border-[#2E9B68]/35 bg-[#2E9B68]/10 px-6 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#2E9B68]">
              Protected: {currentAudit.financialRiskAvoided}
            </div>
          </ArchitecturalDoorReveal>
        </div>
      </div>
    </section>
  );
}
