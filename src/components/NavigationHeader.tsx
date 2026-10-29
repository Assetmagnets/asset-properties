"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LightingMode } from "@/types/property";
import {
  Sun,
  Moon,
  Lock,
  DoorOpen,
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
} from "lucide-react";

interface NavigationHeaderProps {
  lightingMode: LightingMode;
  onToggleLighting: () => void;
  onOpenDossierModal: () => void;
  onReplayDoors?: () => void;
}

const NAV_LINKS = [
  {
    href: "/",
    label: "Sanctuary",
    num: "01",
    desc: "The Threshold & Chambers of Underwriting",
  },
  {
    href: "/refusal",
    label: "Refusal",
    num: "02",
    desc: "Forensic Audit & 80.2% Disqualification Rate",
  },
  {
    href: "/realms",
    label: "Realms",
    num: "03",
    desc: "Curated Portfolio & Verified Sanctuaries",
  },
  {
    href: "/xray",
    label: "X-Ray",
    num: "04",
    desc: "100-Point Asset Score™ Due Diligence",
  },
  {
    href: "/calculus",
    label: "Calculus",
    num: "05",
    desc: "Statutory Math & Odisha Stamp Duty Lab",
  },
  {
    href: "/vault",
    label: "Vault",
    num: "06",
    desc: "Off-Market Mandates & Golden-Hour Access",
  },
];

