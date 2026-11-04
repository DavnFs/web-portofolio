"use client"

import { profile } from "@/content/profile"

export function HeroStatement() {
  return (
    <section
      aria-label="Introduction"
      className="relative min-h-[90vh] flex flex-col justify-between pt-32 sm:pt-40 pb-12 sm:pb-16"
    >
      {/* Top Meta Tag */}
      <div className="font-mono text-meta uppercase tracking-widest text-ink-muted flex items-center gap-3">
        <span className="inline-block w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
        <span>Systems &amp; Platform Engineering</span>
      </div>

      {/* Main Display Headline */}
      <div className="my-auto py-12 sm:py-20">
        <h1 className="text-display font-sans font-medium tracking-tighter text-ink leading-[0.92] max-w-5xl">
          from <span className="font-editorial-italic font-normal text-accent">sensor</span> to{" "}
          <span className="font-editorial-italic font-normal text-ink">screen</span>.
        </h1>

        <div className="mt-8 sm:mt-12 max-w-2xl">
          <p className="text-body-lg text-ink/90 font-normal leading-relaxed">
            Davin Fausta Supriyadi is a{" "}
            <em className="font-editorial-italic not-italic font-normal text-ink text-[1.15em]">backend</em>
            , <em className="font-editorial-italic not-italic font-normal text-ink text-[1.15em]">AI/ML</em> and{" "}
            <em className="font-editorial-italic not-italic font-normal text-ink text-[1.15em]">mobile</em>{" "}
            engineer from Semarang, building services and models that run on real hardware and real users&apos; phones.
          </p>
        </div>
      </div>

      {/* Bottom Status & Scroll hint */}
      <div className="pt-8 border-t border-line/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-meta uppercase tracking-wider text-ink-muted">
        <div>{profile.status}</div>
        <div className="flex items-center gap-2 group">
          <span>Scroll to explore work</span>
          <span className="text-accent group-hover:translate-y-0.5 transition-transform inline-block">↓</span>
        </div>
      </div>
    </section>
  )
}
