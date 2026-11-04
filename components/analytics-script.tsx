import Script from "next/script"

export function AnalyticsScript() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC || "https://cloud.umami.is/script.js"

  if (plausibleDomain) {
    return (
      <Script
        defer
        data-domain={plausibleDomain}
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
    )
  }

  if (umamiWebsiteId) {
    return (
      <Script
        defer
        src={umamiSrc}
        data-website-id={umamiWebsiteId}
        strategy="afterInteractive"
      />
    )
  }

  return null
}
