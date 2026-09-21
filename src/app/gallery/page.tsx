import { Metadata } from "next";
import { generateSEO } from "@/components/seo/SEOHead";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = generateSEO({
  title: "Gallery",
  description:
    "Photo gallery of Jimoh-Sulaiman Fatima Adesewa — events, academic moments, legal activities, and memorable experiences.",
  keywords: ["gallery", "photos", "events", "law school photos"],
});

export default function GalleryPage() {
  return <GalleryContent />;
}