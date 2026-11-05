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
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Globe,
  ExternalLink,
  ArrowUpRight,
  Compass,
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
  const [preferredLocation, setPreferredLocation] = useState("Open to Recommendations");
  const [customLocation, setCustomLocation] = useState("");
  const [budgetRange, setBudgetRange] = useState("₹2.5 Cr – ₹5.0 Cr");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalLocationDisplay, setFinalLocationDisplay] = useState("");

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

    // Resolve location: Target corridor is optional
    let resolvedLocation = preferredLocation;
    if (preferredLocation === "OTHER") {
      resolvedLocation = customLocation.trim()
        ? `Other: ${customLocation.trim()}`
        : "Other (Open / Unspecified)";
    } else if (!preferredLocation || preferredLocation === "NONE") {
      resolvedLocation = "Open to Recommendations";
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
          preferredLocation: resolvedLocation,
          budgetRange,
          notes: notes.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || "Unable to submit consultation request.");
      } else {
        setFinalLocationDisplay(resolvedLocation);
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
    setCustomLocation("");
    setPreferredLocation("Open to Recommendations");
    setNotes("");
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#05070B]/85 p-2 sm:p-4 backdrop-blur-xl">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto overscroll-contain rounded-3xl border border-[#D4AF37]/35 bg-[#0B101B] p-4 sm:p-7 md:p-9 shadow-[0_20px_70px_rgba(0,0,0,0.85)]">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleReset}
          className="absolute right-5 top-5 rounded-full border border-[#D4AF37]/25 p-2 text-[#949BA6] hover:border-[#D4AF37] hover:text-[#F4F1EA] transition"
        >
          <X className="h-4 w-4" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-4 space-y-5">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-500/10">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono text-emerald-400">
              Consultation Scheduled • Stored in Database
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F8F9FA]">
              Consultation Request Received
            </h3>

            <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-[#D4AF37] font-semibold">{fullName}</span>. A Senior Real Estate Advisor from our Bhubaneswar Office has received your mandate for{" "}
              <span className="text-white font-medium">{finalLocationDisplay || "Open to Recommendations"}</span> ({budgetRange}).
            </p>

            {/* Advisory Office Address & Direct Lines */}
            <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#05070B] p-4 sm:p-5 text-left text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="font-sans font-semibold uppercase tracking-wider text-[#D4AF37] text-[11px]">
                  Bhubaneswar Consulting Office
                </span>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Open 9:30 AM – 7:30 PM
                </span>
              </div>

              <div className="flex items-start gap-2.5 text-[#CBD5E1]">
                <MapPin className="h-4 w-4 shrink-0 text-[#D4AF37] mt-0.5" />
                <div className="space-y-1">
                  <div className="font-medium text-white">
                    Infocity Corporate Corridor, Patia, Bhubaneswar, Odisha 751024
                  </div>
                  <a
                    href="https://www.google.com/maps?cid=17158658638632800577&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[#D4AF37] hover:underline"
                  >
                    <span>View Exact Google Maps Location</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-white/5">
                <div className="flex items-center gap-2 text-[#CBD5E1]">
                  <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>Direct: <a href="tel:+919777295707" className="text-white font-medium hover:underline">+91 9777295707</a></span>
                </div>
                <div className="flex items-center gap-2 text-[#CBD5E1]">
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span>WhatsApp: <a href="https://wa.me/919777295707?text=Hello%20Asset%20Magnets,%20I%20have%20submitted%20a%20consultation%20mandate." target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-medium hover:underline">+91 9777295707</a></span>
                </div>
              </div>
            </div>

            {/* Active Property Investment Corridors in this Project */}
            <div className="rounded-2xl border border-white/10 bg-[#05070B]/70 p-4 text-left text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-sans font-semibold uppercase tracking-wider text-[#A6B0BF] text-[10px]">
                <Compass className="h-3 w-3 text-[#D4AF37]" />
                <span>Prime Investment Corridors Audited in this Advisory:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  "Patia – Infocity",
                  "Pahala – NH16",
                  "Saheed Nagar Core",
                  "Trisulia Metro Belt",
                  "Kalinga Nagar – AIIMS",
                  "Sundarpada – Jatni",
                ].map((corridor) => (
                  <span
                    key={corridor}
                    className="rounded-md border border-[#D4AF37]/20 bg-[#0B101B] px-2 py-1 text-[10px] font-medium text-[#CBD5E1]"
                  >
                    📍 {corridor}
                  </span>
                ))}
              </div>
            </div>

            {/* Official Social Media Channels */}
            <div className="rounded-2xl border border-white/10 bg-[#05070B]/50 p-4 space-y-2.5">
              <div className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#D4AF37]">
                Connect Across Official Asset Magnets Channels:
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href="https://www.linkedin.com/company/assetmagnets/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Asset Magnets LinkedIn"
                  title="LinkedIn"
                  className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 hover:scale-105 transition shadow-sm"
                >
                  <Linkedin size={15} />
                </a>

                <a
                  href="https://www.instagram.com/assetmagnets?stkn=MWI2Ym1hZ3BwcGxvcQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Asset Magnets Instagram"
                  title="Instagram"
                  className="w-8 h-8 rounded-lg bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center text-white hover:opacity-85 hover:scale-105 transition shadow-sm"
                >
                  <Instagram size={15} />
                </a>

                <a
                  href="https://www.facebook.com/share/18EdgAhyAq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Asset Magnets Facebook"
                  title="Facebook"
                  className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white hover:bg-blue-600 hover:scale-105 transition shadow-sm"
                >
                  <Facebook size={15} />
                </a>

                <a
                  href="https://www.youtube.com/@assetmagnets/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Asset Magnets YouTube"
                  title="YouTube"
                  className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white hover:bg-red-500 hover:scale-105 transition shadow-sm"
                >
                  <Youtube size={15} />
                </a>

                <a
                  href="https://x.com/assetmagnets?t=0YQsy5Ns21ysFPLRhk_Vpw&s=09"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Asset Magnets X (Twitter)"
                  title="X (Twitter)"
                  className="w-8 h-8 rounded-lg bg-black border border-white/20 flex items-center justify-center text-white hover:text-gray-300 hover:border-white/40 hover:scale-105 transition shadow-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                  </svg>
                </a>

                <a
                  href="https://assetmagnets.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Asset Magnets Corporate Portal"
                  title="assetmagnets.com"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-3 py-1.5 text-xs font-mono font-medium text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#05070B] hover:scale-105 transition"
                >
                  <Globe size={13} />
                  <span>assetmagnets.com</span>
                  <ArrowUpRight size={11} />
                </a>
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
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
                      Target Corridor / Area
                    </label>
                    <span className="text-[10px] text-stone-muted font-normal lowercase">(optional)</span>
                  </div>
                  <select
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-3.5 py-2.5 text-xs text-[#F8F9FA] outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Open to Recommendations">Open to Recommendations / Any</option>
                    <option value="Patia – Infocity Corridor">Patia – Infocity Corridor</option>
                    <option value="Pahala – NH16 Villa Belt">Pahala – NH16 Villa Belt</option>
                    <option value="Saheed Nagar Core Luxury">Saheed Nagar Core Luxury</option>
                    <option value="Trisulia Metro Growth Belt">Trisulia Metro Growth Belt</option>
                    <option value="Kalinga Nagar – AIIMS Corridor">Kalinga Nagar – AIIMS</option>
                    <option value="Sundarpada – Jatni Belt">Sundarpada – Jatni Belt</option>
                    <option value="Jayadev Vihar / Nayapalli">Jayadev Vihar / Nayapalli</option>
                    <option value="All Bhubaneswar Premium">All Bhubaneswar Premium</option>
                    <option value="OTHER">Other / Custom Location...</option>
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

              {/* Conditional Custom Location Input when OTHER is selected (Optional) */}
              {preferredLocation === "OTHER" && (
                <div className="rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 p-3.5 space-y-1.5 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                      Custom Location / Micro-Market
                    </label>
                    <span className="text-[10px] text-stone-muted">(optional)</span>
                  </div>
                  <input
                    type="text"
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    placeholder="e.g. Khandagiri, Rasulgarh, Hanspal, Cuttack Ring Road, etc."
                    className="w-full rounded-lg border border-[#D4AF37]/35 bg-[#05070B] px-3 py-2 text-xs text-[#F8F9FA] placeholder-white/25 outline-none focus:border-[#D4AF37]"
                    autoFocus
                  />
                  <p className="text-[11px] text-stone-muted">
                    If left blank, our advisors will recommend prime locations aligned with your budget.
                  </p>
                </div>
              )}

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
