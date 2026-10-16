"use client";

import React from "react";
import ScrollReveal from "@/components/common/ScrollReveal";
import {
  Compass,
  HardHat,
  Building2,
  Home,
  Briefcase,
  Factory,
  Building,
  Wrench,
  Store,
  Boxes,
  Landmark,
  Layers,
} from "lucide-react";

export default function IndustriesSection() {
  const industries = [
    { title: "Architecture", icon: <Compass className="w-6 h-6 text-white stroke-[1.8]" /> },
    { title: "Engineering", icon: <HardHat className="w-6 h-6 text-white stroke-[1.8]" /> },
    { title: "Construction", icon: <Building2 className="w-6 h-6 text-white stroke-[1.8]" /> },
    { title: "Interior Design", icon: <Home className="w-6 h-6 text-white stroke-[1.8]" /> },
    { title: "Real Estate", icon: <Landmark className="w-6 h-6 text-white stroke-[1.8]" /> },
    { title: "Manufacturing", icon: <Factory className="w-6 h-6 text-white stroke-[1.8]" /> },
    { title: "Corporate", icon: <Briefcase className="w-6 h-6 text-white stroke-[1.8]" /> },
    { title: "Commercial", icon: <Building className="w-6 h-6 text-white stroke-[1.8]" /> },
    { title: "Infrastructure", icon: <Layers className="w-6 h-6 text-white stroke-[1.8]" /> },
    { title: "Facility Management", icon: <Wrench className="w-6 h-6 text-white stroke-[1.8]" /> },
    { title: "Industrial", icon: <Boxes className="w-6 h-6 text-white stroke-[1.8]" /> },
    { title: "Retail & Leisure", icon: <Store className="w-6 h-6 text-white stroke-[1.8]" /> },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white font-sans border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        
        {/* Section Header matching Reference Screenshot */}
        <ScrollReveal direction="up" duration={500} className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-[#0077b6] text-xs font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#0077b6]" />
            <span>Market Sectors</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#0B2B56] tracking-tight">
            Industries We Serve
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Delivering multidisciplinary BIM workflows, drafting expertise, and certified talent across diverse sectors.
          </p>
        </ScrollReveal>

        {/* 12 Dark Rounded Cards (2 rows of 6 on desktop, exact match to screenshot) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {industries.map((item, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              delay={idx * 40}
              duration={450}
              className="bg-[#092240] hover:bg-[#0c2f57] border border-[#143d6b] rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-sky-400 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                {item.title}
              </span>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
