# Prioritized SEO Action Plan
**Target URL:** `https://properties.assetmagnets.com/`  
**Project:** ASSET PROPERTIES Private Real Estate Advisory  
**Generated:** October 30, 2026

---

## Execution Matrix & Priority Roadmap

| Priority | Issue | Affected File(s) | Impact | Effort |
|:---:|---|---|:---:|:---:|
| **P0 (Critical)** | Next.js SSR Bailout stripping 95% of HTML payload | `src/components/SanctuaryShell.tsx` | High (Search Indexing) | Low (15 mins) |
| **P0 (Critical)** | Dual H1 collision & hidden keyword heading | `src/app/page.tsx`<br>`src/components/Act1HeroThreshold.tsx` | High (Ranking & Trust) | Low (15 mins) |
| **P0 (Critical)** | `.svg` Open Graph image breaking WhatsApp/LinkedIn previews | `public/og-image.png`<br>`src/app/layout.tsx` | High (Social CTR & Brand) | Medium (30 mins) |
| **P0 (Critical)** | Restricted `FAQPage` schema & dummy phone in JSON-LD | `src/components/JsonLdSchemas.tsx` | High (Schema Validity & Trust) | Low (15 mins) |
| **P1 (Warning)** | Title tag (92 chars) & Meta description (251 chars) overlength | `src/app/layout.tsx`<br>`src/app/page.tsx` | Medium (SERP CTR) | Low (10 mins) |
| **P1 (Warning)** | Missing explicit `robots` index/max-image-preview tag | `src/app/layout.tsx` | Medium (Search Snippets) | Low (5 mins) |
| **P1 (Warning)** | Missing `RealEstateListing` structured data on curated homes | `src/components/JsonLdSchemas.tsx` | Medium (Rich Results) | Medium (45 mins) |
| **P2 (Maintenance)**| Apple touch icon uses SVG instead of 180×180 PNG | `public/apple-touch-icon.png`<br>`src/app/layout.tsx` | Low (iOS Bookmark UX) | Low (15 mins) |
| **P2 (Maintenance)**| Consolidate social links and clean tracking params in footer | `src/components/AdvisoryFooter.tsx`<br>`src/components/JsonLdSchemas.tsx` | Low (Entity Disambiguation) | Low (20 mins) |

---

## Phase 1: Immediate Blockers (P0 Critical — Fix within 24–48 Hours)

### Step 1.1: Resolve Next.js SSR Bailout in `SanctuaryShell.tsx`
**Rationale:** `SmoothScrollProvider` is imported with `dynamic(() => ..., { ssr: false })` and wraps the entire page content. This forces Next.js to omit the entire page body during SSR, delivering only a 246-word fallback to search engine bots.
**Action:** Import `SmoothScrollProvider` statically. Since `SmoothScrollProvider` already contains client-only guards inside `useEffect`, static importing allows the server to render all child components into the initial HTML document.

```diff
--- a/src/components/SanctuaryShell.tsx
+++ b/src/components/SanctuaryShell.tsx
@@ -9,10 +9,7 @@ import { Phone, MessageCircle } from "lucide-react";
 
 // Lazy-load heavy components to reduce initial JS bundle
-// SmoothScrollProvider: Lenis smooth-scroll with native requestAnimationFrame loop
-const SmoothScrollProvider = dynamic(
-  () => import("@/components/SmoothScrollProvider"),
-  { ssr: false }
-);
+import SmoothScrollProvider from "@/components/SmoothScrollProvider";
```

---

### Step 1.2: Consolidate to a Single, Visible, Keyword-Rich `<h1>`
**Rationale:** Having an `<h1>` inside `class="sr-only"` on `page.tsx` while a second `<h1>` exists in `Act1HeroThreshold.tsx` violates heading hierarchy guidelines and risks search engine cloaking penalties.
**Action:**
1. Remove the hidden `<h1>` from the `sr-only` section in `src/app/page.tsx`.
2. Enhance the visible hero headline in `src/components/Act1HeroThreshold.tsx` with a semantically rich super-title or unified `<h1>`.

In `src/app/page.tsx`:
```diff
--- a/src/app/page.tsx
+++ b/src/app/page.tsx
@@ -45,7 +45,7 @@ export default async function HomePage() {
 
       {/* Semantic Server-Rendered Ground Truth for Search Bots & AI Crawlers */}
       <section className="sr-only" aria-label="Asset Properties Institutional Overview">
-        <h1>ASSET PROPERTIES — Private Real Estate Advisory in Bhubaneswar, Odisha</h1>
+        <div className="text-xl font-bold">ASSET PROPERTIES — Private Real Estate Advisory in Bhubaneswar, Odisha</div>
         <p>
```

