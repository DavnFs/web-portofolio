"use client"

import * as React from "react"
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
  useTheme,
} from "next-themes"

function ClockThemeSync() {
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const getClockTheme = (): "light" | "dark" => {
      const hour = new Date().getHours()
      return hour >= 6 && hour < 18 ? "light" : "dark"
    }

    const syncTheme = () => {
      const isManual = localStorage.getItem("ds_manual_theme_override")
      if (isManual === "true") return

      const clockTheme = getClockTheme()
      setTheme(clockTheme)
    }

    // Set immediately on mount
    syncTheme()

    // Check every minute for hour turnover
    const interval = setInterval(syncTheme, 60000)
    return () => clearInterval(interval)
  }, [setTheme])

  return null
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ClockThemeSync />
      {children}
    </NextThemesProvider>
  )
}
