import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export function generateSEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = "website",
  canonicalUrl,
  noIndex = false,
}: SEOProps): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.title;

  const fullDescription = description || SITE_CONFIG.description;
  const fullKeywords = [...(keywords || []), ...SITE_CONFIG.keywords];
  const image = ogImage || SITE_CONFIG.ogImage;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords.join(", "),
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: ogType as any,
      title: fullTitle,
      description: fullDescription,
      url: canonicalUrl || SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [image],
    },
    alternates: {
      canonical: canonicalUrl || SITE_CONFIG.url,
    },
  };
}