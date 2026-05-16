"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, MessageCircle, Tag } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  categoryColor: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: number;
  tags: string;
}

interface BlogListingProps {
  blogs: BlogPost[];
  categories: string[];
  categoryColors: Record<string, string>;
  whatsapp?: string;
}

export default function BlogListing({
  blogs,
  categories,
  categoryColors,
  whatsapp = "923369218748",
}: BlogListingProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);

  const featuredBlog = filteredBlogs[0];
  const gridBlogs = filteredBlogs.slice(1);
  const [showSidebar, setShowSidebar] = useState(false);

  // Get all unique tags
  const allTags = Array.from(
    new Set(
      blogs.flatMap((b) =>
        b.tags
          ? b.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
      ),
    ),
  ).slice(0, 10);

  const categoryCounts = categories.reduce(
    (acc, cat) => {
      if (cat === "All") {
        acc[cat] = blogs.length;
      } else {
        acc[cat] = blogs.filter((b) => b.category === cat).length;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Title Bar */}
      <div className="border-b border-gray-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <span className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-3">
            <span className="w-8 h-[2px] bg-[#C9963A]" />
            Blog & Media
            <span className="w-8 h-[2px] bg-[#C9963A]" />
          </span>
          <h1 className="text-3xl font-bold text-[#4A4A4A] md:text-4xl">
            Latest News & Insights
          </h1>
          <p className="mt-2 text-gray-500 max-w-xl mx-auto">
            Stay updated with the latest trends and insights in Pakistan real
            estate
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Mobile Sidebar Drawer */}
        {showSidebar && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowSidebar(false)}
            />
            {/* Drawer */}
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="font-bold text-[#4A4A4A]">Filters</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="h-5 w-5"
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
                  </button>
                </div>
              </div>

              {/* Sidebar Content */}
              <div className="p-4 space-y-6">
                {/* Categories */}
                <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-[#4A4A4A]">
                      Categories
                    </h3>
                    {activeCategory !== "All" && (
                      <button
                        onClick={() => setActiveCategory("All")}
                        className="text-xs text-red-500 hover:text-red-600 font-medium"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setActiveCategory("All");
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        activeCategory === "All"
                          ? "bg-[#29ABE2] text-white font-medium"
                          : "text-[#4A4A4A] hover:bg-gray-50"
                      }`}
                    >
                      <span>All</span>
                      <span
                        className={`text-xs rounded-full px-2 py-0.5 ${
                          activeCategory === "All"
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {blogs.length}
                      </span>
                    </button>
                    {categories
                      .filter((cat) => cat !== "All")
                      .map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setActiveCategory(cat);
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                            activeCategory === cat
                              ? "bg-[#29ABE2] text-white font-medium"
                              : "text-[#4A4A4A] hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{
                                backgroundColor:
                                  categoryColors[cat] || "#C9963A",
                              }}
                            />
                            <span>{cat}</span>
                          </div>
                          <span
                            className={`text-xs rounded-full px-2 py-0.5 ${
                              activeCategory === cat
                                ? "bg-white/20 text-white"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {categoryCounts[cat] || 0}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>

                {/* Popular Tags */}
                {allTags.length > 0 && (
                  <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
                    <h3 className="mb-4 text-base font-bold text-[#4A4A4A] flex items-center gap-2">
                      <Tag className="h-4 w-4 text-[#29ABE2]" />
                      Popular Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <a
                          key={tag}
                          href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                          className="rounded-full bg-[#29ABE2]/10 px-3 py-1.5 text-xs font-medium text-[#29ABE2] hover:bg-[#29ABE2]/20 transition-colors"
                        >
                          #{tag}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* WhatsApp CTA */}
                <div className="rounded-xl bg-[#4A4A4A] p-5 text-white">
                  <h3 className="mb-2 text-base font-bold">
                    Get Property Updates
                  </h3>
                  <p className="mb-4 text-sm text-white/70">
                    Connect with us on WhatsApp for latest property listings
                  </p>

                  <a
                    href={`https://wa.me/${whatsapp}?text=Hi, I want to stay updated about new properties.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        {filteredBlogs.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-8 w-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-lg mb-2">
              No blogs in this category yet.
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Try selecting a different category
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="bg-[#29ABE2] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#29ABE2]/90 transition-colors"
            >
              Show All Blogs
            </button>
          </div>
        ) : (
          <div className="flex gap-8">
            {/* LEFT Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 w-64 space-y-6">
                {/* Categories */}
                <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
                  <h3 className="mb-4 text-base font-bold text-[#4A4A4A]">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveCategory("All")}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        activeCategory === "All"
                          ? "bg-[#29ABE2] text-white font-medium"
                          : "text-[#4A4A4A] hover:bg-gray-50"
                      }`}
                    >
                      <span>All</span>
                      <span
                        className={`text-xs rounded-full px-2 py-0.5 ${
                          activeCategory === "All"
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {blogs.length}
                      </span>
                    </button>
                    {categories
                      .filter((cat) => cat !== "All")
                      .map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                            activeCategory === cat
                              ? "bg-[#29ABE2] text-white font-medium"
                              : "text-[#4A4A4A] hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{
                                backgroundColor:
                                  categoryColors[cat] || "#C9963A",
                              }}
                            />
                            <span>{cat}</span>
                          </div>
                          <span
                            className={`text-xs rounded-full px-2 py-0.5 ${
                              activeCategory === cat
                                ? "bg-white/20 text-white"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {categoryCounts[cat] || 0}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>

                {/* Popular Tags */}
                {allTags.length > 0 && (
                  <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
                    <h3 className="mb-4 text-base font-bold text-[#4A4A4A] flex items-center gap-2">
                      <Tag className="h-4 w-4 text-[#29ABE2]" />
                      Popular Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <a
                          key={tag}
                          href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                          className="rounded-full bg-[#29ABE2]/10 px-3 py-1.5 text-xs font-medium text-[#29ABE2] hover:bg-[#29ABE2]/20 transition-colors"
                        >
                          #{tag}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* WhatsApp CTA */}
                <div className="rounded-xl bg-[#4A4A4A] p-5 text-white">
                  <h3 className="mb-2 text-base font-bold">
                    Get Property Updates
                  </h3>
                  <p className="mb-4 text-sm text-white/70">
                    Connect with us on WhatsApp for latest property listings
                  </p>

                  <a
                    href={`https://wa.me/${whatsapp}?text=Hi, I want to stay updated about new properties.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </aside>

            {/* RIGHT — Main Content */}
            <div className="flex-1 space-y-10">
              {/* Mobile Top Bar */}
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <p className="text-sm text-gray-500 font-medium">
                  Showing{" "}
                  <span className="text-[#29ABE2] font-bold">
                    {filteredBlogs.length}
                  </span>{" "}
                  articles
                </p>
                <button
                  onClick={() => setShowSidebar(true)}
                  className="flex items-center gap-2 rounded-lg border-2 border-[#29ABE2] px-4 py-2 text-sm font-semibold text-[#29ABE2]"
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
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
                    />
                  </svg>
                  Filters
                </button>
              </div>

              {/* Active Filter Tag */}
              {activeCategory !== "All" && (
                <div className="flex items-center gap-2">
                  <span
                    className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-white"
                    style={{
                      backgroundColor:
                        categoryColors[activeCategory] || "#29ABE2",
                    }}
                  >
                    {activeCategory}
                    <button onClick={() => setActiveCategory("All")}>
                      <svg
                        className="h-3 w-3 ml-1"
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
                    </button>
                  </span>
                </div>
              )}

              {/* Featured Blog */}
              {featuredBlog && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-[2px] bg-[#29ABE2]" />
                    <span className="text-sm font-semibold uppercase tracking-wider text-[#29ABE2]">
                      Featured
                    </span>
                  </div>

                  <a
                    href={`/blog/${featuredBlog.slug || featuredBlog.id}`}
                    className="group flex flex-col md:flex-row gap-0 overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all"
                  >
                    <div className="relative h-64 md:h-auto md:w-3/5 overflow-hidden">
                      <Image
                        src={featuredBlog.image}
                        alt={featuredBlog.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span
                        className="absolute left-4 top-4 rounded-full px-3 py-1 text-sm font-semibold text-white"
                        style={{ backgroundColor: featuredBlog.categoryColor }}
                      >
                        {featuredBlog.category}
                      </span>
                    </div>
                    <div className="flex flex-col justify-between p-6 md:w-2/5">
                      <div>
                        <h2 className="text-2xl font-bold text-[#4A4A4A] group-hover:text-[#29ABE2] transition-colors line-clamp-3">
                          {featuredBlog.title}
                        </h2>
                        <p className="mt-3 text-gray-500 line-clamp-3 text-sm leading-relaxed">
                          {featuredBlog.excerpt}
                        </p>
                      </div>
                      <div className="mt-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={featuredBlog.author.avatar}
                            alt={featuredBlog.author.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-[#4A4A4A] text-sm">
                              {featuredBlog.author.name}
                            </p>
                            <div className="flex gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {featuredBlog.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {featuredBlog.readTime} min read
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="inline-block rounded-lg bg-[#29ABE2] px-5 py-2.5 text-sm font-semibold text-white">
                          Read Article →
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              )}

              {/* Blog Grid */}
              {gridBlogs.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-8 h-[2px] bg-[#C9963A]" />
                    <span className="text-sm font-semibold uppercase tracking-wider text-[#C9963A]">
                      More Articles
                    </span>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {gridBlogs.map((blog) => (
                      <a
                        key={blog.id}
                        href={`/blog/${blog.slug || blog.id}`}
                        className="group overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1"
                      >
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <span
                            className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                            style={{ backgroundColor: blog.categoryColor }}
                          >
                            {blog.category}
                          </span>
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-[#4A4A4A] line-clamp-2 group-hover:text-[#29ABE2] transition-colors mb-2">
                            {blog.title}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                            {blog.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Image
                                src={blog.author.avatar}
                                alt={blog.author.name}
                                width={28}
                                height={28}
                                className="rounded-full object-cover"
                              />
                              <div className="text-xs text-gray-500">
                                <p className="font-medium text-[#4A4A4A]">
                                  {blog.author.name}
                                </p>
                                <p>{blog.date}</p>
                              </div>
                            </div>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {blog.readTime} min
                            </span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
