"use client";

import React, { useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/ui/Motion";

import { StatItem } from "@/types";
import { INITIAL_SITE_SETTINGS } from "@/lib/constants";

const STATS_DATA: StatItem[] = INITIAL_SITE_SETTINGS.stats || [
  {
    target: 5000,
    suffix: "+",
    label: "Students Trained",
  },
  {
    target: 10,
    suffix: "+",
    label: "Master Instructors",
  },
  {
    target: 6,
    suffix: "",
    label: "Studio Spaces",
  },
  {
    target: 2,
    suffix: "",
    label: "Countries (India & UK)",
  },
  {
    target: 100,
    suffix: "+",
    label: "Stage Productions",
  },
  {
    target: 12,
    suffix: "+",
    label: "Years of Legacy",
  },
];

function AnimatedCounter({
  target,
  suffix = "",
  shouldStart = false,
}: {
  target: number;
  suffix?: string;
  shouldStart: boolean;
}) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4);
    };

    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      const currentVal = Math.floor(1 + (target - 1) * easedProgress);
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [shouldStart, target]);

  return (
    <span className="inline-flex items-baseline justify-center">
      <span>{count.toLocaleString()}</span>
      {suffix && (
        <span className="text-amber-500 font-light ml-0.5 sm:ml-1 text-2xl sm:text-4xl lg:text-6xl transition-colors duration-300 group-hover:text-amber-600">
          {suffix}
        </span>
      )}
    </span>
  );
}

export function StatsCounterSection({ stats }: { stats?: StatItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const displayStats =
    stats && Array.isArray(stats) && stats.length === 6 ? stats : STATS_DATA;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.15 }
    );

    const currentElem = sectionRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-neutral-950 py-24 sm:py-36 lg:py-44 overflow-hidden"
    >
      {/* 1. Top Liquid Water Flow: Seamless organic wave flowing from Black into White */}
      <div className="absolute top-0 inset-x-0 w-full overflow-hidden leading-none z-10 pointer-events-none -mt-[1px]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-12 sm:h-20 lg:h-28 text-black"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Soft secondary water ripple layer with delicate opacity */}
          <path
            d="M0 0L1440 0V45C1240 75 1060 25 880 55C700 85 520 35 340 65C180 90 60 70 0 50V0Z"
            fill="currentColor"
            opacity="0.25"
          />
          {/* Primary deep liquid water wave crest */}
          <path
            d="M0 0L1440 0V30C1280 65 1100 15 920 50C740 85 560 30 380 60C200 90 80 40 0 35V0Z"
            fill="currentColor"
          />
          {/* Hairline gold accent reflecting across the wave crest */}
          <path
            d="M0 35C80 40 200 90 380 60C560 30 740 85 920 50C1100 15 1280 65 1440 30"
            stroke="url(#dkdcLiquidWaveGoldTop)"
            strokeWidth="1.5"
            strokeOpacity="0.45"
          />
          <defs>
            <linearGradient id="dkdcLiquidWaveGoldTop" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF102" stopOpacity="0" />
              <stop offset="0.25" stopColor="#FFF102" stopOpacity="0.8" />
              <stop offset="0.65" stopColor="#EE1D23" stopOpacity="0.5" />
              <stop offset="1" stopColor="#FFF102" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 2. Bottom Liquid Water Flow: Seamless organic wave rising from White into Black */}
      <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none z-10 pointer-events-none -mb-[1px]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-12 sm:h-20 lg:h-28 text-neutral-950"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Soft secondary water ripple layer with delicate opacity */}
          <path
            d="M0 120L1440 120V75C1260 45 1080 95 900 65C720 35 540 85 360 55C200 30 80 50 0 70V120Z"
            fill="currentColor"
            opacity="0.25"
          />
          {/* Primary deep liquid water wave crest */}
          <path
            d="M0 120L1440 120V90C1260 55 1080 105 900 70C720 35 540 90 360 60C180 30 60 80 0 85V120Z"
            fill="currentColor"
          />
          {/* Hairline gold accent reflecting across the wave crest */}
          <path
            d="M0 85C60 80 180 30 360 60C540 90 720 35 900 70C1080 105 1260 55 1440 90"
            stroke="url(#dkdcLiquidWaveGoldBottom)"
            strokeWidth="1.5"
            strokeOpacity="0.45"
          />
          <defs>
            <linearGradient id="dkdcLiquidWaveGoldBottom" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF102" stopOpacity="0" />
              <stop offset="0.3" stopColor="#FFF102" stopOpacity="0.8" />
              <stop offset="0.75" stopColor="#EE1D23" stopOpacity="0.5" />
              <stop offset="1" stopColor="#FFF102" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Subtle luxury ambient glow in center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/[0.03] blur-[160px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-20">
        {/* Minimalist Title Tag in Contrasting Dark Tone */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16 lg:mb-20">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-300/80 shadow-sm mb-4 transition-transform duration-300 hover:scale-105">
              <span className="w-1.5 h-1.5 rounded-full bg-dk-red animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-600 font-medium">
                MILESTONES & IMPACT
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-thin uppercase tracking-tight text-neutral-950">
              DKDC By The Numbers
            </h2>
          </FadeUp>
        </div>

        {/* Minimalist Architectural Grid: 2 Columns on Mobile, 3 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 sm:gap-y-10 gap-x-4 sm:gap-x-8">
          {displayStats.map((item, idx) => {
            return (
              <div
                key={`${item.label}-${idx}`}
                className="flex flex-col items-center justify-center py-6 sm:py-10 lg:py-12 px-3 sm:px-6 rounded-2xl transition-all duration-300 group min-w-0 max-w-full overflow-hidden hover:-translate-y-1.5 cursor-default"
              >
                <FadeUp delay={idx * 0.05}>
                  {/* Large Minimalist Animated Number in Dark Typography */}
                  <div className="relative inline-block text-2xl sm:text-5xl lg:text-7xl font-heading font-thin tracking-tight text-neutral-950 group-hover:scale-105 transition-transform duration-300 max-w-full break-words [overflow-wrap:anywhere]">
                    <AnimatedCounter
                      target={item.target}
                      suffix={item.suffix}
                      shouldStart={hasAnimated}
                    />
                    {/* Golden water-flow underline accent that expands on hover */}
                    <div className="mx-auto mt-2 h-[2px] w-0 bg-gradient-to-r from-dk-yellow via-amber-400 to-dk-red rounded-full group-hover:w-10 sm:group-hover:w-14 transition-all duration-300 ease-out" />
                  </div>

                  {/* Clean Uppercase Subtitle */}
                  <div className="mt-2 sm:mt-3 lg:mt-4 text-[10px] sm:text-xs lg:text-sm font-mono uppercase tracking-[0.12em] sm:tracking-[0.2em] lg:tracking-[0.25em] text-neutral-600 font-light group-hover:text-neutral-950 transition-colors duration-300 max-w-full break-words [overflow-wrap:anywhere] px-1">
                    {item.label}
                  </div>
                </FadeUp>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
