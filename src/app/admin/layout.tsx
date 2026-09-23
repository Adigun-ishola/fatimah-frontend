"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminGuard from "@/components/admin/AdminGuard";
import { Menu, Scale, ExternalLink } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <main className="min-h-screen bg-gray-50">{children}</main>;
  }

  return (
    <AdminGuard>
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 text-gray-800">
        {/* Mobile Top Navbar (Visible only on screens < md) */}
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#0f2440] text-white shadow-md">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#c9a84c] flex items-center justify-center">
                <Scale className="w-4 h-4 text-[#1a365d]" />
              </div>
              <span className="font-bold text-sm">Admin Portal</span>
            </div>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium text-[#c9a84c] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Site</span>
          </Link>
        </header>

        {/* Sidebar Component (Desktop persistent + Mobile Drawer) */}
        <AdminSidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Main Dashboard Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </AdminGuard>
  );
}