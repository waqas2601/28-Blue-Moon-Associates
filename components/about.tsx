import { Eye, Target } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="bg-white pt-64 sm:pt-48 lg:pt-32 pb-20">
      {" "}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            {/* Label with line */}
            <div className="mb-6 flex items-center gap-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#C9963A]">
                About Us
              </span>
              <div className="h-px w-16 bg-[#C9963A]" />
            </div>

            {/* Heading */}
            <h2 className="mb-6 text-3xl font-bold leading-tight text-[#4A4A4A] sm:text-4xl lg:text-5xl">
              A Legacy of Excellence in Real Estate
            </h2>

            {/* Paragraphs */}
            <p className="mb-4 text-base leading-relaxed text-[#4A4A4A]/80 sm:text-lg">
              Founded in 2019, Blue Moon Associates has become a recognized
              force in Pakistan&apos;s real estate sector, delivering
              residential, commercial, and mixed-use developments with integrity
              and scale.
            </p>
            <p className="mb-8 text-base leading-relaxed text-[#4A4A4A]/80 sm:text-lg">
              Under our experienced leadership, we have contributed to some of
              the most prominent master-planned communities, consistently
              aligning strategic marketing expertise with sustainable urban
              development.
            </p>

            {/* Button */}
            <div>
              <a
                href="/about"
                className="rounded-full bg-[#29ABE2] px-8 py-3 font-semibold text-white transition-colors cursor-pointer hover:bg-[#29ABE2]/90"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Column - Cards */}
          <div className="flex flex-col gap-6">
            {/* Vision Card */}
            <div className="rounded-lg border-l-4 border-[#29ABE2] bg-gray-100 p-6 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#29ABE2]/10">
                <Eye className="h-6 w-6 text-[#29ABE2]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#29ABE2] sm:text-2xl">
                Our Vision
              </h3>
              <p className="leading-relaxed text-[#4A4A4A]/80">
                To be the leading real estate development and marketing company
                in Pakistan, known for transforming landscapes and lives through
                innovative, sustainable, and community-centered projects.
              </p>
            </div>

            {/* Mission Card */}
            <div className="rounded-lg border-l-4 border-[#C9963A] bg-gray-100 p-6 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C9963A]/10">
                <Target className="h-6 w-6 text-[#C9963A]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#C9963A] sm:text-2xl">
                Our Mission
              </h3>
              <p className="leading-relaxed text-[#4A4A4A]/80">
                To deliver exceptional value to our clients and partners by
                providing comprehensive real estate solutions, from strategic
                consulting to full-scale development and marketing services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
