"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const cities = [
  "Islamabad",
  "Rawalpindi",
  "Lahore",
  "Karachi",
  "Peshawar",
  "Faisalabad",
  "Multan",
  "Quetta",
];

const projects = [
  "The Grand Residencia",
  "Blue Moon Heights",
  "Capital Smart City",
  "Park View City",
  "Bahria Town",
  "DHA Valley",
];

const propertyTypes = ["Residential", "Commercial"];

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    project: "",
    propertyType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <section id="contact" className="bg-[#F5F5F5] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            {/* Label */}
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#C9963A]">
                Contact Us
              </span>
              <div className="h-px w-12 bg-[#C9963A]" />
            </div>

            {/* Heading */}
            <h2 className="mb-4 text-3xl font-bold text-[#4A4A4A] md:text-4xl">
              Start Your Investment Journey
            </h2>

            {/* Subtext */}
            <p className="mb-8 text-[#4A4A4A]/70">
              Connect with our advisory team for project details, pricing, and
              exclusive investment opportunities.
            </p>

            {/* Info Boxes */}
            <div className="flex flex-col gap-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#29ABE2]/10">
                  <Phone className="h-6 w-6 text-[#29ABE2]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#4A4A4A]">Call Us</h3>
                  <p className="text-[#4A4A4A]/70">+92 331 111 0066</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#29ABE2]/10">
                  <Mail className="h-6 w-6 text-[#29ABE2]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#4A4A4A]">Email Us</h3>
                  <p className="text-[#4A4A4A]/70">
                    info@bluemoonassociates.com
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#29ABE2]/10">
                  <MapPin className="h-6 w-6 text-[#29ABE2]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#4A4A4A]">Visit Us</h3>
                  <p className="text-[#4A4A4A]/70">Rawalpindi, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-[#4A4A4A]"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[#4A4A4A] placeholder:text-gray-400 focus:border-[#29ABE2] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-[#4A4A4A]"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[#4A4A4A] placeholder:text-gray-400 focus:border-[#29ABE2] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20"
                  required
                />
              </div>

              {/* City Dropdown */}
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium text-[#4A4A4A]"
                >
                  City
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#4A4A4A] focus:border-[#29ABE2] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20"
                  required
                >
                  <option value="">Select your city</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Interested Project Dropdown */}
              <div>
                <label
                  htmlFor="project"
                  className="mb-2 block text-sm font-medium text-[#4A4A4A]"
                >
                  Interested Project
                </label>
                <select
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#4A4A4A] focus:border-[#29ABE2] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20"
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project} value={project}>
                      {project}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type Dropdown */}
              <div>
                <label
                  htmlFor="propertyType"
                  className="mb-2 block text-sm font-medium text-[#4A4A4A]"
                >
                  Property Type
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#4A4A4A] focus:border-[#29ABE2] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20"
                  required
                >
                  <option value="">Select property type</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-[#4A4A4A]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-[#4A4A4A] placeholder:text-gray-400 focus:border-[#29ABE2] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-lg bg-[#29ABE2] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#29ABE2]/90"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
