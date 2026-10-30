import React from "react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://properties.assetmagnets.com";

export default function JsonLdSchemas() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "FinancialService", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: "ASSET PROPERTIES",
    alternateName: "@asset_properties17",
    legalName: "Asset Properties Private Real Estate Advisory",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/og-image.svg`,
    description:
      "Institutional-grade digital private wealth sanctuary and real estate underwriting platform in Bhubaneswar, Odisha. Auditing, rejecting, and curating ultra-luxury flats, landed duplex villas, and Grade-A commercial spaces.",
    telephone: "+91-9861000000",
    email: "concierge@assetmagnets.com",
    priceRange: "₹₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Bank Transfer, RTGS, Cheque, Statutory RERA Escrow",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Infocity Avenue, Patia",
      addressLocality: "Bhubaneswar",
      addressRegion: "Odisha",
      postalCode: "751024",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "20.3540",
      longitude: "85.8190",
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Patia, Bhubaneswar",
      },
      {
        "@type": "AdministrativeArea",
        name: "Infocity, Bhubaneswar",
      },
      {
        "@type": "AdministrativeArea",
        name: "Pahala, Bhubaneswar",
      },
      {
        "@type": "AdministrativeArea",
        name: "Hanspal, Bhubaneswar",
      },
      {
        "@type": "AdministrativeArea",
        name: "Trisulia, Twin-City Corridor",
      },
      {
        "@type": "AdministrativeArea",
        name: "Saheed Nagar, Bhubaneswar",
      },
      {
        "@type": "AdministrativeArea",
        name: "Jayadev Vihar & Nayapalli, Bhubaneswar",
      },
      {
        "@type": "AdministrativeArea",
        name: "Kalinga Nagar & AIIMS Belt, Bhubaneswar",
      },
      {
        "@type": "City",
        name: "Bhubaneswar",
      },
      {
        "@type": "City",
        name: "Cuttack",
      },
      {
        "@type": "State",
        name: "Odisha",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "19:30",
      },
    ],
    sameAs: [
      "https://instagram.com/asset_properties17",
      "https://www.linkedin.com/company/asset-properties-bhubaneswar",
    ],
    knowsAbout: [
      "Bhubaneswar Luxury Real Estate",
      "ORERA Title Verification",
      "Bhulekh Gharabari Mutation",
      "100-Point Asset Score™ Underwriting",
      "Odisha Stamp Duty & IGR Registration",
      "Duplex Villas in Pahala and Trisulia",
      "Grade-A Commercial Offices in Infocity Patia",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "ASSET PROPERTIES — Bhubaneswar Private Real Estate Advisory",
    description:
      "Exclusive underwriting, rejection dossiers, and curated luxury properties in Bhubaneswar, Odisha.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-IN",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does Asset Properties audit real estate in Bhubaneswar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Asset Properties inspects projects across 5 institutional pillars: 30-40 year Bhulekh Record of Rights (RoR) Gharabari title verification, BDA and ORERA registration checks, Leica laser distometer carpet area audits to eliminate ghost loading, structural and seismic engineering ratings, and heliodon sun-path analysis for Vastu compliance.",
        },
      },
      {
        "@type": "Question",
        name: "What is the 100-Point Asset Score™ for properties in Odisha?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The 100-Point Asset Score™ is a proprietary forensic underwriting matrix developed by Asset Properties. It allocates 25 points to Legal Purity (ORERA/BDA/Title), 20 points to Material Grade & Structural Forensics, 20 points to True RERA Carpet Efficiency, 20 points to Corridor Capital Appreciation & Infrastructure Catalysts, and 15 points to Solar Vastu & Micro-Climate.",
        },
      },
      {
        "@type": "Question",
        name: "What is the stamp duty rate in Odisha for male and female property buyers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In Odisha, the stamp duty rate is 7% for male buyers and 6% for female buyers (reflecting a 1% government concession for female ownership), plus a 2% IGR Odisha registration fee. Completed properties with an Occupancy Certificate (OC) attract 0% GST, whereas under-construction residential units incur 5% GST without Input Tax Credit.",
        },
      },
      {
        "@type": "Question",
        name: "Why are 80% of projects rejected by Asset Properties?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Out of 142 projects audited across Bhubaneswar, 114 were disqualified due to critical defects such as non-converted agricultural Chaka land, collecting advances prior to ORERA escrow registration, severe super built-up loading inflation exceeding 33%, basement flood risks along low-lying drainage depressions, and fire-safety setback encroachments.",
        },
      },
      {
        "@type": "Question",
        name: "How can NRIs verify Bhubaneswar real estate before investing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Outstation Odias and NRI investors can request verified WhatsApp dossiers from Asset Properties containing uncut 4K drone perimeter telemetry, certified Bhulekh Gharabari Patta records, ORERA registration certificates, and Leica laser floor plate measurements without needing to physically travel to Bhubaneswar.",
        },
      },
      {
        "@type": "Question",
        name: "Which corridors in Bhubaneswar offer the highest capital appreciation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The top growth corridors in Bhubaneswar include the Trisulia Twin-City Metro Belt (projected 15.2% CAGR), Kalinga Nagar AIIMS Corridor (13.9% CAGR), Pahala NH-16 Villa Corridor (13.4% CAGR), and Patia-Infocity IT Corridor (12.8% CAGR with 8.6% commercial office yields).",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
