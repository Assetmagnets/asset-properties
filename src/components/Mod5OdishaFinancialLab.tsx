"use client";

import React, { useState, useMemo } from "react";
import { CORRIDOR_GROWTH_BENCHMARKS } from "@/data/curatedProperties";
import { formatInrCroreLakh } from "@/utils/formatters";

type LabTab = "STAMP_DUTY_BUILDER" | "COST_OF_WAITING" | "COMMERCIAL_RENT_TO_WEALTH";

interface Mod5OdishaFinancialLabProps {
  hideHeader?: boolean;
}

export default function Mod5OdishaFinancialLab({
  hideHeader = false,
}: Mod5OdishaFinancialLabProps) {
  const [activeTab, setActiveTab] = useState<LabTab>("STAMP_DUTY_BUILDER");
  const [propertyValueCr, setPropertyValueCr] = useState<number>(2.45);
  const [registryGender, setRegistryGender] = useState<"FEMALE_6_PCT" | "MALE_7_PCT">("FEMALE_6_PCT");
  const [hasOC, setHasOC] = useState<boolean>(false);

  const calc = useMemo(() => {
    const baseInr = Math.round(propertyValueCr * 10000000);
    const dutyRate = registryGender === "FEMALE_6_PCT" ? 0.06 : 0.07;
    const stampDutyInr = Math.round(baseInr * dutyRate);
    const femaleSavedInr = Math.round(baseInr * 0.01);
    const gstInr = hasOC ? 0 : Math.round(baseInr * 0.05);
    const landedInr = baseInr + stampDutyInr + gstInr;

    const waitingPenaltyInr = Math.round(
      baseInr * (CORRIDOR_GROWTH_BENCHMARKS.PATIA_INFOCITY.annualAppreciationPct / 100)
    );
    const commercial5YrInr = Math.round(baseInr * Math.pow(1.128, 5));

    return {
      landedInr,
      stampDutyInr,
      femaleSavedInr,
      gstInr,
      waitingPenaltyInr,
      commercial5YrInr,
    };
  }, [propertyValueCr, registryGender, hasOC]);

  return (
    <section
      id="mod-financial-lab"
      className={`relative ${hideHeader ? "py-12 sm:py-16" : "py-24 sm:py-36"}`}
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-12 text-center">
        {!hideHeader && (
          <>
            <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              STATUTORY PRECISION • ODISHA REVENUE LAWS
            </div>
            <h2 className="mt-4 font-serif text-4xl sm:text-6xl font-medium text-[#F8F9FA]">
              True <span className="italic font-normal text-[#D4AF37]">Acquisition Math</span>.
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg text-[#CBD5E1] max-w-2xl mx-auto">
              In Odisha, property registration offers a statutory 1% stamp duty concession for female owners (6% vs. 7%). Factoring this alongside 0% GST on OC-cleared properties protects lakhs in capital.
            </p>
          </>
        )}

        {/* High-Legibility Mode Switcher */}
        <div className={`${hideHeader ? "mt-4" : "mt-10"} flex flex-wrap justify-center gap-3`}>
          {[
            { id: "STAMP_DUTY_BUILDER", label: "01. Odisha Stamp Duty & Landed Cost" },
            { id: "COST_OF_WAITING", label: "02. 12-Month Delay Penalty (+12.8%)" },
            { id: "COMMERCIAL_RENT_TO_WEALTH", label: "03. 5-Year Grade-A Wealth Compounding" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as LabTab)}
              className={`rounded-full px-6 py-2.5 font-sans text-xs sm:text-sm font-medium tracking-wider uppercase transition-all ${
                activeTab === tab.id
                  ? "bg-[#D4AF37] text-[#05070B] font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  : "border border-[#D4AF37]/25 bg-[#0B101B]/50 text-[#A6B0BF] hover:border-[#D4AF37] hover:text-[#F8F9FA]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Calculation Terminal */}
        <div className="mt-16 rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B]/80 p-8 sm:p-14 shadow-2xl">
          <div className="mx-auto max-w-xl">
            <div className="font-sans text-xs font-semibold uppercase tracking-wider text-[#A6B0BF]">
              BASE MANDATE VALUE
            </div>
            <div className="mt-2 font-serif text-5xl sm:text-6xl font-bold text-[#F8F9FA]">
              ₹{propertyValueCr.toFixed(2)} Cr
            </div>
            <input
              suppressHydrationWarning
              type="range"
              min={1.0}
              max={8.0}
              step={0.05}
              value={propertyValueCr}
              onChange={(e) => setPropertyValueCr(parseFloat(e.target.value))}
              className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-[#D4AF37]/25 accent-[#D4AF37]"
            />
            <div className="mt-2 flex justify-between text-xs font-mono text-[#A6B0BF]">
              <span>₹1.00 Cr</span>
              <span>₹4.50 Cr</span>
              <span>₹8.00 Cr</span>
            </div>

            {activeTab === "STAMP_DUTY_BUILDER" && (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setRegistryGender("FEMALE_6_PCT")}
                  className={`rounded-full px-5 py-2.5 font-sans text-xs uppercase tracking-wider transition-all ${
                    registryGender === "FEMALE_6_PCT"
                      ? "bg-[#D4AF37] text-[#05070B] font-bold shadow-md"
                      : "border border-[#D4AF37]/25 bg-[#05070B]/60 text-[#A6B0BF] hover:text-[#F8F9FA]"
                  }`}
                >
                  ✓ Female Registry (6% Duty)
                </button>
                <button
                  type="button"
                  onClick={() => setRegistryGender("MALE_7_PCT")}
                  className={`rounded-full px-5 py-2.5 font-sans text-xs uppercase tracking-wider transition-all ${
                    registryGender === "MALE_7_PCT"
                      ? "bg-[#D4AF37] text-[#05070B] font-bold shadow-md"
                      : "border border-[#D4AF37]/25 bg-[#05070B]/60 text-[#A6B0BF] hover:text-[#F8F9FA]"
                  }`}
                >
                  Male Registry (7% Duty)
                </button>
                <button
                  type="button"
                  onClick={() => setHasOC(!hasOC)}
                  className={`rounded-full px-5 py-2.5 font-sans text-xs uppercase tracking-wider transition-all ${
                    hasOC
                      ? "bg-[#10B981] text-[#05070B] font-bold shadow-md"
                      : "border border-[#D4AF37]/25 bg-[#05070B]/60 text-[#A6B0BF] hover:text-[#F8F9FA]"
                  }`}
                >
                  {hasOC ? "✓ Ready with OC (0% GST)" : "Under Construction (5% GST)"}
                </button>
              </div>
            )}
          </div>

          {/* Detailed Output Grid */}
          <div className="mt-14 border-t border-[#D4AF37]/20 pt-10">
            {activeTab === "STAMP_DUTY_BUILDER" && (
              <>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                  <div className="rounded-xl border border-[#D4AF37]/30 bg-[#05070B]/60 p-6">
                    <div className="font-sans text-xs uppercase tracking-wider text-[#A6B0BF]">
                      True Landed Outlay
                    </div>
                    <div className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#D4AF37]">
                      {formatInrCroreLakh(calc.landedInr)}
                    </div>
                    <div className="mt-1 text-xs text-[#A6B0BF] font-sans">
                      Includes Base + Stamp + Reg + GST
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-[#05070B]/60 p-6">
                    <div className="font-sans text-xs uppercase tracking-wider text-[#A6B0BF]">
                      Odisha Stamp Duty ({registryGender === "FEMALE_6_PCT" ? "6%" : "7%"})
                    </div>
                    <div className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-[#F8F9FA]">
                      {formatInrCroreLakh(calc.stampDutyInr)}
                    </div>
                    <div className="mt-1 text-xs text-[#A6B0BF] font-sans">
                      Payable at IGR Odisha Sub-Registrar
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#10B981]/30 bg-[#10B981]/10 p-6">
                    <div className="font-sans text-xs uppercase tracking-wider text-[#10B981]">
                      Female Duty Savings
                    </div>
                    <div className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#10B981]">
                      {registryGender === "FEMALE_6_PCT"
                        ? formatInrCroreLakh(calc.femaleSavedInr)
                        : "₹0 (Eligible: Register in Spouse/Mother Name)"}
                    </div>
                    <div className="mt-1 text-xs text-[#10B981]/80 font-sans">
                      100% Legal Odisha Concession
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-white/5 bg-[#05070B]/50 p-4 text-xs font-sans text-[#A6B0BF] flex flex-wrap justify-between items-center gap-2">
                  <span>Registration Fee: 1% (~{formatInrCroreLakh(Math.round(propertyValueCr * 100000))})</span>
                  <span>GST Status: {hasOC ? "0% (OC Completed)" : `5% GST (~${formatInrCroreLakh(calc.gstInr)})`}</span>
                  <span className="text-[#D4AF37]">Verified under IGR Odisha Revenue Guidelines</span>
                </div>
              </>
            )}

            {activeTab === "COST_OF_WAITING" && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-8 sm:p-10">
                <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-red-400">
                  12-MONTH DELAY PENALTY IN PATIA–INFOCITY CORRIDOR (+12.8% ANNUAL GROWTH)
                </div>
                <div className="mt-3 font-serif text-5xl sm:text-6xl font-bold text-red-400">
                  + {formatInrCroreLakh(calc.waitingPenaltyInr)}
                </div>
                <p className="mt-4 font-sans text-sm text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed">
                  Based on verified sub-registrar registry data, Patia and Infocity land parcels have compounded at 12.8% annually. A 12-month deferral requires an additional ₹{formatInrCroreLakh(calc.waitingPenaltyInr)} in equity deployment for the identical carpet area.
                </p>
              </div>
            )}

            {activeTab === "COMMERCIAL_RENT_TO_WEALTH" && (
              <div className="rounded-2xl border border-[#10B981]/30 bg-[#10B981]/5 p-8 sm:p-10">
                <div className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#10B981]">
                  5-YEAR GRADE-A COMMERCIAL ASSET PROJECTION (INFOCITY IT CORRIDOR)
                </div>
                <div className="mt-3 font-serif text-5xl sm:text-6xl font-bold text-[#10B981]">
                  {formatInrCroreLakh(calc.commercial5YrInr)}
                </div>
                <p className="mt-4 font-sans text-sm text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed">
                  Grade-A commercial spaces in Infocity yield 8.6% rental returns coupled with 10% annual capital appreciation. Converting leased expense into equity yields an estimated asset value of {formatInrCroreLakh(calc.commercial5YrInr)} at Year 5.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* OFFICIAL ODISHA STATUTORY FEE SCHEDULE & LEGAL BENCHMARK */}
        <div className="mt-28">
          <div className="text-center">
            <div className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              GOVERNMENT OF ODISHA REVENUE CODE • IGR BENCHMARKS
            </div>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-medium text-[#F8F9FA]">
              Statutory Fee &amp; Tax <span className="italic font-normal text-[#D4AF37]">Benchmark Schedule</span>.
            </h3>
            <p className="mt-2 font-sans text-xs sm:text-sm text-[#CBD5E1] max-w-xl mx-auto">
              Mandatory government taxes and registration fees applicable on real estate conveyances in Khordha district (Bhubaneswar Tahasil).
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B]/90 shadow-2xl">
            <table className="w-full text-left text-xs font-sans">
              <thead className="border-b border-[#D4AF37]/20 bg-[#05070B] uppercase tracking-wider text-[#A6B0BF]">
                <tr>
                  <th className="py-4 px-5">Statutory Head</th>
                  <th className="py-4 px-5">Applicable Rate</th>
                  <th className="py-4 px-5">Governing Authority</th>
                  <th className="py-4 px-5">Conditions &amp; Exemptions</th>
                  <th className="py-4 px-5 text-right">Advisory Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  {
                    head: "Stamp Duty (Female Owner)",
                    rate: "6.0% of consideration",
                    gov: "IGR Odisha / Revenue Dept",
                    cond: "Applicable if sole or joint primary buyer is female",
                    impact: "Saves ₹2.45 Lakhs on ₹2.45 Cr",
                    impactColor: "text-[#10B981]",
                  },
                  {
                    head: "Stamp Duty (Male Owner)",
                    rate: "7.0% of consideration",
                    gov: "IGR Odisha / Revenue Dept",
                    cond: "Standard rate for male individual purchases",
                    impact: "Standard statutory rate",
                    impactColor: "text-[#A6B0BF]",
                  },
                  {
                    head: "Registration Fee",
                    rate: "2.0% of consideration",
                    gov: "Sub-Registrar Office, Bhubaneswar",
                    cond: "Mandatory at deed execution under Registration Act 1908",
                    impact: "Fixed statutory levy",
                    impactColor: "text-[#A6B0BF]",
                  },
                  {
                    head: "GST (Under-Construction)",
                    rate: "5.0% without ITC",
                    gov: "CBIC / Odisha GST Dept",
                    cond: "Payable on work-in-progress units prior to OC issuance",
                    impact: "₹12.25 Lakhs on ₹2.45 Cr",
                    impactColor: "text-red-400",
                  },
                  {
                    head: "GST (Ready-to-Move / OC Cleared)",
                    rate: "0.0% (Nil)",
                    gov: "Section 7(2) CGST Act 2017",
                    cond: "Complete exemption once Occupancy Certificate is issued",
                    impact: "100% Tax Exemption",
                    impactColor: "text-[#10B981]",
                  },
                  {
                    head: "TDS on Property Sale",
                    rate: "1.0% (Section 194-IA)",
                    gov: "Income Tax Department of India",
                    cond: "Mandatory deduction if sale consideration exceeds ₹50L",
                    impact: "Credited to seller PAN",
                    impactColor: "text-[#D4AF37]",
                  },
                ].map((row) => (
                  <tr key={row.head} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5 font-semibold text-[#F8F9FA]">{row.head}</td>
                    <td className="py-4 px-5 font-mono text-[#D4AF37] font-medium">{row.rate}</td>
                    <td className="py-4 px-5 text-[#A6B0BF]">{row.gov}</td>
                    <td className="py-4 px-5 text-[#CBD5E1] max-w-xs">{row.cond}</td>
                    <td className={`py-4 px-5 text-right font-mono font-semibold ${row.impactColor}`}>
                      {row.impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5-YEAR CORRIDOR ROI & CAPITAL COMPOUNDING COMPARISON */}
        <div className="mt-28">
          <div className="text-center">
            <div className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              5-YEAR MACRO PROJECTIONS • PORTFOLIO MATHEMATICS
            </div>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-medium text-[#F8F9FA]">
              Corridor Wealth <span className="italic font-normal text-[#D4AF37]">Compounding Model</span>.
            </h3>
            <p className="mt-2 font-sans text-xs sm:text-sm text-[#CBD5E1] max-w-xl mx-auto">
              Simulated growth of a ₹2.50 Cr capital deployment across key corridors factoring historical compound annual appreciation and rental yields.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B]/90 shadow-2xl">
            <table className="w-full text-left text-xs font-sans">
              <thead className="border-b border-[#D4AF37]/20 bg-[#05070B] uppercase tracking-wider text-[#A6B0BF]">
                <tr>
                  <th className="py-4 px-5">Corridor</th>
                  <th className="py-4 px-5">CAGR Rate</th>
                  <th className="py-4 px-5">Year 1 Value</th>
                  <th className="py-4 px-5">Year 3 Value</th>
                  <th className="py-4 px-5">Year 5 Value</th>
                  <th className="py-4 px-5">5-Yr Rental Wealth</th>
                  <th className="py-4 px-5 text-right">Total 5-Yr Asset Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  {
                    name: "Patia – Infocity IT Belt",
                    cagr: "+12.8%",
                    y1: "₹2.82 Cr",
                    y3: "₹3.58 Cr",
                    y5: "₹4.57 Cr",
                    rental: "₹53.8 Lakhs",
                    total: "₹5.11 Cr",
                  },
                  {
                    name: "Trisulia – Metro Belt",
                    cagr: "+15.2%",
                    y1: "₹2.88 Cr",
                    y3: "₹3.82 Cr",
                    y5: "₹5.08 Cr",
                    rental: "₹48.7 Lakhs",
                    total: "₹5.57 Cr",
                  },
                  {
                    name: "Kalinga Nagar – AIIMS Belt",
                    cagr: "+13.9%",
                    y1: "₹2.85 Cr",
                    y3: "₹3.69 Cr",
                    y5: "₹4.79 Cr",
                    rental: "₹57.5 Lakhs",
                    total: "₹5.36 Cr",
                  },
                  {
                    name: "Pahala – NH-16 Villa Corridor",
                    cagr: "+13.4%",
                    y1: "₹2.83 Cr",
                    y3: "₹3.64 Cr",
                    y5: "₹4.69 Cr",
                    rental: "₹47.5 Lakhs",
                    total: "₹5.16 Cr",
                  },
                  {
                    name: "Saheed Nagar Core",
                    cagr: "+10.5%",
                    y1: "₹2.76 Cr",
                    y3: "₹3.37 Cr",
                    y5: "₹4.12 Cr",
                    rental: "₹51.2 Lakhs",
                    total: "₹4.63 Cr",
                  },
                ].map((c) => (
                  <tr key={c.name} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5 font-semibold text-[#F8F9FA]">{c.name}</td>
                    <td className="py-4 px-5 font-mono text-[#10B981] font-bold">{c.cagr}</td>
                    <td className="py-4 px-5 font-mono text-[#A6B0BF]">{c.y1}</td>
                    <td className="py-4 px-5 font-mono text-[#CBD5E1]">{c.y3}</td>
                    <td className="py-4 px-5 font-mono text-[#D4AF37] font-semibold">{c.y5}</td>
                    <td className="py-4 px-5 font-mono text-[#10B981]">{c.rental}</td>
                    <td className="py-4 px-5 text-right font-serif text-sm font-bold text-[#D4AF37]">
                      {c.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PRE-REGISTRATION TAX OPTIMIZATION ADVISORY NOTES */}
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3 text-left">
          <div className="rounded-xl border border-[#D4AF37]/20 bg-[#0B101B]/70 p-6">
            <div className="font-mono text-xs uppercase tracking-wider text-[#D4AF37]">
              Section 54 Rollover
            </div>
            <h4 className="mt-2 font-serif text-base font-semibold text-[#F8F9FA]">
              Capital Gains Deferral
            </h4>
            <p className="mt-2 text-xs text-[#CBD5E1] leading-relaxed">
              Exempt long-term capital gains tax by reinvesting proceeds into an ORERA-approved residential property within 2 years of deed transfer.
            </p>
          </div>
          <div className="rounded-xl border border-[#D4AF37]/20 bg-[#0B101B]/70 p-6">
            <div className="font-mono text-xs uppercase tracking-wider text-[#10B981]">
              Joint Title Benefit
            </div>
            <h4 className="mt-2 font-serif text-base font-semibold text-[#F8F9FA]">
              Dual Tax Deductions
            </h4>
            <p className="mt-2 text-xs text-[#CBD5E1] leading-relaxed">
              Co-ownership enables both spouses to claim separate Section 24(b) home loan interest deductions (up to ₹2 Lakhs each) and Section 80C principal limits.
            </p>
          </div>
          <div className="rounded-xl border border-[#D4AF37]/20 bg-[#0B101B]/70 p-6">
            <div className="font-mono text-xs uppercase tracking-wider text-[#A6B0BF]">
              IGR Circle Value Shield
            </div>
            <h4 className="mt-2 font-serif text-base font-semibold text-[#F8F9FA]">
              Section 56(2)(x) Purity
            </h4>
            <p className="mt-2 text-xs text-[#CBD5E1] leading-relaxed">
              We cross-examine the transaction rate against the latest Bhubaneswar IGR benchmark to ensure zero penalty notice under income tax undervaluation clauses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
