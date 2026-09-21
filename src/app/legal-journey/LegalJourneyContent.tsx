"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Scale, Filter } from "lucide-react";
import { publicApi } from "@/lib/api";
import { LegalJourneyEntry } from "@/types";
import { JOURNEY_CATEGORIES } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import Timeline from "@/components/ui/Timeline";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function LegalJourneyContent() {
  const [entries, setEntries] = useState<LegalJourneyEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await publicApi.getLegalJourney();
        setEntries(response.data.data || []);
      } catch (error) {
        console.log("No legal journey entries yet");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntries();
  }, []);

  const filteredEntries =
    activeFilter === "all"
      ? entries
      : entries.filter((e) => e.category === activeFilter);

  const timelineItems = filteredEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    subtitle: `${entry.role} at ${entry.organization}`,
    date: `${new Date(entry.start_date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })} — ${
      entry.is_current
        ? "Present"
        : entry.end_date
        ? new Date(entry.end_date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        : "Present"
    }`,
    description: entry.description,
    highlights: entry.highlights,
    badge: JOURNEY_CATEGORIES[entry.category as keyof typeof JOURNEY_CATEGORIES],
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 gradient-primary">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white font-['Playfair_Display'] mb-4">
              My <span className="text-[#c9a84c]">Legal Journey</span>
            </h1>
            <p className="text-gray-300 text-lg">
              The path Jimoh-Sulaiman Fatima Adesewa is forging in the world of law
              — every experience, every milestone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom max-w-5xl">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-12 justify-center">
            <Filter className="w-4 h-4 text-gray-400" />
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === "all"
                  ? "bg-[#1a365d] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {Object.entries(JOURNEY_CATEGORIES).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === key
                    ? "bg-[#1a365d] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {val.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : timelineItems.length > 0 ? (
            <Timeline items={timelineItems} />
          ) : (
            <div className="text-center py-16">
              <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1a365d] font-['Playfair_Display'] mb-2">
                Legal Journey Updates Coming Soon
              </h3>
              <p className="text-gray-500">
                Jimoh-Sulaiman Fatima Adesewa&apos;s legal experiences and
                milestones will be documented here.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}