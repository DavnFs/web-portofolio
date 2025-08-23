import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Star, MapPin, Calendar } from "lucide-react"

export default function ProjectGrid() {
  const projects = [
    {
      id: 1,
      title: "GDD GameplayPedia",
      subtitle: "Modern Warfare Wiki",
      description: "A responsive Website GDD of COD 4: Modern Warfare Inspired by Wikipedia with comprehensive game documentation.",
      image: "/images/cod-gdd.png?height=400&width=600",
      tags: ["Next.js", "React", "Tailwind CSS"],
      duration: "2 Month Project",
      category: "Web Development",
      url: "https://gameplaypedia.web.id",
    },
    {
      id: 2,
      title: "Entertainment Recommender",
      subtitle: "Recommender App",
      description: "A web-based entertainment recommendation system built with Next.js, featuring both song and movie recommendations using cosine similarity. The system uses Spotify audio features for songs and curated real movie data for movies.",
      image: "/images/song.png?height=400&width=600",
      tags: ["Next.js", "React", "Cosine Similarity"],
      duration: "1 Month Project",
      category: "Web Development",
      url: "https://music-recommender-eight.vercel.app/",
    },
    {
      id: 3,
      title: "Catat Uang",
      subtitle: "Expense Tracker.",
      description: "A serverless Telegram bot for automatic expense tracking with AI-powered financial insights.",
      image: "/images/catat-uang.png?height=400&width=600",
      tags: ["Python", "AI", "Telegram Bot"],
      duration: "1 Month Project",
      category: "Software Development",
      url: "https://catat-uang-nu.vercel.app",
    },
    {
      id: 4,
      title: "WOTIC System",
      subtitle: "Tourism Platform", 
      description: "Tourism information system for Wonosobo featuring detailed updates, promotional content, and location services.",
      image: "/images/wotic.png?height=400&width=600",
      tags: ["Laravel", "JavaScript", "MySQL"],
      rating: 4.7,
      duration: "4 Month Project",
      category: "Web Development",
      url: "https://web.wotic.id",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {projects.map((project) => (
        <div key={project.id} className="group relative">
          {/* Card Container with Glassmorphism */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden h-full">
            
            {/* Image Section */}
            <div className="relative h-40 sm:h-48 overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs">
                  {project.category}
                </Badge>
              </div>

            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-6 flex flex-col flex-1">
              
              {/* Title & Subtitle */}
              <div className="mb-3">
                <h3 className="text-base sm:text-lg font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground/80 mt-1">
                  {project.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed mb-3 sm:mb-4 line-clamp-3 flex-1">
                {project.description}
              </p>

              {/* Duration */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs text-muted-foreground/70">
                <Calendar className="h-3 w-3" />
                {project.duration}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Action Button */}
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <button className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-full bg-white text-black font-medium text-xs sm:text-sm transition-all duration-200 hover:bg-white/90 flex items-center justify-center gap-2 group/btn">
                  View Project
                  <ExternalLink className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
