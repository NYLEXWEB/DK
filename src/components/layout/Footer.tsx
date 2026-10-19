"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageCircle, Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  // Hide footer on admin panel pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-neutral-900 pt-20 pb-12 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-neutral-900">
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block relative w-48 h-14 mb-6">
                <Image
                  src="/images/logo/logo.png"
                  alt="DK Dance Company Official Logo"
                  fill
                  className="object-contain object-left"
                  sizes="192px"
                />
              </Link>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mb-6">
                DK Dance Company (DKDC) is a premier contemporary and commercial
                dance training institution founded by Director Dhanesh Krishnan.
                Dedicated to developing technique, creative expression, and stage
                confidence.
              </p>
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
                Learn • Train • Perform • Grow
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-8">
              <a
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/dkdancecompany"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DK Dance Company on Instagram"
                className="w-9 h-9 flex items-center justify-center border border-neutral-800 text-neutral-400 hover:text-dk-yellow hover:border-dk-yellow transition-colors duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/dkdancecompany"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DK Dance Company on Facebook"
                className="w-9 h-9 flex items-center justify-center border border-neutral-800 text-neutral-400 hover:text-dk-yellow hover:border-dk-yellow transition-colors duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com/@dkdancecompany"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DK Dance Company on YouTube"
                className="w-9 h-9 flex items-center justify-center border border-neutral-800 text-neutral-400 hover:text-dk-yellow hover:border-dk-yellow transition-colors duration-200"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919995272083"}?text=${encodeURIComponent("Hello DK Dance Company, I would like to enquire about dance classes.")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-9 h-9 flex items-center justify-center border border-neutral-800 text-neutral-400 hover:text-[#25D366] hover:border-[#25D366] transition-colors duration-200"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-6">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors duration-150">
                  About DKDC
                </Link>
              </li>
              <li>
                <Link href="/dance-styles" className="hover:text-white transition-colors duration-150">
                  Dance Styles
                </Link>
              </li>
              <li>
                <Link href="/classes" className="hover:text-white transition-colors duration-150">
                  Classes & Fees
                </Link>
              </li>
              <li>
                <Link href="/branches" className="hover:text-white transition-colors duration-150">
                  Branches
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors duration-150">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/online-classes" className="hover:text-white transition-colors duration-150">
                  Online Classes
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-white transition-colors duration-150">
                  Rules & Regulations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors duration-150">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Branches Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-6">
              Branches
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-neutral-400">
              <li>
                <Link href="/branches/kunduparamba" className="hover:text-white transition-colors duration-150">
                  Kunduparamba
                </Link>
              </li>
              <li>
                <Link href="/branches/westhill" className="hover:text-white transition-colors duration-150">
                  Westhill
                </Link>
              </li>
              <li>
                <Link href="/branches/balussery" className="hover:text-white transition-colors duration-150">
                  Balussery
                </Link>
              </li>
              <li>
                <Link href="/branches/kottooli" className="hover:text-white transition-colors duration-150">
                  Kottooli
                </Link>
              </li>
              <li>
                <Link href="/branches/parambilbazar" className="hover:text-white transition-colors duration-150">
                  Parambilbazar
                </Link>
              </li>
              <li>
                <Link href="/branches/bournemouth-uk" className="hover:text-white transition-colors duration-150 text-dk-yellow">
                  Bournemouth, UK
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-6">
              Head Office
            </h4>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
              Kozhikode, Kerala, India
            </p>
            <div className="flex flex-col gap-2 text-sm text-neutral-400 mb-6">
              <span className="text-white font-medium">Director: Dhanesh Krishnan</span>
              <a
                href="tel:+919995272083"
                className="hover:text-dk-yellow transition-colors duration-150 font-mono text-xs"
              >
                +91 9995 272 083
              </a>
              <a
                href="mailto:info@dkdancecompany.com"
                className="hover:text-dk-yellow transition-colors duration-150 font-mono text-xs"
              >
                info@dkdancecompany.com
              </a>
            </div>

            <div className="pt-2">
              <span className="text-xs font-mono text-neutral-500 uppercase block mb-1">
                International Branch
              </span>
              <span className="text-sm text-white">Bournemouth, United Kingdom</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {currentYear} DK Dance Company (DKDC). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-neutral-300 transition-colors duration-150">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-neutral-300 transition-colors duration-150">
              Terms & Conditions
            </Link>
            <Link href="/admin/login" className="hover:text-neutral-300 transition-colors duration-150">
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
