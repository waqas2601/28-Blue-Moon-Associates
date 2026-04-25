"use client";

import { useState } from "react";
import { ArrowRight, Calendar, User } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const categories = [
  "All",
  "Investment",
  "Market Trends",
  "Guides",
  "News",
  "Lifestyle",
];

const blogPosts = [
  {
    id: 1,
    title: "Top Investment Areas in Islamabad 2025",
    category: "Investment",
    date: "March 15, 2025",
    excerpt:
      "Discover the most promising investment opportunities in Islamabad this year. Learn which areas are seeing the highest growth potential.",
    author: "Sarah Ahmed",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Why Rawalpindi is the Next Big Property Market",
    category: "Market Trends",
    date: "March 12, 2025",
    excerpt:
      "Rawalpindi's real estate market is experiencing unprecedented growth. Explore the factors driving this transformation.",
    author: "Ahmed Hassan",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    image:
      "https://images.unsplash.com/photo-1500595046891-8e86bb0a5a86?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "How to Choose the Right Property Developer",
    category: "Guides",
    date: "March 10, 2025",
    excerpt:
      "A comprehensive guide to evaluating developers before investing. Know what to look for in track record and credentials.",
    author: "Fatima Khan",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Understanding Payment Plans in Pakistan Real Estate",
    category: "Guides",
    date: "March 8, 2025",
    excerpt:
      "Navigate the various payment plan options available. Learn about installment structures and flexible payment options.",
    author: "Muhammad Ali",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    image:
      "https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Best Housing Schemes in Lahore 2025",
    category: "News",
    date: "March 5, 2025",
    excerpt:
      "Explore the top-rated housing schemes in Lahore. Compare amenities, locations, and investment returns.",
    author: "Aisha Malik",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    image:
      "https://images.unsplash.com/photo-1554995207-c18231b6ce4e?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Tips for First Time Home Buyers in Pakistan",
    category: "Lifestyle",
    date: "March 1, 2025",
    excerpt:
      "Essential tips and tricks for first-time buyers. Avoid common mistakes and make informed decisions.",
    author: "Hassan Ali",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Banner */}
      <section className="relative min-h-[400px] flex items-center justify-center pt-20">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=600&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <p className="text-[#C9963A] text-sm font-semibold uppercase tracking-widest mb-4">
            Blog & Media
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Latest News & Insights
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Stay updated with industry trends, investment insights, and expert
            guidance
          </p>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="sticky top-0 z-50 bg-white shadow-md py-4">
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
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-gray-200">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#C9963A] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#4A4A4A] mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 mb-4 pt-4 border-t border-gray-200">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {post.author}
                      </span>
                    </div>

                    {/* Read More Link */}
                    <a
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-[#29ABE2] font-semibold hover:gap-3 transition-all duration-300"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No posts found in this category. Try another filter.
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
