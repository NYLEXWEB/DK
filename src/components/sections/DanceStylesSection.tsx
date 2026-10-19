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
    <section className="bg-neutral-950 text-white py-28 sm:py-36 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <FadeUp>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-dk-yellow" />
                <span className="editorial-eyebrow text-neutral-400">
                  02 — DISCIPLINES & TECHNIQUE
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-heading font-extrabold uppercase tracking-tight text-white">
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

        {/* Interactive Typography-led Style List with Image Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          {/* Left: Numbered Editorial Typography List */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-neutral-900">
            {DANCE_STYLES.map((style, index) => {
              const isActive = activeStyleIndex === index;
              return (
                <div
                  key={style.slug}
                  onMouseEnter={() => setActiveStyleIndex(index)}
                  className={`group py-6 sm:py-8 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    isActive ? "pl-4 sm:pl-6 bg-neutral-900/40" : "hover:pl-2"
                  }`}
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span
                      className={`font-mono text-xs sm:text-sm tracking-widest transition-colors duration-300 ${
                        isActive ? "text-dk-yellow font-bold" : "text-neutral-600"
                      }`}
                    >
                      {style.number}
                    </span>
                    <div>
                      <h3
                        className={`text-2xl sm:text-4xl font-heading font-bold uppercase tracking-tight transition-colors duration-300 ${
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
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isActive
                        ? "border-dk-yellow text-dk-yellow bg-dk-yellow/10"
                        : "border-neutral-800 text-neutral-600 group-hover:text-white group-hover:border-neutral-600"
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
          <div className="lg:col-span-5 relative aspect-[4/5] bg-neutral-900 overflow-hidden border border-neutral-900">
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
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-dk-yellow block mb-2">
                    {style.number} — Featured Discipline
                  </span>
                  <h4 className="text-xl font-heading font-bold uppercase text-white mb-2">
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
        <div className="pt-16 border-t border-neutral-900">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="editorial-eyebrow text-dk-red block mb-2">
                Specialized Conditioning
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold uppercase tracking-tight text-white">
                Special Training Curriculum
              </h3>
            </div>
            <p className="text-xs text-neutral-500 font-mono uppercase max-w-sm">
              Integrated across all programs to build foundational anatomical
              strength and kinetic precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SPECIAL_TRAINING_MODULES.map((item, idx) => (
              <div
                key={item.title}
                className="p-6 bg-black border border-neutral-900 hover:border-neutral-700 transition-colors duration-300 group"
              >
                <span className="text-[11px] font-mono text-neutral-600 block mb-3 group-hover:text-dk-yellow transition-colors duration-300">
                  0{idx + 1} // CONDITIONING
                </span>
                <h4 className="text-base font-heading font-bold uppercase text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
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
