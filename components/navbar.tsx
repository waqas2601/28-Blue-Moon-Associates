"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  {
    name: "Properties",
    href: "/properties",
    dropdown: [
      { name: "Featured Listings", href: "/properties" },
      { name: "Residential Properties", href: "/properties?type=Residential" },
      { name: "Commercial Properties", href: "/properties?type=Commercial" },
      { name: "Plots for Sale", href: "/properties?type=Plot" },
    ],
  },
  {
    name: "Societies",
    href: "/societies",
    dropdown: [
      { name: "Faisal Hills", href: "/societies/faisal-hills" },
      { name: "Multi Garden B-17", href: "/societies/b-17" },
      { name: "Faisal Town", href: "/societies/faisal-town" },
      { name: "Faisal Town Phase II", href: "/societies/faisal-town-phase-2" },
    ],
  },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(
    null,
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <div className="flex flex-col">
            <div className="flex flex-col leading-tight">
              <span className="text-2xl font-bold tracking-wide text-[#29ABE2]">
                BLUE MOON
              </span>
              <span className="text-lg font-semibold tracking-widest text-[#4A4A4A]">
                ASSOCIATES
              </span>
            </div>
            <span className="text-xs tracking-wide text-[#C9963A]">
              Consultants | Builders | Developers
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() =>
                  link.dropdown ? setOpenDropdown(link.name) : null
                }
                onMouseLeave={() =>
                  link.dropdown ? setOpenDropdown(null) : null
                }
              >
                {link.dropdown ? (
                  <>
                    <a
                      href={link.href || "#"}
                      className="flex items-center gap-1 text-sm font-medium text-[#4A4A4A] transition-colors hover:text-[#29ABE2]"
                    >
                      {link.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </a>
                    {openDropdown === link.name && (
                      <div className="absolute left-0 top-full w-56 rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-[#4A4A4A] transition-colors hover:bg-[#E3F2FD] hover:text-[#29ABE2]"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={link.href}
                    className="text-sm font-medium text-[#4A4A4A] transition-colors hover:text-[#29ABE2]"
                  >
                    {link.name}
                  </a>
                )}
              </div>
            ))}
            <a
              href="/contact"
              className="rounded-full bg-[#29ABE2] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#29ABE2]/90"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-[#4A4A4A] hover:bg-gray-100 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-[#4A4A4A]" />
            ) : (
              <Menu className="h-6 w-6 text-[#4A4A4A]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-100 py-4 lg:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <div>
                      <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50">
                        <a
                          href={link.href}
                          className="text-sm font-medium text-[#4A4A4A] hover:text-[#29ABE2] flex-1"
                        >
                          {link.name}
                        </a>
                        <button
                          onClick={() =>
                            setMobileOpenDropdown(
                              mobileOpenDropdown === link.name
                                ? null
                                : link.name,
                            )
                          }
                          className="p-1 text-[#4A4A4A] hover:text-[#29ABE2]"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              mobileOpenDropdown === link.name
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                      </div>
                      {mobileOpenDropdown === link.name && (
                        <div className="bg-gray-50 py-2">
                          {link.dropdown.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block px-8 py-2 text-sm text-[#4A4A4A] transition-colors hover:bg-[#E3F2FD] hover:text-[#29ABE2]"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      className="block px-4 py-2 text-sm font-medium text-[#4A4A4A] transition-colors hover:bg-gray-50 hover:text-[#29ABE2]"
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              ))}
              <div className="border-t border-gray-100 px-4 pt-4">
                <a
                  href="/contact"
                  className="block w-full rounded-full bg-[#29ABE2] px-6 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#29ABE2]/90"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
