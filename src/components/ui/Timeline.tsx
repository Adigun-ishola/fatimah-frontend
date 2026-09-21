"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  highlights?: string[];
  icon?: ReactNode;
  badge?: { label: string; color: string };
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#c9a84c] via-[#1a365d] to-[#c9a84c]" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex flex-col md:flex-row ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-start md:items-center`}
          >
            {/* Dot */}
            <div className="absolute left-6 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-[#c9a84c] border-4 border-white shadow-md z-10" />

            {/* Content */}
            <div
              className={`ml-16 md:ml-0 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
              }`}
            >
              <div className="card-elevated p-6">
                {item.badge && (
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${item.badge.color}`}
                  >
                    {item.badge.label}
                  </span>
                )}
                <p className="text-sm text-[#c9a84c] font-medium mb-1">
                  {item.date}
                </p>
                <h3 className="text-xl font-bold text-[#1a365d] font-['Playfair_Display'] mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{item.subtitle}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
                {item.highlights && item.highlights.length > 0 && (
                  <ul className={`mt-3 space-y-1 ${index % 2 === 0 ? "md:ml-auto" : ""}`}>
                    {item.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-500 flex items-start gap-2"
                      >
                        <span className="text-[#c9a84c] mt-1">•</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}