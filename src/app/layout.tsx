import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "ASSET PROPERTIES (@asset_properties17) — Private Real Estate Advisory Sanctuary | Bhubaneswar",
  description:
    "Institutional-grade real estate underwriting in Bhubaneswar (Patia, Infocity, Pahala, Saheed Nagar, Kalinga Nagar, Trisulia). 142 Projects Audited • 114 Rejected • 28 Approved with 100-Point Asset Score™ & Bhulekh Gharabari Verification.",
  openGraph: {
    title: "ASSET PROPERTIES — Bhubaneswar Private Real Estate Advisory",
    description:
      "Auditing, rejecting, and curating ultra-luxury flats, landed duplex villas, and Grade-A commercial spaces across Bhubaneswar.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-lighting="NOCTURNAL_DUSK">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-[#D4AF37]/30 selection:text-[#F4F1EA]">
        {/* 3% SVG Film Grain Overlay per frontend_design_motion_spec.md */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[90] opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
