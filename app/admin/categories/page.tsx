"use client"

import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Toast, useToast } from "@/components/admin/toast"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { toast, showToast, hideToast } = useToast()

  const fetchCategories = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: true })
      setCategories(data || [])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) fetchCategories()
    }
    window.addEventListener("pageshow", onPageShow)
    return () => window.removeEventListener("pageshow", onPageShow)
  }, [fetchCategories])

  const handleDelete = async () => {
    if (!deleteId) return
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", deleteId)
    setDeleteId(null)
    if (!error) {
      showToast("Category deleted!")
      fetchCategories()
    } else {
      showToast("Error deleting category", "error")
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4A4A4A]">Categories</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {categories.length} categories
          </p>
        </div>
        
       <a   href="/admin/categories/add"
          className="flex items-center gap-2 bg-[#29ABE2] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#29ABE2]/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </a>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Slug</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Description</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                  No categories yet
                </td>
              </tr>
            ) : (
              categories.map((cat, index) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-400">{index + 1}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-[#4A4A4A]">
                    {cat.name}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-[#29ABE2]/10 text-[#29ABE2] text-xs rounded-full">
                      {cat.slug}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {cat.description || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      
                     <a   href={`/admin/categories/edit/${cat.id}`}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[#29ABE2] text-white text-xs rounded-lg font-medium hover:bg-[#29ABE2]/90"
                      >
                        <Pencil className="h-3 w-3" />
                        Edit
                      </a>
                      <button
                        onClick={() => setDeleteId(cat.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg font-medium hover:bg-red-600"
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

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Category?"
        message="Are you sure? Blogs in this category will not be deleted but will lose their category."
        confirmText="Yes, Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  )
}