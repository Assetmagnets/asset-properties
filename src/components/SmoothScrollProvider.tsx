"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Respect user's motion preferences
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // On touch devices / mobile, disable JS scroll interception
    // to allow native GPU-accelerated 120Hz momentum scrolling with zero overhead
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches);

    if (isTouch) {
      return;
    }

    // High-performance responsive desktop inertia: snappy response without sluggish lag
    const lenis = new Lenis({
      lerp: 0.12,
      duration: 0.8,
      smoothWheel: true,
      wheelMultiplier: 1.05,
      syncTouch: false,
    });

    let rafId: number | null = null;
    let isRunning = true;

    const raf = (time: number) => {
      if (!isRunning) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Pause animation frame loop when tab is backgrounded to eliminate CPU & battery drain
    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false;
        if (rafId) cancelAnimationFrame(rafId);
      } else {
        isRunning = true;
        rafId = requestAnimationFrame(raf);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
