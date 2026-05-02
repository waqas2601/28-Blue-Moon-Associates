import { notFound } from "next/navigation";
import {
  MapPin,
  TrendingUp,
  Shield,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { societies } from "@/lib/societies";

export default async function SocietyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const society = societies.find((s) => s.slug === slug);

  if (!society) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section
          className="relative h-[500px] w-full bg-cover bg-center pt-20"
          style={{ backgroundImage: `url(${society.image})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 left-0 flex flex-col gap-4 p-8 sm:p-12">
            <p className="text-[#C9963A] text-sm font-semibold uppercase tracking-wider">
              Society Overview
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              {society.name}
            </h1>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="h-5 w-5" />
              <p>{society.location}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                `Established ${society.established}`,
                society.plots + " Plots",
                society.noc,
              ].map((stat) => (
                <span
                  key={stat}
                  className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white"
                >
                  {stat}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-[#C9963A] text-sm font-semibold uppercase tracking-wider">
                  About Society
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#4A4A4A]">
                  {society.name}
                </h2>
                <p className="mt-4 text-[#4A4A4A]/70 leading-relaxed">
                  {society.about}
                </p>
                <p className="mt-4 text-[#4A4A4A]/70 leading-relaxed">
                  {society.about2}
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { label: "Location", value: society.location },
                    { label: "Total Area", value: society.totalArea },
                    { label: "Developer", value: society.developer },
                    { label: "Status", value: society.status },
                  ].map((info) => (
                    <div
                      key={info.label}
                      className="rounded-lg bg-gray-50 p-4 border border-gray-100"
                    >
                      <p className="text-xs font-medium text-gray-500 uppercase">
                        {info.label}
                      </p>
                      <p className="mt-1 text-sm font-bold text-[#4A4A4A]">
                        {info.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src={society.overviewImage}
                  alt={society.name}
                  className="w-full rounded-lg shadow-lg h-[450px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Invest */}
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A]">
                Why Invest in {society.name}
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {society.whyInvest.map((item, i) => {
                const icons = [TrendingUp, Shield, MapPin];
                const Icon = icons[i];
                return (
                  <div
                    key={item.title}
                    className="rounded-xl bg-white p-8 text-center shadow-sm border border-gray-100"
                  >
                    <div className="flex justify-center">
                      <Icon className="h-12 w-12 text-[#29ABE2]" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-[#4A4A4A]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#4A4A4A]/70">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A]">
                Location & Accessibility
              </h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="flex items-center justify-center rounded-xl bg-gray-100 h-80">
                <div className="text-center">
                  <MapPin className="mx-auto h-16 w-16 text-[#29ABE2]/30" />
                  <p className="mt-4 text-[#4A4A4A]/50 font-medium">
                    Map Coming Soon
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {society.landmarks.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 border border-gray-100"
                  >
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-[#29ABE2]" />
                    <div className="flex-1 flex items-center justify-between">
                      <p className="font-semibold text-[#4A4A4A]">
                        {item.name}
                      </p>
                      <span className="text-sm font-medium text-[#29ABE2] bg-[#29ABE2]/10 px-3 py-1 rounded-full">
                        {item.distance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#29ABE2] py-20">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="text-3xl font-bold text-white">
              Interested in {society.name}?
            </h2>
            <p className="mt-2 text-white/80">
              Get in touch with our team for more details
            </p>
            <div className="mt-8 space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <input
                type="tel"
                placeholder="Your Phone Number"
                className="w-full rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <textarea
                placeholder="Your Message"
                rows={3}
                className="w-full rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <div className="flex gap-3">
                <button className="flex-1 rounded-lg bg-white px-6 py-3 font-semibold text-[#29ABE2] hover:bg-gray-100 transition-colors">
                  Submit Inquiry
                </button>

                <a
                  href={`https://wa.me/923311110066?text=Hi, I am interested in ${society.name}. Please contact me.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
