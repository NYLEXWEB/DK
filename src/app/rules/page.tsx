import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeUp } from "@/components/ui/Motion";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Rules & Regulations | DK Dance Company",
  description:
    "Institutional rules, studio conduct, attendance guidelines, and fee policies at DK Dance Company.",
};

const RULES = [
  {
    number: "01",
    title: "Timely Fee Remittance",
    desc: "Monthly fees must be settled on or before the 10th of every calendar month. Delayed payments may forfeit batch placement or incur administrative surcharges.",
  },
  {
    number: "02",
    title: "Punctuality & Studio Etiquette",
    desc: "Students are required to report at least 10 minutes prior to scheduled session commencement. Warm-up is mandatory to prevent musculoskeletal strain.",
  },
  {
    number: "03",
    title: "Appropriate Dance Attire",
    desc: "Proper stretchable dance wear (track pants, form-fitting tees) and clean indoor footwear or bare feet (as prescribed per style) are required for every class.",
  },
  {
    number: "04",
    title: "Attendance & Consistency",
    desc: "Consistent attendance is prerequisite for choreographic continuity. Unscheduled absences disrupt group formations and may impact stage eligibility.",
  },
  {
    number: "05",
    title: "Discipline & Respect",
    desc: "Students and guardians are expected to maintain professional decorum, respect instructors, support fellow dancers, and honor studio property.",
  },
  {
    number: "06",
    title: "Performance Eligibility",
    desc: "Selection for annual stage shows, competitive teams, and external cultural showcases is contingent upon technique mastery, commitment, and faculty evaluation.",
  },
  {
    number: "07",
    title: "Health & Safety Declarations",
    desc: "Any pre-existing medical conditions, injuries, or physical restrictions must be reported to the administration prior to class participation.",
  },
];

export default function RulesPage() {
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
                INSTITUTIONAL STANDARDS
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-extrabold uppercase tracking-tight leading-[0.9] text-white max-w-4xl mb-8">
              Rules & Regulations
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">
              Discipline is the foundation of artistic greatness. These guidelines
              ensure a safe, focused, and respectful training environment for all
              DKDC students.
            </p>
          </FadeUp>
        </section>

        {/* Rules List */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-24">
          <div className="space-y-6">
            {RULES.map((rule, idx) => (
              <FadeUp key={rule.number} delay={idx * 0.05}>
                <div className="p-8 sm:p-10 bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition-colors duration-300 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                  <div className="md:col-span-2">
                    <span className="font-mono text-xs text-dk-yellow uppercase tracking-widest">
                      CLAUSE {rule.number}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h2 className="text-xl sm:text-2xl font-heading font-bold uppercase tracking-tight text-white">
                      {rule.title}
                    </h2>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-neutral-400 text-sm leading-relaxed font-light">
                      {rule.desc}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 text-center pt-12 border-t border-neutral-900">
          <FadeUp>
            <p className="text-neutral-400 text-sm mb-6 max-w-md mx-auto">
              Have questions regarding specific branch rules, fee schedules, or
              makeup classes?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="md">
                Contact Administration
              </Button>
              <Button href="/classes" variant="secondary" size="md">
                View Classes & Fees
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
