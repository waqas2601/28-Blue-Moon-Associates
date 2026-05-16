import { notFound } from "next/navigation";
import { Calendar, Clock, Share2, MessageCircle, Tag } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { supabase } from "@/lib/supabase";
import { getSettings } from "@/lib/settings";
import Image from "next/image";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  let { data: post } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", slug)
      .single();
    post = data;
  }

  if (!post) return {};

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    keywords: post.seo_keywords,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      images: post.thumbnail ? [post.thumbnail] : [],
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "true";

  // Try fetch by slug first then by id
  let { data: post } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", slug)
      .single();
    post = data;
  }

  // Allow preview even if not published
  if (!post || (!post.published && !isPreview)) notFound();

  const settings = await getSettings();

  // Fetch related posts
  let relatedPosts = [];

  // First try manually selected related blogs
  if (post.related_blogs) {
    const relatedIds = post.related_blogs
      .split(",")
      .map((id: string) => id.trim())
      .filter(Boolean);

    if (relatedIds.length > 0) {
      const { data: manualRelated } = await supabase
        .from("blogs")
        .select("*")
        .in("id", relatedIds)
        .eq("published", true);
      relatedPosts = manualRelated || [];
    }
  }

  // Fallback to same category if no manual related
  if (relatedPosts.length === 0) {
    const { data: autoRelated } = await supabase
      .from("blogs")
      .select("*")
      .eq("published", true)
      .eq("category", post.category)
      .neq("id", post.id)
      .limit(3);
    relatedPosts = autoRelated || [];
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.seo_description || "",
    image: post.thumbnail || "",
    datePublished: post.created_at,
    author: {
      "@type": "Person",
      name: post.author || "Blue Moon Associates",
    },
    publisher: {
      "@type": "Organization",
      name: "Blue Moon Associates",
      url: "https://bluemoonassociates.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />

      {/* Preview Banner */}
      {isPreview && (
        <div className="bg-[#C9963A] text-white text-center py-2 px-4 text-sm font-medium flex items-center justify-center gap-4">
          <span>👁️ Preview Mode — This blog is not published yet</span>

          <a href="/admin/blogs" className="underline hover:no-underline">
            ← Back to Admin
          </a>
        </div>
      )}

      <main className="min-h-screen bg-white pt-20">
        {/* Hero */}
        <div className="relative w-full h-[500px] overflow-hidden">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            {post.category && (
              <div className="mb-4 inline-block px-4 py-2 bg-[#C9963A] text-white text-sm font-semibold rounded-full">
                {post.category}
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.created_at).toLocaleDateString("en-PK", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              {post.author && <span>By {post.author}</span>}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left — Article */}
            <div className="lg:col-span-2">
              {/* Author + Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-200">
                <div className="w-12 h-12 bg-[#29ABE2] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {post.author ? post.author.charAt(0).toUpperCase() : "B"}
                </div>
                <div>
                  <p className="font-semibold text-[#4A4A4A]">
                    {post.author || "Blue Moon Associates"}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.created_at).toLocaleDateString("en-PK", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    {post.read_time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.read_time}
                      </span>
                    )}
                    {post.category && (
                      <a
                        href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-[#C9963A] hover:underline"
                      >
                        {post.category}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg text-gray-500 mb-8 pb-8 border-b border-gray-200 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Content */}
              <div
                className="prose prose-lg max-w-none text-[#4A4A4A]"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              {/* Tags */}
              {(post.tags || post.category) && (
                <div className="flex flex-wrap gap-3 mt-10 pt-8 border-t border-gray-200">
                  {/* Category tag */}
                  {post.category && (
                    <a
                      href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center gap-2 px-4 py-2 bg-[#C9963A]/10 text-[#C9963A] rounded-full text-sm font-medium hover:bg-[#C9963A]/20 transition-colors"
                    >
                      <Tag className="w-4 h-4" />
                      {post.category}
                    </a>
                  )}
                  {/* Blog tags */}
                  {post.tags &&
                    post.tags
                      .split(",")
                      .map((tag: string) => tag.trim())
                      .filter(Boolean)
                      .map((tag: string) => (
                        <a
                          key={tag}
                          href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                          className="flex items-center gap-2 px-4 py-2 bg-[#29ABE2]/10 text-[#29ABE2] rounded-full text-sm font-medium hover:bg-[#29ABE2]/20 transition-colors"
                        >
                          <Tag className="w-4 h-4" />
                          {tag}
                        </a>
                      ))}
                </div>
              )}

              {/* Share */}
              <div className="flex items-center gap-4 pt-8 border-t border-gray-200 mt-8">
                <span className="text-[#4A4A4A] font-semibold flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share:
                </span>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1877F2] text-white rounded-full hover:bg-[#166FE5] transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#25D366] text-white rounded-full hover:bg-[#20ba58] transition"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Related Posts */}
                {relatedPosts && relatedPosts.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-[#4A4A4A] mb-4">
                      Related Posts
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map((related: any) => (
                        <a
                          key={related.id}
                          href={`/blog/${related.slug || related.id}`}
                          className="flex gap-3 group hover:opacity-75 transition"
                        >
                          {related.thumbnail ? (
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                              <Image
                                src={related.thumbnail}
                                alt={related.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-lg shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#4A4A4A] group-hover:text-[#29ABE2] line-clamp-2">
                              {related.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(related.created_at).toLocaleDateString(
                                "en-PK",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Card */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h4 className="text-lg font-bold text-[#4A4A4A] mb-2">
                    Interested in investing?
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Get in touch with our experts for personalized guidance.
                  </p>
                  <a
                    href="/contact"
                    className="block w-full text-center bg-[#29ABE2] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#29ABE2]/90 transition-colors mb-3"
                  >
                    Contact Us
                  </a>

                  <a
                    href={`https://wa.me/${settings.whatsapp || "923369218748"}?text=Hi, I'm interested in investing. I read your blog "${post.title}".`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full text-center bg-green-500 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
