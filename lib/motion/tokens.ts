/**
 * Centralized motion tokens for the portfolio.
 * All durations (seconds), easings, and staggers must be imported from here.
 * No magic numbers in components.
 */

export const MOTION = {
  duration: {
    instant: 0.1,
    fast: 0.25,
    normal: 0.5,
    editorial: 0.8,
    slow: 1.2,
    cursor: 0.35,
    counter: 1.5,
  },
  ease: {
    // Solicia Brown & high-end editorial curve
    editorial: "power3.out",
    editorialCubic: "cubic-bezier(0.22, 1, 0.36, 1)",
    smooth: "power2.out",
    snappy: "power4.out",
    linear: "none",
    bounceBack: "back.out(1.5)",
    // Lenis exponential weighted easing
    lenisExpo: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  },
  stagger: {
    tight: 0.04,
    words: 0.05,
    pills: 0.08,
    cards: 0.12,
    sections: 0.2,
  },
  distance: {
    sm: 12,
    md: 24,
    lg: 48,
    hero: 35,
  },
} as const
