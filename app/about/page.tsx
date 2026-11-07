import type { Metadata } from "next"
import Link from "next/link"
import { profile } from "@/content/profile"
import { experience } from "@/content/experience"
import { education, languages } from "@/content/education"
import { skillClusters } from "@/content/skills"
import { certifications } from "@/content/certifications"
import { AnimatedLink } from "@/components/ui/animated-link"

export const metadata: Metadata = {
  title: "About & Engineering Background",
  description:
    "Background, engineering experience, education, skills, and certifications of Davin Fausta Supriyadi (Davin Supriyadi). Mobile Developer Intern and Computer Engineering graduate.",
}

export default function AboutPage() {
  const domains = [
    {
      index: "01",
      title: "Edge AI & Perception",
      desc: "YOLOv11 & uncertainty estimation on NVIDIA Jetson Orin NX boards",
      badge: "20W Envelope",
      accent: "#2563EB",
    },
    {
      index: "02",
      title: "Robotics Telemetry",
      desc: "ROS1 Noetic sensor fusion with LiDAR, GPS, and IMU point cloud pipelines",
      badge: "ROS1 Bus",
      accent: "#4A90E2",
    },
    {
      index: "03",
      title: "Native Mobile",
      desc: "Offline-first Flutter & Kotlin apps with SQLCipher zero-trust storage",
      badge: "Zero Network",
      accent: "#0284C7",
    },
    {
      index: "04",
      title: "System Architecture",
      desc: "FastAPI, Supabase PostgreSQL, and scalable microservices infrastructure",
      badge: "Backend",
      accent: "#3B82F6",
    },
  ]

  const metrics = [
    {
      metric: "3.84",
      label: "Cumulative GPA",
      detail: "Politeknik Negeri Semarang · Informatics Engineering",
    },
    {
      metric: "20W",
      label: "Edge Compute Budget",
      detail: "Real-time model inference on NVIDIA Jetson Orin NX",
    },
    {
      metric: "0 Cloud",
      label: "Permissions in Runa",
      detail: "Enforced biometric & AES-256-GCM zero-trust security",
    },
    {
      metric: "100%",
      label: "Telemetry Fidelity",
      detail: "Deterministic LiDAR & IMU point cloud message dispatch",
    },
  ]

  return (
    <main className="min-h-screen pt-28 pb-24 sm:pt-36 sm:pb-32 overflow-hidden">
      {/* 1. Solicia Brown-Style Editorial Hero */}
      <section className="max-w-canvas mx-auto px-5 sm:px-8 lg:px-12 pb-16 sm:pb-24 border-b border-line">
        <div className="flex items-center justify-between border-b border-line/60 pb-4 mb-8">
          <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
            01 // About &amp; Profile
          </span>
          <span className="font-mono text-xs text-accent">
            Semarang, ID · Available for Opportunities
          </span>
        </div>

        <div className="max-w-4xl space-y-6">
          <h1 className="text-display sm:text-h1 font-serif italic font-normal text-ink leading-tight">
            Davin Fausta Supriyadi
          </h1>
          <p className="text-xl sm:text-2xl font-sans font-light text-ink leading-relaxed">
            Mobile Developer Intern at{" "}
            <span className="font-serif italic text-accent font-normal">
              PT. BPR Arto Moro
            </span>{" "}
            &amp; Applied Computer Vision Researcher.
          </p>
          <p className="text-body-lg text-ink-muted max-w-2xl leading-relaxed">
            {profile.bio.lead.replace(/\*/g, "")}
          </p>
        </div>

        {/* 4-Card Domain Media Grid (Inspired by Solicia Brown's 4-card hero strip) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {domains.map((d) => (
            <div
              key={d.index}
              className="group p-6 sm:p-8 bg-surface border border-line rounded-media flex flex-col justify-between aspect-[3/4] relative overflow-hidden transition-all duration-300 hover:border-accent/60"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-medium text-accent">
                  ({d.index})
                </span>
                <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-bg border border-line text-ink-muted">
                  {d.badge}
                </span>
              </div>

              <div className="space-y-3 z-10">
                <h3 className="text-xl font-sans font-medium text-ink group-hover:text-accent transition-colors">
                  {d.title}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {d.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-line/60 flex items-center justify-between font-mono text-[11px] text-ink-muted">
                <span>Domain Focus</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Editorial Narrative & Philosophy */}
      <section className="py-16 sm:py-24 border-b border-line bg-surface/40">
        <div className="max-w-canvas mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
                Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-ink mt-2">
                Engineering Ethos
              </h2>
            </div>

            <div className="md:col-span-8 space-y-6 max-w-2xl">
              <blockquote className="text-xl sm:text-2xl font-serif italic text-ink border-l-2 border-accent pl-6 py-1 leading-snug">
                “{profile.ethos}”
              </blockquote>
              <p className="text-body text-ink/80 leading-relaxed">
                {profile.bio.extended}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. High-Impact Metrics & Key Numbers (Solicia Brown style) */}
      <section className="py-16 sm:py-24 border-b border-line">
        <div className="max-w-canvas mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between border-b border-line/60 pb-4 mb-10">
            <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
              Key Metrics &amp; Benchmarks
            </span>
            <span className="font-mono text-xs text-accent">Quantitative Impact</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="p-6 sm:p-8 bg-surface border border-line flex flex-col justify-between space-y-4"
              >
                <div className="text-4xl sm:text-5xl font-sans font-light text-ink tracking-tight">
                  {m.metric}
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
                    {m.label}
                  </h3>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    {m.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Experience Timeline */}
      <section className="py-16 sm:py-24 border-b border-line">
        <div className="max-w-canvas mx-auto px-5 sm:px-8 lg:px-12">
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
                <div key={exp.role + exp.organisation} className="space-y-4 pb-8 border-b border-line/50 last:border-0">
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
        </div>
      </section>

      {/* 5. Education & Skills */}
      <section className="py-16 sm:py-24 border-b border-line">
        <div className="max-w-canvas mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
                Academic &amp; Stack
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-ink mt-2">
                Foundation &amp; Tooling
              </h2>
            </div>

            <div className="md:col-span-8 space-y-8 max-w-2xl">
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

              {/* Skills clusters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillClusters.map((cluster) => (
                  <div key={cluster.name} className="p-5 bg-surface border border-line space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
                      {cluster.name}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {cluster.skills.map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-[11px] px-2 py-0.5 bg-bg border border-line text-ink"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                {languages.map((lang) => (
                  <div key={lang.name} className="p-4 bg-surface border border-line">
                    <div className="text-ink-muted uppercase">{lang.name}</div>
                    <div className="text-ink font-medium mt-1">{lang.level}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Certifications */}
      <section className="py-16 sm:py-24 border-b border-line">
        <div className="max-w-canvas mx-auto px-5 sm:px-8 lg:px-12">
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
        </div>
      </section>

      {/* 7. Solicia Brown-Style Infinite Ticker Marquee ("let's talk →") */}
      <section className="py-16 sm:py-24 overflow-hidden border-b border-line bg-surface relative">
        <div className="flex select-none whitespace-nowrap font-serif italic text-3xl sm:text-5xl md:text-6xl text-ink">
          <div className="inline-flex items-center gap-8 animate-[marquee_25s_linear_infinite]">
            <span>⁑ let’s build something real →</span>
            <span>⁑ let’s talk →</span>
            <span>⁑ open for engineering roles →</span>
            <span>⁑ from sensor to screen →</span>
          </div>
          <div className="inline-flex items-center gap-8 animate-[marquee_25s_linear_infinite]" aria-hidden="true">
            <span>⁑ let’s build something real →</span>
            <span>⁑ let’s talk →</span>
            <span>⁑ open for engineering roles →</span>
            <span>⁑ from sensor to screen →</span>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-3 px-8 py-4 font-mono text-xs uppercase tracking-widest bg-ink text-bg hover:bg-accent hover:text-white transition-colors rounded-full shadow-lg"
          >
            <span>⁑ me@dsupriyadi.my.id</span>
            <span>→</span>
          </a>
        </div>
      </section>

      {/* 8. Footer Navigation Actions */}
      <div className="max-w-canvas mx-auto px-5 sm:px-8 lg:px-12 pt-12 flex flex-wrap items-center justify-between gap-6">
        <Link
          href="/work"
          className="font-mono text-xs uppercase tracking-wider text-ink hover:text-accent transition-colors"
        >
          ← View All Case Studies
        </Link>
        <div className="flex items-center gap-6">
          <a
            href={profile.cvPath}
            download
            className="px-6 py-3 font-mono text-xs uppercase tracking-wider bg-surface border border-line text-ink hover:border-accent transition-colors"
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
    </main>
  )
}
