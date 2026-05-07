"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Toast, useToast } from "@/components/admin/toast";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast, showToast, hideToast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    if (search) {
      setFiltered(
        properties.filter(
          (p) =>
            p.title?.toLowerCase().includes(search.toLowerCase()) ||
            p.society?.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else {
      setFiltered(properties);
    }
  }, [search, properties]);

  const fetchProperties = async () => {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });
    setProperties(data || []);
    setFiltered(data || []);
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", deleteId);

    setDeleteId(null);

    if (!error) {
      showToast("Property deleted successfully!");
      fetchProperties();
    } else {
      showToast("Error deleting property", "error");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4A4A4A]">Properties</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {filtered.length} properties listed
          </p>
        </div>

        <a
          href="/admin/properties/add"
          className="flex items-center gap-2 bg-[#29ABE2] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#29ABE2]/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Property
        </a>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or society..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div
          style={{
            width: "100%",
            overflowX: "scroll",
          }}
        >
          <table style={{ minWidth: "900px", width: "100%" }}>
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Society
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Area
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Featured
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
                    colSpan={9}
                    className="px-4 py-12 text-center text-gray-400"
                  >
                    Loading properties...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-gray-400 font-medium">
                        No properties yet
                      </p>

                      <a
                        href="/admin/properties/add"
                        className="text-[#29ABE2] text-sm hover:underline"
                      >
                        Add your first property
                      </a>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((property: any, index: number) => (
                  <tr
                    key={property.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm text-gray-400">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-[#4A4A4A] whitespace-nowrap">
                        {property.title}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {property.society || "—"}
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 bg-[#C9963A]/10 text-[#C9963A] text-xs rounded-full font-medium whitespace-nowrap">
                        {property.type || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-[#29ABE2] whitespace-nowrap">
                      {property.price || "—"}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {property.area || "—"}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium whitespace-nowrap ${
                          property.status === "Available"
                            ? "bg-green-100 text-green-600"
                            : property.status === "Sold"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {property.status || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          property.featured
                            ? "bg-[#29ABE2]/10 text-[#29ABE2]"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {property.featured ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={`/admin/properties/edit/${property.id}`}
                          className="flex items-center gap-1 px-3 py-1.5 bg-[#29ABE2] text-white text-xs rounded-lg font-medium hover:bg-[#29ABE2]/90 transition-colors"
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </a>
                        <button
                          onClick={() => setDeleteId(property.id)}
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
        title="Delete Property?"
        message="Are you sure you want to delete this property? This action cannot be undone."
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
