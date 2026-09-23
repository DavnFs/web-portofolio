import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ShaderBackground from "@/components/shader-background"
import HeroContent from "@/components/hero-content"
import AboutSection from "@/components/about-section"
import ExperienceSection from "@/components/experience-section"
import ProjectGrid from "@/components/project-grid"
import SkillsSection from "@/components/skills-section"
import EducationSection from "@/components/education-section"
import ContactSection from "@/components/contact-section"
import SectionHeading from "@/components/section-heading"
import { profile } from "@/lib/portfolio-data"

export default function Home() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <ShaderBackground>
        <HeroContent />
      </ShaderBackground>

      <AboutSection />

      <ExperienceSection />

      <section id="projects" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <ProjectGrid />

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              asChild
              className="group min-h-11 rounded-full border-border px-6 text-sm font-medium text-foreground transition-all duration-300 hover:bg-muted sm:px-8"
            >
              <Link href={profile.github} target="_blank" rel="noopener noreferrer">
                View all repositories on GitHub
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="skills" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Skills &"
            accent="Expertise"
            description="Technologies I use to ship backend services, applied ML systems, and the tooling around them."
          />
          <SkillsSection />
        </div>
      </section>

      <EducationSection />

      <ContactSection />
    </div>
  )
}
