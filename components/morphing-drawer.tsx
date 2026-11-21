"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { X, ChevronRight, ArrowUpRight } from "lucide-react"
import { CASE_STUDIES } from "@/content/case-studies/types"
import { profile } from "@/content/profile"
import { trackEvent } from "@/lib/analytics"
import { stopSmoothScroll, startSmoothScroll } from "@/components/smooth-scroll"

interface MorphingDrawerProps {
  open: boolean
  activeSubmenu: "work" | null
  pathname: string
  onClose: () => void
  onSetSubmenu: (submenu: "work" | null) => void
  onToggleWorkSubmenu: () => void
}

const PRIMARY_ROUTES = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work", expandable: true as const },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function MorphingDrawer({
  open,
  activeSubmenu,
  pathname,
  onClose,
  onSetSubmenu,
  onToggleWorkSubmenu,
}: MorphingDrawerProps) {
  const prefersReduced = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    stopSmoothScroll()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    const handleMouseDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleMouseDown)
    return () => {
      startSmoothScroll()
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleMouseDown)
    }
  }, [open, onClose])

  const spring = prefersReduced
    ? { duration: 0.01 }
    : { type: "spring" as const, stiffness: 360, damping: 32, mass: 0.9 }

  const showWorkPane = activeSubmenu === "work"

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Subtle scrim behind morphed drawer */}
          <motion.div
            key="morphing-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0.01 : 0.2 }}
            aria-hidden="true"
            className="fixed inset-0 z-[55] bg-[#021024]/35"
          />

          {/* Morphing Split-Pane Drawer (top-right anchored) */}
          <div className="fixed top-4 right-4 sm:top-5 sm:right-6 z-[60] max-w-[calc(100vw-2rem)]">
            <motion.div
              ref={panelRef}
              layout
              role="dialog"
              aria-modal="true"
              aria-label="Morphing navigation drawer"
              initial={{ opacity: 0, scale: 0.92, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -8 }}
              transition={spring}
              className="flex flex-col md:flex-row items-stretch gap-2.5 origin-top-right"
            >
              {/* Primary Drawer Pane */}
              <motion.div
                layout
                transition={spring}
                className="w-[300px] sm:w-[320px] max-w-full rounded-2xl border border-white/15 bg-[#050E1E] text-white shadow-[0_24px_70px_rgba(2,16,36,0.55)] p-6 flex flex-col justify-between min-h-[380px] sm:min-h-[430px]"
              >
                <div>
                  {/* Top Bar with Close button */}
                  <div className="flex items-center justify-between pb-6">
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Close morphing drawer"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 hover:bg-white/15 hover:text-white transition-colors"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="font-mono text-[11px] text-white/45">
                      Navigation
                    </span>
                  </div>

                  {/* Primary Editorial Links */}
                  <nav aria-label="Drawer navigation" className="flex flex-col space-y-1">
                    {PRIMARY_ROUTES.map((route, idx) => {
                      const isActive =
                        route.href === "/"
                          ? pathname === "/"
                          : pathname.startsWith(route.href)

                      if (route.expandable) {
                        return (
                          <motion.div
                            key={route.href}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: prefersReduced ? 0 : 0.04 + idx * 0.03,
                              duration: prefersReduced ? 0.01 : 0.22,
                            }}
                            onMouseEnter={() => {
                              if (typeof window !== "undefined" && window.innerWidth >= 768) {
                                onSetSubmenu("work")
                              }
                            }}
                            className="flex flex-col"
                          >
                            <button
                              type="button"
                              onClick={onToggleWorkSubmenu}
                              aria-expanded={showWorkPane}
                              className={`group flex items-center justify-between py-2 text-left text-2xl sm:text-[28px] font-serif tracking-tight leading-tight transition-colors ${
                                showWorkPane || isActive
                                  ? "text-white"
                                  : "text-white/55 hover:text-white"
                              }`}
                            >
                              <span>{route.label}</span>
                              <ChevronRight
                                className={`h-4 w-4 transition-transform duration-200 ${
                                  showWorkPane
                                    ? "text-[#4A90E2] md:translate-x-0.5 rotate-90 md:rotate-0"
                                    : "text-white/40 group-hover:text-white/80"
                                }`}
                                aria-hidden="true"
                              />
                            </button>

                            {/* Mobile Inline Morphed Submenu */}
                            <AnimatePresence initial={false}>
                              {showWorkPane && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: prefersReduced ? 0.01 : 0.24 }}
                                  className="md:hidden overflow-hidden pl-3 border-l border-white/15 my-2 space-y-2"
                                >
                                  {CASE_STUDIES.map((cs) => (
                                    <Link
                                      key={cs.slug}
                                      href={`/work/${cs.slug}`}
                                      onClick={() => {
                                        trackEvent("case_study_open", {
                                          slug: cs.slug,
                                          source: "morphing_drawer_mobile",
                                        })
                                        onClose()
                                      }}
                                      className="block py-1 text-sm text-white/75 hover:text-white transition-colors"
                                    >
                                      <span className="font-mono text-[11px] text-[#4A90E2] mr-2 tabular-nums">
                                        ({cs.index})
                                      </span>
                                      <span>{cs.title}</span>
                                    </Link>
                                  ))}
                                  <Link
                                    href="/work"
                                    onClick={onClose}
                                    className="inline-flex items-center gap-1.5 pt-1 text-xs font-mono text-[#4A90E2] hover:underline"
                                  >
                                    <span>All Work &amp; Archive</span>
                                    <span>→</span>
                                  </Link>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        )
                      }

                      return (
                        <motion.div
                          key={route.href}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: prefersReduced ? 0 : 0.04 + idx * 0.03,
                            duration: prefersReduced ? 0.01 : 0.22,
                          }}
                          onMouseEnter={() => {
                            if (typeof window !== "undefined" && window.innerWidth >= 768) {
                              onSetSubmenu(null)
                            }
                          }}
                        >
                          <Link
                            href={route.href}
                            onClick={onClose}
                            className={`block py-2 text-2xl sm:text-[28px] font-serif tracking-tight leading-tight transition-colors ${
                              isActive
                                ? "text-white"
                                : "text-white/55 hover:text-white"
                            }`}
                          >
                            {route.label}
                          </Link>
                        </motion.div>
                      )
                    })}
                  </nav>
                </div>

                {/* Bottom Secondary Utility Links */}
                <div className="pt-8 mt-6 border-t border-white/10 space-y-2 text-xs text-white/55">
                  <div className="flex flex-col space-y-1.5">
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("outbound_click", {
                          destination: profile.github,
                          type: "github",
                        })
                      }
                      className="inline-flex items-center justify-between hover:text-white transition-colors py-0.5"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                    </a>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("outbound_click", {
                          destination: profile.linkedin,
                          type: "linkedin",
                        })
                      }
                      className="inline-flex items-center justify-between hover:text-white transition-colors py-0.5"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                    </a>
                    <a
                      href={profile.cvPath}
                      download
                      onClick={() => trackEvent("cv_download", { source: "morphing_drawer" })}
                      className="inline-flex items-center justify-between text-[#4A90E2] hover:text-sky-300 transition-colors py-0.5"
                    >
                      <span>Download CV</span>
                      <span aria-hidden="true">↓</span>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Secondary Split Pane (Desktop morphing reveal for Case Studies) */}
              <AnimatePresence>
                {showWorkPane && (
                  <motion.div
                    key="morphing-drawer-work-pane"
                    layout
                    initial={{ opacity: 0, x: -16, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -12, scale: 0.96 }}
                    transition={spring}
                    className="hidden md:flex w-[320px] rounded-2xl border border-white/15 bg-[#07152B] text-white shadow-[0_24px_70px_rgba(2,16,36,0.55)] p-6 flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="font-mono text-[11px] text-white/55">
                          Selected Work
                        </span>
                        <span className="font-mono text-[11px] text-[#4A90E2] tabular-nums">
                          (0{CASE_STUDIES.length})
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {CASE_STUDIES.map((cs, idx) => {
                          const isCurrentStudy = pathname === `/work/${cs.slug}`
                          return (
                            <motion.div
                              key={cs.slug}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: prefersReduced ? 0 : 0.03 + idx * 0.03,
                                duration: prefersReduced ? 0.01 : 0.2,
                              }}
                            >
                              <Link
                                href={`/work/${cs.slug}`}
                                onClick={() => {
                                  trackEvent("case_study_open", {
                                    slug: cs.slug,
                                    source: "morphing_drawer",
                                  })
                                  onClose()
                                }}
                                className={`group block rounded-xl p-3 transition-colors ${
                                  isCurrentStudy
                                    ? "bg-white/15 text-white"
                                    : "hover:bg-white/10 text-white/80 hover:text-white"
                                }`}
                              >
                                <div className="flex items-baseline justify-between gap-2">
                                  <span className="font-serif text-lg leading-snug group-hover:text-white">
                                    {cs.title}
                                  </span>
                                  <span className="font-mono text-[10px] text-[#4A90E2] shrink-0 tabular-nums">
                                    ({cs.index})
                                  </span>
                                </div>
                                <p className="text-xs text-white/50 group-hover:text-white/70 line-clamp-1 mt-1">
                                  {cs.tagline}
                                </p>
                              </Link>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <Link
                        href="/work"
                        onClick={onClose}
                        className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-mono text-white/75 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <span>All Work &amp; Archive</span>
                        <span className="text-[#4A90E2] group-hover:translate-x-0.5 transition-transform">
                          →
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
