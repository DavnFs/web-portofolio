import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { DM_Sans } from "next/font/google"
import { AutoThemeProvider } from "@/components/auto-theme-provider"
import HeaderShader from "@/components/header-shader"
import Footer from "@/components/footer"
import { Analytics } from "@vercel/analytics/next"
import { profile } from "@/lib/portfolio-data"

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" })

export const metadata: Metadata = {
  title: "Davin Fausta Supriyadi — Backend, AI/ML & Applied Computer Vision",
  description:
    "Portfolio of Davin Fausta Supriyadi, a Computer Engineering Technology graduate building Python backend services, REST APIs, and applied AI/ML systems — from YOLOv11 perception research to LLM-assisted product features.",
  authors: [{ name: profile.name, url: profile.github }],
  keywords: [
    "Davin Fausta Supriyadi",
    "Backend Engineer",
    "Python Developer",
    "FastAPI",
    "Machine Learning Engineer",
    "Computer Vision",
    "YOLOv11",
    "Flutter",
    "Internet of Things",
  ],
  openGraph: {
    title: "Davin Fausta Supriyadi — Backend, AI/ML & Applied Computer Vision",
    description:
      "Fresh graduate in Computer Engineering Technology building Python backend services, REST APIs, and applied AI/ML systems.",
    type: "website",
    locale: "en_US",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#021024" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <AutoThemeProvider defaultTheme="dark">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
          >
            Skip to main content
          </a>
          <HeaderShader />
          <main id="main-content">{children}</main>
          <Footer />
          <Analytics />
        </AutoThemeProvider>
      </body>
    </html>
  )
}
