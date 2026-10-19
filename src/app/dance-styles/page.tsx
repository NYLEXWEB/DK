import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp, RevealImage } from "@/components/ui/Motion";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { DANCE_STYLES, SPECIAL_TRAINING_MODULES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Dance Styles & Special Training | DK Dance Company",
  description:
    "Explore dance styles offered by DK Dance Company: Bollywood, Hip-Hop, Contemporary, Lyrical, Western, and Freestyle dance, along with specialized conditioning and acrobatics.",
};

export default function DanceStylesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-32 pb-24">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-24">
          <FadeUp>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-dk-yellow" />
              <span className="editorial-eyebrow text-neutral-400">
                CURRICULUM & DISCIPLINES
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-extrabold uppercase tracking-tight leading-[0.9] text-white max-w-4xl mb-8">
              Dance Styles
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">
              We teach diverse international and contemporary dance vocabularies,
              each anchored in anatomical conditioning, expressive theatricality,
              and rhythmic mastery.
            </p>
          </FadeUp>
        </section>

        {/* Detailed Styles Breakdown */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-32 mb-36">
          {DANCE_STYLES.map((style, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={style.slug}
                id={style.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-12 border-t border-neutral-900 ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual */}
                <div
                  className={`lg:col-span-6 relative aspect-[16/11] bg-neutral-950 overflow-hidden border border-neutral-900 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <RevealImage className="w-full h-full relative">
                    <Image
                      src={style.image}
                      alt={style.name}
                      fill
                      className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 left-4">
                      <span className="font-mono text-xs px-2.5 py-1 bg-black text-dk-yellow border border-neutral-800">
                        {style.number} // DISCIPLINE
                      </span>
                    </div>
                  </RevealImage>
                </div>

                {/* Content */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-between ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <FadeUp delay={0.1}>
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                      {style.tagline}
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-heading font-extrabold uppercase tracking-tight text-white mb-6">
                      {style.name}
                    </h2>
                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8 font-light">
                      {style.description}
                    </p>
                  </FadeUp>

                  <FadeUp delay={0.2}>
                    <div className="mb-8">
                      <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
                        Key Training Objectives:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-neutral-400 uppercase">
                        {style.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-2 py-1.5 border-b border-neutral-900"
                          >
                            <span className="text-dk-yellow">✦</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button
                        href={`/contact?style=${encodeURIComponent(style.name)}`}
                        variant="primary"
                        size="md"
                        icon
                      >
                        Enroll In {style.name}
                      </Button>
                      <Button href="/classes" variant="ghost" size="md">
                        Check Timings
                      </Button>
                    </div>
                  </FadeUp>
                </div>
              </div>
            );
          })}
        </section>

        {/* Special Training Section */}
        <section className="bg-neutral-950 py-28 border-t border-neutral-900 mb-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="max-w-3xl mb-16">
              <FadeUp>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-[2px] bg-dk-red" />
                  <span className="editorial-eyebrow text-neutral-400">
                    ANATOMICAL RIGOR
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-heading font-extrabold uppercase tracking-tight text-white mb-4">
                  Special Training Curriculum
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base font-light">
                  Dance mastery requires targeted physiological conditioning.
                  These specialized modules are embedded into all student levels.
                </p>
              </FadeUp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SPECIAL_TRAINING_MODULES.map((item, idx) => (
                <FadeUp key={item.title} delay={idx * 0.07}>
                  <div className="p-8 bg-black border border-neutral-900 hover:border-dk-yellow transition-all duration-300 group">
                    <span className="text-xs font-mono text-neutral-600 block mb-3 group-hover:text-dk-yellow transition-colors">
                      MODULE 0{idx + 1}
                    </span>
                    <h3 className="text-xl font-heading font-bold uppercase text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 text-center pt-12">
          <FadeUp>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold uppercase tracking-tight text-white mb-6">
              Find the right style for you
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" variant="accent" size="lg" icon>
                Book An Audition / Trial
              </Button>
              <Button href="/branches" variant="secondary" size="lg">
                View Studio Locations
              </Button>
            </div>
          </FadeUp>
        </section>
      </main>

      <Footer />
      <WhatsAppButton variant="floating" />
    </>
  );
}
