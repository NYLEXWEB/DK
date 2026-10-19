"use client";

import React from "react";
import { FadeUp } from "@/components/ui/Motion";
import { Button } from "@/components/ui/Button";

interface ClassesFeesSectionProps {
  fees?: {
    admissionFee: string;
    weeklyOneClassFee: string;
    weeklyTwoClassesFee: string;
    disclaimer: string;
    paymentNote: string;
  };
}

export function ClassesFeesSection({ fees }: ClassesFeesSectionProps) {
  const feeData = fees || {
    admissionFee: "₹1,000",
    weeklyOneClassFee: "₹500 / month",
    weeklyTwoClassesFee: "₹800 / month",
    disclaimer:
      "Fees and schedules may vary by branch, program, or special training course. Students should confirm the applicable fee and timetable with the respective branch before admission.",
    paymentNote:
      "Monthly fees should be paid on or before the 10th of every month.",
  };

  return (
    <section className="bg-black text-white py-28 sm:py-36 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-dk-yellow" />
              <span className="editorial-eyebrow text-neutral-400">
                03 — ADMISSIONS & TUITION
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-heading font-extrabold uppercase tracking-tight text-white mb-6">
              Classes & Fees
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
              Transparent, structured fee schedules designed to support consistent
              dance training, discipline, and artistic progress.
            </p>
          </FadeUp>
        </div>

        {/* Clean Typographic Pricing Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-16">
          {/* Card 1: Admission */}
          <FadeUp delay={0.1}>
            <div className="p-8 sm:p-10 bg-neutral-950 border border-neutral-800 flex flex-col justify-between h-full group hover:border-neutral-600 transition-colors duration-300">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 block mb-3">
                  Enrollment
                </span>
                <h3 className="text-xl font-heading font-bold uppercase text-white mb-2">
                  Admission Fee
                </h3>
                <p className="text-xs text-neutral-400 mb-8">
                  One-time registration and institutional admission fee upon joining.
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-900">
                <span className="text-4xl sm:text-5xl font-heading font-black text-white tracking-tight block">
                  {feeData.admissionFee}
                </span>
                <span className="text-[10px] font-mono uppercase text-neutral-500 mt-2 block">
                  One-time payment
                </span>
              </div>
            </div>
          </FadeUp>

          {/* Card 2: 1 Class Weekly */}
          <FadeUp delay={0.2}>
            <div className="p-8 sm:p-10 bg-neutral-950 border border-neutral-800 flex flex-col justify-between h-full group hover:border-dk-yellow transition-colors duration-300">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-dk-yellow block mb-3">
                  Foundational Track
                </span>
                <h3 className="text-xl font-heading font-bold uppercase text-white mb-2">
                  1 Class / Week
                </h3>
                <p className="text-xs text-neutral-400 mb-8">
                  Ideal for students starting their dance journey or balancing busy school/work routines.
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-900">
                <span className="text-4xl sm:text-5xl font-heading font-black text-white tracking-tight block">
                  {feeData.weeklyOneClassFee}
                </span>
                <span className="text-[10px] font-mono uppercase text-neutral-500 mt-2 block">
                  Monthly recurring fee
                </span>
              </div>
            </div>
          </FadeUp>

          {/* Card 3: 2 Classes Weekly */}
          <FadeUp delay={0.3}>
            <div className="p-8 sm:p-10 bg-neutral-950 border border-neutral-800 flex flex-col justify-between h-full group hover:border-dk-red transition-colors duration-300 relative">
              <div className="absolute top-4 right-4">
                <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 bg-dk-red text-white">
                  Recommended
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-dk-red block mb-3">
                  Performance Track
                </span>
                <h3 className="text-xl font-heading font-bold uppercase text-white mb-2">
                  2 Classes / Week
                </h3>
                <p className="text-xs text-neutral-400 mb-8">
                  Intensive regular practice for accelerated technical growth, choreography retention, and stage preparation.
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-900">
                <span className="text-4xl sm:text-5xl font-heading font-black text-white tracking-tight block">
                  {feeData.weeklyTwoClassesFee}
                </span>
                <span className="text-[10px] font-mono uppercase text-neutral-500 mt-2 block">
                  Monthly recurring fee
                </span>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Disclaimer & Payment Policy */}
        <FadeUp delay={0.35}>
          <div className="p-8 bg-neutral-950 border-l-2 border-neutral-700 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Important Payment Policy & Branch Notes
              </span>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {feeData.disclaimer}
              </p>
              <p className="text-xs font-mono text-dk-yellow mt-1">
                Notice: {feeData.paymentNote}
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <Button href="/branches" variant="primary" size="md" icon>
                Check Branch Availability
              </Button>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
