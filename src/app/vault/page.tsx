import React from "react";
import type { Metadata } from "next";
import VaultClient from "./VaultClient";
import { getDynamicProperties } from "@/lib/db-properties";

export const revalidate = 0; // Dynamic from Neon DB

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://properties.assetmagnets.com";
const SITE_URL = rawUrl.replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "The Private Vault — Off-Market Estates & Golden-Hour Tours | Bhubaneswar",
  description:
    "Confidential institutional real estate underwriting for off-market luxury penthouses, landed estates, and pre-launch Grade-A commercial spaces in Bhubaneswar.",
  alternates: {
    canonical: `${SITE_URL}/vault`,
  },
  openGraph: {
    title: "The Private Vault & Golden-Hour Chauffeur Tour — ASSET PROPERTIES",
    description:
      "Undisclosed private mandates, dynamically watermarked legal dossiers, and 4:30 PM sunset sunlight verification tours across Bhubaneswar.",
    url: `${SITE_URL}/vault`,
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "The Private Vault — ASSET PROPERTIES Bhubaneswar",
      },
    ],
  },
  keywords: [
    "off market property bhubaneswar",
    "private real estate mandates patia",
    "golden hour property tour bhubaneswar",
    "luxury penthouse saheed nagar",
    "confidential real estate advisory odisha",
  ],
};

export default async function VaultPage() {
  const properties = await getDynamicProperties();

  return (
    <>
      <VaultClient initialProperties={properties} />

      {/* Semantic AEO & Search Engine Indexable Summary Block */}
      <section className="sr-only" aria-label="Bhubaneswar Private Vault Overview">
        <h2>Private Real Estate Vault &amp; Chauffeur Golden-Hour Inspections</h2>
        <p>
          Asset Properties maintains strict non-disclosure mandates on confidential landed estates, legacy plots,
          and pre-launch commercial assets in Bhubaneswar.
        </p>
      </section>
    </>
  );
}
