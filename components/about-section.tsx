import { GraduationCap, Target } from "lucide-react"
import { Panel } from "@/components/ui/panel"
import SectionHeading from "@/components/section-heading"
import { about, languages, profile } from "@/lib/portfolio-data"

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-r from-primary/5 via-background to-primary/5 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="About"
          accent="Me"
          description={profile.headline}
        />

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Panel className="p-6 sm:p-8 lg:p-10">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-foreground mb-3">Background</h3>
                  {about.background.map((paragraph) => (
                    <p key={paragraph} className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-foreground mb-3">How I Work</h3>
                  {about.approach.map((paragraph) => (
                    <p key={paragraph} className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Panel>

            <Panel className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                  <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-medium text-foreground">Languages</h3>
              </div>
              <ul className="space-y-3">
                {languages.map((language) => (
                  <li key={language.name} className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm font-medium text-foreground">{language.name}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">{language.level}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>

          <div className="lg:col-span-1">
            <Panel className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                  <Target className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-medium text-foreground">Current Focus</h3>
              </div>

              <ul className="space-y-4">
                {about.currentFocus.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-border">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Based in</p>
                <p className="mt-1 text-sm font-medium text-foreground">{profile.location}</p>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </section>
  )
}
