import { Database, Brain, BarChart2, Code, Server, LineChart } from "lucide-react"

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Data Analysis",
      icon: <Database className="h-8 w-8 text-emerald-500" />,
      skills: ["SQL", "Python", "R", "Excel", "Statistical Analysis", "Data Cleaning"],
    },
    {
      title: "Machine Learning",
      icon: <Brain className="h-8 w-8 text-emerald-500" />,
      skills: ["Scikit-learn", "TensorFlow", "PyTorch", "Classification", "Regression", "Clustering"],
    },
    {
      title: "Data Visualization",
      icon: <BarChart2 className="h-8 w-8 text-emerald-500" />,
      skills: ["Matplotlib", "Seaborn", "Plotly", "Tableau", "Power BI", "D3.js"],
    },
    {
      title: "Programming",
      icon: <Code className="h-8 w-8 text-emerald-500" />,
      skills: ["Python", "R", "JavaScript", "SQL", "Java", "C++"],
    },
    {
      title: "Big Data",
      icon: <Server className="h-8 w-8 text-emerald-500" />,
      skills: ["Hadoop", "Spark", "MongoDB", "AWS", "Google Cloud", "Azure"],
    },
    {
      title: "Deep Learning",
      icon: <LineChart className="h-8 w-8 text-emerald-500" />,
      skills: ["Neural Networks", "CNN", "RNN", "LSTM", "Transformers", "GANs"],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillCategories.map((category, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            {category.icon}
            <h3 className="text-xl font-semibold ml-3">{category.title}</h3>
          </div>
          <ul className="space-y-2">
            {category.skills.map((skill, skillIndex) => (
              <li key={skillIndex} className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
