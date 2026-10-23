# Technical Architecture & Data Workflow
## ASSET PROPERTIES — Node.js, PostgreSQL, Prisma & Vercel Stack

---

### 1. System Architecture Stack
To achieve instantaneous page loads on Vercel while running a relational PostgreSQL database with Prisma, the platform uses a modern **Serverless Edge + Node.js API Architecture**:

* **Frontend Framework:** React 18+ with **Next.js (App Router)** for Server-Side Rendering (SSR), SEO metadata for Instagram link previews, and React Server Components.
* **Backend Runtime:** **Node.js** via Next.js Route Handlers (`/api/*`) + Server Actions running on Vercel Serverless Functions.
* **Database:** **PostgreSQL** hosted on **Neon DB** (Serverless Postgres with connection pooling and autoscaling).
* **ORM:** **Prisma ORM** with `@prisma/adapter-neon` for low-latency serverless database queries.
* **Media & Video CDN:** Cloudinary or AWS S3 + CloudFront for streaming 4K drone tours, `@asset_properties17` vertical Reels, and watermarked legal PDFs.
* **External Integrations:** WhatsApp Cloud API (Meta/Interakt) for instant PDF dossier delivery.

```
[Client Browser / IG In-App Browser]
        │  (HTTPS / Vercel Edge Network)
        ▼
[Next.js React Frontend (GSAP + Lenis + Framer Motion)]
        │
        ├──► Static/ISR Cache (Curated Properties & Corridor Data)
        │
        └──► [Node.js Serverless API Layer (/api/v1/*)]
                   │
                   ├──► [Prisma ORM Client (Connection Pooler)]
                   │           │
                   │           ▼
                   │    [PostgreSQL (Neon DB)]
                   │
                   └──► [WhatsApp Business API + CRM Webhook]
```

### 2. Database Schema Blueprint (`schema.prisma`)
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum AssetCategory {
  LUXURY_FLAT
  LANDED_VILLA
  COMMERCIAL_OFFICE
}

enum CorridorZone {
  PATIA_INFOCITY
  PAHALA_NH16
  SAHEED_NAGAR_CORE
  KALINGA_NAGAR_AIIMS
  TRISULIA_METRO_BELT
  SUNDARPADA_JATNI
}

model Property {
  id                    String        @id @default(cuid())
  slug                  String        @unique
  title                 String
  category              AssetCategory
  corridor              CorridorZone
  microLocation         String
  
  basePriceInr          BigInt
  pricePerSqFt          Int
  superBuiltUpSqFt      Int
  reraCarpetSqFt        Int
  loadingPercentage     Float
  udsLandSqFt           Int?
  estimatedRentalYield  Float?

  oreraNumber           String        @unique
  oreraVerifiedUrl      String?
  bdaSanctionNumber     String?
  kissamStatus          String        @default("Gharabari Verified")
  ecYearsVerified       Int           @default(30)
  approvedBanks         String[]
  
  assetScoreTotal       Int
  scoreLegalPurity      Int
  scoreMaterialGrade    Int
  scoreCorridorGrowth   Int
  scoreCarpetEfficiency Int
  scoreVastuLight       Int

  curatorStrengths      String[]
  curatorTradeOffNote   String
  idealBuyerPersona     String

  dayHeroImageUrl       String
  duskHeroImageUrl      String
  rawSiteVideoUrl       String?
  instagramReelUrl      String?
  isOffMarketVault      Boolean       @default(false)
  
  createdAt             DateTime      @default(now())
  updatedAt             DateTime      @updatedAt
  leads                 AdvisoryLead[]
}

model AdvisoryLead {
  id                    String        @id @default(cuid())
  fullName              String
  whatsappNumber        String
  buyerPersona          String
  coDecisionMakers      String[]
  preferredTourSlot     String?
  interestedPropertyId  String?
  property              Property?     @relation(fields: [interestedPropertyId], references: [id])
  utmSource             String?
  status                String        @default("NEW_VIP")
  createdAt             DateTime      @default(now())
}
```

### 3. Core Data & Lead Workflow
1. **Instagram Handoff:** User clicks link in `@asset_properties17` bio (`?utm_source=instagram`).
2. **Edge Hydration:** Vercel serves the pre-rendered Nocturnal Luxury shell in `<150ms`.
3. **Interactive Audit:** User tests Odisha stamp duty and Asset Score. Client-side state updates instantly at 60fps.
4. **Dossier Request:** User requests Legal Verification Dossier on WhatsApp.
5. **Node/Prisma Execution:** `POST /api/v1/concierge/dossier` validates input via Zod, writes lead to Neon PostgreSQL, and triggers WhatsApp API to deliver the watermarked dossier.