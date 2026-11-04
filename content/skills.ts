export interface SkillCluster {
  name: string
  skills: string[]
}

export const skillClusters: SkillCluster[] = [
  {
    name: "Backend and APIs",
    skills: ["FastAPI", "Express.js", "Golang", "Laravel", "PostgreSQL", "Supabase", "Prisma ORM", "REST API", "JWT"],
  },
  {
    name: "AI/ML and Computer Vision",
    skills: ["PyTorch", "YOLOv11", "ASPP / FPN / PANet", "Monte Carlo Dropout", "OpenCV", "scikit-learn", "XGBoost"],
  },
  {
    name: "Mobile and Frontend",
    skills: ["Flutter", "Dart", "React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "Embedded and Infrastructure",
    skills: ["NVIDIA Jetson Orin NX", "ROS1 Noetic", "ESP32", "MQTT", "Docker", "Linux / WSL2", "Git"],
  },
]
