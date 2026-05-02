import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { societies } from "@/lib/societies";
import { MapPin, ArrowRight } from "lucide-react";

export default function SocietiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Title Bar */}
        <div className="bg-white border-b border-gray-200 pt-20">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="text-center">
              <span className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-3">
                <span className="w-8 h-[2px] bg-[#C9963A]" />
                Where We Work
                <span className="w-8 h-[2px] bg-[#C9963A]" />
              </span>
              <h1 className="text-3xl font-bold text-[#4A4A4A]">
                Our Societies
              </h1>
              <p className="mt-2 text-gray-500 max-w-xl mx-auto">
                Explore the premium housing societies where Blue Moon Associates
                operates and find your perfect investment
              </p>
            </div>
          </div>
        </div>

        {/* Societies Grid */}
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {societies.map((society) => (
              <a
                key={society.slug}
                href={`/societies/${society.slug}`}
                className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={society.image}
                    alt={society.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Content on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {society.name}
                    </h2>
                    <div className="flex items-center gap-2 text-white/80 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{society.location}</span>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                        Est. {society.established}
                      </span>
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                        {society.plots} Plots
                      </span>
                      <span className="rounded-full bg-[#29ABE2]/80 px-3 py-1 text-xs font-medium text-white">
                        {society.noc}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="bg-white px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Total Area</p>
                    <p className="text-sm font-semibold text-[#4A4A4A]">
                      {society.totalArea}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Developer</p>
                    <p className="text-sm font-semibold text-[#4A4A4A]">
                      {society.developer}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-semibold text-[#29ABE2]">
                      {society.status}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[#29ABE2] font-semibold text-sm group-hover:gap-2 transition-all">
                    View
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
