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
    target: 3000,
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
    target: 50,
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
        <span className="text-dk-yellow font-normal ml-1 text-3xl sm:text-5xl lg:text-6xl">
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
      className="relative bg-black text-white py-24 sm:py-32 border-t border-b border-white/[0.08] overflow-hidden"
    >
      {/* Subtle luxury ambient lighting in center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-dk-yellow/[0.025] blur-[160px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Simple Minimalist Title Tag */}
        <div className="text-center max-w-xl mx-auto mb-14 sm:mb-20">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-dk-yellow animate-pulse" />
              <span className="editorial-eyebrow text-neutral-400">
                MILESTONES & IMPACT
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extralight sm:font-thin uppercase tracking-tight text-white">
              DKDC By The Numbers
            </h2>
          </FadeUp>
        </div>

        {/* Minimalist Grid (No cards, clean architectural divider lines) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {STATS_DATA.map((item, idx) => {
            // Desktop 3-column border calculations
            const isLastInRowLg = (idx + 1) % 3 === 0;
            const isBottomRowLg = idx >= 3;

            // Tablet 2-column border calculations
            const isLastInRowSm = (idx + 1) % 2 === 0;
            const isBottomRowSm = idx >= 4;

            // Mobile 1-column
            const isLastItem = idx === STATS_DATA.length - 1;

            return (
              <div
                key={item.label}
                className={`flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 px-6 sm:px-8 text-center transition-all duration-300 group ${
                  // Border bottom logic
                  isLastItem ? "" : "border-b border-white/[0.08]"
                } ${
                  // Responsive border overrides for tablet & desktop
                  isBottomRowSm ? "sm:border-b-0" : "sm:border-b"
                } ${
                  isBottomRowLg ? "lg:border-b-0" : "lg:border-b"
                } ${
                  // Border right logic
                  isLastInRowSm ? "sm:border-r-0" : "sm:border-r sm:border-white/[0.08]"
                } ${
                  isLastInRowLg ? "lg:border-r-0" : "lg:border-r lg:border-white/[0.08]"
                }`}
              >
                <FadeUp delay={idx * 0.06}>
                  {/* Large Minimalist Animated Number */}
                  <div className="text-4xl sm:text-6xl lg:text-7xl font-heading font-light tracking-tight text-white group-hover:text-dk-yellow transition-colors duration-500">
                    <AnimatedCounter
                      target={item.target}
                      suffix={item.suffix}
                      shouldStart={hasAnimated}
                    />
                  </div>

                  {/* Clean Uppercase Subtitle */}
                  <div className="mt-3 sm:mt-4 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-400 font-light group-hover:text-neutral-300 transition-colors duration-300">
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
