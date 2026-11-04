import { PrismaClient } from "@prisma/client";
import { BLOG_POSTS } from "../src/data/blogPosts";

const prisma = new PrismaClient();

async function main() {
  console.log(`--- Seeding ${BLOG_POSTS.length} Blog Posts into Neon PostgreSQL ---`);

  for (const post of BLOG_POSTS) {
    const upserted = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        subtitle: post.subtitle,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        excerpt: post.excerpt,
        category: post.category,
        publishedAt: new Date(post.publishedAt),
        updatedAt: new Date(post.updatedAt),
        readingTime: post.readingTime,
        authorName: post.author.name,
        authorRole: post.author.role,
        authorAvatar: post.author.avatar,
        authorBio: post.author.bio,
        reviewedByName: post.reviewedBy?.name || null,
        reviewedByRole: post.reviewedBy?.role || null,
        featuredImage: post.featuredImage,
        featuredImageAlt: post.featuredImageAlt,
        corridor: post.corridor || null,
        keyTakeaways: post.keyTakeaways,
        sectionsJson: post.sections as any,
        faqJson: post.faqItems as any,
        keywords: post.keywords,
        relatedProperties: post.relatedPropertySlugs || [],
        isPublished: true,
      },
      create: {
        slug: post.slug,
        title: post.title,
        subtitle: post.subtitle,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        excerpt: post.excerpt,
        category: post.category,
        publishedAt: new Date(post.publishedAt),
        updatedAt: new Date(post.updatedAt),
        readingTime: post.readingTime,
        authorName: post.author.name,
        authorRole: post.author.role,
        authorAvatar: post.author.avatar,
        authorBio: post.author.bio,
        reviewedByName: post.reviewedBy?.name || null,
        reviewedByRole: post.reviewedBy?.role || null,
        featuredImage: post.featuredImage,
        featuredImageAlt: post.featuredImageAlt,
        corridor: post.corridor || null,
        keyTakeaways: post.keyTakeaways,
        sectionsJson: post.sections as any,
        faqJson: post.faqItems as any,
        keywords: post.keywords,
        relatedProperties: post.relatedPropertySlugs || [],
        isPublished: true,
      },
    });

    console.log(`✓ Seeded post in DB: ${upserted.title} [slug: ${upserted.slug}]`);
  }

  const count = await prisma.blogPost.count();
  console.log(`\n🎉 Total Blog Posts in Neon PostgreSQL DB: ${count}`);
}

main()
  .catch((e) => {
    console.error("Error seeding blog posts:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
