"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { gsap, useGSAP } from "@/lib/motion/register"
import { MOTION } from "@/lib/motion/tokens"
import { MOTION_QUERIES } from "@/lib/motion/reduced-motion"
import { splitWords } from "@/lib/motion/split-words"

export default function HeroContent() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = !mounted || resolvedTheme === "dark"

  useGSAP(
    () => {
      if (!containerRef.current || !titleRef.current) return

      const mm = gsap.matchMedia()

      mm.add(MOTION_QUERIES.motionOK, () => {
        // Split headline into words for editorial curtain reveal (A7)
        const split = splitWords(titleRef.current!)

        const tl = gsap.timeline({
          defaults: {
            ease: MOTION.ease.editorial,
            duration: MOTION.duration.editorial,
          },
        })

        // A7: Headline words curtain reveal
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
          // A8: Focus pills & subtitle fade
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

      mm.add(MOTION_QUERIES.reducedMotion, () => {
        // Instant presentation for users with prefers-reduced-motion
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
          className={`hero-title mt-6 text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight font-light transition-colors duration-300 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          <span className="font-editorial-italic font-normal">Hi, I&apos;m</span>{" "}
          <span className="block font-editorial-italic font-normal tracking-tight">Davin Supriyadi</span>
        </h1>

        <ul
          className={`hero-pills mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm md:text-base font-medium transition-colors duration-300 ${
            isDark ? "text-white/85" : "text-gray-700"
          }`}
        >
          {["Mobile Development", "AI/ML & Automation", "Applied Computer Vision"].map((area, index) => (
            <li key={area} className="flex items-center gap-3">
              {index > 0 && (
                <span aria-hidden="true" className={isDark ? "text-white/30" : "text-gray-400"}>
                  ·
                </span>
              )}
              {area}
            </li>
          ))}
        </ul>

        <p
          className={`hero-bio mx-auto mt-6 max-w-2xl text-sm md:text-base leading-relaxed transition-colors duration-300 ${
            isDark ? "text-white/70" : "text-gray-600"
          }`}
        >
          Mobile Development Intern at PT. BPR Arto Moro Semarang. I build Flutter applications,
          Python backend services, and applied AI/ML systems on edge hardware.
        </p>
      </div>
    </section>
  )
}
