import type { Metadata } from "next";
import CalculatorContent from "./CalculatorContent";

export const metadata: Metadata = {
  title: "Sponsorship Revenue Calculator",
  description:
    "Estimate your facility's naming rights and sponsorship revenue potential. Free interactive tool from Great Plains Sponsorships.",
};

export default function CalculatorPage() {
  return <CalculatorContent />;
}
