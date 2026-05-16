"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Tag,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Leads",
    href: "/admin/leads",
    icon: Users,
  },
  {
    name: "Properties",
    href: "/admin/properties",
    icon: Building2,
  },
  {
    name: "Blogs",
    href: "/admin/blogs",
    icon: FileText,
    submenu: [
      { name: "All Blogs", href: "/admin/blogs" },
      { name: "Categories", href: "/admin/categories" },
    ],
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session && pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#29ABE2] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex overflow-hidden">
      {/* Sidebar — Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#4A4A4A] min-h-screen fixed left-0 top-0">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-[#29ABE2]">BLUE MOON</h1>
          <p className="text-sm font-semibold text-white">ASSOCIATES</p>
          <p className="text-xs text-[#C9963A] mt-0.5">Admin Panel</p>
        </div>

        {/* Menu */}
        {/* Desktop Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              item.submenu?.some((s) => pathname === s.href);
            const isSubmenuOpen =
              isActive ||
              item.submenu?.some((s) => pathname.startsWith(s.href));

            return (
              <div key={item.name}>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    pathname === item.href
                      ? "bg-[#29ABE2] text-white"
                      : isActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium flex-1">{item.name}</span>
                  {item.submenu && (
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        isSubmenuOpen ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </a>

                {/* Submenu */}
                {item.submenu && isSubmenuOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.submenu.map((sub) => (
                      <a
                        key={sub.name}
                        href={sub.href}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${
                          pathname === sub.href
                            ? "bg-[#29ABE2] text-white"
                            : "text-white/60 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-all w-full"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#4A4A4A] flex flex-col">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-[#29ABE2]">BLUE MOON</h1>
                <p className="text-xs text-[#C9963A]">Admin Panel</p>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Mobile Menu */}
            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  item.submenu?.some((s) => pathname === s.href);
                const isSubmenuOpen =
                  isActive ||
                  item.submenu?.some((s) => pathname.startsWith(s.href));

                return (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        pathname === item.href
                          ? "bg-[#29ABE2] text-white"
                          : isActive
                            ? "bg-white/10 text-white"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium flex-1">{item.name}</span>
                      {item.submenu && (
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            isSubmenuOpen ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </a>

                    {/* Submenu */}
                    {item.submenu && isSubmenuOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.submenu.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${
                              pathname === sub.href
                                ? "bg-[#29ABE2] text-white"
                                : "text-white/60 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            <div className="p-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-all w-full"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen bg-gray-100 min-w-0">
        {" "}
        {/* Top Bar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div>
              <p className="text-xs text-gray-400 capitalize">
                {pathname.split("/").pop()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#29ABE2] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="text-sm font-medium text-[#4A4A4A] hidden sm:block">
              Admin
            </span>
          </div>
        </header>
        {/* Page Content */}
        {/* key forces the page component to remount on every navigation, preventing stale isLoading:true */}
        <main className="flex-1 p-6 overflow-hidden" key={pathname}>{children}</main>{" "}
      </div>
    </div>
  );
}
