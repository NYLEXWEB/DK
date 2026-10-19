"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Styles", href: "/dance-styles" },
  { label: "Classes", href: "/classes" },
  { label: "Branches", href: "/branches" },
  { label: "Gallery", href: "/gallery" },
  { label: "Online", href: "/online-classes" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Hide public navbar on admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-black/95 border-b border-neutral-900 py-3.5 backdrop-blur-md"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dk-yellow"
          >
            <div className="relative w-36 sm:w-44 h-12 transition-transform duration-300 group-hover:opacity-95">
              <Image
                src="/images/logo/logo.png"
                alt="DK Dance Company"
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 640px) 144px, 176px"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest font-medium transition-all duration-200 relative py-1 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-dk-yellow" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button href="/contact" variant="primary" size="sm" icon>
              Enquire Now
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 text-white hover:text-dk-yellow transition-colors duration-200 focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-30 bg-black flex flex-col justify-between px-8 py-24 transition-all duration-500 lg:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-8"
        }`}
      >
        <nav aria-label="Mobile Navigation" className="flex flex-col gap-6 mt-8">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">
            Navigation
          </span>
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-2xl sm:text-3xl font-heading uppercase tracking-tight flex items-center justify-between transition-colors duration-200 ${
                  isActive
                    ? "text-dk-yellow pl-2 border-l-2 border-dk-yellow"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-neutral-600">→</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-4 pt-8 border-t border-neutral-900">
          <Button href="/contact" variant="primary" size="md" icon className="w-full">
            Enquire Now
          </Button>
          <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 font-mono">
            <span>Kozhikode • Bournemouth</span>
            <span>+91 9995 272 083</span>
          </div>
        </div>
      </div>
    </>
  );
}
