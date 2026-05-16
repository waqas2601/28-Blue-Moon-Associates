"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { Check } from "lucide-react";

interface Service {
  id: string;
  number: string;
  label: string;
  heading: string;
  description: string;
  image: string;
  points: string[];
  button: string;
  imagePosition: string;
  href: string;
}

export default function ServicesPage() {
  const services: Service[] = [
    {
      id: "consultation",
      number: "01",
      label: "Consultation",
      heading: "Expert Property Consultation",
      description:
        "Our experienced consultants provide comprehensive guidance on all aspects of real estate investment and property management. We analyze market trends, assess property values, and help you make informed decisions tailored to your financial goals and lifestyle preferences.",
      image:
        "https://www.grrowpropertymanagement.com/OnlineImages/BlogImage/5-reasons-to-hire-a-property-consultant-for-your-next-investment-b.jpg",
      points: [
        "Market analysis and property valuation",
        "Investment strategy consultation",
        "Legal and regulatory guidance",
      ],
      button: "Get Consultation",
      imagePosition: "left",
      href: "/contact?purpose=General Consultation",
    },
    {
      id: "buy",
      number: "02",
      label: "Buy",
      heading: "Find Your Dream Property",
      description:
        "Discover our extensive portfolio of premium properties across Pakistan. We offer personalized property matching, virtual tours, financing assistance, and seamless transaction handling to make your home buying journey smooth and hassle-free.",
      image: "https://nexthome.pk/wp-content/uploads/2022/12/house.jpg",
      points: [
        "Curated property listings",
        "Flexible financing options",
        "End-to-end transaction support",
      ],
      button: "Browse Properties",
      imagePosition: "right",
      href: "/properties",
    },
    {
      id: "sell",
      number: "03",
      label: "Sell",
      heading: "Sell Your Property Fast",
      description:
        "Maximize your property's value with our expert marketing and sales strategies. We handle everything from professional photography and marketing to negotiations and documentation, ensuring a quick and profitable sale.",
      image:
        "https://hometriangle.com/blogs/content/images/2024/05/hometriangle-blog-sell-my-house-fast.jpg",
      points: [
        "Professional property marketing",
        "Expert price optimization",
        "Quick and transparent transactions",
      ],
      button: "List Your Property",
      imagePosition: "left",
      href: "/contact?purpose=Sell My Property",
    },
    {
      id: "construction",
      number: "04",
      label: "Build",
      heading: "Construction & Development",
      description:
        "From concept to completion, we manage all aspects of construction and real estate development. Our team combines innovative design with quality craftsmanship to deliver projects that exceed expectations and create lasting value.",
      image:
        "https://proformaco.com/wp-content/uploads/2016/03/construction-copy.jpg",
      points: [
        "End-to-end project management",
        "Quality assurance and compliance",
        "Sustainable building practices",
      ],
      button: "Start Building",

      imagePosition: "right",
      href: "/contact?purpose=General Consultation",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-gray-50">
        {/* Hero Banner */}
        <div className="bg-white border-b border-gray-200 pt-20">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="text-center">
              <span className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-3">
                <span className="w-8 h-[2px] bg-[#C9963A]" />
                What We Offer
                <span className="w-8 h-[2px] bg-[#C9963A]" />
              </span>
              <h1 className="text-3xl font-bold text-[#4A4A4A]">
                Our Services
              </h1>
              <p className="mt-2 text-gray-500 max-w-xl mx-auto">
                Comprehensive real estate solutions tailored for you
              </p>
            </div>
          </div>
        </div>

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
                  <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={service.image}
                      alt={service.heading}
                      fill
                      className="object-cover"
                    />
                  </div>
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
                  <a
                    href={service.href}
                    className="rounded-full bg-[#29ABE2] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#29ABE2]/90"
                  >
                    {service.button}
                  </a>
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
              <a
                href="/contact"
                className="rounded-full bg-white px-8 py-3 font-semibold text-[#29ABE2] transition-colors hover:bg-gray-100"
              >
                Contact Us
              </a>
              <a
                href="/properties"
                className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                View Properties
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
