"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight, MessageCircle } from "lucide-react";
import { FadeUp } from "@/components/ui/Motion";
import { Branch } from "@/types";
import { formatWhatsAppUrl } from "@/lib/utils";

interface BranchesSectionProps {
  branches: Branch[];
  showAll?: boolean;
}

export function BranchesSection({ branches, showAll = false }: BranchesSectionProps) {
  const displayBranches = showAll ? branches : branches.slice(0, 6);

  return (
    <section className="bg-black text-white py-28 sm:py-36 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <FadeUp>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-dk-yellow" />
                <span className="editorial-eyebrow text-neutral-400">
                  05 — NETWORK & STUDIOS
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-heading font-extrabold uppercase tracking-tight text-white">
                Branch Presence
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.1}>
            <p className="text-neutral-400 text-sm max-w-md font-light leading-relaxed">
              Studios situated across Kozhikode, Kerala, complemented by our
              international branch in Bournemouth, United Kingdom.
            </p>
          </FadeUp>
        </div>

        {/* Branch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBranches.map((branch, index) => {
            const isInternational = branch.country.toLowerCase() !== "india";
            const whatsappUrl = formatWhatsAppUrl(
              branch.whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919995272083",
              `Hello DK Dance Company, I would like to enquire about the ${branch.name} branch.`
            );

            return (
              <FadeUp key={branch.slug} delay={index * 0.08}>
                <div className="bg-neutral-950 border border-neutral-800 hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between h-full group overflow-hidden">
                  {/* Branch Image Preview */}
                  <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
                    <Image
                      src={
                        branch.imageUrl ||
                        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={`${branch.name} branch of DK Dance Company`}
                      fill
                      className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />

                    {/* International Badge */}
                    {isInternational && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 bg-dk-yellow text-black font-bold">
                          International Branch
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-300">
                      <span>{branch.city}</span>
                      <span>{branch.country}</span>
                    </div>
                  </div>

                  {/* Branch Details */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-neutral-500 text-xs font-mono uppercase mb-2">
                        <MapPin className="w-3.5 h-3.5 text-dk-red" />
                        <span>{branch.city}, {branch.country}</span>
                      </div>
                      <h3 className="text-2xl font-heading font-bold uppercase tracking-tight text-white mb-3">
                        {branch.name}
                      </h3>
                      {branch.description && (
                        <p className="text-xs text-neutral-400 leading-relaxed mb-6 line-clamp-3">
                          {branch.description}
                        </p>
                      )}
                      {branch.classTimings && (
                        <div className="text-[11px] font-mono text-neutral-500 mb-6 bg-black p-3 border border-neutral-900">
                          <span className="text-neutral-400 block mb-1">Schedule:</span>
                          {branch.classTimings}
                        </div>
                      )}
                    </div>

                    {/* Action Links */}
                    <div className="pt-4 border-t border-neutral-900 flex items-center justify-between gap-3">
                      {branch.googleMapsUrl ? (
                        <a
                          href={branch.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-dk-yellow hover:text-white transition-colors duration-200"
                        >
                          <span>View Location</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-xs font-mono text-neutral-600 uppercase">
                          Location Pending
                        </span>
                      )}

                      <div className="flex items-center gap-3">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Enquire via WhatsApp for ${branch.name}`}
                          className="p-2 border border-neutral-800 text-neutral-400 hover:text-[#25D366] hover:border-[#25D366] transition-colors duration-200"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <Link
                          href={`/branches/${branch.slug}`}
                          className="text-xs font-mono uppercase text-neutral-400 hover:text-white transition-colors duration-200"
                        >
                          Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {!showAll && (
          <div className="mt-16 text-center">
            <Link
              href="/branches"
              className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-neutral-400 hover:text-dk-yellow transition-colors duration-200"
            >
              <span>Explore All Studio Details & Schedules</span>
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
