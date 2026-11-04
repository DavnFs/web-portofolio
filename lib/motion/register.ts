"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

let registered = false

export function registerGSAP() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger, useGSAP)
    registered = true
  }
}

// Auto-register when imported on client
if (typeof window !== "undefined") {
  registerGSAP()
}

export { gsap, ScrollTrigger, useGSAP }
