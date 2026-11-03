"use client";

import React, { useState, useEffect } from "react";
import { Play, Video, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";
import VideoModal from "@/components/common/VideoModal";
import { walkthroughsApi, WalkthroughItem } from "@/services/api";

function formatVideoEmbedUrl(url: string): string {
  if (!url) return "";
  if (url.includes("youtube.com/embed/")) return url;
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }
  return url;
}

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  return match && match[1] ? match[1] : null;
}

function getFallbackThumbnail(videoUrl: string): string {
  const ytId = extractYouTubeId(videoUrl);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  return "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80";
}

export default function FeaturedWalkthroughsSection() {
  const [walkthroughs, setWalkthroughs] = useState<WalkthroughItem[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalkthroughs = async () => {
      try {
        const res = await walkthroughsApi.getAllWalkthroughs();
        if ((res.statusCode === 200 || res.statusCode === 201) && Array.isArray(res.data)) {
          const activeOnly = res.data.filter((item) => item.isActive !== false);
          setWalkthroughs(activeOnly);
        } else {
          setWalkthroughs([]);
        }
      } catch (err) {
        console.error("Failed to load walkthroughs from API:", err);
        setWalkthroughs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWalkthroughs();
  }, []);

  // If still loading or no walkthroughs exist in the API, do not render this section
  if (loading || walkthroughs.length === 0) {
    return null;
  }

  const handlePlay = (url: string) => {
    setActiveVideo(formatVideoEmbedUrl(url));
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-sky-50/30 to-white font-sans border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={500} className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#0077b6] text-xs font-bold tracking-wider uppercase shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0077b6] animate-pulse" />
            <span>Featured Live BIM Walkthroughs</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0B2B56] tracking-tight">
            Featured Live{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0077b6] to-sky-500">
              BIM Walkthroughs
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Watch hands-on project walkthroughs, live model inspections, and clash coordination breakdowns conducted by industry-leading BIM consultants.
          </p>
        </ScrollReveal>

        {/* 3-Column Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {walkthroughs.map((item, idx) => {
            const thumb = item.thumbnail || getFallbackThumbnail(item.videoUrl);

            return (
              <ScrollReveal
                key={item.id || idx}
                direction="up"
                delay={(idx % 3) * 100}
                duration={550}
                className="h-full"
              >
                <div
                  onClick={() => handlePlay(item.videoUrl)}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 cursor-pointer h-full"
                >
                  {/* Video Thumbnail with Play Button */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950">
                    <img
                      src={thumb}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80";
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />

                    {/* Floating Live / BIM Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0B2B56]/90 backdrop-blur-md text-white font-black text-[11px] tracking-wider uppercase shadow-md border border-white/10">
                        <Video className="w-3.5 h-3.5 text-sky-400" />
                        <span>Live Walkthrough</span>
                      </span>
                    </div>

                    {/* Centered Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-rose-600/95 text-white flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-rose-600 transition-all duration-300 pl-0.5 ring-4 ring-white/20">
                        <Play className="w-6 h-6 fill-current" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content & Details */}
                  <div className="pt-5 px-1 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-black text-[#0B2B56] group-hover:text-[#0077b6] transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs sm:text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Card Footer with Watch Action */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-slate-600 group-hover:text-[#0077b6] transition-colors">
                        Watch Live Walkthrough
                      </span>
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0B2B56] text-white group-hover:bg-[#0077b6] text-xs font-bold transition-all duration-200 shadow-xs">
                        <span>Play</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Embedded Video Modal */}
      <VideoModal
        videoUrl={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}
