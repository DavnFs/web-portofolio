import Link from "next/link"
import { ArrowRight, Mail, Github, Linkedin, Award, Calendar, MapPin, Download } from "lucide-react"
import ProjectGrid from "@/components/project-grid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SkillsSection from "@/components/skills-section"

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12 md:py-24">
      {/* Enhanced Hero Section */}
      <section className="mb-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 rounded-3xl -z-10" />
        <div className="py-12 md:py-16 px-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm text-muted-foreground">Available for opportunities</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Hi, I'm Davin Fausta
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8 leading-relaxed">
            Computer Engineering Technology student passionate about{" "}
            <span className="text-primary font-semibold">Data Science</span> and{" "}
            <span className="text-primary font-semibold">AI</span>. Building intelligent solutions with{" "}
            <span className="text-primary font-semibold">Machine Learning</span> and modern web technologies.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">4+</div>
              <div className="text-sm text-muted-foreground">Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">3+</div>
              <div className="text-sm text-muted-foreground">Years Learning</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Curiosity</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="#projects" className="group">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#about">About Me</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/resume.pdf" target="_blank" className="group">
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                Resume
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="mb-32">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Featured Projects</h2>
            <p className="text-muted-foreground">Explore my latest work in AI, web development, and IoT</p>
          </div>
          <Button variant="outline" asChild className="group">
            <Link href="https://github.com/Davnfs" target="_blank" rel="noopener noreferrer">
              View all on GitHub
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <ProjectGrid />
      </section>

      {/* About Section */}
      <section id="about" className="mb-32">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">About Me</h2>
        <div className="max-w-4xl mx-auto">
          <Card className="border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent p-8">
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg text-justify">
                I'm a college student from Politeknik Negeri Semarang deeply passionate about leveraging technology solutions, with a strong focus on{" "}
                <span className="text-primary font-semibold">Data Science and Machine Learning</span> across various platforms. 
                My interests also extend to innovative IoT projects that integrate data-driven insights.
              </p>

              <p className="text-muted-foreground leading-relaxed text-lg text-justify">
                My academic journey has provided me with a robust foundation in programming, advanced system design, 
                and data-centric user experience optimization. I thrive on developing practical applications that harness{" "}
                <span className="text-primary font-semibold">machine learning models and data analytics</span> to address real-world challenges.
              </p>

              <p className="text-muted-foreground leading-relaxed text-lg text-justify">
                Beyond academics, I actively engage in{" "}
                <span className="text-blue-500 font-semibold">Kaggle competitions</span> to refine my data science skills 
                and stay updated with the latest advancements in machine learning and artificial intelligence technologies.
              </p>

              {/* Current Focus */}
              <div className="bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg p-6 border border-primary/20 mt-6">
                <h3 className="font-semibold mb-3 text-primary flex items-center gap-2">
                  🎯 Current Focus
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Developing a <span className="font-semibold text-foreground">Child Growth Monitoring and Prediction Web App</span> that 
                  leverages AI for risk prediction and personalized recommendations using XGBoost models and Next.js.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="mb-32">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">Skills & Expertise</h2>
        <div className="max-w-6xl mx-auto">
          <SkillsSection />
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education" className="mb-32">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">Education & Certifications</h2>
        
        {/* Education */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8">Academic Background</h3>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="border-l-4 border-l-primary pl-6">
                <div className="flex items-start gap-4">
                  <Award className="h-8 w-8 text-primary mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-xl mb-2">Bachelor of Applied Science</h4>
                    <p className="text-primary font-medium text-lg mb-3">Computer Engineering Technology</p>
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Politeknik Negeri Semarang
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        2022 - Present
                      </div>
                    </div>
                    <div>
                      <p className="font-medium mb-3">Relevant Coursework:</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Data Analytics", "Machine Learning", "Big Data Processing", "Database Management", 
                          "Software Engineering", "Web Development", "Mobile App Development", "IoT Systems", "UI/UX Design"
                        ].map((course) => (
                          <Badge key={course} variant="secondary" className="text-sm">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-semibold mb-8">Professional Certifications</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Belajar Dasar Data Science",
                issuer: "Dicoding Indonesia",
                date: "Nov 2024",
                credential: "07Z643M2WPQR",
                color: "bg-green-500",
                category: "Data Science"
              },
              {
                title: "Database Design",
                issuer: "Oracle Database Academy",
                date: "May 2023",
                color: "bg-red-500",
                category: "Database"
              },
              {
                title: "Kursus SQL",
                issuer: "Progate",
                date: "Dec 2021",
                color: "bg-purple-500",
                category: "Database"
              },
              {
                title: "RevoU Mini Course: Intro to Data Analytics",
                issuer: "RevoU",
                date: "Dec 2021",
                color: "bg-blue-500",
                category: "Analytics"
              },
              {
                title: "Python for Data Science",
                issuer: "Coursera",
                date: "Jan 2024",
                color: "bg-yellow-500",
                category: "Programming"
              },
              {
                title: "Machine Learning Fundamentals",
                issuer: "edX",
                date: "Mar 2024",
                color: "bg-indigo-500",
                category: "ML/AI"
              }
            ].map((cert, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className={`w-4 h-4 rounded-full ${cert.color} mt-2 flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">
                          {cert.title}
                        </h4>
                        <Badge variant="outline" className="text-xs ml-2">
                          {cert.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground mb-2">{cert.date}</p>
                      {cert.credential && (
                        <p className="text-xs text-primary font-mono">ID: {cert.credential}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Placeholder for upcoming certificates */}
            <Card className="border-dashed border-2 border-muted">
              <CardContent className="p-6 text-center">
                <div className="text-muted-foreground">
                  <Award className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">4 more certificates</p>
                  <p className="text-xs">coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-3xl -z-10" />
        <div className="py-12 md:py-16 px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Let's Work Together</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              I'm always open to discussing new projects, opportunities, or collaborations in{" "}
              <span className="text-primary font-semibold">Machine Learning</span>,{" "}
              <span className="text-primary font-semibold">mobile apps</span>, or{" "}
              <span className="text-primary font-semibold">IoT</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground mb-4">Let's discuss your next project</p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="mailto:davin123fs@gmail.com">Send Email</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <Linkedin className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2">LinkedIn</h3>
                <p className="text-sm text-muted-foreground mb-4">Connect professionally</p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="https://linkedin.com/in/davinfausta" target="_blank" rel="noopener noreferrer">
                    Connect
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-gray-900/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-900/20 transition-colors">
                  <Github className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                </div>
                <h3 className="font-semibold mb-2">GitHub</h3>
                <p className="text-sm text-muted-foreground mb-4">Explore my code</p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="https://github.com/Davnfs" target="_blank" rel="noopener noreferrer">
                    Follow
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" asChild className="group">
              <Link href="mailto:davin123fs@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
