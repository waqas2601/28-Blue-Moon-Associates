"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { SuccessPopup } from "@/components/success-popup";

import { MessageCircle, Loader2 } from "lucide-react";

interface SocietyFormProps {
  societyName: string;
  whatsapp?: string;
}

export default function SocietyForm({ societyName, whatsapp = "923369218748" }: SocietyFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
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
    const isValid = validate();

    if (!isValid) return;

    setIsLoading(true);

    const { error } = await supabase.from("leads").insert([
      {
        name: formData.name,
        phone: formData.phone,
        email: "",
        purpose: "Buy a Property",
        society: societyName,
        property_type: "",
        message:
          formData.message || `I am interested in properties in ${societyName}`,
        source_page: `Society Page - ${societyName}`,
      },
    ]);

    setIsLoading(false);

    if (error) {
      setSubmitError("Something went wrong. Please try again.");
    } else {
      setSubmitError("");
      setShowSuccess(true);
      setFormData({ name: "", phone: "", message: "" });
    }

    setErrors({});
  };
  return (
    <>
      <div className="mt-8 space-y-4 max-w-2xl mx-auto">
        {/* Name */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-3 text-white placeholder-white/60 bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 ${
              errors.name ? "border-red-400" : "border-white/30"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-left text-white font-medium bg-red-500/80 px-3 py-1 rounded-lg">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number *"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-3 text-white placeholder-white/60 bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 ${
              errors.phone ? "border-red-400" : "border-white/30"
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-left text-white font-medium bg-red-500/80 px-3 py-1 rounded-lg">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Message */}
        <textarea
          name="message"
          placeholder="Your Message (optional)"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
        />

        {/* Buttons */}
        {submitError && (
          <p className="text-xs text-left text-white font-medium bg-red-500/80 px-3 py-1 rounded-lg">
            {submitError}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 rounded-lg cursor-pointer bg-white px-6 py-3 font-semibold text-[#29ABE2] hover:bg-gray-100 transition-colors"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
                Sending...
              </>
            ) : (
              "Submit Inquiry"
            )}
          </button>

          <a
            href={`https://wa.me/${whatsapp}?text=Hi, I am interested in properties in ${societyName}. Please contact me.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp Us
          </a>
        </div>
      </div>

      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Inquiry Sent!"
        message={`Thank you for your interest in ${societyName}! Our team will contact you within 24 hours.`}
      />
    </>
  );
}
