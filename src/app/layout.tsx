import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTracker from "@/components/PageTracker";
import { LocalBusinessSchema } from "@/components/SchemaMarkup";
import ChatBot from "@/components/ChatBot";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://greatplainssponsorships.com"),
  title: {
    default: "Great Plains Sponsorships | Naming Rights & Corporate Partnerships",
    template: "%s | Great Plains Sponsorships",
  },
  description:
    "Midwest-based sponsorship experts creating profitable, sustainable naming rights and corporate partnerships for sports complexes, municipalities, nonprofits, and entertainment venues.",
  keywords: [
    "naming rights",
    "sponsorship",
    "corporate partnerships",
    "sports complex sponsorship",
    "midwest sponsorship",
    "pouring rights",
    "venue sponsorship",
    "municipal sponsorship",
    "Great Plains Sponsorships",
    "Omaha sponsorship",
    "sports venue naming rights",
    "event sponsorship",
  ],
  openGraph: {
    title: "Great Plains Sponsorships | Naming Rights & Corporate Partnerships",
    description:
      "Midwest-based sponsorship experts creating profitable naming rights and corporate partnerships.",
    url: "https://greatplainssponsorships.com",
    siteName: "Great Plains Sponsorships",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Great Plains Sponsorships - Naming Rights & Corporate Partnerships",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Great Plains Sponsorships",
    description:
      "Midwest-based sponsorship experts creating profitable naming rights and corporate partnerships.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LocalBusinessSchema />
        <PageTracker />
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
