import React from "react"

export interface StepItem {
  number: string
  title: string
  description?: string
  children?: React.ReactNode
}

export function Step({ number, title, description, children }: StepItem) {
  return (
    <div className="p-6 bg-surface border border-line flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
      <span className="font-mono text-xl sm:text-2xl text-accent font-medium shrink-0 pt-0.5">
        ({number})
      </span>
      <div className="space-y-1.5 flex-1">
        <h4 className="text-base sm:text-lg font-sans font-medium text-ink">
          {title}
        </h4>
        <div className="text-sm text-ink-muted leading-relaxed">
          {children || description}
        </div>
      </div>
    </div>
  )
}

export function Steps({
  items,
  children,
}: {
  items?: StepItem[]
  children?: React.ReactNode
}) {
  return (
    <div className="my-10 space-y-6 not-prose">
      {items && items.length > 0
        ? items.map((step) => (
            <Step
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))
        : children}
    </div>
  )
}
