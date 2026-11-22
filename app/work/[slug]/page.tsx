import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getCaseStudy, getAllCaseStudySlugs } from "@/lib/case-studies"
import { profile } from "@/content/profile"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = await getCaseStudy(slug)
  if (!study) return { title: "Case Study Not Found" }

  const { frontmatter } = study
  return {
    title: `(${frontmatter.index}) ${frontmatter.title}`,
    description: frontmatter.summary,
    openGraph: {
      title: `${frontmatter.title} — ${profile.name}`,
      description: frontmatter.summary,
      type: "article",
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = await getCaseStudy(slug)

  if (!study) {
    notFound()
  }

  const { frontmatter, content, nextProject } = study

  return (
    <article className="pt-28 sm:pt-36 pb-20">
      <div className="max-w-canvas mx-auto px-5 sm:px-8 lg:px-12">
        {/* Back Link */}
        <div className="mb-10 sm:mb-14">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted hover:text-accent transition-colors py-1"
          >
            <span>←</span>
            <span>Back to all work</span>
          </Link>
        </div>

        {/* 1. Numbered label and Title */}
        <header className="space-y-6 pb-12 border-b border-line">
          <div className="flex items-center gap-3 font-mono text-meta uppercase tracking-widest text-accent">
            <span>Case Study</span>
            <span>·</span>
            <span>({frontmatter.index})</span>
          </div>

          <h1 className="text-h1 font-sans font-medium text-ink tracking-tight max-w-4xl">
            {frontmatter.title}
          </h1>

          {/* 2. One-line summary */}
          <p className="text-body-lg sm:text-2xl text-ink-muted font-normal max-w-3xl leading-relaxed">
            {frontmatter.tagline}
          </p>

          {/* 3. Metadata row */}
          <div className="pt-8 mt-8 border-t border-line/60 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
            <div>
              <div className="text-meta uppercase text-ink-muted mb-1">Project Scope</div>
              <div className="text-ink font-medium">{frontmatter.projectType}</div>
            </div>
            <div>
              <div className="text-meta uppercase text-ink-muted mb-1">Year &amp; Role</div>
              <div className="text-ink font-medium">{frontmatter.year} · {frontmatter.role}</div>
            </div>
            <div className="col-span-2">
              <div className="text-meta uppercase text-ink-muted mb-1">Core Stack</div>
              <div className="flex flex-wrap gap-1.5 text-ink-muted">
                {frontmatter.stack.map((item: string) => (
                  <span key={item} className="px-2 py-0.5 bg-surface border border-line text-[11px]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* MDX Body (The Problem, How It Works, Decisions & Tradeoffs, Results, Links) */}
        <div className="max-w-3xl mx-auto prose prose-neutral prose-headings:font-sans prose-headings:font-medium prose-p:leading-relaxed prose-p:text-ink/90 prose-li:text-ink/90">
          {content}
        </div>

        {/* 10. Next Project Link */}
        {nextProject && (
          <nav
            aria-label="Next case study"
            className="mt-24 sm:mt-32 pt-12 border-t border-line"
          >
            <div className="max-w-3xl mx-auto">
              <div className="font-mono text-meta uppercase tracking-widest text-ink-muted mb-4">
                Next Case Study ({nextProject.index})
              </div>
              <Link
                href={`/work/${nextProject.slug}`}
                className="group block p-8 bg-surface border border-line hover:border-accent transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                  <div>
                    <div className="font-mono text-xs text-accent uppercase mb-1">
                      {nextProject.projectType}
                    </div>
                    <div className="text-2xl sm:text-3xl font-sans font-medium text-ink group-hover:text-accent transition-colors">
                      {nextProject.title}
                    </div>
                    <div className="text-sm text-ink-muted mt-2">
                      {nextProject.tagline}
                    </div>
                  </div>
                  <div className="font-mono text-sm text-accent group-hover:translate-x-1 transition-transform shrink-0">
                    Read study →
                  </div>
                </div>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </article>
  )
}
