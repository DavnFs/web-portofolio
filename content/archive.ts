export interface ArchiveProject {
  title: string
  category: string
  year: string
  stack: string[]
  url?: string
  description: string
}

export const archiveProjects: ArchiveProject[] = [
  {
    title: "Water Quality AIoT",
    category: "Embedded ML",
    year: "2024",
    stack: ["ESP32", "PlatformIO", "MQTT", "XGBoost", "Python"],
    url: "https://github.com/tatatacicici/iot-mqtt-go",
    description: "Edge suitability classification from turbidity and pH sensor telemetry over MQTT.",
  },
  {
    title: "Svings",
    category: "Mobile Automation",
    year: "2024",
    stack: ["Flutter", "Dart", "Email Parsing"],
    url: "https://github.com/DavnFs/Svings",
    description: "Expense tracking application parsing incoming bank notification emails automatically.",
  },
  {
    title: "TunneLink",
    category: "Developer Tooling",
    year: "2024",
    stack: ["Tauri", "TypeScript", "Rust", "SSH"],
    url: "https://github.com/DavnFs/tunnelink",
    description: "Desktop utility for organizing SSH connection profiles and port forwarding rules.",
  },
  {
    title: "Catat Uang",
    category: "LLM Automation",
    year: "2024",
    stack: ["Python", "Telegram Bot API", "NLP", "Google Sheets"],
    url: "https://catat-uang-nu.vercel.app",
    description: "Serverless Telegram bot for natural-language expense logging and automated summaries.",
  },
  {
    title: "Wotic.id",
    category: "Tourism Platform",
    year: "2023",
    stack: ["Laravel", "JavaScript", "MySQL", "REST API"],
    url: "https://github.com/rchmdndy/wotic",
    description: "Tourism directory API serving accommodation listings for Wonosobo Regency.",
  },
  {
    title: "StuntGuard",
    category: "Health Screening",
    year: "2024",
    stack: ["FastAPI", "React", "TypeScript", "scikit-learn", "Gemini"],
    url: "https://github.com/DavnFs/StuntGuard",
    description: "Toddler growth screening API with ML classification and WHO rule-based safety fallbacks.",
  },
]
