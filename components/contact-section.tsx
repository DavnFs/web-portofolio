import Link from "next/link"
import { ArrowUpRight, Github, Linkedin, MapPin } from "lucide-react"
import SectionHeading from "@/components/section-heading"
import { Panel } from "@/components/ui/panel"
import { profile } from "@/lib/portfolio-data"

const channels = [
  {
    label: "LinkedIn",
    value: "in/davinfausta",
    description: "Best for roles, projects, and collaborations",
    action: "Connect",
    href: profile.linkedin,
    icon: Linkedin,
    tone: "text-sky-600 dark:text-sky-400",
    surface: "border-sky-500/20 bg-sky-500/10",
  },
  {
    label: "GitHub",
    value: "DavnFs",
    description: "Explore the code behind these projects",
    action: "Follow",
    href: profile.github,
    icon: Github,
    tone: "text-foreground",
    surface: "border-border bg-muted/60",
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        <Panel className="p-6 sm:p-8 lg:p-14">
          <SectionHeading
            index="06"
            title="Let's Build"
            accent="Something"
            description="I'm open to backend, AI/ML, and automation engineering roles. The fastest way to reach me is LinkedIn."
          />

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {channels.map((channel) => {
              const Icon = channel.icon

              return (
                <li key={channel.label} className="group">
                  <Panel className="flex h-full flex-col items-center p-6 text-center">
                    <span
                      className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border transition-colors duration-300 ${channel.surface}`}
                    >
                      <Icon className={`h-6 w-6 ${channel.tone}`} aria-hidden="true" />
                    </span>

                    <h3 className="text-base font-medium text-foreground">{channel.label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground break-all">{channel.value}</p>
                    <p className="mt-3 mb-5 text-xs text-muted-foreground leading-relaxed">{channel.description}</p>

                    <Link
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex min-h-11 w-full items-center justify-center rounded-full border border-border px-4 text-sm font-medium text-foreground transition-colors duration-300 hover:bg-muted"
                    >
                      {channel.action}
                    </Link>
                  </Panel>
                </li>
              )
            })}
          </ul>

          <div className="mt-10 flex flex-col items-center gap-4 sm:mt-12">
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {profile.location}
            </p>

            <Link
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              Connect on LinkedIn
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Panel>
      </div>
    </section>
  )
}
