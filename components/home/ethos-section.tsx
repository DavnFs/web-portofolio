"use client"

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/motion/register"
import { MOTION_QUERIES } from "@/lib/motion/reduced-motion"

export function EthosSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      if (!paragraphRef.current || !containerRef.current) return

      const mm = gsap.matchMedia()

      // Desktop: Standard editorial scrub
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const words = paragraphRef.current?.querySelectorAll(".ethos-word")
        if (!words || words.length === 0) return

        // A10: Scroll-linked word opacity reveal
        gsap.fromTo(
          words,
          {
            opacity: 0.18,
            y: 4,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 78%",
              end: "bottom 52%",
              scrub: 0.8,
            },
          }
        )
      })

      // Mobile: Responsive, tighter scrub calibrated for rapid thumb scrolling
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        const words = paragraphRef.current?.querySelectorAll(".ethos-word")
        if (!words || words.length === 0) return

        // Refined mobile word opacity reveal: starts smoothly and tracks thumb scroll without lag
        gsap.fromTo(
          words,
          {
            opacity: 0.18,
            y: 2,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 82%",
              end: "bottom 68%",
              scrub: 0.35,
            },
          }
        )
      })

      mm.add(MOTION_QUERIES.reducedMotion, () => {
        const words = paragraphRef.current?.querySelectorAll(".ethos-word")
        if (words) {
          gsap.set(words, { opacity: 1, y: 0 })
        }
      })
    },
    { scope: containerRef }
  )

  const words = [
    { text: "Reliable", italic: false, bold: true },
    { text: "systems", italic: false, bold: false },
    { text: "are", italic: false, bold: false },
    { text: "built", italic: false, bold: false },
    { text: "from", italic: false, bold: false },
    { text: "the", italic: false, bold: false },
    { text: "sensor", italic: true, bold: false },
    { text: "to", italic: false, bold: false },
    { text: "the", italic: false, bold: false },
    { text: "screen.", italic: true, bold: false },
    { text: "Software", italic: false, bold: true },
    { text: "does", italic: false, bold: false },
    { text: "not", italic: false, bold: false },
    { text: "live", italic: false, bold: false },
    { text: "in", italic: false, bold: false },
    { text: "a", italic: false, bold: false },
    { text: "mockup:", italic: false, bold: false },
    { text: "it", italic: false, bold: false },
    { text: "runs", italic: false, bold: false },
    { text: "on", italic: false, bold: false },
    { text: "power-capped", italic: false, bold: true },
    { text: "embedded", italic: false, bold: false },
    { text: "boards,", italic: false, bold: false },
    { text: "handles", italic: false, bold: false },
    { text: "noisy", italic: true, bold: false },
    { text: "sensor", italic: false, bold: false },
    { text: "telemetry,", italic: false, bold: false },
    { text: "and", italic: false, bold: false },
    { text: "must", italic: false, bold: false },
    { text: "measure", italic: false, bold: true },
    { text: "uncertainty", italic: true, bold: false },
    { text: "honestly", italic: false, bold: false },
    { text: "before", italic: false, bold: false },
    { text: "claiming", italic: false, bold: false },
    { text: "confidence.", italic: false, bold: true },
  ]

  return (
    <section
      ref={containerRef}
      aria-label="Engineering ethos"
      className="py-24 sm:py-36 border-t border-line/60"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-3">
          <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
            01 // Engineering Ethos
          </span>
        </div>

        <div className="md:col-span-9 max-w-4xl">
          <p
            ref={paragraphRef}
            className="text-h2 font-sans font-light leading-[1.3] text-ink"
          >
            {words.map((item, idx) => (
              <span
                key={idx}
                className={`ethos-word inline-block mr-[0.28em] will-change-[opacity,transform] ${
                  item.italic ? "font-editorial-italic text-[1.15em] font-normal text-accent" : ""
                } ${item.bold ? "font-medium text-ink" : ""}`}
              >
                {item.text}
              </span>
            ))}
          </p>

          <div className="mt-12 pt-6 border-t border-line/40 flex flex-wrap items-center gap-6 font-mono text-xs text-ink-muted">
            <div>NVIDIA Jetson Orin NX (20W)</div>
            <div>·</div>
            <div>ROS1 Point Cloud Bus</div>
            <div>·</div>
            <div>Zero-Network Sandboxes</div>
          </div>
        </div>
      </div>
    </section>
  )
}
