"use client";

import React from "react";
import Image from "next/image";
import { FadeUp, RevealImage } from "@/components/ui/Motion";
import { Button } from "@/components/ui/Button";

export function BrandIntroSection() {
  return (
    <section className="bg-black text-white py-28 sm:py-36 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Eyebrow */}
        <FadeUp>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-dk-red animate-pulse" />
            <span className="editorial-eyebrow text-neutral-400">
              01 — INSTITUTION PHILOSOPHY
            </span>
          </div>
        </FadeUp>

        {/* Large Statement Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-8">
            <FadeUp delay={0.1}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-light uppercase tracking-tight leading-[1.1] text-white">
                A professional dance training institution dedicated to developing{" "}
                <span className="text-neutral-500 font-thin">skills</span>,{" "}
                <span className="text-neutral-500 font-thin">creativity</span>,{" "}
                <span className="text-white font-normal">confidence</span>, and{" "}
                <span className="text-dk-yellow font-normal">stage performance</span>.
              </h2>
            </FadeUp>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between pt-2 border-t lg:border-t-0 lg:border-l border-white/[0.08] lg:pl-12">
            <FadeUp delay={0.2}>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8 font-light">
                Welcome to DK Dance Company (DKDC). We provide structured,
                progressive dance education for children, teenagers, and adults —
                nurturing passionate dancers from absolute beginners to
                accomplished competitive artists.
              </p>
              <div className="mb-8 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
                <span className="text-xs uppercase font-mono tracking-widest text-neutral-500 block mb-1">
                  Artistic Director
                </span>
                <span className="text-xl font-heading font-light text-white tracking-wide block">
                  Dhanesh Krishnan
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  Kozhikode, India • Bournemouth, UK
                </span>
              </div>
              <Button href="/about" variant="secondary" size="sm" icon>
                Read Full Story
              </Button>
            </FadeUp>
          </div>
        </div>

        {/* Asymmetrical Editorial Composition: Image & Mission/Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Editorial Visual */}
          <div className="lg:col-span-6 relative aspect-[4/5] bg-neutral-950 overflow-hidden rounded-3xl border border-white/[0.08] shadow-2xl">
            <RevealImage className="w-full h-full relative">
              <Image
                src="https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80"
                alt="Dancer during contemporary performance at DK Dance Company"
                fill
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-white/90 px-4 py-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
                <span>DKDC Movement Lab</span>
                <span>Est. Kozhikode</span>
              </div>
            </RevealImage>
          </div>

          {/* Mission & Vision & Training Core */}
          <div className="lg:col-span-6 flex flex-col gap-6 lg:pl-8">
            <FadeUp delay={0.15}>
              <div className="p-6 sm:p-7 rounded-2xl glass-panel border border-white/[0.08] bg-white/[0.02] relative overflow-hidden group hover:border-dk-yellow/40 transition-all duration-500">
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-dk-yellow to-transparent" />
                <span className="editorial-eyebrow text-dk-yellow block mb-3">
                  Our Mission
                </span>
                <p className="text-xl sm:text-2xl font-heading text-neutral-200 font-light leading-snug">
                  To inspire, train, and empower every dancer through quality
                  dance education.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.25}>
              <div className="p-6 sm:p-7 rounded-2xl glass-panel border border-white/[0.08] bg-white/[0.02] relative overflow-hidden group hover:border-dk-red/40 transition-all duration-500">
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-dk-red to-transparent" />
                <span className="editorial-eyebrow text-dk-red block mb-3">
                  Our Vision
                </span>
                <p className="text-xl sm:text-2xl font-heading text-neutral-200 font-light leading-snug">
                  To build confident performers and create opportunities for
                  dancers to learn, grow, and shine on stage.
                </p>
              </div>
            </FadeUp>

            {/* Core Training Pillars */}
            <FadeUp delay={0.35}>
              <div className="pt-6 border-t border-white/[0.08]">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 block mb-4">
                  Curriculum Focus Areas
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "Technique",
                    "Rhythm",
                    "Body Movement",
                    "Flexibility",
                    "Coordination",
                    "Creativity",
                    "Performance Skills",
                  ].map((pillar) => (
                    <span
                      key={pillar}
                      className="text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-full bg-white/[0.03] text-neutral-300 border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 backdrop-blur-sm"
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
