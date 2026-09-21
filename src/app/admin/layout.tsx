"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminGuard from "@/components/admin/AdminGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <main className="min-h-screen bg-gray-50">{children}</main>;
  }

  return (
    <AdminGuard>
      <div className="min-h-screen flex bg-gray-50 antialiased text-gray-800">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-y-auto max-h-screen">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </AdminGuard>
  );
}