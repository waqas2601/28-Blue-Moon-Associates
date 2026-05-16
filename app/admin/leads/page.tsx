"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Search,
  Filter,
  Phone,
  MessageCircle,
  Trash2,
  X,
  Eye,
} from "lucide-react";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Toast, useToast } from "@/components/admin/toast";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  purpose: string;
  society: string;
  property_type: string;
  message: string;
  source_page: string;
  created_at: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filtered, setFiltered] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [filterPurpose, setFilterPurpose] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast, showToast, hideToast } = useToast();

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      setLeads(data || []);
      setFiltered(data || []);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) fetchLeads();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [fetchLeads]);

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

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("leads").delete().eq("id", deleteId);
    setDeleteId(null);
    if (!error) {
      showToast("Lead deleted successfully!");
      if (selectedLead?.id === deleteId) setSelectedLead(null);
      fetchLeads();
    } else {
      showToast("Error deleting lead", "error");
    }
  };

  const purposes = [
    "All",
    "Buy a Property",
    "Sell My Property",
    "Investment Advice",
    "General Consultation",
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4A4A4A]">Leads</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {filtered.length} of {leads.length} total leads
          </p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, society..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterPurpose}
              onChange={(e) => setFilterPurpose(e.target.value)}
              className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2] bg-white"
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

      {/* Clean Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 ">
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
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Purpose
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Society
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Action
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
                    Loading leads...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-gray-400"
                  >
                    No leads found
                  </td>
                </tr>
              ) : (
                filtered.map((lead, index) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="px-4 py-3 text-sm text-gray-400">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-[#4A4A4A]">
                        {lead.name}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#29ABE2]">
                      {lead.phone}
                    </td>
                    <td className="px-4 py-3">
                      {lead.purpose ? (
                        <span className="px-2 py-1 bg-[#29ABE2]/10 text-[#29ABE2] text-xs rounded-full font-medium">
                          {lead.purpose}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {lead.society || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(lead.created_at).toLocaleDateString("en-PK", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLead(lead);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[#29ABE2] text-white text-xs rounded-lg font-medium hover:bg-[#29ABE2]/90 transition-colors"
                      >
                        <Eye className="h-3 w-3" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Popup */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedLead(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-[#4A4A4A]">
                  {selectedLead.name}
                </h2>
                <p className="text-sm text-gray-400 mt-0.5">
                  {new Date(selectedLead.created_at).toLocaleDateString(
                    "en-PK",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Details */}
            <div className="p-6 space-y-4">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#29ABE2]/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-[#29ABE2]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="text-sm font-semibold text-[#4A4A4A]">
                    {selectedLead.phone}
                  </p>
                </div>
              </div>

              {/* Email */}
              {selectedLead.email && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#29ABE2]/10 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      className="h-4 w-4 text-[#29ABE2]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-sm font-semibold text-[#4A4A4A]">
                      {selectedLead.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Grid Details */}
              <div className="grid grid-cols-2 gap-4 py-2">
                {selectedLead.purpose && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Purpose</p>
                    <p className="text-sm font-semibold text-[#29ABE2]">
                      {selectedLead.purpose}
                    </p>
                  </div>
                )}
                {selectedLead.society && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Society</p>
                    <p className="text-sm font-semibold text-[#4A4A4A]">
                      {selectedLead.society}
                    </p>
                  </div>
                )}
                {selectedLead.property_type && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Property Type</p>
                    <p className="text-sm font-semibold text-[#4A4A4A]">
                      {selectedLead.property_type}
                    </p>
                  </div>
                )}
                {selectedLead.source_page && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Source</p>
                    <p className="text-sm font-semibold text-[#C9963A]">
                      {selectedLead.source_page}
                    </p>
                  </div>
                )}
              </div>

              {/* Message */}
              {selectedLead.message && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-2">Message</p>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed">
                    "{selectedLead.message}"
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <a
                href={`tel:${selectedLead.phone}`}
                className="flex-1 flex items-center justify-center gap-2 bg-[#29ABE2] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#29ABE2]/90 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>

              <a
                href={`https://wa.me/${selectedLead.phone?.replace(/[^0-9]/g, "")}?text=Hi ${selectedLead.name}, I am from Blue Moon Associates regarding your inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <button
                onClick={() => {
                  setDeleteId(selectedLead.id);
                  setSelectedLead(null);
                }}
                className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
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
