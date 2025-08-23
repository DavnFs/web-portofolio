import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  link?: string
}

export default function ProjectCard({ title, description, tags, image, link = "#" }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl rounded-2xl">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 ease-out hover:scale-105"
        />

        {/* dark gradient overlay to improve text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Title, description and tags overlaid on image */}
        <div className="absolute left-4 right-4 bottom-4 text-white">
          <h3 className="text-2xl font-semibold leading-tight drop-shadow-sm">{title}</h3>
          <p className="text-sm opacity-90 mt-1 line-clamp-2">{description}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <CardFooter className="px-6 pb-6 pt-4 bg-transparent">
        <Button asChild className="w-full rounded-full bg-white text-black hover:bg-white/90">
          <Link href={link} className="flex items-center justify-center gap-2 py-3">
            View Project
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
