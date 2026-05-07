import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Blog from "@/components/blog";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import { supabase } from "@/lib/supabase";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  MessageCircle,
  Building2,
} from "lucide-react";

export default async function Home() {
  // Fetch featured properties
  const { data: featuredProperties } = await supabase
    .from("properties")
    .select("*")
    .eq("featured", true)
    .eq("status", "Available")
    .limit(6);

  // Fetch latest blogs
  const { data: latestBlogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <About />

      {/* Featured Properties Section */}
      {featuredProperties && featuredProperties.length > 0 && (
        <section className="bg-[#F5F5F5] py-20">
          <div className="mx-auto max-w-7xl px-4">
            {/* Header */}
            <div className="mb-12 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#C9963A]" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#C9963A]">
                  Featured Properties
                </span>
                <span className="h-px w-8 bg-[#C9963A]" />
              </div>
              <h2 className="text-3xl font-bold text-[#4A4A4A] sm:text-4xl">
                Our Latest Properties
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[#4A4A4A]/70">
                Discover our handpicked selection of premium properties
              </p>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProperties.map((property: any) => (
                <div
                  key={property.id}
                  className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    {property.images ? (
                      <img
                        src={property.images.split(",")[0].trim()}
                        alt={property.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gray-100">
                        <Building2 className="h-12 w-12 text-gray-300" />
                      </div>
                    )}
                    {/* Badges */}
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-[#29ABE2] px-2.5 py-1 text-xs font-semibold text-white">
                        {property.society}
                      </span>
                    </div>
                    <div className="absolute right-3 top-3">
                      <span className="rounded-full bg-[#C9963A] px-2.5 py-1 text-xs font-semibold text-white">
                        {property.type}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="mb-3 text-lg font-bold text-[#4A4A4A] line-clamp-1">
                      {property.title}
                    </h3>

                    {/* Details */}
                    <div className="mb-3 flex flex-wrap gap-3 text-xs text-gray-500">
                      {property.type === "Residential" && property.beds > 0 && (
                        <span className="flex items-center gap-1">
                          <Bed className="h-3.5 w-3.5 text-[#29ABE2]" />
                          {property.beds} Beds
                        </span>
                      )}
                      {property.type === "Residential" &&
                        property.baths > 0 && (
                          <span className="flex items-center gap-1">
                            <Bath className="h-3.5 w-3.5 text-[#29ABE2]" />
                            {property.baths} Baths
                          </span>
                        )}
                      {property.area && (
                        <span className="flex items-center gap-1">
                          <Maximize2 className="h-3.5 w-3.5 text-[#29ABE2]" />
                          {property.area}
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <p className="mb-2 text-lg font-bold text-[#29ABE2]">
                      {property.price}
                    </p>

                    {/* Location */}
                    {property.location && (
                      <div className="mb-4 flex items-center gap-1 text-xs text-gray-400">
                        <MapPin className="h-3.5 w-3.5 text-[#C9963A]" />
                        {property.location}
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-2">
                      <a
                        href={`/properties/${property.slug || property.id}`}
                        className="flex-1 rounded-lg bg-[#29ABE2] py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#29ABE2]/90"
                      >
                        View Details
                      </a>

                      <a
                        href={`https://wa.me/923369218748?text=Hi, I am interested in ${property.title} in ${property.society}. Please contact me.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 rounded-lg bg-green-500 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-10 text-center">
              <a
                href="/properties"
                className="inline-block rounded-full bg-[#29ABE2] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#29ABE2]/90"
              >
                View All Properties
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Blog Section */}
      {latestBlogs && latestBlogs.length > 0 ? (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-16 text-center">
              <div className="mb-4 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-[#C9963A]" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#C9963A]">
                  Blog & Media
                </span>
                <span className="h-px w-12 bg-[#C9963A]" />
              </div>
              <h2 className="text-3xl font-bold text-[#4A4A4A] sm:text-4xl">
                Latest News & Insights
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[#4A4A4A]/70">
                Stay updated with the latest trends and news in Pakistan's real
                estate market
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {latestBlogs.map((post: any) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    {post.thumbnail ? (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200" />
                    )}
                    {post.category && (
                      <span className="absolute left-4 top-4 rounded-full bg-[#C9963A] px-3 py-1 text-xs font-semibold text-white">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="mb-2 text-xs text-gray-400">
                      {new Date(post.created_at).toLocaleDateString("en-PK", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <h3 className="mb-3 text-lg font-bold text-[#4A4A4A] line-clamp-2 transition-colors group-hover:text-[#29ABE2]">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mb-4 line-clamp-2 text-sm text-[#4A4A4A]/70">
                        {post.excerpt}
                      </p>
                    )}

                    <a
                      href={`/blog/${post.slug || post.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#29ABE2] transition-colors hover:text-[#29ABE2]/80"
                    >
                      Read More →
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a
                href="/blog"
                className="inline-block rounded-full border-2 border-[#29ABE2] px-8 py-3 font-semibold text-[#29ABE2] transition-colors hover:bg-[#29ABE2] hover:text-white"
              >
                View All Posts
              </a>
            </div>
          </div>
        </section>
      ) : (
        <Blog />
      )}

      <Contact />
      <Footer />
    </main>
  );
}
