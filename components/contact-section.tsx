import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react"
import SectionHeading from "@/components/section-heading"
import { Panel } from "@/components/ui/panel"
import { profile } from "@/lib/portfolio-data"

const channels = [
  {
    label: "Email",
    value: profile.email,
    description: "Best for roles, projects, and collaborations",
    action: "Send Email",
    href: `mailto:${profile.email}`,
    icon: Mail,
    tone: "text-primary",
    surface: "border-primary/20 bg-primary/10 group-hover:bg-primary/15",
  },
  {
    label: "LinkedIn",
    value: "in/davinfausta",
    description: "Connect professionally",
    action: "Connect",
    href: profile.linkedin,
    icon: Linkedin,
    tone: "text-sky-600 dark:text-sky-400",
    surface: "border-sky-500/20 bg-sky-500/10 group-hover:bg-sky-500/15",
  },
  {
    label: "GitHub",
    value: "DavnFs",
    description: "Explore the code behind these projects",
    action: "Follow",
    href: profile.github,
    icon: Github,
    tone: "text-foreground",
    surface: "border-border bg-muted/60 group-hover:bg-muted",
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        <Panel className="p-6 sm:p-8 lg:p-14">
          <SectionHeading
            title="Let's Build"
            accent="Something"
            description="I'm open to backend, AI/ML, and automation engineering roles — and always happy to talk through an interesting problem."
          />

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {channels.map((channel) => {
              const Icon = channel.icon
              const isExternal = !channel.href.startsWith("mailto:")

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
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
              href={`mailto:${profile.email}`}
              className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Get in Touch
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Panel>
      </div>
    </section>
  )
}
