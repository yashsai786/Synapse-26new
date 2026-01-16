"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/app/components/ui/sidebar";
import { AppSidebar, AdminHeader } from "@/components/admin/ui/AdminSidebar";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // Login page gets minimal layout without sidebar
  if (isLoginPage) {
    return <AdminAuthGuard>{children}</AdminAuthGuard>;
  }

  // Other admin pages get full layout with sidebar
  return (
    <AdminAuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AdminHeader />
          <main className="flex-1 p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AdminAuthGuard>
  );
}
