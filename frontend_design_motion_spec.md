# Frontend Design & Motion Engineering Specification
## ASSET PROPERTIES — Dark Luxury ("Nocturnal Private Bank") Aesthetic

---

### 1. Color Palette Tokens
| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| `--bg-obsidian` | `#05070B` | Primary canvas background (with 3% SVG film grain overlay) |
| `--bg-midnight-surface` | `#0B101B` | Elevated architectural cards & bento containers |
| `--bg-glass-vault` | `rgba(14, 20, 34, 0.72)` | `backdrop-filter: blur(20px)` floating drawers & modals |
| `--gold-champagne` | `#D4AF37` | Primary accent, active dials, hairline borders |
| `--gold-muted-bronze` | `#8C7034` | Subtle borders (`1px solid rgba(212, 175, 55, 0.18)`) |
| `--text-alabaster` | `#F4F1EA` | Primary editorial headings (never harsh pure `#FFFFFF`) |
| `--text-stone-muted` | `#949BA6` | Secondary specifications & legal footnotes |
| `--trust-emerald` | `#2E9B68` | ORERA & Gharabari Verified indicators |

### 2. Typography Hierarchy
* **Editorial Display (Headings & Numbers):** `Cormorant Garamond` (Light 300 / Regular 400 / Italic). Used for large statements, property titles, and the `94/100` Asset Score numerals.
* **Architectural UI (Body & Specs):** `Plus Jakarta Sans` (400, 500, 600). Clean, geometric, highly legible for sq.ft. tables and calculators.
* **Technical / Legal Monospace:** `JetBrains Mono` (400). Used exclusively for ORERA Registration IDs, Bhulekh Khata/Plot Numbers, and coordinates.

### 3. Animation & Physics Stack ("Heavy Inertia")
1. **Smooth Scroll Engine (`Lenis`):** Configured with `lerp: 0.07` and `duration: 1.35`. Every scroll glides with silk-like momentum.
2. **Scroll-Linked Choreography (`GSAP ScrollTrigger`):**
   * **Curtain Unmasking:** Property images reveal via clip-path (`inset(100% 0 0 0)` to `inset(0% 0 0 0)`) over `1.2s` while the inner image scales from `1.12` to `1.0`.
   * **X-Ray Building Exploder:** Pinning the viewport while scrolling through the 4 layers of due diligence.
3. **Micro-Interactions (`Framer Motion`):**
   * **Custom Magnetic Cursor:** Morphs into a subtle golden ring (`VIEW DOSSIER` or `DRAG TO COMPARE`) when hovering over interactive zones.
   * **Day/Dusk Cross-Fade:** Smooth opacity interpolation coupled with dynamic CSS shadow shifts when toggling between **7:00 AM East Sunlight** and **8:00 PM Nocturnal Lighting**.
4. **Mobile Optimization:** Heavy WebGL shaders are replaced on mobile with hardware-accelerated CSS 3D transforms (`will-change: transform, opacity`) to guarantee a locked **60–120fps** scroll experience.