import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Great Plains Sponsorships. Led by founder Ryan Querry with 20+ years of experience and $300M+ in career transactions, GPS delivers Midwestern work-ethic with big-city results.",
};

export default function AboutPage() {
  return <AboutContent />;
}
