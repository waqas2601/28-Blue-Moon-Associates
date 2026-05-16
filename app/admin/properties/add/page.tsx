"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Toast, useToast } from "@/components/admin/toast";
import { uploadImage } from "@/lib/upload";
import RichTextEditor from "@/components/admin/rich-text-editor";

export default function AddPropertyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    society: "",
    type: "",
    price: "",
    area: "",
    beds: "",
    baths: "",
    location: "",
    map_url: "",
    description: "",
    images: "",
    amenities: "",
    status: "Available",
    featured: false,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadImage(file, "properties");
      if (url) urls.push(url);
    }

    const currentImages = formData.images
      ? formData.images
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean)
      : [];

    const allImages = [...currentImages, ...urls].join(", ");
    setFormData((prev) => ({ ...prev, images: allImages }));
    setUploadedImages((prev) => [...prev, ...urls]);
    setIsUploading(false);
  };

  const removeImage = (url: string) => {
    const current = formData.images
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean)
      .filter((i) => i !== url);
    setFormData((prev) => ({ ...prev, images: current.join(", ") }));
    setUploadedImages((prev) => prev.filter((i) => i !== url));
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

    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const { error } = await supabase.from("properties").insert([
      {
        title: formData.title,
        slug,
        society: formData.society,
        type: formData.type,
        price: formData.price,
        area: formData.area,
        beds: formData.beds ? parseInt(formData.beds) : 0,
        baths: formData.baths ? parseInt(formData.baths) : 0,
        location: formData.location,
        map_url: formData.map_url,
        description: formData.description,
        images: formData.images,
        amenities: formData.amenities,
        status: formData.status,
        featured: formData.featured,
      },
    ]);

    setIsLoading(false);

    if (error) {
      showToast("Error adding property: " + error.message, "error");
    } else {
      showToast("Property added successfully!");
      setTimeout(() => router.push("/admin/properties"), 1500);
    }
  };

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
          <h1 className="text-2xl font-bold text-[#4A4A4A]">Add Property</h1>
          <p className="text-gray-500 text-sm mt-1">
            Fill in the details to add a new property
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-[#4A4A4A] mb-4">
                Basic Information
              </h2>
              <div className="space-y-4">
                {/* Title */}
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

                {/* Society + Type */}
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

                {/* Price + Area */}
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

                {/* Beds + Baths */}
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

                {/* Location */}
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

                {/* Map URL */}
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Google Maps Link
                    <span className="text-gray-400 text-xs ml-2">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="map_url"
                    value={formData.map_url}
                    onChange={handleChange}
                    placeholder="Paste any Google Maps link here..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Works with any Google Maps link — share link, embed link, or
                    copied URL
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                    Description
                  </label>
                  <RichTextEditor
                    content={formData.description}
                    onChange={(content) =>
                      setFormData((prev) => ({ ...prev, description: content }))
                    }
                    placeholder="Describe the property..."
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-[#4A4A4A] mb-2">
                Property Images
              </h2>
              <p className="text-xs text-gray-400 mb-4">
                Upload multiple images. First image will be the main display
                image.
              </p>

              {/* Upload Button */}
              <label
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                  isUploading
                    ? "border-[#29ABE2] bg-[#29ABE2]/5"
                    : "border-gray-300 hover:border-[#29ABE2] hover:bg-gray-50"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  {isUploading ? (
                    <>
                      <Loader2 className="h-8 w-8 text-[#29ABE2] animate-spin" />
                      <p className="text-sm text-[#29ABE2] font-medium">
                        Uploading...
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-[#29ABE2]/10 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-[#29ABE2]"
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
                      <p className="text-sm text-gray-500">
                        <span className="font-medium text-[#29ABE2]">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG, WEBP up to 10MB
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>

              {/* Image Previews */}
              {formData.images && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {formData.images
                    .split(",")
                    .map((img) => img.trim())
                    .filter(Boolean)
                    .map((img, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={img}
                          alt={`Property image ${i + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        {/* First image badge */}
                        {i === 0 && (
                          <span className="absolute top-1 left-1 bg-[#29ABE2] text-white text-xs px-2 py-0.5 rounded-full">
                            Main
                          </span>
                        )}
                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => removeImage(img)}
                          className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs items-center justify-center hidden group-hover:flex"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>
              )}

              {/* Manual URL input */}
              <div className="mt-4">
                <p className="text-xs text-gray-400 mb-2">
                  Or paste image URLs manually (comma separated):
                </p>
                <textarea
                  name="images"
                  value={formData.images}
                  onChange={handleChange}
                  placeholder="https://image1.jpg, https://image2.jpg"
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#29ABE2] resize-none"
                />
              </div>
            </div>
            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-[#4A4A4A] mb-2">
                Amenities
              </h2>
              <p className="text-xs text-gray-400 mb-4">
                Select all available amenities for this property
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "Water",
                  "Gas",
                  "Electricity",
                  "Internet",
                  "Parking",
                  "Security",
                  "Mosque",
                  "Park",
                  "Swimming Pool",
                  "Gym",
                  "Generator",
                  "CCTV",
                ].map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities
                        .split(",")
                        .map((a) => a.trim())
                        .includes(amenity)}
                      onChange={(e) => {
                        const current = formData.amenities
                          ? formData.amenities
                              .split(",")
                              .map((a) => a.trim())
                              .filter(Boolean)
                          : [];
                        if (e.target.checked) {
                          setFormData((prev) => ({
                            ...prev,
                            amenities: [...current, amenity].join(","),
                          }));
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            amenities: current
                              .filter((a) => a !== amenity)
                              .join(","),
                          }));
                        }
                      }}
                      className="h-4 w-4 accent-[#29ABE2]"
                    />
                    <span className="text-sm text-[#4A4A4A]">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Settings */}
          <div className="space-y-6">
            {/* Status */}
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

                {/* Featured */}
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
                    Adding...
                  </>
                ) : (
                  "Add Property"
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
