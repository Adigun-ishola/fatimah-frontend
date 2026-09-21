import { Metadata } from "next";
import { generateSEO } from "@/components/seo/SEOHead";
import ArticlesContent from "./ArticlesContent";

export const metadata: Metadata = generateSEO({
  title: "Legal Articles",
  description:
    "Read legal articles and scholarly writings by Jimoh-Sulaiman Fatima Adesewa on various areas of law, justice, and legal reform.",
  keywords: ["legal articles", "law blog", "legal writing", "scholarly articles"],
});

export default function ArticlesPage() {
  return <ArticlesContent />;
}