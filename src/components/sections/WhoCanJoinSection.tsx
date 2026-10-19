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
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-dk-red" />
              <span className="editorial-eyebrow text-neutral-400">
                04 — ELIGIBILITY & INCLUSIVITY
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-heading font-extrabold uppercase tracking-tight text-white mb-6">
              Who Can Join
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
              Dance is a universal language. At DKDC, our curriculum is engineered
              to meet you where you are and elevate your potential.
            </p>
          </FadeUp>
        </div>

        {/* Sophisticated Typographic Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {AUDIENCE_GROUPS.map((group, index) => (
            <FadeUp key={group.title} delay={index * 0.08}>
              <div className="border-t border-neutral-800 pt-6">
                <span className="text-[11px] font-mono text-neutral-600 block mb-2">
                  0{index + 1} // STUDENT PROFILE
                </span>
                <h3 className="text-2xl font-heading font-bold uppercase tracking-tight text-white mb-3">
                  {group.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  {group.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
