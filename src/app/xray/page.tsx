import React from "react";
import type { Metadata } from "next";
import XRayClient from "./XRayClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://properties.assetmagnets.com";

export const metadata: Metadata = {
  title: "100-Point Asset Score™ X-Ray — Forensic Real Estate Underwriting",
  description:
    "Explore the 100-Point Asset Score™ matrix for Bhubaneswar real estate: Legal Purity & Title (25pts), Structural Forensics (20pts), True RERA Carpet Efficiency (20pts), Corridor Growth (20pts), and Solar Vastu (15pts).",
  alternates: {
    canonical: `${SITE_URL}/xray`,
  },
  openGraph: {
    title: "100-Point Asset Score™ X-Ray — Forensic Underwriting in Bhubaneswar",
    description:
      "Inspect 5 institutional pillars: Gharabari Title, True Loading Index, Structural & Seismic Grade, Spatial Quality, and ORERA Escrow Compliance before making any real estate commitment.",
    url: `${SITE_URL}/xray`,
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "100-Point Asset Score™ X-Ray — ASSET PROPERTIES Bhubaneswar",
      },
    ],
  },
  keywords: [
    "100 point asset score bhubaneswar",
    "real estate audit methodology odisha",
    "leica laser carpet area verification",
    "mivan construction luxury apartments patia",
    "vastu audit heliodon simulation bhubaneswar",
    "property due diligence matrix",
  ],
};

export default function XRayPage() {
  return (
    <>
      <XRayClient />

      {/* Semantic AEO & Featured Snippet Candidate for 100-Point Asset Score */}
      <section className="sr-only" aria-label="100-Point Asset Score Underwriting Criteria">
        <h2>What is the 100-Point Asset Score™ for Bhubaneswar Real Estate?</h2>
        <p>
          The 100-Point Asset Score™ is an institutional real estate audit benchmark engineered by Asset Properties to assess properties in Bhubaneswar, Odisha.
          The evaluation evaluates five weighted forensic pillars:
        </p>
        <ol>
          <li><strong>Legal Purity &amp; Statutory Clearances (25 Points):</strong> Validates ORERA project registration, BDA sanctioned master plan approvals, 30+ year unbroken Encumbrance Certificates (EC), and direct Gharabari conversion on Bhulekh Odisha.</li>
          <li><strong>Structural Integrity &amp; Material Grade (20 Points):</strong> Audits Mivan aluminum formwork, seismic engineering, Saint-Gobain acoustic double glazing, and high-strength concrete cores.</li>
          <li><strong>True RERA Carpet Area Efficiency (20 Points):</strong> Conducted using handheld Leica laser distometers to detect ghost loading, rewarding projects with 16% to 22% true loading over market averages of 33%+.</li>
          <li><strong>Corridor Capital Growth &amp; Infrastructure (20 Points):</strong> Evaluates proximity to the Bhubaneswar-Cuttack Metro Phase-1, IT SEZ expansions, and 200ft CDP arterial roads.</li>
          <li><strong>Solar Vastu &amp; Micro-Climate Harmony (15 Points):</strong> Simulates morning 7:00 AM East natural daylight penetration and natural cross-ventilation.</li>
        </ol>
      </section>
    </>
  );
}
