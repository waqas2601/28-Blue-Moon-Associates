import { Bed, Bath, Maximize, MapPin } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Faisal Town Phase 1",
    city: "Islamabad",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    price: "PKR 1.5 Crore",
    location: "Faisal Town, Islamabad",
  },
  {
    id: 2,
    name: "Blue Heights",
    city: "Lahore",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    price: "PKR 2.8 Crore",
    location: "DHA Phase 6, Lahore",
  },
  {
    id: 3,
    name: "Moon Residencia",
    city: "Rawalpindi",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    price: "PKR 85 Lac",
    location: "Bahria Town, Rawalpindi",
  },
  {
    id: 4,
    name: "Pearl Towers",
    city: "Karachi",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    price: "PKR 2.2 Crore",
    location: "Clifton, Karachi",
  },
  {
    id: 5,
    name: "Green Valley Villas",
    city: "Islamabad",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    price: "PKR 4.5 Crore",
    location: "E-11 Sector, Islamabad",
  },
  {
    id: 6,
    name: "Crescent Heights",
    city: "Lahore",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    price: "PKR 1.8 Crore",
    location: "Johar Town, Lahore",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-[#F5F5F5] py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C9963A]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[#C9963A]">
              Our Projects
            </span>
            <span className="h-px w-8 bg-[#C9963A]" />
          </div>
          <h2 className="text-3xl font-bold text-[#4A4A4A] sm:text-4xl">
            Explore Our Developments
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#4A4A4A]/70">
            Discover our portfolio of residential and commercial projects across
            Pakistan
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {/* City Badge */}
                <span className="absolute left-4 top-4 rounded-full bg-[#29ABE2] px-3 py-1 text-sm font-medium text-white">
                  {project.city}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title */}
                <h3 className="text-xl font-bold text-[#4A4A4A]">
                  {project.name}
                </h3>

                {/* Details Row */}
                <div className="mt-3 flex items-center gap-4 text-sm text-[#4A4A4A]/70">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{project.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{project.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize className="h-4 w-4" />
                    <span>{project.area} sqft</span>
                  </div>
                </div>

                {/* Price */}
                <p className="mt-3 text-lg font-bold text-[#29ABE2]">
                  {project.price}
                </p>

                {/* Location */}
                <div className="mt-2 flex items-center gap-1 text-sm text-[#4A4A4A]/70">
                  <MapPin className="h-4 w-4" />
                  <span>{project.location}</span>
                </div>

                {/* Button */}
                <button className="mt-4 w-full rounded-lg bg-[#29ABE2] py-3 font-semibold text-white transition-colors duration-200 hover:bg-[#29ABE2]/90">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
