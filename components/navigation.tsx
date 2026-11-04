"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { CASE_STUDIES } from "@/content/case-studies/types"
import { trackEvent } from "@/lib/analytics"

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [workMenuOpen, setWorkMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const workMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menus on path change
  useEffect(() => {
    setWorkMenuOpen(false)
    setMobileMenuOpen(false)
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
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

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
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 -mr-2 text-ink hover:text-accent transition-colors font-mono text-xs uppercase"
          >
            {mobileMenuOpen ? "[ Close ]" : "[ Menu ]"}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-[61px] bg-bg z-40 p-6 flex flex-col justify-between overflow-y-auto border-t border-line"
        >
          <div className="space-y-6 pt-4">
            <div className="font-mono text-meta text-ink-muted uppercase tracking-wider">
              Navigation
            </div>
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-serif italic text-ink hover:text-accent transition-colors"
              >
                Index
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-serif italic text-ink hover:text-accent transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-serif italic text-ink hover:text-accent transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="pt-6 border-t border-line">
              <div className="font-mono text-meta text-ink-muted uppercase tracking-wider mb-4">
                Selected Work
              </div>
              <div className="space-y-3">
                {CASE_STUDIES.map((cs) => (
                  <Link
                    key={cs.slug}
                    href={`/work/${cs.slug}`}
                    onClick={() => {
                      setMobileMenuOpen(false)
                      trackEvent("case_study_open", { slug: cs.slug, source: "mobile_menu" })
                    }}
                    className="block group py-1"
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
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 pt-2 text-xs font-mono text-accent hover:underline uppercase tracking-wider"
                >
                  <span>Full Archive</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-8 pb-4 border-t border-line text-xs font-mono text-ink-muted">
            <p>Davin Fausta Supriyadi — Semarang, ID</p>
          </div>
        </div>
      )}
    </header>
  )
}
