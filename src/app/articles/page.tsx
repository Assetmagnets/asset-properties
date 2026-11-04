import React from "react";
import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import { getDynamicBlogPosts } from "@/lib/db-blog";
import { getDynamicProperties } from "@/lib/db-properties";

export const revalidate = 0; // Dynamic server-rendered on demand from Neon DB

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://properties.assetmagnets.com";
const SITE_URL = rawUrl.replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Bhubaneswar Real Estate Market Intelligence & Legal Guides — ASSET PROPERTIES Blog",
  description:
    "Institutional analysis, ORERA compliance audits, Bhulekh land title verification frameworks, Odisha stamp duty calculators, and growth corridor reports for high-net-worth property acquisitions in Bhubaneswar.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Bhubaneswar Real Estate Market Intelligence & Legal Guides — ASSET PROPERTIES",
    description:
      "Forensic underwriting, ORERA compliance audits, Bhulekh land title verifications, and statutory tax frameworks for luxury real estate in Bhubaneswar, Odisha.",
    url: `${SITE_URL}/blog`,
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Bhubaneswar Real Estate Market Intelligence — ASSET PROPERTIES Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhubaneswar Real Estate Market Intelligence & Legal Guides",
    description:
      "Forensic underwriting, ORERA legal checklists, and growth corridor analysis in Bhubaneswar, Odisha.",
    images: ["/og-image.svg"],
  },
  keywords: [
    "bhubaneswar real estate blog",
    "odisha stamp duty 2026",
    "bhulekh odisha gharabari check",
    "orera approved flats in bhubaneswar",
    "trisulia vs patia investment",
    "super built up area loading trap",
    "bda approved projects bhubaneswar",
    "luxury property investment odisha",
  ],
};

export default async function BlogPage() {
  const [posts, properties] = await Promise.all([
    getDynamicBlogPosts(),
    getDynamicProperties(),
  ]);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/blog#webpage`,
    url: `${SITE_URL}/blog`,
    name: "Bhubaneswar Real Estate Market Intelligence & Legal Guides",
    description:
      "Institutional analysis, ORERA compliance audits, Bhulekh land title verifications, and growth corridor reports for Bhubaneswar, Odisha.",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-IN",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
        description: post.excerpt,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <BlogClient initialPosts={posts} initialProperties={properties} />

      {/* Semantic AEO & Search Engine Indexable Summary */}
      <section className="sr-only" aria-label="Bhubaneswar Real Estate Advisory Articles">
        <h2>Bhubaneswar Real Estate Legal and Market Intelligence Knowledge Base</h2>
        <p>
          Asset Properties provides institutional due diligence articles for high-net-worth individuals,
          NRI investors, and corporate executives evaluating property in Bhubaneswar, Odisha.
        </p>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <p>Author: {post.author.name} ({post.author.role})</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
