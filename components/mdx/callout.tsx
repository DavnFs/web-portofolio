import React from "react"

interface CalloutProps {
  title?: string
  children: React.ReactNode
  type?: "note" | "tradeoff" | "constraint"
}

export function Callout({ title, children, type = "note" }: CalloutProps) {
  const typeLabel =
    type === "tradeoff" ? "Engineering Trade-Off" : type === "constraint" ? "Hardware Constraint" : "Observation"

  return (
    <div className="my-8 p-6 bg-surface border-l-2 border-accent border-y border-r border-line not-prose">
      <div className="font-mono text-meta text-accent uppercase tracking-wider mb-2">
        {`// ${title || typeLabel}`}
      </div>
      <div className="text-sm text-ink/90 leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  )
}
