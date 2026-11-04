"use client"

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/motion/register"
import { MOTION } from "@/lib/motion/tokens"
import { MOTION_QUERIES } from "@/lib/motion/reduced-motion"
import { cn } from "@/lib/utils"

interface MotionDiagramProps {
  children: React.ReactNode
  className?: string
}

/**
 * Editorial Motion Diagram (A15)
 * Triggers SVG stroke drawing and card reveal as technical diagrams scroll into view.
 */
export function MotionDiagram({ children, className }: MotionDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const mm = gsap.matchMedia()

      mm.add(MOTION_QUERIES.motionOK, () => {
        const svg = containerRef.current?.querySelector("svg")
        if (!svg) return

        const paths = svg.querySelectorAll("path, line, polyline")
        const rects = svg.querySelectorAll("rect, circle")

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })

        if (paths.length > 0) {
          paths.forEach((p) => {
            const path = p as SVGPathElement
            const length = path.getTotalLength ? path.getTotalLength() : 100
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
            })
          })

          tl.to(paths, {
            strokeDashoffset: 0,
            duration: MOTION.duration.slow,
            stagger: 0.05,
            ease: MOTION.ease.editorial,
          })
        }

        if (rects.length > 0) {
          tl.fromTo(
            rects,
            { opacity: 0, scale: 0.96 },
            {
              opacity: 1,
              scale: 1,
              duration: MOTION.duration.normal,
              stagger: 0.03,
              ease: MOTION.ease.smooth,
            },
            "-=0.8"
          )
        }
      })

      mm.add(MOTION_QUERIES.reducedMotion, () => {
        const svg = containerRef.current?.querySelector("svg")
        if (svg) {
          gsap.set(svg.querySelectorAll("*"), { opacity: 1, strokeDashoffset: 0 })
        }
      })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className={cn("w-full overflow-hidden", className)}>
      {children}
    </div>
  )
}
