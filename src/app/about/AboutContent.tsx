"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Scale,
  BookOpen,
  Heart,
  Target,
  ArrowRight,
  Quote,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function AboutContent() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 gradient-primary">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white font-['Playfair_Display'] mb-4">
              About <span className="text-[#c9a84c]">Me</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Get to know Jimoh-Sulaiman Fatima Adesewa — the person behind the
              passion for law and justice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Photo Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="sticky top-28">
                <div className="relative">
                  <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 border-4 border-[#c9a84c]/20">
                    {/* Replace with actual photo */}
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a365d]/10 to-[#c9a84c]/10">
                      <Scale className="w-16 h-16 text-[#1a365d]/30" />
                    </div>
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-[#c9a84c]/10 -z-10" />
                </div>

                {/* Quote */}
                <div className="mt-8 p-6 bg-[#f7f5f0] rounded-xl">
                  <Quote className="w-8 h-8 text-[#c9a84c] mb-3" />
                  <p className="text-gray-700 italic font-['Lora'] leading-relaxed">
                    &quot;Justice is the constant and perpetual will to allot to
                    every person their due right.&quot;
                  </p>
                  <p className="text-sm text-gray-500 mt-2">— Justinian I</p>
                </div>
              </div>
            </motion.div>

            {/* Text Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="prose-legal">
                <h2>Who is Jimoh-Sulaiman Fatima Adesewa?</h2>
                <p>
                  Jimoh-Sulaiman Fatima Adesewa is a passionate and dedicated law
                  student with a deep commitment to justice, legal scholarship,
                  and leadership. With a firm belief that the law is a powerful
                  tool for social change, Fatima Adesewa is on a journey to become
                  an exceptional legal practitioner who will make meaningful
                  contributions to the Nigerian legal landscape and beyond.
                </p>

                <p>
                  From early academic achievements to active involvement in
                  various legal and leadership activities, Jimoh-Sulaiman Fatima
                  Adesewa has consistently demonstrated a drive for excellence
                  and a heart for service. This website serves as a living
                  portfolio documenting the milestones, achievements, and
                  intellectual contributions of this journey.
                </p>

                <h3>My Vision</h3>
                <p>
                  To leverage the power of law as an instrument for justice,
                  equity, and societal transformation. Jimoh-Sulaiman Fatima
                  Adesewa envisions a career marked by impactful legal practice,
                  thought leadership, and unwavering commitment to the rule of
                  law.
                </p>

                <h3>Core Values</h3>
              </div>

              {/* Values Grid */}
              <div className="grid sm:grid-cols-2 gap-6 mt-8 mb-8">
                {[
                  {
                    icon: Scale,
                    title: "Justice",
                    text: "Committed to fairness and the rule of law in all endeavors.",
                  },
                  {
                    icon: BookOpen,
                    title: "Scholarship",
                    text: "Pursuing knowledge with rigor and intellectual curiosity.",
                  },
                  {
                    icon: Heart,
                    title: "Service",
                    text: "Using skills and knowledge to serve communities and society.",
                  },
                  {
                    icon: Target,
                    title: "Excellence",
                    text: "Striving for the highest standards in every undertaking.",
                  },
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <value.icon className="w-8 h-8 text-[#c9a84c] mb-3" />
                    <h4 className="text-lg font-bold text-[#1a365d] font-['Playfair_Display'] mb-1">
                      {value.title}
                    </h4>
                    <p className="text-sm text-gray-600">{value.text}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <Link href="/legal-journey" className="btn-primary group">
                  My Legal Journey
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="btn-outline">
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}