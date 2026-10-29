"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const springConfig = { damping: 28, stiffness: 360, mass: 0.4 };
  const x = useSpring(-100, springConfig);
  const y = useSpring(-100, springConfig);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    ) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest("[data-cursor]") as HTMLElement | null;
      if (interactiveEl) {
        setCursorLabel(interactiveEl.getAttribute("data-cursor"));
      } else {
        setCursorLabel(null);
      }
    };

    const handleClearLabel = () => setCursorLabel(null);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleClearLabel, { passive: true });
    window.addEventListener("click", handleClearLabel, { capture: true, passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleClearLabel);
      window.removeEventListener("click", handleClearLabel, { capture: true });
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, x, y]);

  if (isTouchDevice) return null;

  const isExpanded = Boolean(cursorLabel);

  return (
    <motion.div
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden lg:block -translate-x-1/2 -translate-y-1/2"
      animate={{
        opacity: isVisible ? 1 : 0,
        width: isExpanded ? 72 : 18,
        height: isExpanded ? 72 : 18,
      }}
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
    >
      <div
        className={`flex h-full w-full items-center justify-center rounded-full border transition-colors duration-300 ${
          isExpanded
            ? "border-[#D4AF37]/80 bg-[#05070B]/70 shadow-[0_0_20px_rgba(212,175,55,0.25)] backdrop-blur-sm"
            : "border-[#D4AF37]/45 bg-[#D4AF37]/10"
        }`}
      >
        {isExpanded ? (
          <span className="px-1 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37] leading-tight">
            {cursorLabel}
          </span>
        ) : (
          <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
        )}
      </div>
    </motion.div>
  );
}
