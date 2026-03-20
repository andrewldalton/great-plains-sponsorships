import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get a free consultation with Great Plains Sponsorships. Contact us at (402) 657-8170 or Ryan.Querry@GreatPlainsSponsorships.com. Based in Omaha, NE.",
};

export default function ContactPage() {
  return <ContactContent />;
}
