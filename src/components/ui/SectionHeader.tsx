"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${centered ? "text-center" : ""}`}
    >
      <h2
        className={`text-3xl md:text-4xl font-bold font-['Playfair_Display'] mb-4 ${
          light ? "text-white" : "text-[#1a365d]"
        }`}
      >
        {title}
      </h2>
      <div
        className={`w-20 h-1 rounded-full ${centered ? "mx-auto" : ""} ${
          light ? "bg-[#c9a84c]" : "bg-[#c9a84c]"
        }`}
      />
      {subtitle && (
        <p
          className={`mt-4 text-lg max-w-2xl ${centered ? "mx-auto" : ""} ${
            light ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}