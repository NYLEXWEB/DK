import React, { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandIntroSection } from "@/components/sections/BrandIntroSection";
import { StatsCounterSection } from "@/components/sections/StatsCounterSection";
import { LowerHomeSections, LowerHomeSectionsFallback } from "@/components/home/LowerHomeSections";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getSiteSettings } from "@/lib/db-services";

export const revalidate = 60; // Revalidate every minute for live CMS updates

export default async function HomePage() {
  // FAST TOP-HALF: Loads only siteSettings for immediate above-the-fold render
  const siteSettings = await getSiteSettings();

  return (
    <>
      <Navbar />
      <main className="w-full overflow-x-clip">
        {/* 1. Hero with Fixed Parallax Banner (Top Half - Instant) */}
        <HeroSection videoUrl={siteSettings.heroVideoUrl} />

        {/* Subsequent Sections gliding over the fixed banner */}
        <div className="relative z-10 bg-black shadow-2xl">
          {/* 2. Brand Introduction & Director (Top Half - Instant) */}
          <BrandIntroSection settings={siteSettings} />

          {/* Animated Statistics Counter (Top Half - Instant) */}
          <StatsCounterSection stats={siteSettings.stats} />

          {/* LOWER HALF: Streamed seamlessly with React Suspense */}
          <Suspense fallback={<LowerHomeSectionsFallback />}>
            <LowerHomeSections settings={siteSettings} />
          </Suspense>
        </div>
      </main>

      <WhatsAppButton
        variant="floating"
        phone={siteSettings.contact.whatsapp}
      />
    </>
  );
}
