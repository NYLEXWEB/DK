import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { Check, Globe, Video, Clock, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { FadeUp, RevealImage } from "@/components/ui/Motion";
import { getSiteSettings, getBranches } from "@/lib/db-services";

export const metadata: Metadata = {
  title: "Online Dance Classes Worldwide | DK Dance Company",
  description:
    "Learn dance online from anywhere in the world with DK Dance Company. Interactive digital training in technique, rhythm, coordination, and performance skills.",
};

export default async function OnlineClassesPage() {
  const [settings, branches] = await Promise.all([
    getSiteSettings(),
    getBranches(),
  ]);

  const onlineData = settings.onlineClasses;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-32 pb-24">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-20">
          <FadeUp>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-dk-yellow" />
              <span className="editorial-eyebrow text-neutral-400">
                WORLDWIDE DIGITAL TRAINING
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-extrabold uppercase tracking-tight leading-[0.9] text-white max-w-4xl mb-8">
              Online Classes
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">
              {onlineData.headline}. DK Dance Company brings structured dance
              education to international students, diaspora communities, and
              dancers worldwide.
            </p>
          </FadeUp>
        </section>

        {/* Feature Grid & Visual */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-8">
              <FadeUp>
                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
                  {onlineData.description}
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="space-y-4">
                  {onlineData.features.map((feat) => (
                    <div
                      key={feat}
                      className="flex items-center gap-4 p-4 bg-neutral-950 border border-neutral-800"
                    >
                      <div className="w-6 h-6 rounded-full bg-dk-yellow/10 text-dk-yellow flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-dk-yellow" />
                      </div>
                      <span className="text-sm font-heading font-medium uppercase tracking-wide text-white">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-neutral-900 text-center">
                  <div className="p-4 bg-neutral-950 border border-neutral-900">
                    <Globe className="w-5 h-5 text-neutral-400 mx-auto mb-2" />
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                      Global Access
                    </span>
                  </div>
                  <div className="p-4 bg-neutral-950 border border-neutral-900">
                    <Video className="w-5 h-5 text-neutral-400 mx-auto mb-2" />
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                      HD 2-Way Video
                    </span>
                  </div>
                  <div className="p-4 bg-neutral-950 border border-neutral-900">
                    <Clock className="w-5 h-5 text-neutral-400 mx-auto mb-2" />
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                      Flexible Zones
                    </span>
                  </div>
                  <div className="p-4 bg-neutral-950 border border-neutral-900">
                    <ShieldCheck className="w-5 h-5 text-neutral-400 mx-auto mb-2" />
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                      Certified DKDC
                    </span>
                  </div>
                </div>
              </FadeUp>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/5] bg-neutral-950 overflow-hidden border border-neutral-800">
              <RevealImage className="w-full h-full relative">
                <Image
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80"
                  alt="Online dance learning with DK Dance Company"
                  fill
                  priority
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </RevealImage>
            </div>
          </div>
        </section>

        {/* Dedicated Online Enquiry Form */}
        <section className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <span className="editorial-eyebrow text-dk-yellow block mb-2">
              DIGITAL ADMISSIONS
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold uppercase tracking-tight text-white mb-4">
              Enquire For Online Classes
            </h2>
            <p className="text-sm text-neutral-400 max-w-md mx-auto">
              Tell us your location, time zone, and experience level. We will
              match you with the optimal batch or private coaching schedule.
            </p>
          </div>

          <ContactForm branches={branches} defaultMode="online" />
        </section>
      </main>

      <Footer />
      <WhatsAppButton variant="floating" message="Hello DK Dance Company, I would like to enquire about online dance classes." />
    </>
  );
}
