import { ArrowRight, Calendar } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Top Real Estate Investment Areas in Islamabad 2025",
    excerpt:
      "Discover the most promising areas for property investment in Islamabad, including upcoming developments and growth potential.",
    category: "Investment",
    date: "January 15, 2025",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    id: 2,
    title: "Why Rawalpindi is the Next Big Property Market",
    excerpt:
      "Explore why savvy investors are turning their attention to Rawalpindi's rapidly developing real estate sector.",
    category: "Market Trends",
    date: "January 10, 2025",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  },
  {
    id: 3,
    title: "How to Choose the Right Property Developer in Pakistan",
    excerpt:
      "Essential tips and criteria for selecting a trustworthy and reliable property developer for your next investment.",
    category: "Guides",
    date: "January 5, 2025",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
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
            Stay updated with the latest trends and news in Pakistan&apos;s real
            estate market
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Category Badge */}
                <span className="absolute left-4 top-4 rounded-full bg-[#C9963A] px-3 py-1 text-xs font-semibold text-white">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="mb-3 text-lg font-bold text-[#4A4A4A] transition-colors group-hover:text-[#29ABE2]">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mb-4 line-clamp-2 text-sm text-[#4A4A4A]/70">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#29ABE2] transition-colors hover:text-[#29ABE2]/80"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
