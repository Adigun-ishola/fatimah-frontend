import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import ArticleDetail from "./ArticleDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Article | ${SITE_CONFIG.name}`,
    description: `Read this legal article by Jimoh-Sulaiman Fatima Adesewa.`,
    openGraph: {
      type: "article",
      authors: [SITE_CONFIG.name],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const resolvedParams = await params;
  return <ArticleDetail slug={resolvedParams.slug} />;
}