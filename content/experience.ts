export interface ExperienceItem {
  role: string
  organisation: string
  location: string
  period: string
  summary: string
  points: string[]
  stack: string[]
  confidential?: boolean
}

export const experience: ExperienceItem[] = [
  {
    role: "Mobile Developer Intern (Maganghub)",
    organisation: "PT. BPR Arto Moro",
    location: "Semarang, Indonesia",
    period: "Sep 2026 - Present",
    summary: "Built new features in internal applications.",
    points: [
      "Developed and implemented new features for internal applications using Flutter and Dart.",
      "Collaborated with backend teams to integrate REST endpoints in Golang.",
    ],
    stack: ["Flutter", "Dart", "Golang"],
    confidential: true,
  },
  {
    role: "Research Assistant - Autonomous Vehicle Perception System",
    organisation: "Politeknik Negeri Semarang",
    location: "Semarang, Indonesia",
    period: "Feb 2026 - Aug 2026",
    summary:
      "Undergraduate thesis research supporting object detection for road safety scenarios using a custom 28-class dataset.",
    points: [
      "Researched a YOLOv11-based autonomous vehicle perception system on a custom 28-class object dataset.",
      "Developed and evaluated YOLOv11 architecture modifications using an ASPP-based triple detection head, Feature Pyramid Network (FPN), and Path Aggregation Network (PANet).",
      "Applied Monte Carlo Dropout for prediction uncertainty estimation and analyzed mAP, precision, recall, model size, and inference latency against real-time requirements.",
      "Deployed inference to an NVIDIA Jetson Orin NX for edge evaluation.",
    ],
    stack: ["PyTorch", "YOLOv11", "ASPP", "FPN", "PANet", "Monte Carlo Dropout", "Jetson Orin NX"],
  },
  {
    role: "Engineering Intern - Smart Mechatronics",
    organisation: "Badan Riset dan Inovasi Nasional (BRIN)",
    location: "Bandung, Indonesia",
    period: "Aug 2025 - Dec 2025",
    summary: "Built operator tooling for an autonomous electric vehicle research platform.",
    points: [
      "Built a real-time interactive dashboard for an autonomous electric vehicle, integrating ROS1 Noetic sensor streams (LiDAR, GPS, IMU) into a Flutter interface.",
      "Designed a data pipeline connecting live sensor feeds to the UI, enabling real-time vehicle status monitoring and visualization.",
      "Integrated the dashboard with the autonomous vehicle system to dispatch user-selected navigation goal points within the research test area.",
      "Researched end-to-end autonomous driving models on the nuScenes dataset, applying multimodal camera-LiDAR fusion through Bird's Eye View (BEV) representation.",
    ],
    stack: ["ROS1 Noetic", "Flutter", "LiDAR", "GPS", "IMU", "BEV", "nuScenes"],
  },
]
