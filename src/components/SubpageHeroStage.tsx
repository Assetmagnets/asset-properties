"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { LightingMode } from "@/types/property";

export interface MetricItem {
  value: string;
  label: string;
  color?: string;
}

interface SubpageHeroStageProps {
  badge: string;
  badgeDotColor?: string;
  titlePrefix?: string;
  titleAccent: string;
  titleSuffix?: string;
  description: string;
  metrics: MetricItem[];
  scrollPrompt?: string;
  lightingMode?: LightingMode;
}

export default function SubpageHeroStage({
  badge,
  badgeDotColor = "bg-[#10B981]",
  titlePrefix = "",
  titleAccent,
  titleSuffix = "",
  description,
  metrics,
  scrollPrompt = "Scroll Down to Inspect Mandates",
  lightingMode = "NOCTURNAL_DUSK",
}: SubpageHeroStageProps) {
  const isDay = lightingMode === "SOLAR_DAYLIGHT";

  return (
    <div className="relative z-10 flex min-h-[72vh] sm:min-h-[78vh] w-full flex-col items-center justify-center px-4 sm:px-8 pt-28 sm:pt-32 pb-16 text-center">
      {/* Subtle Ambient Aura matching Home Hero */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        animate={{
          background: isDay
            ? "radial-gradient(circle at 50% 38%, rgba(245, 204, 102, 0.12) 0%, rgba(10, 14, 22, 0) 68%)"
            : "radial-gradient(circle at 50% 38%, rgba(212, 175, 55, 0.08) 0%, rgba(5, 7, 11, 0) 68%)",
        }}
        transition={{ duration: 1.2 }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Authoritative Advisory Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#0B101B]/80 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.12)]"
        >
          <span className={`h-2 w-2 rounded-full ${badgeDotColor} animate-pulse`} />
          <span>{badge}</span>
        </motion.div>

        {/* Grand Cormorant Garamond Serif Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-8 font-serif text-5xl font-medium leading-[1.08] tracking-tight text-[#F8F9FA] sm:text-7xl lg:text-[88px]"
        >
          {titlePrefix}
          <span className="italic font-normal text-[#D4AF37]">{titleAccent}</span>
          {titleSuffix}
        </motion.h1>

        {/* Subtitle / Advisory Explanatory Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mx-auto mt-6 max-w-2xl font-sans text-base sm:text-lg leading-relaxed text-[#CBD5E1]"
        >
          {description}
        </motion.p>

        {/* Institutional 3-Metric Pill Bar matching Home Hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 rounded-2xl border border-[#D4AF37]/30 bg-[#0B101B]/90 px-6 py-3 font-sans backdrop-blur-md shadow-lg"
        >
          {metrics.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span className="hidden sm:inline-block h-4 w-[1px] bg-[#D4AF37]/30" />
              )}
              <div className="flex items-center gap-2">
                <span
                  className={`font-serif text-2xl font-semibold ${
                    item.color || "text-[#F8F9FA]"
                  }`}
                >
                  {item.value}
                </span>
                <span className="text-xs uppercase tracking-wider text-[#A6B0BF]">
                  {item.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>

        {/* Scroll Prompt with Bouncing Indicator */}
        <div className="mt-10 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] font-medium text-[#D4AF37]">
          <span>{scrollPrompt}</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
