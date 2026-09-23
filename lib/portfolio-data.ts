export const profile = {
  name: "Davin Fausta Supriyadi",
  nameParts: { first: "Hi, I'm", last: "Davin Supriyadi" },
  headline: "Fresh Graduate, Computer Engineering Technology",
  focusAreas: ["Python Backend Development", "AI/ML & Automation", "Applied Computer Vision"],
  summary:
    "Fresh graduate in Computer Engineering Technology with hands-on experience building Python-based backend services, REST APIs, and applied AI/ML systems. Comfortable across FastAPI, Express.js, Laravel, PostgreSQL, and Prisma ORM, with project work spanning authentication, payment integration, admin dashboards, and end-to-end testing.",
  location: "Semarang, Indonesia",
  email: "davin123fs@gmail.com",
  github: "https://github.com/DavnFs",
  linkedin: "https://www.linkedin.com/in/davinfausta",
  resumeFile: "/Davin-Supriyadi-CV.docx",
}

export const highlights = [
  { label: "GPA", value: "3.84", detail: "/ 4.00" },
  { label: "TOEIC Listening & Reading", value: "915", detail: "valid to Nov 2027" },
]

export const about = {
  background: [
    "I recently completed a D4 in Computer Engineering Technology at Politeknik Negeri Semarang, where I focused on backend engineering and applied machine learning.",
    "My work spans Python services, REST APIs, and applied computer vision — from YOLOv11 architecture research for autonomous-vehicle perception to LLM-assisted product features.",
  ],
  approach: [
    "I like problems that start ambiguous and end as working software. Along the way I pick up new APIs, tooling, and infrastructure quickly.",
    "Recent work includes a FastAPI screening service with ML-backed classification, an LLM trading assistant with token-usage optimization, and an on-device Android app that ships with no network permission at all.",
  ],
  currentFocus: [
    "Open to backend, AI/ML, and automation engineering roles",
    "YOLOv11 perception research with edge deployment on NVIDIA Jetson Orin NX",
    "Building Runa — a private-first Android app with on-device analysis",
  ],
}

export const experience = [
  {
    role: "Research Assistant — Autonomous Vehicle Perception System",
    organisation: "Politeknik Negeri Semarang",
    location: "Semarang, Indonesia",
    period: "February 2026 – August 2026",
    summary:
      "Undergraduate thesis research supporting object detection for road-safety scenarios using a custom 28-class dataset.",
    points: [
      "Researched a YOLOv11-based autonomous vehicle perception system on a custom 28-class object dataset.",
      "Developed and evaluated YOLOv11 architecture modifications using an ASPP-based triple detection head, Feature Pyramid Network (FPN), and Path Aggregation Network (PANet).",
      "Applied Monte Carlo Dropout for prediction-uncertainty estimation and analysed mAP, precision, recall, model size, and inference latency against real-time requirements.",
      "Deployed inference to an NVIDIA Jetson Orin NX for edge evaluation.",
    ],
    stack: ["PyTorch", "YOLOv11", "ASPP", "FPN", "PANet", "Monte Carlo Dropout", "Jetson Orin NX"],
  },
  {
    role: "Engineering Intern — Smart Mechatronics",
    organisation: "Badan Riset dan Inovasi Nasional (BRIN)",
    location: "Bandung, Indonesia",
    period: "August 2025 – December 2025",
    summary:
      "Built operator-facing tooling for an autonomous electric vehicle research platform.",
    points: [
      "Built a real-time interactive dashboard for an autonomous electric vehicle, integrating ROS1 Noetic sensor streams (LiDAR, GPS, IMU) into a Flutter front end.",
      "Designed a data pipeline connecting live sensor feeds to the UI, enabling real-time vehicle-status monitoring and visualization for the research team.",
      "Integrated the dashboard with the autonomous vehicle system to send user-selected goal points within the BRIN KST area, letting the vehicle run navigation through existing path-planning and control modules.",
      "Researched and partially implemented an end-to-end autonomous driving model on the nuScenes dataset, applying multimodal camera-LiDAR fusion through Bird's Eye View (BEV) representation.",
    ],
    stack: ["ROS1 Noetic", "Flutter", "LiDAR", "GPS", "IMU", "BEV", "nuScenes"],
  },
]

