"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function InitialPreloader() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Never show public preloader on admin dashboard/login routes
    if (pathname.startsWith("/admin")) {
      setIsVisible(false);
      return;
    }

    let isDismissed = false;

    const dismiss = () => {
      if (isDismissed) return;
      isDismissed = true;

      // Snappy and responsive: brief 250ms brand presence, then smooth 350ms fade
      setTimeout(() => {
        setIsFading(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 350);
      }, 250);
    };

    if (typeof document !== "undefined") {
      if (document.readyState === "complete") {
        dismiss();
      } else {
        window.addEventListener("load", dismiss, { once: true });
        document.addEventListener("DOMContentLoaded", dismiss, { once: true });
      }
    }

    // Safety timeout: Maximum 900ms ceiling so the user is never stuck
    const safetyTimer = setTimeout(dismiss, 900);

    return () => {
      window.removeEventListener("load", dismiss);
      document.removeEventListener("DOMContentLoaded", dismiss);
      clearTimeout(safetyTimer);
    };
  }, [pathname]);

  if (!isVisible || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none transition-opacity duration-350 ease-out ${
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
