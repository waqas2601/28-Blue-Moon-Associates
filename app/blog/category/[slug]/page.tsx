import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ArrowRight, Calendar, User } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  return {
    title:
      category?.meta_title ||
      `${category?.name || slug} — Blue Moon Associates Blog`,
    description:
      category?.meta_description ||
      category?.description ||
      `Browse all ${slug} articles`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!category) notFound();

  // Fetch blogs in this category
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .eq("category", category.name)
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
                Category
                <span className="w-8 h-[2px] bg-[#C9963A]" />
              </span>
              <h1 className="text-3xl font-bold text-[#4A4A4A]">
                {category.name}
              </h1>
              {category.description && (
                <p className="mt-2 text-gray-500 max-w-xl mx-auto">
                  {category.description}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-400">
                {blogs?.length || 0} articles
              </p>
            </div>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="mx-auto max-w-7xl px-4 py-12">
          {!blogs || blogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No articles in this category yet.
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
                    <span className="absolute left-4 top-4 rounded-full bg-[#C9963A] px-3 py-1 text-xs font-semibold text-white">
                      {post.category}
                    </span>
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
