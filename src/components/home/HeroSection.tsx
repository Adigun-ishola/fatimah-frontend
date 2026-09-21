"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Award, Scale } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-primary" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#c9a84c]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 pt-30">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-[#c9a84c] text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <Scale className="w-4 h-4" />
              <span>Law Student & Aspiring Legal Practitioner</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Playfair_Display'] leading-tight mb-6">
              Jimoh-Sulaiman
              <br />
              <span className="text-[#c9a84c]">Fatima Adesewa</span>
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-lg">
              Passionate about justice, legal scholarship, and leadership.
              Building a legacy of excellence in law, one milestone at a time.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="btn-accent group">
                Learn More About Me
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/articles" className="btn-outline border-white text-white hover:bg-white hover:text-[#1a365d]">
                Read My Articles
              </Link>
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 mt-12 pt-8 border-t border-white/20"
            >
              {[
                { icon: BookOpen, label: "Legal Articles", value: "Growing" },
                { icon: Award, label: "Achievements", value: "Building" },
                { icon: Scale, label: "Passion", value: "Justice" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-5 h-5 text-[#c9a84c] mx-auto mb-1" />
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="w-80 h-96 rounded-2xl overflow-hidden border-4 border-[#c9a84c]/30 shadow-2xl bg-white/5 backdrop-blur-sm">
                {/* Replace with actual photo */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a365d]/50 to-[#c9a84c]/20">
                  <div className="text-center">
                    <Scale className="w-16 h-16 text-[#c9a84c] mx-auto mb-4" />
                    <p className="text-white/70 text-sm">Your Photo Here</p>
                  </div>
                </div>
              </div>

              {/* Decorative Frame */}
              <div className="absolute -bottom-4 -right-4 w-80 h-96 rounded-2xl border-2 border-[#c9a84c]/20 -z-10" />
              <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-[#c9a84c] rounded-tl-2xl" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-[#c9a84c] rounded-br-2xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]"
          />
        </div>
      </motion.div>
    </section>
  );
}