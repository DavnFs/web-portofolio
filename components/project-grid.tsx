import {
  Droplets,
  HeartPulse,
  MapPinned,
  Network,
  Receipt,
  ScanEye,
  ShieldCheck,
  Store,
  Trophy,
  Wallet,
  ArrowUpRight,
} from "lucide-react"
import { Panel } from "@/components/ui/panel"
import SectionHeading from "@/components/section-heading"
import { projects } from "@/lib/portfolio-data"

const icons: Record<string, typeof Store> = {
  store: Store,
  "heart-pulse": HeartPulse,
  shield: ShieldCheck,
  "scan-eye": ScanEye,
  droplets: Droplets,
  wallet: Wallet,
  network: Network,
  receipt: Receipt,
  "map-pinned": MapPinned,
}

export default function ProjectGrid() {
  const featured = projects.find((project) => project.featured)
  const rest = projects.filter((project) => !project.featured)
  const FeaturedIcon = featured ? icons[featured.icon] ?? Store : Store

  return (
    <div>
      <SectionHeading
        index="03"
        title="Featured"
        accent="Projects"
        description="Backend platforms, applied AI/ML systems, and embedded tooling, from hackathon builds to thesis research."
      />

      {featured && (
        <Panel as="article" className="group mb-10 overflow-hidden sm:mb-14">
          <div className="grid lg:grid-cols-5">
            <div className="p-6 sm:p-8 lg:col-span-3 lg:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <FeaturedIcon className="h-5 w-5 text-primary" aria-hidden="true" strokeWidth={1.75} />
                </span>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Featured · {featured.category}
                </p>
              </div>

              <h3 className="mt-6 text-2xl font-light tracking-tight text-foreground sm:text-3xl">{featured.name}</h3>
              <p className="mt-1 text-sm font-medium text-primary sm:text-base">{featured.tagline}</p>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {featured.description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {featured.stack.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[0.7rem] text-muted-foreground"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col border-t border-border p-6 sm:p-8 lg:col-span-2 lg:border-l lg:border-t-0 lg:p-10">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Recognition</p>

              <div className="mt-4 flex items-start gap-3">
                <Trophy className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-foreground">{featured.award}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{featured.awardDetail}</p>
                </div>
              </div>

              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/90 lg:mt-auto"
              >
                View project
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </Panel>
      )}

      <p className="mb-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">More projects</p>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {rest.map((project) => {
          const Icon = icons[project.icon] ?? Store

          return (
            <li key={project.name} className="group">
              <Panel
                as="article"
                className="flex h-full flex-col p-5 transition-transform duration-300 group-hover:-translate-y-1 sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted/50">
                    <Icon className="h-4 w-4 text-foreground/70" aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">{project.category}</p>
                </div>

                <h3 className="mt-5 text-base font-medium leading-tight text-foreground sm:text-lg">{project.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{project.tagline}</p>

                <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-3 sm:text-sm">
                  {project.description}
                </p>

                {project.note && (
                  <p className="mt-4 flex items-start gap-2 text-xs leading-snug text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {project.note}
                  </p>
                )}

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[0.7rem] text-muted-foreground"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-foreground transition-colors duration-300 hover:text-primary"
                  >
                    View project
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </Panel>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
