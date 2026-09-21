import { Metadata } from "next";
import { generateSEO } from "@/components/seo/SEOHead";
import LeadershipContent from "./LeadershipContent";

export const metadata: Metadata = generateSEO({
  title: "Leadership & Achievements",
  description:
    "Explore the leadership positions, awards, certificates, and achievements of Jimoh-Sulaiman Fatima Adesewa in law and community service.",
  keywords: ["leadership", "achievements", "awards", "certificates"],
});

export default function LeadershipPage() {
  return <LeadershipContent />;
}