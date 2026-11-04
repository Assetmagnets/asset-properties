import React from "react";
import type { Metadata } from "next";
import XRayClient from "./XRayClient";
import { getDynamicProperties } from "@/lib/db-properties";

export const revalidate = 0; // Dynamic from Neon DB

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://properties.assetmagnets.com";
const SITE_URL = rawUrl.replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Property Verification — 100-Point Audit | Bhubaneswar Real Estate",
  description:
    "Institutional underwriting metric evaluating legal purity (ORERA & BDA), structural Mivan grade, true carpet loading, corridor growth, and Vastu sunlight.",
  alternates: {
    canonical: `${SITE_URL}/verification`,
  },
  openGraph: {
    title: "100-Point Property Verification — ASSET PROPERTIES",
    description:
      "Every property in our portfolio is scored across 5 rigorous mathematical layers. Inspect scores and side-by-side market decoy comparisons.",
    url: `${SITE_URL}/verification`,
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "100-Point Asset Score X-Ray — ASSET PROPERTIES Bhubaneswar",
      },
    ],
  },
  keywords: [
    "real estate due diligence bhubaneswar",
    "100 point asset score",
    "orera legal check bhubaneswar",
    "carpet area audit patia",
    "property valuation odisha",
  ],
};

export default async function XRayPage() {
  const properties = await getDynamicProperties();

  return (
    <>
      <XRayClient initialProperties={properties} />

      {/* Semantic AEO & Search Engine Indexable Summary Block */}
      <section className="sr-only" aria-label="100-Point Asset Score Methodology">
        <h2>Institutional 100-Point Underwriting Framework</h2>
        <p>
          We replace emotional property buying with mathematical rigor. Every approved project must score at least 85/100 points
          to qualify for institutional recommendation.
        </p>
      </section>
    </>
  );
}
