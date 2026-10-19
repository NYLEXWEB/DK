"use client";

import React from "react";
import { FadeUp } from "@/components/ui/Motion";

const AUDIENCE_GROUPS = [
  {
    title: "Beginners",
    description:
      "No prior experience needed. We provide foundational posture, rhythm conditioning, and step-by-step guidance.",
  },
  {
    title: "Children & Teenagers",
    description:
      "Building confidence, discipline, kinetic coordination, and artistic expression in a structured, inspiring environment.",
  },
  {
    title: "Adults",
    description:
      "Open to dance enthusiasts looking to learn technique, enhance stamina, stay fit, and express themselves through movement.",
  },
  {
    title: "Aspiring Performers",
    description:
      "Advanced choreography training, stage spatial awareness, and camera angles for serious upcoming artists.",
  },
  {
    title: "Competition Students",
    description:
      "Rigorously conditioned teams prepared for state, national, and international dance championships and showcases.",
  },
  {
    title: "Students Improving Technique",
    description:
      "Dancers looking to sharpen their footwork, body flexibility, tutting precision, and lyrical emotional execution.",
  },
];

export function WhoCanJoinSection() {
  return (
    <section className="bg-neutral-950 text-white py-28 sm:py-36 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <FadeUp>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-dk-red animate-pulse" />
              <span className="editorial-eyebrow text-neutral-400">
                03 — ELIGIBILITY & INCLUSIVITY
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-heading font-light uppercase tracking-tight text-white mb-6">
              Who Can Join
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
              Dance is a universal language. At DKDC, our curriculum is engineered
              to meet you where you are and elevate your potential.
            </p>
          </FadeUp>
        </div>

        {/* Sophisticated Typographic Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {AUDIENCE_GROUPS.map((group, index) => (
            <FadeUp key={group.title} delay={index * 0.08}>
              <div className="p-8 rounded-3xl glass-panel border border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 group shadow-sm hover:shadow-xl flex flex-col justify-between h-full">
                <div>
                  <span className="text-[11px] font-mono text-neutral-500 block mb-3 group-hover:text-dk-yellow transition-colors duration-300">
                    0{index + 1} // STUDENT PROFILE
                  </span>
                  <h3 className="text-2xl font-heading font-light uppercase tracking-tight text-white mb-3">
                    {group.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-light">
                    {group.description}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
