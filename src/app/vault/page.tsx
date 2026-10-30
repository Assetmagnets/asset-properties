import React from "react";
import type { Metadata } from "next";
import VaultClient from "./VaultClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://properties.assetmagnets.com";

export const metadata: Metadata = {
  title: "The Private Vault — Off-Market & Pre-Launch Real Estate Mandates in Bhubaneswar",
  description:
    "Confidential institutional access to undisclosed landed estates, family office penthouses, and pre-launch allocations across Saheed Nagar, Nayapalli, and Kalinga Nagar. Request encrypted dossiers and schedule VIP site inspections.",
  alternates: {
    canonical: `${SITE_URL}/vault`,
  },
  openGraph: {
    title: "The Private Vault — Confidential Off-Market Mandates in Bhubaneswar",
    description:
      "Restricted institutional access to undisclosed landed estates, legacy generational plots, and pre-ORERA private investor allocations across Saheed Nagar, Patia, and Trisulia.",
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
    "off market real estate bhubaneswar",
    "confidential luxury property deals odisha",
    "pre launch property allocation patia",
    "family office real estate investments bhubaneswar",
    "vip property site inspection concierge",
    "ekamra kanan park view penthouses",
  ],
};

export default function VaultPage() {
  return (
    <>
      <VaultClient />

      {/* Semantic AEO & Off-Market Advisory Guide */}
      <section className="sr-only" aria-label="Confidential Off-Market Real Estate Advisory">
        <h2>What are Off-Market Real Estate Mandates in Bhubaneswar?</h2>
        <p>
          Off-market real estate mandates refer to high-value residential penthouses, pre-launch institutional builder allocations, and generational landed plots in Bhubaneswar that are not publicly advertised on broker portals or hoardings to protect seller privacy and price integrity.
        </p>
        <p>
          Asset Properties provides accredited High Net Worth Individuals (HNIs), doctors, and NRI investors with encrypted WhatsApp legal dossiers, uncut 4K drone surveys, and private 4:30 PM Golden-Hour on-site advisory visits accompanied by technical and Vastu documentation kits.
        </p>
      </section>
    </>
  );
}
