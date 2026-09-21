import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import ArticleDetail from "./ArticleDetail";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // In production, fetch article data here for dynamic SEO
  return {
    title: `Article | ${SITE_CONFIG.name}`,
    description: `Read this legal article by Jimoh-Sulaiman Fatima Adesewa.`,
    openGraph: {
      type: "article",
      authors: [SITE_CONFIG.name],
    },
  };
}

export default function ArticlePage({ params }: Props) {
  return <ArticleDetail slug={params.slug} />;
}