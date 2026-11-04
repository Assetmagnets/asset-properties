"use client";

import React, { useState } from "react";
import {
  X,
  Phone,
  MessageCircle,
  Building2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [consultationMode, setConsultationMode] = useState("Private Phone Call");
  const [preferredLocation, setPreferredLocation] = useState("Patia – Infocity Corridor");
  const [budgetRange, setBudgetRange] = useState("₹2.5 Cr – ₹5.0 Cr");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    const cleanPhone = phoneNumber.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/v1/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phoneNumber: cleanPhone.slice(-10),
          email: email.trim() || undefined,
          consultationMode,
          preferredLocation,
          budgetRange,
          notes: notes.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || "Unable to submit consultation request.");
      } else {
        setIsSubmitted(true);
      }
    } catch {
      setErrorMsg("Network error. Please try again or call our advisory team directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setNotes("");
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#05070B]/85 p-4 backdrop-blur-xl">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl border border-[#D4AF37]/35 bg-[#0B101B] p-6 sm:p-9 shadow-[0_20px_70px_rgba(0,0,0,0.85)]">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleReset}
          className="absolute right-5 top-5 rounded-full border border-[#D4AF37]/25 p-2 text-[#949BA6] hover:border-[#D4AF37] hover:text-[#F4F1EA] transition"
        >
          <X className="h-4 w-4" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-500/10">
              <CheckCircle2 className="h-9 w-9 text-emerald-400" />
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono text-emerald-400">
              Consultation Scheduled • Stored in Database
            </div>

            <h3 className="font-serif text-3xl font-medium text-[#F8F9FA]">
              Consultation Request Received
            </h3>

            <p className="text-sm text-[#CBD5E1] max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-[#D4AF37] font-semibold">{fullName}</span>. A Senior Real Estate Advisor from our Bhubaneswar Office has received your mandate for{" "}
              <span className="text-white font-medium">{preferredLocation}</span> ({budgetRange}).
            </p>

            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#05070B] p-5 text-left text-xs space-y-2.5">
              <div className="font-sans font-semibold uppercase tracking-wider text-[#D4AF37] text-[11px]">
                Your Advisor Contact Information:
              </div>
              <div className="flex items-center gap-2 text-[#CBD5E1]">
                <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Direct Line: <strong className="text-white">+91 9777295707</strong></span>
              </div>
              <div className="flex items-center gap-2 text-[#CBD5E1]">
                <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                <span>WhatsApp: <strong className="text-emerald-400">+91 9777295707</strong></span>
              </div>
              <div className="flex items-center gap-2 text-[#CBD5E1]">
                <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Office: Infocity Corporate Corridor, Patia, Bhubaneswar</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full rounded-xl bg-[#D4AF37] py-3.5 text-xs font-bold uppercase tracking-wider text-[#05070B] shadow-gold-glow hover:bg-[#e5c349] transition"
            >
              Done &amp; Return
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/35 bg-[#05070B] px-3.5 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              <Sparkles className="h-3.5 w-3.5" />
              CONFIDENTIAL ADVISORY MANDATE
            </div>

            <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-medium text-[#F8F9FA]">
              Book a Private Consultation
            </h3>

            <p className="mt-1.5 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              Direct consultation with our senior Bhubaneswar property auditors. No brokers, no spam. DPDP Act 2023 protected.
            </p>

            {errorMsg && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Siddharth Mohanty"
                    className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-3.5 py-2.5 text-sm text-[#F8F9FA] placeholder-white/25 outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                    10-Digit Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 9861048291"
                    className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-3.5 py-2.5 font-mono text-sm text-[#F8F9FA] placeholder-white/25 outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. client@example.com"
                  className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-3.5 py-2.5 text-sm text-[#F8F9FA] placeholder-white/25 outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Consultation Mode */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-2">
                  Preferred Consultation Mode *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    "Phone Call",
                    "WhatsApp",
                    "Office (Patia)",
                    "Site Visit",
                  ].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setConsultationMode(mode)}
                      className={`rounded-lg py-2 px-2 text-center font-medium transition ${
                        consultationMode === mode
                          ? "bg-[#D4AF37] text-[#05070B] font-bold shadow"
                          : "border border-[#D4AF37]/25 bg-[#05070B] text-[#A6B0BF] hover:text-white"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                    Target Corridor / Area *
                  </label>
                  <select
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-3.5 py-2.5 text-xs text-[#F8F9FA] outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Patia – Infocity Corridor">Patia – Infocity Corridor</option>
                    <option value="Pahala – NH16 Villa Belt">Pahala – NH16 Villa Belt</option>
                    <option value="Saheed Nagar Core Luxury">Saheed Nagar Core Luxury</option>
                    <option value="Trisulia Metro Growth Belt">Trisulia Metro Growth Belt</option>
                    <option value="Kalinga Nagar – AIIMS Corridor">Kalinga Nagar – AIIMS</option>
                    <option value="Jayadev Vihar / Nayapalli">Jayadev Vihar / Nayapalli</option>
                    <option value="All Bhubaneswar Premium">All Bhubaneswar Premium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                    Investment Capital Range *
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-3.5 py-2.5 text-xs text-[#F8F9FA] outline-none focus:border-[#D4AF37]"
                  >
                    <option value="₹1.5 Cr – ₹2.5 Cr">₹1.5 Cr – ₹2.5 Cr</option>
                    <option value="₹2.5 Cr – ₹5.0 Cr">₹2.5 Cr – ₹5.0 Cr</option>
                    <option value="₹5.0 Cr+ Ultra-Luxury">₹5.0 Cr+ Ultra-Luxury</option>
                    <option value="Commercial Grade-A Mandate">Commercial Grade-A Mandate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                  Specific Requirements or Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Looking for ready 4BHK with Vastu alignment and Gharabari title verification..."
                  className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-3.5 py-2 text-xs text-[#F8F9FA] placeholder-white/25 outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] py-3.5 text-xs font-bold uppercase tracking-wider text-[#05070B] shadow-gold-glow hover:bg-[#e5c349] transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting Consultation Request...
                  </>
                ) : (
                  "Confirm & Schedule Consultation"
                )}
              </button>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-[#A6B0BF]">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Direct Advisory • Zero Spam
                </span>
                <span>Immediate WhatsApp Confirmation</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
