"use client"

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/motion/register"
import { MOTION } from "@/lib/motion/tokens"
import { MOTION_QUERIES } from "@/lib/motion/reduced-motion"
import { splitWords } from "@/lib/motion/split-words"

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current || !titleRef.current) return

      const mm = gsap.matchMedia()

      // Desktop entrance
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const split = splitWords(titleRef.current!)

        const tl = gsap.timeline({
          defaults: {
            ease: MOTION.ease.editorial,
            duration: MOTION.duration.editorial,
          },
        })

        tl.fromTo(
          split.words,
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: MOTION.stagger.words,
            duration: MOTION.duration.editorial,
            delay: 0.1,
          }
        )
          .fromTo(
            ".hero-pills li",
            { opacity: 0, y: MOTION.distance.sm },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.normal,
              stagger: MOTION.stagger.pills,
            },
            "-=0.5"
          )
          .fromTo(
            ".hero-bio",
            { opacity: 0, y: MOTION.distance.sm },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.editorial,
            },
            "-=0.4"
          )

        return () => {
          split.revert()
        }
      })

      // Mobile entrance
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        const split = splitWords(titleRef.current!)

        const tl = gsap.timeline({
          defaults: {
            ease: MOTION.ease.editorial,
            duration: MOTION.mobile.duration,
          },
        })

        tl.fromTo(
          split.words,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.035,
            duration: MOTION.mobile.duration,
            delay: 0.05,
          }
        )
          .fromTo(
            ".hero-pills li",
            { opacity: 0, y: MOTION.distance.sm },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.04,
            },
            "-=0.35"
          )
          .fromTo(
            ".hero-bio",
            { opacity: 0, y: MOTION.distance.sm },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
            },
            "-=0.3"
          )

        return () => {
          split.revert()
        }
      })

      mm.add(MOTION_QUERIES.reducedMotion, () => {
        gsap.set([".hero-pills li", ".hero-bio"], {
          opacity: 1,
          y: 0,
        })
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      aria-label="Introduction"
      className="relative z-20 flex min-h-dvh items-center justify-center px-6 pb-16 pt-28"
    >
      <div ref={containerRef} className="w-full max-w-3xl text-center">
        <h1
          ref={titleRef}
          className="hero-title mt-6 text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight font-light text-ink"
        >
          <span className="font-editorial-italic font-normal">Hi, I&apos;m</span>{" "}
          <span className="block font-editorial-italic font-normal tracking-tight">
            Davin Supriyadi
          </span>
        </h1>

        <ul className="hero-pills mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm md:text-base font-medium text-slate-700">
          {["Mobile Development", "AI/ML & Automation", "Applied Computer Vision"].map(
            (area, index) => (
              <li key={area} className="flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="text-slate-400">
                    ·
                  </span>
                )}
                {area}
              </li>
            )
          )}
        </ul>

        <p className="hero-bio mx-auto mt-6 max-w-2xl text-sm md:text-base leading-relaxed text-ink-muted">
          Mobile Development Intern at PT. BPR Arto Moro Semarang. I build Flutter
          applications, Python backend services, and applied AI/ML systems on edge
          hardware.
        </p>
      </div>
    </section>
  )
}
