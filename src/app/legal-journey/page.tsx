import { Metadata } from "next";
import { generateSEO } from "@/components/seo/SEOHead";
import LegalJourneyContent from "./LegalJourneyContent";

export const metadata: Metadata = generateSEO({
  title: "My Legal Journey",
  description:
    "Follow the legal journey of Jimoh-Sulaiman Fatima Adesewa — from moot courts and legal clinics to internships and professional experiences in law.",
  keywords: ["legal journey", "moot court", "legal experience", "law career"],
});

export default function LegalJourneyPage() {
  return <LegalJourneyContent />;
}