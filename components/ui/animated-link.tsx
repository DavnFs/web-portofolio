"use client"

import Link from "next/link"
import React from "react"
import { cn } from "@/lib/utils"

interface AnimatedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
  underline?: boolean
}

/**
 * Editorial Animated Link (A22)
 * Features CSS transform-based underline draw from left-to-right on hover,
 * keyboard visible focus rings, and WCAG AA contrast preservation.
 */
export function AnimatedLink({
  href,
  children,
  className,
  external = false,
  underline = true,
  ...props
}: AnimatedLinkProps) {
  const isExternal = external || href.startsWith("http") || href.startsWith("mailto:")

  const commonClasses = cn(
    "relative inline-flex items-center text-ink transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    underline && "group/link pb-0.5",
    className
  )

  const content = (
    <>
      <span>{children}</span>
      {underline && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[1px] w-full bg-accent origin-left scale-x-0 transition-transform duration-300 ease-editorial group-hover/link:scale-x-100 group-active/link:scale-x-100"
        />
      )}
    </>
  )

  if (isExternal) {
    return (
      <a
        href={href}
        className={commonClasses}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={commonClasses} {...props}>
      {content}
    </Link>
  )
}
