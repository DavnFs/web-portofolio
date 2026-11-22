"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { gsap, useGSAP } from "@/lib/motion/register"
import { MOTION } from "@/lib/motion/tokens"
import { CASE_STUDIES } from "@/content/case-studies/types"
import { profile } from "@/content/profile"

export function HorizontalShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return

      const mm = gsap.matchMedia()

      // Desktop: Continuous horizontal scrub & pin
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current
        if (!track) return

        const getScrollDistance = () => track.scrollWidth - window.innerWidth

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })

      // Mobile: Individual scroll-triggered reveals per panel
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        const panels = containerRef.current?.querySelectorAll(".showcase-panel")
        if (!panels) return

        panels.forEach((panel) => {
          const contents = panel.querySelectorAll(".showcase-panel-content")

          gsap.fromTo(
            panel,
            { opacity: 0.2, y: MOTION.distance.mobile },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.mobile.duration,
              ease: MOTION.ease.smooth,
              scrollTrigger: {
                trigger: panel,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          )

          if (contents.length > 0) {
            gsap.fromTo(
              contents,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.06,
                ease: MOTION.ease.editorial,
                scrollTrigger: {
                  trigger: panel,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            )
          }
        })
      })

      // Reduced motion fallback
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const panels = containerRef.current?.querySelectorAll(".showcase-panel")
        const contents = containerRef.current?.querySelectorAll(".showcase-panel-content")
        if (panels) gsap.set(panels, { opacity: 1, y: 0 })
        if (contents) gsap.set(contents, { opacity: 1, y: 0 })
      })
    },
    { scope: containerRef }
  )

  const featuredStudies = CASE_STUDIES.filter((cs) => cs.featured)

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-bg border-t border-line/60"
      aria-label="Horizontal scroll showcase"
    >
      {/* Horizontal Track for Desktop / Refined Stack for Mobile */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row h-auto md:h-screen w-full md:w-max md:will-change-transform"
      >
        {/* Panel 1: Design Ethos & Engineering Philosophy */}
        <div className="showcase-panel w-full md:w-screen md:min-w-[100vw] h-auto md:h-full flex-shrink-0 flex flex-col justify-between p-8 sm:p-12 md:p-20 relative bg-bg border-b md:border-b-0 md:border-r border-line/60">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

          <div className="showcase-panel-content relative z-10 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
              <span className="hidden md:inline">01 // Scroll Showcase</span>
              <span className="md:hidden">01 // Selected Showcase</span>
            </span>
            <span className="font-mono text-xs text-accent">
              Semarang, ID · UTC+7
            </span>
          </div>

          <div className="showcase-panel-content relative z-10 max-w-4xl my-16 md:my-auto">
            <span className="font-serif italic text-xl md:text-2xl text-accent block mb-3">
              Engineering Ethos
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-sans font-light leading-[1.1] text-ink tracking-tight">
              Translating noisy physical telemetry into{" "}
              <em className="font-serif italic font-normal text-accent">
                deterministic
              </em>{" "}
              digital experiences.
            </h2>
            <p className="mt-6 text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">
              Software is not a static mockup. It runs on power-capped embedded boards,
              handles volatile sensor streams, and must measure uncertainty honestly.
            </p>
          </div>

          <div className="showcase-panel-content relative z-10 flex items-center justify-between border-t border-line/40 pt-4 font-mono text-xs text-ink-muted">
            <div className="flex items-center gap-4">
              <span>NVIDIA Jetson Orin NX</span>
              <span>·</span>
              <span>ROS1 Point Cloud</span>
              <span>·</span>
              <span>Flutter Edge</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-accent">
              <span>scroll horizontally</span>
              <span>→</span>
            </div>
          </div>
        </div>

        {/* Panel 2 & 3: Featured Project Cards */}
        {featuredStudies.map((study) => (
          <div
            key={study.slug}
            className="showcase-panel w-full md:w-[85vw] lg:w-[65vw] h-auto md:h-full flex-shrink-0 flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-surface border-b md:border-b-0 md:border-r border-line/60 relative group active:scale-[0.99] transition-transform duration-200"
          >
            <div className="showcase-panel-content flex items-center justify-between border-b border-line/60 pb-4">
              <span className="font-mono text-sm font-medium text-accent">
                ({study.index})
              </span>
              <span className="font-mono text-xs text-ink-muted uppercase">
                {study.projectType} · {study.year}
              </span>
            </div>

            <div className="showcase-panel-content my-8 md:my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2.5">
                  <span className="font-mono text-xs text-ink-muted uppercase tracking-wider">
                    Role: {study.role}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-normal text-ink group-hover:text-accent transition-colors duration-300">
                    {study.title}
                  </h3>
                  <p className="text-base sm:text-lg font-serif italic text-ink-muted leading-snug">
                    {study.tagline}
                  </p>
                </div>

                <p className="text-sm md:text-base text-ink-muted leading-relaxed">
                  {study.summary}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {study.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2.5 py-1 bg-bg border border-line text-ink"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <Link
                  href={`/work/${study.slug}`}
                  aria-label={`View architecture diagram for ${study.title}`}
                  className="block relative aspect-[16/9] w-full bg-[#F8FAFC] border border-line rounded-media overflow-hidden shadow-sm"
                >
                  <Image
                    src={study.heroMedia.src}
                    alt={study.heroMedia.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-contain group-hover:scale-[1.015] transition-transform duration-300"
                  />
                </Link>
              </div>
            </div>

            <div className="showcase-panel-content flex items-center justify-between border-t border-line/60 pt-4">
              <span className="font-mono text-xs text-ink-muted">
                Edge AI &amp; Robotics Research
              </span>
              <Link
                href={`/work/${study.slug}`}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink group-hover:text-accent font-medium transition-colors"
              >
                <span>Read Case Study</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </Link>
            </div>
          </div>
        ))}

        {/* Panel 4: About & Contact Outro */}
        <div className="showcase-panel w-full md:w-[70vw] lg:w-[50vw] h-auto md:h-full flex-shrink-0 flex flex-col justify-between p-8 sm:p-12 md:p-20 bg-bg relative">
          <div className="showcase-panel-content flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
              02 // Background &amp; Profile
            </span>
            <span className="font-mono text-xs text-accent">Top of Cohort · GPA 3.94</span>
          </div>

          <div className="showcase-panel-content my-12 md:my-auto space-y-6 max-w-xl">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-light text-ink leading-tight">
              {profile.name}
            </h3>
            <p className="font-serif italic text-xl md:text-2xl text-accent">
              Mobile Developer Intern &amp; Applied Computer Vision Researcher.
            </p>
            <p className="text-sm md:text-base text-ink-muted leading-relaxed">
              Specialized in offline-first systems, computer vision at the edge, and operator
              dashboards for autonomous vehicles.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-6 py-3 font-mono text-xs uppercase tracking-wider bg-ink text-bg hover:bg-accent hover:text-white transition-colors"
              >
                <span>⁑ Explore About Page</span>
                <span>→</span>
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink hover:text-accent transition-colors px-4 py-3 border border-line"
              >
                <span>All Case Studies (4)</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="showcase-panel-content border-t border-line/40 pt-4 flex items-center justify-between font-mono text-xs text-ink-muted">
            <span>{profile.headline}</span>
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-accent transition-colors"
            >
              {profile.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
