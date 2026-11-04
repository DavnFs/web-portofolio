"use client"

import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"
import { gsap } from "@/lib/motion/register"
import { MOTION } from "@/lib/motion/tokens"
import { isReducedMotion } from "@/lib/motion/reduced-motion"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isManual, setIsManual] = useState(false)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setMounted(true)
    setIsManual(localStorage.getItem("ds_manual_theme_override") === "true")
  }, [])

  if (!mounted) {
    return (
      <div
        className="font-mono text-meta text-ink-muted uppercase tracking-wider py-1.5 px-2 select-none"
        aria-hidden="true"
      >
        Theme: [ - ]
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"
  const clockTheme = new Date().getHours() >= 6 && new Date().getHours() < 18 ? "light" : "dark"

  const handleToggle = () => {
    if (!isReducedMotion() && labelRef.current) {
      // Theme Toggle Micro-transition (A6)
      gsap.fromTo(
        labelRef.current,
        { opacity: 0.3, y: -4 },
        { opacity: 1, y: 0, duration: MOTION.duration.fast, ease: MOTION.ease.editorial }
      )
    }

    if (!isManual) {
      // Switch from Auto to Manual (opposite of current clock)
      const next = isDark ? "light" : "dark"
      localStorage.setItem("ds_manual_theme_override", "true")
      setIsManual(true)
      setTheme(next)
    } else {
      // If currently manual, toggle back to Auto (Clock)
      localStorage.removeItem("ds_manual_theme_override")
      setIsManual(false)
      setTheme(clockTheme)
    }
  }

  const label = isManual
    ? isDark
      ? "Dark"
      : "Light"
    : `Auto (${isDark ? "Night" : "Day"})`

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="group inline-flex items-center gap-1.5 font-mono text-meta uppercase tracking-wider text-ink-muted hover:text-ink transition-colors py-1.5 px-2 -mx-2 focus-visible:ring-1 focus-visible:ring-accent rounded-sm cursor-pointer select-none"
      aria-label={`Current theme: ${label}. Click to toggle.`}
      title={isManual ? "Manual theme active. Click to switch to Auto (Clock)" : "Clock auto-theme active"}
    >
      <span className="text-ink-muted group-hover:text-accent transition-colors" aria-hidden="true">[</span>
      <span ref={labelRef} className="inline-block">{label}</span>
      <span className="text-ink-muted group-hover:text-accent transition-colors" aria-hidden="true">]</span>
    </button>
  )
}
