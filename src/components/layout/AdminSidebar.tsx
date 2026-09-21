"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  GraduationCap,
  Scale,
  Award,
  BookOpen,
  Image as ImageIcon,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Articles", href: "/admin/articles", icon: BookOpen },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "Legal Journey", href: "/admin/legal-journey", icon: Scale },
  { name: "Achievements", href: "/admin/achievements", icon: Award },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Messages", href: "/admin/messages", icon: Mail },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-[#0f2440] text-white flex flex-col flex-shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#c9a84c] flex items-center justify-center font-bold text-[#1a365d]">
            FA
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-wide">Admin Portal</h2>
            <p className="text-xs text-gray-400">Jimoh-Sulaiman F.A.</p>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-[#c9a84c] text-[#0f2440] font-semibold"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Controls */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-xs font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            View Live Website
          </span>
        </Link>
        <button
          onClick={logout}
          className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}