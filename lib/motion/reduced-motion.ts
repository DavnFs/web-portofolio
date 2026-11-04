"use client"

import { gsap } from "./register"

/**
 * Shared media query conditions for gsap.matchMedia()
 * Rule: All GSAP animations must check prefers-reduced-motion.
 */
export const MOTION_QUERIES = {
  // Standard motion enabled
  motionOK: "(prefers-reduced-motion: no-preference)",
  // Reduced motion requested
  reducedMotion: "(prefers-reduced-motion: reduce)",
  // Desktop only
  desktop: "(min-width: 768px)",
  // Desktop with standard motion
  desktopMotion: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  // Touch / Mobile
  mobile: "(max-width: 767px)",
} as const

export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function isTouchPointer(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(hover: none)").matches
}
