import fs from "fs"
import path from "path"
import { compileMDX } from "next-mdx-remote/rsc"
import { mdxComponents } from "@/components/mdx"
import { CASE_STUDIES } from "@/content/case-studies/types"

export interface CaseStudyFrontmatter {
  index: string
  title: string
  tagline: string
  summary: string
  projectType: string
  year: string
  role: string
  stack: string[]
  repoUrl?: string
  demoUrl?: string
  nextSlug?: string
}

const CASE_STUDIES_DIR = path.join(process.cwd(), "content/case-studies")

export async function getCaseStudy(slug: string) {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) {
    return null
  }

  const rawSource = fs.readFileSync(filePath, "utf-8")
  const { content, frontmatter } = await compileMDX<CaseStudyFrontmatter>({
    source: rawSource,
    options: { parseFrontmatter: true },
    components: mdxComponents,
  })

  // Compute next project for onward link
  const currentIdx = CASE_STUDIES.findIndex((c) => c.slug === slug)
  const nextProject =
    currentIdx >= 0 && currentIdx < CASE_STUDIES.length - 1
      ? CASE_STUDIES[currentIdx + 1]
      : CASE_STUDIES[0]

  return {
    slug,
    content,
    frontmatter,
    nextProject,
  }
}

export function getAllCaseStudySlugs(): string[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) return []
  const files = fs.readdirSync(CASE_STUDIES_DIR)
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}