export const projects = [
  {
    name: "Simpul",
    category: "Marketplace Platform",
    tagline: "Wedding-services & MSME marketplace",
    description:
      "Marketplace platform covering authentication, vendor KYB, service catalog, booking, order management, and consumer/vendor/admin dashboards, with an NLP + LLM assistant that interprets user context and optimizes token usage.",
    stack: ["Express.js", "Flutter", "Supabase PostgreSQL", "Prisma ORM", "Midtrans", "LLM/NLP"],
    award: "1st Runner-Up — Bank Indonesia Hackathon",
    awardDetail: "Ranked 4th of 64 teams",
    url: "https://github.com/Simpul-Platform-Wedding-UMKM",
    icon: "store",
    accent: "amber",
  },
  {
    name: "StuntGuard",
    category: "Health Screening",
    tagline: "Full-stack stunting risk screening",
    description:
      "Screening application for toddler stunting risk based on WHO growth standards, with a parent dashboard for growth-history monitoring and JWT authentication. Pairs a scikit-learn growth classifier with a WHO rule-based fallback.",
    stack: ["FastAPI", "React", "TypeScript", "SQLAlchemy", "SQLite", "scikit-learn", "Gemini"],
    award: "Guarded AI chatbot",
    awardDetail: "Three-layer guardrail against diagnostic claims",
    url: "https://github.com/DavnFs/StuntGuard",
    icon: "heart-pulse",
    accent: "emerald",
  },
  {
    name: "Runa",
    category: "Android · Privacy",
    tagline: "Private-first cycle tracker",
    description:
      "Offline Android app that keeps every record on-device: no account, no cloud, and no internet permission at all. Period prediction is expressed as a median/MAD range rather than a fixed date, with explainable personal insights.",
    stack: ["Kotlin", "SQLCipher", "Android Keystore", "AES-256-GCM", "Biometrics"],
    award: "Zero-permission by design",
    awardDetail: "No network access, encrypted local store",
    url: "https://github.com/DavnFs/Runa",
    icon: "shield",
    accent: "violet",
  },
  {
    name: "Autonomous Perception",
    category: "Applied Computer Vision",
    tagline: "YOLOv11 perception for road safety",
    description:
      "YOLOv11 research pipeline for autonomous-vehicle perception, pairing an ASPP triple detection head with FPN and PANet necking. Monte Carlo Dropout adds per-prediction uncertainty so weak detections can be flagged rather than trusted.",
    stack: ["Python", "PyTorch", "YOLOv11", "OpenCV", "Jetson Orin NX"],
    award: "Undergraduate thesis",
    awardDetail: "28-class custom dataset",
    url: "https://github.com/DavnFs/yolo_inference",
    icon: "scan-eye",
    accent: "sky",
  },
  {
    name: "Water Quality AIoT",
    category: "Embedded ML",
    tagline: "Sensor classification over MQTT",
    description:
      "AIoT system that classifies water suitability for bathing and washing from turbidity and pH readings. An ESP32 publishes sensor data over MQTT while an XGBoost model maps readings to suitability categories.",
    stack: ["ESP32", "PlatformIO", "MQTT", "XGBoost", "C++", "Python"],
    award: "Edge inference",
    awardDetail: "Sensor-to-classification pipeline",
    url: "https://github.com/tatatacicici/iot-mqtt-go",
    icon: "droplets",
    accent: "cyan",
  },
  {
    name: "Svings",
    category: "Mobile · Automation",
    tagline: "Expense tracking from your inbox",
    description:
      "Flutter app that records expenses and income automatically by parsing transaction e-mail, removing the manual entry step that makes budgeting apps tedious to keep up with.",
    stack: ["Flutter", "Dart", "E-mail Parsing", "Automation"],
    award: "Automated records",
    awardDetail: "Parses income and expenses from e-mail",
    url: "https://github.com/DavnFs/Svings",
    icon: "wallet",
    accent: "rose",
  },
  {
    name: "TunneLink",
    category: "Developer Tooling",
    tagline: "SSH tunnel profile manager",
    description:
      "Lightweight Tauri desktop app for managing SSH connection profiles and local port-forwarding rules, built for people who juggle the same tunnels across several environments.",
    stack: ["Tauri", "TypeScript", "Rust", "SSH"],
    award: "MIT licensed",
    awardDetail: "Cross-platform desktop app",
    url: "https://github.com/DavnFs/tunnelink",
    icon: "network",
    accent: "indigo",
  },
  {
    name: "Catat Uang",
    category: "LLM · Automation",
    tagline: "AI-powered Telegram expense bot",
    description:
      "Serverless Telegram bot for expense tracking with AI-generated financial insights. Natural-language expense capture backed by Google Sheets storage and personalized budget recommendations.",
    stack: ["Python", "Telegram Bot API", "NLP", "Google Sheets"],
    award: "Live demo",
    awardDetail: "Deployed serverless bot",
    url: "https://catat-uang-nu.vercel.app",
    icon: "receipt",
    accent: "lime",
  },
  {
    name: "Wotic.id",
    category: "Tourism Platform",
    tagline: "Wonosobo Regency tourism website",
    description:
      "Tourism platform for Wonosobo Regency. Built the API serving hotel listing data and wired it into the hotel page for dynamic display, plus a responsive footer used across the public site.",
    stack: ["Laravel", "JavaScript", "MySQL", "REST API"],
    award: "Team delivery",
    awardDetail: "Hotel listing API & responsive UI",
    url: "https://github.com/rchmdndy/wotic",
    icon: "map-pinned",
    accent: "teal",
  },
]

