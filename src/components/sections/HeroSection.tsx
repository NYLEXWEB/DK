"use client";

import React from "react";
import Image from "next/image";
import { FadeUp } from "@/components/ui/Motion";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-transparent pt-24 sm:pt-28 pb-16 lg:pb-14">
      {/* Fixed Back Banner (Fixed background behind hero) */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/hero-bg.png"
          alt="DK Dance Company Contemporary Movement"
          fill
          priority
          className="object-cover object-[75%_center] sm:object-right md:object-[80%_center] opacity-90 sm:opacity-85"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 md:via-black/55 to-transparent" />
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

      {/* Subtle Bottom Bar indicator */}
      <div className="absolute bottom-4 sm:bottom-5 left-0 right-0 z-10 max-w-7xl mx-auto px-6 sm:px-8 hidden md:flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-neutral-400">
        <div className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/[0.06]">
          Director: Dhanesh Krishnan
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/[0.06]">
          <span className="w-1.5 h-1.5 rounded-full bg-dk-red animate-pulse" />
          <span>India • United Kingdom</span>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/[0.06]">
          Scroll to explore ↓
        </div>
      </div>
    </section>
  );
}
