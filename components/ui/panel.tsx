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
        "rounded-2xl border border-border bg-white shadow-sm",
        className
      )}
    >
      {children}
    </Tag>
  )
}
