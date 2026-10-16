"use client";

import React from "react";
import Link from "next/link";
import ScrollReveal from "@/components/common/ScrollReveal";
import { ArrowRight, CheckCircle2, Layers, Cpu, ShieldCheck } from "lucide-react";

export default function ArchitectingSuccessSection() {
  const highlights = [
    {
      title: "Clash-Free Multidisciplinary Coordination",
      desc: "Eliminate on-site rework by coordinating Architectural, Structural, and MEPF trades into a unified 3D BIM model before construction.",
    },
    {
      title: "Parametric LOD 100 to 500 Workflows",
      desc: "Develop intelligent parametric models tailored from conceptual design to fabrication, shop drawings, and facility management.",
    },
    {
      title: "Industry-Standard Drawing Sheet Automation",
      desc: "Generate accurate floor plans, structural schedules, rebar quantities, and shop drawings directly from BIM geometry.",
    },
  ];

  return (
    <section className="pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-28 bg-white font-sans border-b border-slate-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Architectural Dual-Style Render / BIM Digital Twin Visual */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal direction="right" duration={600}>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-slate-900 group">
                
                {/* Architectural Building Image */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                    alt="BIM Digital Twin Building"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* High-Tech Digital Twin / Wireframe Overlay across the right half (Exact match to reference photo) */}
                  <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-transparent via-[#092c52]/80 to-[#061e38]/95 backdrop-blur-[1px] flex items-center justify-center p-4">
                    <svg
                      className="w-full h-full opacity-70"
                      viewBox="0 0 300 360"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Grid & BIM Mullion Lines */}
                      <g stroke="#38BDF8" strokeWidth="1.2">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <line key={`wl-${i}`} x1="10" y1={30 + i * 28} x2="290" y2={30 + i * 28} strokeDasharray={i % 3 === 0 ? "none" : "4 3"} />
                        ))}
                        <line x1="60" y1="20" x2="60" y2="350" strokeWidth="1.5" />
                        <line x1="140" y1="20" x2="140" y2="350" strokeWidth="1.5" />
                        <line x1="220" y1="20" x2="220" y2="350" strokeWidth="1.5" />
                        
                        {/* Diagonal Structural Bracing */}
                        <line x1="60" y1="86" x2="140" y2="142" stroke="#60A5FA" strokeWidth="1.5" />
                        <line x1="140" y1="86" x2="60" y2="142" stroke="#60A5FA" strokeWidth="1.5" />
                        <line x1="140" y1="142" x2="220" y2="198" stroke="#60A5FA" strokeWidth="1.5" />
                        <line x1="220" y1="142" x2="140" y2="198" stroke="#60A5FA" strokeWidth="1.5" />
                      </g>
                    </svg>
                  </div>

                  {/* Architectural Dimension Callouts on the image */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-lg bg-[#072244]/90 backdrop-blur-md text-white text-[11px] font-mono font-bold tracking-wider border border-sky-400/30 shadow-lg">
                      LOD 400 BIM MODEL
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1.5 rounded-lg bg-sky-600/90 backdrop-blur-md text-white text-[11px] font-mono font-bold tracking-wider shadow-lg">
                      DIGITAL TWIN V.3
                    </span>
                  </div>
                </div>

                {/* Bottom Architectural Info Strip */}
                <div className="bg-[#071E36] px-5 py-3 border-t border-sky-900/50 flex items-center justify-between text-xs text-slate-300 font-mono">
                  <span className="flex items-center gap-1.5 text-sky-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    CLASH RESOLUTION: 100%
                  </span>
                  <span>ELEV: +148.500m</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Architectural Content Description */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="left" duration={600}>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#0077b6] text-xs font-bold tracking-wider uppercase shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#0077b6]" />
                  <span>Engineering Precision</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#0B2B56] tracking-tight leading-tight">
                  Architecting Success in the Digital Age
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Building Information Modeling (BIM) has fundamentally redefined modern architecture, civil engineering, and construction. By combining intelligent parametric 3D models with comprehensive engineering data, we enable AEC professionals and students to eliminate costly site errors, optimize material takeoff, and accelerate project timelines.
                </p>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Our comprehensive curriculum and industry-grade modeling services bridge the gap between architectural vision, structural calculation, and MEPF MEP systems coordination according to global standards.
                </p>
              </div>

              {/* 3 Value Pillars */}
              <div className="space-y-4 pt-2">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-sky-100 text-[#0077b6] shrink-0 mt-0.5 flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#0B2B56]">
                        {h.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-0.5">
                        {h.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Link */}
              <div className="pt-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B2B56] hover:bg-[#0077b6] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-xl transition-all duration-200 group"
                >
                  <span>Explore Courses & Certification</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
