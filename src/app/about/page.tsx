import { Metadata } from "next";
import { generateSEO } from "@/components/seo/SEOHead";
import AboutContent from "./AboutContent";

export const metadata: Metadata = generateSEO({
  title: "About Me",
  description:
    "Learn more about Jimoh-Sulaiman Fatima Adesewa — a dedicated law student, aspiring legal practitioner, and passionate advocate for justice and legal scholarship.",
  keywords: [
    "about Fatima Adesewa",
    "Jimoh-Sulaiman biography",
    "Nigerian law student",
  ],
});

export default function AboutPage() {
  return <AboutContent />;
}