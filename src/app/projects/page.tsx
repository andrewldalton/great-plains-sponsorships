import type { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Great Plains Sponsorships' portfolio of naming rights deals, sponsorship platforms, and event partnerships across the Midwest and beyond.",
  openGraph: {
    title: "Projects | Great Plains Sponsorships",
    description:
      "From $55M sports complexes to youth fields, see how GPS delivers sustainable sponsorship revenue for organizations of all sizes.",
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
