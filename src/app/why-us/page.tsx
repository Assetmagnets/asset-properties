import React from "react";
import type { Metadata } from "next";
import RefusalClient from "./RefusalClient";
import { getDynamicProperties } from "@/lib/db-properties";

export const revalidate = 0; // Dynamic from Neon DB

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://properties.assetmagnets.com";
const SITE_URL = rawUrl.replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Why Us — Our Standards & Vetting Process | Bhubaneswar Real Estate",
  description:
    "Explore our rigorous forensic disqualification standards: non-Gharabari Kissam disputes, phantom super built-up loading traps (>35%), and flood-risk zoning.",
  alternates: {
    canonical: `${SITE_URL}/why-us`,
  },
  openGraph: {
    title: "Why Us — ASSET PROPERTIES Bhubaneswar",
    description:
      "142 Projects Audited. 114 Disqualified. Only 28 Approved. Read our uncompromised legal and engineering underwriting audit.",
    url: `${SITE_URL}/why-us`,
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "The Philosophy of Refusal — ASSET PROPERTIES Bhubaneswar",
      },
    ],
  },
  keywords: [
    "rejected real estate bhubaneswar",
    "orera project disqualification",
    "gharabari title dispute",
    "loading percentage trap",
    "safe real estate investment odisha",
  ],
};

export default async function RefusalPage() {
  const properties = await getDynamicProperties();

  return (
    <>
      <RefusalClient initialProperties={properties} />

      {/* Semantic AEO & Search Engine Indexable Summary Block */}
      <section className="sr-only" aria-label="Forensic Disqualification Overview">
        <h2>Forensic Underwriting Standards &amp; Project Disqualification Criteria</h2>
        <p>
          Asset Properties audits projects across 5 non-negotiable legal and structural criteria before issuing client recommendation.
        </p>
      </section>
    </>
  );
}
