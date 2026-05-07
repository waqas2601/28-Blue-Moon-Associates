"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Toast, useToast } from "@/components/admin/toast";

export default function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { toast, showToast, hideToast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    society: "",
    type: "",
    price: "",
    area: "",
    beds: "",
    baths: "",
    location: "",
    description: "",
    images: "",
    status: "Available",
    featured: false,
  });

  useEffect(() => {
    const fetchProperty = async () => {
      const { id } = await params;
      const { data } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setFormData({
          title: data.title || "",
          society: data.society || "",
          type: data.type || "",
          price: data.price || "",
          area: data.area || "",
          beds: data.beds?.toString() || "",
          baths: data.baths?.toString() || "",
          location: data.location || "",
          description: data.description || "",
          images: data.images || "",
          status: data.status || "Available",
          featured: data.featured || false,
        });
      }
      setIsFetching(false);
    };
    fetchProperty();
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
      .from("properties")
      .update({
        title: formData.title,
        slug,
        society: formData.society,
        type: formData.type,
        price: formData.price,
        area: formData.area,
        beds: formData.beds ? parseInt(formData.beds) : 0,
        baths: formData.baths ? parseInt(formData.baths) : 0,
        location: formData.location,
        description: formData.description,
        images: formData.images,
        status: formData.status,
        featured: formData.featured,
      })
      .eq("id", id);

    setIsLoading(false);

    if (error) {
      {
        toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        );
      }
    } else {
      showToast("Property updated successfully!");
      setTimeout(() => router.push("/admin/properties"), 1500);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#29ABE2] mx-auto mb-2" />
          <p className="text-gray-400 text-sm">Loading property...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <a
          href="/admin/properties"
          className="flex items-center gap-2 text-gray-500 hover:text-[#29ABE2] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </a>
        <div>
          <h1 className="text-2xl font-bold text-[#4A4A4A]">Edit Property</h1>
          <p className="text-gray-500 text-sm mt-1">Update property details</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">
                Basic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Property Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. 10 Marla Residential Plot"
                    className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                      Society <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="society"
                      value={formData.society}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2] bg-white"
                      required
                    >
                      <option value="">Select Society</option>
                      <option value="Faisal Hills">Faisal Hills</option>
                      <option value="Multi Garden B-17">
                        Multi Garden B-17
                      </option>
                      <option value="Faisal Town">Faisal Town</option>
                      <option value="Faisal Town Phase II">
                        Faisal Town Phase II
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                      Property Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2] bg-white"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Plot">Plot</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                      Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="e.g. PKR 45 Lac"
                      className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                      Area <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      placeholder="e.g. 10 Marla"
                      className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      name="beds"
                      value={formData.beds}
                      onChange={handleChange}
                      placeholder="e.g. 3"
                      min="0"
                      className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      name="baths"
                      value={formData.baths}
                      onChange={handleChange}
                      placeholder="e.g. 2"
                      min="0"
                      className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Location / Block
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Block A, Faisal Hills"
                    className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the property..."
                    rows={5}
                    className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-[#4A4A4A] mb-2">Images</h2>
              <p className="text-xs text-gray-400 mb-4">
                Paste image URLs separated by commas.
              </p>
              <textarea
                name="images"
                value={formData.images}
                onChange={handleChange}
                placeholder="https://image1.jpg, https://image2.jpg"
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2] resize-none"
              />
            </div>
          </div>

          {/* Right — Settings */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">
                Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 text-[#4A4A4A] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2] bg-white"
                  >
                    <option value="Available">Available</option>
                    <option value="Sold">Sold</option>
                    <option value="Under Negotiation">Under Negotiation</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    name="featured"
                    id="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#29ABE2]"
                  />
                  <label
                    htmlFor="featured"
                    className="text-sm font-medium text-[#4A4A4A] cursor-pointer"
                  >
                    Featured Property
                    <p className="text-xs text-gray-400 font-normal">
                      Show on homepage
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
                  "Update Property"
                )}
              </button>

              <a
                href="/admin/properties"
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
