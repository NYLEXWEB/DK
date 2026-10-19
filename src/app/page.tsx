import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandIntroSection } from "@/components/sections/BrandIntroSection";
import { DanceStylesSection } from "@/components/sections/DanceStylesSection";
import { ClassesFeesSection } from "@/components/sections/ClassesFeesSection";
import { WhoCanJoinSection } from "@/components/sections/WhoCanJoinSection";
import { BranchesSection } from "@/components/sections/BranchesSection";
import { PerformanceSection } from "@/components/sections/PerformanceSection";
import { OnlineClassesSection } from "@/components/sections/OnlineClassesSection";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { EnquiryCTASection } from "@/components/sections/EnquiryCTASection";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { FadeUp } from "@/components/ui/Motion";
import { getBranches, getMedia, getSiteSettings } from "@/lib/db-services";

export const revalidate = 60; // Revalidate every minute for live CMS updates

export default async function HomePage() {
  const [branches, mediaItems, siteSettings] = await Promise.all([
    getBranches(),
    getMedia(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Navbar />
      <main className="w-full overflow-hidden">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Brand Introduction & Director */}
        <BrandIntroSection />

        {/* 3. Dance Disciplines & Styles */}
        <DanceStylesSection />

        {/* 4. Who Can Join */}
        <WhoCanJoinSection />

        {/* 5. Classes & Fees */}
        <ClassesFeesSection fees={siteSettings.fees} />

        {/* 6. Branch Network Presence */}
        <BranchesSection branches={branches} />

        {/* 7. Performance & Choreography */}
        <PerformanceSection />

        {/* 8. Visual Gallery Preview */}
        <section className="bg-black text-white py-28 sm:py-36 border-t border-neutral-900">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <FadeUp>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-[2px] bg-dk-yellow" />
                    <span className="editorial-eyebrow text-neutral-400">
                      07 — VISUAL ARCHIVE
                    </span>
                  </div>
                  <h2 className="text-4xl sm:text-6xl font-heading font-extrabold uppercase tracking-tight text-white">
                    Movement In Frame
                  </h2>
                </FadeUp>
              </div>
              <FadeUp delay={0.1}>
                <Link
                  href="/gallery"
                  className="text-xs font-mono uppercase tracking-widest text-dk-yellow hover:text-white transition-colors"
                >
                  View Full Gallery ({mediaItems.length}) →
                </Link>
              </FadeUp>
            </div>

            <GalleryGrid items={mediaItems} showCategories={false} limit={6} />
          </div>
        </section>

        {/* 9. Online Classes */}
        <OnlineClassesSection onlineData={siteSettings.onlineClasses} />

        {/* 10. Strong Enquiry Call-to-Action */}
        <EnquiryCTASection />
      </main>

      <Footer />
      <WhatsAppButton variant="floating" />
    </>
  );
}
