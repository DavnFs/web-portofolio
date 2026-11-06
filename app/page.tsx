import ShaderBackground from "@/components/shader-background"
import HeroContent from "@/components/hero-content"
import { HorizontalShowcase } from "@/components/home/horizontal-showcase"
import { EthosSection } from "@/components/home/ethos-section"
import { SelectedWork } from "@/components/home/selected-work"
import { AboutTeaser } from "@/components/home/about-teaser"
import { ContactTeaser } from "@/components/home/contact-teaser"
import { profile } from "@/content/profile"

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Mobile Developer Intern",
    worksFor: {
      "@type": "Organization",
      name: "PT. BPR Arto Moro",
    },
    description: profile.headline,
    url: "https://dsupriyadi.my.id",
    sameAs: [profile.github, profile.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Semarang",
      addressCountry: "ID",
    },
    knowsAbout: [
      "Backend Architecture",
      "FastAPI",
      "Applied Computer Vision",
      "YOLOv11",
      "Flutter",
      "Edge Computing",
      "ROS1",
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ShaderBackground>
        <HeroContent />
      </ShaderBackground>

      {/* Solicia Brown Horizontal Scroll Animation Showcase */}
      <HorizontalShowcase />

      <div className="max-w-canvas mx-auto px-5 sm:px-8 lg:px-12">
        <EthosSection />
        <SelectedWork />
        <AboutTeaser />
        <ContactTeaser />
      </div>
    </>
  )
}
