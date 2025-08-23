"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"

type ThemeProviderContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function AutoThemeProvider({
  children,
  defaultTheme = "dark", // Changed to dark since current time is 21:55
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("dark") // Force dark for now

  useEffect(() => {
    const getTimeBasedTheme = (): Theme => {
      const currentHour = new Date().getHours()
      // Light mode: 6:00 - 18:00 (6 AM to 6 PM)
      // Dark mode: 18:00 - 6:00 (6 PM to 6 AM)
      return currentHour >= 6 && currentHour < 18 ? "light" : "dark"
    }

    const updateTheme = () => {
      const timeBasedTheme = getTimeBasedTheme()
      setTheme(timeBasedTheme)
      
      const root = window.document.documentElement
      root.classList.remove("light", "dark")
      root.classList.add(timeBasedTheme)
    }

    // Set initial theme
    updateTheme()

    // Update theme every minute to catch hour changes
    const interval = setInterval(updateTheme, 60000)

    return () => clearInterval(interval)
  }, [])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme)
      const root = window.document.documentElement
      root.classList.remove("light", "dark")
      root.classList.add(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
