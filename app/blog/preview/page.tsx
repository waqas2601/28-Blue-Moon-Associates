"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Calendar, Tag, MessageCircle, Share2 } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function BlogPreviewPage() {
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("blog_preview");
    if (data) {
      setPost(JSON.parse(data));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#29ABE2]" />
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-2">No preview data found</p>
            <p className="text-gray-300 text-sm">
              Please use the Live Preview button from the blog editor
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Preview Banner */}
      <div className="bg-[#C9963A] text-white text-center py-2 px-4 text-sm font-medium flex items-center justify-center gap-4 fixed top-0 left-0 right-0 z-[999]">
        <span>👁️ Live Preview Mode — Changes are not saved yet</span>
        <button
          onClick={() => window.close()}
          className="underline hover:no-underline"
        >
          Close Preview
        </button>
      </div>

      <main className="min-h-screen bg-white" style={{ paddingTop: "84px" }}>
        {/* Hero */}
        <div className="relative w-full h-[500px] overflow-hidden">
          {post.thumbnail ? (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-400">No thumbnail</p>
            </div>
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            {post.category && (
              <div className="mb-4 inline-block px-4 py-2 bg-[#C9963A] text-white text-sm font-semibold rounded-full">
                {post.category}
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
              {post.title || "Untitled Blog"}
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
              {post.excerpt && (
                <p className="text-lg text-gray-500 mb-8 pb-8 border-b border-gray-200 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Rich Text Content */}
              <div
                className="prose prose-lg max-w-none text-[#4A4A4A]"
                dangerouslySetInnerHTML={{
                  __html: post.content || "<p>No content yet.</p>",
                }}
              />

              {/* Tags */}
              {post.category && (
                <div className="flex flex-wrap gap-3 mt-10 pt-8 border-t border-gray-200">
                  <span className="flex items-center gap-2 px-4 py-2 bg-[#29ABE2]/10 text-[#29ABE2] rounded-full text-sm font-medium">
                    <Tag className="w-4 h-4" />
                    {post.category}
                  </span>
                </div>
              )}

              {/* Share */}
              <div className="flex items-center gap-4 pt-8 border-t border-gray-200 mt-8">
                <span className="text-[#4A4A4A] font-semibold flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share:
                </span>
                <div className="p-3 bg-[#1877F2] text-white rounded-full">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </div>
                <div className="p-3 bg-black text-white rounded-full">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div className="p-3 bg-[#25D366] text-white rounded-full">
                  <MessageCircle className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h4 className="text-lg font-bold text-[#4A4A4A] mb-2">
                    Interested in investing?
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Get in touch with our experts.
                  </p>

                  <a
                    href="/contact"
                    className="block w-full text-center bg-[#29ABE2] text-white py-2.5 rounded-lg font-semibold text-sm mb-3"
                  >
                    Contact Us
                  </a>

                  <a
                    href="https://wa.me/923369218748"
                    className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-2.5 rounded-lg font-semibold text-sm"
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
