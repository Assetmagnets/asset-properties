"use client";

import React from "react";
import Link from "next/link";

export default function AdvisoryFooter() {
  return (
    <footer className="border-t border-[#D4AF37]/10 bg-[#05070B] py-24 text-center">
      <div className="mx-auto max-w-5xl px-6">
        <div className="font-serif text-2xl tracking-[0.35em] text-[#F4F1EA]">
          ASSET PROPERTIES
        </div>
        <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.35em] text-[#D4AF37]">
          @asset_properties17 &nbsp;•&nbsp; PATIA &nbsp;•&nbsp; PAHALA &nbsp;•&nbsp;
          SAHEED NAGAR &nbsp;•&nbsp; KALINGA NAGAR
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 font-mono text-[9px] uppercase tracking-[0.28em] text-[#949BA6]">
          <a
            href="https://rera.odisha.gov.in/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#D4AF37] transition"
          >
            Odisha RERA
          </a>
          <a
            href="https://bhulekh.ori.nic.in/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#D4AF37] transition"
          >
            Bhulekh RoR
          </a>
          <Link href="/admin/vault" className="hover:text-[#D4AF37] transition">
            Admin RBAC Vault
          </Link>
        </div>

        <div className="mt-12 font-mono text-[9px] uppercase tracking-[0.28em] text-[#949BA6]/50">
          DPDP Act 2023 AES-256 Encrypted &nbsp;•&nbsp; 15-Minute Signed Dossier Protocol
        </div>
      </div>
    </footer>
  );
}
