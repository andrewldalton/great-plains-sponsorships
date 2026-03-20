// Analytics utility for tracking page views and events

export async function trackPageView(page: string) {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "pageview",
        page,
        timestamp: new Date().toISOString(),
        referrer: typeof document !== "undefined" ? document.referrer : "",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      }),
    });
  } catch {
    // Silently fail - analytics shouldn't break the site
  }
}

export async function trackEvent(
  event: string,
  data: Record<string, string> = {}
) {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "event",
        event,
        data,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // Silently fail
  }
}
