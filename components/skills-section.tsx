"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Database, BarChart3, Code } from "lucide-react"

const skillCategories = [
  {
    title: "Machine Learning & AI",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    skills: [
      { name: "Python (Pandas, NumPy)", level: 95 },
      { name: "Scikit-learn & XGBoost", level: 90 },
      { name: "TensorFlow & Keras", level: 85 },
      { name: "Feature Engineering", level: 88 },
      { name: "Model Evaluation & Tuning", level: 85 },
    ],
    tools: ["Jupyter", "Google Colab", "MLflow", "Optuna", "SHAP"]
  },
  {
    title: "Big Data & Analytics",
    icon: Database,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    skills: [
      { name: "Apache Spark", level: 80 },
      { name: "ETL Pipeline Development", level: 85 },
      { name: "Data Preprocessing", level: 90 },
      { name: "TF-IDF & NLP", level: 82 },
      { name: "Statistical Analysis", level: 85 },
    ],
    tools: ["Apache Spark", "Google BigQuery", "Hadoop", "Databricks", "Kafka"]
  },
  {
    title: "Data Visualization",
    icon: BarChart3,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    skills: [
      { name: "Matplotlib & Seaborn", level: 90 },
      { name: "Plotly & Dash", level: 85 },
      { name: "Power BI", level: 50 },
      { name: "Pandas", level: 90 },
      { name: "Interactive Dashboards", level: 82 },
    ],
    tools: ["Streamlit", "Plotly", "D3.js", "Grafana", "Looker"]
  },
  {
    title: "Development & Tools",
    icon: Code,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    skills: [
      { name: "Python & SQL", level: 95 },
      { name: "Git & Version Control", level: 90 },
      { name: "Docker & Containerization", level: 60 },
      { name: "Cloud Platforms (GCP, AWS)", level: 50 },
      { name: "API Development", level: 85 },
    ],
    tools: ["VS Code", "Git", "Docker", "Google Cloud", "FastAPI", "Flask"]
  },
]

export default function SkillsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skillCategories.map((category, index) => {
        const Icon = category.icon
        return (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${category.bgColor} group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-5 w-5 ${category.color}`} />
                </div>
                <span className="text-lg">{category.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Skills with Progress */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2" 
                    />
                  </div>
                ))}
              </div>
              {/* Tools & Technologies */}
              <div className="pt-3 border-t">
                <p className="text-xs font-medium text-muted-foreground mb-2">Tools & Technologies:</p>
                <div className="flex flex-wrap gap-1">
                  {category.tools.map((tool, toolIndex) => (
                    <Badge key={toolIndex} variant="secondary" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
