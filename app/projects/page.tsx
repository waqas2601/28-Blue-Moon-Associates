"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Bed, Bath, Ruler, MapPin } from "lucide-react"

interface Project {
  id: number
  title: string
  city: string
  type: string
  beds: number
  baths: number
  area: string
  price: string
  image: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Modern Residential Complex",
    city: "Islamabad",
    type: "Residential",
    beds: 4,
    baths: 3,
    area: "4500 sq ft",
    price: "PKR 8.5 Cr",
    image: "https://images.unsplash.com/photo-1512917774080-9b274b397534?w=500&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Business Hub Tower",
    city: "Lahore",
    type: "Commercial",
    beds: 0,
    baths: 0,
    area: "10000 sq ft",
    price: "PKR 15 Cr",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Luxury Apartments",
    city: "Karachi",
    type: "Residential",
    beds: 3,
    baths: 2,
    area: "3500 sq ft",
    price: "PKR 6.2 Cr",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Executive Apartments",
    city: "Rawalpindi",
    type: "Residential",
    beds: 2,
    baths: 2,
    area: "2500 sq ft",
    price: "PKR 4.5 Cr",
    image: "https://images.unsplash.com/photo-1545324418-cc1a9f4ef042?w=500&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Commercial Plaza",
    city: "Islamabad",
    type: "Commercial",
    beds: 0,
    baths: 0,
    area: "8000 sq ft",
    price: "PKR 12 Cr",
    image: "https://images.unsplash.com/photo-1460925895917-adf4e7fb518b?w=500&h=400&fit=crop"
  },
  {
    id: 6,
    title: "Family Villas",
    city: "Lahore",
    type: "Residential",
    beds: 5,
    baths: 4,
    area: "6000 sq ft",
    price: "PKR 10.5 Cr",
    image: "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=500&h=400&fit=crop"
  },
  {
    id: 7,
    title: "Retail Market",
    city: "Karachi",
    type: "Commercial",
    beds: 0,
    baths: 0,
    area: "12000 sq ft",
    price: "PKR 18 Cr",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop"
  },
  {
    id: 8,
    title: "Premium Residences",
    city: "Rawalpindi",
    type: "Residential",
    beds: 3,
    baths: 3,
    area: "4000 sq ft",
    price: "PKR 7.8 Cr",
    image: "https://images.unsplash.com/photo-1512917774080-9b274b397534?w=500&h=400&fit=crop"
  },
  {
    id: 9,
    title: "Office Complex",
    city: "Islamabad",
    type: "Commercial",
    beds: 0,
    baths: 0,
    area: "15000 sq ft",
    price: "PKR 22 Cr",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop"
  }
]

export default function ProjectsPage() {
  const [activeCity, setActiveCity] = useState("All")
  const [activeType, setActiveType] = useState("All Types")

  const cities = ["All", "Islamabad", "Rawalpindi", "Lahore", "Karachi"]
  const types = ["All Types", "Residential", "Commercial"]

  const filteredProjects = projects.filter((project) => {
    const cityMatch = activeCity === "All" || project.city === activeCity
    const typeMatch = activeType === "All Types" || project.type === activeType
    return cityMatch && typeMatch
  })

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative min-h-[450px] bg-cover bg-center pt-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=600&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[450px] px-4 py-20">
          <p className="text-[#C9963A] text-sm font-semibold uppercase tracking-widest mb-4">Our Projects</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 max-w-3xl">
            Explore Our Developments
          </h1>
          <p className="text-white/70 text-lg max-w-2xl text-center">
            Discover our portfolio of premium residential and commercial projects across Pakistan
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white shadow-md sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* City Filters */}
          <div className="mb-6">
            <p className="text-[#4A4A4A] font-semibold text-sm mb-4">Filter by City</p>
            <div className="flex flex-wrap gap-3">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    activeCity === city
                      ? "bg-[#29ABE2] text-white"
                      : "bg-white border-2 border-[#4A4A4A] text-[#4A4A4A] hover:border-[#29ABE2]"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filters */}
          <div>
            <p className="text-[#4A4A4A] font-semibold text-sm mb-4">Filter by Type</p>
            <div className="flex flex-wrap gap-3">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    activeType === type
                      ? "bg-[#29ABE2] text-white"
                      : "bg-white border-2 border-[#4A4A4A] text-[#4A4A4A] hover:border-[#29ABE2]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {/* City Badge */}
                  <div className="absolute top-4 left-4 bg-[#29ABE2] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {project.city}
                  </div>
                  {/* Type Badge */}
                  <div className="absolute top-4 right-4 bg-[#C9963A] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {project.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#4A4A4A] mb-4">{project.title}</h3>

                  {/* Features Row */}
                  {project.type === "Residential" && (
                    <div className="flex items-center gap-6 mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-2 text-[#4A4A4A]">
                        <Bed size={20} className="text-[#29ABE2]" />
                        <span className="text-sm font-medium">{project.beds}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#4A4A4A]">
                        <Bath size={20} className="text-[#29ABE2]" />
                        <span className="text-sm font-medium">{project.baths}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#4A4A4A]">
                        <Ruler size={20} className="text-[#29ABE2]" />
                        <span className="text-sm font-medium">{project.area}</span>
                      </div>
                    </div>
                  )}

                  {project.type === "Commercial" && (
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200 text-[#4A4A4A]">
                      <Ruler size={20} className="text-[#29ABE2]" />
                      <span className="text-sm font-medium">{project.area}</span>
                    </div>
                  )}

                  {/* Price */}
                  <p className="text-2xl font-bold text-[#29ABE2] mb-4">{project.price}</p>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-[#4A4A4A] mb-6">
                    <MapPin size={18} className="text-[#C9963A]" />
                    <span className="text-sm">{project.city}</span>
                  </div>

                  {/* View Details Button */}
                  <button
  onClick={() => window.location.href = `/projects/${project.id}`}
  className="w-full bg-[#29ABE2] text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
  View Details
</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#4A4A4A] text-lg">No projects found. Try adjusting your filters.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
