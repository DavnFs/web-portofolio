"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface MotionImageProps extends ImageProps {
  wrapperClassName?: string
}

/**
 * Editorial Motion Image (A14)
 * Smooth image decode fade-in with zero layout shift.
 * Avoids jarring pop-in on throttled networks.
 */
export function MotionImage({
  className,
  wrapperClassName,
  alt,
  ...props
}: MotionImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={cn("relative overflow-hidden bg-surface", wrapperClassName)}>
      <Image
        alt={alt}
        className={cn(
          "transition-[opacity,transform] duration-700 ease-editorial",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  )
}
