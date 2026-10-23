"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CuratedProperty, LightingMode } from "@/types/property";
import NavigationHeader from "@/components/NavigationHeader";
import WhatsAppDossierModal from "@/components/WhatsAppDossierModal";
import AdvisoryFooter from "@/components/AdvisoryFooter";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import MagneticCursor from "@/components/MagneticCursor";
import SanctuaryDoorPortal from "@/components/SanctuaryDoorPortal";

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

  useEffect(() => {
    if (pathname === "/") {
      const unlocked = sessionStorage.getItem("ap_portal_unlocked");
      if (unlocked === "true") {
        setPortalDoorsOpen(true);
      }
    } else {
      setPortalDoorsOpen(true);
    }
  }, [pathname]);

  const handlePortalChange = (open: boolean) => {
    setPortalDoorsOpen(open);
    if (open) {
      sessionStorage.setItem("ap_portal_unlocked", "true");
    } else {
      sessionStorage.removeItem("ap_portal_unlocked");
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

      {/* Full-Screen 3D Architectural Double-Door Entry Portal — Opens ONLY when user clicks "AP" */}
      <SanctuaryDoorPortal
        isOpen={portalDoorsOpen}
        onOpenChange={handlePortalChange}
      />

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

        <WhatsAppDossierModal
          isOpen={dossierModalOpen}
          onClose={() => setDossierModalOpen(false)}
          property={selectedProperty}
          allProperties={properties}
        />
      </div>
    </SmoothScrollProvider>
  );
}
