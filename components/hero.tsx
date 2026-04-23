const stats = [
  { number: "20+", label: "Years of Experience" },
  { number: "500+", label: "Projects Marketed" },
  { number: "10,000+", label: "Satisfied Clients" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Modern city buildings"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-20 pb-32 text-center">
        {/* Badge */}
        <span className="mb-6 text-sm font-semibold uppercase tracking-widest text-[#C9963A]">
          Welcome to Blue Moon Associates
        </span>

        {/* Heading */}
        <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block text-balance">Building Dreams.</span>
          <span className="block text-balance">Delivering Legacy.</span>
        </h1>

        {/* Subtext */}
        <p className="mb-10 max-w-2xl text-base text-gray-300 sm:text-lg md:text-xl">
          Your trusted partner in real estate — Consultants | Builders |
          Developers
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <a
            href="#projects"
            className="rounded-full bg-[#29ABE2] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#29ABE2]/90 sm:text-base"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border-2 border-white px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#4A4A4A] sm:text-base"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Stats Boxes */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-lg bg-white px-6 py-8 shadow-xl"
              >
                <span className="text-3xl font-bold text-[#29ABE2] sm:text-4xl">
                  {stat.number}
                </span>
                <span className="mt-2 text-center text-sm font-medium text-[#4A4A4A] sm:text-base">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
