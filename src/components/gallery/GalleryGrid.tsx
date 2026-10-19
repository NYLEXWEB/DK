"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Play, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { MediaItem, MediaCategory } from "@/types";
import { FadeUp } from "@/components/ui/Motion";

interface GalleryGridProps {
  items: MediaItem[];
  showCategories?: boolean;
  limit?: number;
}

const CATEGORIES: Array<"All" | MediaCategory> = [
  "All",
  "Classes",
  "Performances",
  "Stage Shows",
  "Competitions",
  "School Programs",
  "Cultural Events",
  "Workshops",
  "Special Training",
  "Branch Activities",
  "Bournemouth",
];

export function GalleryGrid({
  items,
  showCategories = true,
  limit,
}: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const filteredItems = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const currentItem =
    activeItemIndex !== null ? displayItems[activeItemIndex] : null;

  const handleNext = useCallback(() => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) =>
      prev !== null && prev < displayItems.length - 1 ? prev + 1 : 0
    );
  }, [activeItemIndex, displayItems.length]);

  const handlePrev = useCallback(() => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : displayItems.length - 1
    );
  }, [activeItemIndex, displayItems.length]);

  const handleClose = useCallback(() => {
    setActiveItemIndex(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItemIndex, handleClose, handleNext, handlePrev]);

  // Lock body scroll during lightbox
  useEffect(() => {
    if (activeItemIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeItemIndex]);

  return (
    <div>
      {/* Category Filter Pills */}
      {showCategories && (
        <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-12 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveItemIndex(null);
                }}
                className={`whitespace-nowrap px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  isSelected
                    ? "bg-white text-black font-semibold"
                    : "bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {displayItems.length === 0 && (
        <div className="py-24 text-center border border-neutral-900 bg-neutral-950 p-8">
          <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest mb-2">
            No media found in this category
          </p>
          <p className="text-sm text-neutral-400 font-light">
            Check back soon as new class and performance media is uploaded.
          </p>
        </div>
      )}

      {/* Grid with Asymmetrical Rhythm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayItems.map((item, idx) => {
          const isLarge = idx % 5 === 0;

          return (
            <FadeUp
              key={item._id || item.url || idx}
              delay={idx * 0.05}
              className={isLarge ? "sm:col-span-2 sm:row-span-2" : ""}
            >
              <div
                onClick={() => setActiveItemIndex(idx)}
                className="group relative aspect-[4/3] w-full bg-neutral-950 border border-neutral-900 overflow-hidden cursor-pointer"
              >
                {item.type === "video" ? (
                  <div className="relative w-full h-full bg-neutral-900 flex items-center justify-center">
                    {item.thumbnailUrl ? (
                      <Image
                        src={item.thumbnailUrl}
                        alt={item.title}
                        fill
                        className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-neutral-900" />
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="relative z-10 w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center group-hover:bg-dk-yellow group-hover:scale-110 transition-all duration-300">
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.url}
                      alt={item.title || "DK Dance Company Gallery Media"}
                      fill
                      loading="lazy"
                      className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                  </div>
                )}

                {/* Info Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 bg-black/80 text-dk-yellow border border-neutral-800">
                      {item.category}
                    </span>
                    <span className="text-neutral-400 group-hover:text-white transition-colors duration-200">
                      <Eye className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-heading font-bold uppercase text-white tracking-tight mb-1">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-neutral-300 line-clamp-2 font-light">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>

      {/* Lightbox / Video Modal */}
      {currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close media dialog"
            className="absolute top-6 right-6 z-50 p-2 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          {displayItems.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous item"
                className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 text-neutral-400 hover:text-white bg-neutral-900/80 border border-neutral-800 hover:border-dk-yellow transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next item"
                className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 text-neutral-400 hover:text-white bg-neutral-900/80 border border-neutral-800 hover:border-dk-yellow transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Main Media Content */}
          <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
            {currentItem.type === "video" ? (
              <div className="w-full aspect-video bg-black border border-neutral-800 overflow-hidden">
                <video
                  src={currentItem.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="relative w-full max-h-[75vh] h-[75vh] flex items-center justify-center">
                <Image
                  src={currentItem.url}
                  alt={currentItem.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            )}

            {/* Media Caption */}
            <div className="w-full mt-4 flex items-center justify-between text-white border-t border-neutral-800 pt-3">
              <div>
                <span className="text-xs font-mono uppercase text-dk-yellow mr-3">
                  {currentItem.category}
                </span>
                <span className="text-sm font-heading font-bold uppercase">
                  {currentItem.title}
                </span>
                {currentItem.description && (
                  <p className="text-xs text-neutral-400 mt-1">
                    {currentItem.description}
                  </p>
                )}
              </div>
              <span className="text-xs font-mono text-neutral-500">
                {activeItemIndex! + 1} / {displayItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
