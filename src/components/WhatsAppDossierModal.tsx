"use client";

import React, { useState } from "react";
import { CuratedProperty } from "@/types/property";
import {
  X,
  ShieldCheck,
  FileCheck2,
  ExternalLink,
  Lock,
  CheckCircle2,
} from "lucide-react";

interface WhatsAppDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: CuratedProperty;
  allProperties: CuratedProperty[];
}

export default function WhatsAppDossierModal({
  isOpen,
  onClose,
  property,
  allProperties,
}: WhatsAppDossierModalProps) {
  const [fullName, setFullName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [buyerPersona, setBuyerPersona] = useState<
    "END_USE_FAMILY" | "NRI_OUTSTATION_INVESTOR" | "COMMERCIAL_WEALTH_BUILDER"
  >("END_USE_FAMILY");
  const [selectedSlug, setSelectedSlug] = useState(property.slug);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [dispatchResult, setDispatchResult] = useState<{
    propertyTitle: string;
    oreraNumber: string;
    bhulekhKhataPlot: string;
    watermarkStamp: string;
    signedDossierUrl: string;
    expiresInMinutes: number;
    remainingRequestsThisHour: number;
    dpdpCompliance: string;
  } | null>(null);

  React.useEffect(() => {
    setSelectedSlug(property.slug);
  }, [property]);

  if (!isOpen) return null;

  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/v1/concierge/dossier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          whatsappNumber,
          buyerPersona,
          propertySlug: selectedSlug,
          utmSource: "whatsapp_dossier_modal_asset_properties17",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || "Validation failed. Check your mobile number.");
      } else {
        setDispatchResult(data.dossierMeta);
      }
    } catch {
      setErrorMsg("Unable to connect to the Dossier Signing Engine.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070B]/85 p-4 backdrop-blur-xl">
      <div className="relative w-full max-w-xl rounded-2xl border border-[#D4AF37]/40 bg-[#0B101B] p-6 sm:p-8 shadow-gold-glow">
        <button
          type="button"
          onClick={() => {
            setDispatchResult(null);
            onClose();
          }}
          className="absolute right-5 top-5 rounded-full border border-[#D4AF37]/25 p-2 text-[#949BA6] hover:border-[#D4AF37] hover:text-[#F4F1EA]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#05070B] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#D4AF37]">
          <Lock className="h-3 w-3" />
          ANTI-SCRAPER WATERMARKED DOSSIER GATE
        </div>

        <h3 className="mt-3 font-serif text-3xl text-[#F4F1EA]">
          1-Click Verified Legal &amp; Floor Plan Dossier
        </h3>
        <p className="mt-1 text-xs text-[#949BA6]">
          Includes Bhulekh Gharabari RoR copy, 30-Year EC summary, BDA Sanction
          plan, and Leica Laser Carpet vs. Super Built-Up audit.
        </p>

        {dispatchResult ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-[#2E9B68]/40 bg-[#2E9B68]/10 p-4">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#2E9B68]">
                <CheckCircle2 className="h-4 w-4" />
                DYNAMIC WATERMARK &amp; 15-MINUTE SIGNED URL GENERATED
              </div>
              <p className="mt-2 font-mono text-[11px] text-[#F4F1EA]">
                {dispatchResult.watermarkStamp}
              </p>
              <p className="mt-1 font-mono text-[10px] text-[#949BA6]">
                {dispatchResult.dpdpCompliance} • Remaining rate-limit quota:{" "}
                {dispatchResult.remainingRequestsThisHour}/3 this hour
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={dispatchResult.signedDossierUrl}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3.5 text-xs font-semibold text-[#05070B] hover:bg-[#e3c14d] transition"
              >
                <FileCheck2 className="h-4 w-4" />
                Open Signed Watermarked Dossier (15-Min Expiry)
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setDispatchResult(null)}
                className="rounded-xl border border-[#D4AF37]/30 px-4 py-3 text-xs text-[#949BA6] hover:text-[#F4F1EA]"
              >
                Request Another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleDispatch} className="mt-6 space-y-4">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-[#949BA6] block mb-1.5">
                Select Curated or Off-Market Vault Property
              </label>
              <select
                value={selectedSlug}
                onChange={(e) => setSelectedSlug(e.target.value)}
                className="w-full rounded-xl border border-[#D4AF37]/25 bg-[#05070B] px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:border-[#D4AF37] focus:outline-none"
              >
                {allProperties.map((p) => (
                  <option key={p.id} value={p.slug}>
                    {p.title} — {p.priceDisplay} (ORERA: {p.oreraNumber})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#949BA6] block mb-1.5">
                  Your Full Name (For Watermark Stamp) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Dr. / Mr. / Ms. Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-[#D4AF37]/25 bg-[#05070B] px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#949BA6] block mb-1.5">
                  WhatsApp Mobile Number (India) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="98610XXXXX"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full rounded-xl border border-[#D4AF37]/25 bg-[#05070B] px-3.5 py-2.5 font-mono text-xs text-[#F4F1EA] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-[#949BA6] block mb-1.5">
                Buyer Persona Profile
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "END_USE_FAMILY", label: "End-Use Family" },
                  { id: "NRI_OUTSTATION_INVESTOR", label: "NRI / Outstation" },
                  { id: "COMMERCIAL_WEALTH_BUILDER", label: "Commercial / CA" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setBuyerPersona(
                        item.id as
                          | "END_USE_FAMILY"
                          | "NRI_OUTSTATION_INVESTOR"
                          | "COMMERCIAL_WEALTH_BUILDER"
                      )
                    }
                    className={`rounded-lg border py-2 font-mono text-[10px] transition ${
                      buyerPersona === item.id
                        ? "border-[#D4AF37] bg-[#D4AF37] text-[#05070B] font-bold"
                        : "border-[#D4AF37]/20 bg-[#05070B] text-[#949BA6]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#D4AF37] py-3.5 text-xs font-semibold text-[#05070B] shadow-gold-glow hover:bg-[#e5c349] transition disabled:opacity-50"
            >
              {isLoading
                ? "Stamping Diagonal Watermark & Encrypting..."
                : "Generate Signed Legal Dossier & Dispatch to WhatsApp"}
            </button>

            <div className="flex items-center justify-between font-mono text-[10px] text-[#949BA6] pt-1">
              <span className="flex items-center gap-1 text-[#2E9B68]">
                <ShieldCheck className="h-3.5 w-3.5" />
                AES-256-GCM Encrypted (DPDP Act 2023)
              </span>
              <span>Rate Limited: 3 Dispatches / IP / Hr</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
