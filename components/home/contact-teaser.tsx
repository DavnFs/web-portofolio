"use client"

import { useState, useRef } from "react"
import { gsap, useGSAP } from "@/lib/motion/register"
import { MOTION } from "@/lib/motion/tokens"
import { profile } from "@/content/profile"
import { trackEvent } from "@/lib/analytics"

export function ContactTeaser() {
  const [copied, setCopied] = useState(false)
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const header = containerRef.current?.querySelector(".contact-header")
        const quote = containerRef.current?.querySelector(".contact-quote")
        const desc = containerRef.current?.querySelector(".contact-desc")
        const emailBox = containerRef.current?.querySelector(".contact-box")
        const links = containerRef.current?.querySelector(".contact-links")

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        })

        if (header) {
          tl.fromTo(
            header,
            { opacity: 0, y: MOTION.distance.sm },
            { opacity: 1, y: 0, duration: MOTION.duration.normal, ease: MOTION.ease.smooth }
          )
        }

        if (quote) {
          tl.fromTo(
            quote,
            { opacity: 0, y: MOTION.distance.mobile },
            { opacity: 1, y: 0, duration: MOTION.duration.editorial, ease: MOTION.ease.editorial },
            "-=0.3"
          )
        }

        if (desc) {
          tl.fromTo(
            desc,
            { opacity: 0, y: MOTION.distance.sm },
            { opacity: 1, y: 0, duration: MOTION.duration.normal, ease: MOTION.ease.smooth },
            "-=0.4"
          )
        }

        if (emailBox) {
          tl.fromTo(
            emailBox,
            { opacity: 0, y: MOTION.distance.mobile },
            { opacity: 1, y: 0, duration: MOTION.mobile.duration, ease: MOTION.ease.smooth },
            "-=0.3"
          )
        }

        if (links) {
          tl.fromTo(
            links,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: MOTION.duration.normal, ease: MOTION.ease.smooth },
            "-=0.3"
          )
        }
      })

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const els = containerRef.current?.querySelectorAll(
          ".contact-header, .contact-quote, .contact-desc, .contact-box, .contact-links"
        )
        if (els) gsap.set(els, { opacity: 1, y: 0 })
      })
    },
    { scope: containerRef }
  )

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      trackEvent("outbound_click", { destination: profile.email, type: "email_copy" })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section
      ref={containerRef}
      id="contact"
      aria-label="Direct contact"
      className="py-24 sm:py-36 border-t border-line/60"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="contact-header md:col-span-3">
          <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
            04 // Contact
          </span>
          <h2 className="text-h2 font-sans font-medium text-ink mt-2">
            Get in <span className="font-editorial-italic font-normal text-accent">touch</span>
          </h2>
        </div>

        <div className="md:col-span-9 space-y-10 max-w-3xl">
          <p className="contact-quote text-display sm:text-h1 font-serif italic font-normal text-ink leading-[1.05]">
            Let&apos;s build software that holds up in the field.
          </p>

          <p className="contact-desc text-body text-ink-muted max-w-xl leading-relaxed">
            I am currently open to full-time engineering roles in backend services, AI/ML infrastructure, and automation. Located in Semarang, Indonesia; open to hybrid or remote arrangements.
          </p>

          {/* Email Box with Copy */}
          <div className="contact-box p-6 sm:p-8 bg-surface border border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="font-mono text-meta uppercase text-ink-muted">Direct Dispatch</div>
              <a
                href={`mailto:${profile.email}`}
                onClick={() => trackEvent("outbound_click", { destination: profile.email, type: "email_direct" })}
                className="text-lg sm:text-xl font-mono text-ink hover:text-accent transition-colors block"
              >
                {profile.email}
              </a>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full sm:w-auto px-5 py-2.5 font-mono text-xs uppercase tracking-wider bg-ink text-bg hover:bg-accent hover:text-white active:scale-95 transition-all"
                aria-live="polite"
              >
                {copied ? "Copied to clipboard ✓" : "Copy Address"}
              </button>
            </div>
          </div>

          {/* Outbound Quick Links */}
          <div className="contact-links flex flex-wrap items-center gap-6 pt-4 font-mono text-xs uppercase tracking-wider text-ink-muted">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("outbound_click", { destination: profile.github, type: "github_hero" })}
              className="hover:text-accent active:translate-x-0.5 transition-all inline-flex items-center gap-1"
            >
              <span>GitHub</span>
              <span>↗</span>
            </a>
            <span>/</span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("outbound_click", { destination: profile.linkedin, type: "linkedin_hero" })}
              className="hover:text-accent active:translate-x-0.5 transition-all inline-flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <span>↗</span>
            </a>
            <span>/</span>
            <a
              href={profile.cvPath}
              download
              onClick={() => trackEvent("cv_download", { source: "contact_section" })}
              className="text-accent hover:underline active:translate-x-0.5 transition-all inline-flex items-center gap-1"
            >
              <span>Download CV (DOCX)</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
