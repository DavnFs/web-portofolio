"use client"

import React, { useEffect, useRef, useState } from "react"
import { MeshGradient, type PaperShaderElement } from "@paper-design/shaders-react"
import {
  DEFAULT_MESH_SEED,
  INITIAL_CURSOR_FIELD,
  computeMeshUniforms,
  createMeshSessionSeed,
  stepCursorSpring,
  type CursorFieldState,
  type MeshSessionSeed,
} from "@/lib/hero-field"
import { isReducedMotion } from "@/lib/motion/reduced-motion"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

// Always-Light atmospheric sky, ice-azure & crisp white MeshGradient palette
const PRIMARY_LIGHT_COLORS = [
  "#FFFFFF",
  "#E0F2FE",
  "#BAE6FD",
  "#60A5FA",
  "#3B82F6",
]

const SECONDARY_LIGHT_COLORS = [
  "#FFFFFF",
  "#F0F9FF",
  "#DBEAFE",
  "#93C5FD",
]

/**
 * Restored Dual-Layer WebGL MeshGradient Hero Background (Always-Light Mode).
 * Preserves the silky @paper-design/shaders-react flowing gradient look while
 * adding randomized per-visit phase seeds and smooth spring-damped cursor
 * parallax/swirl directly on the GPU uniforms with zero React re-renders.
 */
export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const primaryRef = useRef<PaperShaderElement>(null)
  const secondaryRef = useRef<PaperShaderElement>(null)
  const cursorRef = useRef<CursorFieldState>({ ...INITIAL_CURSOR_FIELD })
  const seedRef = useRef<MeshSessionSeed>(DEFAULT_MESH_SEED)

  const [reducedMotion, setReducedMotion] = useState(false)
  const [sessionSeed, setSessionSeed] = useState<MeshSessionSeed>(DEFAULT_MESH_SEED)

  useEffect(() => {
    const prefersReduced = isReducedMotion()
    setReducedMotion(prefersReduced)

    const freshSeed = createMeshSessionSeed()
    seedRef.current = freshSeed
    setSessionSeed(freshSeed)

    // Jump both shader mounts to randomized starting frames immediately
    primaryRef.current?.paperShaderMount?.setFrame(freshSeed.primaryFrame)
    secondaryRef.current?.paperShaderMount?.setFrame(freshSeed.secondaryFrame)

    if (prefersReduced) return

    const container = containerRef.current
    if (!container) return

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      if (rect.width <= 0 || rect.height <= 0) return

      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom

      if (inside) {
        cursorRef.current.targetX = Math.min(
          1,
          Math.max(0, (e.clientX - rect.left) / rect.width)
        )
        cursorRef.current.targetY = Math.min(
          1,
          Math.max(0, (e.clientY - rect.top) / rect.height)
        )
        cursorRef.current.active = true
        container.dataset.cursorActive = "true"
      } else if (cursorRef.current.active) {
        cursorRef.current.active = false
        container.dataset.cursorActive = "false"
      }
    }

    const handlePointerLeave = () => {
      cursorRef.current.active = false
      container.dataset.cursorActive = "false"
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    document.addEventListener("pointerleave", handlePointerLeave)

    let rafId = 0
    let isVisible = true
    const startNow = performance.now()
    let lastNow = startNow

    const tick = (now: number) => {
      rafId = 0
      if (!isVisible || document.hidden) return

      const dtSec = (now - lastNow) / 1000
      lastNow = now
      const elapsedSec = (now - startNow) / 1000

      cursorRef.current = stepCursorSpring(cursorRef.current, dtSec)
      const uniforms = computeMeshUniforms(
        seedRef.current,
        elapsedSec,
        cursorRef.current
      )

      primaryRef.current?.paperShaderMount?.setUniforms({
        u_offsetX: uniforms.primary.u_offsetX,
        u_offsetY: uniforms.primary.u_offsetY,
        u_rotation: uniforms.primary.u_rotation,
        u_swirl: uniforms.primary.u_swirl,
        u_distortion: uniforms.primary.u_distortion,
      })

      secondaryRef.current?.paperShaderMount?.setUniforms({
        u_offsetX: uniforms.secondary.u_offsetX,
        u_offsetY: uniforms.secondary.u_offsetY,
        u_rotation: uniforms.secondary.u_rotation,
        u_swirl: uniforms.secondary.u_swirl,
        u_distortion: uniforms.secondary.u_distortion,
      })

      rafId = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      if (!rafId && isVisible && !document.hidden) {
        lastNow = performance.now()
        rafId = requestAnimationFrame(tick)
      }
    }

    const stopLoop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries.some((entry) => entry.isIntersecting)
        if (isVisible) startLoop()
        else stopLoop()
      },
      { threshold: 0.01 }
    )
    intersectionObserver.observe(container)

    const handleVisibilityChange = () => {
      if (document.hidden) stopLoop()
      else startLoop()
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    startLoop()

    return () => {
      stopLoop()
      window.removeEventListener("pointermove", handlePointerMove)
      document.removeEventListener("pointerleave", handlePointerLeave)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      intersectionObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      data-testid="hero-shader-stage"
      data-cursor-active="false"
      className="min-h-dvh relative overflow-hidden bg-white"
    >
      {/* Primary flowing WebGL MeshGradient */}
      <MeshGradient
        ref={primaryRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        colors={PRIMARY_LIGHT_COLORS}
        speed={reducedMotion ? 0 : 0.34}
        frame={sessionSeed.primaryFrame}
        distortion={0.84}
        swirl={0.32}
        scale={1.12}
        minPixelRatio={1}
        maxPixelCount={1280 * 720}
      />

      {/* Secondary atmospheric MeshGradient weave with subtle counter-parallax */}
      <MeshGradient
        ref={secondaryRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
        colors={SECONDARY_LIGHT_COLORS}
        speed={reducedMotion ? 0 : 0.24}
        frame={sessionSeed.secondaryFrame}
        distortion={0.9}
        swirl={0.44}
        rotation={42}
        scale={1.18}
        minPixelRatio={1}
        maxPixelCount={1280 * 720}
      />

      {/* Gentle luminous veil so editorial dark ink stays crisp & legible across every wave */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_48%,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.12)_65%,rgba(255,255,255,0)_100%)]"
      />

      {/* Seamless transition into the pure white editorial canvas below */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white"
      />

      {children}
    </div>
  )
}
