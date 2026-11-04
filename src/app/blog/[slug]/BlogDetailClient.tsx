"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Share2,
  ChevronDown,
  ShieldCheck,
  Building2,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { CuratedProperty } from "@/types/property";
import { BlogPost } from "@/data/blogPosts";
import SanctuaryShell from "@/components/SanctuaryShell";

interface BlogDetailClientProps {
  post: BlogPost;
  allPosts?: BlogPost[];
  properties?: CuratedProperty[];
}

export default function BlogDetailClient({
  post,
  allPosts = [],
  properties = [],
}: BlogDetailClientProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const relatedPosts = allPosts.length > 0
    ? allPosts.filter((p) => p.slug !== post.slug).slice(0, 2)
    : [];

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <SanctuaryShell properties={properties}>
      {({ lightingMode, onRequestDossier }) => (
        <article className="relative min-h-screen w-full bg-[#05070B] text-[#F8F9FA] pt-24 pb-28">
          {/* Top Breadcrumb Navigation & Back Link */}
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/15 pb-4">
              <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs font-mono">
                <Link href="/" className="text-[#A6B0BF] hover:text-[#D4AF37] transition">
                  Sanctuary
                </Link>
                <span className="text-[#D4AF37]/40">/</span>
                <Link href="/blog" className="text-[#A6B0BF] hover:text-[#D4AF37] transition">
                  Intelligence Blog
                </Link>
                <span className="text-[#D4AF37]/40">/</span>
                <span className="text-[#D4AF37] truncate max-w-[200px] sm:max-w-[360px]">
                  {post.title}
                </span>
              </nav>

              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#A6B0BF] hover:text-[#D4AF37] transition"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>All Intelligence</span>
              </Link>
            </div>
          </div>

          {/* Article Header & Editorial Masthead */}
          <header className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8 pt-6 pb-12">
            <div className="space-y-6">
              {/* Category & Corridor Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-3.5 py-1 font-sans text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                  {post.category}
                </span>
                {post.corridor && (
                  <span className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1 font-sans text-xs font-medium text-[#CBD5E1]">
                    {post.corridor}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#A6B0BF]">
                  <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
                  {post.readingTime}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#F8F9FA] leading-[1.12]">
                {post.title}
              </h1>

              {/* Subtitle / Excerpt */}
              <p className="font-sans text-base sm:text-lg text-[#CBD5E1] leading-relaxed">
                {post.subtitle || post.excerpt}
              </p>

              {/* Author & E-E-A-T Credential Strip */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#D4AF37]/15">
                <div className="flex items-center gap-3.5">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-12 w-12 rounded-full border border-[#D4AF37]/60 object-cover shadow-md"
                  />
                  <div>
                    <div className="font-serif text-base font-medium text-[#F8F9FA]">
                      {post.author.name}
                    </div>
                    <div className="font-sans text-xs text-[#D4AF37]">
                      {post.author.role}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-[#A6B0BF]">
                  <div className="hidden sm:flex flex-col text-right">
                    <span className="text-[#CBD5E1]">
                      Published {new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="text-[#10B981] text-[11px]">
                      Verified Fresh: {new Date(post.updatedAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#0B101B] px-3.5 py-1.5 font-sans text-xs font-medium text-[#CBD5E1] hover:border-[#D4AF37] hover:text-[#D4AF37] transition shadow-sm"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>{copiedLink ? "Link Copied!" : "Share"}</span>
                  </button>
                </div>
              </div>

              {/* Editorial Quality Assurance Assurance Pill */}
              <div className="inline-flex items-center gap-2 rounded-xl border border-[#10B981]/30 bg-[#10B981]/10 px-4 py-2 font-sans text-xs text-[#CBD5E1]">
                <ShieldCheck className="h-4 w-4 text-[#10B981] shrink-0" />
                <span>
                  Forensic Quality Assured: Reviewed by <strong className="text-white">{post.reviewedBy.name}</strong> ({post.reviewedBy.role}).
                </span>
              </div>
            </div>
          </header>

          {/* Featured Hero Visual */}
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 mb-12">
            <div className="relative h-[300px] sm:h-[460px] lg:h-[520px] w-full overflow-hidden rounded-3xl border border-[#D4AF37]/25 shadow-2xl">
              <img
                src={post.featuredImage}
                alt={post.featuredImageAlt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-transparent opacity-60" />
            </div>
          </div>

          {/* Main Article Body Layout (Content + Sticky Table of Contents) */}
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Sticky Sidebar Navigation (Table of Contents) */}
              <aside className="lg:col-span-4 order-2 lg:order-1">
                <div className="sticky top-28 space-y-6">
                  {/* Table of Contents Card */}
                  <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#0B101B]/90 p-5 sm:p-6 backdrop-blur-xl shadow-xl">
                    <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#D4AF37] block mb-3">
                      Table of Contents
                    </span>
                    <nav className="space-y-2">
                      {post.tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="block text-xs sm:text-sm text-[#A6B0BF] hover:text-[#D4AF37] hover:translate-x-1 transition-all py-1"
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </div>

                  {/* Fast Advisory Help Box */}
                  <div className="rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#0B101B] to-[#05070B] p-5 space-y-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                      <Building2 className="h-4 w-4" />
                      Verify a Project Title
                    </span>
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">
                      Need our legal underwriting desk to examine the ORERA certificate or Bhulekh patta of a Bhubaneswar property?
                    </p>
                    <button
                      type="button"
                      onClick={() => onRequestDossier()}
                      className="w-full rounded-xl bg-[#D4AF37] py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#05070B] hover:bg-[#e5c349] transition"
                    >
                      Request Free Title Audit
                    </button>
                  </div>
                </div>
              </aside>

              {/* Core Content Flow */}
              <div className="lg:col-span-8 order-1 lg:order-2 space-y-10">
                {/* Executive Key Takeaways Box (AEO & GEO optimized) */}
                <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#0B101B]/80 p-6 sm:p-8 backdrop-blur-xl shadow-lg">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#D4AF37]/20">
                    <CheckCircle2 className="h-5 w-5 text-[#10B981]" />
                    <span className="font-serif text-lg font-medium tracking-wide text-[#F8F9FA]">
                      Key Executive Takeaways (TL;DR)
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {post.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#CBD5E1] leading-relaxed">
                        <span className="font-mono text-xs font-bold text-[#D4AF37] mt-0.5">
                          0{idx + 1}.
                        </span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Structured Sections */}
                {post.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
                    <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#F8F9FA] border-b border-[#D4AF37]/15 pb-2">
                      {section.title}
                    </h2>

                    <div className="font-sans text-sm sm:text-base leading-relaxed text-[#CBD5E1] whitespace-pre-line space-y-4">
                      {section.content}
                    </div>

                    {/* Section Callout Box */}
                    {section.callout && (
                      <div
                        className={`mt-4 rounded-xl border p-4 sm:p-5 ${
                          section.callout.type === "warning"
                            ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
                            : section.callout.type === "stat"
                            ? "border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#F8F9FA]"
                            : "border-blue-500/40 bg-blue-500/10 text-blue-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider mb-1.5">
                          {section.callout.type === "warning" && <AlertTriangle className="h-4 w-4 text-amber-400" />}
                          {section.callout.type === "stat" && <BarChart3 className="h-4 w-4 text-[#D4AF37]" />}
                          {section.callout.type === "insight" && <Lightbulb className="h-4 w-4 text-blue-400" />}
                          <span>{section.callout.title}</span>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed">{section.callout.text}</p>
                      </div>
                    )}
                  </section>
                ))}

                {/* In-Article FAQ Accordion */}
                {post.faqItems && post.faqItems.length > 0 && (
                  <section className="pt-8 border-t border-[#D4AF37]/20 space-y-4">
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F8F9FA]">
                      Frequently Asked Questions
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A6B0BF]">
                      Specific answers to common buyer and investor inquiries regarding this framework:
                    </p>

                    <div className="space-y-3 pt-2">
                      {post.faqItems.map((faq, i) => {
                        const isOpen = openFaqIndex === i;
                        return (
                          <div
                            key={i}
                            className="rounded-xl border border-[#D4AF37]/20 bg-[#0B101B]/70 overflow-hidden"
                          >
                            <button
                              type="button"
                              onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                              className="w-full flex items-center justify-between p-4 text-left font-serif text-base text-[#F8F9FA] hover:text-[#D4AF37] transition"
                            >
                              <span>{faq.question}</span>
                              <ChevronDown
                                className={`h-4 w-4 text-[#D4AF37] transition-transform duration-200 ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isOpen && (
                              <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed border-t border-[#D4AF37]/10">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* Author Deep Bio & E-E-A-T Card */}
                <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#0B101B] p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-16 w-16 rounded-full border-2 border-[#D4AF37] object-cover shrink-0"
                  />
                  <div className="space-y-2">
                    <div className="font-serif text-lg font-medium text-[#F8F9FA]">
                      Written by {post.author.name}
                    </div>
                    <div className="font-sans text-xs text-[#D4AF37] font-semibold">
                      {post.author.role}
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#A6B0BF] leading-relaxed">
                      {post.author.bio}
                    </p>
                    {post.author.linkedinUrl && (
                      <a
                        href={post.author.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-[#D4AF37] hover:underline pt-1"
                      >
                        <span>Connect on LinkedIn</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Related Intelligence Guides */}
                {relatedPosts.length > 0 && (
                  <div className="pt-8 border-t border-[#D4AF37]/20 space-y-5">
                    <h3 className="font-serif text-2xl text-[#F8F9FA]">
                      Related Underwriting Guides
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {relatedPosts.map((rel) => (
                        <Link
                          key={rel.slug}
                          href={`/blog/${rel.slug}`}
                          className="group rounded-xl border border-[#D4AF37]/20 bg-[#0B101B]/80 p-4 hover:border-[#D4AF37] transition"
                        >
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37]">
                            {rel.category}
                          </span>
                          <h4 className="mt-1 font-serif text-base text-[#F8F9FA] group-hover:text-[#D4AF37] transition leading-snug">
                            {rel.title}
                          </h4>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      )}
    </SanctuaryShell>
  );
}
