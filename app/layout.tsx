import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { sansFont, serifFont, monoFont } from "@/lib/fonts"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { AnalyticsScript } from "@/components/analytics-script"
import { SmoothScroll } from "@/components/smooth-scroll"
import { profile, LEAD_IDENTITY } from "@/content/profile"

export const metadata: Metadata = {
  title: {
    default: "Davin Fausta Supriyadi (Davin Supriyadi) — Mobile Developer & Applied AI Engineer",
    template: `%s — ${profile.name}`,
  },
  description:
    "Official portfolio and engineering website of Davin Fausta Supriyadi (Davin Supriyadi). Mobile Developer Intern at PT. BPR Arto Moro and Computer Engineering graduate from Politeknik Negeri Semarang specializing in Flutter, FastAPI, and Applied Computer Vision.",
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  keywords: [
    "Davin Fausta Supriyadi",
    "Davin Supriyadi",
    "Davin Fausta",
    "Davin",
    "DavnFs",
    "dsupriyadi",
    "dsupriyadi.my.id",
    "Davin Supriyadi Portfolio",
    "Davin Fausta Supriyadi CV",
    "Davin Supriyadi Semarang",
    "Davin Supriyadi Politeknik Negeri Semarang",
    "Mobile Developer Intern",
    "PT. BPR Arto Moro",
    "Backend Engineer",
    "Python Developer",
    "FastAPI",
    "Applied Computer Vision",
    "YOLOv11",
    "Flutter",
    "Jetson Orin NX",
    "ROS1",
  ],
  metadataBase: new URL("https://dsupriyadi.my.id"),
  alternates: {
    canonical: "https://dsupriyadi.my.id",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Davin Fausta Supriyadi (Davin Supriyadi) — Portfolio & Engineering",
    description:
      "Official portfolio of Davin Fausta Supriyadi. Mobile Developer Intern at PT. BPR Arto Moro, building mobile apps, backend services, and edge AI systems.",
    url: "https://dsupriyadi.my.id",
    siteName: "Davin Fausta Supriyadi Portfolio",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "https://dsupriyadi.my.id/images/work/perception-hero.png",
        width: 1200,
        height: 630,
        alt: "Davin Fausta Supriyadi — Engineering Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Davin Fausta Supriyadi (Davin Supriyadi) — Portfolio",
    description:
      "Official portfolio of Davin Fausta Supriyadi (Davin Supriyadi). Mobile Developer Intern at PT. BPR Arto Moro.",
    images: ["https://dsupriyadi.my.id/images/work/perception-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${serifFont.variable} ${monoFont.variable}`}
    >
      <body className="min-h-screen bg-bg text-ink font-sans selection:bg-accent selection:text-white">
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
      </body>
    </html>
  )
}
