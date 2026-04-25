"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Calendar, Clock, Share2, MessageCircle, Tag } from "lucide-react";
import { useState } from "react";

export default function BlogPostPage() {
  const [contactForm, setContactForm] = useState({ name: "", phone: "" });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    setContactForm({ name: "", phone: "" });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-20">
        {/* Hero Image Section */}
        <div className="relative w-full h-[500px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=500&fit=crop"
            alt="Blog post hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="mb-4 inline-block px-4 py-2 bg-[#C9963A] text-white text-sm font-semibold rounded">
              Investment Strategy
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
              Smart Real Estate Investment Tips for 2025
            </h1>
            <p className="text-white/80 flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              March 15, 2025
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content (2/3) */}
            <div className="lg:col-span-2">
              {/* Author Section */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Author"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-[#4A4A4A]">Ahmed Hassan</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      March 15, 2025
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />8 min read
                    </span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <article className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Real estate investment has become one of the most sought-after
                  avenues for building long-term wealth and financial security.
                  With the real estate market evolving rapidly, it&apos;s
                  crucial to understand the latest trends and strategies that
                  can help you make informed investment decisions.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Whether you&apos;re a first-time investor or someone looking
                  to expand your portfolio, this comprehensive guide will walk
                  you through the essential tips and strategies for successful
                  real estate investment in 2025.
                </p>

                <h2 className="text-2xl font-bold text-[#29ABE2] mt-8 mb-4">
                  Understanding Market Dynamics
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  The real estate market is influenced by various factors
                  including interest rates, economic growth, and demographic
                  trends. Before making any investment decision, it&apos;s
                  essential to conduct thorough market research and understand
                  the current market conditions in your target location.
                </p>

                {/* Highlighted Quote Box */}
                <div className="bg-[#C9963A]/10 border-l-4 border-[#C9963A] px-6 py-4 my-8 rounded">
                  <p className="text-[#4A4A4A] font-semibold italic">
                    "Location, location, location—this timeless real estate
                    mantra remains as relevant today as ever. Investing in
                    properties in high-growth areas can significantly increase
                    your returns over time."
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-[#29ABE2] mt-8 mb-4">
                  Key Investment Strategies
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  There are multiple strategies you can employ when investing in
                  real estate. Here are some of the most effective approaches:
                </p>

                <ul className="list-disc list-inside space-y-3 my-6 text-gray-700">
                  <li>
                    <strong>Buy and Hold Strategy:</strong> Purchase properties
                    with long-term appreciation potential and hold them for
                    years to maximize returns.
                  </li>
                  <li>
                    <strong>Fix and Flip:</strong> Acquire undervalued
                    properties, renovate them, and sell for profit within a
                    shorter timeframe.
                  </li>
                  <li>
                    <strong>Rental Properties:</strong> Invest in properties to
                    generate steady rental income while building equity.
                  </li>
                  <li>
                    <strong>Commercial Real Estate:</strong> Explore
                    opportunities in office spaces, retail centers, and
                    industrial properties for higher returns.
                  </li>
                </ul>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Each strategy has its own advantages and risks. The key is to
                  choose an approach that aligns with your financial goals, risk
                  tolerance, and available capital.
                </p>

                <p className="text-gray-700 leading-relaxed mb-8">
                  By staying informed, conducting thorough due diligence, and
                  working with experienced professionals, you can navigate the
                  real estate market with confidence and build a successful
                  investment portfolio.
                </p>
              </article>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-8 pt-8 border-t border-gray-200">
                {["Investment", "Islamabad", "Real Estate", "2025"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-2 px-4 py-2 bg-[#29ABE2]/10 text-[#29ABE2] rounded-full text-sm font-medium"
                    >
                      <Tag className="w-4 h-4" />
                      {tag}
                    </span>
                  ),
                )}
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-4 pt-8 border-t border-gray-200">
                <span className="text-[#4A4A4A] font-semibold flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share:
                </span>

                {/* Facebook */}

                <a
                  href="https://facebook.com"
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

                {/* Twitter/X */}

                <a
                  href="https://twitter.com"
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

                {/* WhatsApp */}

                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#25D366] text-white rounded-full hover:bg-[#20ba58] transition"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right Sidebar (1/3) */}
            <div className="lg:col-span-1">
              {/* Related Posts */}
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#4A4A4A] mb-4">
                    Related Posts
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Market Trends in 2025",
                        date: "March 12, 2025",
                        image:
                          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=150&fit=crop",
                      },
                      {
                        title: "Financing Your Real Estate Dreams",
                        date: "March 10, 2025",
                        image:
                          "https://images.unsplash.com/photo-1554224311-beee415c15fa?w=200&h=150&fit=crop",
                      },
                      {
                        title: "Commercial vs Residential: A Complete Guide",
                        date: "March 8, 2025",
                        image:
                          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=150&fit=crop",
                      },
                    ].map((post, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="flex gap-3 group hover:opacity-75 transition"
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#4A4A4A] group-hover:text-[#29ABE2] line-clamp-2">
                            {post.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {post.date}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contact Card */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="text-lg font-bold text-[#4A4A4A] mb-2">
                    Interested in investing?
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Get in touch with our experts for personalized guidance.
                  </p>

                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 text-[#4A4A4A] rounded focus:outline-none focus:ring-2 focus:ring-[#29ABE2] text-sm"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={contactForm.phone}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 text-[#4A4A4A] rounded focus:outline-none focus:ring-2 focus:ring-[#29ABE2] text-sm"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#29ABE2] text-white py-2 rounded font-semibold hover:bg-[#2196d0] transition text-sm"
                    >
                      Send Inquiry
                    </button>
                  </form>
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
