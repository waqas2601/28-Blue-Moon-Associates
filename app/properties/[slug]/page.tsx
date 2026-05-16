"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Droplets,
  Flame,
  Zap,
  Wifi,
  Car,
  Shield,
  Trees,
  Dumbbell,
  Waves,
  Cctv,
  Settings,
  Building,
  MapPin,
  Phone,
  Bed,
  Bath,
  Maximize2,
  Loader2,
  MessageCircle,
  Building2,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { supabase } from "@/lib/supabase";
import { SuccessPopup } from "@/components/success-popup";

type TabType = "overview" | "amenities" | "location";

const amenityIcons: Record<string, React.ReactNode> = {
  Water: <Droplets className="h-6 w-6 text-[#29ABE2]" />,
  Gas: <Flame className="h-6 w-6 text-[#29ABE2]" />,
  Electricity: <Zap className="h-6 w-6 text-[#29ABE2]" />,
  Internet: <Wifi className="h-6 w-6 text-[#29ABE2]" />,
  Parking: <Car className="h-6 w-6 text-[#29ABE2]" />,
  Security: <Shield className="h-6 w-6 text-[#29ABE2]" />,
  Mosque: <Building className="h-6 w-6 text-[#29ABE2]" />,
  Park: <Trees className="h-6 w-6 text-[#29ABE2]" />,
  "Swimming Pool": <Waves className="h-6 w-6 text-[#29ABE2]" />,
  Gym: <Dumbbell className="h-6 w-6 text-[#29ABE2]" />,
  Generator: <Settings className="h-6 w-6 text-[#29ABE2]" />,
  CCTV: <Cctv className="h-6 w-6 text-[#29ABE2]" />,
};
export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [contactSettings, setContactSettings] = useState({ phone: "+92 336 921 8748", whatsapp: "923369218748" });

  useEffect(() => {
    supabase
      .from("settings")
      .select("*")
      .in("key", ["phone", "whatsapp"])
      .then(({ data }) => {
        if (data) {
          const s: Record<string, string> = {};
          data.forEach((item: any) => { s[item.key] = item.value; });
          setContactSettings({
            phone: s.phone || "+92 336 921 8748",
            whatsapp: s.whatsapp || "923369218748",
          });
        }
      });
  }, []);

  useEffect(() => {
    const fetchProperty = async () => {
      const slug = params.slug as string;

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

  useEffect(() => {
    if (property) {
      document.title = `${property.title} - ${property.society} | Blue Moon Associates`;
    }
  }, [property]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = "Please enter your name (min 3 characters)";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (!/^(\+92|0)[0-9]{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Valid Pakistani number e.g. 03001234567";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
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

    if (error) {
      setSubmitError("Something went wrong. Please try again.");
    } else {
      setSubmitError("");
      setShowSuccess(true);
      setFormData({ name: "", phone: "", message: "" });
      setErrors({});
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 animate-pulse">
          {/* Image skeleton */}
          <div className="h-[600px] w-full bg-gray-200" />
          <div className="mx-auto max-w-7xl px-4 py-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-32 bg-gray-200 rounded" />
              </div>
              <div className="space-y-4">
                <div className="h-64 bg-gray-200 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
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
          <div
            className="relative h-[700px] w-full overflow-hidden bg-gray-200 cursor-zoom-in"
            onClick={() => setLightboxOpen(true)}
          >
            {images.length > 0 ? (
              <>
                <img
                  src={images[activeImage]}
                  alt={`${property.title} - Image ${activeImage + 1}`}
                  className="h-full w-full object-fit transition-all duration-300"
                />
                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                  {activeImage + 1} / {images.length}
                </div>
                {/* Zoom hint */}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                  <Maximize2 className="h-3 w-3" />
                  Click to expand
                </div>
                {/* Prev/Next arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImage((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1,
                        );
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    >
                      ‹
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImage((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1,
                        );
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    >
                      ›
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-400">No image available</p>
                </div>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="mx-auto max-w-7xl px-4 py-4">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img: string, i: number) => (
                  <div
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`h-20 w-28 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
                      activeImage === i
                        ? "border-[#29ABE2] shadow-md"
                        : "border-transparent hover:border-[#29ABE2]/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lightbox */}
        {lightboxOpen && images.length > 0 && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/30 w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors"
            >
              ✕
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-1.5 rounded-full">
              {activeImage + 1} / {images.length}
            </div>

            {/* Main Image */}
            <img
              src={images[activeImage]}
              alt={`${property.title} - Image ${activeImage + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Prev */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1,
                    );
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-colors"
                >
                  ‹
                </button>
                {/* Next */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1,
                    );
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-colors"
                >
                  ›
                </button>
              </>
            )}

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_: string, i: number) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeImage === i
                      ? "bg-white w-4"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left */}
            <div className="lg:col-span-2">
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
                  {(["overview", "amenities", "location"] as const).map(
                    (tab) => (
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
                    ),
                  )}
                </div>
              </div>

              {activeTab === "overview" && (
                <div
                  className="prose max-w-none text-[#4A4A4A]/80"
                  dangerouslySetInnerHTML={{
                    __html:
                      property.description ||
                      "<p>No description available.</p>",
                  }}
                />
              )}

              {activeTab === "amenities" && (
                <div>
                  {property.amenities ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {property.amenities
                        .split(",")
                        .map((a: string) => a.trim())
                        .filter(Boolean)
                        .map((amenity: string) => (
                          <div
                            key={amenity}
                            className="flex flex-col items-center gap-3 p-5 bg-white rounded-xl border border-gray-100 shadow-sm text-center hover:border-[#29ABE2] hover:shadow-md transition-all"
                          >
                            <div className="w-12 h-12 bg-[#29ABE2]/10 rounded-full flex items-center justify-center">
                              {amenityIcons[amenity] || (
                                <Settings className="h-6 w-6 text-[#29ABE2]" />
                              )}
                            </div>
                            <span className="text-sm font-medium text-[#4A4A4A]">
                              {amenity}
                            </span>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32 bg-gray-50 rounded-xl">
                      <p className="text-gray-400">
                        No amenities listed for this property.
                      </p>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "location" && (
                <div>
                  {property.map_url ? (
                    <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
                      <iframe
                        src={property.map_url}
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  ) : (
                    <div className="flex h-64 items-center justify-center rounded-xl bg-gray-50 border border-gray-100">
                      <div className="text-center">
                        <MapPin className="mx-auto h-10 w-10 text-[#29ABE2]/30 mb-2" />
                        <p className="text-[#4A4A4A]/50 font-medium">
                          {property.location || "Location coming soon"}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          Map will be available soon
                        </p>
                      </div>
                    </div>
                  )}
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
                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleFormChange}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20 ${
                        errors.name
                          ? "border-red-400 bg-red-50"
                          : "border-gray-300 focus:border-[#29ABE2]"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone *"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20 ${
                        errors.phone
                          ? "border-red-400 bg-red-50"
                          : "border-gray-300 focus:border-[#29ABE2]"
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <textarea
                    name="message"
                    placeholder="Your Message (optional)"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-[#4A4A4A] focus:border-[#29ABE2] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20 resize-none"
                  />

                  {/* Submit error */}
                  {submitError && (
                    <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                      {submitError}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSending}
                    className="w-full rounded-lg cursor-pointer bg-[#29ABE2] py-3 font-semibold text-white hover:bg-[#2192c0] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSending ? (
                      <>
                        <span className="h-4 w-4  border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Inquiry"
                    )}
                  </button>
                </div>

                {/* Contact */}
                <div className="mt-6 border-t border-gray-100 pt-6 space-y-3">
                  <a
                    href={`tel:${contactSettings.phone}`}
                    className="flex items-center gap-3 text-[#4A4A4A] hover:text-[#29ABE2] transition-colors"
                  >
                    <Phone className="h-5 w-5 text-[#29ABE2]" />
                    <span className="font-medium">{contactSettings.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/${contactSettings.whatsapp}?text=Hi, I am interested in ${property.title} in ${property.society}. Please contact me.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 py-3 font-semibold text-white hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Inquiry Sent!"
        message="Thank you for your interest! Our team will contact you within 24 hours."
      />
    </>
  );
}
