"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
      {/* LAYER 1: STATELY ADVISORY HERO STAGE WITH TRUST-BUILDING ARCHITECTURAL BACKGROUND */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 sm:px-8 pt-28 pb-16 text-center overflow-hidden">
        {/* Full-Bleed Architectural Sanctuary Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            key={isDay ? "hero-day" : "hero-dusk"}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: isDay ? 0.42 : 0.48, scale: 1.0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            <Image
              src={
                isDay
                  ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=75"
                  : "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=75"
              }
              alt="Asset Properties Curated Luxury Sanctuary Architecture"
              fill
              sizes="100vw"
              priority
              quality={75}
              className="object-cover object-center filter contrast-[1.08] brightness-[0.92]"
            />
          </motion.div>

          {/* Precision Architectural Dark Scrim Overlay for Razor-Sharp Typography & Trust */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070B]/92 via-[#05070B]/78 to-[#05070B]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,7,11,0.5)_0%,rgba(5,7,11,0.95)_100%)]" />
        </div>

        {/* Subtle Ambient Golden Aura */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1]"
          animate={{
            background: isDay
              ? "radial-gradient(circle at 50% 42%, rgba(245, 204, 102, 0.16) 0%, rgba(10, 14, 22, 0) 68%)"
              : "radial-gradient(circle at 50% 42%, rgba(212, 175, 55, 0.12) 0%, rgba(5, 7, 11, 0) 68%)",
          }}
          transition={{ duration: 1.2 }}
        />

        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#0B101B]/80 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.12)]"
          >
            <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
            Private Advisory • Institutional Real Estate Underwriting • Bhubaneswar
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="mt-8 font-serif text-5xl font-medium leading-[1.08] tracking-tight text-[#F8F9FA] sm:text-7xl lg:text-[88px]"
          >
            We refuse <span className="italic font-normal text-[#D4AF37]">80%</span> of what
            is built.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.35 }}
            className="mx-auto mt-6 max-w-2xl font-sans text-base sm:text-lg leading-relaxed text-[#CBD5E1]"
          >
            Bhubaneswar&apos;s forensic real estate consulting practice. We rigorously audit and reject projects with unverified Kissam titles, inflated super built-up loading, or flood risk to safeguard high-net-worth acquisitions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.45 }}
            className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 rounded-2xl border border-[#D4AF37]/30 bg-[#0B101B]/90 px-6 py-3 font-sans backdrop-blur-md shadow-lg"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-semibold text-[#F8F9FA]">142</span>
              <span className="text-xs uppercase tracking-wider text-[#A6B0BF]">Projects Audited</span>
            </div>
            <span className="hidden sm:inline-block h-4 w-[1px] bg-[#D4AF37]/30" />
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-semibold text-[#D4AF37]">114</span>
              <span className="text-xs uppercase tracking-wider text-[#D4AF37]">Disqualified (80%)</span>
            </div>
            <span className="hidden sm:inline-block h-4 w-[1px] bg-[#D4AF37]/30" />
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-semibold text-[#10B981]">28</span>
              <span className="text-xs uppercase tracking-wider text-[#10B981]">Approved Sanctuaries</span>
            </div>
          </motion.div>

          <div className="mt-10 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] font-medium text-[#D4AF37]">
            <span>Scroll Down to Unveil Audit</span>
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </div>
        </div>
      </div>

      {/* LAYER 2: ARCHITECTURAL SANCTUARY THRESHOLD & HELIODON PATHWAY (Zero overlap, beautifully framed) */}
      <div
        style={{ perspective: "2200px" }}
        className="relative z-20 w-full overflow-hidden border-t border-b border-[#D4AF37]/15 bg-[#05070B] shadow-[0_-20px_60px_rgba(0,0,0,0.8)] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          {/* Chamber 01 Advisory Context Header */}
          <div className="mb-10 text-center">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
              CHAMBER 01 • ARCHITECTURAL SANCTUARY THRESHOLD
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-medium text-[#F8F9FA]">
              The <span className="italic font-normal text-[#D4AF37]">Orientation</span> of Light.
            </h2>
            <p className="mt-3 font-sans text-sm sm:text-base text-stone-muted max-w-xl mx-auto">
              Simulate heliodon sun trajectories, inspect Patia &amp; Saheed Nagar sanctuaries, and explore verified legal dossiers.
            </p>
          </div>

          {/* Interactive Architectural Portal Stage */}
          <div className="relative h-[65vh] sm:h-[75vh] w-full overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-[#05070B] shadow-2xl">
            {/* Edge-to-Edge Full Viewport Image */}
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: innerDoorsOpen ? 1.0 : 1.08,
                opacity: isDay ? 0.68 : 0.55,
              }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={
                  isDay
                    ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=75"
                    : "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=75"
                }
                alt="Bhubaneswar Sanctuary Full-Bleed Architecture"
                fill
                sizes="100vw"
                quality={75}
                loading="lazy"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-[#05070B]/45" />

            {/* Minimal Heliodon Sun Arc SVG */}
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
              className="flex items-center gap-2.5 rounded-full border border-[#D4AF37]/35 bg-[#05070B]/90 px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#F8F9FA] backdrop-blur-md hover:border-[#D4AF37] transition"
            >
              {isDay ? (
                <>
                  <Sun className="h-4 w-4 text-[#D4AF37]" />
                  <span>7:00 AM East Sunlight</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-[#D4AF37]" />
                  <span>8:00 PM Nocturnal Dusk</span>
                </>
              )}
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setInnerDoorsOpen(!innerDoorsOpen)}
                data-cursor={innerDoorsOpen ? "CLOSE" : "OPEN"}
                className="flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#05070B]/90 px-5 py-2.5 font-sans text-xs font-medium uppercase tracking-wider text-[#D4AF37] backdrop-blur-md hover:bg-[#D4AF37] hover:text-[#05070B] transition"
              >
                <DoorOpen className="h-4 w-4" />
                {innerDoorsOpen ? "Close Sanctuary Doors" : "Open Sanctuary Doors"}
              </button>

              <Link
                href="/realms"
                data-cursor="REALMS"
                className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#05070B]/90 px-5 py-2.5 font-sans text-xs font-medium uppercase tracking-wider text-[#F8F9FA] backdrop-blur-md hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
              >
                Explore 3 Realms
                <ArrowUpRight className="h-4 w-4 text-[#D4AF37]" />
              </Link>

              <button
                type="button"
                onClick={onOpenDossierModal}
                data-cursor="DOSSIER"
                className="rounded-full bg-[#D4AF37] px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#05070B] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:bg-[#e5c349] transition"
              >
                Verified Legal Dossier
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
    </div>
  </section>
);
}
