"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function InitialPreloader() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    if (window.location.pathname.startsWith("/admin")) return false;
    // Don't show preloader again if already seen in this session
    try {
      return !sessionStorage.getItem("dkdc_intro_seen");
    } catch {
      return false;
    }
  });
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Never show public preloader on admin dashboard/login routes
    if (!isVisible || pathname.startsWith("/admin")) {
      setIsVisible(false);
      return;
    }

    let isDismissed = false;

    const dismiss = () => {
      if (isDismissed) return;
      isDismissed = true;
      try {
        sessionStorage.setItem("dkdc_intro_seen", "true");
      } catch {
        // ignore storage errors
      }

      // Snappy and ultra-fast: brief 80ms brand pulse, then smooth 150ms fade
      setTimeout(() => {
        setIsFading(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 150);
      }, 80);
    };

    if (typeof document !== "undefined") {
      if (document.readyState === "complete" || document.readyState === "interactive") {
        dismiss();
      } else {
        window.addEventListener("load", dismiss, { once: true });
        document.addEventListener("DOMContentLoaded", dismiss, { once: true });
      }
    }

    // Safety timeout: Maximum 350ms ceiling so the user is never stuck
    const safetyTimer = setTimeout(dismiss, 350);

    return () => {
      window.removeEventListener("load", dismiss);
      document.removeEventListener("DOMContentLoaded", dismiss);
      clearTimeout(safetyTimer);
    };
  }, []); // Run ONCE on initial mount, never re-trigger on route changes

  if (!isVisible || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none transition-opacity duration-150 ease-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
    >
      <div className="flex flex-col items-center px-6 text-center">
        {/* Brand Logo - Crisp, perfectly centered, no shadows, no clutter */}
        <div className="relative w-48 sm:w-56 h-12 sm:h-14 mb-4">
          <Image
            src="/images/logo/logo.png"
            alt="DK Dance Company"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 640px) 192px, 224px"
          />
        </div>

        {/* Minimal Hairline Progress Bar */}
        <div className="w-28 sm:w-32 h-[1.5px] bg-white/[0.08] rounded-full overflow-hidden relative">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#FFF102] to-transparent animate-preloader-shimmer" />
        </div>

        {/* Minimal Monospace Subtext */}
        <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400 mt-3.5">
          DK DANCE COMPANY
        </div>
      </div>
    </div>
  );
}
