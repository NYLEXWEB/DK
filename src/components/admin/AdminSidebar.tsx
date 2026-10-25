"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Video,
  Sparkles,
  GraduationCap,
  MapPin,
  Inbox,
  Sliders,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

export function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
    { label: "Photo Library", href: "/admin/media", icon: ImageIcon },
    { label: "Video Showcase", href: "/admin/videos", icon: Video },
    { label: "Dance Styles", href: "/admin/dance-styles", icon: Sparkles },
    { label: "Curriculum", href: "/admin/curriculum", icon: GraduationCap },
    { label: "Branches", href: "/admin/branches", icon: MapPin },
    { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
    { label: "Settings & Security", href: "/admin/settings", icon: Sliders },
  ];

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden bg-neutral-950 border-b border-neutral-800 p-4 flex items-center justify-between sticky top-0 z-30">
        <Link href="/admin" className="block p-1.5 rounded-xl bg-white/[0.96] border border-white/20 shadow">
          <div className="relative w-28 h-7">
            <Image
              src="/images/logo/logo.png"
              alt="DK Dance Company Admin"
              fill
              className="object-contain object-center"
              sizes="112px"
            />
          </div>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-neutral-400 hover:text-white border border-neutral-800 rounded-lg"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800 p-4 space-y-3 sticky top-[65px] z-20">
          <nav className="space-y-1">
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
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-white text-black font-normal"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-neutral-900 flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1.5"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-mono uppercase tracking-wider text-dk-red hover:bg-dk-red/10 px-3 py-1.5 rounded flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 bg-neutral-950 border-r border-neutral-800 flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Logo */}
        <div className="p-6 border-b border-neutral-900">
          <Link href="/admin" className="block p-2 rounded-xl bg-white/[0.96] border border-white/20 shadow">
            <div className="relative w-32 h-8">
              <Image
                src="/images/logo/logo.png"
                alt="DK Dance Company Admin"
                fill
                className="object-contain object-center"
                sizes="128px"
              />
            </div>
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
                    ? "bg-white text-black font-normal"
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
  </>
);
}
