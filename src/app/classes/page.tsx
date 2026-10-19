import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClassesFeesSection } from "@/components/sections/ClassesFeesSection";
import { WhoCanJoinSection } from "@/components/sections/WhoCanJoinSection";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { FadeUp } from "@/components/ui/Motion";
import { Button } from "@/components/ui/Button";
import { getSiteSettings, getBranches } from "@/lib/db-services";

export const metadata: Metadata = {
  title: "Classes & Fees | DK Dance Company",
  description:
    "Official fee structure for DK Dance Company: ₹1,000 admission, ₹500/month for 1 class/week, ₹800/month for 2 classes/week. Kozhikode studios and online programs.",
};

export default async function ClassesPage() {
  const [settings, branches] = await Promise.all([
    getSiteSettings(),
    getBranches(),
  ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-32 pb-24">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
          <FadeUp>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-dk-yellow" />
              <span className="editorial-eyebrow text-neutral-400">
                TUITION & SCHEDULES
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-extrabold uppercase tracking-tight leading-[0.9] text-white max-w-4xl mb-8">
              Classes & Fees
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">
              Structured dance education with straightforward, transparent pricing.
              All programs focus on progressive technical development, discipline,
              and performance preparation.
            </p>
          </FadeUp>
        </section>

        {/* Classes & Fees Component */}
        <ClassesFeesSection fees={settings.fees} />

        {/* Who Can Join */}
        <WhoCanJoinSection />

        {/* Branch Schedules Overview */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24 border-t border-neutral-900">
          <div className="max-w-3xl mb-12">
            <FadeUp>
              <span className="editorial-eyebrow text-dk-yellow block mb-2">
                Studio Timetable Inquiries
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold uppercase tracking-tight text-white mb-4">
                Confirming Your Timetable
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base font-light">
                Batch allocations are determined by age group, previous
                experience, and branch studio floor capacity. Select your
                nearest studio to verify current batch openings.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((b) => (
              <div
                key={b.slug}
                className="p-6 bg-neutral-950 border border-neutral-800 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-dk-yellow tracking-widest block mb-1">
                    {b.city}, {b.country}
                  </span>
                  <h3 className="text-xl font-heading font-bold uppercase text-white mb-2">
                    {b.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mb-4 font-mono">
                    {b.classTimings || "Batch schedules available upon enquiry."}
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                  <a
                    href={`/branches/${b.slug}`}
                    className="text-xs font-mono uppercase text-neutral-400 hover:text-white transition-colors"
                  >
                    View Studio Details →
                  </a>
                  <a
                    href={`https://wa.me/${b.whatsapp || "919995272083"}?text=${encodeURIComponent(`Hello DK Dance Company, I would like to check class timings for ${b.name} branch.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono uppercase text-[#25D366] hover:underline"
                  >
                    Ask Timetable
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button href="/contact" variant="primary" size="lg" icon>
              Register For An Admission Consultation
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton variant="floating" />
    </>
  );
}
