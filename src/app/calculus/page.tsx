import React from "react";
import type { Metadata } from "next";
import CalculusClient from "./CalculusClient";
import { getDynamicProperties } from "@/lib/db-properties";

export const revalidate = 0; // Dynamic from Neon DB

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://properties.assetmagnets.com";
const SITE_URL = rawUrl.replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Odisha Financial & Loss Lab — Stamp Duty, True Carpet & Rental Yield Calculus",
  description:
    "Interactive financial calculators for Bhubaneswar luxury property: Female 6% vs. Male 7% Stamp Duty savings, 12-month cost of waiting, and commercial rent-to-wealth analysis.",
  alternates: {
    canonical: `${SITE_URL}/calculus`,
  },
  openGraph: {
    title: "Odisha Financial & Loss Lab — ASSET PROPERTIES Bhubaneswar",
    description:
      "Calculate true costs: 2% IGR registration fees, female stamp duty exemptions, and true carpet price vs. builder-quoted super built-up rates.",
    url: `${SITE_URL}/calculus`,
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Odisha Financial Lab — ASSET PROPERTIES Bhubaneswar",
      },
    ],
  },
  keywords: [
    "odisha stamp duty calculator 2026",
    "female stamp duty exemption odisha",
    "bhubaneswar property registration fees",
    "super built up loading formula",
    "real estate rental yield patia",
  ],
};

export default async function CalculusPage() {
  const properties = await getDynamicProperties();

  return (
    <>
      <CalculusClient initialProperties={properties} />

      {/* Semantic AEO & Search Engine Indexable Summary Block */}
      <section className="sr-only" aria-label="Odisha Real Estate Financial Calculus">
        <h2>Odisha Statutory Tax &amp; Carpet Area Financial Mathematics</h2>
        <p>
          Asset Properties provides precision financial models reflecting Odisha government IGR registration schedules,
          female owner concessions, and true carpet efficiency calculations.
        </p>
      </section>
    </>
  );
}
