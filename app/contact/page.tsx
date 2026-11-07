import type { Metadata } from "next"
import { ContactContent } from "@/components/contact-content"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Davin Fausta Supriyadi (Davin Supriyadi) for software engineering, mobile development, and AI/ML opportunities.",
}

export default function ContactPage() {
  return <ContactContent />
}
