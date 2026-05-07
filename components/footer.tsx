import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Projects", href: "/properties" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  const projects = [
    "Faisal Town Phase 1",
    "Blue Heights",
    "Moon Residencia",
    "Pearl Towers",
    "Green Valley Villas",
    "Crescent Heights",
  ];

  return (
    <footer className="bg-[#4A4A4A]">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 - Brand */}
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-[#29ABE2]">BLUE MOON</h2>
              <p className="text-lg font-semibold text-white">ASSOCIATES</p>
              <p className="mt-1 text-sm text-[#C9963A]">
                Consultants | Builders | Developers
              </p>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-white/70">
              Your trusted partner in real estate development. We bring dreams
              to life with exceptional craftsmanship and unwavering commitment
              to quality.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm font-medium text-[#29ABE2] hover:text-[#29ABE2]/80"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-sm font-medium text-[#29ABE2] hover:text-[#29ABE2]/80"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-sm font-medium text-[#29ABE2] hover:text-[#29ABE2]/80"
              >
                Youtube
              </a>
              <a
                href="https://wa.me/923369218748?text=Hi, I found your website and I am interested in your properties. Please contact me."
                className="text-sm font-medium text-[#29ABE2] hover:text-[#29ABE2]/80"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 transition-colors hover:text-[#29ABE2]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Our Projects */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Our Projects
            </h3>
            <ul className="space-y-3">
              {projects.map((project) => (
                <li key={project}>
                  <a
                    href="#"
                    className="text-white/70 transition-colors hover:text-[#29ABE2]"
                  >
                    {project}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#29ABE2]" />
                <span className="text-white/70">+92 336 921 8748</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#29ABE2]" />
                <span className="text-white/70">
                  info@bluemoonassociates.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#29ABE2]" />
                <span className="text-white/70">Rawalpindi, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <p className="text-center text-sm text-white/50">
            &copy; 2025 Blue Moon Associates. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
