"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Check } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      id: "consultation",
      number: "01",
      label: "Consultation",
      heading: "Expert Property Consultation",
      description:
        "Our experienced consultants provide comprehensive guidance on all aspects of real estate investment and property management. We analyze market trends, assess property values, and help you make informed decisions tailored to your financial goals and lifestyle preferences.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=500&fit=crop",
      points: [
        "Market analysis and property valuation",
        "Investment strategy consultation",
        "Legal and regulatory guidance",
      ],
      button: "Get Consultation",
      imagePosition: "left",
    },
    {
      id: "buy",
      number: "02",
      label: "Buy",
      heading: "Find Your Dream Property",
      description:
        "Discover our extensive portfolio of premium properties across Pakistan. We offer personalized property matching, virtual tours, financing assistance, and seamless transaction handling to make your home buying journey smooth and hassle-free.",
      image:
        "https://images.unsplash.com/photo-1570129477492-45a003537e1b?w=600&h=500&fit=crop",
      points: [
        "Curated property listings",
        "Flexible financing options",
        "End-to-end transaction support",
      ],
      button: "Browse Properties",
      imagePosition: "right",
    },
    {
      id: "sell",
      number: "03",
      label: "Sell",
      heading: "Sell Your Property Fast",
      description:
        "Maximize your property's value with our expert marketing and sales strategies. We handle everything from professional photography and marketing to negotiations and documentation, ensuring a quick and profitable sale.",
      image:
        "https://images.unsplash.com/photo-1573504867269-d9b5a5f5b5f5?w=600&h=500&fit=crop",
      points: [
        "Professional property marketing",
        "Expert price optimization",
        "Quick and transparent transactions",
      ],
      button: "List Your Property",
      imagePosition: "left",
    },
    {
      id: "construction",
      number: "04",
      label: "Build",
      heading: "Construction & Development",
      description:
        "From concept to completion, we manage all aspects of construction and real estate development. Our team combines innovative design with quality craftsmanship to deliver projects that exceed expectations and create lasting value.",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695c952952?w=600&h=500&fit=crop",
      points: [
        "End-to-end project management",
        "Quality assurance and compliance",
        "Sustainable building practices",
      ],
      button: "Start Building",
      imagePosition: "right",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-gray-50">
        {/* Hero Banner */}
        <section className="relative h-96 w-full pt-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=500&fit=crop)",
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative flex h-full items-center justify-center">
            <div className="text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#C9963A]">
                What We Offer
              </p>
              <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                Our Services
              </h1>
              <p className="text-lg text-gray-200">
                Comprehensive real estate solutions tailored for you
              </p>
            </div>
          </div>
        </section>

        {/* Service Sections */}
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`py-20 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
          >
            <div className="mx-auto max-w-7xl px-4">
              <div
                className={`flex flex-col gap-12 lg:gap-16 ${
                  service.imagePosition === "right"
                    ? "lg:flex-row-reverse"
                    : "lg:flex-row"
                } items-center`}
              >
                {/* Image */}
                <div className="flex-1">
                  <img
                    src={service.image}
                    alt={service.heading}
                    className="h-96 w-full rounded-lg object-cover shadow-lg"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#C9963A]">
                    {service.number} — {service.label}
                  </p>
                  <h2 className="mb-4 text-3xl font-bold text-[#4A4A4A] md:text-4xl">
                    {service.heading}
                  </h2>
                  <p className="mb-6 text-lg text-[#4A4A4A]/70 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bullet Points */}
                  <ul className="mb-8 space-y-3">
                    {service.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 flex-shrink-0 text-[#29ABE2]" />
                        <span className="text-[#4A4A4A]">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button className="rounded-full bg-[#29ABE2] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#29ABE2]/90">
                    {service.button}
                  </button>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className="bg-[#29ABE2] py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg text-white/80">
              Let us help you navigate the real estate market with confidence
              and expertise
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button className="rounded-full bg-white px-8 py-3 font-semibold text-[#29ABE2] transition-colors hover:bg-gray-100">
                Contact Us
              </button>
              <button className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10">
                View Properties
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
