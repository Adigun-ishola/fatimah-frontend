import HeroSection from "@/components/home/HeroSection";
import QuickAbout from "@/components/home/QuickAbout";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickAbout />
      <FeaturedArticles />
      <CallToAction />
    </>
  );
}