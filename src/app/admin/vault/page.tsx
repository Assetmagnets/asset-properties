"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  ArrowLeft,
  Download,
  Video,
  Sliders,
  CheckCircle2,
  AlertOctagon,
} from "lucide-react";

interface SanitizedLead {
  id: string;
  fullName: string;
  whatsappNumberMasked: string;
  whatsappNumberEncrypted: string;
  whatsappNumberDecrypted: string | null;
  buyerPersona: string;
  coDecisionMakers: string[];
  preferredTourSlot: string | null;
  interestedPropertyTitle?: string;
  utmSource: string | null;
  status: string;
  createdAt: string;
}

export default function AdminVaultPage() {
  const [role, setRole] = useState<"SUPER_ADMIN" | "CONTENT_CURATOR">(
    "SUPER_ADMIN"
  );
  const [leads, setLeads] = useState<SanitizedLead[]>([]);
  const [rbacPolicy, setRbacPolicy] = useState("");
  const [scoreOverrides, setScoreOverrides] = useState<Record<string, number>>(
    {}
  );
  const [statusToast, setStatusToast] = useState<string | null>(null);

  const fetchVaultData = useCallback(async (activeRole: string) => {
    const res = await fetch("/api/v1/leads", {
      headers: { "x-admin-role": activeRole },
    });
    const data = await res.json();
    setLeads(data.leads || []);
    setRbacPolicy(data.rbacPolicy || "");
    setScoreOverrides(data.scoreOverrides || {});
  }, []);

  useEffect(() => {
    fetchVaultData(role);
  }, [role, fetchVaultData]);

  const handleOverrideScore = async (propertyId: string, newScore: number) => {
    setStatusToast(null);
    const res = await fetch("/api/v1/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-role": role,
      },
      body: JSON.stringify({
        action: "OVERRIDE_ASSET_SCORE",
        propertyId,
        newScore,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setStatusToast(`RBAC Blocked: ${data.message}`);
    } else {
      setStatusToast(
        `Asset Score™ updated to ${newScore}/100 for ${propertyId}`
      );
      fetchVaultData(role);
    }
  };

  const handleExportCSV = () => {
    if (role !== "SUPER_ADMIN") {
      setStatusToast(
        "RBAC Violation: CONTENT_CURATOR cannot export the master HNI database."
      );
      return;
    }
    const headers = "Lead ID,Full Name,Decrypted Phone,Persona,Property,Status\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.id}","${l.fullName}","${l.whatsappNumberDecrypted}","${l.buyerPersona}","${l.interestedPropertyTitle}","${l.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `asset_properties_hni_vault_${Date.now()}.csv`;
    a.click();
    setStatusToast("Encrypted HNI Lead Registry exported by SUPER_ADMIN.");
  };

  return (
    <div className="min-h-screen bg-[#05070B] text-[#F4F1EA] p-6 sm:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#D4AF37] hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Return to Public Advisory Sanctuary
            </Link>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-[#F4F1EA]">
              Internal RBAC Governance &amp; HNI Vault (`/admin/vault`)
            </h1>
            <p className="mt-1 font-mono text-xs text-[#949BA6]">
              DPDP Act 2023 Field-Level AES-256-GCM Decryption &amp; Role
              Separation Console
            </p>
          </div>

          {/* Role Switcher Simulator */}
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#D4AF37]/30 bg-[#0B101B] p-2">
            <span className="px-2 font-mono text-[10px] uppercase text-[#949BA6]">
              Simulate 2FA Role:
            </span>
            <button
              type="button"
              onClick={() => setRole("SUPER_ADMIN")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 font-mono text-xs transition ${
                role === "SUPER_ADMIN"
                  ? "bg-[#D4AF37] font-bold text-[#05070B]"
                  : "text-[#949BA6] hover:text-[#F4F1EA]"
              }`}
            >
              <KeyRound className="h-3.5 w-3.5" />
              SUPER_ADMIN (Founders)
            </button>
            <button
              type="button"
              onClick={() => setRole("CONTENT_CURATOR")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 font-mono text-xs transition ${
                role === "CONTENT_CURATOR"
                  ? "bg-[#2E9B68] font-bold text-[#F4F1EA]"
                  : "text-[#949BA6] hover:text-[#F4F1EA]"
              }`}
            >
              <Video className="h-3.5 w-3.5" />
              CONTENT_CURATOR (Marketing)
            </button>
          </div>
        </div>

        {/* Active RBAC Policy Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#D4AF37]/30 bg-[#0B101B] px-5 py-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-[#2E9B68]" />
            <div>
              <div className="font-mono text-xs font-semibold text-[#F4F1EA]">
                ACTIVE RBAC POLICY: {role}
              </div>
              <div className="text-xs text-[#949BA6]">{rbacPolicy}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-semibold transition ${
              role === "SUPER_ADMIN"
                ? "bg-[#D4AF37] text-[#05070B] hover:bg-[#e5c349]"
                : "border border-red-500/40 bg-red-500/10 text-red-300 cursor-not-allowed"
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            Export Master HNI Client CSV
          </button>
        </div>

        {statusToast && (
          <div className="flex items-center gap-2 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-3 font-mono text-xs text-[#D4AF37]">
            {statusToast.includes("Violation") ||
            statusToast.includes("Blocked") ? (
              <AlertOctagon className="h-4 w-4 text-red-400" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-[#2E9B68]" />
            )}
            {statusToast}
          </div>
        )}

        {/* HNI Encrypted Lead Table */}
        <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B] p-6">
          <h2 className="font-serif text-2xl text-[#F4F1EA]">
            HNI Advisory &amp; Golden-Hour Lead Registry ({leads.length} Records)
          </h2>
          <p className="mt-1 text-xs text-[#949BA6]">
            Phone numbers are stored with AES-256-GCM field-level encryption at
            rest. Switch to <code>CONTENT_CURATOR</code> above to verify that
            decrypted numbers are stripped server-side.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#D4AF37]/20 font-mono text-[10px] uppercase text-[#949BA6]">
                  <th className="pb-3 pr-4">Principal Client</th>
                  <th className="pb-3 pr-4">Masked / Decrypted WhatsApp</th>
                  <th className="pb-3 pr-4">AES-256 Ciphertext (At-Rest)</th>
                  <th className="pb-3 pr-4">Target Sanctuary &amp; Slot</th>
                  <th className="pb-3 pr-4">Co-Decision Kit</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4AF37]/10">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#05070B]/50">
                    <td className="py-3.5 pr-4 font-medium text-[#F4F1EA]">
                      {lead.fullName}
                      <div className="font-mono text-[10px] text-[#949BA6]">
                        {lead.buyerPersona}
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 font-mono">
                      {lead.whatsappNumberDecrypted ? (
                        <span className="text-[#2E9B68] font-semibold">
                          🔓 {lead.whatsappNumberDecrypted}
                        </span>
                      ) : (
                        <span className="text-[#D4AF37]">
                          🔒 {lead.whatsappNumberMasked} (RBAC Masked)
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 pr-4 font-mono text-[10px] text-[#949BA6] max-w-[180px] truncate">
                      {lead.whatsappNumberEncrypted}
                    </td>
                    <td className="py-3.5 pr-4">
                      <div className="text-[#F4F1EA]">
                        {lead.interestedPropertyTitle}
                      </div>
                      <div className="font-mono text-[10px] text-[#D4AF37]">
                        {lead.preferredTourSlot}
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 text-[#949BA6]">
                      {lead.coDecisionMakers.join(", ")}
                    </td>
                    <td className="py-3.5">
                      <span className="rounded-full border border-[#2E9B68]/40 bg-[#2E9B68]/15 px-2.5 py-0.5 font-mono text-[10px] text-[#2E9B68]">
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Asset Score Override & @asset_properties17 Reel Manager */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B] p-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#D4AF37]">
              <Sliders className="h-4 w-4" />
              100-Point Asset Score™ Override (SUPER_ADMIN Only)
            </div>
            <div className="mt-4 space-y-3">
              {CURATED_PROPERTIES.map((prop) => {
                const currentScore =
                  scoreOverrides[prop.id] ?? prop.assetScoreTotal;
                return (
                  <div
                    key={prop.id}
                    className="flex items-center justify-between rounded-xl border border-[#D4AF37]/15 bg-[#05070B] px-4 py-3"
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#F4F1EA]">
                        {prop.title}
                      </div>
                      <div className="font-mono text-[10px] text-[#949BA6]">
                        ORERA: {prop.oreraNumber}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-xl text-[#D4AF37]">
                        {currentScore}/100
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleOverrideScore(
                            prop.id,
                            Math.min(99, currentScore + 1)
                          )
                        }
                        className="rounded border border-[#D4AF37]/30 px-2 py-1 font-mono text-[10px] text-[#D4AF37] hover:bg-[#D4AF37]/20"
                      >
                        +1 Pt
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleOverrideScore(
                            prop.id,
                            Math.max(80, currentScore - 1)
                          )
                        }
                        className="rounded border border-[#D4AF37]/30 px-2 py-1 font-mono text-[10px] text-[#949BA6] hover:bg-[#D4AF37]/20"
                      >
                        -1 Pt
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B] p-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#2E9B68]">
              <Lock className="h-4 w-4" />
              Neon DB &amp; Vercel Security Telemetry
            </div>
            <ul className="mt-4 space-y-3 text-xs text-[#949BA6]">
              <li className="rounded-lg border border-[#D4AF37]/15 bg-[#05070B] p-3">
                <strong className="text-[#F4F1EA] block">
                  ✓ Dynamic Diagonal PDF/HTML Watermarking
                </strong>
                Stamps client mobile number &amp; IST timestamp across every
                dossier request (`POST /api/v1/concierge/dossier`).
              </li>
              <li className="rounded-lg border border-[#D4AF37]/15 bg-[#05070B] p-3">
                <strong className="text-[#F4F1EA] block">
                  ✓ 15-Minute HMAC-SHA256 Expiring Signed URLs
                </strong>
                Raw Bhulekh RoR &amp; EC documents automatically expire 15
                minutes after dispatch.
              </li>
              <li className="rounded-lg border border-[#D4AF37]/15 bg-[#05070B] p-3">
                <strong className="text-[#F4F1EA] block">
                  ✓ Sliding-Window Edge Rate Limiter (3 Req / IP / Hour)
                </strong>
                Blocks rival agencies from scraping the WhatsApp Dossier
                endpoint.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
