"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { portfoliosApi } from "@/services/api/portfoliosApi";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function RecentPortfolioSection() {
  const [recentProjects, setRecentProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await portfoliosApi.getAllPortfolios();
        if ((res.statusCode === 200 || res.statusCode === 201) && res.data) {
          // Take top 3 for the landing page
          setRecentProjects(res.data.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch portfolios", err);
      }
    };
    fetchPortfolios();
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-[#f8fafc] font-sans border-y border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        {/* Section Header - Highlighted & Centered */}
        <ScrollReveal direction="up" duration={500} className="text-center space-y-3 max-w-2xl mx-auto pb-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#0077b6] text-xs font-bold tracking-wider uppercase shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0077b6]" />
            <span>Featured Deliverables</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0B2B56] tracking-tight">
            Recent Projects & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0077b6] to-sky-500">Student Portfolio</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Live project models and drawings produced by our students across architecture, structural engineering, and MEP coordination.
          </p>
        </ScrollReveal>

        {/* 3-Column Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {recentProjects.map((project, idx) => (
            <ScrollReveal
              key={project.id}
              direction="up"
              delay={(idx % 3) * 100}
              duration={550}
              className="h-full"
            >
              <Link
                href="/portfolio"
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 cursor-pointer h-full"
              >
                {/* Inset Framed Image with Category & Software Tool Tags */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={project.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"}
                    alt={project.title}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Floating Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-lg bg-[#0B2B56] text-white font-extrabold text-[11px] tracking-wider uppercase shadow-md">
                      {project.category || "Project"}
                    </span>
                  </div>

                  {/* Software Tool Badge */}
                  {project.tools && (
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-white/95 text-[11px] font-semibold border border-white/10 shadow-xs">
                        {project.tools}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body & CTA */}
                <div className="pt-4 px-1 flex flex-col justify-between flex-1">
                  <h3 className="text-base sm:text-lg font-black text-[#0B2B56] group-hover:text-[#0077b6] transition-colors line-clamp-2 leading-snug">
                    {project.title}
                  </h3>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-slate-600 group-hover:text-[#0077b6] transition-colors">
                      Explore Project
                    </span>
                    <div className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#0B2B56] text-white group-hover:bg-[#0077b6] text-xs font-bold transition-all duration-200 shadow-xs">
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
