export interface ArchiveProject {
  title: string
  category: string
  year: string
  stack: string[]
  url?: string
  description: string
  diagramSrc: string
  diagramAlt: string
}

export const archiveProjects: ArchiveProject[] = [
  {
    title: "Water Quality AIoT",
    category: "Embedded ML",
    year: "2024",
    stack: ["ESP32", "PlatformIO", "MQTT", "XGBoost", "Python"],
    url: "https://github.com/tatatacicici/iot-mqtt-go",
    description:
      "Edge suitability classification from turbidity and pH sensor telemetry over MQTT.",
    diagramSrc: "/images/archive-water-aiot.svg",
    diagramAlt:
      "Water Quality AIoT diagram showing ESP32 pH and turbidity probes streaming over MQTT to Go ingest and XGBoost classification",
  },
  {
    title: "Svings",
    category: "Mobile Automation",
    year: "2024",
    stack: ["Flutter", "Dart", "Email Parsing"],
    url: "https://github.com/DavnFs/Svings",
    description:
      "Expense tracking application parsing incoming bank notification emails automatically.",
    diagramSrc: "/images/archive-svings.svg",
    diagramAlt:
      "Svings automation architecture showing bank notification email parsing, deduplication, and Flutter budget ledger",
  },
  {
    title: "TunneLink",
    category: "Developer Tooling",
    year: "2024",
    stack: ["Tauri", "TypeScript", "Rust", "SSH"],
    url: "https://github.com/DavnFs/tunnelink",
    description:
      "Desktop utility for organizing SSH connection profiles and port forwarding rules.",
    diagramSrc: "/images/archive-tunnelink.svg",
    diagramAlt:
      "TunneLink Tauri desktop architecture showing TypeScript UI, Rust IPC supervisor, SSH config sync, and encrypted port tunnels",
  },
  {
    title: "Catat Uang",
    category: "LLM Automation",
    year: "2024",
    stack: ["Python", "Telegram Bot API", "NLP", "Google Sheets"],
    url: "https://catat-uang-nu.vercel.app",
    description:
      "Serverless Telegram bot for natural-language expense logging and automated summaries.",
    diagramSrc: "/images/archive-catat-uang.svg",
    diagramAlt:
      "Catat Uang serverless pipeline showing Telegram natural language messages parsed by Python NLP into Google Sheets ledger",
  },
  {
    title: "Wotic.id",
    category: "Tourism Platform",
    year: "2023",
    stack: ["Laravel", "JavaScript", "MySQL", "REST API"],
    url: "https://github.com/rchmdndy/wotic",
    description:
      "Tourism directory API serving accommodation listings for Wonosobo Regency.",
    diagramSrc: "/images/archive-wotic.svg",
    diagramAlt:
      "Wotic.id REST architecture showing regional directory portal, Laravel Sanctum API, and normalized MySQL schema",
  },
  {
    title: "StuntGuard",
    category: "Health Screening",
    year: "2024",
    stack: ["FastAPI", "React", "TypeScript", "scikit-learn", "Gemini"],
    url: "https://github.com/DavnFs/StuntGuard",
    description:
      "Toddler growth screening API with ML classification and WHO rule-based safety fallbacks.",
    diagramSrc: "/images/archive-stuntguard.svg",
    diagramAlt:
      "StuntGuard clinical screening pipeline showing React intake, FastAPI scikit-learn classifier with WHO Z-score fallback, and Gemini guidance",
  },
]
