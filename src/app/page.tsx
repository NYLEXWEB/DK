import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandIntroSection } from "@/components/sections/BrandIntroSection";
import { DanceStylesSection } from "@/components/sections/DanceStylesSection";
import { WhoCanJoinSection } from "@/components/sections/WhoCanJoinSection";
import { BranchesSection } from "@/components/sections/BranchesSection";
import { PerformanceSection } from "@/components/sections/PerformanceSection";
import { HomeVideoSection } from "@/components/sections/HomeVideoSection";
import { OnlineClassesSection } from "@/components/sections/OnlineClassesSection";
import { GoogleReviewsSection } from "@/components/sections/GoogleReviewsSection";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { EnquiryCTASection } from "@/components/sections/EnquiryCTASection";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { FadeUp } from "@/components/ui/Motion";
import { getBranches, getMedia, getSiteSettings, getVideos } from "@/lib/db-services";

export const revalidate = 60; // Revalidate every minute for live CMS updates

export default async function HomePage() {
  const [branches, mediaItems, siteSettings, videos] = await Promise.all([
    getBranches(),
    getMedia(),
    getSiteSettings(),
    getVideos({ onlyPublished: true, onlyFeatured: true }),
  ]);

  return (
    <>
      <Navbar />
      <main className="w-full overflow-x-clip">
        {/* 1. Hero with Fixed Parallax Banner */}
        <HeroSection />

        {/* Subsequent Sections gliding over the fixed banner */}
        <div className="relative z-10 bg-black shadow-2xl">
          {/* 2. Brand Introduction & Director */}
          <BrandIntroSection />

          {/* 3. Dance Disciplines & Styles */}
          <DanceStylesSection />

          {/* 4. Who Can Join */}
          <WhoCanJoinSection />

          {/* 5. Branch Network Presence */}
          <BranchesSection branches={branches} />

          {/* 6. Performance & Choreography */}
          <PerformanceSection />

          {/* 7. Video Showcase */}
          <HomeVideoSection videos={videos} />

          {/* 8. Visual Gallery Preview */}
          <section className="bg-black text-white py-20 sm:py-36 border-t border-white/[0.08]">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                  <FadeUp>
                    <h2 className="text-4xl sm:text-6xl font-heading font-light uppercase tracking-tight text-white">
                      Movement In Frame
                    </h2>
                  </FadeUp>
                </div>
                <FadeUp delay={0.1}>
                  <Link
                    href="/gallery"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-dk-yellow hover:text-white px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm transition-all duration-300"
                  >
                    View Full Gallery ({mediaItems.length}) →
                  </Link>
                </FadeUp>
              </div>

              <GalleryGrid items={mediaItems} showCategories={false} limit={6} />
            </div>
          </section>

          {/* 8. Online Classes */}
          <OnlineClassesSection onlineData={siteSettings.onlineClasses} />

          {/* 9. Verified Google Reviews Showcase */}
          <GoogleReviewsSection />

          {/* 10. Strong Enquiry Call-to-Action */}
          <EnquiryCTASection />

          {/* 10. Global Site Footer */}
          <Footer />
        </div>
      </main>

      <WhatsAppButton variant="floating" />
    </>
  );
}
