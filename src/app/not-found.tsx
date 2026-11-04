import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#05070B] text-[#F8F9FA] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#0B101B] shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <ShieldAlert className="h-8 w-8 text-[#D4AF37]" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37]">
            Error 404 • Mandate Unreachable
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#F8F9FA]">
            Sanctuary Not Found
          </h1>
          <p className="font-sans text-sm text-[#A6B0BF] leading-relaxed">
            The requested intelligence dossier, property realm, or underwriting document does not exist or has been archived into the off-market vault.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#05070B] shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:bg-[#e5c349] transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Sanctuary</span>
          </Link>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#0B101B] px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#F8F9FA] hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
          >
            <span>Explore Blog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
