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
        "rounded-2xl border border-border bg-white/80 shadow-sm dark:bg-white/[0.04]",
        className
      )}
    >
      {children}
    </Tag>
  )
}
