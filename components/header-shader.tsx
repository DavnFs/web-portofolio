"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Download, Menu, X } from "lucide-react"
import { navSections, profile } from "@/lib/portfolio-data"

export default function HeaderShader() {
  const [activeId, setActiveId] = useState<string>("")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = navSections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-88px 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [menuOpen])

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-base sm:text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
          onClick={() => setMenuOpen(false)}
        >
          Davin Supriyadi
        </Link>

        <nav aria-label="Main" className="hidden md:flex items-center gap-1">
          {navSections.map((section) => {
            const isActive = activeId === section.id

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-full px-3 py-2 text-sm transition-colors duration-200 hover:bg-muted hover:text-foreground ${
                  isActive ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {section.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={profile.resumeFile}
            download
            className="hidden md:inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            CV
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-300 hover:bg-muted md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-background/95 backdrop-blur-md md:hidden"
        >
          <ul className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6">
            {navSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeId === section.id ? "true" : undefined}
                  className={`flex min-h-11 items-center rounded-lg px-3 text-sm transition-colors hover:bg-muted ${
                    activeId === section.id ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  {section.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href={profile.resumeFile}
                download
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download CV
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
