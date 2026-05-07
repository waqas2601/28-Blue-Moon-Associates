"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MapPin, Phone, Bed, Bath, Maximize2, Loader2 } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { supabase } from "@/lib/supabase";
import { ConfirmPopup, SuccessPopup } from "@/components/success-popup";

type TabType = "overview" | "payment" | "amenities" | "location";

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      const slug = params.slug as string;

      // Try by slug first then by id
      let { data } = await supabase
        .from("properties")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!data) {
        const { data: byId } = await supabase
          .from("properties")
          .select("*")
          .eq("id", slug)
          .single();
        data = byId;
      }

      setProperty(data);
      setIsLoading(false);
    };
    fetchProperty();
  }, [params.slug]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSending(true);

    const { error } = await supabase.from("leads").insert([
      {
        name: formData.name,
        phone: formData.phone,
        email: "",
        purpose: "Buy a Property",
        society: property?.society || "",
        property_type: property?.type || "",
        message: formData.message || `I am interested in ${property?.title}`,
        source_page: `Property - ${property?.title} - ${property?.society}`,
      },
    ]);

    setIsSending(false);
    setShowConfirm(false);

    if (error) {
      alert("Something went wrong. Please try again.");
    } else {
      setShowSuccess(true);
      setFormData({ name: "", phone: "", message: "" });
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#29ABE2] mx-auto mb-3" />
            <p className="text-gray-400">Loading property...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!property) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#4A4A4A] mb-2">
              Property Not Found
            </h2>
            <p className="text-gray-400 mb-4">
              This property may have been removed or doesn't exist.
            </p>

            <a
              href="/properties"
              className="bg-[#29ABE2] text-white px-6 py-3 rounded-lg font-semibold"
            >
              Browse Properties
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const images = property.images
    ? property.images.split(",").map((img: string) => img.trim())
    : [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Image Gallery */}
        <div className="bg-white pt-20">
          {/* Main Image */}
          <div className="h-[500px] w-full overflow-hidden bg-gray-200">
            {images.length > 0 ? (
              <img
                src={images[0]}
                alt={property.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-100">
                <p className="text-gray-400">No image available</p>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="mx-auto max-w-7xl px-4 py-4">
              <div className="grid grid-cols-4 gap-4">
                {images.slice(1, 5).map((img: string, i: number) => (
                  <div
                    key={i}
                    className="h-24 cursor-pointer overflow-hidden rounded-lg border-2 border-transparent hover:border-[#29ABE2] transition-colors"
                  >
                    <img
                      src={img}
                      alt={`Image ${i + 2}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-8">
                <h1 className="mb-4 text-4xl font-bold text-[#4A4A4A]">
                  {property.title}
                </h1>
                <div className="mb-4 flex flex-wrap gap-3">
                  {property.society && (
                    <span className="rounded-full bg-[#29ABE2] px-4 py-1 text-sm font-medium text-white">
                      {property.society}
                    </span>
                  )}
                  {property.type && (
                    <span className="rounded-full bg-[#C9963A] px-4 py-1 text-sm font-medium text-white">
                      {property.type}
                    </span>
                  )}
                  {property.status && (
                    <span
                      className={`rounded-full px-4 py-1 text-sm font-medium text-white ${
                        property.status === "Available"
                          ? "bg-green-500"
                          : property.status === "Sold"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }`}
                    >
                      {property.status}
                    </span>
                  )}
                </div>

                {property.location && (
                  <div className="mb-4 flex items-center gap-2 text-[#C9963A]">
                    <MapPin className="h-5 w-5" />
                    <span>{property.location}</span>
                  </div>
                )}

                {/* Stats Row */}
                <div className="flex flex-wrap gap-6 mb-6">
                  {property.area && (
                    <div className="flex items-center gap-2 text-[#4A4A4A]">
                      <Maximize2 className="h-5 w-5 text-[#29ABE2]" />
                      <span className="font-medium">{property.area}</span>
                    </div>
                  )}
                  {property.beds > 0 && (
                    <div className="flex items-center gap-2 text-[#4A4A4A]">
                      <Bed className="h-5 w-5 text-[#29ABE2]" />
                      <span className="font-medium">{property.beds} Beds</span>
                    </div>
                  )}
                  {property.baths > 0 && (
                    <div className="flex items-center gap-2 text-[#4A4A4A]">
                      <Bath className="h-5 w-5 text-[#29ABE2]" />
                      <span className="font-medium">
                        {property.baths} Baths
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-3xl font-bold text-[#29ABE2]">
                  {property.price}
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-8 border-b border-gray-200">
                <div className="flex gap-8">
                  {(["overview", "location"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 font-medium capitalize transition-colors ${
                        activeTab === tab
                          ? "border-b-2 border-[#29ABE2] text-[#29ABE2]"
                          : "text-[#4A4A4A]/70 hover:text-[#4A4A4A]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === "overview" && (
                <div className="text-[#4A4A4A]/80 leading-relaxed whitespace-pre-wrap">
                  {property.description ||
                    "No description available for this property."}
                </div>
              )}

              {activeTab === "location" && (
                <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
                  <div className="text-center">
                    <MapPin className="mx-auto h-10 w-10 text-[#29ABE2]/30 mb-2" />
                    <p className="text-[#4A4A4A]/50 font-medium">
                      {property.location || "Location coming soon"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-xl bg-white p-6 shadow-md border border-gray-100">
                <h3 className="mb-6 text-xl font-bold text-[#4A4A4A]">
                  Interested in this property?
                </h3>

                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-gray-300 text-[#4A4A4A] px-4 py-2.5 text-sm focus:border-[#29ABE2] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-gray-300 text-[#4A4A4A] px-4 py-2.5 text-sm focus:border-[#29ABE2] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20"
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message (optional)"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 text-[#4A4A4A] px-4 py-2.5 text-sm focus:border-[#29ABE2] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20 resize-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(true)}
                    className="w-full rounded-lg bg-[#29ABE2] py-3 font-semibold text-white hover:bg-[#2192c0] transition-colors"
                  >
                    Send Inquiry
                  </button>
                </div>

                {/* Contact */}
                <div className="mt-6 border-t border-gray-100 pt-6 space-y-3">
                  <a
                    href="tel:+923369218748"
                    className="flex items-center gap-3 text-[#4A4A4A] hover:text-[#29ABE2] transition-colors"
                  >
                    <Phone className="h-5 w-5 text-[#29ABE2]" />
                    <span className="font-medium">+92 336 921 8748</span>
                  </a>

                  <a
                    href={`https://wa.me/923369218748?text=Hi, I am interested in ${property.title} in ${property.society}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 py-3 font-semibold text-white hover:bg-green-600 transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <ConfirmPopup
        isOpen={showConfirm}
        onConfirm={handleSubmit}
        onCancel={() => setShowConfirm(false)}
        isLoading={isSending}
      />
      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Inquiry Sent!"
        message="Thank you for your interest! Our team will contact you within 24 hours."
      />
    </>
  );
}
