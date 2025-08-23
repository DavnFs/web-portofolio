"use client"

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
          <div key={index} className="group relative">
            {/* Glassmorphism Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
              
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl ${category.bgColor} group-hover:scale-110 transition-transform backdrop-blur-sm border border-white/10`}>
                  <Icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <h3 className="text-lg font-medium text-foreground">{category.title}</h3>
              </div>

              {/* Skills with Progress */}
              <div className="space-y-4 mb-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-xs text-muted-foreground/80 bg-primary/10 px-2 py-1 rounded-full">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-sm border border-white/10">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${category.color === 'text-purple-500' ? 'from-purple-500 to-purple-400' : 
                            category.color === 'text-blue-500' ? 'from-blue-500 to-blue-400' :
                            category.color === 'text-green-500' ? 'from-green-500 to-green-400' :
                            'from-orange-500 to-orange-400'} shadow-sm`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tools & Technologies */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-medium text-muted-foreground/90 mb-3">Tools & Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {category.tools.map((tool, toolIndex) => (
                    <Badge 
                      key={toolIndex} 
                      variant="secondary" 
                      className="text-xs bg-white/10 text-muted-foreground border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
