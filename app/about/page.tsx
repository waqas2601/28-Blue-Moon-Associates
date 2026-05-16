import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Leadership from "@/components/leadership";
import {
  Target,
  Eye,
  Heart,
  Shield,
  Users,
  CheckCircle,
  Building2,
  Handshake,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Blue Moon Associates — a trusted real estate consultancy in Rawalpindi, Pakistan. Founded in 2019, we specialize in premium housing societies including Faisal Hills, B-17, and Faisal Town.",
};

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Integrity",
      description:
        "We believe in transparent dealings and honest communication with all our clients and partners.",
    },
    {
      icon: Shield,
      title: "Excellence",
      description:
        "We strive for excellence in every project, ensuring the highest quality standards are met.",
    },
    {
      icon: Users,
      title: "Client Focus",
      description:
        "Our clients are at the heart of everything we do. Their satisfaction is our ultimate goal.",
    },
  ];

  const timeline = [
    {
      year: "2019",
      title: "Blue Moon Founded",
      description:
        "Blue Moon Associates was established with a vision to provide honest and professional real estate services in Rawalpindi.",
    },
    {
      year: "2020",
      title: "First Society Partnership",
      description:
        "Partnered with Faisal Hills as an authorized dealer, marking our first major milestone in the real estate sector.",
    },
    {
      year: "2021",
      title: "Expanding Portfolio",
      description:
        "Expanded operations to Multi Garden B-17 and Faisal Town, growing our portfolio of premium housing societies.",
    },
    {
      year: "2022",
      title: "Growing Client Base",
      description:
        "Achieved significant growth in client base, helping hundreds of families find their dream properties.",
    },
    {
      year: "2024",
      title: "Faisal Town Phase II",
      description:
        "Added Faisal Town Phase II to our portfolio, becoming one of the most trusted dealers in the region.",
    },
  ];

  const whyUs = [
    {
      icon: CheckCircle,
      title: "Authorized Dealers",
      description:
        "Official authorized dealers for all major housing societies we operate in.",
    },
    {
      icon: Building2,
      title: "Premium Societies",
      description:
        "We only work with top-tier, NOC-approved housing societies.",
    },
    {
      icon: Handshake,
      title: "Transparent Process",
      description:
        "No hidden charges. Clear documentation and honest guidance throughout.",
    },
    {
      icon: TrendingUp,
      title: "Best Investment Advice",
      description:
        "Expert guidance to help you make the right investment decision.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Title Bar */}
      <div className="bg-white border-b border-gray-200 pt-20">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="text-center">
            <span className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-3">
              <span className="w-8 h-[2px] bg-[#C9963A]" />
              About Us
              <span className="w-8 h-[2px] bg-[#C9963A]" />
            </span>
            <h1 className="text-3xl font-bold text-[#4A4A4A]">Who We Are</h1>
            <p className="mt-2 text-gray-500 max-w-xl mx-auto">
              Discover the story behind Blue Moon Associates and our commitment
              to excellence in real estate
            </p>
          </div>
        </div>
      </div>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative">
              <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80"
                  alt="Blue Moon Associates Office"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#29ABE2] text-white p-6 rounded-2xl shadow-lg hidden md:block">
                <div className="text-4xl font-bold">2019</div>
                <div className="text-sm opacity-80">Established</div>
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-4">
                <span className="w-8 h-[2px] bg-[#C9963A]" />
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] mb-6">
                Built on Trust & Transparency
              </h2>
              <p className="text-[#4A4A4A]/70 mb-4 leading-relaxed">
                Blue Moon Associates was founded with a simple but powerful
                mission — to make real estate investment simple, transparent,
                and rewarding for every client. Based in Rawalpindi, we
                specialize in some of Pakistan's most promising housing
                societies.
              </p>
              <p className="text-[#4A4A4A]/70 mb-6 leading-relaxed">
                Under the leadership of Shafaat Khan and Abbas Ali, we have
                grown into a trusted name for property buyers and investors
                looking for genuine guidance and reliable service.
              </p>

              <a
                href="/societies"
                className="bg-[#29ABE2] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#29ABE2]/90 transition-colors"
              >
                View Societies
              </a>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-4">
                <span className="w-8 h-[2px] bg-[#C9963A]" />
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] mb-6">
                Your Investment, Our Responsibility
              </h2>
              <p className="text-[#4A4A4A]/70 mb-4 leading-relaxed">
                We understand that buying property is one of the biggest
                financial decisions of your life. That's why we take our
                responsibility seriously — providing honest advice, clear
                documentation, and full support throughout the process.
              </p>
              <p className="text-[#4A4A4A]/70 mb-6 leading-relaxed">
                From the first consultation to final possession, our team is
                with you every step of the way.
              </p>

              <a
                href="/properties"
                className="bg-[#29ABE2] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#29ABE2]/90 transition-colors"
              >
                View Properties
              </a>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80"
                  alt="Our Approach"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#C9963A] text-white p-6 rounded-2xl shadow-lg hidden md:block">
                <div className="text-4xl font-bold">4</div>
                <div className="text-sm opacity-80">Societies</div>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80"
                  alt="Our Community"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#29ABE2] text-white p-6 rounded-2xl shadow-lg hidden md:block">
                <div className="text-4xl font-bold">100%</div>
                <div className="text-sm opacity-80">Transparent</div>
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-4">
                <span className="w-8 h-[2px] bg-[#C9963A]" />
                Our Promise
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] mb-6">
                Genuine Service, Real Results
              </h2>
              <p className="text-[#4A4A4A]/70 mb-4 leading-relaxed">
                We don't just sell properties — we build long-term
                relationships. Our clients come back to us again and again
                because they trust us to always put their interests first.
              </p>
              <p className="text-[#4A4A4A]/70 mb-6 leading-relaxed">
                Whether you're a first-time buyer or an experienced investor,
                we're here to make your real estate journey smooth, safe, and
                successful.
              </p>

              <a
                href="/contact"
                className="bg-[#29ABE2] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#29ABE2]/90 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-4">
              <span className="w-8 h-[2px] bg-[#C9963A]" />
              Why Blue Moon
              <span className="w-8 h-[2px] bg-[#C9963A]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">
              Why Choose Us?
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Here's what makes Blue Moon Associates different from the rest
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div className="w-14 h-14 bg-[#29ABE2]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#29ABE2] transition-colors duration-300">
                  <item.icon className="w-7 h-7 text-[#29ABE2] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-[#4A4A4A] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#4A4A4A]/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-4">
              <span className="w-8 h-[2px] bg-[#C9963A]" />
              Our Journey
              <span className="w-8 h-[2px] bg-[#C9963A]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">
              How We Got Here
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                  >
                    <div
                      className={`bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow ${
                        index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                      }`}
                    >
                      <h3 className="text-lg font-bold text-[#4A4A4A] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#4A4A4A]/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Year Badge */}
                  <div className="flex-shrink-0 w-16 h-16 bg-[#29ABE2] rounded-full flex items-center justify-center shadow-lg z-10">
                    <span className="text-white text-sm font-bold">
                      {item.year}
                    </span>
                  </div>

                  {/* Empty space for alternating */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <Leadership />

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-4">
              <span className="w-8 h-[2px] bg-[#C9963A]" />
              Our Purpose
              <span className="w-8 h-[2px] bg-[#C9963A]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">
              Vision & Mission
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border-l-4 border-[#29ABE2] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#29ABE2]/10 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-[#29ABE2]" />
                </div>
                <h3 className="text-xl font-bold text-[#29ABE2]">Our Vision</h3>
              </div>
              <p className="text-[#4A4A4A]/70 leading-relaxed">
                To be the most trusted real estate consultancy in Rawalpindi and
                Islamabad — known for our honesty, expertise, and commitment to
                helping clients make smart property investments.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border-l-4 border-[#C9963A] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#C9963A]/10 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-[#C9963A]" />
                </div>
                <h3 className="text-xl font-bold text-[#C9963A]">
                  Our Mission
                </h3>
              </div>
              <p className="text-[#4A4A4A]/70 leading-relaxed">
                To guide every client through their real estate journey with
                transparency, professionalism, and genuine care — making
                property ownership accessible and rewarding for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-4">
              <span className="w-8 h-[2px] bg-[#C9963A]" />
              What We Stand For
              <span className="w-8 h-[2px] bg-[#C9963A]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-gray-50 p-8 rounded-2xl text-center hover:bg-[#29ABE2] transition-all duration-300 cursor-default overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#29ABE2]/5 rounded-full -translate-y-10 translate-x-10 group-hover:bg-white/10 transition-colors" />

                <div className="w-16 h-16 bg-[#29ABE2]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-[#29ABE2] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[#4A4A4A] mb-4 group-hover:text-white transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-[#4A4A4A]/70 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#4A4A4A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Let us help you find your dream property with honest guidance and
            professional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/properties"
              className="bg-[#29ABE2] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#29ABE2]/90 transition-colors"
            >
              View Properties
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
