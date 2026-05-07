"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Calendar, User } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

const categories = [
  "All",
  "Investment",
  "Market Trends",
  "Guides",
  "News",
  "Lifestyle",
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setBlogs(data || []);
      setFiltered(data || []);
      setIsLoading(false);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFiltered(blogs);
    } else {
      setFiltered(blogs.filter((b) => b.category === activeCategory));
    }
  }, [activeCategory, blogs]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[400px] flex items-center justify-center pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=600&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <p className="text-[#C9963A] text-sm font-semibold uppercase tracking-widest mb-4">
            Blog & Media
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest News & Insights
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Stay updated with the latest trends and news in Pakistan's real
            estate market
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-40 bg-white shadow-md py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#29ABE2] text-white"
                    : "bg-white text-[#4A4A4A] border-2 border-gray-200 hover:border-[#29ABE2]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#29ABE2]" />
                <p className="mt-2 text-sm text-gray-400">Loading blogs...</p>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg font-medium">
                No blog posts found
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {activeCategory !== "All"
                  ? "Try selecting a different category"
                  : "Blog posts will appear here once published"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post: any) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    {post.thumbnail ? (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-400 text-sm">No image</p>
                      </div>
                    )}
                    {post.category && (
                      <span className="absolute left-4 top-4 rounded-full bg-[#C9963A] px-3 py-1 text-xs font-semibold text-white">
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
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
                      className="inline-flex items-center gap-2 text-[#29ABE2] font-semibold hover:gap-3 transition-all duration-300"
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
      </section>

      <Footer />
    </main>
  );
}
