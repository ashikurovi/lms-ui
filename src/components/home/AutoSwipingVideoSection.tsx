"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import ScrollReveal from "@/components/common/ScrollReveal";
import VideoModal from "@/components/common/VideoModal";
import {
  Play,
  Clock,
  ChevronLeft,
  ChevronRight,
  Video,
  ExternalLink,
} from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  category: string;
  software: string;
  duration: string;
  instructor: string;
  thumbnail: string;
  videoUrl: string;
  tag: string;
}

const FEATURED_VIDEOS: VideoItem[] = [
  {
    id: "v-1",
    title: "High-Rise Commercial Building BIM Modeling & Coordination",
    category: "Masterclass Demonstration",
    software: "Revit Architecture & Structure",
    duration: "48:20",
    instructor: "Engr. Maidul Islam • Lead BIM Specialist",
    thumbnail:
      "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tag: "LOD 400 Project",
  },
  {
    id: "v-2",
    title: "Multi-Discipline Clash Detection & Matrix Coordination in Navisworks",
    category: "Live Class Recording",
    software: "Navisworks • Revit MEP",
    duration: "36:15",
    instructor: "Souvik Karmakar • Senior BIM Coordinator",
    thumbnail:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tag: "Clash Matrix",
  },
  {
    id: "v-3",
    title: "Tekla Structures: Parametric Steel Connection Detailing & Rebar",
    category: "Technical Workshop",
    software: "Tekla Structures 2024",
    duration: "52:40",
    instructor: "Engr. Maidul • Steel Detailing Expert",
    thumbnail:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tag: "Steel Detailing",
  },
  {
    id: "v-4",
    title: "MEPF Mechanical HVAC Duct Routing & Firefighting Sprinkler Layout",
    category: "Live Session Demo",
    software: "Revit MEP & Dynamo",
    duration: "41:10",
    instructor: "Md. Ariful Haque • Senior MEP Engineer",
    thumbnail:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tag: "MEPF Systems",
  },
  {
    id: "v-5",
    title: "Automated Sheet Generation, Construction Documentation & Quantities",
    category: "Practical BIM Lecture",
    software: "Autodesk Revit & AutoCAD",
    duration: "39:50",
    instructor: "Tanvir Ahmed • Architectural Visualizer",
    thumbnail:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tag: "Documentation",
  },
];

export default function AutoSwipingVideoSection() {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const N = FEATURED_VIDEOS.length;
  // 5x duplication buffer to ensure infinite seamless scrolling without ever hitting edge or rewinding
  const extendedVideos = [
    ...FEATURED_VIDEOS,
    ...FEATURED_VIDEOS,
    ...FEATURED_VIDEOS,
    ...FEATURED_VIDEOS,
    ...FEATURED_VIDEOS,
  ];

  // Start in the middle copy (copy 2: index 2 * N)
  const [currentIndex, setCurrentIndex] = useState(2 * N);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Responsive items count calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // When transition is disabled for seamless instantaneous reset, re-enable on next frame
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  // Guaranteed bounds reset: runs unconditionally after slide finishes (400ms)
  // Ensures cards never slide past buffer even if browser drops transitionend
  useEffect(() => {
    if (currentIndex >= 3 * N || currentIndex < 2 * N) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prev) => {
          if (prev >= 3 * N) return 2 * N + ((prev - 3 * N) % N);
          if (prev < 2 * N) return 2 * N + ((prev - 2 * N + N * 10) % N);
          return prev;
        });
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, N]);

  // Event-based snap for instant seamless response
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;

    if (currentIndex >= 3 * N) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => 2 * N + ((prev - 3 * N) % N));
    } else if (currentIndex < 2 * N) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => 2 * N + ((prev - 2 * N + N * 10) % N));
    }
  };

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Automatic Swiping Timer (Advances continuously every 3.5 seconds forward)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  const activeDot = currentIndex % N;

  const goToDot = (dotIdx: number) => {
    setIsTransitioning(true);
    const currentBase = Math.floor(currentIndex / N) * N;
    setCurrentIndex(currentBase + dotIdx);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#f4f7fb] font-sans border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <ScrollReveal direction="up" duration={500} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-slate-200/80">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-[#0077b6] text-xs font-bold tracking-wider uppercase">
              <Video className="w-3.5 h-3.5 text-[#0077b6]" />
              <span>Interactive Video Lectures</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#0B2B56] tracking-tight">
              Featured Live BIM Walkthroughs
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal">
              Watch real project modeling sessions, clash resolution demos, and technical masterclasses from our certified instructors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Auto-Swiping Nav Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-xl bg-white border border-slate-200 hover:border-sky-400 hover:text-[#0077b6] text-slate-700 flex items-center justify-center shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-xl bg-white border border-slate-200 hover:border-sky-400 hover:text-[#0077b6] text-slate-700 flex items-center justify-center shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
                aria-label="Next video"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#0B2B56] text-[#0B2B56] hover:bg-[#0B2B56] hover:text-white text-xs sm:text-sm font-bold transition-all duration-200"
            >
              <span>YouTube Channel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>

        {/* Seamless Infinite Carousel Track Container */}
        <div
          className="relative overflow-hidden py-2 -my-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            onTransitionEnd={handleTransitionEnd}
            className="flex"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              transition: isTransitioning
                ? "transform 320ms ease-out"
                : "none",
            }}
          >
            {extendedVideos.map((video, idx) => (
              <div
                key={`${video.id}-${idx}`}
                className="shrink-0 px-3 sm:px-3.5"
                style={{
                  width: `${100 / visibleCount}%`,
                }}
              >
                <div
                  onClick={() => setActiveVideoUrl(video.videoUrl)}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 cursor-pointer h-full"
                >
                  {/* Cinematic 16:9 Thumbnail with Overlay */}
                  <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-80"
                    />

                    {/* Gradient Shade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30" />

                    {/* Software Badge on Top Left */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-3 py-1 rounded-lg bg-[#072244]/90 backdrop-blur-md text-white text-[11px] font-bold tracking-wider uppercase border border-sky-400/30 shadow-md">
                        {video.software}
                      </span>
                    </div>

                    {/* Duration Badge on Top Right */}
                    <div className="absolute top-3.5 right-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10 shadow-sm">
                        <Clock className="w-3 h-3 text-sky-300" />
                        <span>{video.duration}</span>
                      </span>
                    </div>

                    {/* Large Glowing Play Button in Center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative flex items-center justify-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:bg-red-500 group-hover:scale-110 transition-all duration-300 pl-1 ring-4 ring-white/30">
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Tag */}
                    <div className="absolute bottom-3 left-3.5">
                      <span className="text-[11px] font-mono font-bold text-sky-200 uppercase tracking-widest drop-shadow">
                        {video.tag}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0077b6]">
                        {video.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[#0B2B56] group-hover:text-[#0077b6] transition-colors line-clamp-2 leading-snug">
                        {video.title}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-500 truncate max-w-[200px]">
                        {video.instructor}
                      </span>
                      <span className="font-bold text-[#0077b6] group-hover:underline flex items-center gap-1 shrink-0">
                        <span>Watch Demo</span>
                        <Play className="w-3 h-3 fill-current" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {FEATURED_VIDEOS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => goToDot(dotIdx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeDot === dotIdx
                  ? "w-8 bg-[#0077b6]"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Video Modal Player */}
      <VideoModal
        videoUrl={activeVideoUrl}
        onClose={() => setActiveVideoUrl(null)}
      />
    </section>
  );
}
