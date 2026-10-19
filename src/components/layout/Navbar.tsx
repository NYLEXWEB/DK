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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-black/60 backdrop-blur-2xl border-b border-white/[0.08] py-4 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.8)]"
            : "bg-gradient-to-b from-black/80 via-black/20 to-transparent py-6 backdrop-blur-[2px]"
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
            className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-white/[0.02] border border-white/[0.06] backdrop-blur-md"
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
                  className={`text-xs uppercase tracking-widest font-light transition-all duration-300 relative py-1.5 px-4 rounded-full ${
                    isActive
                      ? "text-white font-normal bg-white/[0.08] shadow-sm border border-white/10"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-dk-yellow to-transparent" />
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
        className={`fixed inset-0 z-30 bg-black/95 backdrop-blur-2xl flex flex-col justify-between px-6 sm:px-8 pt-24 pb-8 overflow-y-auto overscroll-contain transition-all duration-300 lg:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <nav aria-label="Mobile Navigation" className="flex flex-col gap-4 sm:gap-5 mt-2">
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
                className={`text-xl sm:text-2xl font-heading font-light uppercase tracking-tight flex items-center justify-between py-2 transition-colors duration-200 ${
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

        <div className="flex flex-col gap-4 pt-6 mt-6 border-t border-white/[0.08]">
          <Button href="/contact" variant="primary" size="md" icon className="w-full">
            Enquire Now
          </Button>
          <div className="flex items-center justify-between text-xs text-neutral-500 pt-1 font-mono">
            <span>Kozhikode • Bournemouth</span>
            <a href="tel:+919995272083" className="hover:text-white transition-colors">
              +91 9995 272 083
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
