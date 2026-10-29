import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "var(--bg-obsidian)",
        "midnight-surface": "var(--bg-midnight-surface)",
        "glass-vault": "var(--bg-glass-vault)",
        "gold-champagne": "var(--gold-champagne)",
        "gold-muted-bronze": "var(--gold-muted-bronze)",
        alabaster: "var(--text-alabaster)",
        "stone-muted": "var(--text-stone-muted)",
        steel: "var(--text-steel)",
        "trust-emerald": "var(--trust-emerald)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #F3E5AB 50%, #8C7034 100%)",
        "obsidian-radial": "radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.12) 0%, rgba(5, 7, 11, 0) 70%)",
      },
      boxShadow: {
        "gold-glow": "0 0 35px -5px rgba(212, 175, 55, 0.22)",
        "daylight-ambient": "0 25px 60px -15px rgba(245, 208, 125, 0.18), 0 0 40px -10px rgba(212, 175, 55, 0.25)",
        "nocturnal-ambient": "0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 25px -8px rgba(212, 175, 55, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
