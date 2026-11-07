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
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://dsupriyadi.my.id/#website",
        url: "https://dsupriyadi.my.id",
        name: "Davin Fausta Supriyadi — Official Portfolio",
        alternateName: [
          "Davin Supriyadi",
          "Davin Fausta",
          "DavnFs",
          "dsupriyadi.my.id",
        ],
        description: profile.headline,
        publisher: {
          "@id": "https://dsupriyadi.my.id/#person",
        },
      },
      {
        "@type": "Person",
        "@id": "https://dsupriyadi.my.id/#person",
        name: profile.name,
        alternateName: [
          "Davin Supriyadi",
          "Davin Fausta",
          "DavnFs",
          "dsupriyadi",
        ],
        givenName: "Davin Fausta",
        familyName: "Supriyadi",
        jobTitle: "Mobile Developer Intern & Applied AI Engineer",
        worksFor: {
          "@type": "Organization",
          name: "PT. BPR Arto Moro",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Politeknik Negeri Semarang",
        },
        description: profile.headline,
        url: "https://dsupriyadi.my.id",
        image: "https://dsupriyadi.my.id/images/work/perception-hero.png",
        sameAs: [profile.github, profile.linkedin, "https://dsupriyadi.my.id"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Semarang",
          addressCountry: "ID",
        },
        knowsAbout: [
          "Mobile Application Development",
          "Flutter",
          "Backend Architecture",
          "Python",
          "FastAPI",
          "Applied Computer Vision",
          "YOLOv11",
          "Edge Computing",
          "ROS1",
        ],
      },
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
