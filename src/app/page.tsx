import React from "react";
import type { Metadata } from "next";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";
import { getScoreOverrides } from "@/lib/prisma";
import SanctuaryOrchestrator from "@/components/SanctuaryOrchestrator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://properties.assetmagnets.com";

export const metadata: Metadata = {
  title: "ASSET PROPERTIES (@asset_properties17) — Private Real Estate Advisory Sanctuary | Bhubaneswar",
  description:
    "Institutional-grade real estate underwriting in Bhubaneswar (Patia, Infocity, Pahala, Saheed Nagar, Kalinga Nagar, Trisulia). 142 Projects Audited • 114 Rejected • 28 Approved with 100-Point Asset Score™ & Bhulekh Gharabari Verification.",
  alternates: {
    canonical: `${SITE_URL}`,
  },
  openGraph: {
    title: "ASSET PROPERTIES (@asset_properties17) — Bhubaneswar Private Real Estate Advisory",
    description:
      "Auditing, rejecting, and curating ultra-luxury flats, landed duplex villas, and Grade-A commercial spaces across Bhubaneswar. 142 Audited • 114 Rejected • 28 Approved.",
    url: `${SITE_URL}`,
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ASSET PROPERTIES — Bhubaneswar Private Real Estate Advisory Sanctuary",
      },
    ],
  },
};

export default async function HomePage() {
  const overrides = getScoreOverrides();

  const hydratedProperties = CURATED_PROPERTIES.map((prop) => ({
    ...prop,
    assetScoreTotal: overrides[prop.id] ?? prop.assetScoreTotal,
  }));

  return (
    <>
      <SanctuaryOrchestrator initialProperties={hydratedProperties} />

      {/* Semantic Server-Rendered Ground Truth for Search Bots & AI Crawlers */}
      <section className="sr-only" aria-label="Asset Properties Institutional Overview">
        <h1>ASSET PROPERTIES — Private Real Estate Advisory in Bhubaneswar, Odisha</h1>
        <p>
          Asset Properties (@asset_properties17) is an institutional private real estate advisory platform operating in Bhubaneswar, Odisha.
          We replace the conventional broker format with forensic underwriting, curating luxury flats, landed duplex villas, and Grade-A commercial spaces.
        </p>

        <h2>The 5-Act Advisory Scrollytelling Experience</h2>
        <ul>
          <li><strong>Act I: The Threshold:</strong> Ambient Nocturnal Dusk and Solar Daylight simulation reflecting Bhubaneswar micro-climates.</li>
          <li><strong>Act II: The Philosophy of Refusal:</strong> 142 projects audited across Bhubaneswar, 114 rejected (80% refusal rate) for Kissam defects, flood basin depressions, and phantom super built-up loading.</li>
          <li><strong>Act III: The 3-Persona Realm Switcher:</strong> Curated portfolios across Sky Sanctuaries (Patia &amp; Saheed Nagar Flats), Landed Estates (Pahala &amp; Trisulia Villas), and Monuments of Commerce (Infocity Offices).</li>
          <li><strong>Act IV: 100-Point Asset Score™ &amp; X-Ray Audit:</strong> 5-pillar mathematical evaluation including ORERA legal purity, structural Mivan grade, true Leica laser carpet efficiency, corridor growth, and Vastu sunlight.</li>
          <li><strong>Act V: Odisha Financial Lab:</strong> Stamp duty calculators (Male 7% vs. Female 6%), 2% IGR registration fees, and commercial rent-to-wealth conversion.</li>
        </ul>

        <h2>Bhubaneswar High-Growth Investment Corridors</h2>
        <ul>
          <li><strong>Patia &amp; Infocity:</strong> Tech corridor with 12.8% annual capital appreciation and 8.6% commercial yields.</li>
          <li><strong>Pahala &amp; Hanspal:</strong> Low-density landed courtyard villa corridor on NH-16 with 13.4% appreciation.</li>
          <li><strong>Trisulia Twin-City:</strong> Rapidly developing Cuttack-Bhubaneswar Metro corridor with 15.2% appreciation.</li>
          <li><strong>Saheed Nagar &amp; Jayadev Vihar:</strong> Central institutional core with irreplaceable high-UDS freehold plots.</li>
          <li><strong>Kalinga Nagar:</strong> AIIMS and healthcare institutional expansion zone with 13.9% appreciation.</li>
        </ul>
      </section>
    </>
  );
}
