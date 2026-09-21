"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { publicApi } from "@/lib/api";
import { Article } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ArticlesContent() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await publicApi.getArticles(page, 9);
        setArticles(response.data.data || []);
        setTotalPages(response.data.total_pages || 1);
      } catch (error) {
        console.log("No articles yet");
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, [page]);

  const filteredArticles = searchQuery
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : articles;

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
              Legal <span className="text-[#c9a84c]">Articles</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Legal insights, scholarly analyses, and thought-provoking writings
              by Jimoh-Sulaiman Fatima Adesewa.
            </p>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {isLoading ? (
            <LoadingSpinner />
          ) : filteredArticles.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card-elevated overflow-hidden group"
                  >
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
                            {new Date(article.published_at).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric", year: "numeric" }
                            )}
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
                        className="inline-flex items-center text-sm text-[#c9a84c] font-medium hover:text-[#1a365d] group/link"
                      >
                        Read More
                        <ArrowRight className="w-3 h-3 ml-1 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                          page === p
                            ? "bg-[#1a365d] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1a365d] font-['Playfair_Display'] mb-2">
                Articles Coming Soon
              </h3>
              <p className="text-gray-500">
                Jimoh-Sulaiman Fatima Adesewa is working on insightful legal
                articles. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}