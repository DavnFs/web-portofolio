import Link from "next/link"
import { ArrowRight, Mail, Github, Linkedin, Award, Calendar, MapPin } from "lucide-react"
import ProjectGrid from "@/components/project-grid"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SkillsSection from "@/components/skills-section"
import ShaderBackground from "@/components/shader-background"
import HeroContent from "@/components/hero-content"

export default function Home() {
  // Return a verification URL for a certificate. If the cert object includes
  // a `verificationUrl` property we use it; otherwise we fall back to a Google
  // search that includes issuer, title and credential ID so the user can
  // quickly verify the certificate.
  const verifyUrl = (cert: any) => {
    if (!cert) return "#"
    if (cert.verificationUrl) return cert.verificationUrl
    if (!cert.credential) return "#"
    const query = `${cert.issuer} ${cert.title} ${cert.credential} certificate`
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95 transition-colors duration-500">
      <ShaderBackground>
        <HeroContent />
      </ShaderBackground>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-r from-primary/2 via-background to-primary/2 transition-colors duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-4 text-foreground transition-colors duration-300">
              About <span className="font-serif italic">Me</span>
            </h2>
            <p className="text-muted-foreground/70 text-sm sm:text-base max-w-2xl mx-auto">
              Computer Engineering Technology Student & AI Enthusiast
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Bio Card */}
            <div className="lg:col-span-2">
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 shadow-xl transition-all duration-500 dark:bg-black/5 dark:border-white/20 h-full">
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full dark:via-white/30" />
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-foreground mb-3">Background</h3>
                    <p className="text-muted-foreground/90 leading-relaxed text-sm sm:text-base lg:text-lg">
                      I'm a dedicated student from <span className="text-primary font-medium">Politeknik Negeri Semarang</span> with a passion for cutting-edge technology solutions. My expertise centers on{" "}
                      <span className="text-primary font-medium">Data Science and Machine Learning</span>, complemented by innovative IoT projects that integrate data-driven insights.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-foreground mb-3">Academic Journey</h3>
                    <p className="text-muted-foreground/90 leading-relaxed text-sm sm:text-base lg:text-lg">
                      My studies have equipped me with a solid foundation in programming, system design, and user experience optimization. I specialize in developing practical applications that leverage{" "}
                      <span className="text-primary font-medium">machine learning models and data analytics</span> to solve real-world challenges.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-foreground mb-3">Beyond Academics</h3>
                    <p className="text-muted-foreground/90 leading-relaxed text-sm sm:text-base lg:text-lg">
                      I Sometimes participate in{" "}
                      <span className="text-blue-500 font-medium">Kaggle competitions</span> to sharpen my data science skills and stay current with the latest developments in machine learning and artificial intelligence.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Focus Card */}
            <div className="lg:col-span-1">
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl transition-all duration-500 dark:bg-black/5 dark:border-white/20 h-full">
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full dark:via-white/30" />
                
                <div className="text-center mb-6">
                  <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-4 transition-all duration-300">
                    <span className="text-primary font-medium text-sm sm:text-base">🎯 Current Focus</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-medium text-foreground text-center">
                    BRIN Internship
                  </h3>
                  
                  <div className="space-y-3 text-sm sm:text-base">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground/90 leading-relaxed">
                        Interactive dashboard for autonomous electric vehicle
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground/90 leading-relaxed">
                        ROS1 Noetic integration with LiDAR, GPS, IMU sensors
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground/90 leading-relaxed">
                        Flutter UI with real-time data visualization
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground/90 leading-relaxed">
                        AI-based autonomous driving systems integration
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-4 text-foreground transition-colors duration-300">
              Featured <span className="font-serif italic">Projects</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
              Explore my latest work in AI, web development, and IoT solutions
            </p>
          </div>
          
          <div className="mb-8 sm:mb-12">
            <ProjectGrid />
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              asChild 
              className="group px-6 sm:px-8 py-3 rounded-full border-foreground/20 text-foreground hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-300 text-sm sm:text-base"
            >
              <Link href="https://github.com/Davnfs" target="_blank" rel="noopener noreferrer">
                View all on GitHub
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-4 text-foreground transition-colors duration-300">
              Skills & <span className="font-serif italic">Expertise</span>
            </h2>
          </div>
          <SkillsSection />
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-r from-background via-primary/1 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-4 text-foreground">
              Education & <span className="font-serif italic">Certifications</span>
            </h2>
          </div>
          
          {/* Education */}
          <div className="mb-16 sm:mb-20">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-center mb-8 sm:mb-12 text-foreground">
              Academic <span className="font-serif italic">Background</span>
            </h3>
            
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 shadow-xl">
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="p-3 bg-primary/10 rounded-2xl mx-auto sm:mx-0">
                    <Award className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-medium text-lg sm:text-xl lg:text-2xl mb-2 text-foreground">Bachelor of Applied Science</h4>
                    <p className="text-primary font-medium text-base sm:text-lg lg:text-xl mb-4">Computer Engineering Technology</p>
                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 mb-6 text-muted-foreground/80 text-sm sm:text-base">
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
                      <p className="font-medium mb-4 text-foreground text-sm sm:text-base">Relevant Coursework:</p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {[
                          "Data Analytics", "Machine Learning", "Big Data Processing", "Database Management", 
                          "Software Engineering", "Web Development", "Mobile App Development", "IoT Systems", "UI/UX Design"
                        ].map((course) => (
                          <Badge key={course} variant="secondary" className="text-xs sm:text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-center mb-8 sm:mb-12 text-foreground">
              Professional <span className="font-serif italic">Certifications</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                title: "Big Data Analytics Fundamental",
                issuer: "Solusi 247",
                date: "Aug 2025",
                credential: "sca511-2306-2508012237",
                color: "bg-yellow-500",
                category: "Big Data"
              },
              {
                title: "Complete Flutter, PHP, MySQL: Build Money-Record",
                issuer: "BuildWithAngga",
                date: "Jun 2025",
                crdential: "2fWoyj1vgW",
                color: "bg-indigo-500",
                category: "Software Development"
              }
            ].map((cert, index) => (
              <div key={index} className="group relative">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full relative">
                  <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                  
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${cert.color} mt-2 sm:mt-3 flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <h4 className="font-medium text-xs sm:text-sm leading-tight group-hover:text-primary transition-colors text-foreground">
                          {cert.title}
                        </h4>
                        <Badge variant="outline" className="text-xs ml-1 sm:ml-2 bg-primary/10 text-primary border-primary/20 hidden sm:inline-flex">
                          {cert.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground/80 mb-1">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground/80 mb-2">{cert.date}</p>
                      <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20 mb-2 sm:hidden">
                        {cert.category}
                      </Badge>
                      {cert.credential && (
                        <p className="text-xs text-primary font-mono">
                          ID: <a href={verifyUrl(cert)} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary/80">{cert.credential}</a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl sm:rounded-3xl -z-10" />
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-16 border border-white/10 shadow-xl">
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
              
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light tracking-tight mb-4 sm:mb-6 text-foreground">
                  Let's Connect <span className="font-serif italic">Together</span>
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed">
                  I'm always open to discussing new projects, opportunities, or collaborations in{" "}
                  <span className="text-primary font-medium">Machine Learning</span>,{" "}
                  <span className="text-primary font-medium">mobile apps</span>, or{" "}
                  <span className="text-primary font-medium">IoT</span>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <div className="text-center group">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                      <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                    </div>
                    <h3 className="font-medium text-base sm:text-lg mb-2 text-foreground">Email</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground/80 mb-4 sm:mb-6">Let's discuss your next project</p>
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm" 
                      className="w-full rounded-full border-white/20 text-foreground hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-xs sm:text-sm"
                    >
                      <Link href="mailto:davin123fs@gmail.com">Send Email</Link>
                    </Button>
                  </div>
                </div>

                <div className="text-center group">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-blue-500/20 transition-colors">
                      <Linkedin className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                    </div>
                    <h3 className="font-medium text-base sm:text-lg mb-2 text-foreground">LinkedIn</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground/80 mb-4 sm:mb-6">Connect professionally</p>
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm" 
                      className="w-full rounded-full border-white/20 text-foreground hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-xs sm:text-sm"
                    >
                      <Link href="https://linkedin.com/in/davinfausta" target="_blank" rel="noopener noreferrer">
                        Connect
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="text-center group">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-900/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-gray-900/20 transition-colors">
                      <Github className="h-6 w-6 sm:h-8 sm:w-8 text-foreground" />
                    </div>
                    <h3 className="font-medium text-base sm:text-lg mb-2 text-foreground">GitHub</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground/80 mb-4 sm:mb-6">Explore my code</p>
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm" 
                      className="w-full rounded-full border-white/20 text-foreground hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-xs sm:text-sm"
                    >
                      <Link href="https://github.com/Davnfs" target="_blank" rel="noopener noreferrer">
                        Follow
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  size="lg" 
                  asChild 
                  className="group px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 text-sm sm:text-base"
                >
                  <Link href="mailto:davin123fs@gmail.com">
                    <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Get in Touch
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
