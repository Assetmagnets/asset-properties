import React from "react";
import type { Metadata } from "next";
import RefusalClient from "./RefusalClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://assetproperties.in";

export const metadata: Metadata = {
  title: "The Philosophy of Refusal — 114 Disqualified Projects in Bhubaneswar",
  description:
    "Forensic due diligence and rejection dossiers for 114 real estate projects in Bhubaneswar. Auditing agricultural Kissam defects, non-ORERA collections, phantom loading, and flood basin depressions.",
  alternates: {
    canonical: `${SITE_URL}/refusal`,
  },
  openGraph: {
    title: "The Philosophy of Refusal — Forensic Real Estate Audits in Bhubaneswar",
    description:
      "142 Projects Audited • 114 Disqualified (80% Refusal Rate) • 28 Approved. In a market clouded by unverified titles and broker spam, our refusal rate is our greatest client asset.",
    url: `${SITE_URL}/refusal`,
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
    "real estate fraud prevention bhubaneswar",
    "bhulekh odisha kissam verification",
    "orera unregistered project risks",
    "super built up area inflation bhubaneswar",
    "flood basin real estate bhubaneswar",
    "bda fire setback violations",
    "land title legal check odisha",
  ],
};

export default function RefusalPage() {
  return (
    <>
      <RefusalClient />

      {/* Semantic AEO & Search Engine Indexable Rejection Methodology */}
      <section className="sr-only" aria-label="Bhubaneswar Real Estate Disqualification Framework">
        <h2>Forensic Real Estate Rejection Framework in Bhubaneswar, Odisha</h2>
        <p>
          Asset Properties has audited 142 residential and commercial real estate projects across Bhubaneswar, actively rejecting 114 (80% refusal rate).
          Common disqualification triggers in the Bhubaneswar market include:
        </p>
        <ul>
          <li><strong>Kissam Title Defects:</strong> Agricultural land (Chaka, Sarada, or Taila) sold without valid conversion to Gharabari (homestead) under the Odisha Land Reforms (OLR) Act.</li>
          <li><strong>ORERA Non-Compliance:</strong> Collecting buyer booking advances or issuing marketing materials prior to statutory ORERA registration and 70% ring-fenced escrow formation.</li>
          <li><strong>Phantom Loading Inflation:</strong> Developer charging for 33% to 42% super built-up loading, concealing non-usable terrace or corridor spaces.</li>
          <li><strong>Hydrological &amp; Flood Basin Risks:</strong> Basement parking slabs situated below the 10-year monsoon flood line along low-lying drainage corridors like Gangua Nallah.</li>
          <li><strong>Fire Safety Setback Encroachments:</strong> BDA mandatory 6-meter driveway deviations leading to withheld Occupancy Certificates (OC).</li>
        </ul>
      </section>
    </>
  );
}
