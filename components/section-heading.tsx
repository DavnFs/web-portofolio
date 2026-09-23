interface SectionHeadingProps {
  title: string
  accent: string
  description?: string
  level?: "h2" | "h3"
}

export default function SectionHeading({ title, accent, description, level = "h2" }: SectionHeadingProps) {
  const Tag = level

  return (
    <div className="text-center mb-12 sm:mb-16">
      <Tag
        className={`font-light tracking-tight text-foreground transition-colors duration-300 ${
          level === "h2" ? "text-3xl sm:text-4xl lg:text-5xl mb-4" : "text-xl sm:text-2xl lg:text-3xl mb-3"
        }`}
      >
        {title} <span className="font-serif italic">{accent}</span>
      </Tag>
      {description && (
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
