"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Heavy Inertia Configuration per frontend_design_motion_spec.md:
    // lerp: 0.07, duration: 1.35
    const lenis = new Lenis({
      lerp: 0.07,
      duration: 1.35,
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
