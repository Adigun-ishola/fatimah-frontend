import { Metadata } from "next";
import { generateSEO } from "@/components/seo/SEOHead";
import EducationContent from "./EducationContent";

export const metadata: Metadata = generateSEO({
  title: "Education",
  description:
    "Academic background and educational journey of Jimoh-Sulaiman Fatima Adesewa, including degrees, certifications, and academic achievements.",
  keywords: ["education", "academic background", "law degree", "certifications"],
});

export default function EducationPage() {
  return <EducationContent />;
}