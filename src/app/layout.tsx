import type { Metadata } from "next";
import { generateSEO } from "@/components/seo/SEOHead";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { SITE_CONFIG } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  ...generateSEO({}),
  metadataBase: new URL(SITE_CONFIG.url),
};

// JSON-LD Structured Data for Google SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jimoh-Sulaiman Fatima Adesewa",
  alternateName: ["Fatima Adesewa", "Jimoh-Sulaiman Fatima", "Adesewa Jimoh-Sulaiman"],
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  jobTitle: "Law Student",
  knowsAbout: ["Law", "Legal Scholarship", "Justice", "Moot Court", "Legal Writing"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="custom-scrollbar">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#fefdfb]">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}