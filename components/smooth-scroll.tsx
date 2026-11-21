"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/motion/register"
import { MOTION } from "@/lib/motion/tokens"
import { isReducedMotion } from "@/lib/motion/reduced-motion"
import {
  computeScrollProgress,
  resolveRouteScrollTarget,
} from "@/lib/scroll-transition"

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
      duration: options?.duration ?? MOTION.duration.editorial,
      immediate: options?.immediate ?? false,
    })
  } else if (typeof target === "number") {
    window.scrollTo({
      top: target,
      behavior: options?.immediate ? "auto" : "smooth",
    })
  } else if (typeof target === "string") {
    const el = document.getElementById(target.replace(/^#/, ""))
    el?.scrollIntoView({ behavior: options?.immediate ? "auto" : "smooth" })
  } else if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: options?.immediate ? "auto" : "smooth" })
  }
}

function updateScrollProgressVar() {
  const progress = computeScrollProgress(
    window.scrollY,
    document.documentElement.scrollHeight,
    window.innerHeight
  )
  document.documentElement.style.setProperty(
    "--scroll-progress",
    String(progress)
  )
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const localRef = useRef<Lenis | null>(null)
  const isFirstMount = useRef(true)

  useEffect(() => {
    updateScrollProgressVar()

    if (isReducedMotion()) {
      const onNativeScroll = () => updateScrollProgressVar()
      window.addEventListener("scroll", onNativeScroll, { passive: true })
      window.addEventListener("resize", onNativeScroll, { passive: true })
      return () => {
        window.removeEventListener("scroll", onNativeScroll)
        window.removeEventListener("resize", onNativeScroll)
      }
    }

    const lenis = new Lenis({
      lerp: 0.085,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.15,
      syncTouch: true,
      syncTouchLerp: 0.075,
      autoResize: true,
    })

    localRef.current = lenis
    lenisInstance = lenis

    const handleLenisScroll = () => {
      ScrollTrigger.update()
      updateScrollProgressVar()
    }

    lenis.on("scroll", handleLenisScroll)

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a")
      if (!target) return
      const href = target.getAttribute("href")
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault()
        const id = href.slice(1)
        const el = document.getElementById(id)
        if (el) {
          smoothScrollTo(el, { offset: -72, duration: 0.9 })
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    if (document.fonts) {
      document.fonts.ready.then(() => {
        lenis.resize()
        ScrollTrigger.refresh()
        updateScrollProgressVar()
      })
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      lenis.off("scroll", handleLenisScroll)
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
      localRef.current = null
      lenisInstance = null
    }
  }, [])

  // Synchronize smooth scroll & GSAP ScrollTrigger on every App Router page change
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }

    const hash = typeof window !== "undefined" ? window.location.hash : ""
    const target = resolveRouteScrollTarget(pathname, hash)
    const lenis = localRef.current

    if (target.type === "anchor") {
      const anchorEl = document.getElementById(target.id)
      if (anchorEl) {
        smoothScrollTo(anchorEl, { offset: -72, duration: 0.75 })
      } else if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true })
      } else {
        window.scrollTo({ top: 0, behavior: "auto" })
      }
    } else {
      if (lenis) {
        lenis.start()
        lenis.scrollTo(0, { immediate: true, force: true })
      }
      window.scrollTo({ top: 0, behavior: "auto" })
    }

    document.documentElement.style.setProperty("--scroll-progress", "0")

    let rafId2 = 0
    const rafId1 = requestAnimationFrame(() => {
      rafId2 = requestAnimationFrame(() => {
        localRef.current?.resize()
        ScrollTrigger.refresh()
        updateScrollProgressVar()
      })
    })

    return () => {
      cancelAnimationFrame(rafId1)
      if (rafId2) cancelAnimationFrame(rafId2)
    }
  }, [pathname])

  return <>{children}</>
}
