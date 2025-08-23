"use client"

import Link from "next/link"
import { useTheme } from "./auto-theme-provider"

export default function HeroContent() {
  const { theme } = useTheme()
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    aboutSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="absolute inset-0 z-20 flex items-center justify-center px-6 no-dm">
      <div className="max-w-2xl text-center">
        <h1 className={`text-5xl md:text-6xl leading-tight tracking-tight font-light mb-6 transition-colors duration-300 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
          <span className="font-serif font-medium italic">Hi, I'm</span>
          <br />
          <span className="font-DM Sans tracking-tight block">Davin Supriyadi</span>
        </h1>

        <p className={`text-base md:text-lg font-medium mb-6 leading-relaxed transition-colors duration-300 ${
          theme === "dark" ? "text-white/70" : "text-gray-700"
        }`}>
          Computer Engineering Technology student passionate about AI, IOT, and Software Development.
        </p>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <button 
            onClick={scrollToAbout}
            className={`px-10 py-4 rounded-full bg-transparent border font-normal text-sm transition-all duration-300 cursor-pointer ${
              theme === "dark"
                ? "border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                : "border-gray-900/30 text-gray-900 hover:bg-gray-900/10 hover:border-gray-900/50"
            }`}
          >
            About Me
          </button>
          <Link 
            href="/resume.pdf" 
            target="_blank" 
            className={`px-10 py-4 rounded-full font-normal text-sm transition-all duration-300 cursor-pointer inline-block ${
              theme === "dark"
                ? "bg-white text-black hover:bg-white/90"
                : "bg-gray-900 text-white hover:bg-gray-900/90"
            }`}
          >
            Resume
          </Link>
        </div>
      </div>
    </main>
  )
}
