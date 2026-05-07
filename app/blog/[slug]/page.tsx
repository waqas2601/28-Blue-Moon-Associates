import { notFound } from "next/navigation";
import { Calendar, Clock, Share2, MessageCircle, Tag } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { supabase } from "@/lib/supabase";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try fetch by slug first then by id
  let { data: post } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", slug)
      .eq("published", true)
      .single();
    post = data;
  }

  if (!post) notFound();

  // Fetch related posts
  const { data: relatedPosts } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .eq("category", post.category)
    .neq("id", post.id)
    .limit(3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-20">
        {/* Hero */}
        <div className="relative w-full h-[500px] overflow-hidden">
          {post.thumbnail ? (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover"
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
              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg text-gray-500 mb-8 pb-8 border-b border-gray-200 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Content */}
              <div className="text-[#4A4A4A] leading-relaxed whitespace-pre-wrap text-base">
                {post.content}
              </div>

              {/* Tags */}
              {post.category && (
                <div className="flex flex-wrap gap-3 mt-10 pt-8 border-t border-gray-200">
                  <span className="flex items-center gap-2 px-4 py-2 bg-[#29ABE2]/10 text-[#29ABE2] rounded-full text-sm font-medium">
                    <Tag className="w-4 h-4" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-2 px-4 py-2 bg-[#29ABE2]/10 text-[#29ABE2] rounded-full text-sm font-medium">
                    <Tag className="w-4 h-4" />
                    Real Estate
                  </span>
                  <span className="flex items-center gap-2 px-4 py-2 bg-[#29ABE2]/10 text-[#29ABE2] rounded-full text-sm font-medium">
                    <Tag className="w-4 h-4" />
                    Pakistan
                  </span>
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
                            <img
                              src={related.thumbnail}
                              alt={related.title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-lg" />
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
                    href="https://wa.me/923369218748"
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
