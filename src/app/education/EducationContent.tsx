"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, ExternalLink } from "lucide-react";
import { publicApi } from "@/lib/api";
import { Education } from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function EducationContent() {
  const [education, setEducation] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await publicApi.getEducation();
        setEducation(response.data.data || []);
      } catch (error) {
        console.log("No education data yet");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEducation();
  }, []);

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
              <span className="text-[#c9a84c]">Education</span>
            </h1>
            <p className="text-gray-300 text-lg">
              The academic journey and educational foundations of Jimoh-Sulaiman
              Fatima Adesewa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {isLoading ? (
            <LoadingSpinner />
          ) : education.length > 0 ? (
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-elevated p-8 relative overflow-hidden"
                >
                  {/* Accent Bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#c9a84c] to-[#1a365d]" />

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-[#c9a84c]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-[#1a365d] font-['Playfair_Display']">
                          {edu.degree} — {edu.field_of_study}
                        </h3>
                        {edu.is_current && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-[#c9a84c] font-medium mb-1">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                        <Calendar className="w-3 h-3" />
                        {edu.start_year} —{" "}
                        {edu.is_current ? "Present" : edu.end_year}
                      </p>

                      {edu.description && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {edu.description}
                        </p>
                      )}

                      {edu.achievements && edu.achievements.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-[#1a365d] mb-2 flex items-center gap-1">
                            <Award className="w-4 h-4 text-[#c9a84c]" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-1">
                            {edu.achievements.map((ach, i) => (
                              <li
                                key={i}
                                className="text-sm text-gray-600 flex items-start gap-2"
                              >
                                <span className="text-[#c9a84c] mt-0.5">✦</span>
                                {ach}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {edu.certificate_url && (
                        <a
                          href={edu.certificate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-4 text-sm text-[#c9a84c] hover:text-[#1a365d] transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View Certificate
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1a365d] font-['Playfair_Display'] mb-2">
                Education Details Coming Soon
              </h3>
              <p className="text-gray-500">
                Jimoh-Sulaiman Fatima Adesewa&apos;s educational background will
                be updated here.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}