export const SITE_CONFIG = {
  name: "Jimoh-Sulaiman Fatima Adesewa",
  shortName: "Fatima Adesewa",
  title: "Jimoh-Sulaiman Fatima Adesewa | Law Student, Legal Scholar & Future Legal Practitioner",
  description:
    "Official website of Jimoh-Sulaiman Fatima Adesewa — a passionate law student, aspiring legal practitioner, and dedicated leader committed to justice, legal scholarship, and community impact.",
  url: "https://fatimaadesewa.com", // Update with your actual domain
  ogImage: "/og-image.jpg",
  keywords: [
    "Jimoh-Sulaiman Fatima Adesewa",
    "Fatima Adesewa",
    "law student",
    "legal scholar",
    "Nigerian law student",
    "legal articles",
    "moot court",
    "legal practitioner",
    "Jimoh Sulaiman Fatima",
    "Adesewa lawyer",
  ],
};

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Me", href: "/about" },
  { name: "Education", href: "/education" },
  { name: "My Legal Journey", href: "/legal-journey" },
  { name: "Leadership & Achievements", href: "/leadership" },
  { name: "Legal Articles", href: "/articles" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const ACHIEVEMENT_CATEGORIES = {
  leadership: { label: "Leadership", color: "bg-blue-100 text-blue-800" },
  academic: { label: "Academic", color: "bg-green-100 text-green-800" },
  award: { label: "Award", color: "bg-yellow-100 text-yellow-800" },
  certificate: { label: "Certificate", color: "bg-purple-100 text-purple-800" },
  community: { label: "Community Service", color: "bg-pink-100 text-pink-800" },
};

export const JOURNEY_CATEGORIES = {
  moot_court: { label: "Moot Court", color: "bg-indigo-100 text-indigo-800" },
  internship: { label: "Internship", color: "bg-teal-100 text-teal-800" },
  clinic: { label: "Legal Clinic", color: "bg-orange-100 text-orange-800" },
  competition: { label: "Competition", color: "bg-red-100 text-red-800" },
  volunteer: { label: "Volunteer", color: "bg-emerald-100 text-emerald-800" },
  other: { label: "Other", color: "bg-gray-100 text-gray-800" },
};