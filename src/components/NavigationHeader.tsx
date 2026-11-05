"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LightingMode } from "@/types/property";
import {
  Sun,
  Moon,
  MessageCircle,
  Menu,
  X,
  ArrowUpRight,
  Lock,
} from "lucide-react";

interface NavigationHeaderProps {
  lightingMode: LightingMode;
  onToggleLighting: () => void;
  onOpenConsultModal?: () => void;
  onReplayDoors?: () => void;
}

const NAV_LINKS = [
  {
    href: "/",
    label: "Home",
    num: "01",
    desc: "Luxury Real Estate Advisory • Bhubaneswar",
  },
  {
    href: "/properties",
    label: "Properties",
    num: "02",
    desc: "Curated Luxury Flats, Villas & Commercial Offices",
  },
  {
    href: "/why-us",
    label: "Why Us",
    num: "03",
    desc: "Our Strict Quality & Legal Vetting Standards",
  },
  {
    href: "/verification",
    label: "Verification",
    num: "04",
    desc: "100-Point Legal, Title & Carpet Area Inspection",
  },
  {
    href: "/calculator",
    label: "Calculator",
    num: "05",
    desc: "Odisha Stamp Duty & Investment Calculator",
  },
  {
    href: "/exclusive",
    label: "Exclusive",
    num: "06",
    desc: "Off-Market Luxury Plots & Pre-Launch Estates",
  },
  {
    href: "/articles",
    label: "Articles",
    num: "07",
    desc: "Bhubaneswar Market Insights & Buying Guides",
  },
];

export default function NavigationHeader({
  lightingMode,
  onToggleLighting,
  onOpenConsultModal,
  onReplayDoors,
}: NavigationHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const isDay = lightingMode === "SOLAR_DAYLIGHT";

  // Check if admin is currently authenticated in session
  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch("/api/v1/auth/me");
        const data = await res.json();
        setIsAdminLoggedIn(!!data.authenticated);
      } catch {
        setIsAdminLoggedIn(false);
      }
    }
    checkAdmin();
  }, [pathname]);

  // Auto-close mobile drawer on route change and lock body scroll while drawer is open
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileMenuOpen) {
      const prevBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevBodyOverflow;
      };
    }
  }, [mobileMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#D4AF37]/15 bg-[#05070B]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 sm:h-20 w-full max-w-[1600px] items-center justify-between px-3 sm:px-6 lg:px-8 xl:px-10 gap-2">
        {/* Brand Lockup */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0"
          data-cursor="HOME"
        >
          {/* Architectural Gold 'AP' Seal Emblem */}
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-gradient-to-br from-[#0B101B] to-[#05070B] shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:border-[#D4AF37] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all">
            <span className="font-serif text-xs sm:text-sm font-semibold tracking-wider text-[#D4AF37]">
              AP
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-sm sm:text-lg xl:text-xl font-medium tracking-[0.08em] sm:tracking-[0.14em] text-[#F8F9FA] group-hover:text-white transition-colors">
              ASSET PROPERTIES
            </span>
            <span className="font-sans text-[7.5px] sm:text-[9.5px] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#D4AF37]">
              Real Estate Advisory • Bhubaneswar
            </span>
          </div>
        </Link>

        {/* Center Simple Navigation Links */}
        <nav className="hidden lg:flex items-center justify-center gap-3 xl:gap-5 2xl:gap-7 whitespace-nowrap font-sans text-[11px] xl:text-xs uppercase tracking-[0.12em] xl:tracking-[0.15em] font-medium shrink-0 px-2 xl:px-4">
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
          {/* Lighting Mode Ambient Toggle */}
          <button
            type="button"
            onClick={onToggleLighting}
            data-cursor={isDay ? "DUSK" : "DAY"}
            className="hidden lg:flex items-center gap-1.5 rounded-full border border-[#D4AF37]/35 bg-[#0B101B]/80 px-2.5 sm:px-3 py-1.5 font-sans text-xs font-medium uppercase tracking-wider text-[#F8F9FA] hover:border-[#D4AF37] hover:bg-[#0B101B] transition shadow-sm shrink-0"
            title="Toggle Day View vs. Evening Dusk View"
          >
            {isDay ? (
              <>
                <Sun className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline text-[#D4AF37] font-semibold">Day</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline text-stone-muted">Dusk</span>
              </>
            )}
          </button>

          {/* Primary CTA: Consult */}
          {onOpenConsultModal && (
            <button
              type="button"
              onClick={onOpenConsultModal}
              data-cursor="CONSULT"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-3.5 sm:px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-wider text-[#05070B] shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:bg-[#e5c349] transition shrink-0"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Consult</span>
            </button>
          )}

          {/* Admin / Dashboard Button */}
          <Link
            href={isAdminLoggedIn ? "/admin/vault" : "/admin/login"}
            data-cursor={isAdminLoggedIn ? "DASHBOARD" : "ADMIN"}
            className={`hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider transition shadow-sm shrink-0 ${
              isAdminLoggedIn
                ? "border border-emerald-500/50 bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25"
                : "border border-[#D4AF37]/40 bg-[#0B101B] text-[#F4F1EA] hover:border-[#D4AF37] hover:text-[#D4AF37]"
            }`}
            title={isAdminLoggedIn ? "Open Admin Dashboard" : "Admin Login Portal"}
          >
            {isAdminLoggedIn ? (
              <>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Dashboard</span>
              </>
            ) : (
              <>
                <Lock className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Admin</span>
              </>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex lg:hidden items-center gap-1.5 rounded-full border border-[#D4AF37]/60 bg-[#0B101B]/95 px-3 py-1.5 text-[#F8F9FA] hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 transition shrink-0"
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

      {/* Responsive Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden w-full overflow-hidden border-t border-[#D4AF37]/20 bg-[#05070B]/98 backdrop-blur-3xl shadow-2xl"
          >
            <div className="px-5 sm:px-6 py-5 space-y-4 max-h-[calc(100vh-4.5rem)] overflow-y-auto overscroll-contain pb-12">
              {/* Quick Action Button */}
              {onOpenConsultModal && (
                <div className="pb-3 border-b border-[#D4AF37]/15">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenConsultModal();
                    }}
                    className="w-full rounded-xl bg-[#D4AF37] py-2.5 px-3 text-center font-sans text-xs font-bold uppercase tracking-wider text-[#05070B] shadow hover:bg-[#e5c349] transition"
                  >
                    💬 Book Private Consultation
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between pb-1">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (typeof document !== "undefined") {
                      document.body.style.overflow = "";
                    }
                    router.push(isAdminLoggedIn ? "/admin/vault" : "/admin/login");
                  }}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#D4AF37] hover:underline cursor-pointer py-1 px-2.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 transition"
                >
                  {isAdminLoggedIn ? (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="text-emerald-400">Admin Dashboard</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-3 w-3" />
                      <span>Admin Login</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
              <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs font-mono">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (typeof document !== "undefined") {
                      document.body.style.overflow = "";
                    }
                    router.push(isAdminLoggedIn ? "/admin/vault" : "/admin/login");
                  }}
                  className="inline-flex items-center gap-1.5 text-stone-muted hover:text-[#D4AF37] cursor-pointer"
                >
                  <Lock className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>{isAdminLoggedIn ? "Dashboard" : "Admin Portal"}</span>
                </button>

                <a href="tel:+919777295707" className="text-[#D4AF37]">
                  +91 9777295707
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

