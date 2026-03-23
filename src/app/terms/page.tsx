import type { Metadata } from "next";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for Great Plains Sponsorships, Inc. Governing law is the State of Nebraska. Review our terms before using our website or engaging our services.",
};

export default function TermsPage() {
  return <TermsContent />;
}
