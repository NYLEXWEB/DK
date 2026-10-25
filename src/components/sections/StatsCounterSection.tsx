"use client";

import React, { useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/ui/Motion";

interface StatItem {
  target: number;
  suffix?: string;
  label: string;
}

const STATS_DATA: StatItem[] = [
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
        <span className="text-amber-500 font-light ml-0.5 sm:ml-1 text-2xl sm:text-4xl lg:text-6xl">
          {suffix}
        </span>
      )}
    </span>
  );
}

export function StatsCounterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

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
      {/* 1. Top Seamless Merge: Black into White */}
      <div className="absolute inset-x-0 top-0 h-28 sm:h-44 lg:h-52 bg-gradient-to-b from-black via-black/55 via-35% to-transparent pointer-events-none z-10" />

      {/* 2. Bottom Seamless Merge: White back into Black */}
      <div className="absolute inset-x-0 bottom-0 h-28 sm:h-44 lg:h-52 bg-gradient-to-t from-black via-black/55 via-35% to-transparent pointer-events-none z-10" />

      {/* Subtle luxury ambient glow in center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/[0.04] blur-[160px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-20">
        {/* Minimalist Title Tag in Contrasting Dark Tone */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16 lg:mb-20">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-300/80 shadow-sm mb-4">
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
        <div className="grid grid-cols-2 lg:grid-cols-3">
          {STATS_DATA.map((item, idx) => {
            return (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center py-8 sm:py-14 lg:py-20 px-2.5 sm:px-6 lg:px-8 text-center transition-all duration-300 group"
              >
                <FadeUp delay={idx * 0.05}>
                  {/* Large Minimalist Animated Number in Dark Typography */}
                  <div className="text-3xl sm:text-5xl lg:text-7xl font-heading font-thin tracking-tight text-neutral-950 group-hover:scale-105 transition-transform duration-500">
                    <AnimatedCounter
                      target={item.target}
                      suffix={item.suffix}
                      shouldStart={hasAnimated}
                    />
                  </div>

                  {/* Clean Uppercase Subtitle */}
                  <div className="mt-2 sm:mt-3 lg:mt-4 text-[10px] sm:text-xs lg:text-sm font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] text-neutral-600 font-light group-hover:text-neutral-900 transition-colors duration-300 max-w-[130px] sm:max-w-none">
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
