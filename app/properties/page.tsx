"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { supabase } from "@/lib/supabase";
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
  Loader2,
} from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  Residential: <Home className="h-3.5 w-3.5" />,
  Commercial: <Building2 className="h-3.5 w-3.5" />,
  Plot: <TreePine className="h-3.5 w-3.5" />,
};

function PropertiesContent() {
  const [properties, setProperties] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSociety, setSelectedSociety] = useState("All");
  const [selectedType, setSelectedType] = useState("All Types");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();

  const societies = [
    "All",
    "Faisal Hills",
    "Multi Garden B-17",
    "Faisal Town",
    "Faisal Town Phase II",
  ];

  const propertyTypes = ["All Types", "Residential", "Commercial", "Plot"];

  useEffect(() => {
    const fetchProperties = async () => {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });
      setProperties(data || []);
      setFiltered(data || []);
      setIsLoading(false);
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const type = searchParams.get("type");
    const society = searchParams.get("society");
    if (type) setSelectedType(type);
    if (society) setSelectedSociety(society);
  }, [searchParams]);

  useEffect(() => {
    let result = properties;
    if (searchQuery) {
      result = result.filter(
        (prop) =>
          prop.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prop.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prop.society?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    if (selectedSociety !== "All") {
      result = result.filter((prop) => prop.society === selectedSociety);
    }
    if (selectedType !== "All Types") {
      result = result.filter((prop) => prop.type === selectedType);
    }
    setFiltered(result);
  }, [searchQuery, selectedSociety, selectedType, properties]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedSociety("All");
    setSelectedType("All Types");
    setMinPrice("");
    setMaxPrice("");
  };

  const FilterPanel = () => (
    <div className="space-y-6">
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
      <div className="h-px bg-gray-100" />
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
      <div className="h-px bg-gray-100" />
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
      <div className="h-px bg-gray-100" />
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
                  {isLoading
                    ? "Loading..."
                    : `${filtered.length} properties found`}
                </p>
              </div>
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

        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 w-64 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-[#29ABE2]" />
                    <span className="font-bold text-[#4A4A4A]">Filters</span>
                  </div>
                  {(selectedSociety !== "All" ||
                    selectedType !== "All Types" ||
                    searchQuery) && (
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
              {/* Active Filter Tags */}
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

              {/* Loading */}
              {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#29ABE2]" />
                    <p className="mt-2 text-sm text-gray-400">
                      Loading properties...
                    </p>
                  </div>
                </div>
              ) : filtered.length === 0 ? (
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
                  {filtered.map((property: any) => (
                    <div
                      key={property.id}
                      className="group overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1"
                    >
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden bg-gray-100">
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
                        {property.status && property.status !== "Available" && (
                          <div className="absolute bottom-3 left-3">
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold text-white ${
                                property.status === "Sold"
                                  ? "bg-red-500"
                                  : "bg-yellow-500"
                              }`}
                            >
                              {property.status}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="mb-2 text-base font-bold text-[#4A4A4A] line-clamp-1">
                          {property.title}
                        </h3>
                        <div className="mb-3 flex flex-wrap gap-3 text-xs text-gray-500">
                          {property.type === "Residential" &&
                            property.beds > 0 && (
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
                        <p className="mb-2 text-lg font-bold text-[#29ABE2]">
                          {property.price}
                        </p>
                        {property.location && (
                          <div className="mb-4 flex items-center gap-1 text-xs text-gray-400">
                            <MapPin className="h-3.5 w-3.5 text-[#C9963A]" />
                            {property.location}
                          </div>
                        )}
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
          <Loader2 className="h-8 w-8 animate-spin text-[#29ABE2]" />
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
}
