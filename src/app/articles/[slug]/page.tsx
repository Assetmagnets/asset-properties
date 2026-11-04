import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDynamicBlogPosts, getDynamicBlogPostBySlug } from "@/lib/db-blog";
import { getDynamicProperties } from "@/lib/db-properties";
import BlogDetailClient from "./BlogDetailClient";

export const revalidate = 0; // Dynamic server-rendered on demand from Neon DB

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://properties.assetmagnets.com";
const SITE_URL = rawUrl.replace(/\/+$/, "");

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getDynamicBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getDynamicBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found — ASSET PROPERTIES",
    };
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.metaTitle} | ASSET PROPERTIES`,
    description: post.metaDescription,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: postUrl,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.keywords,
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.featuredImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.featuredImage],
    },
    keywords: post.keywords,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, allPosts, properties] = await Promise.all([
    getDynamicBlogPostBySlug(slug),
    getDynamicBlogPosts(),
    getDynamicProperties(),
  ]);

  if (!post) {
    notFound();
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  // Article Schema for GEO & Rich Results
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    isPartOf: {
      "@type": "Blog",
      "@id": `${SITE_URL}/blog#blog`,
      name: "ASSET PROPERTIES Market Intelligence",
      publisher: {
        "@type": "Organization",
        name: "ASSET PROPERTIES",
        url: SITE_URL,
      },
    },
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: `${SITE_URL}/about#${post.author.name.toLowerCase().replace(/\s+/g, "-")}`,
    },
    publisher: {
      "@type": "Organization",
      name: "ASSET PROPERTIES",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.svg`,
      },
    },
    image: {
      "@type": "ImageObject",
      url: post.featuredImage.startsWith("http") ? post.featuredImage : `${SITE_URL}${post.featuredImage}`,
      caption: post.featuredImageAlt,
    },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    inLanguage: "en-IN",
  };

  // Breadcrumb Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Sanctuary",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Market Intelligence",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  // In-article FAQ Schema for Google Rich Results
  const faqJsonLd =
    post.faqItems && post.faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqItems.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <BlogDetailClient
        post={post}
        allPosts={allPosts}
        properties={properties}
      />
    </>
  );
}
