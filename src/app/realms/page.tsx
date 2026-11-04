import React from "react";
import type { Metadata } from "next";
import RealmsClient from "./RealmsClient";
import { getDynamicProperties } from "@/lib/db-properties";

export const revalidate = 0; // Dynamic from Neon DB

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://properties.assetmagnets.com";
const SITE_URL = rawUrl.replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Curated Real Estate Realms — Luxury Flats, Villas & Offices in Bhubaneswar",
  description:
    "Explore approved luxury property mandates across Patia Infocity, Pahala NH-16, Trisulia Twin-City, and Saheed Nagar. 100% ORERA approved with 30-year Bhulekh Gharabari title verification.",
  alternates: {
    canonical: `${SITE_URL}/realms`,
  },
  openGraph: {
    title: "Curated Real Estate Realms — Luxury Flats, Duplex Villas & Commercial Offices",
    description:
      "Filtered across approved mandates in Bhubaneswar. Every property carries full ORERA registration, 30-year Bhulekh title clearance, and Leica laser-verified carpet areas.",
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

export default async function RealmsPage() {
  const properties = await getDynamicProperties();

  return (
    <>
      <RealmsClient initialProperties={properties} />
      
      {/* Semantic AEO & Search Engine Indexable Summary Block */}
      <section className="sr-only" aria-label="Bhubaneswar Curated Real Estate Overview">
        <h2>Curated Real Estate Portfolios in Bhubaneswar, Odisha</h2>
        <p>
          Asset Properties curates institutional-grade real estate mandates across three distinct property realms in Bhubaneswar:
        </p>
        <ul>
          {properties.map((prop) => (
            <li key={prop.id}>
              <h3>{prop.title} — {prop.category}</h3>
              <p>Location: {prop.microLocation}, {prop.corridorDisplayName || prop.corridor}</p>
              <p>RERA Carpet: {prop.reraCarpetSqFt} sq.ft. | Total Asset Score: {prop.assetScoreTotal}/100</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
