"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CuratedProperty } from "@/types/property";
import { DoorOpen, Lock } from "lucide-react";

interface Mod7PrivateVaultDossierProps {
  vaultProperties: CuratedProperty[];
  onRequestDossier: (property: CuratedProperty) => void;
  hideHeader?: boolean;
}

export default function Mod7PrivateVaultDossier({
  vaultProperties,
  onRequestDossier,
  hideHeader = false,
}: Mod7PrivateVaultDossierProps) {
  const [openVaultIds, setOpenVaultIds] = useState<Record<string, boolean>>({});

  const toggleVaultDoor = (id: string) => {
    setOpenVaultIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="mod-private-vault"
      className={`relative ${hideHeader ? "py-12 sm:py-16" : "py-24 sm:py-36"}`}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        {!hideHeader && (
          <div className="text-center">
            <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              OFF-MARKET MANDATES • CONFIDENTIAL ALLOCATIONS
            </div>
            <h2 className="mt-4 font-serif text-4xl sm:text-6xl font-medium text-[#F8F9FA]">
              The Private <span className="italic font-normal text-[#D4AF37]">Vault</span>.
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg text-[#CBD5E1] max-w-2xl mx-auto">
              Discreet pre-launch developer quotas and institutional family office mandates in Patia and Trisulia. Click the vault doors to unseal legal details protected by dynamic watermarking.
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
                className="relative h-[440px] w-full overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-[#05070B] shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
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
                      <div className="font-serif text-2xl font-bold text-[#D4AF37]">
                        {vaultProp.priceDisplay.split("(")[0]}
                      </div>
                      <button
                        type="button"
                        onClick={() => onRequestDossier(vaultProp)}
                        className="rounded-full bg-[#D4AF37] px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-[#05070B] shadow-gold-glow hover:bg-[#e5c349] transition"
                      >
                        Request Watermarked Dossier
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
                  <Lock className="h-5 w-5 text-[#D4AF37]" />
                  <div className="my-auto text-right pr-4">
                    <div className="font-sans text-xs font-semibold uppercase tracking-wider text-[#A6B0BF]">
                      CONFIDENTIAL
                    </div>
                    <div className="mt-1 font-serif text-2xl font-medium text-[#F8F9FA]">
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
                  className={`absolute inset-y-0 right-0 z-20 flex w-1/2 cursor-pointer flex-col justify-between border-l border-[#D4AF37]/40 bg-[#080C14] p-8 text-right shadow-[-20px_0_50px_rgba(0,0,0,0.95)] ${
                    isOpen ? "pointer-events-none" : ""
                  }`}
                >
                  <div className="pointer-events-none absolute inset-4 border border-[#D4AF37]/15" />
                  <DoorOpen className="ml-auto h-5 w-5 text-[#D4AF37]" />
                  <div className="my-auto text-left pl-4">
                    <div className="font-sans text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      SCORE {vaultProp.assetScoreTotal}/100
                    </div>
                    <div className="mt-1 font-serif text-2xl font-bold text-[#D4AF37]">
                      {vaultProp.priceDisplay.split(" ")[0]}{" "}
                      {vaultProp.priceDisplay.split(" ")[1]}
                    </div>
                  </div>
                  <div className="font-mono text-xs uppercase tracking-wider text-[#A6B0BF]">
                    15-Min Signed URL
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* CONFIDENTIAL OFF-MARKET TECHNICAL SPECIFICATIONS MATRIX */}
        <div className="mt-28">
          <div className="text-center">
            <div className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              RESTRICTED ALLOCATION • DUE DILIGENCE AUDIT
            </div>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-medium text-[#F8F9FA]">
              Off-Market Mandate <span className="italic font-normal text-[#D4AF37]">Specifications</span>.
            </h3>
            <p className="mt-2 font-sans text-xs sm:text-sm text-[#CBD5E1] max-w-xl mx-auto">
              Statutory parameters and architectural telemetry for undisclosed private mandates in Kalinga Nagar and Jayadev Vihar.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B]/90 shadow-2xl">
            <table className="w-full text-left text-xs font-sans">
              <thead className="border-b border-[#D4AF37]/20 bg-[#05070B] uppercase tracking-wider text-[#A6B0BF]">
                <tr>
                  <th className="py-4 px-5">Vault Mandate</th>
                  <th className="py-4 px-5">Corridor</th>
                  <th className="py-4 px-5">Configuration</th>
                  <th className="py-4 px-5">Land / Carpet Area</th>
                  <th className="py-4 px-5">Privacy &amp; Core</th>
                  <th className="py-4 px-5">Valuation Guide</th>
                  <th className="py-4 px-5 text-right">Access Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {vaultProperties.map((vp) => (
                  <tr key={vp.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-serif text-sm font-semibold text-[#F8F9FA]">{vp.title.replace("VAULT // ", "")}</div>
                      <div className="text-[11px] text-[#D4AF37] font-mono mt-0.5">ORERA: {vp.oreraNumber}</div>
                    </td>
                    <td className="py-4 px-5 text-[#CBD5E1]">{vp.corridorDisplayName}</td>
                    <td className="py-4 px-5 text-[#A6B0BF]">{vp.configuration}</td>
                    <td className="py-4 px-5 font-mono text-[#F8F9FA]">
                      {vp.reraCarpetSqFt.toLocaleString()} sq.ft. Carpet
                      <span className="block text-[11px] text-[#A6B0BF]">({vp.superBuiltUpSqFt.toLocaleString()} sq.ft. SBUA)</span>
                    </td>
                    <td className="py-4 px-5 text-[#10B981] font-medium">
                      Biometric Private Lift Core
                    </td>
                    <td className="py-4 px-5 font-serif text-sm font-bold text-[#D4AF37]">
                      {vp.priceDisplay.split("(")[0]}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => onRequestDossier(vp)}
                        className="inline-flex items-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-1 font-mono text-xs font-bold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#05070B] transition"
                      >
                        Request NDA Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* HISTORICAL ANONYMIZED PRIVATE VAULT TRANSACTIONS */}
        <div className="mt-28">
          <div className="text-center">
            <div className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              TRACK RECORD • DISCREET WEALTH ADVISORY
            </div>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-medium text-[#F8F9FA]">
              Recent Private Vault <span className="italic font-normal text-[#D4AF37]">Precedents</span>.
            </h3>
            <p className="mt-2 font-sans text-xs sm:text-sm text-[#CBD5E1] max-w-xl mx-auto">
              A historical selection of off-market land holdings and generational estates successfully represented under strict client non-disclosure protocols.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                id: "PRECEDENT-01",
                asset: "Saheed Nagar Generational Villa",
                area: "3,800 sq.ft. Land Parcel",
                value: "₹4.20 Cr",
                buyer: "Senior High Court Jurist",
                legal: "44-Year Unbroken Chain of Title",
              },
              {
                id: "PRECEDENT-02",
                asset: "Forest Park Legacy Estate",
                area: "5,400 sq.ft. Corner Plot",
                value: "₹6.10 Cr",
                buyer: "Tier-1 Industrialist Family Office",
                legal: "100% Gharabari Direct Tahasil Mutation",
              },
              {
                id: "PRECEDENT-03",
                asset: "Patia Infocity Duplex Sky Penthouse",
                area: "4,600 sq.ft. Duplex",
                value: "₹3.65 Cr",
                buyer: "US-Based Silicon Valley Founder",
                legal: "Mivan Structural & Saint-Gobain DGU",
              },
              {
                id: "PRECEDENT-04",
                asset: "Nayapalli Medical Director Suite",
                area: "3,250 sq.ft. Low-Rise Floor",
                value: "₹2.95 Cr",
                buyer: "Senior AIIMS Clinical Director",
                legal: "36.2% High UDS Land Share",
              },
            ].map((p) => (
              <div key={p.id} className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B101B]/80 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#A6B0BF]">{p.id}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#10B981]">✓ TRANSACTED</span>
                  </div>
                  <h4 className="mt-3 font-serif text-lg font-semibold text-[#F8F9FA]">{p.asset}</h4>
                  <div className="mt-2 text-xs font-mono text-[#A6B0BF]">{p.area}</div>
                  <div className="mt-3 font-serif text-2xl font-bold text-[#D4AF37]">{p.value}</div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-xs text-[#CBD5E1]">
                    <span className="text-[#A6B0BF]">Client Persona: </span>{p.buyer}
                  </div>
                </div>
                <div className="mt-4 text-[11px] font-mono text-[#10B981] bg-[#10B981]/10 px-2.5 py-1.5 rounded-lg">
                  {p.legal}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STRICT INSTITUTIONAL VAULT ACCESS PROTOCOL */}
        <div className="mt-20 rounded-2xl border border-[#D4AF37]/25 bg-[#05070B] p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <div className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            DPDP ACT 2023 SECURITY STANDARD
          </div>
          <h4 className="mt-3 font-serif text-2xl font-medium text-[#F8F9FA]">
            How Private Vault Legal Dossiers Are Protected
          </h4>
          <p className="mt-3 text-xs sm:text-sm text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed">
            All title deeds, floor plans, and seller identification numbers are dynamically watermarked with your verified phone number and IP address upon opening. Documents are delivered via 15-minute cryptographically signed AWS S3 URLs to ensure absolute confidentiality for both buyer and seller.
          </p>
        </div>
      </div>
    </section>
  );
}
