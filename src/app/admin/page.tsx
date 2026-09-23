"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Award,
  Scale,
  PlusCircle,
  ExternalLink,
} from "lucide-react";
import { publicApi, adminApi } from "@/lib/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    articles: 0,
    education: 0,
    achievements: 0,
    journey: 0,
    unreadMessages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [arts, edu, ach, jrn, msg] = await Promise.all([
          publicApi.getArticles(1, 1),
          publicApi.getEducation(),
          publicApi.getAchievements(),
          publicApi.getLegalJourney(),
          adminApi.getMessages(1),
        ]);

        const unreadCount =
          msg.data.data?.filter((m: any) => !m.is_read).length || 0;

        setStats({
          articles: arts.data.total || 0,
          education: edu.data.data?.length || 0,
          achievements: ach.data.data?.length || 0,
          journey: jrn.data.data?.length || 0,
          unreadMessages: unreadCount,
        });
      } catch (err) {
        console.error("Failed to load dashboard metrics", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  const cards = [
    {
      title: "Articles",
      value: stats.articles,
      icon: BookOpen,
      color: "bg-blue-500",
      href: "/admin/articles",
    },
    {
      title: "Education",
      value: stats.education,
      icon: GraduationCap,
      color: "bg-emerald-500",
      href: "/admin/education",
    },
    {
      title: "Legal Journey",
      value: stats.journey,
      icon: Scale,
      color: "bg-indigo-500",
      href: "/admin/legal-journey",
    },
    {
      title: "Achievements",
      value: stats.achievements,
      icon: Award,
      color: "bg-amber-500",
      href: "/admin/achievements",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 sm:p-7 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1a365d] font-['Playfair_Display']">
            Welcome, Fatima Adesewa!
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Manage your legal portfolio, scholarship, and career milestones.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Link
            href="/admin/articles/new"
            className="btn-accent text-xs px-3.5 py-2.5 flex items-center gap-1.5 rounded-xl font-medium"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Write Article</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="btn-outline text-xs px-3.5 py-2.5 flex items-center gap-1.5 rounded-xl font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Site</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              href={card.href}
              className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`p-2 sm:p-2.5 rounded-xl text-white ${card.color}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">
                {isLoading ? "..." : card.value}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Matrix & Messages Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-[#1a365d] font-['Playfair_Display'] text-base sm:text-lg mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/education"
              className="p-3 sm:p-4 rounded-xl border border-gray-100 bg-gray-50/80 hover:bg-gray-100 text-xs sm:text-sm font-medium text-gray-700 flex flex-col gap-2 transition-colors"
            >
              <GraduationCap className="w-5 h-5 text-[#c9a84c]" />
              Add Education
            </Link>
            <Link
              href="/admin/legal-journey"
              className="p-3 sm:p-4 rounded-xl border border-gray-100 bg-gray-50/80 hover:bg-gray-100 text-xs sm:text-sm font-medium text-gray-700 flex flex-col gap-2 transition-colors"
            >
              <Scale className="w-5 h-5 text-[#c9a84c]" />
              Add Journey Milestone
            </Link>
            <Link
              href="/admin/achievements"
              className="p-3 sm:p-4 rounded-xl border border-gray-100 bg-gray-50/80 hover:bg-gray-100 text-xs sm:text-sm font-medium text-gray-700 flex flex-col gap-2 transition-colors"
            >
              <Award className="w-5 h-5 text-[#c9a84c]" />
              Add Achievement
            </Link>
            <Link
              href="/admin/gallery"
              className="p-3 sm:p-4 rounded-xl border border-gray-100 bg-gray-50/80 hover:bg-gray-100 text-xs sm:text-sm font-medium text-gray-700 flex flex-col gap-2 transition-colors"
            >
              <BookOpen className="w-5 h-5 text-[#c9a84c]" />
              Upload Photos
            </Link>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#1a365d] font-['Playfair_Display'] text-base sm:text-lg">
                Messages Inbox
              </h3>
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                {stats.unreadMessages} Unread
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Review inquiries, collaboration opportunities, and messages submitted
              by visitors through your portfolio contact form.
            </p>
          </div>
          <Link
            href="/admin/messages"
            className="btn-primary w-full text-center mt-6 text-xs sm:text-sm py-2.5 sm:py-3 rounded-xl"
          >
            Open Inbox
          </Link>
        </div>
      </div>
    </div>
  );
}