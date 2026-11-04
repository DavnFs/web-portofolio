import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { CASE_STUDIES } from "@/content/case-studies/types"
import { archiveProjects } from "@/content/archive"
import { profile } from "@/content/profile"

export const metadata: Metadata = {
  title: "Work & Project Archive",
  description:
    "Selected engineering case studies and technical archive spanning backend services, computer vision, robotics, and mobile systems.",
}

export default function WorkIndexPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24">
      <div className="max-w-canvas mx-auto px-5 sm:px-8 lg:px-12">
        {/* Page Header */}
        <header className="pb-16 border-b border-line">
          <div className="font-mono text-meta uppercase tracking-widest text-ink-muted mb-4">
            Index // 01 — 04
          </div>
          <h1 className="text-display sm:text-h1 font-sans font-medium text-ink tracking-tight">
            Selected <span className="font-editorial-italic font-normal text-accent">work</span> &amp; archive.
          </h1>
          <p className="text-body-lg text-ink-muted mt-6 max-w-2xl leading-relaxed">
            In-depth case studies with measured results and technical decisions, accompanied by a catalogue of earlier utilities and experiments.
          </p>
        </header>

        {/* Featured Case Studies Section */}
        <section aria-label="Featured case studies" className="py-16 divide-y divide-line">
          {CASE_STUDIES.map((project) => (
            <div key={project.slug} className="py-12 sm:py-16 group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-3 flex lg:flex-col justify-between items-baseline lg:items-start gap-2">
                  <span className="font-mono text-xl text-accent font-medium">
                    ({project.index})
                  </span>
                  <div className="space-y-1 font-mono text-meta uppercase text-ink-muted">
                    <div>{project.projectType}</div>
                    <div>{project.role} · {project.year}</div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <Link href={`/work/${project.slug}`} className="inline-block">
                    <h2 className="text-2xl sm:text-3xl font-sans font-medium text-ink group-hover:text-accent transition-colors">
                      {project.title}
                    </h2>
                  </Link>
                  <p className="text-body text-ink-muted leading-relaxed">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-xs px-2 py-0.5 bg-surface border border-line text-ink-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Link
                      href={`/work/${project.slug}`}
                      className="font-mono text-xs uppercase tracking-wider text-accent inline-flex items-center gap-1.5 group-hover:underline"
                    >
                      <span>Read full case study</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <Link
                    href={`/work/${project.slug}`}
                    aria-label={`View ${project.title}`}
                    className="block relative aspect-[16/9] w-full bg-surface border border-line rounded-media overflow-hidden"
                  >
                    <Image
                      src={project.heroMedia.src}
                      alt={project.heroMedia.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Archive Table Section */}
        <section id="archive" aria-label="Project archive" className="pt-16 border-t border-line">
          <div className="pb-8">
            <span className="font-mono text-meta uppercase tracking-widest text-ink-muted">
              Supplementary Records
            </span>
            <h2 className="text-h2 font-sans font-medium text-ink mt-2">
              Project <span className="font-editorial-italic font-normal text-accent">archive</span>
            </h2>
            <p className="text-sm text-ink-muted mt-2">
              Earlier tools, client systems, and IoT prototypes built between 2023 and 2025.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-sm">
              <thead>
                <tr className="border-b border-line font-mono text-meta uppercase text-ink-muted">
                  <th className="py-4 pr-6 font-normal">Year</th>
                  <th className="py-4 pr-6 font-normal">Project</th>
                  <th className="py-4 pr-6 font-normal hidden sm:table-cell">Category</th>
                  <th className="py-4 pr-6 font-normal hidden md:table-cell">Stack</th>
                  <th className="py-4 text-right font-normal">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/70">
                {archiveProjects.map((row) => (
                  <tr
                    key={row.title}
                    className="group hover:bg-surface/50 transition-colors"
                  >
                    <td className="py-4 pr-6 font-mono text-xs text-ink-muted whitespace-nowrap">
                      {row.year}
                    </td>
                    <td className="py-4 pr-6">
                      <div className="font-medium text-ink group-hover:text-accent transition-colors">
                        {row.title}
                      </div>
                      <div className="text-xs text-ink-muted line-clamp-1 sm:hidden mt-0.5">
                        {row.category}
                      </div>
                    </td>
                    <td className="py-4 pr-6 text-ink-muted hidden sm:table-cell whitespace-nowrap">
                      {row.category}
                    </td>
                    <td className="py-4 pr-6 font-mono text-xs text-ink-muted hidden md:table-cell">
                      {row.stack.join(" · ")}
                    </td>
                    <td className="py-4 text-right font-mono text-xs whitespace-nowrap">
                      {row.url ? (
                        <a
                          href={row.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink-muted hover:text-accent transition-colors inline-flex items-center gap-1"
                        >
                          <span>Repository</span>
                          <span>↗</span>
                        </a>
                      ) : (
                        <span className="text-ink-muted/50">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
