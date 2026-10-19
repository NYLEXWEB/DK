"use client";

import React from "react";
import Image from "next/image";
import { FadeUp } from "@/components/ui/Motion";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-black pt-28 pb-16">
      {/* Background Cinematic Visual with Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=2000&q=85"
          alt="DK Dance Company Contemporary Movement"
          fill
          priority
          className="object-cover object-center opacity-30 scale-105 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />
        {/* Subtle vignette and contrast masks */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full text-center sm:text-left">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <FadeUp delay={0.1}>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-dk-yellow" />
              <span className="editorial-eyebrow text-dk-yellow">
                DK DANCE COMPANY • KOZHIKODE & BOURNEMOUTH
              </span>
            </div>
          </FadeUp>

          {/* Main Statement */}
          <FadeUp delay={0.25} duration={0.9}>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-extrabold text-white tracking-tighter leading-[0.88] uppercase mb-6">
              DANCE. <br />
              <span className="text-neutral-400">MOVE.</span> <br />
              BECOME.
            </h1>
          </FadeUp>

          {/* Tagline & Supporting Copy */}
          <FadeUp delay={0.4}>
            <p className="text-lg sm:text-2xl text-neutral-300 font-light tracking-wide max-w-2xl mb-4 font-heading">
              Learn • Train • Perform • Grow
            </p>
            <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-xl mb-10">
              Professional dance education developing technical rigor, rhythmic
              expression, and stage confidence. From foundational movement to
              international performance.
            </p>
          </FadeUp>

          {/* CTA Group */}
          <FadeUp delay={0.55}>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center sm:justify-start">
              <Button href="/classes" variant="primary" size="lg" icon>
                Explore Classes
              </Button>
              <Button href="/contact" variant="accent" size="lg">
                Join DKDC
              </Button>
              <Button href="/branches" variant="secondary" size="lg">
                View Branches
              </Button>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Subtle Bottom Bar indicator */}
      <div className="absolute bottom-6 left-0 right-0 z-10 max-w-7xl mx-auto px-6 sm:px-8 hidden md:flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-neutral-500">
        <div>Director: Dhanesh Krishnan</div>
        <div className="flex items-center gap-4">
          <span className="w-2 h-2 rounded-full bg-dk-red inline-block" />
          <span>India • United Kingdom</span>
        </div>
        <div>Scroll to explore ↓</div>
      </div>
    </section>
  );
}
