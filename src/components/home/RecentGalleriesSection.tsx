"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { galleriesApi } from "@/services/api";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function RecentGalleriesSection() {
  const [recentGalleries, setRecentGalleries] = useState<any[]>([]);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const res = await galleriesApi.getAllGalleries();
        if ((res.statusCode === 200 || res.statusCode === 201) && res.data) {
          // Take top 3 for the landing page
          setRecentGalleries(res.data.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch galleries", err);
      }
    };
    fetchGalleries();
  }, []);

  if (recentGalleries.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-white font-sans border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        <ScrollReveal direction="up" duration={500} className="text-center pb-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002b5b] tracking-tight">
            Our Gallery
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {recentGalleries.map((gallery, idx) => (
            <ScrollReveal
              key={gallery.id}
              direction="up"
              delay={(idx % 3) * 100}
              duration={550}
              className="h-full"
            >
              <div
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 h-full"
              >
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={gallery.imageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"}
                    alt={gallery.title}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="pt-4 px-1 flex flex-col justify-between flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#002b5b] group-hover:text-[#0077b6] transition-colors line-clamp-2 leading-snug">
                    {gallery.title}
                  </h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
