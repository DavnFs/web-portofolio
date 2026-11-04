export interface Certification {
  title: string
  issuer: string
  date: string
  detail: string
  category: string
  verificationUrl?: string
}

// Certificate ID numbers removed from public pages per privacy & editorial guidelines.
// Verification links are preserved where public validation is supported.
export const certifications: Certification[] = [
  {
    title: "TOEIC Listening & Reading",
    issuer: "ETS",
    date: "Nov 2025",
    detail: "915 total (Listening 475, Reading 440). Valid through Nov 2027.",
    category: "Language",
  },
  {
    title: "Big Data Analyst Associate",
    issuer: "Solusi247",
    date: "Aug 2025",
    detail: "Valid through Aug 2029.",
    category: "Big Data",
  },
  {
    title: "MikroTik Certified Network Associate",
    issuer: "MikroTik",
    date: "Feb 2026",
    detail: "MTCNA. Valid through Feb 2029.",
    category: "Networking",
  },
  {
    title: "Database Design",
    issuer: "Oracle Academy",
    date: "May 2023",
    detail: "Database design fundamentals.",
    category: "Database",
  },
  {
    title: "Belajar Dasar SQL",
    issuer: "Dicoding",
    date: "Nov 2024",
    detail: "Valid through Nov 2027.",
    verificationUrl: "https://www.dicoding.com/certificates/N9ZOY9REYPG5",
    category: "Database",
  },
  {
    title: "Belajar Dasar Data Science",
    issuer: "Dicoding",
    date: "Nov 2024",
    detail: "Valid through Nov 2027.",
    verificationUrl: "https://www.dicoding.com/certificates/07Z643M2WPQR",
    category: "Data Science",
  },
  {
    title: "Complete Flutter, PHP, MySQL: Build Money Record App",
    issuer: "BuildWithAngga",
    date: "Jun 2025",
    detail: "Mobile application development track.",
    category: "Software Development",
  },
]
