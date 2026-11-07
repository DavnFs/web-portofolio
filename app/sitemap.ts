import type { MetadataRoute } from "next"
import { getAllCaseStudySlugs } from "@/lib/case-studies"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dsupriyadi.my.id"
  const slugs = getAllCaseStudySlugs()

  const caseStudyUrls: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...caseStudyUrls,
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]
}
