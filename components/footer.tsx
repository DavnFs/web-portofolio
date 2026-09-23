import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { navSections, profile } from "@/lib/portfolio-data"

const socials = [
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
]

export default function Footer() {
  return (
    <footer className="border-t border-border px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-foreground">{profile.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {profile.headline} · {profile.location}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {navSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-2">
          {socials.map((social) => {
            const Icon = social.icon

            return (
              <li key={social.label}>
                <Link
                  href={social.href}
                  aria-label={social.label}
                  {...(social.href.startsWith("mailto:")
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-foreground"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <p className="mx-auto mt-8 max-w-6xl text-center text-xs text-muted-foreground sm:text-left">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js and Tailwind CSS.
      </p>
    </footer>
  )
}
