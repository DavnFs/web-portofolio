# MOTION_NOTES.md: Portfolio Motion System

This document logs all motion tokens, animation IDs (A1 to A24), deviations, tunable values, and instructions for review.

---

## 1. GSAP License & Dependencies
- **GSAP & ScrollTrigger**: Version `^3.15.1`. Free under GreenSock standard license for non-commercial and single-site commercial portfolio websites without access fee.
- **@gsap/react**: Version `^2.1.2`. Provides `useGSAP()` hook for leak-free, automatic cleanup and scope binding.
- **Lenis**: Version `^1.3.27`. Inertial smooth scrolling engine synchronized with `gsap.ticker`.

---

## 2. File Layout
```
lib/motion/
├── tokens.ts          # Centralized durations, easings, staggers, and distances
├── register.ts        # GSAP, ScrollTrigger, useGSAP client registration
├── reduced-motion.ts  # Media query definitions for matchMedia & reduced-motion checks
└── split-words.ts     # Semantic client text splitting with accessible label & clean revert

components/
├── smooth-scroll.tsx          # A2: Lenis + GSAP ticker + in-page anchor handler
├── theme-toggle.tsx           # A6: Micro-transition on theme switch
├── hero-content.tsx           # A7, A8, A9: Headline curtain reveal, bio fade, CTA entrance
├── home/
│   ├── ethos-section.tsx      # A10: ScrollTrigger scrubbed word opacity reveal
│   └── selected-work.tsx      # A12, A13: Staggered rows & quickTo cursor preview
└── ui/
    ├── animated-link.tsx      # A22: Transform-based underline sweep on hover
    ├── motion-image.tsx       # A14: Smooth image decode fade-in
    └── motion-diagram.tsx     # A15: Technical SVG diagram line drawing on scroll
```

---

## 3. Motion System Status (Steps 1 to 4)

| ID | Name | Status | Tunable Values | Viewing Instructions |
|---|---|---|---|---|
| **A1** | Page Entry / Loader | ✅ Instant entry | Initial paint: 0ms | Load `/`. Zero blocking preloader; page paints immediately per user preference. |
| **A2** | Weighted Smooth Scroll | ✅ Active | `duration: 1.2s`, `wheelMultiplier: 0.95`, `touchMultiplier: 1.0`, `lenisExpo` | Scroll on any route (`/`, `/work`). Calibrated for silky desktop deceleration and native mobile touch stability. |
| **A5** | Navigation Mobile Menu | ✅ Active | `duration: 0.3s`, `stagger: 0.04s`, `ease: power3.out` | Tap `[ Menu ]` on mobile screen. Staggered link reveal, micro-button transition, smooth slide/fade exit, and Lenis lock. |
| **A6** | Theme Toggle Micro-transition | ✅ Active | `duration: 0.25s`, `ease: power3.out` | Click or tap `[ Theme: ... ]` in top nav or mobile menu. Observe smooth icon/label settle. |
| **A7** | Hero Headline Curtain Reveal | ✅ Active | `duration: 0.8s` (desktop), `0.65s` (mobile), `ease: power3.out` | Reload `/`. Headline words rise up from behind hidden curtain without descender clipping. |
| **A8** | Hero Bio & Focus Subtitle | ✅ Active | `duration: 0.7s` (desktop), `0.55s` (mobile), `distance: 12px` | Reload `/`. Focus pills and bio fade and settle into place. |
| **A9** | Hero CTA Button Entrance | ✅ Active | `duration: 0.5s`, `scale: 0.96 -> 1` | Reload `/`. Buttons expand and settle. |
| **A10** | Ethos Word-by-Word Scrub | ✅ Active | Desktop: `scrub: 0.8`. Mobile: `scrub: 0.35`, `start: top 82%`, `end: bottom 68%` | Scroll to Section 01 on mobile or desktop. Words brighten from dim to ink in direct synchronization with scroll. |
| **A12** | Work List Entrance | ✅ Active | Desktop: `duration: 0.8s`, `stagger: 0.12s`. Mobile: Individual triggers at `top 86%` | Scroll to Section 02. On mobile, each card animates individually as it enters the viewport. |
| **A13** | Desktop Cursor Preview (`quickTo`) | ✅ Active | `duration: 0.35s`, `quickTo` physics | Hover over any project row in Section 02 on desktop (disabled on touch devices). |
| **A14** | Media Decode Fade-In | ✅ Active | `duration: 0.7s`, `ease-editorial` | View project cards or case study images. Decodes smoothly with zero layout pop. |
| **A15** | Architecture Diagram Reveal | ✅ Active | `duration: 1.2s`, `strokeDashoffset` | View case study architecture diagram on `/work/autonomous-perception`. |
| **A16** | About Teaser Entrance | ✅ Active | `duration: 0.65s`, `stagger: 0.08s` | Scroll to Section 03 on `/`. Header, lead, and highlight cards glide into position. |
| **A21** | Contact Teaser Entrance | ✅ Active | `duration: 0.65s`, `distance: 16px` | Scroll to Section 04 on `/`. Display statement, direct email box, and outbound links reveal. |
| **A22** | Link Underline Sweep | ✅ Active | `duration: 0.3s`, `scaleX: 0 -> 1` | Hover on desktop or tap on touch devices. Underline sweeps left-to-right with instant active feedback. |

---

## 4. Remaining Animations (Steps 5 to 7)

- **A3**: Route transitions (cross-fade on navigation)
- **A4**: Navigation bar appearance / scroll blur state
- **A5**: Navigation mobile menu overlay open/close & Esc trap
- **A11**: Section headings entrance
- **A16**: About teaser entrance
- **A17**: Case study hero entrance
- **A18**: Case study numbered steps reveal (01, 02, etc.)
- **A19**: Case study stat counters count-up animation
- **A20**: Case study next project card hover
- **A21**: Site footer colophon reveal
- **A23**: Media hover zoom / tilt
- **A24**: Back-to-top smooth scroll trigger

---

## 5. Reduced Motion & Accessibility Verification
- Every GSAP animation is registered inside `gsap.matchMedia()` using `MOTION_QUERIES.motionOK` and `MOTION_QUERIES.reducedMotion`.
- When `prefers-reduced-motion: reduce` is detected:
  - Lenis smooth scrolling is completely disabled.
  - Floating cursor preview is disabled.
  - All text and rows render with `opacity: 1` and `transform: none` instantly.
  - Initial hidden states are driven exclusively by JavaScript, guaranteeing zero blank screens when JS is disabled.
