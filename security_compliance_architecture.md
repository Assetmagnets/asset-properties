# Security, Privacy & Compliance Architecture
## ASSET PROPERTIES — Data Protection & Anti-Scraper Safeguards

---

### 1. Lead & HNI Data Protection (DPDP Act 2023 Compliance)
* **Field-Level Encryption for PII:** HNI phone numbers and investment ticket sizes stored in PostgreSQL are encrypted at rest (AES-256 via Neon DB storage encryption), with sensitive notes encrypted at the application layer before Prisma writes them.
* **Strict Input Validation (`Zod`):** Every Node.js API endpoint (`/api/v1/leads`, `/api/v1/calculator`) strictly validates payloads using `Zod` schemas to prevent SQL Injection, NoSQL/JSON injection, and XSS attacks.
* **Zero Public Lead Exposure:** All database queries execute strictly inside Server Components or secure Node API routes. No database credentials or Prisma logic ever touch the client bundle.

### 2. Anti-Scraper & Dossier Protection (Stopping Rival Brokers)
* **Dynamic PDF Watermarking:** When a user requests a Legal & Floor Plan Dossier on WhatsApp, the Node.js server dynamically stamps the user's mobile number and timestamp across the PDF diagonal (`Prepared exclusively for +91-98XXX-XXXXX by Asset Properties`) before sending.
* **Upstash Redis Rate Limiting on Vercel Edge:** Prevents bots or rival agencies from spamming the WhatsApp OTP/Dossier endpoint (limited to 3 requests per IP per hour).
* **Signed Expiring URLs:** Raw legal documents (Bhulekh RoR, BDA Sanction letters, EC copies) are never hosted on public static URLs. They are served via **15-minute expiring signed URLs** only after a verified lead interaction.

### 3. Admin CMS & Role-Based Access Control (RBAC)
* **Authentication (`Auth.js / NextAuth` or `Clerk`):** Internal team accesses `/admin/vault` via two-factor authentication (2FA).
* **Role Separation:**
  * `SUPER_ADMIN` (Founders): Full access to HNI lead exports, off-market vault pricing, and Asset Score overrides.
  * `CONTENT_CURATOR` (Marketing Team): Can upload new `@asset_properties17` Reels, update construction drone videos, and edit property descriptions, but **cannot** export the master HNI client database.

### 4. Vercel & Neon Infrastructure Security
* **SSL/TLS & Security Headers:** Enforced `Strict-Transport-Security (HSTS)`, strict `Content-Security-Policy (CSP)` (allowing only trusted video/image CDNs and Instagram embeds), and `X-Frame-Options: DENY` to prevent clickjacking.
* **Automated Point-in-Time Recovery (PITR):** Neon DB branching and automated daily snapshots ensure that even accidental admin deletions can be rolled back to any second within the last 7–30 days.