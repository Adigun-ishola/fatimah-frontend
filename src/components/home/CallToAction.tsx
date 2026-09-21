"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 gradient-primary" />
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white font-['Playfair_Display'] mb-6">
            Let&apos;s Connect & Collaborate
          </h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Whether you&apos;re interested in legal discourse, collaboration, or
            simply want to reach out, Jimoh-Sulaiman Fatima Adesewa is always
            open to meaningful connections.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-accent group">
              <Mail className="w-4 h-4 mr-2" />
              Get in Touch
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/leadership"
              className="btn-outline border-white text-white hover:bg-white hover:text-[#1a365d]"
            >
              View Achievements
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}