"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CuratedProperty } from "@/types/property";
import { DoorOpen, Lock } from "lucide-react";

interface Mod7PrivateVaultDossierProps {
  vaultProperties: CuratedProperty[];
  onRequestDossier: (property: CuratedProperty) => void;
}

export default function Mod7PrivateVaultDossier({
  vaultProperties,
  onRequestDossier,
}: Mod7PrivateVaultDossierProps) {
  const [openVaultIds, setOpenVaultIds] = useState<Record<string, boolean>>({});

  const toggleVaultDoor = (id: string) => {
    setOpenVaultIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="mod-private-vault"
      className="relative border-t border-[#D4AF37]/10 py-40 sm:py-52"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
            OFF-MARKET MANDATES
          </div>
          <h2 className="mt-6 font-serif text-4xl font-light text-[#F4F1EA] sm:text-6xl">
            The Private <span className="italic text-[#D4AF37]">Vault</span>.
          </h2>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#949BA6]">
            Click the Vault Doors to unseal confidential pre-launch &amp; family office inventory
          </p>
        </div>

        {/* Interactive 3D Vault Double-Doors Grid */}
        <div className="mt-24 grid grid-cols-1 gap-16 lg:grid-cols-2">
          {vaultProperties.map((vaultProp) => {
            const isOpen = Boolean(openVaultIds[vaultProp.id]);

            return (
              <div
                key={vaultProp.id}
                style={{ perspective: "1800px" }}
                className="relative h-[440px] w-full overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-[#05070B] shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
              >
                {/* Revealed Off-Market Interior Behind the Doors */}
                <img
                  src={vaultProp.duskHeroImageUrl}
                  alt={vaultProp.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-55"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/40 to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]">
                      ORERA: {vaultProp.oreraNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleVaultDoor(vaultProp.id)}
                      className="rounded-full border border-[#D4AF37]/40 bg-[#05070B]/80 px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#D4AF37]"
                    >
                      Seal Doors
                    </button>
                  </div>

                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#2E9B68]">
                      {vaultProp.corridorDisplayName}
                    </div>
                    <h3 className="mt-2 font-serif text-3xl font-light text-[#F4F1EA] sm:text-4xl">
                      {vaultProp.title.replace("VAULT // ", "")}
                    </h3>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#D4AF37]/20 pt-5">
                      <div className="font-serif text-2xl text-[#D4AF37]">
                        {vaultProp.priceDisplay.split("(")[0]}
                      </div>
                      <button
                        type="button"
                        onClick={() => onRequestDossier(vaultProp)}
                        className="rounded-full bg-[#D4AF37] px-6 py-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-[#05070B] hover:bg-[#e5c349] transition"
                      >
                        Signed Watermarked Dossier
                      </button>
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
                  className={`absolute inset-y-0 left-0 z-20 flex w-1/2 cursor-pointer flex-col justify-between border-r border-[#D4AF37]/40 bg-[#080C14] p-8 shadow-[20px_0_50px_rgba(0,0,0,0.95)] ${
                    isOpen ? "pointer-events-none" : ""
                  }`}
                >
                  <div className="pointer-events-none absolute inset-4 border border-[#D4AF37]/15" />
                  <Lock className="h-4 w-4 text-[#D4AF37]/60" />
                  <div className="my-auto text-right pr-4">
                    <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#949BA6]">
                      CONFIDENTIAL
                    </div>
                    <div className="mt-1 font-serif text-2xl text-[#F4F1EA]">
                      {vaultProp.title.replace("VAULT // ", "").split(" ")[1]}
                    </div>
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#D4AF37]">
                    CLICK TO OPEN
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
                  className={`absolute inset-y-0 right-0 z-20 flex w-1/2 cursor-pointer flex-col justify-between border-l border-[#D4AF37]/40 bg-[#080C14] p-8 text-right shadow-[-20px_0_50px_rgba(0,0,0,0.95)] ${
                    isOpen ? "pointer-events-none" : ""
                  }`}
                >
                  <div className="pointer-events-none absolute inset-4 border border-[#D4AF37]/15" />
                  <DoorOpen className="ml-auto h-4 w-4 text-[#D4AF37]" />
                  <div className="my-auto text-left pl-4">
                    <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#D4AF37]">
                      SCORE {vaultProp.assetScoreTotal}/100
                    </div>
                    <div className="mt-1 font-serif text-2xl text-[#D4AF37]">
                      {vaultProp.priceDisplay.split(" ")[0]}{" "}
                      {vaultProp.priceDisplay.split(" ")[1]}
                    </div>
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#949BA6]">
                    15-MIN SIGNED URL
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
