import { prisma } from "@/lib/prisma";
import { BlogPost, BlogSection, BlogFaq, BlogAuthor } from "@/data/blogPosts";

export async function getDynamicBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });

    if (posts && posts.length > 0) {
      return posts.map((p) => {
        const sections = (p.sectionsJson as unknown as BlogSection[]) || [];
        const faqItems = (p.faqJson as unknown as BlogFaq[]) || [];
        const author: BlogAuthor = {
          name: p.authorName,
          role: p.authorRole,
          avatar: p.authorAvatar,
          bio: p.authorBio,
        };

        const tableOfContents = sections.map((s) => ({
          id: s.id,
          title: s.title,
        }));

        return {
          slug: p.slug,
          title: p.title,
          subtitle: p.subtitle || "",
          metaTitle: p.metaTitle,
          metaDescription: p.metaDescription,
          excerpt: p.excerpt,
          category: p.category as BlogPost["category"],
          publishedAt: p.publishedAt.toISOString().split("T")[0],
          updatedAt: p.updatedAt.toISOString().split("T")[0],
          readingTime: p.readingTime,
          author,
          reviewedBy: {
            name: p.reviewedByName || "Advisory Board",
            role: p.reviewedByRole || "Legal & Underwriting",
          },
          featuredImage: p.featuredImage,
          featuredImageAlt: p.featuredImageAlt,
          corridor: p.corridor || undefined,
          keyTakeaways: p.keyTakeaways || [],
          sections,
          faqItems,
          keywords: p.keywords || [],
          tableOfContents,
          relatedPropertySlugs: p.relatedProperties || [],
        };
      });
    }
  } catch (error) {
    console.warn("Neon DB query error in getDynamicBlogPosts:", error);
  }

  // Graceful fallback if database connection drops
  const { BLOG_POSTS } = await import("@/data/blogPosts");
  return BLOG_POSTS;
}

export async function getDynamicBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const p = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (p) {
      const sections = (p.sectionsJson as unknown as BlogSection[]) || [];
      const faqItems = (p.faqJson as unknown as BlogFaq[]) || [];
      const author: BlogAuthor = {
        name: p.authorName,
        role: p.authorRole,
        avatar: p.authorAvatar,
        bio: p.authorBio,
      };

      const tableOfContents = sections.map((s) => ({
        id: s.id,
        title: s.title,
      }));

      return {
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle || "",
        metaTitle: p.metaTitle,
        metaDescription: p.metaDescription,
        excerpt: p.excerpt,
        category: p.category as BlogPost["category"],
        publishedAt: p.publishedAt.toISOString().split("T")[0],
        updatedAt: p.updatedAt.toISOString().split("T")[0],
        readingTime: p.readingTime,
        author,
        reviewedBy: {
          name: p.reviewedByName || "Advisory Board",
          role: p.reviewedByRole || "Legal & Underwriting",
        },
        featuredImage: p.featuredImage,
        featuredImageAlt: p.featuredImageAlt,
        corridor: p.corridor || undefined,
        keyTakeaways: p.keyTakeaways || [],
        sections,
        faqItems,
        keywords: p.keywords || [],
        tableOfContents,
        relatedPropertySlugs: p.relatedProperties || [],
      };
    }
  } catch (error) {
    console.warn(`Neon DB query error for post slug '${slug}':`, error);
  }

  const { BLOG_POSTS } = await import("@/data/blogPosts");
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}
