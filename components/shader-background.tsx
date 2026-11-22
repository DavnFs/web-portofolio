"use client"

import React, { useEffect, useRef } from "react"
import {
  INITIAL_CURSOR_FIELD,
  computeCloudPosition,
  createHeroClouds,
  stepCursorSpring,
  type CursorFieldState,
  type HeroCloud,
} from "@/lib/hero-field"
import { isReducedMotion } from "@/lib/motion/reduced-motion"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

/**
 * Monochrome Cool-Silver & Crisp White Hero Atmosphere.
 * Hybrid motion: randomized organic drifting clouds blended with a smooth,
 * spring-damped cursor follower and subtle magnetic cloud attraction.
 * Runs in a single high-DPI 2D canvas loop with zero React re-renders per frame.
 */
export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<CursorFieldState>({ ...INITIAL_CURSOR_FIELD })
  const cloudsRef = useRef<HeroCloud[] | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    if (!cloudsRef.current) {
      cloudsRef.current = createHeroClouds()
    }
    const clouds = cloudsRef.current

    let bufW = 360
    let bufH = 225

    const resizeCanvas = () => {
      const cssW = container.clientWidth || window.innerWidth || 1440
      const cssH = container.clientHeight || window.innerHeight || 900
      const aspect = cssH / Math.max(1, cssW)
      // Soft atmospheric radial mist is purely low-frequency; a scaled backing
      // buffer (~0.25x, clamped to 240-440px wide) bilinearly upscaled by CSS
      // looks identically silky while slashing per-frame fill work by >16x.
      bufW = Math.round(Math.min(440, Math.max(240, cssW * 0.25)))
      bufH = Math.max(160, Math.round(bufW * aspect))
      canvas.width = bufW
      canvas.height = bufH
      ctx.setTransform(1, 0, 0, 1, 0, 0)
    }

    const drawFrame = (timeSec: number, cursor: CursorFieldState) => {
      const width = bufW
      const height = bufH

      // Crisp white base canvas
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(0, 0, width, height)

      // Subtle cool-silver diagonal ambient wash so edges feel architectural
      const ambient = ctx.createLinearGradient(0, 0, width, height)
      ambient.addColorStop(0, "rgba(248, 250, 252, 0.9)")
      ambient.addColorStop(0.5, "rgba(255, 255, 255, 0)")
      ambient.addColorStop(1, "rgba(241, 245, 249, 0.85)")
      ctx.fillStyle = ambient
      ctx.fillRect(0, 0, width, height)

      const maxDim = Math.max(width, height)

      // 1. Randomized organic drifting monochrome cool-silver clouds
      for (const cloud of clouds) {
        const pt = computeCloudPosition(cloud, timeSec, cursor)
        const cx = pt.x * width
        const cy = pt.y * height
        const radius = cloud.radiusRatio * maxDim * pt.radiusScale

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        grad.addColorStop(0, cloud.innerRgba)
        grad.addColorStop(0.48, cloud.midRgba)
        grad.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // 2. Smooth spring-damped cursor-following cool-silver luminous aura
      if (cursor.strength > 0.005) {
        const px = cursor.x * width
        const py = cursor.y * height
        const speedBloom = 1 + Math.min(0.28, cursor.speed * 0.18)
        const cursorRadius = maxDim * 0.28 * speedBloom

        const aura = ctx.createRadialGradient(px, py, 0, px, py, cursorRadius)
        aura.addColorStop(0, `rgba(148, 163, 184, ${(0.28 * cursor.strength).toFixed(4)})`)
        aura.addColorStop(0.35, `rgba(203, 213, 225, ${(0.18 * cursor.strength).toFixed(4)})`)
        aura.addColorStop(0.7, `rgba(226, 232, 240, ${(0.07 * cursor.strength).toFixed(4)})`)
        aura.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = aura
        ctx.beginPath()
        ctx.arc(px, py, cursorRadius, 0, Math.PI * 2)
        ctx.fill()

        // Delicate specular silver core highlight right under the smoothed cursor
        const coreRadius = maxDim * 0.085 * speedBloom
        const core = ctx.createRadialGradient(px, py, 0, px, py, coreRadius)
        core.addColorStop(0, `rgba(255, 255, 255, ${(0.72 * cursor.strength).toFixed(4)})`)
        core.addColorStop(0.55, `rgba(241, 245, 249, ${(0.22 * cursor.strength).toFixed(4)})`)
        core.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = core
        ctx.beginPath()
        ctx.arc(px, py, coreRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      // 3. Soft vertical fade into pure white at the bottom edge for seamless transition to next section
      const bottomFade = ctx.createLinearGradient(0, height * 0.78, 0, height)
      bottomFade.addColorStop(0, "rgba(255, 255, 255, 0)")
      bottomFade.addColorStop(1, "rgba(255, 255, 255, 1)")
      ctx.fillStyle = bottomFade
      ctx.fillRect(0, height * 0.78, width, height * 0.22)
    }

    resizeCanvas()

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

    let isVisible = true
    const startNow = performance.now()
    let lastNow = startNow

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas()
      drawFrame((performance.now() - startNow) / 1000, cursorRef.current)
    })
    resizeObserver.observe(container)

    // Render initial serene frame immediately before scheduling animation
    drawFrame(0, INITIAL_CURSOR_FIELD)

    // Static serene monochrome cool-silver frame under prefers-reduced-motion
    if (isReducedMotion()) {
      return () => {
        resizeObserver.disconnect()
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    document.addEventListener("pointerleave", handlePointerLeave)

    let rafId = 0

    const tick = (now: number) => {
      rafId = 0
      if (!isVisible || document.hidden) return
      const dtSec = (now - lastNow) / 1000
      lastNow = now
      const elapsedSec = (now - startNow) / 1000

      cursorRef.current = stepCursorSpring(cursorRef.current, dtSec)
      drawFrame(elapsedSec, cursorRef.current)
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
        if (isVisible) {
          startLoop()
        } else {
          stopLoop()
        }
      },
      { threshold: 0.01 }
    )
    intersectionObserver.observe(container)

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop()
      } else {
        startLoop()
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    startLoop()

    return () => {
      stopLoop()
      window.removeEventListener("pointermove", handlePointerMove)
      document.removeEventListener("pointerleave", handlePointerLeave)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      intersectionObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      data-cursor-active="false"
      className="min-h-dvh relative overflow-hidden bg-white"
    >
      <canvas
        ref={canvasRef}
        data-testid="hero-atmosphere-canvas"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      {children}
    </div>
  )
}
