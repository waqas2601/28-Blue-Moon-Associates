"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    purpose: "",
    society: "",
    propertyType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      purpose: "",
      society: "",
      propertyType: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-96 pt-20 bg-cover bg-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=500&fit=crop)",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-[#C9963A] text-sm font-semibold uppercase tracking-wide mb-2">
            Get In Touch
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white/70 max-w-2xl text-lg">
            Have questions? We&apos;d love to hear from you. Get in touch with
            our team today.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 mb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Phone Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="bg-[#E8F4F8] rounded-full p-4 mb-4">
              <Phone className="w-6 h-6 text-[#29ABE2]" />
            </div>
            <h3 className="text-xl font-bold text-[#4A4A4A] mb-2">Call Us</h3>
            <p className="text-[#4A4A4A]/70">+92 331 111 0066</p>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="bg-[#E8F4F8] rounded-full p-4 mb-4">
              <Mail className="w-6 h-6 text-[#29ABE2]" />
            </div>
            <h3 className="text-xl font-bold text-[#4A4A4A] mb-2">Email Us</h3>
            <p className="text-[#4A4A4A]/70">info@bluemoonassociates.com</p>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <div className="bg-[#E8F4F8] rounded-full p-4 mb-4">
              <MapPin className="w-6 h-6 text-[#29ABE2]" />
            </div>
            <h3 className="text-xl font-bold text-[#4A4A4A] mb-2">Visit Us</h3>
            <p className="text-[#4A4A4A]/70">Rawalpindi, Pakistan</p>
          </div>
        </div>
      </section>

      {/* Maps and Form Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Google Maps Placeholder */}
          <div className="bg-gray-300 rounded-lg shadow-lg overflow-hidden h-96 lg:h-full flex flex-col items-center justify-center">
            <MapPin className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg font-semibold">Find Us Here</p>
            <p className="text-gray-500 text-sm mt-2">
              Google Maps Integration Coming Soon
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8 h-fit">
            <h2 className="text-3xl font-bold text-[#4A4A4A] mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  minLength={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                  required
                />
              </div>

              {/* Phone Number */}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                  required
                />
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29ABE2]"
                />
              </div>

              {/* Purpose of Inquiry */}
              <div>
                <label className="block text-[#4A4A4A] font-medium mb-2">
                  Purpose of Inquiry <span className="text-red-500">*</span>
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29ABE2] bg-white"
                  required
                >
                  <option value="">— Select Your Purpose —</option>
                  <option value="Buy a Property">Buy a Property</option>
                  <option value="Sell My Property">Sell My Property</option>
                  <option value="Investment Advice">Investment Advice</option>
                  <option value="General Consultation">
                    General Consultation
                  </option>
                </select>
              </div>

              {/* Interested Society */}
              <div>
                <label className="block text-[#4A4A4A] font-medium mb-2">
                  Interested Society
                </label>
                <select
                  name="society"
                  value={formData.society}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29ABE2] bg-white"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29ABE2] bg-white"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29ABE2] resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#29ABE2] text-white py-3 rounded-lg font-semibold hover:bg-[#1f8ab0] transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#29ABE2] py-16 px-4 sm:px-6 lg:px-8 my-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Explore our exclusive collection of premium properties and start
            your journey with Blue Moon Associates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#29ABE2] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
              View Projects
            </button>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
              WhatsApp Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
