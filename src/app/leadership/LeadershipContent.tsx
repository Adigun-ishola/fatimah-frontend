"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Trophy, Medal, Star, Filter, ExternalLink } from "lucide-react";
import { publicApi } from "@/lib/api";
import { Achievement } from "@/types";
import { ACHIEVEMENT_CATEGORIES } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function LeadershipContent() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await publicApi.getAchievements();
        setAchievements(response.data.data || []);
      } catch (error) {
        console.log("No achievements yet");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const filtered =
    activeFilter === "all"
      ? achievements
      : achievements.filter((a) => a.category === activeFilter);

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
              Leadership & <span className="text-[#c9a84c]">Achievements</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Recognitions, leadership roles, and milestones in the journey of
              Jimoh-Sulaiman Fatima Adesewa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
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
            {Object.entries(ACHIEVEMENT_CATEGORIES).map(([key, val]) => (
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
          ) : filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((achievement, index) => (
                <Card key={achievement.id} delay={index * 0.1}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-5 h-5 text-[#c9a84c]" />
                    </div>
                    <div className="flex-1">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${
                          ACHIEVEMENT_CATEGORIES[
                            achievement.category as keyof typeof ACHIEVEMENT_CATEGORIES
                          ]?.color || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {ACHIEVEMENT_CATEGORIES[
                          achievement.category as keyof typeof ACHIEVEMENT_CATEGORIES
                        ]?.label || achievement.category}
                      </span>
                      <h3 className="text-lg font-bold text-[#1a365d] font-['Playfair_Display'] mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-[#c9a84c] font-medium mb-1">
                        {achievement.organization}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        {new Date(achievement.date_received).toLocaleDateString(
                          "en-US",
                          { month: "long", year: "numeric" }
                        )}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {achievement.description}
                      </p>
                      {achievement.certificate_url && (
                        <a
                          href={achievement.certificate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-3 text-sm text-[#c9a84c] hover:text-[#1a365d]"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View Certificate
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1a365d] font-['Playfair_Display'] mb-2">
                Achievements Coming Soon
              </h3>
              <p className="text-gray-500">
                Jimoh-Sulaiman Fatima Adesewa&apos;s achievements and leadership
                positions will be showcased here.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}