export const skillGroups = [
  {
    title: "Programming",
    icon: "code",
    skills: ["Python", "JavaScript", "TypeScript", "PHP", "SQL"],
  },
  {
    title: "Backend & API",
    icon: "server",
    skills: ["FastAPI", "Express.js", "Laravel", "REST API", "JWT Authentication"],
  },
  {
    title: "AI/ML & LLM",
    icon: "brain",
    skills: ["PyTorch", "YOLOv11", "XGBoost", "scikit-learn", "NLP/LLM Integration"],
  },
  {
    title: "Database",
    icon: "database",
    skills: ["PostgreSQL", "Supabase", "MySQL", "SQLite", "Prisma ORM"],
  },
  {
    title: "Mobile & Frontend",
    icon: "smartphone",
    skills: ["Flutter", "React", "TypeScript", "Vite"],
  },
  {
    title: "IoT & Embedded",
    icon: "cpu",
    skills: ["ESP32", "ESP8266", "Arduino", "PlatformIO", "MQTT", "Sensor Integration"],
  },
  {
    title: "Tools & Infrastructure",
    icon: "wrench",
    skills: ["Git", "Docker", "Jenkins", "Kubernetes", "Linux/WSL2", "AWS EC2"],
  },
  {
    title: "Ways of Working",
    icon: "users",
    skills: ["Leadership", "Problem Solving", "Teamwork", "Public Speaking"],
  },
]

export const languages = [
  { name: "Indonesian", level: "Native" },
  { name: "English", level: "Professional working proficiency" },
]

export const education = {
  degree: "D4 — Bachelor of Applied Technology",
  field: "Computer Engineering Technology",
  school: "Politeknik Negeri Semarang",
  location: "Semarang, Indonesia",
  period: "2022 – 2026",
  gpa: "3.82 / 4.00",
  thesis:
    "Thesis: YOLOv11-based autonomous vehicle perception system on a custom 28-class dataset, with a triple-head detection architecture using ASPP, FPN, and PANet for real-time object detection.",
  coursework: [
    "Cloud Computing — deployed a Linux VPS on AWS EC2 (free tier), including WordPress hosting and configuration of three domains",
    "Techcompfest 2025 Committee — Planning, Design & Documentation Division",
  ],
  courses: [
    "Data Analytics",
    "Machine Learning",
    "Big Data Processing",
    "Database Management",
    "Software Engineering",
    "Web Development",
    "Mobile App Development",
    "IoT Systems",
    "UI/UX Design",
  ],
}

export const certifications = [
  {
    title: "TOEIC Listening & Reading",
    issuer: "ETS",
    date: "Nov 2025",
    detail: "915 total — Listening 475, Reading 440 · valid to Nov 2027",
    category: "Language",
  },
  {
    title: "Big Data Analyst Associate",
    issuer: "Solusi247",
    date: "Aug 2025",
    credential: "SCA511-23062508012237",
    detail: "Valid to Aug 2029",
    category: "Big Data",
  },
  {
    title: "MikroTik Certified Network Associate",
    issuer: "MikroTik",
    date: "Feb 2026",
    credential: "2602NA8029",
    detail: "MTCNA · valid to Feb 2029",
    category: "Networking",
  },
  {
    title: "Database Design",
    issuer: "Oracle Academy",
    date: "May 2023",
    detail: "Database design fundamentals",
    category: "Database",
  },
  {
    title: "Belajar Dasar SQL",
    issuer: "Dicoding",
    date: "Nov 2024",
    credential: "N9ZOY9REYPG5",
    credentialUrl: "https://www.dicoding.com/certificates/N9ZOY9REYPG5",
    detail: "Valid to Nov 2027",
    category: "Database",
  },
  {
    title: "Belajar Dasar Data Science",
    issuer: "Dicoding",
    date: "Nov 2024",
    credential: "07Z643M2WPQR",
    credentialUrl: "https://www.dicoding.com/certificates/07Z643M2WPQR",
    detail: "Valid to Nov 2027",
    category: "Data Science",
  },
  {
    title: "Complete Flutter, PHP, MySQL: Build Money Record App",
    issuer: "BuildWithAngga",
    date: "Jun 2025",
    credential: "2fWoyj1vgW",
    detail: "Mobile app development track",
    category: "Software Development",
  },
]

export const navSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
]
