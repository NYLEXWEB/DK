"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  MapPin,
  Inbox,
  Sliders,
  LogOut,
  ExternalLink,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Media Library", href: "/admin/media", icon: ImageIcon },
    { label: "Branches", href: "/admin/branches", icon: MapPin },
    { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
    { label: "Site Settings", href: "/admin/settings", icon: Sliders },
  ];

  return (
    <aside className="w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Logo */}
        <div className="p-6 border-b border-neutral-900">
          <Link href="/admin" className="block relative w-36 h-10">
            <Image
              src="/images/logo/logo.png"
              alt="DK Dance Company Admin"
              fill
              className="object-contain object-left"
              sizes="144px"
            />
          </Link>
          <span className="text-[10px] font-mono uppercase tracking-widest text-dk-yellow mt-2 block">
            Administrative Console
          </span>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5" aria-label="Admin Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-wider rounded-none transition-all duration-200 ${
                  isActive
                    ? "bg-white text-black font-semibold"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-neutral-900 space-y-2">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-4 py-2.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-dk-red hover:bg-dk-red/10 transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
