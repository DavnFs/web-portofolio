import { Briefcase, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Panel } from "@/components/ui/panel"
import SectionHeading from "@/components/section-heading"
import { experience } from "@/lib/portfolio-data"

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Work"
          accent="Experience"
          description="Research and engineering work across autonomous vehicles, applied vision, and real-time tooling."
        />

        <ol className="relative space-y-6 sm:space-y-8">
          <span
            aria-hidden="true"
            className="absolute left-[1.4375rem] top-3 bottom-3 w-px bg-border hidden sm:block"
          />

          {experience.map((item) => (
            <li key={`${item.role}-${item.organisation}`} className="relative sm:pl-16">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background"
              >
                <Briefcase className="h-5 w-5 text-primary" />
              </span>

              <Panel className="p-6 sm:p-8">
                <div className="flex flex-col gap-1 sm:gap-2">
                  <h3 className="text-base sm:text-lg lg:text-xl font-medium text-foreground leading-snug">
                    {item.role}
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-primary">{item.organisation}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.location}
                    </span>
                    <span>{item.period}</span>
                  </div>
                </div>

                <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">{item.summary}</p>

                <ul className="mt-4 space-y-2.5">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.stack.map((tool) => (
                    <li key={tool}>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 transition-colors"
                      >
                        {tool}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </Panel>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
