import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProjectGrid() {
  const projects = [
    {
      id: 1,
      title: "GDD GameplayPedia Website",
      description: "A responsive Wesite GDD of COD 4: Modern Warfare Inspired by Wikipedia ",
      image: "/images/cod-gdd.png?height=400&width=600",
      tags: ["Next.js", "React", "Tailwind CSS"],
      url: "https://gameplaypedia.web.id",
    },
    {
      id: 2,
      title: "Money Record App",
      description: "A Flutter mobile app that helps users track expense, set goals, and monitor money.",
      image: "/images/andro.png?height=400&width=600",
      tags: ["Flutter", "Dart", "mysql", "Android"],
      url: "https://github.com/DavnFs/Flutter_Money_Record",
    },
    {
      id: 3,
      title: "Celestial Object Classification",
      description: "A project classifies celestial objects (e.g., stars, galaxies, and quasars) using a dataset of astronomical features. The project leverages data preprocessing, visualization, and machine learning models to predict the class of an object.",
      image: "/images/celestial.png?height=400&width=600",
      tags: ["Python", "Jupyter", "Pandas", "Supervised Learning"],
      url: "https://github.com/DavnFs/Celestial-Object-Classification",
    },
    {
      id: 4,
      title: "Wonosobo Tourism Information System (WOTIC)",
      description: "A information system about tourism spot in wonosobo with detail updates and promo.",
      image: "/images/wotic.png?height=400&width=600",
      tags: ["Laravel", "Javascript", "Mysql"],
      url: "https://web.wotic.id",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <Link key={project.id} href={project.url} className="group" target="_blank" rel="noopener noreferrer">
          <Card className="overflow-hidden border-0 bg-background shadow-sm transition-all hover:shadow-md">
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-2 group-hover:underline">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
