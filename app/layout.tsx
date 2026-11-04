import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { sansFont, serifFont, monoFont } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { AnalyticsScript } from "@/components/analytics-script"
import { SmoothScroll } from "@/components/smooth-scroll"
import { profile, LEAD_IDENTITY } from "@/content/profile"

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${LEAD_IDENTITY}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.headline,
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  keywords: [
    "Davin Fausta Supriyadi",
    "Backend Engineer",
    "Python Developer",
    "FastAPI",
    "Machine Learning Engineer",
    "Computer Vision",
    "YOLOv11",
    "Flutter",
    "Jetson Orin NX",
    "ROS1",
  ],
  metadataBase: new URL("https://dsupriyadi.my.id"),
  openGraph: {
    title: `${profile.name} — ${LEAD_IDENTITY}`,
    description: profile.headline,
    url: "https://dsupriyadi.my.id",
    siteName: profile.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#021024" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sansFont.variable} ${serifFont.variable} ${monoFont.variable}`}
    >
      <body className="min-h-screen bg-bg text-ink font-sans selection:bg-accent selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScroll>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-ink focus:text-bg focus:border focus:border-line focus:shadow-md focus:font-mono focus:text-xs uppercase tracking-wider"
            >
              Skip to main content
            </a>
            <Navigation />
            <main id="main-content" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <SiteFooter />
            <AnalyticsScript />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
