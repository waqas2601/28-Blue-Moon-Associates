import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Leadership from "@/components/leadership";
import { Target, Eye, Heart, Shield, Users } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { number: "20+", label: "Years of Experience" },
    { number: "500+", label: "Projects Completed" },
    { number: "10,000+", label: "Satisfied Clients" },
    { number: "50+", label: "Awards Won" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Integrity",
      description:
        "We believe in transparent dealings and honest communication with all our clients and partners.",
    },
    {
      icon: Shield,
      title: "Excellence",
      description:
        "We strive for excellence in every project, ensuring the highest quality standards are met.",
    },
    {
      icon: Users,
      title: "Client Focus",
      description:
        "Our clients are at the heart of everything we do. Their satisfaction is our ultimate goal.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 text-center px-4 pt-20">
          <span className="inline-block text-sm uppercase tracking-widest text-[#C9963A] mb-4">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Who We Are
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Discover the story behind Blue Moon Associates and our commitment to
            excellence in real estate
          </p>
        </div>
      </section>

      {/* Company Story - Alternating Layout */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Row 1 - Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80"
                alt="Blue Moon Associates Office"
                className="rounded-lg shadow-xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#29ABE2] text-white p-6 rounded-lg shadow-lg hidden md:block">
                <div className="text-4xl font-bold">2002</div>
                <div className="text-sm">Established</div>
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-4">
                <span className="w-8 h-[2px] bg-[#C9963A]" />
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] mb-6">
                Building Dreams Since 2002
              </h2>
              <p className="text-[#4A4A4A]/70 mb-4 leading-relaxed">
                Founded in 2002, Blue Moon Associates has grown from a small
                consultancy firm to one of Pakistan's most trusted names in real
                estate. Our journey began with a simple mission: to help people
                find their dream properties while maintaining the highest
                standards of integrity and professionalism.
              </p>
              <p className="text-[#4A4A4A]/70 mb-6 leading-relaxed">
                Under the visionary leadership of Shafaat Khan and Abbas Ali, we
                have successfully marketed over 500 projects across major cities
                including Lahore, Islamabad, Karachi, and Rawalpindi.
              </p>
              <button className="bg-[#29ABE2] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#29ABE2]/90 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Row 2 - Text Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-4">
                <span className="w-8 h-[2px] bg-[#C9963A]" />
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] mb-6">
                Excellence in Every Project
              </h2>
              <p className="text-[#4A4A4A]/70 mb-4 leading-relaxed">
                At Blue Moon Associates, we believe every project is an
                opportunity to create something extraordinary. Our team of
                dedicated professionals works tirelessly to ensure that every
                development meets the highest standards of quality and
                craftsmanship.
              </p>
              <p className="text-[#4A4A4A]/70 mb-6 leading-relaxed">
                From the initial consultation to the final handover, we guide
                our clients through every step of the process, ensuring a
                seamless and rewarding experience.
              </p>
              <button className="bg-[#29ABE2] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#29ABE2]/90 transition-colors">
                Our Projects
              </button>
            </div>
            <div className="relative order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80"
                alt="Excellence in Projects"
                className="rounded-lg shadow-xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#C9963A] text-white p-6 rounded-lg shadow-lg hidden md:block">
                <div className="text-4xl font-bold">500+</div>
                <div className="text-sm">Projects Done</div>
              </div>
            </div>
          </div>

          {/* Row 3 - Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80"
                alt="Our Community"
                className="rounded-lg shadow-xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#29ABE2] text-white p-6 rounded-lg shadow-lg hidden md:block">
                <div className="text-4xl font-bold">10k+</div>
                <div className="text-sm">Happy Clients</div>
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-4">
                <span className="w-8 h-[2px] bg-[#C9963A]" />
                Our Community
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A] mb-6">
                Creating Communities That Last
              </h2>
              <p className="text-[#4A4A4A]/70 mb-4 leading-relaxed">
                We don't just build properties — we build communities. Every
                development by Blue Moon Associates is designed with the
                residents in mind, creating spaces where families can thrive and
                investments can grow.
              </p>
              <p className="text-[#4A4A4A]/70 mb-6 leading-relaxed">
                Our commitment to sustainable development and community building
                has earned us the trust of over 10,000 satisfied clients across
                Pakistan.
              </p>
              <button className="bg-[#29ABE2] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#29ABE2]/90 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#29ABE2]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <Leadership />

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-4">
              <span className="w-8 h-[2px] bg-[#C9963A]" />
              Our Purpose
              <span className="w-8 h-[2px] bg-[#C9963A]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">
              Vision & Mission
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg border-l-4 border-[#29ABE2] shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#29ABE2]/10 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-[#29ABE2]" />
                </div>
                <h3 className="text-xl font-bold text-[#29ABE2]">Our Vision</h3>
              </div>
              <p className="text-[#4A4A4A]/70 leading-relaxed">
                To be the most trusted and innovative real estate company in
                Pakistan, setting new standards in property consulting,
                construction, and development while creating lasting value for
                our clients and communities.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border-l-4 border-[#29ABE2] shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#29ABE2]/10 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-[#29ABE2]" />
                </div>
                <h3 className="text-xl font-bold text-[#29ABE2]">
                  Our Mission
                </h3>
              </div>
              <p className="text-[#4A4A4A]/70 leading-relaxed">
                To provide exceptional real estate services by combining market
                expertise, innovative solutions, and unwavering commitment to
                client satisfaction. We aim to make property ownership
                accessible and rewarding for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-[#C9963A] mb-4">
              <span className="w-8 h-[2px] bg-[#C9963A]" />
              What We Stand For
              <span className="w-8 h-[2px] bg-[#C9963A]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-[#29ABE2]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-[#29ABE2]" />
                </div>
                <h3 className="text-xl font-bold text-[#4A4A4A] mb-4">
                  {value.title}
                </h3>
                <p className="text-[#4A4A4A]/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#29ABE2]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Let us help you find your dream property or bring your real estate
            vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#29ABE2] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              View Projects
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
