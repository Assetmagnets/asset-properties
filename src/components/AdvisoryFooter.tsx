"use client";

import React from "react";
import Link from "next/link";
import {
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Globe,
  ArrowUpRight,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
} from "lucide-react";

export default function AdvisoryFooter() {
  return (
    <footer className="border-t border-[#D4AF37]/20 bg-[#05070B] py-20 text-center">
      <div className="mx-auto max-w-6xl px-6">
        <div className="font-serif text-2xl sm:text-3xl font-medium tracking-[0.2em] text-[#F8F9FA]">
          ASSET PROPERTIES ADVISORY
        </div>
        <div className="mt-3 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
          PATIA &nbsp;•&nbsp; PAHALA &nbsp;•&nbsp; SAHEED NAGAR &nbsp;•&nbsp;
          INFOCITY &nbsp;•&nbsp; KALINGA NAGAR
        </div>
        <p className="mt-4 font-sans text-xs sm:text-sm text-[#A6B0BF] max-w-2xl mx-auto leading-relaxed">
          Institutional-grade real estate consulting, forensic title underwriting, and private wealth advisory for high-net-worth acquisitions across Bhubaneswar, Odisha.
        </p>

        {/* Brand Network & Social Media Presence */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2.5">
            <a
              href="https://www.linkedin.com/company/assetmagnets/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Asset Magnets LinkedIn"
              title="LinkedIn"
              className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 hover:scale-105 transition-all shadow-sm"
            >
              <Linkedin size={14} />
            </a>

            <a
              href="https://www.instagram.com/assetmagnets?stkn=MWI2Ym1hZ3BwcGxvcQ=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Asset Magnets Instagram"
              title="Instagram"
              className="w-7 h-7 rounded bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center text-white hover:opacity-85 hover:scale-105 transition-all shadow-sm"
            >
              <Instagram size={14} />
            </a>

            <a
              href="https://www.facebook.com/share/18EdgAhyAq/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Asset Magnets Facebook"
              title="Facebook"
              className="w-7 h-7 rounded bg-blue-700 flex items-center justify-center text-white hover:bg-blue-600 hover:scale-105 transition-all shadow-sm"
            >
              <Facebook size={14} />
            </a>

            <a
              href="https://www.youtube.com/@assetmagnets/videos"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Asset Magnets YouTube"
              title="YouTube"
              className="w-7 h-7 rounded bg-red-600 flex items-center justify-center text-white hover:bg-red-500 hover:scale-105 transition-all shadow-sm"
            >
              <Youtube size={14} />
            </a>

            <a
              href="https://x.com/assetmagnets?t=0YQsy5Ns21ysFPLRhk_Vpw&s=09"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Asset Magnets X (Twitter)"
              title="X (Twitter)"
              className="w-7 h-7 rounded bg-black border border-white/20 flex items-center justify-center text-white hover:text-gray-300 hover:border-white/40 hover:scale-105 transition-all shadow-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
              </svg>
            </a>

            <a
              href="https://assetmagnets.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Asset Magnets Corporate Website"
              title="Asset Magnets Corporate Portal"
              className="w-7 h-7 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#05070B] hover:scale-105 transition-all shadow-sm"
            >
              <Globe size={14} />
            </a>
          </div>

          <a
            href="https://assetmagnets.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/35 bg-[#0B101B] px-3.5 py-1 text-xs font-mono font-medium text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 transition-all shadow-sm"
          >
            <Globe size={12} className="text-[#D4AF37]" />
            <span>assetmagnets.com</span>
            <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Direct Advisory Contact Strip */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
          <a
            href="tel:+919777295707"
            className="inline-flex items-center gap-1.5 text-[#CBD5E1] hover:text-[#D4AF37] transition"
          >
            <Phone size={13} className="text-[#D4AF37]" />
            <span>+91 9777295707</span>
          </a>
          <span className="text-white/20">•</span>
          <a
            href="https://wa.me/919777295707?text=Hello%20Asset%20Magnets,%20I%20would%20like%20to%20consult%20regarding%20curated%20properties."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#10B981] hover:underline transition"
          >
            <MessageCircle size={13} />
            <span>WhatsApp: +91 9777295707</span>
          </a>
          <span className="text-white/20">•</span>
          <a
            href="mailto:info@assetmagnets.com"
            className="inline-flex items-center gap-1.5 text-[#CBD5E1] hover:text-[#D4AF37] transition"
          >
            <Mail size={13} className="text-[#D4AF37]" />
            <span>info@assetmagnets.com</span>
          </a>
          <span className="text-white/20">•</span>
          <a
            href="https://www.google.com/maps?cid=17158658638632800577&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#CBD5E1] hover:text-[#D4AF37] transition"
          >
            <MapPin size={13} className="text-[#D4AF37]" />
            <span>Bhubaneswar HQ (Google Maps)</span>
            <ArrowUpRight size={10} />
          </a>
        </div>

        {/* Advisory Chambers Navigation Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 font-sans text-xs uppercase tracking-wider font-semibold text-[#CBD5E1]">
          <Link href="/" className="hover:text-[#D4AF37] transition">Sanctuary</Link>
          <span className="text-white/20">•</span>
          <Link href="/refusal" className="hover:text-[#D4AF37] transition">Philosophy of Refusal</Link>
          <span className="text-white/20">•</span>
          <Link href="/realms" className="hover:text-[#D4AF37] transition">Curated Realms</Link>
          <span className="text-white/20">•</span>
          <Link href="/xray" className="hover:text-[#D4AF37] transition">100-Point X-Ray™</Link>
          <span className="text-white/20">•</span>
          <Link href="/calculus" className="hover:text-[#D4AF37] transition">Odisha Financial Lab</Link>
          <span className="text-white/20">•</span>
          <Link href="/vault" className="hover:text-[#D4AF37] transition">Private Vault</Link>
        </div>

        {/* Statutory Government Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-8 font-sans text-xs uppercase tracking-wider font-medium text-[#A6B0BF]">
          <a
            href="https://rera.odisha.gov.in/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#D4AF37] transition flex items-center gap-1.5"
          >
            <span>Odisha RERA Portal</span>
            <span>↗</span>
          </a>
          <a
            href="https://bhulekh.ori.nic.in/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#D4AF37] transition flex items-center gap-1.5"
          >
            <span>Bhulekh Odisha RoR</span>
            <span>↗</span>
          </a>
          <a
            href="https://igrodisha.gov.in/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#D4AF37] transition flex items-center gap-1.5"
          >
            <span>IGR Odisha Revenue</span>
            <span>↗</span>
          </a>
          <Link href="/admin/vault" className="hover:text-[#D4AF37] transition flex items-center gap-1.5">
            <span>Admin RBAC Vault</span>
            <span>🔒</span>
          </Link>
        </div>

        {/* Advisory Office & Concierge Desk */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/5 pt-8 text-xs font-sans text-[#A6B0BF]">
          <div>
            <div className="font-semibold uppercase tracking-wider text-[#D4AF37]">Bhubaneswar Consulting Office</div>
            <div className="mt-1 text-[#CBD5E1]">Infocity Corporate Corridor, Patia, Bhubaneswar, Odisha 751024</div>
            <a
              href="https://www.google.com/maps?cid=17158658638632800577&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] text-[#D4AF37] hover:underline"
            >
              <MapPin size={11} />
              <span>Locate on Google Maps</span>
              <ArrowUpRight size={10} />
            </a>
          </div>
          <div>
            <div className="font-semibold uppercase tracking-wider text-[#D4AF37]">Corporate Flagship</div>
            <div className="mt-1 text-[#CBD5E1]">
              Asset Magnets • <a href="https://assetmagnets.com" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline inline-flex items-center gap-1 font-mono"><span>assetmagnets.com</span><ArrowUpRight size={10} /></a>
            </div>
          </div>
          <div>
            <div className="font-semibold uppercase tracking-wider text-[#D4AF37]">Private Concierge Desk</div>
            <div className="mt-1 text-[#CBD5E1] space-y-1">
              <div>
                Direct:{" "}
                <a
                  href="tel:+919777295707"
                  className="font-mono text-[#F8F9FA] hover:text-[#D4AF37] transition"
                >
                  +91 9777295707
                </a>
              </div>
              <div>
                Email:{" "}
                <a
                  href="mailto:info@assetmagnets.com"
                  className="font-mono text-[#D4AF37] hover:underline transition"
                >
                  info@assetmagnets.com
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="font-semibold uppercase tracking-wider text-[#D4AF37]">Underwriting Schedule</div>
            <div className="mt-1 text-[#CBD5E1]">Private Site Inspections: 4:30 PM Golden-Hour Slots by Appointment</div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6 font-sans text-xs text-[#A6B0BF]/70">
          DPDP Act 2023 AES-256 Encrypted &nbsp;•&nbsp; 15-Minute Dynamic Watermarked Dossier Engine &nbsp;•&nbsp; Zero Broker Spam Protocol
          <div className="mt-2 text-[#A6B0BF]/50">
            © {new Date().getFullYear()} Asset Properties Real Estate Advisory. Bhubaneswar, Odisha, India. All rights reserved. ORERA Advisory Compliance Standard.
          </div>
        </div>
      </div>
    </footer>
  );
}
