export interface Education {
  degree: string
  field: string
  school: string
  location: string
  period: string
  gpa: string
  thesis: string
  coursework: string[]
  courses: string[]
}

export const education: Education = {
  degree: "D4 - Bachelor of Applied Technology",
  field: "Computer Engineering Technology",
  school: "Politeknik Negeri Semarang",
  location: "Semarang, Indonesia",
  period: "2022 - 2026",
  gpa: "3.84 / 4.00",
  thesis:
    "YOLOv11-based autonomous vehicle perception system on a custom 28-class dataset, with a triple-head detection architecture using ASPP, FPN, and PANet for real-time object detection.",
  coursework: [
    "Cloud Computing: deployed a Linux VPS on AWS EC2, including WordPress hosting and configuration of three domains",
    "Techcompfest 2025 Committee: Planning, Design & Documentation Division",
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

export const languages = [
  { name: "Indonesian", level: "Native" },
  { name: "English", level: "Professional working proficiency (TOEIC 915, Nov 2025)" },
]
