"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SanctuaryDoorPortalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SanctuaryDoorPortal({
  isOpen,
  onOpenChange,
}: SanctuaryDoorPortalProps) {
  const [unlatching, setUnlatching] = useState(false);

  // Reset unlatching state whenever doors are closed again
  useEffect(() => {
    if (!isOpen) {
      setUnlatching(false);
    }
  }, [isOpen]);

  const handleClickAP = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (unlatching) return;
    setUnlatching(true);
    setTimeout(() => {
      onOpenChange(true);
    }, 950);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="sanctuary-door-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.65, delay: 0.55, ease: "easeInOut" },
          }}
          style={{ perspective: "2000px" }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-transparent select-none"
        >
          {/* Golden Center Light Spill Behind Doors when AP is clicked */}
          <motion.div
            initial={{ opacity: 0.15, scaleX: 0.01 }}
            animate={{
              opacity: unlatching ? 1 : 0.2,
              scaleX: unlatching ? 1.6 : 0.015,
            }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.38),transparent_65%)]"
          />

          {/* LEFT ARCHITECTURAL DOOR PANEL */}
          <motion.div
            initial={{ x: "0%", rotateY: 0 }}
            animate={
              unlatching
                ? { x: "-104%", rotateY: 34 }
                : { x: "0%", rotateY: 0 }
            }
            exit={{ x: "-106%", rotateY: 38 }}
            transition={{
              duration: 1.35,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ transformOrigin: "left center" }}
            className="relative z-20 flex h-full w-1/2 flex-col justify-between border-r border-[#D4AF37]/40 bg-[#05070B] p-10 sm:p-16 shadow-[30px_0_80px_rgba(0,0,0,0.95)]"
          >
            {/* Subtle Inner Brass Frame Line */}
            <div className="pointer-events-none absolute inset-6 sm:inset-12 border border-[#D4AF37]/15" />

            <div className="font-mono text-[10px] tracking-[0.35em] text-[#949BA6]/60 uppercase">
              20.2961° N
            </div>

            <div className="my-auto pr-12 sm:pr-20 text-right">
              <span className="font-serif text-3xl sm:text-5xl font-light tracking-[0.25em] text-[#F4F1EA]">
                ASSET
              </span>
            </div>

            <div className="font-mono text-[10px] tracking-[0.35em] text-[#D4AF37]/60 uppercase">
              PRIVATE SANCTUARY
            </div>
          </motion.div>

          {/* RIGHT ARCHITECTURAL DOOR PANEL */}
          <motion.div
            initial={{ x: "0%", rotateY: 0 }}
            animate={
              unlatching
                ? { x: "104%", rotateY: -34 }
                : { x: "0%", rotateY: 0 }
            }
            exit={{ x: "106%", rotateY: -38 }}
            transition={{
              duration: 1.35,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ transformOrigin: "right center" }}
            className="relative z-20 flex h-full w-1/2 flex-col justify-between border-l border-[#D4AF37]/40 bg-[#05070B] p-10 sm:p-16 text-right shadow-[-30px_0_80px_rgba(0,0,0,0.95)]"
          >
            {/* Subtle Inner Brass Frame Line */}
            <div className="pointer-events-none absolute inset-6 sm:inset-12 border border-[#D4AF37]/15" />

            <div className="font-mono text-[10px] tracking-[0.35em] text-[#949BA6]/60 uppercase">
              85.8245° E
            </div>

            <div className="my-auto pl-12 sm:pl-20 text-left">
              <span className="font-serif text-3xl sm:text-5xl font-light tracking-[0.25em] text-[#D4AF37]">
                PROPERTIES
              </span>
            </div>

            <div className="font-mono text-[10px] tracking-[0.35em] text-[#949BA6]/60 uppercase">
              BHUBANESWAR
            </div>
          </motion.div>

          {/* CENTER BRONZE-GOLD INTERACTIVE "AP" LOCK SEAL — OPENS ONLY WHEN USER CLICKS "AP" */}
          <motion.button
            type="button"
            aria-label="Click AP to Open Sanctuary Doors"
            onClick={handleClickAP}
            data-cursor="CLICK AP"
            initial={{ scale: 1, rotate: 0, opacity: 1 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            animate={
              unlatching
                ? { scale: 0.78, rotate: 90, opacity: 0 }
                : { scale: 1, rotate: 0, opacity: 1 }
            }
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="group absolute z-30 flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-full border border-[#D4AF37] bg-[#05070B] shadow-[0_0_70px_rgba(212,175,55,0.5)] focus:outline-none"
          >
            {/* Pulsing Outer Halo Ring */}
            <span className="pointer-events-none absolute -inset-2 rounded-full border border-[#D4AF37]/30 animate-ping opacity-30" />
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border border-[#D4AF37]/45 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition">
              <span className="font-serif text-3xl tracking-[0.2em] text-[#D4AF37]">
                AP
              </span>
              <span className="mt-1 font-mono text-[8px] tracking-[0.26em] text-[#F4F1EA]">
                CLICK TO OPEN
              </span>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Reusable Scroll-Triggered or Click-Triggered Double-Door Section / Card Reveal
 */
export function ArchitecturalDoorReveal({
  children,
  doorLabelLeft = "SANCTUARY",
  doorLabelRight = "MANDATE",
  className = "",
  autoOpenOnView = true,
}: {
  children: React.ReactNode;
  doorLabelLeft?: string;
  doorLabelRight?: string;
  className?: string;
  autoOpenOnView?: boolean;
}) {
  const [doorsOpen, setDoorsOpen] = useState(false);

  return (
    <motion.div
      onViewportEnter={() => {
        if (autoOpenOnView) setDoorsOpen(true);
      }}
      viewport={{ once: true, amount: 0.25 }}
      style={{ perspective: "1800px" }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Revealed Content Inside */}
      <motion.div
        initial={{ scale: 1.06, opacity: 0.35 }}
        animate={{
          scale: doorsOpen ? 1 : 1.06,
          opacity: doorsOpen ? 1 : 0.35,
        }}
        transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>

      {/* Left Architectural Door Leaf */}
      <motion.div
        initial={{ x: "0%", rotateY: 0, opacity: 1 }}
        animate={
          doorsOpen
            ? { x: "-105%", rotateY: 25, opacity: 0 }
            : { x: "0%", rotateY: 0, opacity: 1 }
        }
        transition={{ duration: 1.35, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "left center" }}
        onClick={() => setDoorsOpen(true)}
        className={`absolute inset-y-0 left-0 z-20 flex w-1/2 cursor-pointer items-center justify-end border-r border-[#D4AF37]/35 bg-[#05070B] pr-6 shadow-[15px_0_40px_rgba(0,0,0,0.9)] ${
          doorsOpen ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        <div className="pointer-events-none absolute inset-4 border border-[#D4AF37]/10" />
        <span className="font-mono text-[10px] tracking-[0.35em] text-[#949BA6] uppercase">
          {doorLabelLeft}
        </span>
        <div className="ml-4 h-16 w-[2px] bg-[#D4AF37]/70" />
      </motion.div>

      {/* Right Architectural Door Leaf */}
      <motion.div
        initial={{ x: "0%", rotateY: 0, opacity: 1 }}
        animate={
          doorsOpen
            ? { x: "105%", rotateY: -25, opacity: 0 }
            : { x: "0%", rotateY: 0, opacity: 1 }
        }
        transition={{ duration: 1.35, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "right center" }}
        onClick={() => setDoorsOpen(true)}
        className={`absolute inset-y-0 right-0 z-20 flex w-1/2 cursor-pointer items-center justify-start border-l border-[#D4AF37]/35 bg-[#05070B] pl-6 shadow-[-15px_0_40px_rgba(0,0,0,0.9)] ${
          doorsOpen ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        <div className="pointer-events-none absolute inset-4 border border-[#D4AF37]/10" />
        <div className="mr-4 h-16 w-[2px] bg-[#D4AF37]/70" />
        <span className="font-mono text-[10px] tracking-[0.35em] text-[#D4AF37] uppercase">
          {doorLabelRight}
        </span>
      </motion.div>
    </motion.div>
  );
}
