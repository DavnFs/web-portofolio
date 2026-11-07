"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/motion/register"
import { MOTION } from "@/lib/motion/tokens"
import { isReducedMotion } from "@/lib/motion/reduced-motion"

export let lenisInstance: Lenis | null = null

export function stopSmoothScroll() {
  lenisInstance?.stop()
}

export function startSmoothScroll() {
  lenisInstance?.start()
}

export function smoothScrollTo(
  target: string | number | HTMLElement,
  options?: { offset?: number; duration?: number; immediate?: boolean }
) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? MOTION.duration.slow,
      immediate: options?.immediate ?? false,
    })
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" })
  } else if (typeof target === "string") {
    const el = document.getElementById(target.replace(/^#/, ""))
    el?.scrollIntoView({ behavior: "smooth" })
  } else if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: "smooth" })
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const localRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (isReducedMotion()) return

    // Exact weighted inertial configuration matching Solicia Brown (A2)
    const lenis = new Lenis({
      duration: MOTION.duration.slow, // 1.2s
      easing: MOTION.ease.lenisExpo,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.0,
      syncTouch: false,
    })

    localRef.current = lenis
    lenisInstance = lenis

    lenis.on("scroll", ScrollTrigger.update)

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    // Handle in-page anchor clicks (e.g. <a href="#work">)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a")
      if (!target) return
      const href = target.getAttribute("href")
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault()
        const id = href.slice(1)
        const el = document.getElementById(id)
        if (el) {
          smoothScrollTo(el, { offset: -60 })
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    // Refresh ScrollTrigger after fonts finish loading
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh()
      })
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
      localRef.current = null
      lenisInstance = null
    }
  }, [])

  return <>{children}</>
}
