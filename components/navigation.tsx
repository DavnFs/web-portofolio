"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { CASE_STUDIES } from "@/content/case-studies/types"
import { trackEvent } from "@/lib/analytics"
import { ThemeToggle } from "@/components/theme-toggle"
import { stopSmoothScroll, startSmoothScroll } from "@/components/smooth-scroll"
import { gsap } from "@/lib/motion/register"
import { MOTION } from "@/lib/motion/tokens"
import { isReducedMotion } from "@/lib/motion/reduced-motion"

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [workMenuOpen, setWorkMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const workMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCloseMobileMenu = (callback?: () => void) => {
    if (!mobileMenuRef.current || isReducedMotion()) {
      setMobileMenuOpen(false)
      setIsClosing(false)
      startSmoothScroll()
      callback?.()
      return
    }

    setIsClosing(true)
    gsap.to(mobileMenuRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setMobileMenuOpen(false)
        setIsClosing(false)
        startSmoothScroll()
        callback?.()
      },
    })
  }

  const handleToggleMobileMenu = () => {
    if (mobileMenuOpen) {
      handleCloseMobileMenu()
    } else {
      setMobileMenuOpen(true)
      stopSmoothScroll()
    }
  }

  // Close menus on path change
  useEffect(() => {
    setWorkMenuOpen(false)
    setMobileMenuOpen(false)
    startSmoothScroll()
  }, [pathname])

  // Close work menu on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (workMenuRef.current && !workMenuRef.current.contains(e.target as Node)) {
        setWorkMenuOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setWorkMenuOpen(false)
        if (mobileMenuOpen) {
          handleCloseMobileMenu()
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [mobileMenuOpen])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
      stopSmoothScroll()
    } else {
      document.body.style.overflow = ""
      startSmoothScroll()
    }
    return () => {
      document.body.style.overflow = ""
      startSmoothScroll()
    }
  }, [mobileMenuOpen])

  // Mobile menu entrance micro-animation (A5)
  useEffect(() => {
    if (mobileMenuOpen && !isClosing && mobileMenuRef.current) {
      if (isReducedMotion()) {
        gsap.set(mobileMenuRef.current, { opacity: 1, y: 0 })
        return
      }

      const tl = gsap.timeline({
        defaults: { ease: MOTION.ease.editorial },
      })

      tl.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.3 }
      )
        .fromTo(
          ".mobile-nav-item",
          { opacity: 0, x: -14 },
          { opacity: 1, x: 0, duration: 0.35, stagger: 0.04 },
          "-=0.15"
        )
        .fromTo(
          ".mobile-work-item",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.03 },
          "-=0.2"
        )
        .fromTo(
          ".mobile-footer-item",
          { opacity: 0 },
          { opacity: 1, duration: 0.25 },
          "-=0.15"
        )
    }
  }, [mobileMenuOpen, isClosing])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/85 backdrop-blur-md border-b border-line/60 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-canvas mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Left: Original Brand */}
        <div className="flex items-center">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-base sm:text-lg font-semibold tracking-tight text-ink hover:text-accent transition-colors py-1 focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
          >
            Davin Supriyadi
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm" aria-label="Main navigation">
          <Link
            href="/about"
            className={`transition-colors py-1 hover:text-accent ${
              pathname === "/about" ? "text-accent font-medium" : "text-ink-muted hover:text-ink"
            }`}
          >
            About
          </Link>

          {/* Work Dropdown */}
          <div
            className="relative"
            ref={workMenuRef}
            onMouseEnter={() => setWorkMenuOpen(true)}
            onMouseLeave={() => setWorkMenuOpen(false)}
          >
            <button
              type="button"
              onClick={() => setWorkMenuOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={workMenuOpen}
              className={`flex items-center gap-1.5 py-1 transition-colors hover:text-accent ${
                pathname.startsWith("/work")
                  ? "text-accent font-medium"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              <span>Work</span>
              <span
                className={`font-mono text-[10px] text-ink-muted transition-transform duration-200 ${
                  workMenuOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>

            {/* Dropdown panel */}
            {workMenuOpen && (
              <div
                className="absolute right-0 top-full pt-2 w-80 animate-in fade-in zoom-in-95 duration-150 z-50"
                role="menu"
              >
                <div className="bg-surface border border-line p-2 shadow-xl rounded-none">
                  <div className="px-3 py-2 font-mono text-meta text-ink-muted uppercase border-b border-line mb-1">
                    Featured Case Studies
                  </div>
                  {CASE_STUDIES.map((cs) => (
                    <Link
                      key={cs.slug}
                      href={`/work/${cs.slug}`}
                      role="menuitem"
                      onClick={() => {
                        setWorkMenuOpen(false)
                        trackEvent("case_study_open", { slug: cs.slug, source: "nav_dropdown" })
                      }}
                      className="group flex items-start gap-3 p-2.5 hover:bg-bg transition-colors"
                    >
                      <span className="font-mono text-meta text-accent shrink-0 pt-0.5">
                        ({cs.index})
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-ink group-hover:text-accent transition-colors truncate">
                          {cs.title}
                        </div>
                        <div className="text-xs text-ink-muted line-clamp-1 mt-0.5">
                          {cs.tagline}
                        </div>
                      </div>
                    </Link>
                  ))}

                  <div className="border-t border-line mt-1 pt-1">
                    <Link
                      href="/work"
                      role="menuitem"
                      onClick={() => setWorkMenuOpen(false)}
                      className="group flex items-center justify-between px-3 py-2 text-xs font-mono text-ink-muted hover:text-ink hover:bg-bg transition-colors uppercase tracking-wider"
                    >
                      <span>All Work & Archive</span>
                      <span className="text-accent group-hover:translate-x-0.5 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className={`transition-colors py-1 hover:text-accent ${
              pathname === "/contact" ? "text-accent font-medium" : "text-ink-muted hover:text-ink"
            }`}
          >
            Contact
          </Link>

          <ThemeToggle />
        </nav>

        {/* Mobile Menu Actions & Button (A5) */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={handleToggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 -mr-2 text-ink hover:text-accent transition-all duration-200 font-mono text-xs uppercase active:scale-95"
          >
            {mobileMenuOpen ? "[ Close ]" : "[ Menu ]"}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay (A5 with staggered entrance and smooth exit) */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="fixed inset-0 top-[61px] bg-bg/95 backdrop-blur-md z-40 p-6 flex flex-col justify-between overflow-y-auto border-t border-line will-change-[transform,opacity]"
        >
          <div className="space-y-6 pt-4">
            <div className="mobile-nav-item font-mono text-meta text-ink-muted uppercase tracking-wider">
              Navigation
            </div>
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => handleCloseMobileMenu()}
                className="mobile-nav-item text-2xl font-serif italic text-ink hover:text-accent active:translate-x-1.5 transition-all"
              >
                Index
              </Link>
              <Link
                href="/about"
                onClick={() => handleCloseMobileMenu()}
                className="mobile-nav-item text-2xl font-serif italic text-ink hover:text-accent active:translate-x-1.5 transition-all"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => handleCloseMobileMenu()}
                className="mobile-nav-item text-2xl font-serif italic text-ink hover:text-accent active:translate-x-1.5 transition-all"
              >
                Contact
              </Link>
            </div>

            <div className="pt-6 border-t border-line">
              <div className="mobile-work-item font-mono text-meta text-ink-muted uppercase tracking-wider mb-4">
                Selected Work
              </div>
              <div className="space-y-3">
                {CASE_STUDIES.map((cs) => (
                  <Link
                    key={cs.slug}
                    href={`/work/${cs.slug}`}
                    onClick={() => {
                      handleCloseMobileMenu(() => {
                        trackEvent("case_study_open", { slug: cs.slug, source: "mobile_menu" })
                      })
                    }}
                    className="mobile-work-item block group py-1 active:translate-x-1 transition-transform"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-accent">({cs.index})</span>
                      <span className="text-base text-ink group-hover:text-accent transition-colors">
                        {cs.title}
                      </span>
                    </div>
                    <p className="text-xs text-ink-muted pl-6">{cs.tagline}</p>
                  </Link>
                ))}
                <Link
                  href="/work"
                  onClick={() => handleCloseMobileMenu()}
                  className="mobile-work-item inline-flex items-center gap-2 pt-2 text-xs font-mono text-accent hover:underline uppercase tracking-wider active:translate-x-1 transition-transform"
                >
                  <span>Full Archive</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mobile-footer-item pt-8 pb-4 border-t border-line text-xs font-mono text-ink-muted flex items-center justify-between">
            <p>Davin Fausta Supriyadi — Semarang, ID</p>
          </div>
        </div>
      )}
    </header>
  )
}
