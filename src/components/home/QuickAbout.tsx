"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Gavel } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function QuickAbout() {
  const highlights = [
    {
      icon: Gavel,
      title: "Legal Passion",
      description:
        "Dedicated to understanding and advancing the principles of law and justice.",
    },
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description:
        "Committed to rigorous legal scholarship and continuous intellectual growth.",
    },
    {
      icon: Users,
      title: "Leadership",
      description:
        "Active in community service and leadership roles within and beyond campus.",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          title="About Jimoh-Sulaiman Fatima Adesewa"
          subtitle="A law student driven by a deep passion for justice, legal scholarship, and making meaningful impact."
        />

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center p-8 rounded-xl hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-7 h-7 text-[#c9a84c]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a365d] font-['Playfair_Display'] mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/about" className="btn-outline group">
            Read Full Bio
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}