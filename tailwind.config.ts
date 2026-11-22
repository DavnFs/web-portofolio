import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        line: "var(--line)",
        accent: "var(--accent)",

        // Compatibility mappings
        background: "var(--bg)",
        foreground: "var(--ink)",
        border: "var(--line)",
        muted: {
          DEFAULT: "var(--surface)",
          foreground: "var(--ink-muted)",
        },
        primary: {
          DEFAULT: "var(--ink)",
          foreground: "var(--bg)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Georgia, 'Times New Roman', Times, serif", "Georgia", "serif"],
        mono: ["'SF Mono', 'Roboto Mono', 'Ubuntu Mono', monospace", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["clamp(3rem, 9vw, 8.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        h1: ["clamp(2.25rem, 6vw, 4.5rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "body-lg": ["clamp(1.125rem, 1.6vw, 1.375rem)", { lineHeight: "1.5" }],
        body: ["1rem", { lineHeight: "1.65" }],
        meta: ["0.75rem", { lineHeight: "1.3", letterSpacing: "0.08em" }],
      },
      borderRadius: {
        none: "0",
        media: "12px",
      },
      maxWidth: {
        canvas: "1440px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config