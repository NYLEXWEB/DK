import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MapPin, Phone, MessageCircle, ArrowUpRight, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { FadeUp, RevealImage } from "@/components/ui/Motion";
import { getBranchBySlug, getBranches } from "@/lib/db-services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const branch = await getBranchBySlug(slug);

  if (!branch) {
    return {
      title: "Branch Not Found | DK Dance Company",
    };
  }

  return {
    title: `${branch.name} Branch, ${branch.city} | DK Dance Company`,
    description:
      branch.description ||
      `Dance classes and professional training at DK Dance Company ${branch.name} branch in ${branch.city}, ${branch.country}.`,
  };
}

export default async function BranchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [branch, allBranches] = await Promise.all([
    getBranchBySlug(slug),
    getBranches(),
  ]);

  if (!branch) {
    notFound();
  }

  const isInternational = branch.country.toLowerCase() !== "india";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-32 pb-24">
        {/* Back Link */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-8">
          <Link
            href="/branches"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-dk-yellow transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Branches</span>
          </Link>
        </div>

        {/* Hero Section of Branch */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <FadeUp>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-[2px] bg-dk-yellow" />
                  <span className="editorial-eyebrow text-neutral-400">
                    {isInternational ? "INTERNATIONAL STUDIO" : "KERALA STUDIO"}
                  </span>
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold uppercase tracking-tight text-white mb-6">
                  {branch.name}
                </h1>
                <div className="flex items-center gap-2 text-neutral-400 text-sm font-mono uppercase mb-6">
                  <MapPin className="w-4 h-4 text-dk-red" />
                  <span>
                    {branch.city}, {branch.country}
                  </span>
                </div>
                <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-8">
                  {branch.description ||
                    `DK Dance Company ${branch.name} studio offers professional training for beginners to advanced performers under our comprehensive syllabus.`}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  {branch.googleMapsUrl && (
                    <a
                      href={branch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black hover:bg-dk-yellow font-heading font-bold text-xs uppercase tracking-widest transition-all duration-300"
                    >
                      <span>View Location</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={`https://wa.me/${branch.whatsapp || "919995272083"}?text=${encodeURIComponent(`Hello DK Dance Company, I would like to enquire about the ${branch.name} branch.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-neutral-900 border border-neutral-800 text-white hover:border-[#25D366] hover:text-[#25D366] text-xs font-mono uppercase tracking-wider transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Enquiry</span>
                  </a>
                </div>
              </FadeUp>
            </div>

            {/* Visual */}
            <div className="lg:col-span-5 relative aspect-[4/3] bg-neutral-950 overflow-hidden border border-neutral-800">
              <RevealImage className="w-full h-full relative">
                <Image
                  src={
                    branch.imageUrl ||
                    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80"
                  }
                  alt={`${branch.name} Studio`}
                  fill
                  priority
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </RevealImage>
            </div>
          </div>
        </section>

        {/* Branch Info Cards */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-neutral-950 border border-neutral-800">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                Address & Location
              </span>
              <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                {branch.address || `${branch.name}, ${branch.city}, ${branch.country}`}
              </p>
              {branch.googleMapsUrl && (
                <a
                  href={branch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-dk-yellow hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="p-8 bg-neutral-950 border border-neutral-800">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                Class Timetable
              </span>
              <p className="text-sm text-neutral-300 leading-relaxed mb-4 font-mono">
                {branch.classTimings || "Batch schedules confirmed upon admission consultation."}
              </p>
              <span className="text-xs text-neutral-500">
                Weekend & weekday batches available
              </span>
            </div>

            <div className="p-8 bg-neutral-950 border border-neutral-800">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                Direct Contact
              </span>
              <div className="space-y-2 text-sm text-neutral-300 font-mono">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{branch.phone || "+91 9995 272 083"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp: {branch.whatsapp || "919995272083"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enquiry Form Preselected for this Branch */}
        <section className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <span className="editorial-eyebrow text-dk-yellow block mb-2">
              ADMISSION CONSULTATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold uppercase tracking-tight text-white mb-4">
              Enquire For {branch.name} Studio
            </h2>
            <p className="text-sm text-neutral-400 max-w-md mx-auto">
              Submit your inquiry and our branch coordinator will reach out to schedule your trial class or batch placement.
            </p>
          </div>

          <ContactForm branches={allBranches} defaultBranch={branch.name} />
        </section>
      </main>

      <Footer />
      <WhatsAppButton variant="floating" branchName={branch.name} />
    </>
  );
}
