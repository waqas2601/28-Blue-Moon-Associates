"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Eye } from "lucide-react";
import { Toast, useToast } from "@/components/admin/toast";
import { uploadImage } from "@/lib/upload";
import RichTextEditor from "@/components/admin/rich-text-editor";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { toast, showToast, hideToast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    thumbnail: "",
    category: "",
    author: "",
    published: false,
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    tags: "",
    read_time: "",
    related_blogs: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { id } = await params;

      // Fetch blog
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
          seo_title: data.seo_title || "",
          seo_description: data.seo_description || "",
          seo_keywords: data.seo_keywords || "",
          tags: data.tags || "",
          read_time: data.read_time || "",
          related_blogs: data.related_blogs || "",
        });
      }

      // Fetch categories
      const { data: cats } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });
      setCategories(cats || []);

      // Fetch all blogs except current
      const { data: blogs } = await supabase
        .from("blogs")
        .select("id, title")
        .neq("id", id)
        .order("created_at", { ascending: false });
      setAllBlogs(blogs || []);

      setIsFetching(false);
    };
    fetchData();
  }, [params]);

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const url = await uploadImage(file, "blogs");
    setIsUploading(false);

    if (url) {
      setFormData((prev) => ({ ...prev, thumbnail: url }));
    }
  };

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
        seo_title: formData.seo_title,
        seo_description: formData.seo_description,
        seo_keywords: formData.seo_keywords,
        tags: formData.tags,
        read_time: formData.read_time,
        related_blogs: formData.related_blogs,
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

  const handleLivePreview = () => {
    const previewData = {
      title: formData.title || "Untitled Blog",
      excerpt: formData.excerpt || "",
      content: formData.content || "",
      thumbnail: formData.thumbnail || "",
      category: formData.category || "",
      author: formData.author || "",
      created_at: new Date().toISOString(),
    };
    localStorage.setItem("blog_preview", JSON.stringify(previewData));
    window.open("/blog/preview", "_blank");
  };

  const getRelatedIds = (related: string) =>
    related
      ? related
          .split(",")
          .map((b) => b.trim())
          .filter(Boolean)
      : [];

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
        <div className="flex gap-2">
          {/* Live Preview */}

          <button
            type="button"
            onClick={handleLivePreview}
            className="flex items-center gap-2 border-2 border-[#29ABE2] text-[#29ABE2] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#29ABE2]/10 transition-colors"
          >
            <Eye className="h-4 w-4" />
            Live Preview
          </button>
        </div>
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
                    Short Summary
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

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Blog Content <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                content={formData.content}
                onChange={(content) =>
                  setFormData((prev) => ({ ...prev, content }))
                }
                placeholder="Write your blog content here..."
              />
            </div>
          </div>

          {/* Right — Settings */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">
                Blog Settings
              </h2>
              <div className="space-y-4">
                {/* Thumbnail */}
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Thumbnail Image
                  </label>

                  {/* Upload area */}
                  <label
                    className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      isUploading
                        ? "border-[#29ABE2] bg-[#29ABE2]/5"
                        : "border-gray-300 hover:border-[#29ABE2] hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {isUploading ? (
                        <>
                          <Loader2 className="h-6 w-6 text-[#29ABE2] animate-spin" />
                          <p className="text-xs text-[#29ABE2] font-medium">
                            Uploading...
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="w-8 h-8 bg-[#29ABE2]/10 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-[#29ABE2]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <p className="text-xs text-gray-500">
                            <span className="font-medium text-[#29ABE2]">
                              Click to upload
                            </span>
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>

                  {/* Preview */}
                  {formData.thumbnail && (
                    <div className="relative mt-2 group">
                      <img
                        src={formData.thumbnail}
                        alt="Thumbnail preview"
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, thumbnail: "" }))
                        }
                        className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs items-center justify-center hidden group-hover:flex"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  {/* Manual URL */}
                  <div className="mt-2">
                    <p className="text-xs text-gray-400 mb-1">Or paste URL:</p>
                    <input
                      type="text"
                      name="thumbnail"
                      value={formData.thumbnail}
                      onChange={handleChange}
                      placeholder="https://image.jpg"
                      className="w-full px-4 py-2 text-[#4A4A4A] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                    />
                  </div>
                </div>
                {/* Category */}
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
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
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

                {/* Read Time */}
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Read Time
                  </label>
                  <input
                    type="text"
                    name="read_time"
                    value={formData.read_time}
                    onChange={handleChange}
                    placeholder="e.g. 5 min read"
                    className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Tags
                    <span className="text-gray-400 text-xs ml-2">
                      (comma separated)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Faisal Hills, Investment, Plots"
                    className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                  />
                </div>
                {/* Related Blogs */}
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Related Blogs
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                    {allBlogs.length === 0 ? (
                      <p className="text-xs text-gray-400">
                        No other blogs available
                      </p>
                    ) : (
                      allBlogs.map((blog) => (
                        <label
                          key={blog.id}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={getRelatedIds(
                              formData.related_blogs,
                            ).includes(String(blog.id))}
                            onChange={(e) => {
                              const current = getRelatedIds(
                                formData.related_blogs,
                              );
                              const blogId = String(blog.id);
                              if (e.target.checked) {
                                setFormData((prev) => ({
                                  ...prev,
                                  related_blogs: [...current, blogId].join(","),
                                }));
                              } else {
                                setFormData((prev) => ({
                                  ...prev,
                                  related_blogs: current
                                    .filter((b) => b !== blogId)
                                    .join(","),
                                }));
                              }
                            }}
                            className="h-4 w-4 accent-[#29ABE2]"
                          />
                          <span className="text-sm text-[#4A4A4A] line-clamp-1">
                            {blog.title}
                          </span>
                        </label>
                      ))
                    )}
                  </div>
                </div>

                {/* SEO Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-bold text-[#4A4A4A] mb-4 flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-[#29ABE2]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    SEO Settings
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                        SEO Title
                      </label>
                      <input
                        type="text"
                        name="seo_title"
                        value={formData.seo_title}
                        onChange={handleChange}
                        placeholder="SEO optimized title..."
                        className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                        Meta Description
                      </label>
                      <textarea
                        name="seo_description"
                        value={formData.seo_description}
                        onChange={handleChange}
                        placeholder="Brief description for search engines..."
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2] resize-none"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        {formData.seo_description.length}/160 characters
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                        Keywords
                      </label>
                      <input
                        type="text"
                        name="seo_keywords"
                        value={formData.seo_keywords}
                        onChange={handleChange}
                        placeholder="real estate, faisal hills, investment"
                        className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                      />
                    </div>
                  </div>
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
