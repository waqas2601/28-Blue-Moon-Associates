"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Phone, MessageCircle, Search, Filter, Trash2 } from "lucide-react";
import { Toast, useToast } from "@/components/admin/toast";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterPurpose, setFilterPurpose] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const { toast, showToast, hideToast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchLeads = async () => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads(data || []);
    setFiltered(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    let result = leads;
    if (search) {
      result = result.filter(
        (lead) =>
          lead.name?.toLowerCase().includes(search.toLowerCase()) ||
          lead.phone?.includes(search) ||
          lead.society?.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (filterPurpose !== "All") {
      result = result.filter((lead) => lead.purpose === filterPurpose);
    }
    setFiltered(result);
  }, [search, filterPurpose, leads]);

  const purposes = [
    "All",
    "Buy a Property",
    "Sell My Property",
    "Investment Advice",
    "General Consultation",
  ];

  const handleDelete = async () => {
    if (!deleteId) return;

    const { error } = await supabase.from("leads").delete().eq("id", deleteId);

    setDeleteId(null);

    if (!error) {
      showToast("Lead deleted successfully!");
      fetchLeads();
    } else {
      showToast("Error deleting lead", "error");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#4A4A4A]">Leads</h1>
        <p className="text-gray-500 mt-1 text-sm">
          {filtered.length} of {leads.length} total leads
        </p>
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-[#4A4A4A] p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, society..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterPurpose}
              onChange={(e) => setFilterPurpose(e.target.value)}
              className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2] bg-white"
            >
              {purposes.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table with horizontal scroll */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="block w-full overflow-x-scroll">
          <table className="w-full" style={{ minWidth: "1100px" }}>
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Purpose
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Society
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-12 text-center text-gray-400"
                  >
                    Loading leads...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-12 text-center text-gray-400"
                  >
                    No leads found
                  </td>
                </tr>
              ) : (
                filtered.map((lead: any, index: number) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm text-gray-400">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-[#4A4A4A] whitespace-nowrap">
                        {lead.name}
                      </p>
                      {lead.email && (
                        <p className="text-xs text-gray-400">{lead.email}</p>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-sm text-[#29ABE2] hover:underline whitespace-nowrap"
                      >
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-4 py-4">
                      {lead.purpose ? (
                        <span className="px-2 py-1 bg-[#29ABE2]/10 text-[#29ABE2] text-xs rounded-full font-medium whitespace-nowrap">
                          {lead.purpose}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {lead.society || "—"}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {lead.property_type || "—"}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 max-w-[200px]">
                      <p className="truncate" title={lead.message}>
                        {lead.message || "—"}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      {lead.source_page ? (
                        <span className="px-2 py-1 bg-[#C9963A]/10 text-[#C9963A] text-xs rounded-full font-medium whitespace-nowrap">
                          {lead.source_page}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString("en-PK", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${lead.phone}`}
                          className="flex items-center gap-1 px-3 py-1.5 bg-[#29ABE2] text-white text-xs rounded-lg font-medium hover:bg-[#29ABE2]/90 transition-colors whitespace-nowrap"
                        >
                          <Phone className="h-3 w-3" />
                          Call
                        </a>

                        <a
                          href={`https://wa.me/${lead.phone?.replace(/[^0-9]/g, "")}?text=Hi ${lead.name}, I am from Blue Moon Associates regarding your inquiry.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-xs rounded-lg font-medium hover:bg-green-600 transition-colors whitespace-nowrap"
                        >
                          <MessageCircle className="h-3 w-3" />
                          WhatsApp
                        </a>
                        <button
                          onClick={() => setDeleteId(lead.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg font-medium hover:bg-red-600 transition-colors whitespace-nowrap"
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
        title="Delete Lead?"
        message="Are you sure you want to delete this lead? This action cannot be undone."
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
