import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Great Plains Sponsorships privacy policy. Learn how we collect, use, and protect your personal information in accordance with Nebraska law.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
