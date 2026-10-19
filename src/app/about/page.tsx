import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp, RevealImage } from "@/components/ui/Motion";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getSiteSettings } from "@/lib/db-services";

export const metadata: Metadata = {
  title: "About Us | DK Dance Company",
  description:
    "Learn about DK Dance Company (DKDC), founded by Artistic Director Dhanesh Krishnan. Professional dance education across Kozhikode, Kerala and Bournemouth, UK.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  const trainingFocus = [
    {
      title: "Technique",
      desc: "Foundational anatomical alignment, muscle engagement, posture discipline, and controlled movement mechanics.",
    },
    {
      title: "Rhythm & Musicality",
      desc: "Deep listening, syncopation drills, tempo shifts, and learning to embody beats across diverse music genres.",
    },
    {
      title: "Body Movement",
      desc: "Kinetic awareness, seamless weight transitions, grounded floorwork, and fluid upper body coordination.",
    },
    {
      title: "Flexibility & Conditioning",
      desc: "Targeted elongation, core conditioning, safe stretching protocols, and joint mobility enhancement.",
    },
    {
      title: "Coordination",
      desc: "Polyrhythmic limb independence, complex movement combinations, and swift spatial orientation.",
    },
    {
      title: "Creativity & Improvisation",
      desc: "Unlocking individual artistic voice, movement exploration, emotional storytelling, and freestyle confidence.",
    },
    {
      title: "Performance Skills",
      desc: "Stage presence, projection, eye contact, spatial synchronization, and commanding audience connection.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-32 pb-24">
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-24">
          <FadeUp>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-dk-yellow" />
              <span className="editorial-eyebrow text-neutral-400">
                THE INSTITUTION
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-extrabold uppercase tracking-tight leading-[0.9] text-white max-w-4xl mb-8">
              Movement As An Art Form.
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">
              DK Dance Company (DKDC) is a professional dance training institution
              founded on discipline, creativity, and the relentless pursuit of
              artistic excellence.
            </p>
          </FadeUp>
        </section>

        {/* Story & Asymmetrical Image */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative aspect-[4/5] bg-neutral-950 overflow-hidden border border-neutral-900">
              <RevealImage className="w-full h-full relative">
                <Image
                  src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80"
                  alt="DK Dance Company studio practice session"
                  fill
                  priority
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-300">
                  <span>Founded by Dhanesh Krishnan</span>
                  <span>Kozhikode • Bournemouth</span>
                </div>
              </RevealImage>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between">
              <FadeUp delay={0.1}>
                <span className="editorial-eyebrow text-dk-red block mb-4">
                  Welcome To DKDC
                </span>
                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-6 font-light">
                  {settings.intro}
                </p>
                <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                  From absolute beginners taking their first steps to advanced
                  performers conditioning for international stages, our curriculum
                  is crafted with anatomical precision, musical depth, and
                  uncompromising dedication to dance as a serious discipline.
                </p>
              </FadeUp>

              {/* Mission & Vision Blocks */}
              <div className="space-y-6 pt-6 border-t border-neutral-900">
                <FadeUp delay={0.2}>
                  <div className="border-l-2 border-dk-yellow pl-6">
                    <span className="editorial-eyebrow text-dk-yellow block mb-2">
                      Our Mission
                    </span>
                    <p className="text-lg font-heading text-white">
                      {settings.mission}
                    </p>
                  </div>
                </FadeUp>

                <FadeUp delay={0.3}>
                  <div className="border-l-2 border-dk-red pl-6">
                    <span className="editorial-eyebrow text-dk-red block mb-2">
                      Our Vision
                    </span>
                    <p className="text-lg font-heading text-white">
                      {settings.vision}
                    </p>
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership: Director Dhanesh Krishnan */}
        <section className="bg-neutral-950 py-24 border-y border-neutral-900 mb-32">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <FadeUp>
                  <span className="editorial-eyebrow text-neutral-500 block mb-3">
                    Artistic Direction
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-heading font-extrabold uppercase tracking-tight text-white mb-6">
                    Dhanesh Krishnan
                  </h2>
                  <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed mb-6">
                    Under the visionary direction of Dhanesh Krishnan, DK Dance
                    Company has developed a distinct movement vocabulary that
                    bridges traditional Indian emotional storytelling with the
                    athleticism and geometry of modern contemporary and commercial
                    dance.
                  </p>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                    Overseeing training programs across Kozhikode and our
                    international branch in Bournemouth, United Kingdom, Dhanesh
                    Krishnan personally establishes the pedagogy, teacher
                    training standards, and artistic direction for every company
                    production.
                  </p>
                  <div className="flex items-center gap-6 text-xs font-mono text-neutral-500 uppercase">
                    <div>Head Office: Kozhikode, Kerala</div>
                    <div>•</div>
                    <div>Branch: Bournemouth, UK</div>
                  </div>
                </FadeUp>
              </div>

              <div className="lg:col-span-5 relative aspect-square bg-black border border-neutral-800 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1000&q=80"
                  alt="Dhanesh Krishnan Director of DK Dance Company"
                  fill
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* The 7 Focus Areas of Training */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-32">
          <div className="max-w-3xl mb-16">
            <FadeUp>
              <span className="editorial-eyebrow text-dk-yellow block mb-3">
                Curriculum Foundations
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold uppercase tracking-tight text-white mb-4">
                What We Train
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base font-light">
                Our curriculum is built around seven interconnected pillars
                ensuring holistic dancer development.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingFocus.map((item, idx) => (
              <FadeUp key={item.title} delay={idx * 0.06}>
                <div className="p-8 bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition-colors duration-300">
                  <span className="text-xs font-mono text-dk-yellow block mb-4">
                    PILLAR 0{idx + 1}
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
        </section>

        {/* Bottom CTA */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 text-center pt-12 border-t border-neutral-900">
          <FadeUp>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold uppercase tracking-tight text-white mb-6">
              Ready to begin?
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/classes" variant="primary" size="lg" icon>
                Explore Classes & Fees
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Contact Admissions
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
