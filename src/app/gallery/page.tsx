import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { FadeUp } from "@/components/ui/Motion";
import { getMedia } from "@/lib/db-services";

export const metadata: Metadata = {
  title: "Visual Gallery | DK Dance Company Performances & Classes",
  description:
    "Explore the visual archive of DK Dance Company: stage shows, competition wins, workshop intensives, and branch activities in Kozhikode and Bournemouth UK.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const mediaItems = await getMedia();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-32 pb-24">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
          <FadeUp>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-extralight sm:font-thin uppercase tracking-tight leading-[0.9] text-white max-w-4xl mb-8">
              Gallery
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">
              Photographs, stage productions, and movement reels capturing the
              energy, discipline, and artistic spirit of DK Dance Company.
            </p>
          </FadeUp>
        </section>

        {/* Database-driven Gallery Grid */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8">
          <GalleryGrid items={mediaItems} showCategories={true} />
        </section>
      </main>

      <Footer />
      <WhatsAppButton variant="floating" />
    </>
  );
}
