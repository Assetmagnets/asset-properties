"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  KeyRound,
  ShieldCheck,
  ArrowLeft,
  Eye,
  EyeOff,
  Database,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyingSession, setIsVerifyingSession] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // If already logged in, automatically navigate to /admin/vault
  useEffect(() => {
    async function checkExistingAuth() {
      try {
        const res = await fetch("/api/v1/auth/me");
        const data = await res.json();
        if (data.authenticated) {
          router.replace("/admin/vault");
          return;
        }
      } catch {
        // Proceed with login screen
      } finally {
        setIsVerifyingSession(false);
      }
    }
    checkExistingAuth();
  }, [router]);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Invalid administrator credentials.");
      } else {
        setSuccessMsg("Admin authentication verified. Loading dashboard...");
        setTimeout(() => {
          router.push("/admin/vault");
        }, 500);
      }
    } catch {
      setErrorMsg("Network or database connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070B] text-[#F4F1EA] flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#10B981]/10 blur-[140px]" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] hover:text-[#f3d375] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Public Sanctuary
        </Link>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 font-mono text-[11px] text-emerald-400">
          <Database className="h-3 w-3" />
          Neon PostgreSQL Live
        </div>
      </div>

      {/* Central Login Card */}
      <div className="relative z-10 mx-auto w-full max-w-md py-6">
        <div className="rounded-3xl border border-[#D4AF37]/35 bg-[#0B101B]/95 p-8 sm:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-xl">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/40 bg-[#05070B] shadow-gold-glow">
              <ShieldCheck className="h-7 w-7 text-[#D4AF37]" />
            </div>
            <div className="mt-5 font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              ASSET PROPERTIES ADVISORY
            </div>
            <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#F8F9FA]">
              Admin Login Portal
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#A6B0BF]">
              Enter your authorized administrator credentials to access stored client consultations and lead records.
            </p>
          </div>

          {errorMsg && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 text-xs text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#D4AF37]/70" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@assetmagnets.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] py-3 pl-10 pr-4 text-sm text-[#F8F9FA] placeholder-white/20 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3.5 h-4 w-4 text-[#D4AF37]/70" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] py-3 pl-10 pr-11 text-sm font-mono text-[#F8F9FA] placeholder-white/20 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-white/40 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] py-3.5 text-xs font-bold uppercase tracking-widest text-[#05070B] shadow-gold-glow hover:bg-[#e5c349] transition disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying Database Credentials...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-white/5 pt-4 text-center text-[11px] text-stone-muted">
            Authenticated Neon Serverless PostgreSQL Session • DPDP Act 2023 Encrypted
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 text-center text-xs text-[#A6B0BF]/60 font-mono">
        © {new Date().getFullYear()} Asset Properties Advisory • Bhubaneswar, Odisha
      </div>
    </div>
  );
}
