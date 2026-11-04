"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CuratedProperty } from "@/types/property";
import CreateBlogModal from "@/components/CreateBlogModal";
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  Download,
  Sliders,
  CheckCircle2,
  LogOut,
  Database,
  RefreshCw,
  Trash2,
  UserCheck,
  Phone,
  MessageCircle,
  Search,
  Calendar,
  Building,
  User,
  Eye,
  X,
  FileText,
  Clock,
  Sparkles,
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
  leadType?: string;
  createdAt: string;
}

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  NEW_VIP: { label: "New Lead", color: "border-blue-500/40 bg-blue-500/10 text-blue-400" },
  GOLDEN_HOUR_CONFIRMED: { label: "Tour Confirmed", color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" },
  DOSSIER_DISPATCHED: { label: "Dossier Sent", color: "border-purple-500/40 bg-purple-500/10 text-purple-400" },
  CONTACTED: { label: "Contacted", color: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400" },
  IN_DISCUSSION: { label: "In Discussion", color: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
  LEGAL_UNDERWRITING: { label: "Underwriting", color: "border-cyan-500/40 bg-cyan-500/10 text-cyan-400" },
  MANDATE_CLOSED: { label: "Closed / Mandate Won", color: "border-green-500/40 bg-green-500/20 text-green-300" },
  ARCHIVED: { label: "Archived", color: "border-stone-500/40 bg-stone-500/10 text-stone-400" },
};

export default function AdminVaultPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [leads, setLeads] = useState<SanitizedLead[]>([]);
  const [scoreOverrides, setScoreOverrides] = useState<Record<string, number>>({});
  const [statusToast, setStatusToast] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [selectedLead, setSelectedLead] = useState<SanitizedLead | null>(null);
  const [showScoreManager, setShowScoreManager] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [properties, setProperties] = useState<CuratedProperty[]>([]);

  // Authenticate session on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/v1/auth/me");
        const data = await res.json();
        if (!data.authenticated) {
          router.push("/admin/login");
          return;
        }
        setCurrentUser(data.user);
      } catch {
        router.push("/admin/login");
      } finally {
        setAuthChecking(false);
      }
    }
    checkAuth();
  }, [router]);

  const fetchVaultData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const [leadsRes, propsRes] = await Promise.all([
        fetch("/api/v1/leads", { headers: { "x-admin-role": "SUPER_ADMIN" } }),
        fetch("/api/v1/properties"),
      ]);

      const leadsData = await leadsRes.json();
      const propsData = await propsRes.json();

      setLeads(leadsData.leads || []);
      setScoreOverrides(leadsData.scoreOverrides || {});
      if (propsData && propsData.properties) {
        setProperties(propsData.properties);
      }
    } catch {
      setStatusToast("Unable to synchronize with Neon Database.");
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (!authChecking) {
      fetchVaultData();
    }
  }, [authChecking, fetchVaultData]);

  const handleLogout = async () => {
    try {
      await fetch("/api/v1/auth/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
    }
  };

  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    setStatusToast(null);
    try {
      const res = await fetch("/api/v1/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-role": "SUPER_ADMIN",
        },
        body: JSON.stringify({
          action: "UPDATE_LEAD_STATUS",
          leadId,
          newStatus,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusToast(`Update failed: ${data.message}`);
      } else {
        setStatusToast("Lead status successfully updated in database.");
        fetchVaultData();
      }
    } catch {
      setStatusToast("Error updating status.");
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("Are you sure you want to permanently delete this consultation record?")) {
      return;
    }
    try {
      const res = await fetch("/api/v1/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-role": "SUPER_ADMIN",
        },
        body: JSON.stringify({
          action: "DELETE_LEAD",
          leadId,
        }),
      });
      if (res.ok) {
        setStatusToast("Record purged from database.");
        if (selectedLead?.id === leadId) setSelectedLead(null);
        fetchVaultData();
      }
    } catch {
      setStatusToast("Error deleting lead.");
    }
  };

  const handleOverrideScore = async (propertyId: string, newScore: number) => {
    setStatusToast(null);
    const res = await fetch("/api/v1/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-role": "SUPER_ADMIN",
      },
      body: JSON.stringify({
        action: "OVERRIDE_ASSET_SCORE",
        propertyId,
        newScore,
      }),
    });
    if (res.ok) {
      setStatusToast(`Asset Score updated to ${newScore}/100 in database.`);
      fetchVaultData();
    }
  };

  const handleExportCSV = () => {
    const headers = "Lead ID,Client Name,Phone,Channel,Property/Area,Preferences,Status,Created At\n";
    const rows = leads
      .map((l) => {
        const phone = l.whatsappNumberDecrypted || l.whatsappNumberMasked;
        const details = (l.coDecisionMakers || []).join(" | ").replace(/"/g, '""');
        return `"${l.id}","${l.fullName}","${phone}","${l.leadType || "TOUR"}","${l.interestedPropertyTitle}","${details}","${l.status}","${l.createdAt}"`;
      })
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `asset_properties_consultations_${Date.now()}.csv`;
    a.click();
    setStatusToast("CSV export ready and downloaded.");
  };

  // Filtered and searched leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Type filter
      if (filterType === "CONSULTATION" && lead.leadType !== "CONSULTATION") return false;
      if (filterType === "GOLDEN_HOUR" && lead.leadType !== "GOLDEN_HOUR" && lead.leadType) return false;
      if (filterType === "DOSSIER" && lead.leadType !== "DOSSIER") return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const phone = (lead.whatsappNumberDecrypted || lead.whatsappNumberMasked || "").toLowerCase();
        const name = (lead.fullName || "").toLowerCase();
        const prop = (lead.interestedPropertyTitle || "").toLowerCase();
        const status = (lead.status || "").toLowerCase();
        return name.includes(q) || phone.includes(q) || prop.includes(q) || status.includes(q);
      }
      return true;
    });
  }, [leads, filterType, searchQuery]);

  // Telemetry counts
  const countConsultations = leads.filter((l) => l.leadType === "CONSULTATION").length;
  const countTours = leads.filter((l) => l.leadType === "GOLDEN_HOUR" || !l.leadType).length;
  const countDossiers = leads.filter((l) => l.leadType === "DOSSIER").length;

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#05070B] text-[#F4F1EA] flex flex-col items-center justify-center p-6">
        <div className="flex items-center gap-3 font-mono text-sm text-[#D4AF37]">
          <RefreshCw className="h-5 w-5 animate-spin" />
          Authenticating Admin Vault Session...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070B] text-[#F4F1EA] p-5 sm:p-10">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Top Navbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D4AF37]/40 bg-[#0B101B] shadow-gold-glow">
              <ShieldCheck className="h-6 w-6 text-[#D4AF37]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#F8F9FA]">
                  Admin Advisory Dashboard
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald-400">
                  <Database className="h-3 w-3" />
                  Live Neon DB
                </span>
              </div>
              <p className="text-xs text-stone-muted mt-0.5">
                Stored Client Consultations, 4:30 PM Tour Reservations &amp; HNI Due Diligence
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#D4AF37]/30 bg-[#0B101B] px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:bg-[#D4AF37]/15 transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Public Sanctuary
            </Link>

            <div className="flex items-center gap-2 rounded-xl border border-[#D4AF37]/25 bg-[#0B101B] px-3.5 py-2 text-xs">
              <UserCheck className="h-4 w-4 text-[#D4AF37]" />
              <div className="font-mono text-xs text-[#F4F1EA]">{currentUser?.email}</div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-red-300 hover:bg-red-500/20 transition"
              title="Sign Out"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {statusToast && (
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#D4AF37]/40 bg-[#0B101B] px-5 py-3 text-xs sm:text-sm text-[#D4AF37] shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{statusToast}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatusToast(null)}
              className="font-mono text-xs text-white/40 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* 4 Key Metric Cards (Clean & Understandable) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B] p-5 shadow-sm">
            <div className="text-xs uppercase tracking-wider text-stone-muted font-medium flex items-center justify-between">
              <span>Total Stored Inquiries</span>
              <Building className="h-4 w-4 text-[#D4AF37]" />
            </div>
            <div className="mt-2 font-serif text-3xl font-bold text-[#F8F9FA]">
              {leads.length} Records
            </div>
            <div className="mt-1 text-xs text-emerald-400 font-mono">
              ✓ Saved in Neon PostgreSQL
            </div>
          </div>

          <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B] p-5 shadow-sm">
            <div className="text-xs uppercase tracking-wider text-stone-muted font-medium flex items-center justify-between">
              <span>Direct Consultations</span>
              <MessageCircle className="h-4 w-4 text-[#10B981]" />
            </div>
            <div className="mt-2 font-serif text-3xl font-bold text-[#10B981]">
              {countConsultations} Requests
            </div>
            <div className="mt-1 text-xs text-stone-muted">
              Advisory Phone / WhatsApp
            </div>
          </div>

          <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B] p-5 shadow-sm">
            <div className="text-xs uppercase tracking-wider text-stone-muted font-medium flex items-center justify-between">
              <span>Golden Hour Site Tours</span>
              <Calendar className="h-4 w-4 text-[#D4AF37]" />
            </div>
            <div className="mt-2 font-serif text-3xl font-bold text-[#D4AF37]">
              {countTours} Bookings
            </div>
            <div className="mt-1 text-xs text-[#D4AF37] font-mono">
              4:30 PM &amp; 7:00 AM Escorts
            </div>
          </div>

          <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B] p-5 shadow-sm">
            <div className="text-xs uppercase tracking-wider text-stone-muted font-medium flex items-center justify-between">
              <span>Verified Dossiers</span>
              <FileText className="h-4 w-4 text-purple-400" />
            </div>
            <div className="mt-2 font-serif text-3xl font-bold text-purple-400">
              {countDossiers} Dispatched
            </div>
            <div className="mt-1 text-xs text-stone-muted">
              Watermarked 15-Min Expiring
            </div>
          </div>
        </div>

        {/* Filter Tabs, Search & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B] p-4">
          {/* Channel Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "ALL", label: `All Inquiries (${leads.length})` },
              { id: "CONSULTATION", label: `Consultations (${countConsultations})` },
              { id: "GOLDEN_HOUR", label: `Site Tours (${countTours})` },
              { id: "DOSSIER", label: `Dossiers (${countDossiers})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterType(tab.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  filterType === tab.id
                    ? "bg-[#D4AF37] text-[#05070B] font-bold shadow-sm"
                    : "text-[#A6B0BF] hover:text-[#F8F9FA] hover:bg-[#05070B]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, phone, area..."
                className="rounded-xl border border-[#D4AF37]/25 bg-[#05070B] py-2 pl-9 pr-3 text-xs text-[#F8F9FA] placeholder-white/20 outline-none focus:border-[#D4AF37] w-48 sm:w-60"
              />
            </div>

            <button
              type="button"
              onClick={fetchVaultData}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-3 py-2 text-xs font-semibold text-[#D4AF37] hover:bg-[#D4AF37]/15 transition"
              title="Refresh records from database"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              Sync
            </button>

            <button
              type="button"
              onClick={() => setShowBlogModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:bg-emerald-500/20 transition shadow"
              title="Publish new intelligence article directly to website"
            >
              <FileText className="h-3.5 w-3.5" />
              + Write Blog
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#D4AF37] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#05070B] hover:bg-[#e5c349] transition shadow"
              title="Export Master Client List"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>

            <button
              type="button"
              onClick={() => setShowScoreManager(!showScoreManager)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#D4AF37]/35 bg-[#05070B] px-3 py-2 text-xs font-semibold text-[#D4AF37] hover:bg-[#D4AF37]/15 transition"
            >
              <Sliders className="h-3.5 w-3.5" />
              {showScoreManager ? "Hide Scores" : "Asset Scores"}
            </button>
          </div>
        </div>

        {/* Collapsible 100-Point Asset Score Manager */}
        {showScoreManager && (
          <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#0B101B] p-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
              <div>
                <h3 className="font-serif text-xl font-medium text-[#F8F9FA]">
                  100-Point Asset Score™ Synchronizer
                </h3>
                <p className="text-xs text-stone-muted mt-0.5">
                  Direct database adjustment of curated property scores (Neon PostgreSQL synchronized).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowScoreManager(false)}
                className="text-stone-muted hover:text-white text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {properties.map((prop) => {
                const currentScore = scoreOverrides[prop.id] ?? prop.assetScoreTotal;
                return (
                  <div
                    key={prop.id}
                    className="flex items-center justify-between rounded-xl border border-[#D4AF37]/15 bg-[#05070B] p-3.5"
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-[#F8F9FA]">
                        {prop.title}
                      </div>
                      <div className="font-mono text-[11px] text-stone-muted">
                        ORERA: {prop.oreraNumber} • {prop.priceDisplay}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-xl font-bold text-[#D4AF37]">
                        {currentScore}/100
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOverrideScore(prop.id, Math.min(99, currentScore + 1))}
                        className="rounded border border-[#D4AF37]/40 px-2 py-1 font-mono text-[11px] font-semibold text-[#D4AF37] hover:bg-[#D4AF37]/20 transition"
                      >
                        +1
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOverrideScore(prop.id, Math.max(70, currentScore - 1))}
                        className="rounded border border-[#D4AF37]/40 px-2 py-1 font-mono text-[11px] font-semibold text-stone-muted hover:text-white transition"
                      >
                        -1
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Clean Stored Inquiries & Consultations Table */}
        <div className="rounded-3xl border border-[#D4AF37]/25 bg-[#0B101B] p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/15">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#F8F9FA]">
                Stored Inquiries &amp; Consultations ({filteredLeads.length})
              </h2>
              <p className="text-xs text-stone-muted mt-1">
                Real-time entries from visitors consulting or reserving tours. Click on any client to view complete details.
              </p>
            </div>
          </div>

          {filteredLeads.length === 0 ? (
            <div className="py-16 text-center text-sm text-stone-muted space-y-2">
              <Building className="mx-auto h-8 w-8 text-[#D4AF37]/50" />
              <div>No records found matching your current filter or search query.</div>
            </div>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#D4AF37]/15 text-[11px] font-semibold uppercase tracking-wider text-stone-muted">
                    <th className="pb-3.5 pr-4">Client Name</th>
                    <th className="pb-3.5 pr-4">Phone / WhatsApp</th>
                    <th className="pb-3.5 pr-4">Channel</th>
                    <th className="pb-3.5 pr-4">Target Sanctuary / Area</th>
                    <th className="pb-3.5 pr-4">Preferences / Slot</th>
                    <th className="pb-3.5 pr-4">Status</th>
                    <th className="pb-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D4AF37]/10">
                  {filteredLeads.map((lead) => {
                    const cleanPhone = lead.whatsappNumberDecrypted || lead.whatsappNumberMasked;
                    const rawDigits = cleanPhone.replace(/\D/g, "").slice(-10);
                    const statusConfig = STATUS_LABELS[lead.status] || {
                      label: lead.status,
                      color: "border-stone-500/40 bg-stone-500/10 text-stone-300",
                    };

                    return (
                      <tr
                        key={lead.id}
                        className="hover:bg-[#05070B]/60 transition-colors cursor-pointer"
                        onClick={() => setSelectedLead(lead)}
                      >
                        {/* Client Name */}
                        <td className="py-4 pr-4">
                          <div className="font-semibold text-[#F8F9FA] hover:text-[#D4AF37] transition">
                            {lead.fullName}
                          </div>
                          <div className="text-[11px] text-stone-muted mt-0.5">
                            {lead.buyerPersona}
                          </div>
                        </td>

                        {/* Phone with WhatsApp and Call buttons */}
                        <td className="py-4 pr-4" onClick={(e) => e.stopPropagation()}>
                          <div className="font-mono text-xs font-semibold text-emerald-400">
                            {cleanPhone}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            {rawDigits && (
                              <>
                                <a
                                  href={`https://wa.me/91${rawDigits}?text=Hello%20${encodeURIComponent(
                                    lead.fullName
                                  )},%20this%20is%20Asset%20Properties%20Advisory%20regarding%20your%20consultation%20mandate.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 rounded bg-[#10B981]/15 border border-[#10B981]/30 px-2 py-0.5 font-mono text-[10px] text-emerald-300 hover:bg-[#10B981] hover:text-[#05070B] transition"
                                  title="Chat on WhatsApp"
                                >
                                  <MessageCircle className="h-3 w-3" />
                                  <span>WhatsApp</span>
                                </a>

                                <a
                                  href={`tel:+91${rawDigits}`}
                                  className="inline-flex items-center gap-1 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2 py-0.5 font-mono text-[10px] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#05070B] transition"
                                  title="Direct Phone Call"
                                >
                                  <Phone className="h-3 w-3" />
                                  <span>Call</span>
                                </a>
                              </>
                            )}
                          </div>
                        </td>

                        {/* Channel Badge */}
                        <td className="py-4 pr-4">
                          {lead.leadType === "CONSULTATION" ? (
                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-sans text-[11px] font-medium text-emerald-300">
                              💬 Consultation
                            </span>
                          ) : lead.leadType === "DOSSIER" ? (
                            <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 font-sans text-[11px] font-medium text-purple-300">
                              📄 Dossier Gate
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2.5 py-0.5 font-sans text-[11px] font-medium text-[#D4AF37]">
                              🌅 4:30 PM Tour
                            </span>
                          )}
                          <div className="font-mono text-[10px] text-stone-muted mt-1">
                            {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>

                        {/* Interested Property */}
                        <td className="py-4 pr-4 max-w-[200px]">
                          <div className="font-medium text-[#F4F1EA] truncate">
                            {lead.interestedPropertyTitle || "Bhubaneswar Advisory"}
                          </div>
                          <div className="text-[11px] text-stone-muted truncate mt-0.5">
                            {lead.preferredTourSlot || "Standard Request"}
                          </div>
                        </td>

                        {/* Preferences / Kit */}
                        <td className="py-4 pr-4 text-xs text-stone-muted max-w-[180px]">
                          <div className="truncate">
                            {lead.coDecisionMakers?.length > 0
                              ? lead.coDecisionMakers.join(", ")
                              : "Direct Mandate"}
                          </div>
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-4 pr-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                            className="rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-2.5 py-1 text-xs font-mono font-medium text-emerald-400 outline-none focus:border-[#D4AF37]"
                          >
                            <option value="NEW_VIP">New Lead</option>
                            <option value="CONTACTED">Contacted</option>
                            <option value="IN_DISCUSSION">In Discussion</option>
                            <option value="GOLDEN_HOUR_CONFIRMED">Tour Confirmed</option>
                            <option value="DOSSIER_DISPATCHED">Dossier Sent</option>
                            <option value="LEGAL_UNDERWRITING">Underwriting</option>
                            <option value="MANDATE_CLOSED">Mandate Closed</option>
                            <option value="ARCHIVED">Archived</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedLead(lead)}
                              className="rounded-lg p-1.5 text-stone-muted hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition"
                              title="View Full Client Slip"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteLead(lead.id)}
                              className="rounded-lg p-1.5 text-stone-muted hover:text-red-400 hover:bg-red-500/10 transition"
                              title="Delete Record"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Client Detail Slip Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070B]/85 p-4 backdrop-blur-xl">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#D4AF37]/40 bg-[#0B101B] p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.9)]">
            <button
              type="button"
              onClick={() => setSelectedLead(null)}
              className="absolute right-5 top-5 rounded-full border border-[#D4AF37]/25 p-2 text-stone-muted hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 font-mono text-[11px] text-[#D4AF37] uppercase">
                {selectedLead.leadType || "CONSULTATION"}
              </span>
              <span className="text-xs font-mono text-stone-muted">
                ID: {selectedLead.id}
              </span>
            </div>

            <h3 className="mt-3 font-serif text-2xl font-medium text-[#F8F9FA]">
              {selectedLead.fullName}
            </h3>
            <p className="text-xs text-stone-muted mt-0.5">{selectedLead.buyerPersona}</p>

            <div className="mt-5 rounded-2xl border border-[#D4AF37]/20 bg-[#05070B] p-4 space-y-3 text-xs">
              <div>
                <span className="text-stone-muted block text-[11px] uppercase">Phone Number</span>
                <span className="font-mono text-sm font-semibold text-emerald-400">
                  {selectedLead.whatsappNumberDecrypted || selectedLead.whatsappNumberMasked}
                </span>
              </div>

              <div>
                <span className="text-stone-muted block text-[11px] uppercase">Target Mandate / Area</span>
                <span className="text-sm font-medium text-[#F8F9FA]">
                  {selectedLead.interestedPropertyTitle}
                </span>
              </div>

              <div>
                <span className="text-stone-muted block text-[11px] uppercase">Preferred Mode / Slot</span>
                <span className="text-sm font-mono text-[#D4AF37]">
                  {selectedLead.preferredTourSlot}
                </span>
              </div>

              <div>
                <span className="text-stone-muted block text-[11px] uppercase">Details &amp; Notes</span>
                <div className="text-xs text-[#CBD5E1] space-y-1 mt-1">
                  {(selectedLead.coDecisionMakers || []).map((note, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="text-[#D4AF37]">•</span>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-stone-muted block text-[11px] uppercase">Submitted Date</span>
                <span className="font-mono text-[11px] text-[#CBD5E1]">
                  {new Date(selectedLead.createdAt).toLocaleString("en-IN", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                href={`https://wa.me/91${(
                  selectedLead.whatsappNumberDecrypted || selectedLead.whatsappNumberMasked
                ).replace(/\D/g, "").slice(-10)}?text=Hello%20${encodeURIComponent(
                  selectedLead.fullName
                )},%20this%20is%20Asset%20Properties%20Advisory%20regarding%20your%20mandate.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#10B981] py-3 text-xs font-bold uppercase tracking-wider text-[#05070B] hover:bg-emerald-400 transition"
              >
                <MessageCircle className="h-4 w-4" />
                Message on WhatsApp
              </a>

              <a
                href={`tel:+91${(
                  selectedLead.whatsappNumberDecrypted || selectedLead.whatsappNumberMasked
                ).replace(/\D/g, "").slice(-10)}`}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-[#D4AF37] py-3 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:bg-[#D4AF37]/15 transition"
              >
                <Phone className="h-4 w-4" />
                Call Client
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Direct Neon Database Article Publisher Modal */}
      <CreateBlogModal
        isOpen={showBlogModal}
        onClose={() => setShowBlogModal(false)}
        onPostCreated={() => {
          setStatusToast("New intelligence article published live to Neon Database!");
        }}
      />
    </div>
  );
}
