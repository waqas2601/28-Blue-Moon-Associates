"use client";

import { Suspense, useEffect, useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { supabase } from "@/lib/supabase";
import { SuccessPopup } from "@/components/success-popup";
import { useSearchParams } from "next/navigation";

function ContactContent() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    purpose: "",
    society: "",
    propertyType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [settings, setSettings] = useState<Record<string, string>>({});
  const searchParams = useSearchParams();

  useEffect(() => {
    const purpose = searchParams.get("purpose");
    if (purpose) {
      setFormData((prev) => ({ ...prev, purpose }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  useEffect(() => {
    const fetchSettings = async () => {
      const { supabase } = await import("@/lib/supabase");
      const { data } = await supabase.from("settings").select("*");
      if (data) {
        const s: Record<string, string> = {};
        data.forEach((item: any) => {
          s[item.key] = item.value;
        });
        setSettings(s);
      }
    };
    fetchSettings();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = "Please enter your full name (min 3 characters)";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (!/^(\+92|0)[0-9]{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone =
        "Please enter a valid Pakistani number e.g. 03001234567";
    }
    if (!formData.purpose) {
      newErrors.purpose = "Please select your purpose of inquiry";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);

    const { error } = await supabase.from("leads").insert([
      {
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        purpose: formData.purpose,
        society: formData.society,
        property_type: formData.propertyType,
        message: formData.message,
        source_page: "Contact Page",
      },
    ]);

    setIsLoading(false);

    if (error) {
      setSubmitError("Something went wrong. Please try again.");
    } else {
      setSubmitError("");
      setShowSuccess(true);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        purpose: "",
        society: "",
        propertyType: "",
        message: "",
      });
      setErrors({});
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-white border-b border-gray-200 pt-20">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="text-center">
            <span className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-3">
              <span className="w-8 h-[2px] bg-[#C9963A]" />
              Get In Touch
              <span className="w-8 h-[2px] bg-[#C9963A]" />
            </span>
            <h1 className="text-3xl font-bold text-[#4A4A4A]">Contact Us</h1>
            <p className="mt-2 text-gray-500 max-w-xl mx-auto">
              Have questions? We'd love to hear from you.
            </p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <section className="px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
            <div className="bg-[#E8F4F8] rounded-full p-4 mb-4">
              <Phone className="w-6 h-6 text-[#29ABE2]" />
            </div>
            <h3 className="text-xl font-bold text-[#4A4A4A] mb-2">Call Us</h3>
            <p className="text-[#4A4A4A]/70">
              {settings.phone || "+92 336 921 8748"}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
            <div className="bg-[#E8F4F8] rounded-full p-4 mb-4">
              <Mail className="w-6 h-6 text-[#29ABE2]" />
            </div>
            <h3 className="text-xl font-bold text-[#4A4A4A] mb-2">Email Us</h3>
            <p className="text-[#4A4A4A]/70">
              {settings.email || "info@bluemoonassociates.com"}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
            <div className="bg-[#E8F4F8] rounded-full p-4 mb-4">
              <MapPin className="w-6 h-6 text-[#29ABE2]" />
            </div>
            <h3 className="text-xl font-bold text-[#4A4A4A] mb-2">Visit Us</h3>
            <p className="text-[#4A4A4A]/70">
              {settings.address || "Rawalpindi, Pakistan"}
            </p>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      {(settings.hours_weekday ||
        settings.hours_friday ||
        settings.hours_sunday) && (
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#4A4A4A] mb-4 flex items-center gap-2">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Business Hours
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-[#4A4A4A]">
                    Sat - Thu
                  </span>
                  <span className="text-sm text-[#29ABE2] font-semibold">
                    {settings.hours_weekday || "9:00 AM - 6:00 PM"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-[#4A4A4A]">
                    Friday
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      (settings as any).hours_friday?.toLowerCase() === "closed"
                        ? "text-red-500"
                        : "text-[#29ABE2]"
                    }`}
                  >
                    {(settings as any).hours_friday || "Closed"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Map + Form */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-lg shadow-lg overflow-hidden h-full min-h-[400px]">
            <iframe
              src={
                settings.google_maps ||
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.8732620536657!2d72.79202284076797!3d33.71222823571767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfa116ce79b14d%3A0x61197159fecdec35!2sBlue%20Moon%20Associates%20Pvt%20Ltd!5e0!3m2!1sen!2s!4v1778319929644!5m2!1sen!2s"
              }
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#4A4A4A] mb-6">
              Send Us a Message
            </h2>
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-[#4A4A4A] font-medium mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2] ${
                    errors.fullName
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[#4A4A4A] font-medium mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+92 300 0000000"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2] ${
                    errors.phone
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500"> {errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[#4A4A4A] font-medium mb-2">
                  Email
                  <span className="text-gray-400 text-xs ml-2">
                    (We'll primarily contact you via WhatsApp/Phone)
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                />
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-[#4A4A4A] font-medium mb-2">
                  Purpose of Inquiry <span className="text-red-500">*</span>
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border bg-white text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2] ${
                    errors.purpose
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">— Select Your Purpose —</option>
                  <option value="Buy a Property">Buy a Property</option>
                  <option value="Sell My Property">Sell My Property</option>
                  <option value="Investment Advice">Investment Advice</option>
                  <option value="General Consultation">
                    General Consultation
                  </option>
                </select>
                {errors.purpose && (
                  <p className="mt-1 text-xs text-red-500">{errors.purpose}</p>
                )}
              </div>

              {/* Society */}
              <div>
                <label className="block text-[#4A4A4A] font-medium mb-2">
                  Interested Society
                </label>
                <select
                  name="society"
                  value={formData.society}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                >
                  <option value="">— All Societies —</option>
                  <option value="Faisal Hills">Faisal Hills</option>
                  <option value="Multi Garden B-17">Multi Garden B-17</option>
                  <option value="Faisal Town">Faisal Town</option>
                  <option value="Faisal Town Phase II">
                    Faisal Town Phase II
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-[#4A4A4A] font-medium mb-2">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                >
                  <option value="">— Select Property Type —</option>
                  <option value="Residential Plot">Residential Plot</option>
                  <option value="Commercial Plot">Commercial Plot</option>
                  <option value="House / Villa">House / Villa</option>
                  <option value="Apartment / Flat">Apartment / Flat</option>
                  <option value="Farm House">Farm House</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[#4A4A4A] font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirement..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2] resize-none"
                />
              </div>

              {/* Submit error */}
              {submitError && (
                <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-lg border border-red-200">
                  {submitError}
                </p>
              )}

              {/* Submit */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-[#29ABE2] cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-[#1f8ab0] transition disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#29ABE2] py-16 px-4 my-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-white/90 mb-8">
            Explore our exclusive collection of premium properties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/properties"
              className="bg-white text-[#29ABE2] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              View Properties
            </a>

            <a
              href={`https://wa.me/${settings.whatsapp || "923369218748"}?text=Hi, I submitted an inquiry on your website. Please contact me.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Message Sent!"
        message="Thank you for reaching out! Our team will contact you within 24 hours."
      />
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 border-4 border-[#29ABE2] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ContactContent />
    </Suspense>
  );
}
