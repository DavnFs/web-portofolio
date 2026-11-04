// Privacy-friendly cookie-free analytics (Plausible / Umami compatible)

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void
    umami?: {
      track: (eventName: string, data?: Record<string, unknown>) => void
    }
  }
}

export type AnalyticsEvent = "outbound_click" | "cv_download" | "case_study_open"

export function trackEvent(
  name: AnalyticsEvent,
  props?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return

  try {
    if (window.plausible) {
      window.plausible(name, { props })
    } else if (window.umami?.track) {
      window.umami.track(name, props)
    } else if (process.env.NODE_ENV === "development") {
      // In development, log the event for verification
      console.log(`[analytics] ${name}`, props)
    }
  } catch (error) {
    // Fail silently without disrupting user interaction
    if (process.env.NODE_ENV === "development") {
      console.warn("[analytics error]", error)
    }
  }
}
