import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"

export const sansFont = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const monoFont = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const serifFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
})
