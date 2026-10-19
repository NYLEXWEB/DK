"use client";

import React from "react";
import { FadeUp } from "@/components/ui/Motion";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function EnquiryCTASection() {
  return (
    <section className="bg-black text-white py-32 sm:py-44 border-t border-neutral-900 relative overflow-hidden">
      {/* Background Subtle Accent Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-dk-yellow/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-dk-yellow" />
            <span className="editorial-eyebrow text-dk-yellow">
              BEGIN YOUR MOVEMENT JOURNEY
            </span>
            <span className="w-8 h-[2px] bg-dk-yellow" />
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black uppercase tracking-tight text-white leading-[0.95] mb-8">
            Step onto the stage. <br />
            Train with DK Dance Company.
          </h2>
        </FadeUp>

        <FadeUp delay={0.25}>
          <p className="text-neutral-400 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Admissions are open for our Kozhikode studio branches and
            international programs. Begin with structured training under Director
            Dhanesh Krishnan.
          </p>
        </FadeUp>

        <FadeUp delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Button href="/contact" variant="primary" size="lg" icon>
              Enquire For Admission
            </Button>
            <WhatsAppButton variant="button">
              WhatsApp Our Desk
            </WhatsAppButton>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
