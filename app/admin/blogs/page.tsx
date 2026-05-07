"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Search, Eye, EyeOff } from "lucide-react";
import { Toast, useToast } from "@/components/admin/toast";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast, showToast, hideToast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (search) {
      setFiltered(
        blogs.filter(
          (b) =>
            b.title?.toLowerCase().includes(search.toLowerCase()) ||
            b.category?.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else {
      setFiltered(blogs);
    }
  }, [search, blogs]);

  const fetchBlogs = async () => {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });
    setBlogs(data || []);
    setFiltered(data || []);
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const { error } = await supabase.from("blogs").delete().eq("id", deleteId);

    setDeleteId(null);

    if (!error) {
      showToast("Blog deleted successfully!");
      fetchBlogs();
    } else {
      showToast("Error deleting blog", "error");
    }
  };

  const togglePublish = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from("blogs")
      .update({ published: !current })
      .eq("id", id);
    if (!error) {
      showToast(current ? "Blog unpublished!" : "Blog published!");
      fetchBlogs();
    } else {
      showToast("Error updating blog status", "error");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4A4A4A]">Blog Posts</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {filtered.length} posts total
          </p>
        </div>

        <a
          href="/admin/blogs/add"
          className="flex items-center gap-2 bg-[#29ABE2] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#29ABE2]/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Write Blog
        </a>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div style={{ width: "100%", overflowX: "scroll" }}>
          <table style={{ minWidth: "800px", width: "100%" }}>
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Author
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-gray-400"
                  >
                    Loading blogs...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-gray-400 font-medium">
                        No blog posts yet
                      </p>

                      <a
                        href="/admin/blogs/add"
                        className="text-[#29ABE2] text-sm hover:underline"
                      >
                        Write your first blog post
                      </a>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((blog: any, index: number) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm text-gray-400">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {blog.thumbnail && (
                          <img
                            src={blog.thumbnail}
                            alt={blog.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        )}
                        <p className="text-sm font-semibold text-[#4A4A4A] max-w-xs truncate">
                          {blog.title}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {blog.category ? (
                        <span className="px-2 py-1 bg-[#C9963A]/10 text-[#C9963A] text-xs rounded-full font-medium whitespace-nowrap">
                          {blog.category}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {blog.author || "—"}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium whitespace-nowrap ${
                          blog.published
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(blog.created_at).toLocaleDateString("en-PK", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {/* Publish/Unpublish */}
                        <button
                          onClick={() => togglePublish(blog.id, blog.published)}
                          className={`flex items-center gap-1 px-3 py-1.5 text-white text-xs rounded-lg font-medium transition-colors ${
                            blog.published
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {blog.published ? (
                            <>
                              <EyeOff className="h-3 w-3" /> Unpublish
                            </>
                          ) : (
                            <>
                              <Eye className="h-3 w-3" /> Publish
                            </>
                          )}
                        </button>
                        {/* Edit */}

                        <a
                          href={`/admin/blogs/edit/${blog.id}`}
                          className="flex items-center gap-1 px-3 py-1.5 bg-[#29ABE2] text-white text-xs rounded-lg font-medium hover:bg-[#29ABE2]/90 transition-colors"
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </a>
                        {/* Delete */}
                        <button
                          onClick={() => setDeleteId(blog.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg font-medium hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Blog Post?"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        confirmText="Yes, Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
