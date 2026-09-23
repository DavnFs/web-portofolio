import { Award, Calendar, ExternalLink, GraduationCap, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Panel } from "@/components/ui/panel"
import SectionHeading from "@/components/section-heading"
import { certifications, education } from "@/lib/portfolio-data"

export default function EducationSection() {
  return (
    <section
      id="education"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-r from-background via-primary/5 to-background transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Education &"
          accent="Certifications"
          description="Applied technology degree, thesis research, and industry credentials."
        />

        <div className="mb-16 sm:mb-20">
          <Panel className="max-w-4xl mx-auto p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <span className="mx-auto sm:mx-0 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                <GraduationCap className="h-7 w-7 text-primary" aria-hidden="true" />
              </span>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-foreground">{education.degree}</h3>
                <p className="mt-1 text-base sm:text-lg font-medium text-primary">{education.field}</p>

                <div className="mt-4 flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {education.school}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    {education.period}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Award className="h-4 w-4" aria-hidden="true" />
                    GPA {education.gpa}
                  </span>
                </div>

                <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{education.thesis}</p>

                <ul className="mt-4 space-y-2">
                  {education.coursework.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <span className="text-sm text-muted-foreground leading-relaxed text-left">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <p className="text-sm font-medium text-foreground mb-3 text-center sm:text-left">Relevant Coursework</p>
                  <ul className="flex flex-wrap justify-center sm:justify-start gap-1.5">
                    {education.courses.map((course) => (
                      <li key={course}>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 transition-colors"
                        >
                          {course}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        <div>
          <SectionHeading level="h3" title="Professional" accent="Certifications" />

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert) => (
              <li key={cert.title}>
                <Panel className="p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                      <Award className="h-4 w-4 text-primary" aria-hidden="true" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-medium text-foreground leading-snug">{cert.title}</h4>
                        <Badge
                          variant="outline"
                          className="hidden sm:inline-flex flex-shrink-0 text-xs bg-primary/10 text-primary border-primary/20"
                        >
                          {cert.category}
                        </Badge>
                      </div>

                      <p className="mt-1.5 text-xs text-muted-foreground">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground">
                        {cert.date}
                        {cert.detail ? ` · ${cert.detail}` : ""}
                      </p>

                      {cert.credential && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          ID:{" "}
                          {cert.credentialUrl ? (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                            >
                              {cert.credential}
                              <ExternalLink className="h-3 w-3" aria-hidden="true" />
                            </a>
                          ) : (
                            <span className="font-mono text-foreground/80">{cert.credential}</span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </Panel>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
