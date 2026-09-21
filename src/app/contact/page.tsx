import { Metadata } from "next";
import { generateSEO } from "@/components/seo/SEOHead";
import ContactContent from "./ContactContent";

export const metadata: Metadata = generateSEO({
  title: "Contact",
  description:
    "Get in touch with Jimoh-Sulaiman Fatima Adesewa for legal discussions, collaborations, speaking engagements, or general inquiries.",
  keywords: ["contact", "get in touch", "reach out", "email"],
});

export default function ContactPage() {
  return <ContactContent />;
}