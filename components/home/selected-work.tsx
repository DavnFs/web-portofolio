"use client"

import Link from "next/link"
import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/motion/register"
import { MOTION } from "@/lib/motion/tokens"
import { MOTION_QUERIES } from "@/lib/motion/reduced-motion"
import { CASE_STUDIES } from "@/content/case-studies/types"
import { trackEvent } from "@/lib/analytics"

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const mm = gsap.matchMedia()

      // Desktop motion: Staggered batch reveal
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        // A12: Staggered entrance for work rows on scroll
        const rows = sectionRef.current?.querySelectorAll(".work-row")
        if (rows && rows.length > 0) {
          gsap.fromTo(
            rows,
            {
              opacity: 0,
              y: MOTION.distance.md,
            },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.editorial,
              stagger: MOTION.stagger.cards,
              ease: MOTION.ease.smooth,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          )
        }
      })

      // Mobile motion: Individual row entrances calibrated for single-column cards
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        const rows = sectionRef.current?.querySelectorAll(".work-row")
        if (!rows) return

        rows.forEach((row) => {
          gsap.fromTo(
            row,
            {
              opacity: 0.15,
              y: MOTION.distance.mobile,
            },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.mobile.duration,
              ease: MOTION.ease.smooth,
              scrollTrigger: {
                trigger: row,
                start: "top 86%",
                toggleActions: "play none none none",
              },
            }
          )
        })
      })

      // Reduced motion fallback
      mm.add(MOTION_QUERIES.reducedMotion, () => {
        const rows = sectionRef.current?.querySelectorAll(".work-row")
        if (rows) {
          gsap.set(rows, { opacity: 1, y: 0 })
        }
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-label="Selected work"
      className="py-24 sm:py-36 border-t border-line/60"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-12 sm:pb-16 border-b border-line">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
            02 // Portfolio
          </span>
          <h2 className="text-h2 font-sans font-medium text-ink">
            Selected work <span className="font-editorial-italic font-normal text-accent">(04)</span>
          </h2>
        </div>
        <Link
          href="/work"
          className="font-mono text-xs uppercase tracking-wider text-ink-muted hover:text-accent transition-colors inline-flex items-center gap-1.5"
        >
          <span>View Archive Table</span>
          <span>→</span>
        </Link>
      </div>

      {/* Case Study Rows */}
      <div className="divide-y divide-line">
        {CASE_STUDIES.map((project) => (
          <div
            key={project.slug}
            className="work-row group relative py-12 sm:py-16 transition-colors will-change-[transform,opacity]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Index & Meta */}
              <div className="lg:col-span-3 flex lg:flex-col justify-between items-baseline lg:items-start gap-2">
                <span className="font-mono text-lg text-accent font-medium">
                  ({project.index})
                </span>
                <div className="space-y-1 font-mono text-meta uppercase text-ink-muted">
                  <div>{project.projectType}</div>
                  <div>{project.role} · {project.year}</div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="lg:col-span-6 space-y-3">
                <Link
                  href={`/work/${project.slug}`}
                  onClick={() => trackEvent("case_study_open", { slug: project.slug, source: "home_selected" })}
                  className="inline-block group-hover:text-accent transition-colors"
                >
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium tracking-tight text-ink group-hover:text-accent">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-body text-ink-muted max-w-xl leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Stack Tags & Onward arrow */}
              <div className="lg:col-span-3 flex lg:flex-col justify-between lg:items-end items-start gap-4 h-full">
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  {project.stack.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[11px] px-2 py-1 bg-surface border border-line text-ink-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/work/${project.slug}`}
                  onClick={() => trackEvent("case_study_open", { slug: project.slug, source: "home_arrow" })}
                  aria-label={`Open case study: ${project.title}`}
                  className="hidden lg:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted group-hover:text-accent transition-colors"
                >
                  <span>Read case study</span>
                  <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
