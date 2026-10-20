"use client";

import React, { useRef, useEffect } from "react";
import { FadeUp } from "@/components/ui/Motion";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    [desktopVideoRef.current, mobileVideoRef.current].forEach((video) => {
      if (video) {
        video.defaultMuted = true;
        video.muted = true;
        video.play().catch(() => {
          // Autoplay handled silently
        });
      }
    });
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-transparent pt-24 sm:pt-28 pb-16 lg:pb-14">
      {/* Background Video (Responsive: 1920x1080 on Desktop, 1080x1920 on Mobile) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden bg-black">
        {/* Mobile Background Video (< md: 1080x1920 Portrait) */}
        <video
          ref={mobileVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero-bg.png"
          className="md:hidden w-full h-full object-cover opacity-85 transition-opacity duration-700"
          style={{ objectPosition: "center 25%" }}
        >
          <source
            src="/images/videos/8688823-hd_1080_1920_25fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Desktop Background Video (>= md: 1920x1080 Landscape Full HD) */}
        <video
          ref={desktopVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero-bg.png"
          className="hidden md:block w-full h-full object-cover object-center opacity-90 transition-opacity duration-700"
        >
          <source
            src="/images/videos/8688453-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Natural overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent via-40% to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 via-25% to-transparent to-55% pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full text-left my-auto">
        <div className="max-w-3xl">
          {/* Main Statement */}
          <FadeUp delay={0.25} duration={0.8}>
            <h1 className="text-[2.5rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-heading font-light sm:font-thin text-white tracking-tight leading-[0.92] uppercase mb-4 sm:mb-5">
              DANCE. <br />
              <span className="text-neutral-500">MOVE.</span> <br />
              BECOME.
            </h1>
          </FadeUp>

          {/* Tagline & Supporting Copy */}
          <FadeUp delay={0.4}>
            <p className="text-sm xs:text-base sm:text-xl text-neutral-300 font-light tracking-wide max-w-2xl mb-2 sm:mb-3 font-heading">
              Learn • Train • Perform • Grow
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-[275px] xs:max-w-[320px] sm:max-w-lg mb-6 sm:mb-8 mx-0">
              Professional dance education developing technical rigor, rhythmic
              expression, and stage confidence. From foundational movement to
              international performance.
            </p>
          </FadeUp>

          {/* CTA Group */}
          <FadeUp delay={0.55}>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 justify-start w-full">
              <div className="flex items-center gap-2.5">
                <Button
                  href="/dance-styles"
                  variant="primary"
                  size="sm"
                  className="px-4 py-2.5 text-[11px] sm:px-7 sm:py-3 sm:text-xs"
                  icon
                >
                  Explore Styles
                </Button>
                <Button
                  href="/contact"
                  variant="accent"
                  size="sm"
                  className="px-4 py-2.5 text-[11px] sm:px-7 sm:py-3 sm:text-xs"
                >
                  Join DKDC
                </Button>
              </div>
              <Button
                href="/branches"
                variant="secondary"
                size="sm"
                className="px-4 py-2.5 text-[11px] sm:px-7 sm:py-3 sm:text-xs"
              >
                View Branches
              </Button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
