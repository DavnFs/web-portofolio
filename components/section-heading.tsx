interface SectionHeadingProps {
  title: string
  accent: string
  description?: string
  index?: string
  level?: "h2" | "h3"
}

export default function SectionHeading({ title, accent, description, index, level = "h2" }: SectionHeadingProps) {
  const Tag = level

  if (level === "h3") {
    return (
      <div className="mb-8">
        <Tag className="text-xl font-light tracking-tight text-foreground sm:text-2xl">
          {title} <span className="font-serif italic">{accent}</span>
        </Tag>
      </div>
    )
  }

  return (
    <div className="mb-10 sm:mb-14">
      <div className="mb-5 flex items-center gap-4">
        {index && <span className="font-serif text-sm italic text-primary sm:text-base">{index}</span>}
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>

      <Tag className="text-3xl font-light tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title} <span className="font-serif italic">{accent}</span>
      </Tag>

      {description && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>
      )}
    </div>
  )
}
