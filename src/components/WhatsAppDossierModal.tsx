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
  MapPin,
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

        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#05070B] px-3.5 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
          <Lock className="h-3.5 w-3.5" />
          ANTI-SCRAPER WATERMARKED DOSSIER GATE
        </div>

        <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-medium text-[#F8F9FA]">
          1-Click Verified Legal &amp; Floor Plan Dossier
        </h3>
        <p className="mt-1.5 text-sm text-[#CBD5E1] font-sans leading-relaxed">
          Includes 30-year Bhulekh Gharabari RoR copy, Non-Encumbrance Certificate, BDA Sanction order, and Leica laser-measured carpet area telemetry.
        </p>

        {dispatchResult ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-[#10B981]/40 bg-[#10B981]/10 p-5">
              <div className="flex items-center gap-2 font-sans text-xs sm:text-sm font-bold text-[#10B981]">
                <CheckCircle2 className="h-5 w-5" />
                DYNAMIC WATERMARK &amp; 15-MINUTE EXPIRING DOSSIER GENERATED
              </div>
              <p className="mt-3 font-mono text-xs text-[#F8F9FA] bg-[#05070B]/70 p-2.5 rounded-lg border border-white/5">
                {dispatchResult.watermarkStamp}
              </p>
              <p className="mt-2 text-xs text-[#A6B0BF] font-sans">
                {dispatchResult.dpdpCompliance} • Security rate-limit:{" "}
                {dispatchResult.remainingRequestsThisHour}/3 remaining this hour
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={dispatchResult.signedDossierUrl}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[#05070B] shadow-gold-glow hover:bg-[#e5c349] transition"
              >
                <FileCheck2 className="h-4 w-4" />
                Open Verified Dossier (15-Min Expiry)
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => setDispatchResult(null)}
                className="rounded-xl border border-[#D4AF37]/30 px-5 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#A6B0BF] hover:text-[#F8F9FA] transition"
              >
                Request Another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleDispatch} className="mt-6 space-y-5">
            <div>
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-[#A6B0BF] block mb-2">
                Select Approved Mandate
              </label>
              <select
                value={selectedSlug}
                onChange={(e) => setSelectedSlug(e.target.value)}
                className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-4 py-3 text-sm text-[#F8F9FA] focus:border-[#D4AF37] focus:outline-none"
              >
                {allProperties.map((p) => (
                  <option key={p.id} value={p.slug}>
                    {p.title} — {p.priceDisplay} (ORERA: {p.oreraNumber})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="font-sans text-xs font-semibold uppercase tracking-wider text-[#A6B0BF] block mb-2">
                  Client Full Name (For Watermark Stamp) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Siddharth Mohanty"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-4 py-3 text-sm text-[#F8F9FA] placeholder-[#A6B0BF]/50 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-sans text-xs font-semibold uppercase tracking-wider text-[#A6B0BF] block mb-2">
                  WhatsApp Number (India) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-Digit Mobile"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-4 py-3 font-mono text-sm text-[#F8F9FA] placeholder-[#A6B0BF]/50 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-[#A6B0BF] block mb-2">
                Investor Profile
              </label>
              <div className="grid grid-cols-3 gap-2.5">
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
                    className={`rounded-xl border py-2.5 font-sans text-xs uppercase tracking-wider font-medium transition ${
                      buyerPersona === item.id
                        ? "border-[#D4AF37] bg-[#D4AF37] text-[#05070B] font-bold shadow-md"
                        : "border-[#D4AF37]/25 bg-[#05070B] text-[#A6B0BF] hover:text-[#F8F9FA]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs font-sans text-red-300">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#D4AF37] py-4 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[#05070B] shadow-gold-glow hover:bg-[#e5c349] transition disabled:opacity-50"
            >
              {isLoading
                ? "Stamping Diagonal Watermark & Encrypting..."
                : "Generate Signed Legal Dossier & Dispatch"}
            </button>

            <div className="flex flex-wrap items-center justify-between gap-2 font-sans text-xs text-[#A6B0BF] pt-2 border-t border-white/5">
              <span className="flex items-center gap-1.5 text-[#10B981] font-medium">
                <ShieldCheck className="h-4 w-4" />
                AES-256-GCM Encrypted (DPDP Act 2023 Compliant)
              </span>
              <span>Rate Limit: 3 Dispatches / IP / Hour</span>
            </div>

            <div className="rounded-xl border border-[#D4AF37]/20 bg-[#05070B] p-3 text-center text-xs font-mono text-[#CBD5E1] space-y-1.5">
              <div>
                <span className="text-[#A6B0BF]">Need instant assistance?</span> Direct Advisory Desk:{" "}
                <a href="tel:+919777295707" className="text-[#D4AF37] hover:underline font-bold">
                  +91 9777295707
                </a>{" "}
                •{" "}
                <a href="mailto:info@assetmagnets.com" className="text-[#D4AF37] hover:underline">
                  info@assetmagnets.com
                </a>
              </div>
              <div>
                <a
                  href="https://www.google.com/maps?cid=17158658638632800577&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A6B0BF] hover:text-[#D4AF37] inline-flex items-center gap-1 transition"
                >
                  <MapPin className="h-3 w-3 text-[#D4AF37]" />
                  <span>Infocity, Patia, Bhubaneswar Office (Google Maps ↗)</span>
                </a>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
