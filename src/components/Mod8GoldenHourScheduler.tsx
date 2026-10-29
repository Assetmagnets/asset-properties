"use client";

import React, { useState } from "react";
import { CuratedProperty } from "@/types/property";
import { CheckCircle2, MapPin } from "lucide-react";

interface Mod8GoldenHourSchedulerProps {
  properties: CuratedProperty[];
}

export default function Mod8GoldenHourScheduler({
  properties,
}: Mod8GoldenHourSchedulerProps) {
  const [fullName, setFullName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [selectedPropertyId, setSelectedPropertyId] = useState(
    properties[0]?.id || "prop-aurelia-patia-01"
  );
  const [selectedSlot, setSelectedSlot] = useState("4:30 PM Golden Hour Slot");
  const [coDecisionMaker, setCoDecisionMaker] = useState("Parents (Vastu Kit)");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/v1/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          whatsappNumber,
          buyerPersona: "Private Client",
          coDecisionMakers: [coDecisionMaker],
          preferredTourSlot: selectedSlot,
          interestedPropertyId: selectedPropertyId,
          utmSource: "golden_hour_concierge",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || "Invalid mobile number.");
      } else {
        setConfirmed(data.maskedContact);
      }
    } catch {
      setErrorMsg("Unable to connect.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="mod-golden-hour"
      className="relative py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-6 sm:px-12 text-center">
        <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
          PRIVATE CHAUFFEUR &amp; DUAL-LAYER GROUND AUDIT
        </div>
        <h2 className="mt-4 font-serif text-4xl sm:text-6xl font-medium text-[#F8F9FA]">
          The <span className="italic font-normal text-[#D4AF37]">4:30 PM</span> Golden Hour.
        </h2>
        <p className="mt-4 font-sans text-base sm:text-lg text-[#CBD5E1] max-w-2xl mx-auto">
          Why 4:30 PM? In Bhubaneswar&apos;s tropical climate, the late afternoon reveals true cross-ventilation, west-facing balcony heat glare, and peak traffic noise. Our senior advisors accompany you with laser measuring and statutory title kits.
        </p>

        {confirmed ? (
          <div className="mt-14 rounded-2xl border border-[#10B981]/40 bg-[#0B101B] p-10 sm:p-14 shadow-2xl">
            <CheckCircle2 className="mx-auto h-12 w-12 text-[#10B981]" />
            <h3 className="mt-4 font-serif text-3xl font-medium text-[#F8F9FA]">
              Private Sanctuary Tour Reserved
            </h3>
            <p className="mt-2 font-sans text-sm sm:text-base text-[#CBD5E1]">
              A confidential confirmation dossier has been dispatched to <span className="text-[#D4AF37] font-semibold">{confirmed}</span> for the <span className="text-[#10B981] font-semibold">{selectedSlot}</span>.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-5 py-2 font-mono text-xs text-[#10B981]">
              Executive Chauffeur &amp; Due Diligence Kit Prepared
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-14 space-y-6 rounded-2xl border border-[#D4AF37]/30 bg-[#0B101B]/80 p-8 sm:p-12 text-left shadow-2xl"
          >
            {/* Slot Selector Pills */}
            <div>
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#A6B0BF] mb-3 text-center sm:text-left">
                Select Advisory Tour Experience
              </label>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                {[
                  "4:30 PM Golden Hour Slot",
                  "7:00 AM East Vastu Sunlight",
                  "Live 4K NRI Drone Stream",
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`rounded-full px-5 py-2.5 font-sans text-xs uppercase tracking-wider font-medium transition-all ${
                      selectedSlot === slot
                        ? "bg-[#D4AF37] text-[#05070B] font-bold shadow-md"
                        : "border border-[#D4AF37]/25 bg-[#05070B]/60 text-[#A6B0BF] hover:border-[#D4AF37] hover:text-[#F8F9FA]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#A6B0BF] mb-2">
                  Client Full Name *
                </label>
                <input
                  suppressHydrationWarning
                  type="text"
                  required
                  placeholder="e.g. Dr. Siddharth Mohanty"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-[#D4AF37]/25 bg-[#05070B] px-4 py-3.5 text-sm text-[#F8F9FA] placeholder-[#A6B0BF]/50 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#A6B0BF] mb-2">
                  WhatsApp Contact *
                </label>
                <input
                  suppressHydrationWarning
                  type="tel"
                  required
                  placeholder="10-Digit Mobile"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full rounded-xl border border-[#D4AF37]/25 bg-[#05070B] px-4 py-3.5 font-mono text-sm text-[#F8F9FA] placeholder-[#A6B0BF]/50 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#A6B0BF] mb-2">
                  Mandate to Inspect *
                </label>
                <select
                  suppressHydrationWarning
                  value={selectedPropertyId}
                  onChange={(e) => setSelectedPropertyId(e.target.value)}
                  className="w-full rounded-xl border border-[#D4AF37]/25 bg-[#05070B] px-4 py-3.5 text-sm text-[#F8F9FA] focus:border-[#D4AF37] focus:outline-none"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title.replace("VAULT // ", "")} ({p.priceDisplay})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Co-Decision Maker Kit Selector */}
            <div className="border-t border-[#D4AF37]/15 pt-5">
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#A6B0BF] mb-3">
                Include Tailored Advisory Kit for Co-Decision Makers:
              </label>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "Parents (Vastu Compass Kit)",
                    "Spouse (6% Stamp Duty Kit)",
                    "CA / Legal (34-Yr EC Kit)",
                  ].map((kit) => (
                    <button
                      key={kit}
                      type="button"
                      onClick={() => setCoDecisionMaker(kit)}
                      className={`rounded-full px-4 py-2 font-sans text-xs uppercase tracking-wider transition-all ${
                        coDecisionMaker === kit
                          ? "border border-[#10B981] bg-[#10B981]/15 text-[#10B981] font-semibold"
                          : "border border-[#D4AF37]/20 bg-[#05070B]/50 text-[#A6B0BF] hover:text-[#F8F9FA]"
                      }`}
                    >
                      + {kit}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-[#D4AF37] px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-[#05070B] shadow-gold-glow hover:bg-[#e5c349] transition disabled:opacity-50"
                >
                  {isSubmitting ? "Reserving..." : "Reserve Private Escort"}
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#A6B0BF]">
              <span>Direct Chauffeur Concierge: <a href="tel:+919777295707" className="text-[#D4AF37] hover:underline font-bold">+91 9777295707</a></span>
              <span>Departure Point: <a href="https://www.google.com/maps?cid=17158658638632800577&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline inline-flex items-center gap-1 font-semibold"><MapPin size={12} className="text-[#D4AF37]" /><span>Bhubaneswar HQ (Google Maps ↗)</span></a></span>
              <span>Advisory Desk: <a href="mailto:info@assetmagnets.com" className="text-[#D4AF37] hover:underline">info@assetmagnets.com</a></span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
