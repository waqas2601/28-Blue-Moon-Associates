"use client";

import { Suspense, useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Search,
  Filter,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  MessageCircle,
  X,
  SlidersHorizontal,
  Home,
  Building2,
  TreePine,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

const sampleProperties = [
  {
    id: 1,
    title: "Modern Family Home",
    society: "Faisal Hills",
    type: "Residential",
    beds: 4,
    baths: 3,
    area: "10 Marla",
    price: "PKR 2.5 Cr",
    priceNum: 25000000,
    location: "Faisal Hills, Islamabad",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Luxury Apartment",
    society: "Multi Garden B-17",
    type: "Residential",
    beds: 3,
    baths: 2,
    area: "8 Marla",
    price: "PKR 1.2 Cr",
    priceNum: 12000000,
    location: "B-17, Islamabad",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Commercial Office Space",
    society: "Faisal Town",
    type: "Commercial",
    beds: 0,
    baths: 2,
    area: "5 Marla",
    price: "PKR 80 Lac",
    priceNum: 8000000,
    location: "Faisal Town, Islamabad",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Prime Residential Plot",
    society: "Faisal Town Phase II",
    type: "Plot",
    beds: 0,
    baths: 0,
    area: "1 Kanal",
    price: "PKR 2 Cr",
    priceNum: 20000000,
    location: "Faisal Town Phase II",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    title: "Spacious Corner Villa",
    society: "Faisal Hills",
    type: "Residential",
    beds: 5,
    baths: 4,
    area: "1 Kanal",
    price: "PKR 4.5 Cr",
    priceNum: 45000000,
    location: "Faisal Hills, Islamabad",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    title: "Commercial Shop",
    society: "Multi Garden B-17",
    type: "Commercial",
    beds: 0,
    baths: 1,
    area: "4 Marla",
    price: "PKR 50 Lac",
    priceNum: 5000000,
    location: "B-17, Islamabad",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    title: "Beautiful Family House",
    society: "Faisal Town",
    type: "Residential",
    beds: 3,
    baths: 2,
    area: "7 Marla",
    price: "PKR 85 Lac",
    priceNum: 8500000,
    location: "Faisal Town, Islamabad",
    image:
      "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    title: "Commercial Plaza",
    society: "Faisal Town Phase II",
    type: "Commercial",
    beds: 0,
    baths: 2,
    area: "10 Marla",
    price: "PKR 1.8 Cr",
    priceNum: 18000000,
    location: "Faisal Town Phase II",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
  },
  {
    id: 9,
    title: "Residential Plot",
    society: "Faisal Hills",
    type: "Plot",
    beds: 0,
    baths: 0,
    area: "5 Marla",
    price: "PKR 45 Lac",
    priceNum: 4500000,
    location: "Faisal Hills, Islamabad",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
  },
];

const typeIcons: Record<string, React.ReactNode> = {
  Residential: <Home className="h-3.5 w-3.5" />,
  Commercial: <Building2 className="h-3.5 w-3.5" />,
  Plot: <TreePine className="h-3.5 w-3.5" />,
};

function PropertiesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSociety, setSelectedSociety] = useState("All");
  const [selectedType, setSelectedType] = useState("All Types");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams.get("type");
    const society = searchParams.get("society");
    if (type) setSelectedType(type);
    if (society) setSelectedSociety(society);
  }, [searchParams]);

  const societies = [
    "All",
    "Faisal Hills",
    "Multi Garden B-17",
    "Faisal Town",
    "Faisal Town Phase II",
  ];

  const propertyTypes = ["All Types", "Residential", "Commercial", "Plot"];

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedSociety("All");
    setSelectedType("All Types");
    setMinPrice("");
    setMaxPrice("");
  };

  const filteredProperties = sampleProperties.filter((prop) => {
    const matchesSearch =
      prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.society.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSociety =
      selectedSociety === "All" || prop.society === selectedSociety;
    const matchesType =
      selectedType === "All Types" || prop.type === selectedType;
    const min = minPrice ? parseInt(minPrice) * 1000000 : 0;
    const max = maxPrice ? parseInt(maxPrice) * 1000000 : Infinity;
    const matchesPrice = prop.priceNum >= min && prop.priceNum <= max;
    return matchesSearch && matchesSociety && matchesType && matchesPrice;
  });

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#4A4A4A]">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-[#4A4A4A] placeholder-gray-400 focus:border-[#29ABE2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Society */}
      <div>
        <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#4A4A4A]">
          Society
        </label>
        <div className="space-y-1">
          {societies.map((society) => (
            <button
              key={society}
              onClick={() => setSelectedSociety(society)}
              className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all ${
                selectedSociety === society
                  ? "bg-[#29ABE2] text-white"
                  : "text-[#4A4A4A] hover:bg-gray-100"
              }`}
            >
              {society}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Property Type */}
      <div>
        <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#4A4A4A]">
          Property Type
        </label>
        <div className="space-y-1">
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all ${
                selectedType === type
                  ? "bg-[#C9963A] text-white"
                  : "text-[#4A4A4A] hover:bg-gray-100"
              }`}
            >
              {typeIcons[type]}
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Price Range */}
      <div>
        <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#4A4A4A]">
          Price Range (in Crore)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-1/2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#4A4A4A] placeholder-gray-400 focus:border-[#29ABE2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-[#4A4A4A] placeholder-gray-400 focus:border-[#29ABE2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/20"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="w-full rounded-lg border-2 border-[#29ABE2] px-4 py-2.5 text-sm font-semibold text-[#29ABE2] transition-colors hover:bg-[#29ABE2] hover:text-white"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Title Bar */}
        <div className="border-b border-gray-200 bg-white pt-20">
          <div className="mx-auto max-w-7xl px-4 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#4A4A4A]">
                  Properties
                </h1>
                <p className="mt-0.5 text-sm text-gray-500">
                  {filteredProperties.length} properties found
                </p>
              </div>
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFiltersDrawer(true)}
                className="flex items-center gap-2 rounded-lg border-2 border-[#29ABE2] px-4 py-2 text-sm font-semibold text-[#29ABE2] lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar — Desktop */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 w-64 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-[#29ABE2]" />
                    <span className="font-bold text-[#4A4A4A]">Filters</span>
                  </div>
                  {(selectedSociety !== "All" ||
                    selectedType !== "All Types" ||
                    searchQuery ||
                    minPrice ||
                    maxPrice) && (
                    <button
                      onClick={resetFilters}
                      className="text-xs text-[#29ABE2] hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <FilterPanel />
              </div>
            </aside>

            {/* Properties Grid */}
            <div className="flex-1">
              {/* Active Filters Tags */}
              {(selectedSociety !== "All" ||
                selectedType !== "All Types" ||
                searchQuery) && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {selectedSociety !== "All" && (
                    <span className="flex items-center gap-1 rounded-full bg-[#29ABE2]/10 px-3 py-1 text-xs font-medium text-[#29ABE2]">
                      {selectedSociety}
                      <button onClick={() => setSelectedSociety("All")}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {selectedType !== "All Types" && (
                    <span className="flex items-center gap-1 rounded-full bg-[#C9963A]/10 px-3 py-1 text-xs font-medium text-[#C9963A]">
                      {selectedType}
                      <button onClick={() => setSelectedType("All Types")}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      "{searchQuery}"
                      <button onClick={() => setSearchQuery("")}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}

              {filteredProperties.length === 0 ? (
                <div className="flex h-96 flex-col items-center justify-center rounded-xl bg-white border border-gray-100">
                  <Filter className="mb-4 h-12 w-12 text-gray-300" />
                  <p className="text-lg font-semibold text-gray-500">
                    No properties found
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    Try adjusting your filters
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 rounded-lg bg-[#29ABE2] px-6 py-2 text-sm font-semibold text-white"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {filteredProperties.map((property) => (
                    <div
                      key={property.id}
                      className="group overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1"
                    >
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Badges */}
                        <div className="absolute left-3 top-3">
                          <span className="rounded-full bg-[#29ABE2] px-2.5 py-1 text-xs font-semibold text-white shadow">
                            {property.society}
                          </span>
                        </div>
                        <div className="absolute right-3 top-3">
                          <span className="flex items-center gap-1 rounded-full bg-[#C9963A] px-2.5 py-1 text-xs font-semibold text-white shadow">
                            {typeIcons[property.type]}
                            {property.type}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="mb-2 text-base font-bold text-[#4A4A4A] line-clamp-1">
                          {property.title}
                        </h3>

                        {/* Details */}
                        <div className="mb-3 flex flex-wrap gap-3 text-xs text-gray-500">
                          {property.type === "Residential" && (
                            <>
                              <span className="flex items-center gap-1">
                                <Bed className="h-3.5 w-3.5 text-[#29ABE2]" />
                                {property.beds} Beds
                              </span>
                              <span className="flex items-center gap-1">
                                <Bath className="h-3.5 w-3.5 text-[#29ABE2]" />
                                {property.baths} Baths
                              </span>
                            </>
                          )}
                          <span className="flex items-center gap-1">
                            <Maximize2 className="h-3.5 w-3.5 text-[#29ABE2]" />
                            {property.area}
                          </span>
                        </div>

                        {/* Price */}
                        <p className="mb-2 text-lg font-bold text-[#29ABE2]">
                          {property.price}
                        </p>

                        {/* Location */}
                        <div className="mb-4 flex items-center gap-1 text-xs text-gray-400">
                          <MapPin className="h-3.5 w-3.5 text-[#C9963A]" />
                          {property.location}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2">
                          <a
                            href={`/properties/${property.id}`}
                            className="flex-1 rounded-lg bg-[#29ABE2] py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#29ABE2]/90"
                          >
                            View Details
                          </a>

                          <a
                            href={`https://wa.me/923311110066?text=Hi, I am interested in ${property.title} in ${property.society}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 rounded-lg bg-green-500 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
                          >
                            <MessageCircle className="h-4 w-4" />
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filters Drawer */}
        {showFiltersDrawer && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowFiltersDrawer(false)}
            />
            <div className="absolute right-0 top-0 h-full w-80 overflow-y-auto bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-[#29ABE2]" />
                  <h2 className="font-bold text-[#4A4A4A]">Filters</h2>
                </div>
                <button
                  onClick={() => setShowFiltersDrawer(false)}
                  className="rounded-lg p-1.5 hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-[#4A4A4A]" />
                </button>
              </div>
              <FilterPanel />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-[#29ABE2] text-xl font-semibold">Loading...</p>
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
}
