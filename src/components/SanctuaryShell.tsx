"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CuratedProperty, LightingMode } from "@/types/property";
import NavigationHeader from "@/components/NavigationHeader";
import AdvisoryFooter from "@/components/AdvisoryFooter";
import { MessageCircle, Sparkles } from "lucide-react";

// SmoothScrollProvider: Lenis smooth-scroll
const SmoothScrollProvider = dynamic(
  () => import("@/components/SmoothScrollProvider"),
  { ssr: false }
);

// MagneticCursor: desktop custom cursor
const MagneticCursor = dynamic(
  () => import("@/components/MagneticCursor"),
  { ssr: false }
);

// ConsultationModal
const ConsultationModal = dynamic(
  () => import("@/components/ConsultationModal"),
  { ssr: false }
);

// SanctuaryDoorPortal
const SanctuaryDoorPortal = dynamic(
  () => import("@/components/SanctuaryDoorPortal"),
  { ssr: false }
);

interface SanctuaryShellProps {
  properties: CuratedProperty[];
  children: (ctx: {
    lightingMode: LightingMode;
    onToggleLighting: () => void;
    selectedProperty: CuratedProperty;
    setSelectedProperty: (prop: CuratedProperty) => void;
    onRequestConsult: () => void;
  }) => React.ReactNode;
}

export default function SanctuaryShell({
  properties,
  children,
}: SanctuaryShellProps) {
  const [lightingMode, setLightingMode] = useState<LightingMode>("SOLAR_DAYLIGHT");
  const [selectedProperty, setSelectedProperty] = useState<CuratedProperty>(
    properties[0] || ({} as CuratedProperty)
  );
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [hasEnteredPortal, setHasEnteredPortal] = useState(true);

  // Synchronize initial property when properties array loads
  useEffect(() => {
    if (properties.length > 0 && !selectedProperty.id) {
      setSelectedProperty(properties[0]);
    }
  }, [properties, selectedProperty.id]);

  // Read stored entrance state
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("sanctuary_entered_portal");
      if (stored === "true") {
        setHasEnteredPortal(true);
      }
    } catch {
      setHasEnteredPortal(true);
    }
  }, []);

  const handleToggleLighting = () => {
    setLightingMode((prev) =>
      prev === "SOLAR_DAYLIGHT" ? "NOCTURNAL_DUSK" : "SOLAR_DAYLIGHT"
    );
  };

  const handlePortalChange = (entered: boolean) => {
    setHasEnteredPortal(entered);
    try {
      sessionStorage.setItem("sanctuary_entered_portal", entered ? "true" : "false");
    } catch {
      // ignore in incognito/strict mode
    }
  };

  return (
    <SmoothScrollProvider>
      <MagneticCursor />

      {/* Entrance Architectural Portal */}
      <SanctuaryDoorPortal
        isOpen={hasEnteredPortal}
        onOpenChange={handlePortalChange}
      />

      <div className="min-h-screen bg-obsidian text-alabaster relative">
        <NavigationHeader
          lightingMode={lightingMode}
          onToggleLighting={handleToggleLighting}
          onOpenConsultModal={() => setConsultModalOpen(true)}
          onReplayDoors={() => handlePortalChange(false)}
        />

        <main>
          {children({
            lightingMode,
            onToggleLighting: handleToggleLighting,
            selectedProperty,
            setSelectedProperty,
            onRequestConsult: () => setConsultModalOpen(true),
          })}
        </main>

        <AdvisoryFooter />

        {/* Floating Quick Advisory Concierge Actions */}
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setConsultModalOpen(true)}
            className="flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#0B101B]/95 px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#D4AF37] shadow-[0_4px_25px_rgba(0,0,0,0.85)] hover:bg-[#D4AF37] hover:text-[#05070B] transition-all hover:scale-105"
            title="Book Private Consultation"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Consult</span>
          </button>

          <a
            href="https://wa.me/919777295707?text=Hello%20Asset%20Magnets,%20I%20would%20like%20to%20consult%20regarding%20curated%20properties."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full border border-[#10B981]/50 bg-[#0B101B]/95 pl-2.5 sm:pl-3.5 pr-3 sm:pr-4 py-2 sm:py-2.5 shadow-[0_4px_25px_rgba(16,185,129,0.2)] hover:border-[#10B981] hover:bg-[#10B981]/15 transition-all hover:scale-105"
            title="WhatsApp Advisory Concierge: +91 9777295707"
            aria-label="WhatsApp +91 9777295707"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
            </span>
            <MessageCircle className="h-4 w-4 text-[#10B981]" />
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#F8F9FA] group-hover:text-white">
              WhatsApp
            </span>
          </a>
        </div>

        {/* Dynamic Consultation Modal */}
        {consultModalOpen && (
          <ConsultationModal
            isOpen={consultModalOpen}
            onClose={() => setConsultModalOpen(false)}
          />
        )}
      </div>
    </SmoothScrollProvider>
  );
}

