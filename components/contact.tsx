"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { SuccessPopup } from "@/components/success-popup";

interface ContactProps {
  phone?: string;
  email?: string;
  address?: string;
}

const cities = [
  "Faisal Hills",
  "Multi Garden B-17",
  "Faisal Town",
  "Faisal Town Phase II",
  "Other",
];

export default function Contact({
  phone = "+92 336 921 8748",
  email = "info@bluemoonassociates.com",
  address = "Rawalpindi, Pakistan",
}: ContactProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    purpose: "",
    society: "",
    propertyType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

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

  const handleSubmitClick = async () => {
    if (!validate()) return;
    setIsLoading(true);

    const { error } = await supabase.from("leads").insert([
      {
        name: formData.fullName,
        phone: formData.phone,
        email: "",
        purpose: formData.purpose,
        society: formData.society,
        property_type: formData.propertyType,
        message: formData.message,
        source_page: "Homepage",
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
        purpose: "",
        society: "",
        propertyType: "",
        message: "",
      });
      setErrors({});
    }
  };

  return (
    <section id="contact" className="bg-[#F5F5F5] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#C9963A]">
                Contact Us
              </span>
              <div className="h-px w-12 bg-[#C9963A]" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-[#4A4A4A] md:text-4xl">
              Start Your Investment Journey
            </h2>
            <p className="mb-8 text-[#4A4A4A]/70">
              Connect with our advisory team for project details, pricing, and
              exclusive investment opportunities.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#29ABE2]/10">
                  <Phone className="h-6 w-6 text-[#29ABE2]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#4A4A4A]">Call Us</h3>
                  <p className="text-[#4A4A4A]/70">{phone}</p>{" "}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#29ABE2]/10">
                  <Mail className="h-6 w-6 text-[#29ABE2]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#4A4A4A]">Email Us</h3>
                  <p className="text-[#4A4A4A]/70">{email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#29ABE2]/10">
                  <MapPin className="h-6 w-6 text-[#29ABE2]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#4A4A4A]">Visit Us</h3>
                  <p className="text-[#4A4A4A]/70">{address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
            <div className="flex flex-col gap-5">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4A4A4A]">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full rounded-lg border px-4 py-3 text-sm text-[#4A4A4A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20 ${
                    errors.fullName
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300 focus:border-[#29ABE2]"
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4A4A4A]">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+92 300 0000000"
                  className={`w-full rounded-lg border px-4 py-3 text-sm text-[#4A4A4A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20 ${
                    errors.phone
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300 focus:border-[#29ABE2]"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Purpose */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4A4A4A]">
                  Purpose of Inquiry <span className="text-red-500">*</span>
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20 ${
                    errors.purpose
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300 focus:border-[#29ABE2]"
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
                <label className="mb-2 block text-sm font-medium text-[#4A4A4A]">
                  Interested Society
                </label>
                <select
                  name="society"
                  value={formData.society}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-[#4A4A4A] focus:border-[#29ABE2] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20"
                >
                  <option value="">— All Societies —</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#4A4A4A]">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-[#4A4A4A] focus:border-[#29ABE2] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20"
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
                <label className="mb-2 block text-sm font-medium text-[#4A4A4A]">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirement..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm text-[#4A4A4A] placeholder:text-gray-400 focus:border-[#29ABE2] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20"
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
                onClick={handleSubmitClick}
                disabled={isLoading}
                className="w-full rounded-lg bg-[#29ABE2] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#29ABE2]/90 disabled:opacity-70 flex items-center justify-center gap-2"
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
      </div>

      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Message Sent!"
        message="Thank you! Our team will contact you within 24 hours."
      />
    </section>
  );
}
