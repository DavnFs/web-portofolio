import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Davin | Web, Mobile, IoT & Data Science Portfolio",
  description: "Explore the portfolio of Davin, a computer engineering student with experience in full-stack web development, mobile apps, IoT systems, and data science.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <header className="border-b">
            <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
              <Link href="/" className="text-xl font-medium">
                Dsupriyadi
              </Link>
              <nav className="hidden md:flex gap-6">
                <Link href="/" className="text-sm hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="#projects" className="text-sm hover:text-primary transition-colors">
                  Projects
                </Link>
                <Link href="#about" className="text-sm hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="#education" className="text-sm hover:text-primary transition-colors">
                  Education
                </Link>
                <Link href="#contact" className="text-sm hover:text-primary transition-colors">
                  Contact
                </Link>
              </nav>
              <div className="md:hidden">{/* Mobile menu button would go here */}</div>
            </div>
          </header>
          <main>
            {children}
            <Analytics />
          </main>
          <footer className="border-t">
            <div className="max-w-screen-xl mx-auto px-4 py-6">
              <p className="text-sm text-muted-foreground text-center">
                © {new Date().getFullYear()} Dsupriyadi. All rights reserved.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
