"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LightingMode } from "@/types/property";
import { ArrowDown, ArrowUpRight, DoorOpen, Sun, Moon } from "lucide-react";

interface Act1HeroThresholdProps {
  lightingMode: LightingMode;
  onToggleLighting: () => void;
  onOpenDossierModal: () => void;
}

export default function Act1HeroThreshold({
  lightingMode,
  onToggleLighting,
  onOpenDossierModal,
}: Act1HeroThresholdProps) {
  const isDay = lightingMode === "SOLAR_DAYLIGHT";
  const [innerDoorsOpen, setInnerDoorsOpen] = useState(true);

  return (
    <section id="act-threshold" className="relative w-full">
      {/* LAYER 1 (z-10): STICKY HERO TEXT STAGE — Stays centered while the full-width image scrolls over it */}
      <div className="sticky top-0 z-10 flex h-screen w-full flex-col items-center justify-center px-6 pb-24 pt-20 text-center overflow-hidden">
        {/* Subtle Ambient Aura */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          animate={{
            background: isDay
              ? "radial-gradient(circle at 50% 42%, rgba(245, 204, 102, 0.14) 0%, rgba(10, 14, 22, 0) 68%)"
              : "radial-gradient(circle at 50% 42%, rgba(212, 175, 55, 0.09) 0%, rgba(5, 7, 11, 0) 68%)",
          }}
          transition={{ duration: 1.2 }}
        />

        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-mono text-[10px] uppercase tracking-[0.42em] text-[#D4AF37]"
          >
            PRIVATE WEALTH SANCTUARY • BHUBANESWAR
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="mt-7 font-serif text-5xl font-light leading-[1.06] tracking-tight text-[#F4F1EA] sm:text-7xl lg:text-[86px]"
          >
            We refuse <span className="italic text-[#D4AF37]">80%</span> of what
            is built.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.35 }}
            className="mx-auto mt-6 max-w-md font-mono text-[10px] uppercase tracking-[0.32em] text-[#949BA6]"
          >
            142 Audited &nbsp;•&nbsp; 114 Rejected &nbsp;•&nbsp; 28 Approved
          </motion.p>

          <div className="mt-10 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.34em] text-[#D4AF37]/80">
            <span>Scroll to Unveil</span>
            <ArrowDown className="h-3 w-3 animate-bounce" />
          </div>
        </div>
      </div>

      {/* LAYER 2 (z-20): FULL-WIDTH LEFT-TO-RIGHT IMAGE THAT SCROLLS OVER THE STICKY TEXT ABOVE */}
      <div
        style={{ perspective: "2200px" }}
        className="relative z-20 -mt-[22vh] w-full overflow-hidden border-t border-b border-[#D4AF37]/30 bg-[#05070B] shadow-[0_-45px_120px_rgba(0,0,0,0.98)]"
      >
        <div className="relative h-screen w-full overflow-hidden bg-[#05070B]">
          {/* Edge-to-Edge Full Viewport Image (Covers Left-to-Right 100%) */}
          <motion.img
            src={
              isDay
                ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
                : "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85"
            }
            alt="Bhubaneswar Sanctuary Full-Bleed Architecture"
            className="absolute inset-0 h-full w-full object-cover"
            animate={{
              scale: innerDoorsOpen ? 1.0 : 1.08,
              opacity: isDay ? 0.68 : 0.55,
            }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-[#05070B]/45" />

          {/* Minimal Heliodon Sun Arc SVG Spanning Full Width */}
          <svg
            viewBox="0 0 1200 600"
            className="pointer-events-none relative z-10 h-full w-full"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 80 520 Q 600 60 1120 520"
              stroke="rgba(212,175,55,0.42)"
              strokeWidth="1.2"
              strokeDasharray="6 8"
            />
            <motion.circle
              cx={isDay ? 860 : 340}
              cy={220}
              r="14"
              fill="#D4AF37"
              animate={{ cx: isDay ? 860 : 340 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>

          {/* Bottom Controls Bar Spanning the Full-Width Image */}
          <div className="absolute bottom-10 left-6 right-6 sm:left-14 sm:right-14 z-10 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={onToggleLighting}
              data-cursor="LIGHTING"
              className="flex items-center gap-2.5 rounded-full border border-[#D4AF37]/35 bg-[#05070B]/85 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#F4F1EA] backdrop-blur-md hover:border-[#D4AF37] transition"
            >
              {isDay ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-[#D4AF37]" />
                  7:00 AM East Sun
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-[#D4AF37]" />
                  8:00 PM Nocturnal
                </>
              )}
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setInnerDoorsOpen(!innerDoorsOpen)}
                data-cursor={innerDoorsOpen ? "CLOSE" : "OPEN"}
                className="flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#05070B]/85 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] backdrop-blur-md hover:bg-[#D4AF37] hover:text-[#05070B] transition"
              >
                <DoorOpen className="h-3.5 w-3.5" />
                {innerDoorsOpen ? "Close Sanctuary Doors" : "Open Sanctuary Doors"}
              </button>

              <Link
                href="/realms"
                data-cursor="REALMS"
                className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#05070B]/85 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#F4F1EA] backdrop-blur-md hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
              >
                Explore Realms
                <ArrowUpRight className="h-3.5 w-3.5 text-[#D4AF37]" />
              </Link>

              <button
                type="button"
                onClick={onOpenDossierModal}
                data-cursor="DOSSIER"
                className="rounded-full bg-[#D4AF37] px-6 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#05070B] hover:bg-[#e5c349] transition"
              >
                Private Dossier
              </button>
            </div>
          </div>

          {/* 3D Left Full-Bleed Sanctuary Door Leaf */}
          <motion.div
            initial={false}
            animate={
              innerDoorsOpen
                ? { x: "-103%", rotateY: 36 }
                : { x: "0%", rotateY: 0 }
            }
            transition={{ duration: 1.35, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: "left center" }}
            onClick={() => setInnerDoorsOpen(!innerDoorsOpen)}
            className={`absolute inset-y-0 left-0 z-20 flex w-1/2 cursor-pointer items-center justify-end border-r border-[#D4AF37]/40 bg-[#070A10] pr-10 shadow-[20px_0_60px_rgba(0,0,0,0.95)] ${
              innerDoorsOpen ? "pointer-events-none" : ""
            }`}
          >
            <div className="pointer-events-none absolute inset-8 border border-[#D4AF37]/15" />
            <span className="font-mono text-xs uppercase tracking-[0.38em] text-[#949BA6]">
              PATIA • PAHALA
            </span>
            <div className="ml-6 h-24 w-[2px] bg-[#D4AF37]" />
          </motion.div>

          {/* 3D Right Full-Bleed Sanctuary Door Leaf */}
          <motion.div
            initial={false}
            animate={
              innerDoorsOpen
                ? { x: "103%", rotateY: -36 }
                : { x: "0%", rotateY: 0 }
            }
            transition={{ duration: 1.35, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: "right center" }}
            onClick={() => setInnerDoorsOpen(!innerDoorsOpen)}
            className={`absolute inset-y-0 right-0 z-20 flex w-1/2 cursor-pointer items-center justify-start border-l border-[#D4AF37]/40 bg-[#070A10] pl-10 shadow-[-20px_0_60px_rgba(0,0,0,0.95)] ${
              innerDoorsOpen ? "pointer-events-none" : ""
            }`}
          >
            <div className="pointer-events-none absolute inset-8 border border-[#D4AF37]/15" />
            <div className="mr-6 h-24 w-[2px] bg-[#D4AF37]" />
            <span className="font-mono text-xs uppercase tracking-[0.38em] text-[#D4AF37]">
              SAHEED NAGAR
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