In `src/components/Act1HeroThreshold.tsx`:
```diff
--- a/src/components/Act1HeroThreshold.tsx
+++ b/src/components/Act1HeroThreshold.tsx
@@ -79,8 +79,11 @@ export default function Act1HeroThreshold({
           <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.0, delay: 0.2 }}
             className="mt-8 font-serif text-5xl font-medium leading-[1.08] tracking-tight text-[#F8F9FA] sm:text-7xl lg:text-[88px]"
           >
+            <span className="sr-only">ASSET PROPERTIES — Private Real Estate Advisory in Bhubaneswar. </span>
             We refuse <span className="italic font-normal text-[#D4AF37]">80%</span> of what
             is built.
           </motion.h1>
```

---

### Step 1.3: Convert Social Preview Images from SVG to Raster (PNG / WebP)
**Rationale:** WhatsApp, Twitter, Facebook, and LinkedIn crawler bots discard SVG images for Open Graph previews.
**Action:**
1. Render a 1200×630px PNG version of the sanctuary card at `public/og-image.png`.
2. Update `src/app/layout.tsx` and `src/app/page.tsx` metadata:

```diff
--- a/src/app/layout.tsx
+++ b/src/app/layout.tsx
@@ -72,7 +72,8 @@ export const metadata: Metadata = {
     images: [
       {
-        url: "/og-image.svg",
+        url: "/og-image.png",
         width: 1200,
         height: 630,
+        type: "image/png",
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
-    images: ["/og-image.svg"],
+    images: ["/og-image.png"],
   },
```

---

### Step 1.4: Purge Restricted `FAQPage` Schema & Fix Phone Number in `JsonLdSchemas.tsx`
**Rationale:** Google restricted FAQ rich snippets in August 2023 to government/health authorities. Leaving it on a commercial real estate site provides zero SERP benefit. Furthermore, the dummy phone number `+91-9861000000` is a structured data guideline violation.
**Action:**
1. Replace `telephone: "+91-9861000000"` with the real company number `+91 9777295707`.
2. Add `hasMap` pointing to the verified Google Maps Place CID.
3. Remove the `faqSchema` JSON-LD script from the output.

In `src/components/JsonLdSchemas.tsx`:
```diff
--- a/src/components/JsonLdSchemas.tsx
+++ b/src/components/JsonLdSchemas.tsx
@@ -19,3 +19,4 @@ export default function JsonLdSchemas() {
-    telephone: "+91-9861000000",
-    email: "concierge@assetmagnets.com",
+    telephone: "+91-9777295707",
+    email: "info@assetmagnets.com",
+    hasMap: "https://www.google.com/maps?cid=17158658638632800577",
@@ -99,4 +100,8 @@ export default function JsonLdSchemas() {
     sameAs: [
       "https://instagram.com/asset_properties17",
       "https://www.linkedin.com/company/assetmagnets",
+      "https://www.facebook.com/share/18EdgAhyAq/",
+      "https://www.youtube.com/@assetmagnets",
+      "https://x.com/assetmagnets",
+      "https://assetmagnets.com"
     ],
@@ -194,5 +199,0 @@ export default function JsonLdSchemas() {
-      <script
-        type="application/ld+json"
-        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
-      />
```

---

## Phase 2: Quick Wins (P1 Warnings — Implement within 1–2 Weeks)

### Step 2.1: Optimize Title Tag and Meta Description Lengths
**Rationale:** Prevents Google SERP ellipsis truncation on mobile and desktop viewports.
**Recommended Metadata Config in `src/app/layout.tsx`:**

```typescript
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Private Real Estate Advisory Bhubaneswar | ASSET PROPERTIES",
    template: "%s | ASSET PROPERTIES Bhubaneswar",
  },
  description:
    "Bhubaneswar private real estate advisory. 142 projects audited, 114 rejected. Curating luxury flats & villas in Patia, Pahala & Saheed Nagar with Bhulekh verification.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // ...
};
```

---

### Step 2.2: Add Structured Data for Curated Real Estate Sanctuaries
**Rationale:** Injects rich Schema.org `RealEstateListing` data for approved projects (The Sovereign Crest in Patia, Atelier 27 in Saheed Nagar, Vanamali Courtyard Estates in Pahala).

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Approved Bhubaneswar Real Estate Sanctuaries",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "RealEstateListing",
        "name": "The Sovereign Crest",
        "description": "Single-Core Biophilic Sky Residences in Patia. 100% Gharabari verified, 22.3% true loading.",
        "url": "https://properties.assetmagnets.com/xray?slug=the-sovereign-crest-patia",
        "offers": {
          "@type": "Offer",
          "price": "24500000",
          "priceCurrency": "INR"
        }
      }
    }
  ]
}
```

---

## Phase 3: Strategic E-E-A-T & Maintenance (P2 — Next 30 Days)

1. **Named Practitioner Transparency:** Add a dedicated "Advisory Leadership & Legal Counsel" section crediting empaneled High Court advocates, structural engineering consultants, and surveying leads.
2. **Apple Touch Icon:** Generate an explicit 180×180 PNG at `public/apple-touch-icon.png` and update `layout.tsx` icons configuration.
3. **Canonical Social URLs:** Clean tracking parameters (`?stkn=...`, `?t=...`) from social media anchor links in `AdvisoryFooter.tsx`.
