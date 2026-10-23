import { NextRequest, NextResponse } from "next/server";
import { verifySignedDossierToken } from "@/lib/security";
import { CURATED_PROPERTIES } from "@/data/curatedProperties";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return new NextResponse("Missing signed security token.", { status: 401 });
  }

  const verification = verifySignedDossierToken(token);
  if (!verification.valid || !verification.payload) {
    const reason = verification.expired
      ? "This 15-minute signed legal dossier link has expired to protect HNI & landowner title documents. Please generate a fresh link from the Asset Properties Vault."
      : "Invalid cryptographic signature on dossier token.";
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head><title>Expired Signed URL — Asset Properties</title></head>
        <body style="background:#05070B;color:#F4F1EA;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;padding:24px;text-align:center;">
          <div style="max-width:520px;border:1px solid rgba(212,175,55,0.3);padding:32px;border-radius:12px;background:#0B101B;">
            <p style="color:#D4AF37;letter-spacing:0.2em;font-size:12px;text-transform:uppercase;">Anti-Scraper Security Protocol</p>
            <h1 style="font-weight:400;margin:12px 0;">Signed Dossier Link Expired</h1>
            <p style="color:#949BA6;line-height:1.6;font-size:14px;">${reason}</p>
          </div>
        </body>
      </html>`,
      {
        status: 403,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  const { propertySlug, clientName, maskedPhone, exp } = verification.payload;
  const property =
    CURATED_PROPERTIES.find(
      (p) => p.slug === propertySlug || p.id === propertySlug
    ) || CURATED_PROPERTIES[0];

  const issuedTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "medium",
  });
  const expiryTime = new Date(exp).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  const watermarkText = `PREPARED EXCLUSIVELY FOR ${maskedPhone} (${clientName.toUpperCase()}) • ASSET PROPERTIES`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Verified Legal & Floor Plan Dossier — ${property.title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 40px 24px;
      background: #05070B;
      color: #F4F1EA;
      font-family: 'Plus Jakarta Sans', sans-serif;
      position: relative;
      overflow-x: hidden;
    }
    .sheet {
      max-width: 900px;
      margin: 0 auto;
      background: #0B101B;
      border: 1px solid rgba(212, 175, 55, 0.35);
      border-radius: 16px;
      padding: 48px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 30px 90px rgba(0,0,0,0.85);
    }
    .watermark-layer {
      pointer-events: none;
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      z-index: 20;
      opacity: 0.11;
      transform: rotate(-24deg) scale(1.25);
      user-select: none;
    }
    .watermark-text {
      font-family: 'JetBrains Mono', monospace;
      font-size: 16px;
      letter-spacing: 0.16em;
      color: #D4AF37;
      white-space: nowrap;
      border-top: 1px dashed #D4AF37;
      border-bottom: 1px dashed #D4AF37;
      padding: 6px 0;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid rgba(212,175,55,0.22);
      padding-bottom: 24px;
      margin-bottom: 32px;
    }
    .badge {
      display: inline-block;
      background: rgba(46, 155, 104, 0.16);
      color: #2E9B68;
      border: 1px solid rgba(46, 155, 104, 0.4);
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 999px;
      margin-bottom: 10px;
    }
    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 38px;
      font-weight: 400;
      margin: 4px 0 8px 0;
      color: #F4F1EA;
    }
    .mono {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: #D4AF37;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-bottom: 28px;
    }
    .card {
      background: rgba(5, 7, 11, 0.65);
      border: 1px solid rgba(212, 175, 55, 0.18);
      border-radius: 10px;
      padding: 18px;
    }
    .card-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #949BA6;
      margin-bottom: 6px;
    }
    .card-value {
      font-size: 16px;
      font-weight: 600;
      color: #F4F1EA;
    }
    .tradeoff {
      background: rgba(212, 175, 55, 0.07);
      border-left: 3px solid #D4AF37;
      padding: 18px 20px;
      border-radius: 6px;
      margin: 24px 0;
    }
    .print-btn {
      background: #D4AF37;
      color: #05070B;
      border: none;
      padding: 10px 20px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
    }
    @media print {
      body { background: #05070B; padding: 0; }
      .print-btn { display: none; }
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="watermark-layer">
      <div class="watermark-text">${watermarkText}</div>
      <div class="watermark-text">${watermarkText}</div>
      <div class="watermark-text">${watermarkText}</div>
      <div class="watermark-text">${watermarkText}</div>
      <div class="watermark-text">${watermarkText}</div>
    </div>

    <div class="header">
      <div>
        <span class="badge">✓ ORERA & BHULEKH GHARABARI VERIFIED DOSSIER</span>
        <h1>${property.title}</h1>
        <div style="color:#949BA6;font-size:14px;">${property.microLocation} (${property.corridorDisplayName})</div>
      </div>
      <div style="text-align:right;">
        <div class="mono">ASSET SCORE™: ${property.assetScoreTotal}/100</div>
        <div style="font-size:12px;color:#949BA6;margin-top:6px;">Issued: ${issuedTime} IST</div>
        <div style="font-size:11px;color:#D4AF37;margin-top:2px;">Signed Link Expires: ${expiryTime} IST</div>
        <button class="print-btn" style="margin-top:12px;" onclick="window.print()">Download / Print PDF</button>
      </div>
    </div>

    <div style="margin-bottom:20px;padding:12px 16px;background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.3);border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:12px;color:#D4AF37;">
      DYNAMIC ANTI-SCRAPER STAMP: Prepared exclusively for ${clientName} (${maskedPhone}) by Asset Properties (@asset_properties17)
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-label">ORERA Registration ID</div>
        <div class="card-value mono">${property.oreraNumber}</div>
        <div style="font-size:12px;color:#949BA6;margin-top:4px;">BDA Sanction: ${property.bdaSanctionNumber}</div>
      </div>
      <div class="card">
        <div class="card-label">Bhulekh Land Revenue & Kissam</div>
        <div class="card-value" style="color:#2E9B68;">${property.kissamStatus}</div>
        <div class="mono" style="margin-top:4px;color:#949BA6;">${property.bhulekhKhataPlot}</div>
      </div>
      <div class="card">
        <div class="card-label">Forensic Area Breakdown</div>
        <div class="card-value">${property.reraCarpetSqFt.toLocaleString()} Sq.Ft. True RERA Carpet</div>
        <div style="font-size:12px;color:#949BA6;margin-top:4px;">Super Built-Up: ${property.superBuiltUpSqFt.toLocaleString()} Sq.Ft. (${property.loadingPercentage}% Loading) • UDS: ${property.udsLandSqFt ?? "N/A"} Sq.Ft.</div>
      </div>
      <div class="card">
        <div class="card-label">Valuation & Effective Carpet Rate</div>
        <div class="card-value">${property.priceDisplay} (₹${property.pricePerSqFt.toLocaleString()}/Sq.Ft. SBUA)</div>
        <div style="font-size:12px;color:#D4AF37;margin-top:4px;">True Carpet Rate: ₹${property.effectiveCarpetPricePerSqFt.toLocaleString()}/Sq.Ft. • ${property.ecYearsVerified}-Yr Clean EC</div>
      </div>
    </div>

    <div class="tradeoff">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#D4AF37;margin-bottom:6px;">Curator's Radical Candor Trade-Off Note</div>
      <div style="font-size:14px;line-height:1.6;color:#F4F1EA;">${property.curatorTradeOffNote}</div>
    </div>

    <h3 style="font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:400;margin-bottom:12px;">4-Layer X-Ray Engineering & Legal Audit</h3>
    <div class="grid">
      ${property.xrayLayers
        .map(
          (layer) => `
        <div class="card">
          <div class="mono" style="margin-bottom:4px;">${layer.verificationCode}</div>
          <div style="font-weight:600;margin-bottom:4px;">${layer.title}</div>
          <div style="font-size:13px;color:#949BA6;line-height:1.5;">${layer.auditFinding}</div>
        </div>`
        )
        .join("")}
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
