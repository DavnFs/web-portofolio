"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef } from "react"
import { gsap, useGSAP } from "@/lib/motion/register"
import { MOTION } from "@/lib/motion/tokens"
import { MOTION_QUERIES } from "@/lib/motion/reduced-motion"
import { CASE_STUDIES } from "@/content/case-studies/types"
import { trackEvent } from "@/lib/analytics"

export function SelectedWork() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const quickX = useRef<((value: number) => void) | null>(null)
  const quickY = useRef<((value: number) => void) | null>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const mm = gsap.matchMedia()
      const isTouch = window.matchMedia("(hover: none)").matches
      setIsTouchDevice(isTouch)

      // Motion-enabled desktop & mobile
      mm.add(MOTION_QUERIES.motionOK, () => {
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

        // A13: Ultra-smooth GSAP quickTo cursor-following preview (Desktop only)
        if (previewRef.current && !isTouch) {
          gsap.set(previewRef.current, { xPercent: 12, yPercent: -50 })
          quickX.current = gsap.quickTo(previewRef.current, "x", {
            duration: MOTION.duration.cursor,
            ease: MOTION.ease.editorial,
          })
          quickY.current = gsap.quickTo(previewRef.current, "y", {
            duration: MOTION.duration.cursor,
            ease: MOTION.ease.editorial,
          })
        }
      })

      // Reduced motion fallback
      mm.add(MOTION_QUERIES.reducedMotion, () => {
        const rows = sectionRef.current?.querySelectorAll(".work-row")
        if (rows) {
          gsap.set(rows, { opacity: 1, y: 0 })
        }
      })

      const handleMouseMove = (e: MouseEvent) => {
        if (quickX.current && quickY.current) {
          quickX.current(e.clientX)
          quickY.current(e.clientY)
        }
      }

      window.addEventListener("mousemove", handleMouseMove, { passive: true })
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    },
    { scope: sectionRef }
  )

  const activeProject = CASE_STUDIES.find((cs) => cs.slug === activeSlug)

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
            onMouseEnter={() => !isTouchDevice && setActiveSlug(project.slug)}
            onMouseLeave={() => !isTouchDevice && setActiveSlug(null)}
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

                {/* Inline Mobile/Touch Poster */}
                <div className="block lg:hidden pt-4">
                  <div className="relative aspect-[16/9] w-full bg-surface border border-line rounded-media overflow-hidden">
                    <Image
                      src={project.heroMedia.src}
                      alt={project.heroMedia.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
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

      {/* GSAP QuickTo Powered Desktop Floating Cursor Preview (A13) */}
      {!isTouchDevice && (
        <div
          ref={previewRef}
          aria-hidden="true"
          className={`fixed top-0 left-0 pointer-events-none z-50 w-80 h-48 rounded-media overflow-hidden border border-line shadow-2xl transition-opacity duration-200 bg-surface hidden lg:block ${
            activeProject ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ willChange: "transform, opacity" }}
        >
          {activeProject && (
            <div className="relative w-full h-full">
              <Image
                src={activeProject.heroMedia.src}
                alt=""
                fill
                sizes="320px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-ink/10 mix-blend-overlay" />
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 bg-bg/90 backdrop-blur-sm border border-line text-[10px] font-mono text-ink uppercase tracking-wider truncate">
                Preview // {activeProject.title}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
