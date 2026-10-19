"use client";

import React from "react";
import Image from "next/image";
import { FadeUp, RevealImage } from "@/components/ui/Motion";
import { Button } from "@/components/ui/Button";

const PERFORMANCE_CATEGORIES = [
  {
    title: "Stage Shows",
    description: "Grand theatre and outdoor stage productions with synchronised ensemble choreography, dramatic stage lighting, and narrative progression.",
  },
  {
    title: "School Programs",
    description: "Annual day showcases, youth dance festivals, and structured choreography camps tailored for educational institutions.",
  },
  {
    title: "Cultural Events",
    description: "Traditional and contemporary fusions celebrating regional heritage, festive occasions, and community celebrations.",
  },
  {
    title: "Competitions",
    description: "Championship-caliber competitive routines engineered with intricate musicality, high-difficulty synchrony, and acrobatic accents.",
  },
  {
    title: "Special Choreography",
    description: "Bespoke routines for private celebrations, corporate milestones, music videos, and cinematic productions.",
  },
  {
    title: "Dance Projects",
    description: "Experimental conceptual video art, international cross-border collaborations, and thematic digital showcases.",
  },
];

export function PerformanceSection() {
  return (
    <section className="bg-neutral-950 text-white py-28 sm:py-36 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-dk-red" />
              <span className="editorial-eyebrow text-neutral-400">
                06 — PRODUCTION & STAGE
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-heading font-extrabold uppercase tracking-tight text-white mb-6">
              Performance & Choreography
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
              Beyond studio training, DK Dance Company creates commanding
              live performances, competition spectacles, and bespoke choreography
              for clients across India and the UK.
            </p>
          </FadeUp>
        </div>

        {/* Editorial Composition: Left Visual, Right Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          <div className="lg:col-span-5 relative aspect-[3/4] bg-neutral-900 overflow-hidden">
            <RevealImage className="w-full h-full relative">
              <Image
                src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1200&q=80"
                alt="Live stage show choreography by DK Dance Company"
                fill
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-dk-yellow block mb-1">
                  Artistic Direction
                </span>
                <span className="text-lg font-heading font-bold uppercase text-white">
                  Dhanesh Krishnan Choreography
                </span>
              </div>
            </RevealImage>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {PERFORMANCE_CATEGORIES.map((cat, idx) => (
              <FadeUp key={cat.title} delay={idx * 0.08}>
                <div className="p-6 bg-black border border-neutral-900 hover:border-neutral-700 transition-colors duration-300">
                  <span className="text-[11px] font-mono text-neutral-600 block mb-2">
                    0{idx + 1}
                  </span>
                  <h3 className="text-xl font-heading font-bold uppercase text-white mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {cat.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Strong CTA */}
        <FadeUp delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10 bg-neutral-900/60 border border-neutral-800">
            <div>
              <h3 className="text-2xl font-heading font-bold uppercase tracking-tight text-white mb-2">
                Have an upcoming show, event or choreography project?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light">
                Let our choreography directors design an unforgettable, high-impact performance.
              </p>
            </div>
            <Button href="/contact?type=choreography" variant="accent" size="lg" icon>
              Enquire About Choreography
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
