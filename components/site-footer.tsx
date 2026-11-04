"use client"

import Link from "next/link"
import { profile } from "@/content/profile"
import { trackEvent } from "@/lib/analytics"
import { smoothScrollTo } from "@/components/smooth-scroll"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    smoothScrollTo(0, { duration: 1.4 })
  }

  return (
    <footer className="border-t border-line mt-24 sm:mt-32 pt-16 pb-12 bg-bg text-ink transition-colors">
      <div className="max-w-canvas mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-16">
          {/* Identity statement */}
          <div className="md:col-span-5 space-y-3">
            <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
              Colophon
            </span>
            <p className="font-serif italic text-2xl text-ink max-w-sm">
              Sensor to screen.
            </p>
            <p className="text-sm text-ink-muted max-w-sm leading-relaxed">
              Designed with generous whitespace and editorial restraint. No third-party trackers, no cookies.
            </p>
          </div>

          {/* Direct channels */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
              Direct Contact
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => trackEvent("outbound_click", { destination: profile.email, type: "email" })}
                  className="hover:text-accent transition-colors"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("outbound_click", { destination: profile.github, type: "github" })}
                  className="hover:text-accent transition-colors inline-flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <span className="text-xs text-ink-muted">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("outbound_click", { destination: profile.linkedin, type: "linkedin" })}
                  className="hover:text-accent transition-colors inline-flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <span className="text-xs text-ink-muted">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.cvPath}
                  download
                  onClick={() => trackEvent("cv_download", { source: "footer" })}
                  className="text-accent hover:underline inline-flex items-center gap-1 font-mono text-xs uppercase"
                >
                  <span>Download Curriculum Vitae</span>
                  <span>↓</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick jump */}
          <div className="md:col-span-3 space-y-3 md:text-right">
            <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
              Index
            </span>
            <div className="flex md:flex-col gap-4 md:gap-2 text-sm">
              <Link href="/about" className="hover:text-accent transition-colors">
                About
              </Link>
              <Link href="/work" className="hover:text-accent transition-colors">
                Work & Archive
              </Link>
              <Link href="/contact" className="hover:text-accent transition-colors">
                Contact
              </Link>
              <button
                type="button"
                onClick={handleBackToTop}
                className="hover:text-accent transition-colors text-left md:text-right font-mono text-xs text-ink-muted mt-2"
              >
                ↑ Back to top
              </button>
            </div>
          </div>
        </div>

        {/* Bottom baseline */}
        <div className="border-t border-line/60 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-ink-muted">
          <div>
            © {currentYear} Davin Fausta Supriyadi. {profile.location}.
          </div>
          <div className="text-ink-muted/80">
            Built with Next.js and Tailwind CSS.
          </div>
        </div>
      </div>
    </footer>
  )
}
