"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Droplet,
  Dumbbell,
  Car,
  Shield,
  Trees,
  Landmark,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type TabType = "overview" | "payment" | "amenities" | "location";

export default function ProjectDetailPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", phone: "", message: "" });
  };

  const amenities = [
    { icon: Droplet, label: "Swimming Pool" },
    { icon: Dumbbell, label: "Gym" },
    { icon: Car, label: "Parking" },
    { icon: Shield, label: "Security" },
    { icon: Trees, label: "Park" },
    { icon: Landmark, label: "Mosque" },
  ];

  const paymentPlan = [
    { phase: "Booking", amount: "5%" },
    { phase: "6 Months", amount: "25%" },
    { phase: "12 Months", amount: "30%" },
    { phase: "On Possession", amount: "40%" },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* Image Gallery */}
        <div className="bg-white">
          {/* Main Image */}
          <div className="h-[500px] w-full overflow-hidden bg-gray-300">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=500&fit=crop"
              alt="Modern Residential Complex"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Thumbnail Row */}
          <div className="mx-auto max-w-7xl px-4 py-6">
            <div className="grid grid-cols-4 gap-4">
              {[
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
              ].map((src, i) => (
                <div
                  key={i}
                  className="h-32 cursor-pointer overflow-hidden rounded-lg border-2 border-transparent hover:border-[#29ABE2] transition-colors"
                >
                  <img
                    src={src}
                    alt={`Thumbnail ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Content Column */}
            <div className="lg:col-span-2">
              {/* Project Header */}
              <div className="mb-8">
                <h1 className="mb-4 text-4xl font-bold text-[#4A4A4A]">
                  Modern Residential Complex
                </h1>

                {/* Badges */}
                <div className="mb-4 flex gap-3">
                  <span className="rounded-full bg-[#29ABE2] px-4 py-1 text-sm font-medium text-white">
                    Islamabad
                  </span>
                  <span className="rounded-full bg-[#C9963A] px-4 py-1 text-sm font-medium text-white">
                    Residential
                  </span>
                </div>

                {/* Location */}
                <div className="mb-4 flex items-center gap-2 text-[#C9963A]">
                  <MapPin className="h-5 w-5" />
                  <span>F-17, Islamabad, Punjab</span>
                </div>

                {/* Price */}
                <div className="mb-8 text-3xl font-bold text-[#29ABE2]">
                  PKR 5,000,000 - 25,000,000
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-8 border-b border-gray-200">
                <div className="flex gap-8">
                  {(
                    ["overview", "payment", "amenities", "location"] as const
                  ).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 font-medium transition-colors ${
                        activeTab === tab
                          ? "border-b-2 border-[#29ABE2] text-[#29ABE2]"
                          : "text-[#4A4A4A]/70 hover:text-[#4A4A4A]"
                      }`}
                    >
                      {tab === "overview" && "Overview"}
                      {tab === "payment" && "Payment Plan"}
                      {tab === "amenities" && "Amenities"}
                      {tab === "location" && "Location"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="mb-8">
                {activeTab === "overview" && (
                  <div className="space-y-4 text-[#4A4A4A]">
                    <p>
                      Welcome to Modern Residential Complex, a premium
                      residential development designed with contemporary
                      architecture and world-class amenities. Our project offers
                      an exceptional lifestyle in one of Islamabad&apos;s most
                      sought-after locations.
                    </p>
                    <p>
                      Each unit is thoughtfully designed with spacious layouts,
                      modern finishes, and panoramic views. The complex features
                      state-of-the-art facilities including recreational areas,
                      landscaped gardens, and a secure gated community with 24/7
                      security.
                    </p>
                    <p>
                      Our commitment to quality and excellence ensures that
                      every resident experiences the finest standards of living.
                      From the moment you step into Modern Residential Complex,
                      you&apos;ll discover a community designed for those who
                      appreciate the finer things in life.
                    </p>
                  </div>
                )}

                {activeTab === "payment" && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-[#29ABE2]">
                          <th className="py-3 text-left font-semibold text-[#4A4A4A]">
                            Payment Phase
                          </th>
                          <th className="py-3 text-right font-semibold text-[#4A4A4A]">
                            Percentage
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentPlan.map((plan, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-gray-200 hover:bg-gray-50"
                          >
                            <td className="py-4 text-[#4A4A4A]">
                              {plan.phase}
                            </td>
                            <td className="py-4 text-right font-semibold text-[#29ABE2]">
                              {plan.amount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === "amenities" && (
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                    {amenities.map((amenity, idx) => {
                      const IconComponent = amenity.icon;
                      return (
                        <div
                          key={idx}
                          className="flex flex-col items-center text-center"
                        >
                          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F4F8]">
                            <IconComponent className="h-8 w-8 text-[#29ABE2]" />
                          </div>
                          <p className="font-medium text-[#4A4A4A]">
                            {amenity.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {activeTab === "location" && (
                  <div className="flex h-96 items-center justify-center rounded-lg bg-gray-300">
                    <p className="text-xl font-medium text-[#4A4A4A]">
                      Map Coming Soon
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-6 text-xl font-bold text-[#4A4A4A]">
                  Interested in this property?
                </h3>

                {/* Inquiry Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full rounded border text-[#4A4A4A] border-gray-300 px-4 py-2 focus:border-[#29ABE2] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full rounded border text-[#4A4A4A] border-gray-300 px-4 py-2 focus:border-[#29ABE2] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={4}
                      className="w-full rounded border text-[#4A4A4A] border-gray-300 px-4 py-2 focus:border-[#29ABE2] focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded bg-[#29ABE2] py-3 font-semibold text-white hover:bg-[#2192c0] transition-colors"
                  >
                    Send Inquiry
                  </button>
                </form>

                {/* Contact Info */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="mb-4 flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#29ABE2]" />
                    <div>
                      <p className="text-sm text-[#4A4A4A]/70">Call Us</p>
                      <p className="font-semibold text-[#4A4A4A]">
                        +92 (51) 2345-6789
                      </p>
                    </div>
                  </div>

                  {/* WhatsApp Button */}
                  <a
                    href="https://wa.me/923510000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded bg-green-500 py-3 font-semibold text-white hover:bg-green-600 transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.906 1.235l-.348.215-3.61-.949.966 3.542-.235.374a9.861 9.861 0 001.516 5.693c.665 1.159 1.571 2.201 2.654 3.03 1.082.828 2.298 1.414 3.594 1.708 1.295.294 2.664.345 3.994.082 1.33-.263 2.61-.923 3.678-1.826 1.07-.903 1.883-2.034 2.358-3.312.475-1.278.568-2.652.28-3.97a9.901 9.901 0 00-1.284-3.447 9.877 9.877 0 00-2.74-2.718c-.84-.606-1.78-1.075-2.77-1.375a9.873 9.873 0 00-3.19-.348z" />
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
    </>
  );
}
