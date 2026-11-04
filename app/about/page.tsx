import type { Metadata } from "next"
import Link from "next/link"
import { profile } from "@/content/profile"
import { experience } from "@/content/experience"
import { education, languages } from "@/content/education"
import { skillClusters } from "@/content/skills"
import { certifications } from "@/content/certifications"
import { AnimatedLink } from "@/components/ui/animated-link"

export const metadata: Metadata = {
  title: "About | Davin Fausta Supriyadi",
  description:
    "Background, engineering experience, education, skills, and certifications of Davin Fausta Supriyadi.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="max-w-canvas mx-auto px-5 sm:px-8 lg:px-12">
        {/* Editorial Heading */}
        <div className="max-w-4xl pb-16 sm:pb-24 border-b border-line">
          <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
            01 // Profile &amp; Background
          </span>
          <h1 className="text-display sm:text-h1 font-serif italic font-normal text-ink mt-3 leading-tight">
            Engineering from the sensor to the screen.
          </h1>
          <p className="text-body-lg text-ink-muted mt-6 max-w-2xl leading-relaxed">
            {profile.bio.lead.replace(/\*/g, "")}
          </p>
        </div>

        {/* Narrative & Education */}
        <section className="py-16 sm:py-24 border-b border-line">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
                Education
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-ink mt-2">
                Academic Foundation
              </h2>
            </div>

            <div className="md:col-span-8 space-y-6 max-w-2xl">
              <div className="p-6 sm:p-8 bg-surface border border-line space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-xl font-medium text-ink">{education.degree}</h3>
                  <span className="font-mono text-xs text-accent">{education.period}</span>
                </div>
                <div className="font-mono text-sm text-ink-muted">
                  {education.school} · {education.location}
                </div>
                <div className="inline-flex items-center gap-2 font-mono text-xs px-2.5 py-1 bg-bg border border-line text-ink">
                  <span>Cumulative GPA:</span>
                  <span className="text-accent font-medium">{education.gpa}</span>
                </div>
                <div className="pt-2 text-sm text-ink/80 leading-relaxed border-t border-line/60">
                  <span className="font-medium text-ink">Thesis: </span>
                  {education.thesis}
                </div>
              </div>

              {/* Languages */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                {languages.map((lang) => (
                  <div key={lang.name} className="p-4 bg-surface border border-line">
                    <div className="text-ink-muted uppercase">{lang.name}</div>
                    <div className="text-ink font-medium mt-1">{lang.level}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="py-16 sm:py-24 border-b border-line">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
                Experience
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-ink mt-2">
                Work &amp; Research
              </h2>
            </div>

            <div className="md:col-span-8 space-y-10 max-w-2xl">
              {experience.map((exp) => (
                <div key={exp.role + exp.organisation} className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-xl font-medium text-ink">{exp.role}</h3>
                    <span className="font-mono text-xs text-accent">{exp.period}</span>
                  </div>
                  <div className="font-mono text-sm text-ink-muted">
                    {exp.organisation} · {exp.location}
                  </div>
                  <p className="text-body text-ink/80 leading-relaxed">
                    {exp.summary}
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-ink-muted">
                    {exp.points.map((pt, idx) => (
                      <li key={idx} className="leading-relaxed">{pt}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-2 py-0.5 bg-surface border border-line text-ink-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="py-16 sm:py-24 border-b border-line">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
                Stack
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-ink mt-2">
                Skills &amp; Tooling
              </h2>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              {skillClusters.map((cluster) => (
                <div key={cluster.name} className="p-6 bg-surface border border-line space-y-3">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
                    {cluster.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cluster.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs px-2.5 py-1 bg-bg border border-line text-ink"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 sm:py-24 border-b border-line">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
                Credentials
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-ink mt-2">
                Certifications
              </h2>
            </div>

            <div className="md:col-span-8 divide-y divide-line max-w-2xl">
              {certifications.map((cert) => (
                <div key={cert.title} className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="space-y-1">
                    <div className="text-base font-medium text-ink">
                      {cert.verificationUrl ? (
                        <AnimatedLink href={cert.verificationUrl} external>
                          {cert.title} ↗
                        </AnimatedLink>
                      ) : (
                        cert.title
                      )}
                    </div>
                    <div className="font-mono text-xs text-ink-muted">
                      {cert.issuer} · {cert.detail}
                    </div>
                  </div>
                  <span className="font-mono text-xs text-accent shrink-0">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Actions */}
        <div className="pt-16 flex flex-wrap items-center justify-between gap-6">
          <Link
            href="/work"
            className="font-mono text-xs uppercase tracking-wider text-ink hover:text-accent transition-colors"
          >
            ← View Case Studies
          </Link>
          <div className="flex items-center gap-6">
            <a
              href={profile.cvPath}
              download
              className="px-6 py-3 font-mono text-xs uppercase tracking-wider bg-ink text-bg hover:bg-accent hover:text-white transition-colors"
            >
              Download CV
            </a>
            <Link
              href="/contact"
              className="font-mono text-xs uppercase tracking-wider text-ink hover:text-accent transition-colors"
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
