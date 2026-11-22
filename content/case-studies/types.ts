export interface CaseStudyMeta {
  index: string // e.g. "01"
  slug: string
  title: string
  tagline: string
  summary: string
  projectType: string
  year: string
  role: string
  stack: string[]
  featured: boolean
  published: boolean
  repoUrl?: string
  demoUrl?: string
}

export const CASE_STUDIES: CaseStudyMeta[] = [
  {
    index: "01",
    slug: "autonomous-perception",
    title: "Autonomous Perception System",
    tagline: "YOLOv11 perception with uncertainty estimation on Jetson Orin NX",
    summary:
      "Perception architecture for road-safety scenarios pairing an ASPP triple detection head with Monte Carlo Dropout uncertainty on edge hardware.",
    projectType: "Undergraduate Thesis & Applied Research",
    year: "2026",
    role: "Lead Researcher",
    stack: ["PyTorch", "YOLOv11", "ASPP", "Monte Carlo Dropout", "NVIDIA Jetson Orin NX"],
    featured: true,
    published: true,
    repoUrl: "https://github.com/DavnFs/yolo_inference",
  },
  {
    index: "02",
    slug: "brin-vehicle-dashboard",
    title: "BRIN Vehicle Dashboard",
    tagline: "Real-time ROS1 sensor telemetry into a Flutter operator cockpit",
    summary:
      "Operator-facing control dashboard dispatching real-time navigation goals and visualising fused LiDAR, GPS, and IMU telemetry.",
    projectType: "Research Platform Engineering",
    year: "2025",
    role: "Engineering Intern",
    stack: ["ROS1 Noetic", "Flutter", "LiDAR", "GPS", "IMU", "WebSockets"],
    featured: true,
    published: true,
  },
  {
    index: "03",
    slug: "simpul",
    title: "Simpul Marketplace",
    tagline: "Vendor KYB, booking workflows, and contextual LLM assistance",
    summary:
      "Multi-sided marketplace connecting wedding vendors and customers with optimized token-usage NLP assistance.",
    projectType: "Platform Engineering",
    year: "2025",
    role: "Backend & System Architect",
    stack: ["Express.js", "Flutter", "Supabase PostgreSQL", "Prisma ORM", "Midtrans"],
    featured: true,
    published: true,
    repoUrl: "https://github.com/Simpul-Platform-Wedding-UMKM",
  },
  {
    index: "04",
    slug: "runa",
    title: "Runa Cycle Tracker",
    tagline: "Private-first Android cycle tracking with zero network permissions",
    summary:
      "Offline Android application enforcing absolute zero cloud dependency: encrypted SQLCipher store, biometrics, and explainable median/MAD cycle predictions.",
    projectType: "Native Mobile & Privacy Architecture",
    year: "2024",
    role: "Lead Mobile Engineer",
    stack: ["Kotlin", "SQLCipher", "Android Keystore", "AES-256-GCM", "Jetpack Compose"],
    featured: true,
    published: true,
    repoUrl: "https://github.com/DavnFs/Runa",
  },
]
