"use client"

import React from "react"
import { MeshGradient } from "@paper-design/shaders-react"
import { useTheme } from "./auto-theme-provider"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const { theme } = useTheme()
  
  const lightColors = ["#FFFFFF", "#F0F9FF", "#E0F2FE", "#BAE6FD", "#7DD3FC"]
  const darkColors = ["#021024", "#034694", "#4A90E2", "#BFDFFF", "#03132A"]
  
  return (
    <div className={`min-h-dvh relative overflow-hidden transition-colors duration-500 ${
      theme === "dark" ? "bg-black" : "bg-white"
    }`}>
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values={theme === "dark" 
                ? "1 0 0 0 0.02  0 1 0 0 0.02  0 0 1 0 0.05  0 0 0 0.9 0"
                : "1 0 0 0 0.98  0 1 0 0 0.98  0 0 1 0 0.95  0 0 0 0.1 0"
              }
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Primary shader layer with theme-aware colors */}
      <MeshGradient
        className="absolute inset-0 w-full h-full transition-opacity duration-500"
        colors={theme === "dark" ? darkColors : lightColors}
        speed={0.28}
      />

      <MeshGradient
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
          theme === "dark" ? "opacity-60" : "opacity-30"
        }`}
        colors={theme === "dark" ? ["#021024", "#4A90E2", "#7FB8FF", "#034694"] : ["#F0F9FF", "#DBEAFE", "#BFDBFE", "#93C5FD"]}
        speed={0.18}
      />

      {/* Theme-aware decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className={`absolute inset-0 transition-all duration-500 ${
          theme === "dark" 
            ? "bg-gradient-to-br from-[#021024] via-[#042a6b] to-[#034694] opacity-25"
            : "bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 opacity-50"
        }`} />
      </div>

      {children}
    </div>
  )
}
