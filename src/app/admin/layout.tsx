"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If on login page, do not show sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 min-w-0 bg-neutral-950/50 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
