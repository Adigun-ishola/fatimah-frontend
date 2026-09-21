"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import { publicApi } from "@/lib/api";
import { Article } from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function FeaturedArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await publicApi.getArticles(1, 3);
        setArticles(response.data.data || []);
      } catch (error) {
        console.log("No articles yet");
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <section className="section-padding bg-[#f7f5f0]">
      <div className="container-custom">
        <SectionHeader
          title="Legal Articles & Writings"
          subtitle="Exploring legal concepts, sharing insights, and contributing to legal scholarship."
        />

        {isLoading ? (
          <LoadingSpinner />
        ) : articles.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {articles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="card-elevated overflow-hidden group"
                >
                  {/* Cover Image */}
                  <div className="h-48 bg-gradient-to-br from-[#1a365d] to-[#2a4a7f] overflow-hidden">
                    {article.cover_image_url ? (
                      <img
                        src={article.cover_image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-[#c9a84c]/50" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      {article.published_at && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(article.published_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.read_time_minutes} min read
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1a365d] font-['Playfair_Display'] mb-2 line-clamp-2 group-hover:text-[#c9a84c] transition-colors">
                      <Link href={`/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>

                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/articles/${article.slug}`}
                      className="inline-flex items-center text-sm text-[#c9a84c] font-medium hover:text-[#1a365d] transition-colors group/link"
                    >
                      Read Full Article
                      <ArrowRight className="w-3 h-3 ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="text-center">
              <Link href="/articles" className="btn-primary group">
                View All Articles
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#1a365d] font-['Playfair_Display'] mb-2">
              Articles Coming Soon
            </h3>
            <p className="text-gray-500">
              Jimoh-Sulaiman Fatima Adesewa is currently working on insightful
              legal articles. Stay tuned!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}