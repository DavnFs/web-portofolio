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
  heroMedia: {
    type: "image" | "video" | "diagram"
    src: string
    alt: string
    aspectRatio?: "16/9" | "4/5" | "21/9"
  }
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
    heroMedia: {
      type: "diagram",
      src: "/images/perception-architecture.svg",
      alt: "Autonomous vehicle perception pipeline diagram showing backbone, ASPP triple-head neck, and Monte Carlo Dropout output",
      aspectRatio: "16/9",
    },
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
    heroMedia: {
      type: "diagram",
      src: "/images/brin-dashboard-flow.svg",
      alt: "BRIN autonomous vehicle sensor-to-dashboard pipeline diagram",
      aspectRatio: "16/9",
    },
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
    heroMedia: {
      type: "diagram",
      src: "/images/simpul-architecture.svg",
      alt: "Simpul platform architecture diagram showing client layers, API gateway, Supabase database and external services",
      aspectRatio: "16/9",
    },
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
    heroMedia: {
      type: "diagram",
      src: "/images/runa-security-flow.svg",
      alt: "Runa zero-network on-device cryptographic storage and prediction pipeline diagram",
      aspectRatio: "16/9",
    },
    featured: true,
    published: true,
    repoUrl: "https://github.com/DavnFs/Runa",
  },
]
