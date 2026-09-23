import { Brain, Code, Cpu, Database, Server, Smartphone, Users, Wrench } from "lucide-react"
import { Panel } from "@/components/ui/panel"
import { skillGroups } from "@/lib/portfolio-data"

const icons: Record<string, typeof Code> = {
  code: Code,
  server: Server,
  brain: Brain,
  database: Database,
  smartphone: Smartphone,
  cpu: Cpu,
  wrench: Wrench,
  users: Users,
}

export default function SkillsSection() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {skillGroups.map((group) => {
        const Icon = icons[group.icon] ?? Code

        return (
          <li key={group.title}>
            <Panel className="p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>
                <h3 className="text-sm sm:text-base font-medium text-foreground leading-tight">
                  {group.title}
                </h3>
              </div>

              <ul className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground transition-colors duration-300 hover:border-primary/30 hover:text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Panel>
          </li>
        )
      })}
    </ul>
  )
}
