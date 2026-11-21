"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useReducer } from "react"
import { Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { MorphingDrawer } from "@/components/morphing-drawer"
import {
  INITIAL_DRAWER_STATE,
  morphingDrawerReducer,
} from "@/lib/morphing-nav"

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [drawerState, dispatch] = useReducer(
    morphingDrawerReducer,
    INITIAL_DRAWER_STATE
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close drawer automatically on route change
  useEffect(() => {
    dispatch({ type: "ROUTE_CHANGE" })
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg border-b border-line py-3.5 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-canvas mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-8">
          {/* Brand Wordmark */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              className="inline-flex min-h-10 items-center text-base sm:text-lg font-semibold tracking-tight text-ink hover:text-accent transition-colors py-1 focus-visible:ring-1 focus-visible:ring-accent rounded-sm whitespace-nowrap shrink-0"
            >
              Davin Supriyadi
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm"
            aria-label="Main navigation"
          >
            <Link
              href="/about"
              className={`transition-colors py-1 hover:text-accent whitespace-nowrap shrink-0 ${
                pathname === "/about"
                  ? "text-accent font-medium"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              About
            </Link>

            <button
              type="button"
              onClick={() => dispatch({ type: "OPEN_WORK" })}
              aria-haspopup="dialog"
              aria-expanded={drawerState.open && drawerState.activeSubmenu === "work"}
              className={`flex items-center gap-1.5 py-1 transition-colors hover:text-accent whitespace-nowrap shrink-0 ${
                pathname.startsWith("/work")
                  ? "text-accent font-medium"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              <span>Work</span>
            </button>

            <Link
              href="/contact"
              className={`transition-colors py-1 hover:text-accent whitespace-nowrap shrink-0 ${
                pathname === "/contact"
                  ? "text-accent font-medium"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Actions: Theme Toggle + Morphing Drawer Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => dispatch({ type: "TOGGLE" })}
              aria-expanded={drawerState.open}
              aria-haspopup="dialog"
              aria-label={drawerState.open ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-ink hover:border-accent hover:text-accent transition-colors whitespace-nowrap shrink-0"
            >
              <Menu className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      <MorphingDrawer
        open={drawerState.open}
        activeSubmenu={drawerState.activeSubmenu}
        pathname={pathname}
        onClose={() => dispatch({ type: "CLOSE" })}
        onSetSubmenu={(submenu) => dispatch({ type: "SET_SUBMENU", submenu })}
        onToggleWorkSubmenu={() => dispatch({ type: "TOGGLE_WORK_SUBMENU" })}
      />
    </>
  )
}
