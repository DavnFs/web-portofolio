import React from "react"

export interface StatItem {
  value: string
  label: string
  condition?: string
}

export function Stat({ value, label, condition }: StatItem) {
  return (
    <div className="p-6 bg-surface border border-line flex flex-col justify-between">
      <div>
        <div className="font-mono text-3xl sm:text-4xl text-ink font-light tracking-tight">
          {value}
        </div>
        <div className="mt-2 font-mono text-meta uppercase tracking-wider text-accent font-medium">
          {label}
        </div>
      </div>
      {condition && (
        <div className="mt-4 pt-3 border-t border-line/50 font-mono text-xs text-ink-muted">
          {condition}
        </div>
      )}
    </div>
  )
}

export function StatBlock({
  stats,
  children,
}: {
  stats?: StatItem[]
  children?: React.ReactNode
}) {
  return (
    <div className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
      {stats && stats.length > 0
        ? stats.map((stat, idx) => (
            <Stat
              key={idx}
              value={stat.value}
              label={stat.label}
              condition={stat.condition}
            />
          ))
        : children}
    </div>
  )
}
