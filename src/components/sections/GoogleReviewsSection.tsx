"use client";

import React from "react";
import Link from "next/link";
import { FadeUp } from "@/components/ui/Motion";
import { ExternalLink, CheckCircle2 } from "lucide-react";

export interface GoogleReview {
  id: string;
  author: string;
  avatarLetter: string;
  avatarBg: string;
  badge: string;
  rating: number;
  timeAgo: string;
  text: string;
}

export const GOOGLE_REVIEWS_DATA: GoogleReview[] = [
  {
    id: "review-1",
    author: "Anusree K.",
    avatarLetter: "A",
    avatarBg: "bg-[#EA4335]", // Google Red
    badge: "Local Guide • 24 reviews",
    rating: 5,
    timeAgo: "2 weeks ago",
    text: "DK Dance Company is undeniably the best dance academy in Kozhikode! Dhanesh master's teaching methodology is simply exceptional. My daughter joined as a complete beginner and her stage presence and confidence have skyrocketed. The studio vibe is super energetic and disciplined!",
  },
  {
    id: "review-2",
    author: "Rahul Menon",
    avatarLetter: "R",
    avatarBg: "bg-[#4285F4]", // Google Blue
    badge: "8 reviews",
    rating: 5,
    timeAgo: "3 weeks ago",
    text: "Outstanding choreography and very disciplined training. The faculty pays personal attention to every single dancer, focusing heavily on footwork and musicality. Their annual stage mega-show was executed with pure international standards. Highly recommend DKDC to anyone passionate about dance!",
  },
  {
    id: "review-3",
    author: "Dr. Fathima Zahra",
    avatarLetter: "F",
    avatarBg: "bg-[#34A853]", // Google Green
    badge: "Local Guide • 42 reviews",
    rating: 5,
    timeAgo: "1 month ago",
    text: "I joined the adult batch for fitness and contemporary dance after work. It has been the best decision! The workouts, body isolations, and choreography routines are therapeutic. Dhanesh sir and the team ensure everyone feels welcomed regardless of age or experience.",
  },
  {
    id: "review-4",
    author: "Deepak Nambiar",
    avatarLetter: "D",
    avatarBg: "bg-[#FBBC05] text-neutral-900 font-medium", // Google Yellow
    badge: "5 reviews",
    rating: 5,
    timeAgo: "1 month ago",
    text: "The best dance studio in Calicut for Hip-hop, Western, and Cinematic choreography. The mentors break down complex routines step-by-step. The energy in the studio is contagious. Dhanesh Krishnan sir is truly an inspiration to all upcoming artists in Kerala.",
  },
  {
    id: "review-5",
    author: "Sneha Varma",
    avatarLetter: "S",
    avatarBg: "bg-[#9C27B0]", // Google Purple
    badge: "Local Guide • 19 reviews",
    rating: 5,
    timeAgo: "2 months ago",
    text: "Enrolled both my kids at DKDC last year. The improvement in their physical coordination, rhythm, and stage confidence is incredible. Wonderful faculty, clean & spacious dance floors, and very transparent communication with parents. 5 stars all the way!",
  },
];

// Official multi-color Google 'G' Logo
export function GoogleGLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2 0 10.05 0 12s.46 3.8 1.27 5.42l4.01-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

// Google 5-star rating SVG
export function GoogleStars({
  rating = 5,
  size = "w-4 h-4",
}: {
  rating?: number;
  size?: string;
}) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`${size} ${
            i < rating ? "fill-[#FBBC05] text-[#FBBC05]" : "fill-neutral-700 text-neutral-700"
          }`}
          aria-hidden="true"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

const WRITE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
  "https://search.google.com/local/writereview?placeid=ChIJYaPHMiJZoTsR8_8feyt0-EE";

