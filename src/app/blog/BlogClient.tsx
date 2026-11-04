"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  FileText,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { CuratedProperty } from "@/types/property";
import { BlogPost } from "@/data/blogPosts";
import SanctuaryShell from "@/components/SanctuaryShell";

const CATEGORIES = [
  "All Articles",
  "Legal & Title",
  "Inspection & Verification",
  "Corridor Guides",
  "Quality Standards",
  "Buying Safety",
] as const;

interface BlogClientProps {
  initialPosts: BlogPost[];
  initialProperties: CuratedProperty[];
}

export default function BlogClient({
  initialPosts,
  initialProperties,
}: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All Articles");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All Articles" ||
        post.category === activeCategory ||
        (activeCategory === "Legal & Title" && post.category.includes("Statutory")) ||
        (activeCategory === "Inspection & Verification" && post.category.includes("Due Diligence")) ||
        (activeCategory === "Corridor Guides" && post.category.includes("Corridor")) ||
        (activeCategory === "Quality Standards" && post.category.includes("Underwriting")) ||
        (activeCategory === "Buying Safety" && post.category.includes("Risk"));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.keywords?.some((k) => k.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, activeCategory, searchQuery]);

  return (
    <SanctuaryShell properties={initialProperties}>
      {() => (
        <div className="w-full pb-20 pt-20">
          {/* Header Bar */}
          <section className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-4 pb-2 border-b border-[#D4AF37]/15">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#0B101B]/80 px-3 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span>Real Estate Guides & Insights</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F8F9FA]">
                  Articles & <span className="italic font-normal text-[#D4AF37]">Buying Guides</span>.
                </h1>
                <p className="mt-1 max-w-xl font-sans text-xs sm:text-sm text-[#A6B0BF]">
                  Land title verifications, tax regulations, and corridor price trends across Bhubaneswar.
                </p>
              </div>

              {/* Live Search Box */}
              <div className="relative w-full md:w-72 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#D4AF37]/70" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, RERA, Bhulekh..."
                  className="w-full rounded-full border border-[#D4AF37]/25 bg-[#0B101B]/95 pl-9 pr-4 py-2 font-sans text-xs text-[#F8F9FA] placeholder:text-[#A6B0BF]/60 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#A6B0BF] hover:text-[#F8F9FA]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-3 sm:px-3.5 py-1 font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                      isActive
                        ? "bg-[#D4AF37] text-[#05070B] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                        : "border border-[#D4AF37]/20 bg-[#0B101B]/80 text-[#A6B0BF] hover:border-[#D4AF37]/50 hover:text-[#F8F9FA]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Posts Feed Section */}
          <section className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 mt-4">
            {filteredPosts.length === 0 ? (
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B101B]/50 p-12 text-center">
                <FileText className="mx-auto h-12 w-12 text-[#D4AF37]/40 mb-3" />
                <h3 className="font-serif text-2xl text-[#F8F9FA]">No Articles Found</h3>
                <p className="mt-2 text-sm text-[#A6B0BF]">
                  Try adjusting your search query or reset the category filter to view all articles.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All Articles");
                    setSearchQuery("");
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37] bg-[#D4AF37]/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#05070B] transition"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B]/80 p-5 shadow-lg transition-all duration-300 hover:border-[#D4AF37]/60 hover:bg-[#0B101B]"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-44 w-full overflow-hidden rounded-xl bg-[#05070B] mb-4">
                        <img
                          src={post.featuredImage}
                          alt={post.featuredImageAlt || post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-2.5 left-2.5 rounded-full border border-[#D4AF37]/40 bg-[#05070B]/80 px-2.5 py-0.5 text-[10px] font-mono text-[#D4AF37] backdrop-blur-md">
                          {post.category}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] font-mono text-[#A6B0BF] mb-1.5">
                        <Clock className="h-3 w-3 text-[#D4AF37]" />
                        <span>{post.readingTime}</span>
                        <span>•</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                      </div>

                      <h2 className="font-serif text-lg font-medium text-[#F8F9FA] group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="mt-2 text-xs text-[#CBD5E1] line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                      <span>Read Full Guide</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </SanctuaryShell>
  );
}
