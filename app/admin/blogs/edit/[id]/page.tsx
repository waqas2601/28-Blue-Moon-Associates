"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Eye } from "lucide-react";
import { useToast } from "@/components/admin/toast";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    thumbnail: "",
    category: "",
    author: "",
    published: false,
  });

  useEffect(() => {
    const fetchBlog = async () => {
      const { id } = await params;
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setFormData({
          title: data.title || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          thumbnail: data.thumbnail || "",
          category: data.category || "",
          author: data.author || "",
          published: data.published || false,
        });
      }
      setIsFetching(false);
    };
    fetchBlog();
  }, [params]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { id } = await params;

    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const { error } = await supabase
      .from("blogs")
      .update({
        title: formData.title,
        slug,
        excerpt: formData.excerpt,
        content: formData.content,
        thumbnail: formData.thumbnail,
        category: formData.category,
        author: formData.author,
        published: formData.published,
      })
      .eq("id", id);

    setIsLoading(false);

    if (error) {
      showToast("Error updating blog: " + error.message, "error");
    } else {
      showToast("Blog updated successfully!");
      setTimeout(() => router.push("/admin/blogs"), 1500);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#29ABE2] mx-auto mb-2" />
          <p className="text-gray-400 text-sm">Loading blog post...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="/admin/blogs"
            className="flex items-center gap-2 text-gray-500 hover:text-[#29ABE2] transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </a>
          <div>
            <h1 className="text-2xl font-bold text-[#4A4A4A]">
              Edit Blog Post
            </h1>
            <p className="text-gray-500 text-sm mt-1">Update blog content</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2 border-2 border-[#29ABE2] text-[#29ABE2] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#29ABE2]/10 transition-colors"
        >
          <Eye className="h-4 w-4" />
          {showPreview ? "Hide Preview" : "Preview"}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Blog Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Blog title..."
                    className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Excerpt
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder="Short summary..."
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Blog Content <span className="text-red-500">*</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your blog content here..."
                rows={20}
                className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2] resize-none"
                required
              />
            </div>

            {/* Preview */}
            {showPreview && formData.content && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">
                  Preview
                </h2>
                {formData.thumbnail && (
                  <img
                    src={formData.thumbnail}
                    alt="thumbnail"
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                )}
                <h1 className="text-2xl font-bold text-[#4A4A4A] mb-4">
                  {formData.title}
                </h1>
                <p className="text-gray-500 text-sm mb-6">{formData.excerpt}</p>
                <div className="prose max-w-none text-[#4A4A4A]/80 whitespace-pre-wrap text-sm leading-relaxed">
                  {formData.content}
                </div>
              </div>
            )}
          </div>

          {/* Right — Settings */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">
                Blog Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Thumbnail URL
                  </label>
                  <input
                    type="text"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    placeholder="https://image.jpg"
                    className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                  />
                  {formData.thumbnail && (
                    <img
                      src={formData.thumbnail}
                      alt="preview"
                      className="mt-2 w-full h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2] bg-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Investment">Investment</option>
                    <option value="Market Trends">Market Trends</option>
                    <option value="Guides">Guides</option>
                    <option value="News">News</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="e.g. Shafaat Khan"
                    className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                  />
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    name="published"
                    id="published"
                    checked={formData.published}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#29ABE2]"
                  />
                  <label
                    htmlFor="published"
                    className="text-sm font-medium text-[#4A4A4A] cursor-pointer"
                  >
                    Published
                    <p className="text-xs text-gray-400 font-normal">
                      Uncheck to save as draft
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#29ABE2] text-white py-3 rounded-lg font-semibold hover:bg-[#29ABE2]/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Blog Post"
                )}
              </button>

              <a
                href="/admin/blogs"
                className="block text-center mt-3 text-sm text-gray-400 hover:text-gray-600"
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      </form>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
