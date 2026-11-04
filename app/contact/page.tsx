"use client"

import { useState } from "react"
import Link from "next/link"
import { profile } from "@/content/profile"
import { trackEvent } from "@/lib/analytics"

export default function ContactPage() {
  const [copied, setCopied] = useState(false)

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
    <main className="min-h-screen pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="max-w-canvas mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl pb-16 sm:pb-24 border-b border-line">
          <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
            02 // Direct Dispatch
          </span>
          <h1 className="text-display sm:text-h1 font-serif italic font-normal text-ink mt-3 leading-tight">
            Let&apos;s build software that holds up in the field.
          </h1>
          <p className="text-body-lg text-ink-muted mt-6 max-w-2xl leading-relaxed">
            I am currently open to full-time engineering roles in backend services, AI/ML systems, and automation. Located in Semarang, Indonesia; open to hybrid or remote arrangements.
          </p>
        </div>

        {/* Contact Matrix */}
        <section className="py-16 sm:py-24 border-b border-line">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
                Direct Channel
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-ink mt-2">
                Electronic Mail
              </h2>
            </div>

            <div className="md:col-span-8 max-w-2xl space-y-6">
              <div className="p-8 bg-surface border border-line space-y-4">
                <span className="font-mono text-meta uppercase text-ink-muted block">
                  Primary Inbox
                </span>
                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => trackEvent("outbound_click", { destination: profile.email, type: "email_page" })}
                  className="text-xl sm:text-2xl font-mono text-ink hover:text-accent transition-colors block break-all"
                >
                  {profile.email}
                </a>
                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-6 py-2.5 font-mono text-xs uppercase tracking-wider bg-ink text-bg hover:bg-accent hover:text-white transition-colors cursor-pointer"
                  >
                    {copied ? "Copied to clipboard ✓" : "Copy Address"}
                  </button>
                  <a
                    href={`mailto:${profile.email}`}
                    className="px-6 py-2.5 font-mono text-xs uppercase tracking-wider border border-line text-ink hover:border-accent hover:text-accent transition-colors"
                  >
                    Open Mail App ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Profiles */}
        <section className="py-16 sm:py-24 border-b border-line">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
                Networks
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-ink mt-2">
                Profiles &amp; Code
              </h2>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("outbound_click", { destination: profile.github, type: "github_contact" })}
                className="group p-6 bg-surface border border-line space-y-3 hover:border-accent transition-colors"
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs uppercase text-ink-muted">Code Host</span>
                  <span className="text-accent group-hover:translate-x-1 transition-transform">↗</span>
                </div>
                <div className="text-lg font-medium text-ink group-hover:text-accent transition-colors">
                  GitHub
                </div>
                <p className="text-xs text-ink-muted font-mono truncate">
                  {profile.github.replace("https://", "")}
                </p>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("outbound_click", { destination: profile.linkedin, type: "linkedin_contact" })}
                className="group p-6 bg-surface border border-line space-y-3 hover:border-accent transition-colors"
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs uppercase text-ink-muted">Professional</span>
                  <span className="text-accent group-hover:translate-x-1 transition-transform">↗</span>
                </div>
                <div className="text-lg font-medium text-ink group-hover:text-accent transition-colors">
                  LinkedIn
                </div>
                <p className="text-xs text-ink-muted font-mono truncate">
                  {profile.linkedin.replace("https://", "")}
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* Résumé Download */}
        <section className="py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
                Document
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-ink mt-2">
                Curriculum Vitae
              </h2>
            </div>

            <div className="md:col-span-8 max-w-2xl">
              <div className="p-8 bg-surface border border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-1">
                  <span className="text-base font-medium text-ink block">
                    Davin Fausta Supriyadi — CV
                  </span>
                  <span className="font-mono text-xs text-ink-muted block">
                    Updated October 2026 · Format: DOCX / PDF
                  </span>
                </div>
                <a
                  href={profile.cvPath}
                  download
                  onClick={() => trackEvent("cv_download", { source: "contact_page" })}
                  className="px-6 py-3 font-mono text-xs uppercase tracking-wider bg-ink text-bg hover:bg-accent hover:text-white transition-colors shrink-0"
                >
                  Download CV ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Back Link */}
        <div className="pt-8 border-t border-line">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-wider text-ink hover:text-accent transition-colors"
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
