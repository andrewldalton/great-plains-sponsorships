import type { Metadata } from "next";
import WhoWeServeContent from "./WhoWeServeContent";

export const metadata: Metadata = {
  title: "Who We Serve",
  description:
    "Great Plains Sponsorships serves municipalities, sports complexes, teams, entertainment venues, nonprofits, stadiums, and more across the Midwest. Discover how GPS can partner with your organization.",
};

export default function WhoWeServePage() {
  return <WhoWeServeContent />;
}
