"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Toast, useToast } from "@/components/admin/toast";

const colorOptions = [
  { label: "Blue", value: "#29ABE2" },
  { label: "Gold", value: "#C9963A" },
  { label: "Green", value: "#22c55e" },
  { label: "Red", value: "#ef4444" },
  { label: "Purple", value: "#8b5cf6" },
  { label: "Gray", value: "#6b7280" },
];

export default function AddCategoryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#29ABE2",
    meta_title: "",
    meta_description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name" && {
        slug: value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
        meta_title: `${value} — Blue Moon Associates Blog`,
      }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.from("categories").insert([
      {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        color: formData.color,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
      },
    ]);

    setIsLoading(false);

    if (error) {
      showToast("Error: " + error.message, "error");
    } else {
      showToast("Category added successfully!");
      setTimeout(() => router.push("/admin/categories"), 1500);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <a
          href="/admin/categories"
          className="text-gray-500 hover:text-[#29ABE2] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </a>
        <div>
          <h1 className="text-2xl font-bold text-[#4A4A4A]">Add Category</h1>
          <p className="text-gray-500 text-sm mt-1">
            Create a new blog category
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">
                Basic Information
              </h2>
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Investment"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                    required
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Slug
                    <span className="text-gray-400 text-xs ml-2">
                      (auto generated from name)
                    </span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      /blog/category/
                    </span>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      placeholder="investment"
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief description of this category..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* SEO */}
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
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="meta_title"
                    value={formData.meta_title}
                    onChange={handleChange}
                    placeholder="Investment — Blue Moon Associates Blog"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Meta Description
                    <span className="text-gray-400 text-xs ml-2">
                      150-160 characters
                    </span>
                  </label>
                  <textarea
                    name="meta_description"
                    value={formData.meta_description}
                    onChange={handleChange}
                    placeholder="Browse all investment related articles on Blue Moon Associates blog..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2] resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {formData.meta_description.length}/160 characters
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Settings */}
          <div className="space-y-6">
            {/* Color */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">
                Badge Color
              </h2>
              <p className="text-xs text-gray-400 mb-4">
                Color used for category badge on blog cards
              </p>

              {/* Preview */}
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="px-3 py-1 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: formData.color }}
                >
                  {formData.name || "Category"}
                </span>
                <span className="text-xs text-gray-400">Preview</span>
              </div>

              {/* Color Options */}
              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, color: color.value }))
                    }
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                      formData.color === color.value
                        ? "border-[#4A4A4A] bg-gray-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shrink-0"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="text-xs text-[#4A4A4A]">
                      {color.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Custom color */}
              <div className="mt-3">
                <label className="block text-xs text-gray-400 mb-1">
                  Custom color:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        color: e.target.value,
                      }))
                    }
                    className="h-8 w-8 rounded cursor-pointer border border-gray-200"
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        color: e.target.value,
                      }))
                    }
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#29ABE2] text-white py-3 rounded-lg font-semibold hover:bg-[#29ABE2]/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Category"
                )}
              </button>

              <a
                href="/admin/categories"
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
