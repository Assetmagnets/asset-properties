"use client";

import React, { useState } from "react";
import { CuratedProperty } from "@/types/property";
import { CheckCircle2 } from "lucide-react";

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
      className="relative border-t border-[#D4AF37]/10 py-40 sm:py-52"
    >
      <div className="mx-auto max-w-4xl px-6 sm:px-12 text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
          PRIVATE CHAUFFEUR &amp; LASER AUDIT
        </div>
        <h2 className="mt-6 font-serif text-4xl font-light text-[#F4F1EA] sm:text-6xl">
          The <span className="italic text-[#D4AF37]">4:30 PM</span> Golden Hour.
        </h2>

        {confirmed ? (
          <div className="mt-16 rounded-2xl border border-[#2E9B68]/40 bg-[#0B101B] p-12">
            <CheckCircle2 className="mx-auto h-8 w-8 text-[#2E9B68]" />
            <div className="mt-4 font-serif text-3xl text-[#F4F1EA]">
              Sanctuary Tour Reserved
            </div>
            <p className="mt-2 font-mono text-xs text-[#949BA6]">
              Dispatched to {confirmed} • {selectedSlot}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-16 space-y-6 rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B]/50 p-8 sm:p-14 text-left"
          >
            {/* Slot & Kit Pills */}
            <div className="flex flex-wrap justify-center gap-3 pb-4">
              {[
                "4:30 PM Golden Hour Slot",
                "7:00 AM East Vastu Sunlight",
                "Live 4K NRI Drone Stream",
              ].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-full px-5 py-2 font-mono text-[9px] uppercase tracking-[0.22em] transition ${
                    selectedSlot === slot
                      ? "bg-[#D4AF37] text-[#05070B] font-semibold"
                      : "border border-[#D4AF37]/20 text-[#949BA6]"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <input
                suppressHydrationWarning
                type="text"
                required
                placeholder="Your Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="rounded-xl border border-[#D4AF37]/20 bg-[#05070B] px-4 py-3.5 text-xs text-[#F4F1EA] placeholder-[#949BA6]/50 focus:border-[#D4AF37] focus:outline-none"
              />
              <input
                suppressHydrationWarning
                type="tel"
                required
                placeholder="WhatsApp (10-Digit)"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="rounded-xl border border-[#D4AF37]/20 bg-[#05070B] px-4 py-3.5 font-mono text-xs text-[#F4F1EA] placeholder-[#949BA6]/50 focus:border-[#D4AF37] focus:outline-none"
              />
              <select
                suppressHydrationWarning
                value={selectedPropertyId}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
                className="rounded-xl border border-[#D4AF37]/20 bg-[#05070B] px-4 py-3.5 text-xs text-[#F4F1EA] focus:border-[#D4AF37] focus:outline-none"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title.replace("VAULT // ", "")}
                  </option>
                ))}
              </select>
            </div>

            {/* Co-Decision Maker Kit Selector */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              <div className="flex flex-wrap gap-2">
                {[
                  "Parents (Vastu Kit)",
                  "Spouse (6% Stamp Duty Kit)",
                  "CA / Legal (34-Yr EC Kit)",
                ].map((kit) => (
                  <button
                    key={kit}
                    type="button"
                    onClick={() => setCoDecisionMaker(kit)}
                    className={`rounded-full px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] transition ${
                      coDecisionMaker === kit
                        ? "border border-[#2E9B68] bg-[#2E9B68]/15 text-[#2E9B68]"
                        : "border border-[#D4AF37]/15 text-[#949BA6]"
                    }`}
                  >
                    + {kit}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-[#D4AF37] px-8 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#05070B] hover:bg-[#e5c349] transition"
              >
                {isSubmitting ? "Reserving..." : "Reserve Chauffeur"}
              </button>
            </div>

            {errorMsg && (
              <div className="text-center font-mono text-xs text-red-400">
                {errorMsg}
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
