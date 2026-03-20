import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";

const ANALYTICS_FILE = "/tmp/gps-analytics.json";

interface AnalyticsEvent {
  type: "pageview" | "event";
  page?: string;
  event?: string;
  data?: Record<string, string>;
  timestamp: string;
  referrer?: string;
  userAgent?: string;
}

interface AnalyticsData {
  events: AnalyticsEvent[];
}

async function getData(): Promise<AnalyticsData> {
  try {
    const raw = await fs.readFile(ANALYTICS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { events: [] };
  }
}

async function saveData(data: AnalyticsData): Promise<void> {
  await fs.writeFile(ANALYTICS_FILE, JSON.stringify(data, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const event: AnalyticsEvent = await request.json();
    const data = await getData();
    data.events.push(event);

    // Keep only last 10,000 events
    if (data.events.length > 10000) {
      data.events = data.events.slice(-10000);
    }

    await saveData(data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await getData();
    const events = data.events;

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const pageviews = events.filter((e) => e.type === "pageview");
    const weeklyPageviews = pageviews.filter(
      (e) => new Date(e.timestamp) >= weekAgo
    );
    const monthlyPageviews = pageviews.filter(
      (e) => new Date(e.timestamp) >= monthAgo
    );

    // Top pages
    const pageCounts: Record<string, number> = {};
    pageviews.forEach((e) => {
      if (e.page) {
        pageCounts[e.page] = (pageCounts[e.page] || 0) + 1;
      }
    });
    const topPages = Object.entries(pageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([page, views]) => ({ page, views }));

    // Daily views for last 7 days
    const dailyViews: { date: string; views: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().split("T")[0];
      const views = pageviews.filter(
        (e) => e.timestamp.startsWith(dateStr)
      ).length;
      dailyViews.push({ date: dateStr, views });
    }

    // Referrer sources
    const referrerCounts: Record<string, number> = {};
    pageviews.forEach((e) => {
      if (e.referrer) {
        try {
          const host = new URL(e.referrer).hostname || "Direct";
          referrerCounts[host] = (referrerCounts[host] || 0) + 1;
        } catch {
          referrerCounts["Direct"] = (referrerCounts["Direct"] || 0) + 1;
        }
      } else {
        referrerCounts["Direct"] = (referrerCounts["Direct"] || 0) + 1;
      }
    });
    const topReferrers = Object.entries(referrerCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([source, views]) => ({ source, views }));

    // Form submissions
    const formEvents = events.filter(
      (e) => e.type === "event" && e.event === "contact_form_submission"
    );

    return NextResponse.json({
      totalPageviews: pageviews.length,
      weeklyPageviews: weeklyPageviews.length,
      monthlyPageviews: monthlyPageviews.length,
      totalFormSubmissions: formEvents.length,
      topPages,
      dailyViews,
      topReferrers,
    });
  } catch {
    return NextResponse.json({
      totalPageviews: 0,
      weeklyPageviews: 0,
      monthlyPageviews: 0,
      totalFormSubmissions: 0,
      topPages: [],
      dailyViews: [],
      topReferrers: [],
    });
  }
}