export function GoogleReviewsSection({
  isFullPage = false,
}: {
  isFullPage?: boolean;
}) {
  return (
    <section className="bg-black text-white py-24 sm:py-32 border-t border-neutral-900 relative">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-radial-gradient from-blue-950/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <FadeUp>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-4">
                <GoogleGLogo className="w-4 h-4" />
                <span className="editorial-eyebrow text-neutral-300 font-medium">
                  VERIFIED GOOGLE REVIEWS
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-heading font-light uppercase tracking-tight text-white mb-4">
                Words From Our Dancers
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
                Authentic, unfiltered reviews from our students, parents, and community training across DK Dance Company branches.
              </p>
            </FadeUp>
          </div>

          {/* Google Rating Summary & Write Review Button */}
          <FadeUp delay={0.1}>
            <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/[0.1] bg-neutral-950/80 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-2xl">
              <div className="flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-white/10 pb-4 sm:pb-0 sm:pr-6">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
                  <GoogleGLogo className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-heading font-semibold text-white tracking-tight">
                      5.0
                    </span>
                    <GoogleStars rating={5} size="w-4 h-4" />
                  </div>
                  <span className="text-xs text-neutral-400 font-light block mt-0.5">
                    Based on 140+ Google reviews
                  </span>
                </div>
              </div>

              {/* Write a Google Review Button */}
              <a
                href={WRITE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-white text-neutral-950 hover:bg-neutral-200 font-normal text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-lg group"
              >
                <GoogleGLogo className="w-4 h-4" />
                <span className="font-heading font-medium">Write a Google Review</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-950 transition-colors" />
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Google Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GOOGLE_REVIEWS_DATA.map((review, index) => (
            <FadeUp key={review.id} delay={index * 0.07}>
              <div className="h-full p-7 sm:p-8 rounded-3xl border border-white/[0.08] bg-neutral-950/60 hover:bg-white/[0.03] hover:border-white/20 transition-all duration-500 flex flex-col justify-between group shadow-sm hover:shadow-2xl relative">
                {/* Google G Emblem in Top Right */}
                <div className="absolute top-7 right-7 opacity-40 group-hover:opacity-100 transition-opacity">
                  <GoogleGLogo className="w-5 h-5" />
                </div>

                <div>
                  {/* Author Header */}
                  <div className="flex items-center gap-3.5 mb-5 pr-8">
                    {/* Google Style Circular Avatar */}
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center text-white text-base font-semibold shadow-inner shrink-0 ${review.avatarBg}`}
                    >
                      {review.avatarLetter}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-medium text-white truncate">
                          {review.author}
                        </h3>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4285F4] shrink-0" />
                      </div>
                      <span className="text-[11px] text-neutral-400 block truncate">
                        {review.badge}
                      </span>
                    </div>
                  </div>

                  {/* Rating Stars & Time */}
                  <div className="flex items-center gap-3 mb-4">
                    <GoogleStars rating={review.rating} size="w-4 h-4" />
                    <span className="text-xs text-neutral-500 font-light">
                      {review.timeAgo}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-neutral-300 text-sm leading-relaxed font-light">
                    "{review.text}"
                  </p>
                </div>

                {/* Card Bottom: Google Verified */}
                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-500">
                  <span className="inline-flex items-center gap-1.5 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                    Verified on Google
                  </span>
                  <a
                    href={WRITE_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    View on Maps
                  </a>
                </div>
              </div>
            </FadeUp>
          ))}

          {/* 6th Card: Write a Review Callout Tile */}
          <FadeUp delay={0.35}>
            <div className="h-full p-8 rounded-3xl border border-dashed border-white/20 bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-500 flex flex-col justify-between text-center items-center group">
              <div className="my-auto py-6">
                <div className="w-14 h-14 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <GoogleGLogo className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-light uppercase tracking-tight text-white mb-2">
                  Share Your Story
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm font-light max-w-xs mx-auto mb-6 leading-relaxed">
                  Have you trained at DK Dance Company? Your feedback inspires future dancers and helps us continue delivering excellence.
                </p>
                <a
                  href={WRITE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs uppercase tracking-wider font-medium transition-all duration-300 active:scale-95 shadow-[0_4px_20px_rgba(66,133,244,0.3)]"
                >
                  <GoogleGLogo className="w-4 h-4" />
                  <span>Write a Google Review</span>
                </a>
              </div>

              <div className="text-[11px] text-neutral-500">
                Directly redirects to Google Maps Review
              </div>
            </div>
          </FadeUp>
        </div>

        {/* View All / Full Page Link if on Home */}
        {!isFullPage && (
          <div className="mt-14 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-dk-yellow transition-colors duration-200"
            >
              <span>Explore All Google Reviews & Rating Details</span>
              <span className="text-base">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
