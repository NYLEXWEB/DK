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
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-dk-red animate-pulse" />
              <span className="editorial-eyebrow text-neutral-400">
                05 — PRODUCTION & STAGE
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-heading font-light uppercase tracking-tight text-white mb-6">
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
          <div className="lg:col-span-5 relative aspect-[3/4] bg-neutral-900 overflow-hidden rounded-3xl border border-white/[0.08] shadow-2xl">
            <RevealImage className="w-full h-full relative">
              <Image
                src="/images/styles/western.jpg"
                alt="Live stage show choreography by DK Dance Company"
                fill
                className="object-cover object-center transition-all duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
                <span className="text-[10px] font-mono uppercase tracking-widest text-dk-yellow block mb-1">
                  Artistic Direction
                </span>
                <span className="text-lg font-heading font-light uppercase text-white">
                  Dhanesh Krishnan Choreography
                </span>
              </div>
            </RevealImage>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PERFORMANCE_CATEGORIES.map((cat, idx) => (
              <FadeUp key={cat.title} delay={idx * 0.08}>
                <div className="p-6 sm:p-7 rounded-2xl glass-panel border border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 group shadow-sm hover:shadow-xl">
                  <span className="text-[11px] font-mono text-neutral-500 block mb-2 group-hover:text-dk-yellow transition-colors duration-300">
                    0{idx + 1}
                  </span>
                  <h3 className="text-xl font-heading font-light uppercase text-white mb-2">
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10 rounded-3xl glass-panel border border-white/[0.08] bg-white/[0.03] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-dk-yellow/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-2xl font-heading font-light uppercase tracking-tight text-white mb-2">
                Have an upcoming show, event or choreography project?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light">
                Let our choreography directors design an unforgettable, high-impact performance.
              </p>
            </div>
            <div className="relative z-10">
              <Button href="/contact?type=choreography" variant="accent" size="lg" icon>
                Enquire About Choreography
              </Button>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
