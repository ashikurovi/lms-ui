"use client";

import React from "react";
import { Users, Maximize2 } from "lucide-react";

export interface BatchItem {
  id?: string;
  title: string;
  subtitle?: string;
  image?: string;
  hasImage?: boolean;
}

interface BatchGallerySectionProps {
  batches: BatchItem[];
  onSelectBatch?: (batch: BatchItem) => void;
}

export default function BatchGallerySection({
  batches,
  onSelectBatch,
}: BatchGallerySectionProps) {
  if (!batches || batches.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="text-left">
        <h2 className="text-xl sm:text-2xl font-black text-[#002b5b] tracking-tight">
          Student Batch{" "}
          <span className="relative inline-block">
            <span className="text-[#0f4c81]">Gallery</span>
            <svg
              className="w-full h-3 text-[#0077b6] absolute -bottom-1.5 left-0"
              viewBox="0 0 100 12"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8C25 2 75 2 98 9"
                stroke="#0077b6"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {batches.map((batch, index) => (
          <div
            key={batch.id || index}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col hover:-translate-y-1"
          >
            <div
              onClick={() => batch.hasImage && onSelectBatch && onSelectBatch(batch)}
              className={`relative aspect-[16/10] w-full bg-slate-900 overflow-hidden flex items-center justify-center ${
                batch.hasImage ? "cursor-pointer" : ""
              }`}
            >
              {batch.hasImage && batch.image ? (
                <>
                  <img
                    src={batch.image}
                    alt={batch.title}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 text-slate-900 font-bold text-xs shadow-lg backdrop-blur-xs">
                      <Maximize2 className="w-3.5 h-3.5 text-[#0077b6]" />
                      View Photo
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center text-slate-300 group-hover:text-[#0077b6] transition-colors">
                  <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-dashed border-slate-700 flex items-center justify-center mb-3">
                    <Users className="w-8 h-8 opacity-40 text-slate-300" />
                  </div>
                  <span className="text-xs font-semibold tracking-wide uppercase text-slate-400">
                    Upcoming Batch
                  </span>
                </div>
              )}
            </div>

            <div className="p-5 sm:p-6 text-center space-y-1.5 flex-1 flex flex-col justify-center">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#0077b6] transition-colors">
                {batch.title}
              </h3>
              {batch.subtitle && (
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
                  {batch.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
