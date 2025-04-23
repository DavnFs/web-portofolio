import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ProjectGrid from "@/components/project-grid"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12 md:py-24">
      <section className="mb-24">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Hi, I'm Davin Fausta</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          I'm a student in Computer Engineering Technology (D4) with a passion for mobile app development, IoT, and data analytics. Currently, I'm working on an AIoT project for water quality monitoring and developing mobile apps with Flutter. I also focus on backend development using Go and explore AI with XGBoost models.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="#projects">View Projects</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="#about">About Me</Link>
          </Button>
        </div>
      </section>

      <section id="projects" className="mb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Projects</h2>
          <Link href="https://github.com/Davnfs" className="text-sm flex items-center hover:underline">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <ProjectGrid />
      </section>

      <section id="about" className="mb-24 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">About Me</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              I'm a college student with a passion for creating technology solutions across multiple platforms. My
              interests span Data Science, web development, and IoT projects.
            </p>
            <p>
              My academic journey has equipped me with a strong foundation in programming, system design, and user
              experience. I enjoy building practical applications that solve real-world problems.
            </p>
            <p>
              When I'm not coding, you can find me participating in kaggle competitions, contributing to open-source projects, or
              exploring the latest advancements in technology.
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Web Development</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>HTML, CSS, JavaScript</li>
                <li>React & Next.js</li>
                <li>Node.js & Express</li>
                <li>MongoDB & SQL</li>
                <li>Responsive Design</li>
                <li>Vercel</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Mobile Development</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Flutter & Dart</li>
                <li>Android Development</li>
                <li>Firebase Integration</li>
                <li>RESTful APIs</li>
                <li>UI/UX Design</li>
              </ul>
            </div>
            <div className="mt-6">
              <h3 className="font-medium mb-2">IoT Development</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Arduino & ESP32</li>
                <li>Raspberry Pi</li>
                <li>Sensors & Actuators</li>
                <li>MQTT Protocol</li>
                <li>IoT Cloud Platforms</li>
              </ul>
            </div>
            <div className="mt-6">
              <h3 className="font-medium mb-2">Data Science</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Data Analysis (Pandas, NumPy)</li>
                <li>Data Visualization (Matplotlib, Seaborn)</li>
                <li>Machine Learning (XGBoost, Scikit-learn)</li>
                <li>Data Preprocessing & Feature Engineering</li>
                <li>Statistical Analysis & Hypothesis Testing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="mb-24">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Education</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium">Bachelor of Applied Science in Computer Engineering Technology</h3>
            <p className="text-sm text-muted-foreground">Politeknik Negeri Semarang, 2022 - Present</p>
            <p className="text-sm mt-2">
              Relevant coursework: Web Development, Mobile App Development, IoT Systems, Database Management, Software
              Engineering, UI/UX Design, Data Analytics
            </p>
          </div>
          <div>
            <h3 className="font-medium">Certifications</h3>
            <ul className="mt-2 space-y-2">
              <li className="text-sm">
                <span className="font-medium">Belajar Dasar Data Science</span>
                <span className="text-muted-foreground block">Dicoding Indonesia — Issued Nov 2024</span>
                <span className="block text-xs text-muted-foreground">Credential ID: 07Z643M2WPQR</span>
              </li>
              <li className="text-sm">
                <span className="font-medium">Database Design</span>
                <span className="text-muted-foreground block">Oracle Database Academy — Issued May 2023</span>
              </li>
              <li className="text-sm">
                <span className="font-medium">Kursus SQL</span>
                <span className="text-muted-foreground block">Progate — Issued Dec 2021</span>
              </li>
              <li className="text-sm">
                <span className="font-medium">RevoU Mini Course: Intro to Data Analytics</span>
                <span className="text-muted-foreground block">RevoU — Issued Dec 2021</span>
              </li>
            </ul>
          </div>
        </div>
      </section>


      <section id="contact">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Contact</h2>
        <p className="text-muted-foreground mb-6">
          I'm always open to discussing new projects, opportunities, or collaborations in kaggle competitions, web development, mobile apps,
          or IoT.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="mailto:davin123fs@gmail.com">Email Me</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="https://github.com/Davnfs" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