export default function NavigationHeader({
  lightingMode,
  onToggleLighting,
  onOpenDossierModal,
  onReplayDoors,
}: NavigationHeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDay = lightingMode === "SOLAR_DAYLIGHT";

  // Auto-close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#D4AF37]/15 bg-[#05070B]/92 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Authoritative Advisory Monogram & Brand Lockup */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0"
          data-cursor="SANCTUARY"
        >
          {/* Architectural Gold 'AP' Seal Emblem */}
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-gradient-to-br from-[#0B101B] to-[#05070B] shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:border-[#D4AF37] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all">
            <span className="font-serif text-xs sm:text-sm font-semibold tracking-wider text-[#D4AF37]">
              AP
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-base sm:text-lg xl:text-xl font-medium tracking-[0.14em] text-[#F8F9FA] group-hover:text-white transition-colors">
              ASSET PROPERTIES
            </span>
            <span className="font-sans text-[8.5px] sm:text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Private Advisory • Bhubaneswar
            </span>
          </div>
        </Link>

        {/* Center Navigation Links — Compactable & Responsive across lg/xl/2xl */}
        <nav className="hidden lg:flex items-center justify-center gap-3.5 xl:gap-6 2xl:gap-8 whitespace-nowrap font-sans text-[11px] xl:text-xs uppercase tracking-[0.14em] xl:tracking-[0.16em] font-medium shrink-0 px-4">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-cursor={link.label.toUpperCase()}
                className={`relative py-2 transition-colors duration-200 ${
                  isActive
                    ? "text-[#D4AF37] font-semibold"
                    : "text-[#A6B0BF] hover:text-[#F8F9FA]"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Executive Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 whitespace-nowrap shrink-0">
          {/* Lighting Mode Ambient Toggle (Desktop lg+ only; on small screens, cleanly placed inside the menubar) */}
          <button
            type="button"
            onClick={onToggleLighting}
            data-cursor={isDay ? "DUSK" : "SOLAR"}
            className="hidden lg:flex items-center gap-1.5 rounded-full border border-[#D4AF37]/35 bg-[#0B101B]/80 px-2.5 sm:px-3 py-1.5 font-sans text-xs font-medium uppercase tracking-wider text-[#F8F9FA] hover:border-[#D4AF37] hover:bg-[#0B101B] transition shadow-sm shrink-0"
            title="Toggle Solar Daylight vs. Nocturnal Dusk"
            aria-label="Toggle Solar Daylight vs. Nocturnal Dusk"
          >
            {isDay ? (
              <>
                <Sun className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline 2xl:hidden text-[#D4AF37] font-semibold">
                  Solar
                </span>
                <span className="hidden 2xl:inline text-[#D4AF37] font-semibold">
                  7:00 AM Solar
                </span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline 2xl:hidden text-stone-muted">
                  Dusk
                </span>
                <span className="hidden 2xl:inline text-stone-muted">
                  8:00 PM Dusk
                </span>
              </>
            )}
          </button>

          {/* Direct Concierge Phone Contact */}
          <a
            href="tel:+919777295707"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#0B101B]/80 px-3 py-1.5 font-mono text-xs text-[#CBD5E1] hover:border-[#D4AF37] hover:text-[#D4AF37] transition shadow-sm shrink-0"
            title="Direct Concierge: +91 9777295707"
          >
            <Phone className="h-3 w-3 text-[#D4AF37]" />
            <span className="hidden xl:inline">+91 9777295707</span>
            <span className="xl:hidden">Call</span>
          </a>

          {/* Primary CTA: Verified Dossier (Desktop lg+ only; on small screens, placed inside the menubar) */}
          <button
            type="button"
            onClick={onOpenDossierModal}
            data-cursor="DOSSIER"
            className="hidden lg:inline-flex items-center rounded-full bg-[#D4AF37] px-3.5 xl:px-5 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#05070B] shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:bg-[#e5c349] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition active:scale-95 shrink-0"
          >
            Verified Dossier
          </button>

          {/* Replay Sanctuary Doors (Compact icon on xl+ screens) */}
          {onReplayDoors && (
            <button
              type="button"
              onClick={onReplayDoors}
              data-cursor="DOORS"
              className="hidden xl:flex h-8.5 w-8.5 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#0B101B]/70 text-[#A6B0BF] hover:border-[#D4AF37] hover:text-[#D4AF37] transition shrink-0"
              title="Re-engage Architectural Sanctuary Doors"
            >
              <DoorOpen className="h-4 w-4" />
            </button>
          )}

          {/* Internal RBAC Vault (Discreet lock icon on xl+ screens) */}
          <Link
            href="/admin/vault"
            data-cursor="ADMIN"
            className="hidden xl:flex h-8.5 w-8.5 items-center justify-center rounded-full border border-[#D4AF37]/25 text-[#A6B0BF] hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#0B101B] transition shrink-0"
            title="Internal RBAC Governance Vault"
          >
            <Lock className="h-3.5 w-3.5" />
          </Link>

          {/* Menu Hamburger / Close Toggle — Prominent & highly visible on all small screens (< lg) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex lg:hidden items-center gap-2 rounded-full border border-[#D4AF37]/60 bg-[#0B101B]/95 px-3.5 py-1.5 text-[#F8F9FA] hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 transition shadow-[0_0_15px_rgba(212,175,55,0.2)] shrink-0"
          >
            <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#D4AF37]">
              {mobileMenuOpen ? "CLOSE" : "MENU"}
            </span>
            {mobileMenuOpen ? (
              <X className="h-4 w-4 text-[#D4AF37]" />
            ) : (
              <Menu className="h-4 w-4 text-[#D4AF37]" />
            )}
          </button>
        </div>
      </div>

      {/* Modern Responsive Navigation Drawer (Active on screens < lg) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-[#D4AF37]/20 bg-[#05070B]/98 backdrop-blur-3xl shadow-2xl"
          >
            <div className="px-5 sm:px-6 py-5 space-y-4 max-h-[85vh] overflow-y-auto">
              {/* Right Side Controls cleanly arranged inside the menubar for small screens */}
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#D4AF37]/15">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDossierModal();
                  }}
                  className="flex-1 rounded-xl bg-[#D4AF37] py-2.5 px-4 text-center font-sans text-xs font-semibold uppercase tracking-wider text-[#05070B] shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:bg-[#e5c349] transition active:scale-[0.99]"
                >
                  Request Verified Dossier
                </button>

                <button
                  type="button"
                  onClick={onToggleLighting}
                  className="flex items-center gap-1.5 rounded-xl border border-[#D4AF37]/35 bg-[#0B101B] px-3.5 py-2.5 font-sans text-xs font-medium uppercase tracking-wider text-[#F8F9FA] hover:border-[#D4AF37] transition shrink-0"
                  title="Toggle Solar Daylight vs. Nocturnal Dusk"
                >
                  {isDay ? (
                    <>
                      <Sun className="h-3.5 w-3.5 text-[#D4AF37]" />
                      <span className="text-[#D4AF37] font-semibold">Solar</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-3.5 w-3.5 text-[#D4AF37]" />
                      <span className="text-stone-muted">Dusk</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between pb-1">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                  Chambers of Advisory
                </span>
                <span className="font-mono text-[10px] text-stone-muted">
                  Bhubaneswar • Odisha
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-center justify-between rounded-xl border p-3.5 transition-all ${
                        isActive
                          ? "border-[#D4AF37] bg-[#D4AF37]/10"
                          : "border-[#D4AF37]/15 bg-[#0B101B]/60 hover:border-[#D4AF37]/40 hover:bg-[#0B101B]"
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-[#D4AF37]">
                            {link.num}
                          </span>
                          <span
                            className={`font-serif text-base font-medium tracking-wide ${
                              isActive ? "text-[#D4AF37]" : "text-[#F8F9FA]"
                            }`}
                          >
                            {link.label}
                          </span>
                        </div>
                        <span className="font-sans text-[11px] text-stone-muted mt-0.5 line-clamp-1">
                          {link.desc}
                        </span>
                      </div>
                      <ArrowUpRight
                        className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                          isActive ? "text-[#D4AF37]" : "text-stone-muted"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Drawer Bottom Actions */}
              <div className="pt-4 border-t border-[#D4AF37]/15 flex flex-col gap-3">
                {/* Mobile Ambient Lighting Switcher */}
                <div className="flex items-center justify-between rounded-xl border border-[#D4AF37]/20 bg-[#0B101B]/80 px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    {isDay ? (
                      <Sun className="h-4 w-4 text-[#D4AF37]" />
                    ) : (
                      <Moon className="h-4 w-4 text-[#D4AF37]" />
                    )}
                    <div className="flex flex-col">
                      <span className="font-sans text-xs font-medium text-[#F8F9FA]">
                        {isDay ? "Solar Daylight" : "Nocturnal Dusk"}
                      </span>
                      <span className="font-mono text-[10px] text-stone-muted">
                        {isDay ? "7:00 AM Architecture View" : "8:00 PM Ambient Lighting"}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onToggleLighting}
                    className="rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-3 py-1.5 font-mono text-[10px] font-semibold text-[#D4AF37] hover:bg-[#D4AF37]/20 transition uppercase tracking-wider"
                  >
                    Switch to {isDay ? "Dusk" : "Solar"}
                  </button>
                </div>

                {/* Mobile Direct Advisory Contact */}
                <div className="flex flex-col gap-2 rounded-xl border border-[#D4AF37]/25 bg-[#0B101B]/90 p-3 text-xs font-mono">
                  <div className="text-[10px] uppercase tracking-wider text-[#A6B0BF]">
                    Direct Advisory Desk &amp; Concierge
                  </div>
                  <div className="flex items-center justify-between">
                    <a
                      href="tel:+919777295707"
                      className="inline-flex items-center gap-1.5 text-[#F8F9FA] hover:text-[#D4AF37]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
                      <span>+91 9777295707</span>
                    </a>
                    <a
                      href="https://wa.me/919777295707?text=Hello%20Asset%20Magnets,%20I%20would%20like%20to%20consult%20regarding%20curated%20properties."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#10B981] font-sans font-semibold"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                  <a
                    href="mailto:info@assetmagnets.com"
                    className="inline-flex items-center gap-1.5 text-[#CBD5E1] hover:text-[#D4AF37] truncate"
                  >
                    <Mail className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span>info@assetmagnets.com</span>
                  </a>
                  <a
                    href="https://www.google.com/maps?cid=17158658638632800577&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#CBD5E1] hover:text-[#D4AF37] truncate"
                  >
                    <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span>Patia, Bhubaneswar (Google Maps ↗)</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDossierModal();
                  }}
                  className="w-full rounded-xl bg-[#D4AF37] py-3 text-center font-sans text-xs font-semibold uppercase tracking-wider text-[#05070B] shadow-lg hover:bg-[#e5c349] transition active:scale-[0.99]"
                >
                  Request Verified Dossier via WhatsApp
                </button>

                <div className="flex items-center justify-between pt-1 text-xs">
                  {onReplayDoors && (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onReplayDoors();
                      }}
                      className="inline-flex items-center gap-1.5 text-stone-muted hover:text-[#D4AF37] transition"
                    >
                      <DoorOpen className="h-3.5 w-3.5 text-[#D4AF37]" />
                      Re-engage Doors
                    </button>
                  )}

                  <Link
                    href="/admin/vault"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center gap-1.5 text-stone-muted hover:text-[#D4AF37] transition"
                  >
                    <Lock className="h-3.5 w-3.5 text-[#D4AF37]" />
                    Internal RBAC Vault
                  </Link>

                  <div className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    DPDP 2023 Verified
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
