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

const accents: Record<string, { icon: string; surface: string; chip: string }> = {
  amber: {
    icon: "text-amber-600 dark:text-amber-400",
    surface: "from-amber-500/20 via-amber-500/5",
    chip: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25",
  },
  emerald: {
    icon: "text-emerald-600 dark:text-emerald-400",
    surface: "from-emerald-500/20 via-emerald-500/5",
    chip: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
  },
  violet: {
    icon: "text-violet-600 dark:text-violet-400",
    surface: "from-violet-500/20 via-violet-500/5",
    chip: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/25",
  },
  sky: {
    icon: "text-sky-600 dark:text-sky-400",
    surface: "from-sky-500/20 via-sky-500/5",
    chip: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/25",
  },
  cyan: {
    icon: "text-cyan-600 dark:text-cyan-400",
    surface: "from-cyan-500/20 via-cyan-500/5",
    chip: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/25",
  },
  rose: {
    icon: "text-rose-600 dark:text-rose-400",
    surface: "from-rose-500/20 via-rose-500/5",
    chip: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25",
  },
  indigo: {
    icon: "text-indigo-600 dark:text-indigo-400",
    surface: "from-indigo-500/20 via-indigo-500/5",
    chip: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/25",
  },
  lime: {
    icon: "text-lime-600 dark:text-lime-400",
    surface: "from-lime-500/20 via-lime-500/5",
    chip: "bg-lime-500/10 text-lime-700 dark:text-lime-300 border-lime-500/25",
  },
  teal: {
    icon: "text-teal-600 dark:text-teal-400",
    surface: "from-teal-500/20 via-teal-500/5",
    chip: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/25",
  },
}

export default function ProjectGrid() {
  return (
    <div>
      <SectionHeading
        title="Featured"
        accent="Projects"
        description="Backend platforms, applied AI/ML systems, and embedded tooling — from hackathon builds to thesis research."
      />

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {projects.map((project) => {
          const Icon = icons[project.icon] ?? Store
          const accent = accents[project.accent] ?? accents.sky

          return (
            <li key={project.name} className="group">
              <Panel as="article" className="h-full flex flex-col overflow-hidden group-hover:-translate-y-1">
                <div
                  className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${accent.surface} to-transparent`}
                >
                  <Icon className={`h-12 w-12 ${accent.icon}`} aria-hidden="true" strokeWidth={1.5} />

                  <span className="absolute left-4 top-4">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem] font-medium ${accent.chip}`}
                    >
                      {project.category}
                    </span>
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-medium text-foreground leading-tight">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{project.tagline}</p>

                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {project.award && (
                    <p className="mt-4 flex items-start gap-2 rounded-xl border border-border bg-muted/50 px-3 py-2">
                      <Trophy className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" aria-hidden="true" />
                      <span className="text-xs leading-snug">
                        <span className="font-medium text-foreground">{project.award}</span>
                        <span className="block text-muted-foreground">{project.awardDetail}</span>
                      </span>
                    </p>
                  )}

                  <ul className="mt-4 mb-5 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[0.7rem] text-muted-foreground"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border bg-foreground px-4 text-sm font-medium text-background transition-colors duration-300 hover:bg-foreground/90"
                  >
                    View Project
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
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
