import React from "react";
import type { Metadata } from "next";
import RealmsClient from "./RealmsClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://assetproperties.in";

export const metadata: Metadata = {
  title: "Curated Real Estate Realms — Luxury Flats, Villas & Offices in Bhubaneswar",
  description:
    "Explore 28 approved luxury property mandates across Patia Infocity, Pahala NH-16, Trisulia Twin-City, and Saheed Nagar. 100% ORERA approved with 30-year Bhulekh Gharabari title verification.",
  alternates: {
    canonical: `${SITE_URL}/realms`,
  },
  openGraph: {
    title: "Curated Real Estate Realms — Luxury Flats, Duplex Villas & Commercial Offices",
    description:
      "Filtered across 28 approved mandates in Bhubaneswar. Every property carries full ORERA registration, 30-year Bhulekh title clearance, and Leica laser-verified carpet areas.",
    url: `${SITE_URL}/realms`,
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Curated Real Estate Realms — ASSET PROPERTIES Bhubaneswar",
      },
    ],
  },
  keywords: [
    "luxury flats in patia bhubaneswar",
    "duplex villa in pahala bhubaneswar",
    "trisulia twin city villas",
    "saheed nagar luxury apartments",
    "grade a commercial office infocity",
    "orera approved flats in bhubaneswar",
    "bhubaneswar real estate investment",
  ],
};

export default function RealmsPage() {
  return (
    <>
      <RealmsClient />
      
      {/* Semantic AEO & Search Engine Indexable Summary Block */}
      <section className="sr-only" aria-label="Bhubaneswar Curated Real Estate Overview">
        <h2>Curated Real Estate Portfolios in Bhubaneswar, Odisha</h2>
        <p>
          Asset Properties curates 28 institutional-grade real estate mandates across three distinct property realms in Bhubaneswar:
          Sky Sanctuaries (Ultra-Luxury Flats &amp; Penthouses in Patia and Saheed Nagar), Landed Estates (Gated Triplex &amp; Duplex Courtyard Villas in Pahala and Trisulia), and Monuments of Commerce (Grade-A LEED Platinum Office Suites in Infocity).
          Every approved property features verified ORERA registrations, 30+ year unbroken Bhulekh Record of Rights (RoR) Gharabari title chains, and audited loading ratios between 16% and 22%.
        </p>
      </section>
    </>
  );
}
