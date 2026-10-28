import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 select-none"
    >
      <div className="flex flex-col items-center text-center">
        {/* Brand Logo */}
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
          LOADING • DK DANCE COMPANY
        </div>
      </div>
    </div>
  );
}
