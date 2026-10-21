"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Film,
  Sparkles,
  ArrowRight,
  Layers,
} from "lucide-react";
import { MediaItem } from "@/types";
import { FadeUp } from "@/components/ui/Motion";

interface HomeVideoSectionProps {
  videos?: MediaItem[];
}

export function HomeVideoSection({ videos = [] }: HomeVideoSectionProps) {
  // Filter for valid video items, or fallback to sensible defaults
  const validVideos = videos.filter((v) => v.type === "video");

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = validVideos[activeIndex] || validVideos[0];

  // Helper to determine if video is a YouTube or Vimeo embed link
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]+)/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[1]}`;
    }
    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1`;
    }
    return null;
  };

  const embedUrl = currentVideo ? getEmbedUrl(currentVideo.url) : null;

  // Reset playback when active video changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = isMuted;
      // Auto play muted on switch
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [activeIndex, isMuted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  if (validVideos.length === 0) {
    return null; // Gracefully omit if no videos configured
  }

  return (
    <section className="relative bg-neutral-950 text-white py-24 sm:py-36 border-t border-white/[0.08] overflow-hidden">
      {/* Subtle ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-dk-yellow/[0.03] blur-[150px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <FadeUp>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-dk-yellow mb-3">
                <Film className="w-3.5 h-3.5" />
                <span>DKDC CINEMATIC ARCHIVE // VIDEO SHOWCASE</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-light uppercase tracking-tight text-white">
                Energy In Rhythm. <br />
                <span className="text-neutral-400">Choreography In Motion.</span>
              </h2>
            </FadeUp>
          </div>

          <FadeUp delay={0.15}>
            <div className="flex items-center gap-3">
              <Link
                href="/classes"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-dk-yellow font-heading font-light text-xs uppercase tracking-widest transition-all duration-300 active:scale-95"
              >
                <span>Join Company</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-widest transition-all duration-300"
              >
                <span>Full Archive</span>
              </Link>
            </div>
          </FadeUp>
        </div>

        {/* Main Video Theater Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Cinema Player: 8 Columns */}
          <div className="lg:col-span-8 group relative rounded-3xl overflow-hidden bg-black border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)] aspect-video flex items-center justify-center">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={currentVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={currentVideo.url}
                  poster={currentVideo.thumbnailUrl}
                  loop
                  playsInline
                  muted={isMuted}
                  onClick={togglePlay}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-cover cursor-pointer"
                />

                {/* Big Center Play Overlay (when paused) */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    aria-label="Play video"
                    className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-dk-yellow hover:scale-110 hover:border-dk-yellow/50 transition-all duration-300 z-20 shadow-2xl"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button>
                )}

                {/* Bottom Custom Control Bar */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between gap-4 z-20 opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause" : "Play"}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                    <div className="hidden sm:block">
                      <span className="text-[10px] font-mono text-dk-yellow uppercase tracking-wider block">
                        {currentVideo.category}
                      </span>
                      <h4 className="text-xs font-heading font-light uppercase tracking-wider text-white truncate max-w-xs">
                        {currentVideo.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentVideo.duration && (
                      <span className="text-[11px] font-mono text-neutral-300 bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                        {currentVideo.duration}
                      </span>
                    )}
                    <button
                      onClick={handleFullScreen}
                      aria-label="Fullscreen"
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Top Badge Overlay */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-widest text-dk-yellow">
                <span className="w-2 h-2 rounded-full bg-dk-red animate-pulse" />
                <span>Featured Performance Reel</span>
              </span>
            </div>
          </div>

          {/* Video Playlist / Reel Selector: 4 Columns */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-dk-yellow" />
                <span>Select Routine ({validVideos.length})</span>
              </span>
              <span className="text-[10px] font-mono text-neutral-500 uppercase">
                Director&apos;s Cut
              </span>
            </div>

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-800">
              {validVideos.map((video, idx) => {
                const isActive = idx === activeIndex;
                const thumb = video.thumbnailUrl || "/images/styles/contemporary.jpg";

                return (
                  <button
                    key={video._id || `vid_${idx}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 group relative ${
                      isActive
                        ? "bg-white/[0.08] border-dk-yellow/60 shadow-[0_0_25px_rgba(255,215,0,0.1)]"
                        : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/20"
                    }`}
                  >
                    {/* Thumbnail Preview */}
                    <div className="relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-white/10">
                      <Image
                        src={thumb}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="96px"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            isActive
                              ? "bg-dk-yellow text-black scale-110"
                              : "bg-white/80 text-black group-hover:scale-110"
                          }`}
                        >
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-dk-yellow truncate">
                          {video.category}
                        </span>
                        {video.duration && (
                          <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                            {video.duration}
                          </span>
                        )}
                      </div>
                      <h4
                        className={`text-xs font-heading font-light uppercase tracking-wide truncate ${
                          isActive ? "text-white font-normal" : "text-neutral-300 group-hover:text-white"
                        }`}
                      >
                        {video.title}
                      </h4>
                      {video.description && (
                        <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5 font-light">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Note / Caption below playlist */}
            <div className="p-4 rounded-2xl bg-neutral-900/50 border border-white/[0.06] text-[11px] text-neutral-400 font-light flex items-start gap-2.5">
              <Sparkles className="w-3.5 h-3.5 text-dk-yellow shrink-0 mt-0.5" />
              <span>
                All stage routines and concept reels are directed and choreographed by Dhanesh Krishnan. Certified syllabus trained across 5 Kerala branches and Bournemouth, UK.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
