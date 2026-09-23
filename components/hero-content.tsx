"use client"

import Link from "next/link"
import { ArrowRight, Download, MapPin } from "lucide-react"
import { useTheme } from "./auto-theme-provider"
import { highlights, profile } from "@/lib/portfolio-data"

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
      className="absolute inset-0 z-20 flex items-center justify-center px-6 py-24 no-dm overflow-y-auto"
    >
      <div className="w-full max-w-3xl text-center">
        <p
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs sm:text-sm font-medium tracking-wide transition-colors duration-300 ${
            isDark
              ? "border-white/20 bg-white/5 text-white/80"
              : "border-gray-900/15 bg-white/50 text-gray-700"
          }`}
        >
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {profile.headline}
        </p>

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
          I build Python backend services, REST APIs, and applied AI/ML systems — from YOLOv11
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
            View Projects
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </button>

          <Link
            href={profile.resumeFile}
            download
            className={`group inline-flex min-h-11 items-center rounded-full border px-7 py-3.5 text-sm font-normal transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isDark
                ? "border-white/30 text-white hover:bg-white/10 hover:border-white/50 focus-visible:outline-white"
                : "border-gray-900/30 text-gray-900 hover:bg-gray-900/10 hover:border-gray-900/50 focus-visible:outline-gray-900"
            }`}
          >
            <Download className="mr-2 h-4 w-4" aria-hidden="true" />
            Download CV
          </Link>
        </div>

        <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {highlights.map((item) => (
            <div
              key={item.label}
              className={`rounded-2xl border px-4 py-4 backdrop-blur-sm transition-colors duration-300 ${
                isDark ? "border-white/15 bg-white/5" : "border-gray-900/10 bg-white/50"
              }`}
            >
              <dt
                className={`text-[0.7rem] uppercase tracking-wider transition-colors duration-300 ${
                  isDark ? "text-white/50" : "text-gray-500"
                }`}
              >
                {item.label}
              </dt>
              <dd
                className={`mt-1.5 text-base sm:text-lg font-medium transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {item.value}
                <span className={`ml-1 text-xs font-normal ${isDark ? "text-white/50" : "text-gray-500"}`}>
                  {item.detail}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
