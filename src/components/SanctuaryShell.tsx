"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { CuratedProperty, LightingMode } from "@/types/property";
import NavigationHeader from "@/components/NavigationHeader";
import AdvisoryFooter from "@/components/AdvisoryFooter";
import { Phone, MessageCircle } from "lucide-react";

// Lazy-load heavy components to reduce initial JS bundle
// SmoothScrollProvider: Lenis smooth-scroll with native requestAnimationFrame loop
const SmoothScrollProvider = dynamic(
  () => import("@/components/SmoothScrollProvider"),
  { ssr: false }
);

// MagneticCursor: only used on desktop, returns null on touch devices
const MagneticCursor = dynamic(
  () => import("@/components/MagneticCursor"),
  { ssr: false }
);

// WhatsAppDossierModal: only opened on user action, no need to load upfront
const WhatsAppDossierModal = dynamic(
  () => import("@/components/WhatsAppDossierModal"),
  { ssr: false }
);

// SanctuaryDoorPortal: full-screen overlay, can load after initial paint
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
    onRequestDossier: (prop?: CuratedProperty) => void;
  }) => React.ReactNode;
}

export default function SanctuaryShell({
  properties,
  children,
}: SanctuaryShellProps) {
  const pathname = usePathname();
  const [lightingMode, setLightingMode] =
    useState<LightingMode>("NOCTURNAL_DUSK");
  const [selectedProperty, setSelectedProperty] = useState<CuratedProperty>(
    properties[0]
  );
  const [dossierModalOpen, setDossierModalOpen] = useState(false);

  // Main Portal Door stays CLOSED on the Home Page ("/") until the user clicks "AP".
  // On subpages (/refusal, /realms, /xray, /calculus, /vault), it starts open unless the user clicks "Doors" in the navbar.
  const [portalDoorsOpen, setPortalDoorsOpen] = useState<boolean>(
    pathname !== "/"
  );
  const [showPortal, setShowPortal] = useState<boolean>(pathname === "/");

  useEffect(() => {
    if (pathname === "/") {
      const unlocked = sessionStorage.getItem("ap_portal_unlocked");
      if (unlocked === "true") {
        setPortalDoorsOpen(true);
        setShowPortal(false);
      } else {
        setShowPortal(true);
      }
    } else {
      setPortalDoorsOpen(true);
      setShowPortal(false);
    }
  }, [pathname]);

  const handlePortalChange = (open: boolean) => {
    setPortalDoorsOpen(open);
    if (open) {
      sessionStorage.setItem("ap_portal_unlocked", "true");
      setTimeout(() => setShowPortal(false), 1400);
    } else {
      sessionStorage.removeItem("ap_portal_unlocked");
      setShowPortal(true);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-lighting", lightingMode);
  }, [lightingMode]);

  const handleToggleLighting = () => {
    setLightingMode((prev) =>
      prev === "NOCTURNAL_DUSK" ? "SOLAR_DAYLIGHT" : "NOCTURNAL_DUSK"
    );
  };

  const handleRequestDossier = (prop?: CuratedProperty) => {
    if (prop) setSelectedProperty(prop);
    setDossierModalOpen(true);
  };

  return (
    <SmoothScrollProvider>
      <MagneticCursor />

      {/* Full-Screen 3D Architectural Double-Door Entry Portal — Loaded on-demand */}
      {showPortal && (
        <SanctuaryDoorPortal
          isOpen={portalDoorsOpen}
          onOpenChange={handlePortalChange}
        />
      )}

      <div className="min-h-screen bg-obsidian text-alabaster relative">
        <NavigationHeader
          lightingMode={lightingMode}
          onToggleLighting={handleToggleLighting}
          onOpenDossierModal={() => setDossierModalOpen(true)}
          onReplayDoors={() => handlePortalChange(false)}
        />

        <main>
          {children({
            lightingMode,
            onToggleLighting: handleToggleLighting,
            selectedProperty,
            setSelectedProperty,
            onRequestDossier: handleRequestDossier,
          })}
        </main>

        <AdvisoryFooter />

        {/* Floating Quick Advisory Concierge Pill */}
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
          <a
            href="tel:+919777295707"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#0B101B]/95 text-[#D4AF37] shadow-[0_4px_20px_rgba(0,0,0,0.8)] hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#05070B] transition-all hover:scale-105"
            title="Call Senior Advisory Desk: +91 9777295707"
            aria-label="Call +91 9777295707"
          >
            <Phone className="h-4 w-4" />
          </a>

          <a
            href="https://wa.me/919777295707?text=Hello%20Asset%20Magnets,%20I%20would%20like%20to%20consult%20regarding%20curated%20properties."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full border border-[#10B981]/50 bg-[#0B101B]/95 pl-3.5 pr-4 py-2.5 shadow-[0_4px_25px_rgba(16,185,129,0.2)] hover:border-[#10B981] hover:bg-[#10B981]/15 transition-all hover:scale-105"
            title="WhatsApp Advisory Concierge: +91 9777295707"
            aria-label="WhatsApp +91 9777295707"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
            </span>
            <MessageCircle className="h-4 w-4 text-[#10B981]" />
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#F8F9FA] group-hover:text-white">
              Concierge
            </span>
          </a>
        </div>

        {dossierModalOpen && (
          <WhatsAppDossierModal
            isOpen={dossierModalOpen}
            onClose={() => setDossierModalOpen(false)}
            property={selectedProperty}
            allProperties={properties}
          />
        )}
      </div>
    </SmoothScrollProvider>
  );
}
