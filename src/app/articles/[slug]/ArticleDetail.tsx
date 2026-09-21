"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { publicApi } from "@/lib/api";
import { Article } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ArticleDetail({ slug }: { slug: string }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await publicApi.getArticleBySlug(slug);
        setArticle(response.data.data);
      } catch (error) {
        console.error("Article not found");
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="pt-32">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-32 text-center py-20">
        <h2 className="text-2xl font-bold text-[#1a365d]">Article Not Found</h2>
        <Link href="/articles" className="btn-primary mt-6 inline-block">
          Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 gradient-primary">
        <div className="container-custom relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/articles"
              className="inline-flex items-center gap-1 text-gray-300 hover:text-[#c9a84c] text-sm mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </Link>

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 text-[#c9a84c] text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-['Playfair_Display'] leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-gray-300">
              <span className="font-medium text-[#c9a84c]">
                By Jimoh-Sulaiman Fatima Adesewa
              </span>
              {article.published_at && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.published_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.read_time_minutes} min read
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <div className="grid lg:grid-cols-[1fr_200px] gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {article.cover_image_url && (
                <img
                  src={article.cover_image_url}
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
                />
              )}

              <div className="prose-legal">
                <ReactMarkdown>{article.content}</ReactMarkdown>
              </div>

              {/* Author Box */}
              <div className="mt-12 p-6 bg-[#f7f5f0] rounded-xl flex items-start gap-4">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-[#c9a84c] text-xl font-bold">FA</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#1a365d] font-['Playfair_Display']">
                    Jimoh-Sulaiman Fatima Adesewa
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Law student and aspiring legal practitioner passionate about
                    justice, legal scholarship, and leadership.
                  </p>
                  <Link
                    href="/about"
                    className="text-sm text-[#c9a84c] font-medium mt-2 inline-block"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Share Article
                </h4>
                <div className="flex flex-col gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
                    <FaTwitter className="w-4 h-4" />
                    Twitter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
                    <FaLinkedinIn className="w-4 h-4" />
                    LinkedIn
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
                    <Share2 className="w-4 h-4" />
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
