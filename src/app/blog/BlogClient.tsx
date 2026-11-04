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
  "All Intelligence",
  "Statutory & Legal",
  "Forensic Due Diligence",
  "Corridor Intelligence",
  "Underwriting Standards",
  "Risk Elimination",
] as const;

interface BlogClientProps {
  initialPosts: BlogPost[];
  initialProperties: CuratedProperty[];
}

export default function BlogClient({
  initialPosts,
  initialProperties,
}: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All Intelligence");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All Intelligence" || post.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.keywords.some((k) => k.toLowerCase().includes(q)) ||
        post.author.name.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, activeCategory, searchQuery]);

  // Designate the first post as the primary featured pillar
  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <SanctuaryShell properties={initialProperties}>
      {({ onRequestDossier }) => (
        <div className="w-full pt-24 sm:pt-28 pb-24">
          {/* Streamlined Editorial Header & Search Control Strip */}
          <section className="relative z-20 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D4AF37]/15 pb-5">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#0B101B]/80 px-3 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span>Market Intelligence & Legal Guides</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F8F9FA]">
                  The Underwriting <span className="italic font-normal text-[#D4AF37]">Journal</span>.
                </h1>
                <p className="mt-1 max-w-xl font-sans text-xs sm:text-sm text-[#A6B0BF]">
                  Forensic title verifications, statutory tax frameworks, and corridor capital intelligence.
                </p>
              </div>

              {/* Live Search Box */}
              <div className="relative w-full md:w-72 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#D4AF37]/70" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, ORERA, Bhulekh..."
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

          {/* Posts Feed Section — Immediately visible right at the top */}
          <section className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 mt-4">
            {filteredPosts.length === 0 ? (
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B101B]/50 p-12 text-center">
                <FileText className="mx-auto h-12 w-12 text-[#D4AF37]/40 mb-3" />
                <h3 className="font-serif text-2xl text-[#F8F9FA]">No Intelligence Matches Found</h3>
                <p className="mt-2 text-sm text-[#A6B0BF]">
                  Try adjusting your search query or reset the category filter to view all articles.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All Intelligence");
                    setSearchQuery("");
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37] bg-[#D4AF37]/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#05070B] transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                {/* Hero Featured Pillar Article */}
                {featuredPost && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group relative overflow-hidden rounded-3xl border border-[#D4AF37]/35 bg-gradient-to-br from-[#0B101B] via-[#05070B] to-[#0B101B] shadow-[0_0_40px_rgba(212,175,55,0.08)] hover:border-[#D4AF37] transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8 lg:p-10">
                      {/* Left Content Column */}
                      <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-3 py-1 font-sans text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                              <Sparkles className="h-3 w-3" />
                              Lead Story
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-sans text-xs font-medium text-[#CBD5E1]">
                              {featuredPost.category}
                            </span>
                            <span className="inline-flex items-center gap-1 font-mono text-xs text-[#A6B0BF]">
                              <Clock className="h-3 w-3 text-[#D4AF37]" />
                              {featuredPost.readingTime}
                            </span>
                          </div>

                          <Link href={`/blog/${featuredPost.slug}`}>
                            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#F8F9FA] group-hover:text-[#D4AF37] transition-colors leading-tight">
                              {featuredPost.title}
                            </h2>
                          </Link>

                          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#CBD5E1]">
                            {featuredPost.excerpt}
                          </p>
                        </div>

                        {/* Key Takeaways Box (GEO/AEO Highlight) */}
                        <div className="rounded-xl border border-[#D4AF37]/20 bg-[#05070B]/70 p-4 space-y-2">
                          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" />
                            Executive Takeaway Highlights
                          </span>
                          <ul className="space-y-1.5">
                            {featuredPost.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                              <li key={i} className="text-xs sm:text-sm text-[#A6B0BF] flex items-start gap-2">
                                <span className="text-[#D4AF37] mt-0.5">•</span>
                                <span>{takeaway}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Author Meta & Action */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#D4AF37]/15">
                          <div className="flex items-center gap-3">
                            <img
                              src={featuredPost.author.avatar}
                              alt={featuredPost.author.name}
                              className="h-10 w-10 rounded-full border border-[#D4AF37]/40 object-cover"
                            />
                            <div>
                              <div className="font-serif text-sm font-medium text-[#F8F9FA]">
                                {featuredPost.author.name}
                              </div>
                              <div className="font-sans text-[11px] text-[#A6B0BF]">
                                {featuredPost.author.role}
                              </div>
                            </div>
                          </div>

                          <Link
                            href={`/blog/${featuredPost.slug}`}
                            className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#05070B] shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:bg-[#e5c349] transition active:scale-95"
                          >
                            <span>Read Full Analysis</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>

                      {/* Right Visual Image Column */}
                      <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[340px] rounded-2xl overflow-hidden border border-[#D4AF37]/20">
                        <img
                          src={featuredPost.featuredImage}
                          alt={featuredPost.featuredImageAlt}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/30 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#D4AF37] bg-[#05070B]/80 px-2.5 py-1 rounded backdrop-blur-md">
                            {featuredPost.corridor}
                          </span>
                          <span className="font-mono text-[11px] text-[#CBD5E1] bg-[#05070B]/80 px-2.5 py-1 rounded backdrop-blur-md">
                            Updated {new Date(featuredPost.updatedAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Grid of Remaining Articles */}
                {gridPosts.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-wide text-[#F8F9FA]">
                        Specialist Underwriting & Corridor Audits
                      </h3>
                      <span className="font-mono text-xs text-[#D4AF37]">
                        {gridPosts.length} Dossiers
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
                      {gridPosts.map((post, index) => (
                        <motion.article
                          key={post.slug}
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.08 }}
                          className="group flex flex-col justify-between rounded-2xl border border-[#D4AF37]/20 bg-[#0B101B]/80 p-6 sm:p-7 backdrop-blur-lg hover:border-[#D4AF37]/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.12)] transition-all duration-300"
                        >
                          <div className="space-y-4">
                            {/* Card Image */}
                            <div className="relative h-48 w-full overflow-hidden rounded-xl border border-[#D4AF37]/15">
                              <img
                                src={post.featuredImage}
                                alt={post.featuredImageAlt}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-transparent opacity-80" />
                              <div className="absolute top-3 left-3">
                                <span className="rounded-full border border-[#D4AF37]/40 bg-[#05070B]/85 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] backdrop-blur-md">
                                  {post.category}
                                </span>
                              </div>
                              <div className="absolute bottom-3 right-3">
                                <span className="flex items-center gap-1 rounded bg-[#05070B]/85 px-2 py-0.5 font-mono text-[10px] text-[#CBD5E1] backdrop-blur-md">
                                  <Clock className="h-2.5 w-2.5 text-[#D4AF37]" />
                                  {post.readingTime}
                                </span>
                              </div>
                            </div>

                            {/* Meta & Title */}
                            <div>
                              <Link href={`/blog/${post.slug}`}>
                                <h4 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[#F8F9FA] group-hover:text-[#D4AF37] transition-colors leading-snug">
                                  {post.title}
                                </h4>
                              </Link>
                              <p className="mt-2.5 font-sans text-xs sm:text-sm text-[#A6B0BF] line-clamp-3 leading-relaxed">
                                {post.excerpt}
                              </p>
                            </div>
                          </div>

                          {/* Footer Info */}
                          <div className="mt-6 pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="h-7 w-7 rounded-full border border-[#D4AF37]/40 object-cover"
                              />
                              <span className="font-sans text-xs text-[#CBD5E1] font-medium">
                                {post.author.name}
                              </span>
                            </div>

                            <Link
                              href={`/blog/${post.slug}`}
                              className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#e5c349] transition"
                            >
                              <span>Read Dossier</span>
                              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bespoke Advisory Inquiry Banner */}
            <div className="mt-16 rounded-3xl border border-[#D4AF37]/35 bg-gradient-to-r from-[#0B101B] via-[#05070B] to-[#0B101B] p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Forensic Project Audit On-Demand
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#F8F9FA]">
                  Evaluating an Unlisted Property in Bhubaneswar?
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                  Before paying booking advances to developers or brokers, request an independent 100-Point Asset Score™ audit covering Bhulekh mutation purity, ORERA escrow compliance, and true carpet laser verification.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => onRequestDossier()}
                    className="rounded-full bg-[#D4AF37] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-[#05070B] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:bg-[#e5c349] transition active:scale-95"
                  >
                    Request Confidential Property Audit
                  </button>
                  <a
                    href="https://wa.me/919777295707?text=Hello%20Asset%20Magnets,%20I%20would%20like%20to%20request%20an%20independent%20forensic%20audit%20on%20a%20property%20in%20Bhubaneswar."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#10B981]/50 bg-[#0B101B] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-[#10B981] hover:bg-[#10B981]/15 transition"
                  >
                    Direct Underwriter WhatsApp (+91 9777295707)
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </SanctuaryShell>
  );
}
