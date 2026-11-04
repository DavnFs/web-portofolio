import React from "react"
import Image from "next/image"

interface FigureProps {
  src: string
  alt: string
  caption?: string
  aspectRatio?: "16/9" | "4/3" | "21/9"
}

export function Figure({ src, alt, caption, aspectRatio = "16/9" }: FigureProps) {
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm")

  const aspectClass =
    aspectRatio === "21/9"
      ? "aspect-[21/9]"
      : aspectRatio === "4/3"
      ? "aspect-[4/3]"
      : "aspect-[16/9]"

  return (
    <figure className="my-10 not-prose">
      <div className={`relative w-full ${aspectClass} bg-surface border border-line rounded-media overflow-hidden`}>
        {isVideo ? (
          <video
            src={src}
            controls
            playsInline
            muted
            loop
            preload="none"
            aria-label={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-contain"
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-xs text-ink-muted text-center tracking-normal">
          Fig // {caption}
        </figcaption>
      )}
    </figure>
  )
}
