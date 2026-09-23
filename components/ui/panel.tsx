import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PanelProps {
  children: ReactNode
  className?: string
  as?: "div" | "li" | "article"
}

export function Panel({ children, className, as: Tag = "div" }: PanelProps) {
  return (
    <Tag
      className={cn(
        "relative rounded-2xl border border-border backdrop-blur-sm shadow-sm",
        "bg-white/70 dark:bg-white/[0.04]",
        "transition-all duration-300 hover:shadow-lg hover:border-foreground/20",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
      />
      {children}
    </Tag>
  )
}
