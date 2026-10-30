import React from "react";
import type { Metadata } from "next";
import CalculusClient from "./CalculusClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://assetproperties.in";

export const metadata: Metadata = {
  title: "Odisha Real Estate Financial Lab — Stamp Duty & True Carpet Calculus",
  description:
    "Interactive financial calculators for Bhubaneswar real estate: Calculate Odisha stamp duty (Male 7% vs Female 6%), 2% IGR registration, true RERA carpet price, and commercial rent-to-wealth conversion.",
  alternates: {
    canonical: `${SITE_URL}/calculus`,
  },
  openGraph: {
    title: "Odisha Real Estate Financial Lab — Stamp Duty, True-Cost & Rent-to-Wealth Calculus",
    description:
      "De-anonymize the true price per square foot of RERA carpet area, calculate Odisha stamp duty (Male 7% vs Female 6%), and expose hidden loading inflation before signing any agreement.",
    url: `${SITE_URL}/calculus`,
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Odisha Real Estate Financial Lab — ASSET PROPERTIES Bhubaneswar",
      },
    ],
  },
  keywords: [
    "odisha stamp duty calculator male female",
    "igr odisha registration fee calculator",
    "bhubaneswar property registration cost",
    "rera carpet area vs super built up price",
    "commercial office rent to wealth conversion",
    "patia real estate price per square foot",
  ],
};

export default function CalculusPage() {
  return (
    <>
      <CalculusClient />

      {/* Semantic AEO & Featured Snippet Candidate for Odisha Stamp Duty */}
      <section className="sr-only" aria-label="Odisha Real Estate Stamp Duty and Registration Guide">
        <h2>What are the Stamp Duty and Registration Charges in Odisha?</h2>
        <p>
          Property registration in Odisha is governed by the Inspector General of Registration (IGR Odisha) and the Indian Stamp Act:
        </p>
        <ul>
          <li><strong>Stamp Duty for Male Buyers:</strong> 7% of the total property consideration value or benchmark valuation, whichever is higher.</li>
          <li><strong>Stamp Duty for Female Buyers:</strong> 6% of the consideration value, providing a 1% statutory concession to promote female property ownership.</li>
          <li><strong>Registration Fee:</strong> 2% of the property value, applicable across all transactions via IGR Odisha sub-registrar offices.</li>
          <li><strong>GST on Property:</strong> 5% on under-construction residential flats without Input Tax Credit (ITC); 0% GST on completed units with Occupancy Certificate (OC) issued.</li>
        </ul>
        <h3>How to Calculate True Carpet Area Cost in Bhubaneswar</h3>
        <p>
          To find the true effective price per square foot in Bhubaneswar, divide the all-inclusive project cost by the RERA-approved net usable carpet area rather than the builder&apos;s advertised super built-up area (SBUA). Typical projects with 35% loading inflate the advertised rate by up to 53% in real terms.
        </p>
      </section>
    </>
  );
}
