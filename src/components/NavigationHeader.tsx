"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LightingMode } from "@/types/property";
import { Sun, Moon, Lock, DoorOpen } from "lucide-react";

interface NavigationHeaderProps {
  lightingMode: LightingMode;
  onToggleLighting: () => void;
  onOpenDossierModal: () => void;
  onReplayDoors?: () => void;
}

const NAV_LINKS = [
  { href: "/", label: "Sanctuary" },
  { href: "/refusal", label: "Refusal" },
  { href: "/realms", label: "Realms" },
  { href: "/xray", label: "X-Ray" },
  { href: "/calculus", label: "Calculus" },
  { href: "/vault", label: "Vault" },
];

export default function NavigationHeader({
  lightingMode,
  onToggleLighting,
  onOpenDossierModal,
  onReplayDoors,
}: NavigationHeaderProps) {
  const pathname = usePathname();
  const isDay = lightingMode === "SOLAR_DAYLIGHT";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#D4AF37]/10 bg-[#05070B]/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-10">
        {/* Minimal Monogram — Single Line */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3.5 whitespace-nowrap"
          data-cursor="SANCTUARY"
        >
          <span className="font-serif text-lg sm:text-xl tracking-[0.26em] text-[#F4F1EA]">
            ASSET PROPERTIES
          </span>
          <span className="hidden xl:inline-block h-3 w-[1px] bg-[#D4AF37]/30" />
          <span className="hidden xl:inline-block font-mono text-[9px] uppercase tracking-[0.24em] text-[#D4AF37]">
            BHUBANESWAR
          </span>
        </Link>

        {/* Multi-Page Navigation Without Numbering */}
        <nav className="hidden lg:flex items-center gap-9 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.24em]">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition ${
                  isActive
                    ? "text-[#D4AF37]"
                    : "text-[#949BA6] hover:text-[#F4F1EA]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-1 h-[1px] bg-[#D4AF37]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Minimal Actions */}
        <div className="flex shrink-0 items-center gap-2.5 whitespace-nowrap">
          {onReplayDoors && (
            <button
              type="button"
              onClick={onReplayDoors}
              data-cursor="DOORS"
              className="flex items-center gap-1.5 rounded-full border border-[#D4AF37]/25 px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#949BA6] hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
              title="Close Main Portal Doors"
            >
              <DoorOpen className="h-3 w-3 text-[#D4AF37]" />
              <span className="hidden sm:inline">Doors</span>
            </button>
          )}

          <button
            type="button"
            onClick={onToggleLighting}
            data-cursor={isDay ? "8PM" : "7AM"}
            className="flex items-center gap-1.5 rounded-full border border-[#D4AF37]/25 px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#F4F1EA] hover:border-[#D4AF37] transition"
          >
            {isDay ? (
              <>
                <Sun className="h-3 w-3 text-[#D4AF37]" />
                <span className="text-[#D4AF37]">7AM</span>
              </>
            ) : (
              <>
                <Moon className="h-3 w-3 text-[#D4AF37]" />
                <span>8PM</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenDossierModal}
            data-cursor="DOSSIER"
            className="rounded-full bg-[#D4AF37] px-4 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-[#05070B] hover:bg-[#e5c349] transition"
          >
            Dossier
          </button>

          <Link
            href="/admin/vault"
            className="rounded-full border border-[#D4AF37]/20 p-1.5 text-[#949BA6] hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
            title="Admin RBAC Vault"
          >
            <Lock className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Mobile / Tablet Multi-Page Strip */}
      <div className="flex lg:hidden items-center justify-center gap-5 overflow-x-auto border-t border-[#D4AF37]/10 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em]">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={isActive ? "text-[#D4AF37]" : "text-[#949BA6]"}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
