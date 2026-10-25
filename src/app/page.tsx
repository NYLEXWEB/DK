import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandIntroSection } from "@/components/sections/BrandIntroSection";
import { StatsCounterSection } from "@/components/sections/StatsCounterSection";
import { DanceStylesSection } from "@/components/sections/DanceStylesSection";
import { WhoCanJoinSection } from "@/components/sections/WhoCanJoinSection";
import { BranchesSection } from "@/components/sections/BranchesSection";
import { HomeVideoSection } from "@/components/sections/HomeVideoSection";
import { OnlineClassesSection } from "@/components/sections/OnlineClassesSection";
import { GoogleReviewsSection } from "@/components/sections/GoogleReviewsSection";
import { GalleryMarquee } from "@/components/gallery/GalleryMarquee";
import { EnquiryCTASection } from "@/components/sections/EnquiryCTASection";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { FadeUp } from "@/components/ui/Motion";
import {
  getBranches,
  getMedia,
  getSiteSettings,
  getVideos,
  getDanceStyles,
  getCurriculumModules,
  getReviews,
} from "@/lib/db-services";

export const revalidate = 60; // Revalidate every minute for live CMS updates

export default async function HomePage() {
  const [branches, mediaItems, siteSettings, videos, danceStyles, curriculum, reviews] =
    await Promise.all([
      getBranches(),
      getMedia(),
      getSiteSettings(),
      getVideos({ onlyPublished: true, onlyFeatured: true }),
      getDanceStyles(true),
      getCurriculumModules(true),
      getReviews(true),
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

          {/* Animated Statistics Counter (3,000+ Students, 10+ Trainers, 6 Studios, 2 Countries) */}
          <StatsCounterSection />

          {/* 3. Dance Disciplines & Styles */}
          <DanceStylesSection styles={danceStyles} curriculum={curriculum} />

          {/* 4. Who Can Join */}
          <WhoCanJoinSection />

          {/* 5. Branch Network Presence */}
          <BranchesSection branches={branches} />

          {/* 7. Video Showcase */}
          <HomeVideoSection videos={videos} />

          {/* 8. Visual Gallery Preview */}
          <section className="bg-black text-white py-14 sm:py-20 lg:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8 sm:mb-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <FadeUp>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-4">
                      <span className="w-2 h-2 rounded-full bg-dk-yellow animate-pulse" />
                      <span className="editorial-eyebrow text-neutral-300 font-medium">
                        PHOTO ARCHIVE
                      </span>
                    </div>
                    <h2 className="text-4xl sm:text-6xl font-heading font-light uppercase tracking-tight text-white">
                      Movement In Frame
                    </h2>
                  </FadeUp>
                </div>
                <FadeUp delay={0.1}>
                  <Link
                    href="/gallery"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-dk-yellow hover:text-white px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:border-dk-yellow/40 hover:bg-white/[0.06]"
                  >
                    View Full Gallery ({mediaItems.length}) →
                  </Link>
                </FadeUp>
              </div>
            </div>

            {/* 2-layer horizontal infinite loop photo marquee */}
            <GalleryMarquee items={mediaItems} />
          </section>

          {/* 8. Online Classes */}
          <OnlineClassesSection onlineData={siteSettings.onlineClasses} />

          {/* 9. Verified Google Reviews Showcase */}
          <GoogleReviewsSection reviews={reviews} />

          {/* 10. Strong Enquiry Call-to-Action */}
          <EnquiryCTASection />

          {/* 10. Global Site Footer */}
          <Footer settings={siteSettings} />
        </div>
      </main>

      <WhatsAppButton
        variant="floating"
        phone={siteSettings.contact.whatsapp}
      />
    </>
  );
}
