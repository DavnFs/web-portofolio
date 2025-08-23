
import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { AutoThemeProvider } from "@/components/auto-theme-provider"
import HeaderShader from '@/components/header-shader'
import { Analytics } from '@vercel/analytics/next'

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400","500","700"], display: 'swap' })

export const metadata: Metadata = {
  title: "Davin | Web, Mobile, IoT & AI Engineer Portfolio",
  description: "Explore the portfolio of Davin, a computer engineering student with experience in full-stack web development, mobile apps, IoT systems, and artificial intelligence.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <AutoThemeProvider defaultTheme="dark">
          <HeaderShader />
          <main>{children}</main>
          <Analytics />
        </AutoThemeProvider>
      </body>
    </html>
  )
}
