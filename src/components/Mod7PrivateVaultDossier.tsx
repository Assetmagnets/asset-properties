"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CuratedProperty } from "@/types/property";
import { DoorOpen, Lock, MessageCircle, ArrowUpRight } from "lucide-react";

interface Mod7PrivateVaultDossierProps {
  vaultProperties: CuratedProperty[];
  onRequestConsult?: () => void;
  hideHeader?: boolean;
}

export default function Mod7PrivateVaultDossier({
  vaultProperties,
  onRequestConsult,
  hideHeader = false,
}: Mod7PrivateVaultDossierProps) {
  const [openVaultIds, setOpenVaultIds] = useState<Record<string, boolean>>({});

  const toggleVaultDoor = (id: string) => {
    setOpenVaultIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="mod-private-vault"
      className={`relative ${hideHeader ? "py-12 sm:py-16" : "py-14 sm:py-24 lg:py-32"}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
        {!hideHeader && (
          <div className="text-center">
            <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              OFF-MARKET MANDATES • CONFIDENTIAL ALLOCATIONS
            </div>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#F8F9FA]">
              The Private <span className="italic font-normal text-[#D4AF37]">Vault</span>.
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg text-[#CBD5E1] max-w-2xl mx-auto">
              Discreet pre-launch developer quotas and institutional family office mandates in Patia and Trisulia. Click the vault doors to unseal legal details.
            </p>
          </div>
        )}

        {/* Interactive 3D Vault Double-Doors Grid */}
        <div className={`${hideHeader ? "mt-4" : "mt-20"} grid grid-cols-1 gap-14 lg:grid-cols-2`}>
          {vaultProperties.map((vaultProp) => {
            const isOpen = Boolean(openVaultIds[vaultProp.id]);

            return (
              <div
                key={vaultProp.id}
                style={{ perspective: "1800px" }}
                className="relative h-[360px] sm:h-[440px] w-full overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-[#05070B] shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
              >
                {/* Revealed Off-Market Interior Behind the Doors */}
                <Image
                  src={vaultProp.duskHeroImageUrl}
                  alt={vaultProp.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={75}
                  loading="lazy"
                  className="object-cover opacity-55"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/50 to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/40 bg-[#05070B]/80 px-3 py-1 rounded-full">
                      ORERA: {vaultProp.oreraNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleVaultDoor(vaultProp.id)}
                      className="rounded-full border border-[#D4AF37]/40 bg-[#05070B]/90 px-4 py-1.5 font-sans text-xs uppercase tracking-wider font-semibold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#05070B] transition"
                    >
                      Reseal Vault Doors
                    </button>
                  </div>

                  <div>
                    <div className="font-sans text-xs font-semibold uppercase tracking-wider text-[#10B981]">
                      ✓ {vaultProp.corridorDisplayName}
                    </div>
                    <h3 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-[#F8F9FA]">
                      {vaultProp.title.replace("VAULT // ", "")}
                    </h3>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#D4AF37]/25 pt-5">
                      <div className="font-serif text-lg sm:text-2xl font-bold text-[#D4AF37]">
                        {vaultProp.priceDisplay.split("(")[0]}
                      </div>
                      {onRequestConsult && (
                        <button
                          type="button"
                          onClick={onRequestConsult}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-[#05070B] shadow-gold-glow hover:bg-[#e5c349] transition"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>Book Private Briefing</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* LEFT VAULT DOOR LEAF */}
                <motion.div
                  initial={false}
                  animate={
                    isOpen
                      ? { x: "-102%", rotateY: 38 }
                      : { x: "0%", rotateY: 0 }
                  }
                  transition={{ duration: 1.25, ease: [0.76, 0, 0.24, 1] }}
                  style={{ transformOrigin: "left center" }}
                  onClick={() => toggleVaultDoor(vaultProp.id)}
                  data-cursor={isOpen ? undefined : "UNSEAL"}
                  className={`absolute inset-y-0 left-0 z-20 flex w-1/2 cursor-pointer flex-col justify-between border-r border-[#D4AF37]/40 bg-[#080C14] p-4 sm:p-8 shadow-[20px_0_50px_rgba(0,0,0,0.95)] ${
                    isOpen ? "pointer-events-none" : ""
                  }`}
                >
                  <div className="pointer-events-none absolute inset-4 border border-[#D4AF37]/15" />
                  <Lock className="h-5 w-5 text-[#D4AF37]" />
                  <div className="my-auto text-right pr-4">
                    <div className="font-sans text-xs font-semibold uppercase tracking-wider text-[#A6B0BF]">
                      CONFIDENTIAL
                    </div>
                    <div className="mt-1 font-serif text-lg sm:text-2xl font-medium text-[#F8F9FA]">
                      {vaultProp.title.replace("VAULT // ", "").split(" ")[1]}
                    </div>
                  </div>
                  <div className="font-sans text-xs font-semibold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5 justify-end">
                    <span>Click to Unseal</span>
                    <span>→</span>
                  </div>
                </motion.div>

                {/* RIGHT VAULT DOOR LEAF */}
                <motion.div
                  initial={false}
                  animate={
                    isOpen
                      ? { x: "102%", rotateY: -38 }
                      : { x: "0%", rotateY: 0 }
                  }
                  transition={{ duration: 1.25, ease: [0.76, 0, 0.24, 1] }}
                  style={{ transformOrigin: "right center" }}
                  onClick={() => toggleVaultDoor(vaultProp.id)}
                  data-cursor={isOpen ? undefined : "UNSEAL"}
                  className={`absolute inset-y-0 right-0 z-20 flex w-1/2 cursor-pointer flex-col justify-between border-l border-[#D4AF37]/40 bg-[#080C14] p-4 sm:p-8 text-right shadow-[-20px_0_50px_rgba(0,0,0,0.95)] ${
                    isOpen ? "pointer-events-none" : ""
                  }`}
                >
                  <div className="pointer-events-none absolute inset-4 border border-[#D4AF37]/15" />
                  <DoorOpen className="ml-auto h-5 w-5 text-[#D4AF37]" />
                  <div className="my-auto text-left pl-4">
                    <div className="font-sans text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      SCORE {vaultProp.assetScoreTotal}/100
                    </div>
                    <div className="mt-1 font-serif text-lg sm:text-2xl font-bold text-[#D4AF37]">
                      {vaultProp.priceDisplay.split("(")[0]}
                    </div>
                  </div>
                  <div className="font-sans text-xs font-semibold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5 justify-start">
                    <span>←</span>
                    <span>Off-Market Mandate</span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
