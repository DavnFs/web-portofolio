"use client"

import { ArrowRight } from "lucide-react"
import { useTheme } from "./auto-theme-provider"
import { profile } from "@/lib/portfolio-data"

export default function HeroContent() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const scrollTo = (id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <section
      aria-label="Introduction"
      className="relative z-20 flex min-h-dvh items-center justify-center px-6 pb-16 pt-28 no-dm"
    >
      <div className="w-full max-w-3xl text-center">
        <h1
          className={`mt-6 text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight font-light transition-colors duration-300 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          <span className="font-serif font-medium italic">Hi, I&apos;m</span>{" "}
          <span className="block">Davin Supriyadi</span>
        </h1>

        <ul
          className={`mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm md:text-base font-medium transition-colors duration-300 ${
            isDark ? "text-white/85" : "text-gray-700"
          }`}
        >
          {profile.focusAreas.map((area, index) => (
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
          className={`mx-auto mt-6 max-w-2xl text-sm md:text-base leading-relaxed transition-colors duration-300 ${
            isDark ? "text-white/60" : "text-gray-600"
          }`}
        >
          I build Python backend services, REST APIs, and applied AI/ML systems, from YOLOv11
          perception research on edge hardware to LLM-assisted product features.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => scrollTo("projects")}
            className={`group inline-flex min-h-11 items-center rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isDark
                ? "bg-white text-black hover:bg-white/90 focus-visible:outline-white"
                : "bg-gray-900 text-white hover:bg-gray-900/90 focus-visible:outline-gray-900"
            }`}
          >
            View projects
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className={`inline-flex min-h-11 items-center rounded-full border px-7 py-3.5 text-sm font-normal transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isDark
                ? "border-white/30 text-white hover:bg-white/10 hover:border-white/50 focus-visible:outline-white"
                : "border-gray-900/30 text-gray-900 hover:bg-gray-900/10 hover:border-gray-900/50 focus-visible:outline-gray-900"
            }`}
          >
            Get in touch
          </button>
        </div>
      </div>
    </section>
  )
}
