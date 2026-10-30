import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import JsonLdSchemas from "@/components/JsonLdSchemas";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://properties.assetmagnets.com";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ASSET PROPERTIES (@asset_properties17) — Private Real Estate Advisory Sanctuary | Bhubaneswar",
    template: "%s | ASSET PROPERTIES Bhubaneswar",
  },
  description:
    "Institutional-grade real estate underwriting in Bhubaneswar (Patia, Infocity, Pahala, Saheed Nagar, Kalinga Nagar, Trisulia). 142 Projects Audited • 114 Rejected • 28 Approved with 100-Point Asset Score™ & Bhulekh Gharabari Verification.",
  keywords: [
    "real estate advisory bhubaneswar",
    "luxury flats in patia bhubaneswar",
    "duplex villa in pahala bhubaneswar",
    "trisulia twin city villas",
    "saheed nagar luxury apartments",
    "commercial office space infocity patia",
    "orera approved projects bhubaneswar",
    "bhulekh odisha gharabari verification",
    "100 point asset score",
    "odisha stamp duty calculator",
    "asset properties 17",
    "nri property investment bhubaneswar",
    "pre launch off market vault bhubaneswar",
  ],
  authors: [{ name: "ASSET PROPERTIES Advisory Team", url: SITE_URL }],
  creator: "@asset_properties17",
  publisher: "ASSET PROPERTIES",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ASSET PROPERTIES (@asset_properties17) — Bhubaneswar Private Real Estate Advisory",
    description:
      "Auditing, rejecting, and curating ultra-luxury flats, landed duplex villas, and Grade-A commercial spaces across Bhubaneswar. 142 Audited • 114 Rejected • 28 Approved.",
    url: SITE_URL,
    siteName: "ASSET PROPERTIES",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ASSET PROPERTIES — Bhubaneswar Private Real Estate Advisory Sanctuary",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASSET PROPERTIES — Bhubaneswar Private Real Estate Advisory",
    description:
      "142 Projects Audited • 114 Rejected • 28 Approved with 100-Point Asset Score™ & Bhulekh Gharabari Verification.",
    site: "@asset_properties17",
    creator: "@asset_properties17",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/site.webmanifest",
  other: {
    "geo.region": "IN-OR",
    "geo.placename": "Bhubaneswar",
    "geo.position": "20.2961;85.8245",
    ICBM: "20.2961, 85.8245",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-lighting="NOCTURNAL_DUSK"
      className={`${cormorant.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <head>
        <JsonLdSchemas />
      </head>
      <body className="bg-[#05070B] text-[#F4F1EA] min-h-screen antialiased selection:bg-[#D4AF37]/30 selection:text-[#F4F1EA]">
        {/* 3% SVG Film Grain Overlay per frontend_design_motion_spec.md */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[90] opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        />
        {children}
      </body>
    </html>
  );
}
