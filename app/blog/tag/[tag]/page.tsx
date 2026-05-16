import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ArrowRight, Calendar, User } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag} — Blue Moon Associates Blog`,
    description: `Browse all articles tagged with ${tag}`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  // Fetch blogs with this tag
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .ilike("tags", `%${decodedTag}%`)
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Title Bar */}
        <div className="bg-white border-b border-gray-200 pt-20">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="text-center">
              <span className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-3">
                <span className="w-8 h-[2px] bg-[#C9963A]" />
                Tag
                <span className="w-8 h-[2px] bg-[#C9963A]" />
              </span>
              <h1 className="text-3xl font-bold text-[#4A4A4A]">
                #{decodedTag}
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                {blogs?.length || 0} articles
              </p>
            </div>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="mx-auto max-w-7xl px-4 py-12">
          {/* Active Filter Bar */}
          <div className="flex items-center gap-3 mb-8">
            <a
              href="/blog"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#29ABE2] transition-colors"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              All Blogs
            </a>
            <span className="text-gray-300">/</span>
            <span className="flex items-center gap-2 bg-[#29ABE2]/10 text-[#29ABE2] px-3 py-1.5 rounded-full text-sm font-medium">
              #{decodedTag}
              <a
                href="/blog"
                className="hover:text-[#29ABE2]/70 transition-colors"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </a>
            </span>
          </div>
          {!blogs || blogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No articles with this tag yet.
              </p>

              <a
                href="/blog"
                className="mt-4 inline-block text-[#29ABE2] hover:underline"
              >
                ← Back to Blog
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post: any) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    {post.thumbnail ? (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                    {post.category && (
                      <span className="absolute left-4 top-4 rounded-full bg-[#C9963A] px-3 py-1 text-xs font-semibold text-white">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.created_at).toLocaleDateString("en-PK", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      {post.author && (
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-[#4A4A4A] mb-3 line-clamp-2 group-hover:text-[#29ABE2] transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}

                    <a
                      href={`/blog/${post.slug || post.id}`}
                      className="inline-flex items-center gap-2 text-[#29ABE2] font-semibold hover:gap-3 transition-all"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
