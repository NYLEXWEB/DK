"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeUp } from "@/components/ui/Motion";
import { DANCE_STYLES, SPECIAL_TRAINING_MODULES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function DanceStylesSection() {
  const [activeStyleIndex, setActiveStyleIndex] = useState(0);

  return (
    <section className="bg-neutral-950 text-white py-28 sm:py-36 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <FadeUp>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-dk-yellow animate-pulse" />
                <span className="editorial-eyebrow text-neutral-400">
                  02 — DISCIPLINES & TECHNIQUE
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-heading font-light uppercase tracking-tight text-white">
                Dance Styles
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.1}>
            <p className="text-neutral-400 text-sm max-w-md font-light leading-relaxed">
              From cinematic Indian expression to world-renowned urban hip-hop
              and fluid contemporary technique.
            </p>
          </FadeUp>
        </div>

        {/* MOBILE STACKED CARDS VIEW (block lg:hidden) - Tall rectangular cards with sharp edges stacking on scroll */}
        <div className="block lg:hidden relative pb-40 mb-20 space-y-10">
          {DANCE_STYLES.map((style, index) => (
            <div
              key={style.slug}
              className="sticky rounded-none bg-neutral-950 border border-white/15 overflow-hidden shadow-[0_-14px_35px_rgba(0,0,0,0.9),0_25px_50px_rgba(0,0,0,0.98)] will-change-transform"
              style={{
                top: `calc(4.75rem + ${index * 14}px)`,
                zIndex: index + 1,
              }}
            >
              {/* Card Header: Sharp Number Badge, Title, Tagline, Square Arrow */}
              <div className="p-5 pb-4 flex items-center justify-between border-b border-white/[0.08] bg-black/85 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-dk-yellow font-normal px-2.5 py-1 rounded-none bg-dk-yellow/10 border border-dk-yellow/30 uppercase tracking-wider">
                    {style.number}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-heading font-light uppercase tracking-tight text-white">
                      {style.name}
                    </h3>
                    <p className="text-[10px] text-neutral-400 font-mono tracking-wider uppercase mt-0.5">
                      {style.tagline}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/dance-styles#${style.slug}`}
                  className="w-9 h-9 rounded-none flex items-center justify-center border border-white/15 text-neutral-400 hover:text-dk-yellow hover:border-dk-yellow transition-colors shrink-0"
                  aria-label={`Explore ${style.name}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Tall Rectangular Style Image with Gradient & Editorial Description */}
              <div className="relative aspect-[4/5] w-full bg-neutral-900 overflow-hidden">
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  className="object-cover object-center transition-all duration-500"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="p-3.5 bg-black/70 backdrop-blur-md border-l-2 border-dk-yellow border-t border-r border-b border-white/5">
                    <p className="text-xs text-neutral-200 font-light leading-relaxed line-clamp-3">
                      {style.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer: Sharp Admissions Badge & Enroll CTA */}
              <div className="p-4 px-5 bg-neutral-950 flex items-center justify-between gap-3 border-t border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-dk-yellow rounded-none animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    Admissions Open
                  </span>
                </div>
                <Link
                  href={`/contact?style=${encodeURIComponent(style.name)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-dk-yellow hover:text-white px-3 py-1.5 bg-dk-yellow/10 border border-dk-yellow/30 hover:border-dk-yellow transition-all rounded-none"
                >
                  <span>Enroll Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP SPLIT VIEW (hidden lg:grid) - Interactive list with dynamic preview */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 items-center mb-28">
          {/* Left: Numbered Editorial Typography List */}
          <div className="lg:col-span-7 flex flex-col gap-2">
            {DANCE_STYLES.map((style, index) => {
              const isActive = activeStyleIndex === index;
              return (
                <div
                  key={style.slug}
                  onMouseEnter={() => setActiveStyleIndex(index)}
                  onClick={() => setActiveStyleIndex(index)}
                  className={`group py-5 sm:py-6 cursor-pointer transition-all duration-300 flex items-center justify-between rounded-2xl touch-manipulation ${
                    isActive
                      ? "px-5 sm:px-6 bg-white/[0.04] border border-white/[0.08] backdrop-blur-md shadow-lg"
                      : "px-4 border border-transparent hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span
                      className={`font-mono text-xs sm:text-sm tracking-widest transition-colors duration-300 ${
                        isActive ? "text-dk-yellow font-normal" : "text-neutral-600"
                      }`}
                    >
                      {style.number}
                    </span>
                    <div>
                      <h3
                        className={`text-2xl sm:text-4xl font-heading font-light uppercase tracking-tight transition-colors duration-300 ${
                          isActive
                            ? "text-white translate-x-1"
                            : "text-neutral-400 group-hover:text-white"
                        }`}
                      >
                        {style.name}
                      </h3>
                      <p className="text-xs text-neutral-500 font-mono tracking-wider mt-1 sm:mt-1.5 uppercase">
                        {style.tagline}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/dance-styles#${style.slug}`}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isActive
                        ? "border-dk-yellow text-dk-yellow bg-dk-yellow/10 shadow-[0_0_15px_rgba(255,215,0,0.15)]"
                        : "border-white/10 text-neutral-500 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/[0.05]"
                    }`}
                    aria-label={`Explore ${style.name}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic Image Preview */}
          <div className="lg:col-span-5 relative aspect-[4/5] bg-neutral-900 overflow-hidden rounded-3xl border border-white/[0.08] shadow-2xl">
            {DANCE_STYLES.map((style, index) => (
              <div
                key={style.slug}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  activeStyleIndex === index
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-95 pointer-events-none z-0"
                }`}
              >
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  className="object-cover object-center transition-all duration-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-dk-yellow block mb-1.5">
                    {style.number} — Featured Discipline
                  </span>
                  <h4 className="text-xl font-heading font-light uppercase text-white mb-2">
                    {style.name}
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light line-clamp-3">
                    {style.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Training Breakdown */}
        <div className="pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-dk-red/10 text-dk-red border border-dk-red/20 mb-3">
                Specialized Conditioning
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-light uppercase tracking-tight text-white">
                Special Training Curriculum
              </h3>
            </div>
            <p className="text-xs text-neutral-400 font-mono uppercase max-w-sm">
              Integrated across all programs to build foundational anatomical
              strength and kinetic precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SPECIAL_TRAINING_MODULES.map((item, idx) => (
              <div
                key={item.title}
                className="p-6 sm:p-7 rounded-2xl glass-panel border border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 group shadow-sm hover:shadow-xl"
              >
                <span className="text-[11px] font-mono text-neutral-500 block mb-3 group-hover:text-dk-yellow transition-colors duration-300">
                  0{idx + 1} // CONDITIONING
                </span>
                <h4 className="text-base font-heading font-light uppercase text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/dance-styles" variant="secondary" size="md" icon>
              View Full Syllabus & Requirements
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
