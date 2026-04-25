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
    city: "",
    project: "",
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
    // Reset form
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      city: "",
      project: "",
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
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 text-[#4A4A4A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29ABE2] focus:border-transparent transition"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-[#4A4A4A] font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+92 300 0000000"
                  className="w-full px-4 py-2 border border-gray-300 text-[#4A4A4A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29ABE2] focus:border-transparent transition"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[#4A4A4A] font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 text-[#4A4A4A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29ABE2] focus:border-transparent transition"
                  required
                />
              </div>

              {/* City Dropdown */}
              <div>
                <label className="block text-[#4A4A4A] font-medium mb-2">
                  City
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 text-[#4A4A4A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29ABE2] focus:border-transparent transition bg-white"
                  required
                >
                  <option value="">Select a city</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                </select>
              </div>

              {/* Interested Project */}
              <div>
                <label className="block text-[#4A4A4A] font-medium mb-2">
                  Interested Project
                </label>
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 text-[#4A4A4A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29ABE2] focus:border-transparent transition bg-white"
                  required
                >
                  <option value="">Select a project</option>
                  <option value="Project 1">Project 1</option>
                  <option value="Project 2">Project 2</option>
                  <option value="Project 3">Project 3</option>
                  <option value="Project 4">Project 4</option>
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
                  className="w-full px-4 py-2 border border-gray-300 text-[#4A4A4A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29ABE2] focus:border-transparent transition bg-white"
                  required
                >
                  <option value="">Select property type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Both">Both</option>
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
                  placeholder="Tell us about your inquiry..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 text-[#4A4A4A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29ABE2] focus:border-transparent transition resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
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
