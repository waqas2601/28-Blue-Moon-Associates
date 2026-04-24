"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Projects",
    href: "/projects",
    dropdown: [
      { name: "Project 1", href: "#" },
      { name: "Project 2", href: "#" },
      { name: "Project 3", href: "#" },
    ],
  },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "#" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);

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
              <div key={link.name} className="relative">
                {link.dropdown ? (
                  <div
                    className="group"
                    onMouseEnter={() => setIsProjectsOpen(true)}
                    onMouseLeave={() => setIsProjectsOpen(false)}
                  >
                    <a
                      href="/projects"
                      className="flex items-center gap-1 text-sm font-medium text-[#4A4A4A] transition-colors hover:text-[#29ABE2]"
                    >
                      {link.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isProjectsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </a>
                    {isProjectsOpen && (
                      <div className="absolute left-0 top-full mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-[#4A4A4A] transition-colors hover:bg-[#29ABE2]/10 hover:text-[#29ABE2]"
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
                    className="text-sm font-medium text-[#4A4A4A] transition-colors hover:text-[#29ABE2]"
                  >
                    {link.name}
                  </a>
                )}
              </div>
            ))}
            <a
              href="#"
              className="rounded-full bg-[#29ABE2] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#29ABE2]/90"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
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
                      <button
                        onClick={() =>
                          setIsMobileProjectsOpen(!isMobileProjectsOpen)
                        }
                        className="flex w-full items-center justify-between px-4 py-2 text-sm font-medium text-[#4A4A4A] transition-colors hover:bg-gray-50 hover:text-[#29ABE2]"
                      >
                        {link.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isMobileProjectsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isMobileProjectsOpen && (
                        <div className="bg-gray-50 py-2">
                          {link.dropdown.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block px-8 py-2 text-sm text-[#4A4A4A] transition-colors hover:text-[#29ABE2]"
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
              <div className="px-4 pt-2">
                <a
                  href="#"
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
