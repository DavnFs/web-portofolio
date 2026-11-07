"use client"

import { useRef } from "react"
import Link from "next/link"
import { gsap, useGSAP } from "@/lib/motion/register"
import { MOTION } from "@/lib/motion/tokens"
import { education } from "@/content/education"

export function AboutTeaser() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const header = containerRef.current?.querySelector(".about-teaser-header")
        const body = containerRef.current?.querySelector(".about-teaser-body")
        const cards = containerRef.current?.querySelectorAll(".about-highlight-card")

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        })

        if (header) {
          tl.fromTo(
            header,
            { opacity: 0, y: MOTION.distance.sm },
            { opacity: 1, y: 0, duration: MOTION.duration.normal, ease: MOTION.ease.smooth }
          )
        }

        if (body) {
          tl.fromTo(
            body,
            { opacity: 0, y: MOTION.distance.sm },
            { opacity: 1, y: 0, duration: MOTION.duration.editorial, ease: MOTION.ease.editorial },
            "-=0.3"
          )
        }

        if (cards && cards.length > 0) {
          tl.fromTo(
            cards,
            { opacity: 0, y: MOTION.distance.mobile },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.mobile.duration,
              stagger: 0.08,
              ease: MOTION.ease.smooth,
            },
            "-=0.4"
          )
        }
      })

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const els = containerRef.current?.querySelectorAll(
          ".about-teaser-header, .about-teaser-body, .about-highlight-card"
        )
        if (els) gsap.set(els, { opacity: 1, y: 0 })
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      aria-label="About teaser"
      className="py-24 sm:py-36 border-t border-line/60"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="about-teaser-header md:col-span-3">
          <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
            03 // Background
          </span>
          <h2 className="text-h2 font-sans font-medium text-ink mt-2">
            Engineering <span className="font-editorial-italic font-normal text-accent">&amp;</span> Depth
          </h2>
        </div>

        <div className="md:col-span-9 space-y-8 max-w-3xl">
          <p className="about-teaser-body text-body-lg text-ink/90 leading-relaxed">
            I recently completed my D4 in Computer Engineering Technology at{" "}
            <span className="text-ink font-medium">{education.school}</span> with a GPA of{" "}
            <span className="font-mono text-accent">{education.gpa}</span>. My work centers on
            building systems where backend protocols, deep learning inference, and hardware constraints meet.
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-line/60">
            <div className="about-highlight-card p-5 bg-surface border border-line space-y-2 active:scale-[0.99] transition-transform">
              <div className="font-mono text-meta text-accent uppercase">Research Focus</div>
              <div className="text-sm font-medium text-ink">Edge Perception &amp; Uncertainty</div>
              <p className="text-xs text-ink-muted leading-relaxed">
                YOLOv11 architecture tuning with ASPP necking and Monte Carlo Dropout for Bayesian uncertainty on NVIDIA Jetson Orin NX.
              </p>
            </div>

            <div className="about-highlight-card p-5 bg-surface border border-line space-y-2 active:scale-[0.99] transition-transform">
              <div className="font-mono text-meta text-accent uppercase">Applied Platforms</div>
              <div className="text-sm font-medium text-ink">Autonomous Vehicle Cockpits</div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Aggregating real-time LiDAR, RTK-GPS, and IMU streams over ROS1 into operator-facing Flutter dashboards at BRIN.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-6">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink hover:text-accent active:translate-x-1 transition-all"
            >
              <span>Explore full profile, education &amp; timeline</span>
              <span className="text-accent">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
