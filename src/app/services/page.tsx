import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Great Plains Sponsorships offers full-service naming rights, corporate sponsorship development, pouring rights, owner's representation, and premium seating solutions for municipalities, non-profits, and venues across the Midwest.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
