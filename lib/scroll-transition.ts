export interface PageTransitionMotion {
  initial: { opacity: number; y: number }
  animate: { opacity: number; y: number }
  transition: { duration: number; ease: [number, number, number, number] }
}

export type RouteScrollTarget =
  | { type: "top" }
  | { type: "anchor"; id: string }

/**
 * Computes normalized vertical scroll progress in [0, 1].
 * Guards against non-scrollable or zero-height viewports.
 */
export function computeScrollProgress(
  scrollY: number,
  scrollHeight: number,
  viewportHeight: number
): number {
  const maxScroll = scrollHeight - viewportHeight
  if (!Number.isFinite(scrollY) || !Number.isFinite(maxScroll) || maxScroll <= 0) {
    return 0
  }
  const ratio = scrollY / maxScroll
  if (ratio <= 0) return 0
  if (ratio >= 1) return 1
  return Number(ratio.toFixed(4))
}

/**
 * Resolves where smooth scrolling should settle after a Next.js route transition.
 * Hash fragments target the matching DOM id; standard route changes reset to top.
 */
export function resolveRouteScrollTarget(
  _pathname: string,
  hash: string
): RouteScrollTarget {
  const trimmed = hash.trim()
  if (trimmed.startsWith("#") && trimmed.length > 1) {
    return { type: "anchor", id: trimmed.slice(1) }
  }
  return { type: "top" }
}

/**
 * Returns lightweight compositor-only Framer Motion specs for route page transitions.
 * - Initial SSR/first-paint renders immediately at opacity 1 (zero blank flash).
 * - Client-side route transitions glide smoothly via opacity + translateY.
 * - Reduced-motion collapses motion cleanly.
 */
export function getPageTransitionMotion(
  prefersReducedMotion: boolean,
  isClientNavigation = true
): PageTransitionMotion {
  if (prefersReducedMotion || !isClientNavigation) {
    return {
      initial: { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.01, ease: [0.22, 1, 0.36, 1] },
    }
  }

  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  }
}
