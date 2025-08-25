"use client"

import Link from "next/link"

export default function HeaderShader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm bg-transparent">
      <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold text-foreground transition-colors">
            Dsupriyadi
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-bold text-foreground/90 hover:text-foreground transition-colors">Home</Link>
          <Link href="#projects" className="text-sm font-bold text-foreground/90 hover:text-foreground transition-colors">Projects</Link>
          <Link href="#about" className="text-sm font-bold text-foreground/90 hover:text-foreground transition-colors">About</Link>
          <Link href="#skills" className="text-sm font-bold text-foreground/90 hover:text-foreground transition-colors">Skills</Link>
          <Link href="#education" className="text-sm font-bold text-foreground/90 hover:text-foreground transition-colors">Education</Link>
          <Link href="#contact" className="text-sm font-bold text-foreground/90 hover:text-foreground transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
