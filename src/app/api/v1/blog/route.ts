import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminSessionToken } from "@/lib/security";

function getAuthenticatedAdminRole(request: NextRequest): string {
  const cookie = request.cookies.get("asset_admin_session")?.value;
  if (cookie) {
    const verified = verifyAdminSessionToken(cookie);
    if (verified.valid && verified.payload) {
      return verified.payload.role;
    }
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    const verified = verifyAdminSessionToken(token);
    if (verified.valid && verified.payload) {
      return verified.payload.role;
    }
  }

  return request.headers.get("x-admin-role") || "";
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const slug = searchParams.get("slug");

  try {
    if (slug) {
      const post = await prisma.blogPost.findUnique({
        where: { slug },
      });
      if (!post) {
        return NextResponse.json({ error: "NOT_FOUND", message: "Article not found" }, { status: 404 });
      }
      return NextResponse.json({ post });
    }

    const whereClause: any = { isPublished: true };
    if (category && category !== "All Intelligence") {
      whereClause.category = category;
    }

    const posts = await prisma.blogPost.findMany({
      where: whereClause,
      orderBy: { publishedAt: "desc" },
    });

    return NextResponse.json({
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("API Blog Error:", error);
    return NextResponse.json(
      { error: "DB_ERROR", message: "Failed to fetch articles from database" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const role = getAuthenticatedAdminRole(request);
    if (!role) {
      return NextResponse.json(
        { error: "UNAUTHORIZED", message: "Admin authentication required to publish articles." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      subtitle,
      excerpt,
      category,
      readingTime,
      featuredImage,
      featuredImageAlt,
      corridor,
      keyTakeaways,
      content,
      sections,
      keywords,
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "VALIDATION", message: "Article title is required." }, { status: 400 });
    }

    if (!excerpt || !excerpt.trim()) {
      return NextResponse.json({ error: "VALIDATION", message: "Article summary/excerpt is required." }, { status: 400 });
    }

    // Auto-generate clean slug from title
    let baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    
    if (!baseSlug) {
      baseSlug = `article-${Date.now()}`;
    }

    // Ensure slug uniqueness
    const existing = await prisma.blogPost.findUnique({ where: { slug: baseSlug } });
    const finalSlug = existing ? `${baseSlug}-${Date.now().toString().slice(-4)}` : baseSlug;

    // Structured sections
    let parsedSections = [];
    if (Array.isArray(sections) && sections.length > 0) {
      parsedSections = sections;
    } else if (content && content.trim()) {
      parsedSections = [
        {
          id: "main-analysis",
          title: "Executive Underwriting Analysis",
          content: content.trim(),
        },
      ];
    } else {
      parsedSections = [
        {
          id: "overview",
          title: "Executive Overview",
          content: excerpt.trim(),
        },
      ];
    }

    const defaultCover =
      featuredImage && featuredImage.trim()
        ? featuredImage.trim()
        : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80";

    const takeaways = Array.isArray(keyTakeaways)
      ? keyTakeaways
      : typeof keyTakeaways === "string"
      ? keyTakeaways.split("\n").map((t: string) => t.trim()).filter(Boolean)
      : [excerpt.trim()];

    const keywordList = Array.isArray(keywords)
      ? keywords
      : typeof keywords === "string"
      ? keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
      : ["bhubaneswar real estate", "odisha property investment"];

    const newPost = await prisma.blogPost.create({
      data: {
        slug: finalSlug,
        title: title.trim(),
        subtitle: subtitle ? subtitle.trim() : null,
        metaTitle: `${title.trim()} — ASSET PROPERTIES`,
        metaDescription: excerpt.trim().slice(0, 160),
        excerpt: excerpt.trim(),
        category: category || "Statutory & Legal",
        readingTime: readingTime || "5 min read",
        authorName: "Asset Magnets CIO",
        authorRole: "Senior Real Estate Underwriter",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        authorBio: "Institutional due diligence desk at Asset Properties Bhubaneswar.",
        reviewedByName: "Advisory Underwriting Desk",
        reviewedByRole: "Forensic Legal Division",
        featuredImage: defaultCover,
        featuredImageAlt: featuredImageAlt || title.trim(),
        corridor: corridor || "Bhubaneswar Core Corridor",
        keyTakeaways: takeaways,
        sectionsJson: parsedSections as any,
        faqJson: [] as any,
        keywords: keywordList,
        isPublished: true,
      },
    });

    return NextResponse.json({
      status: "SUCCESS",
      message: "Article published successfully to Neon PostgreSQL database.",
      post: newPost,
    });
  } catch (err: any) {
    console.error("Create BlogPost Error:", err);
    return NextResponse.json(
      { error: "DB_ERROR", message: err.message || "Failed to create article in database." },
      { status: 500 }
    );
  }
}
