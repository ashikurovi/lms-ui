"use client";

import React from "react";
import Link from "next/link";
import ScrollReveal from "@/components/common/ScrollReveal";
import { ArrowRight, CheckCircle2, ShieldCheck, Building2 } from "lucide-react";

export default function HeroSection() {
  const disciplines = [
    "Architecture",
    "Structure",
    "Mechanical (HVAC)",
    "Electrical",
    "Plumbing",
    "Fire Protection",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#06182c] via-[#092444] to-[#0c2f57] text-white pt-14 pb-28 sm:pt-20 sm:pb-36 lg:pt-24 lg:pb-44 border-b border-[#143962]">
      {/* 1. Subtle CAD Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1440 850"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="heroCadGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#38BDF8" strokeWidth="0.4" opacity="0.35" />
              <circle cx="60" cy="60" r="1" fill="#38BDF8" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="1440" height="850" fill="url(#heroCadGrid)" />

          {/* Architectural Coordinate Lines */}
          <g stroke="#38BDF8" strokeWidth="0.8" opacity="0.45">
            <line x1="80" y1="120" x2="680" y2="120" strokeDasharray="6 4" />
            <line x1="80" y1="120" x2="80" y2="600" strokeDasharray="6 4" />
            <circle cx="80" cy="120" r="4" fill="none" strokeWidth="1.2" />
            <text x="95" y="115" fill="#7DD3FC" fontSize="11" fontFamily="monospace">GRID AXIS A-1</text>
            <text x="95" y="590" fill="#7DD3FC" fontSize="11" fontFamily="monospace">ELEVATION +42.000m</text>
          </g>
        </svg>
      </div>

      {/* 2. Architectural High-Rise Wireframe Skyline on Right (Exact match to reference screenshot) */}
      <div className="absolute right-0 bottom-0 top-0 w-full lg:w-1/2 pointer-events-none overflow-hidden opacity-35 sm:opacity-45 lg:opacity-60 flex items-end justify-end">
        <svg
          className="w-full max-w-[780px] h-[92%] object-contain object-right-bottom"
          viewBox="0 0 780 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skylineGrad" x1="0" y1="0" x2="0" y2="640" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#60A5FA" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0C2F57" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Secondary background high-rises */}
          <g stroke="#38BDF8" strokeWidth="0.9" opacity="0.35">
            <rect x="180" y="200" width="120" height="440" fill="none" />
            {Array.from({ length: 14 }).map((_, i) => (
              <line key={`bg-h1-${i}`} x1="180" y1={230 + i * 28} x2="300" y2={230 + i * 28} />
            ))}
            <rect x="620" y="240" width="130" height="400" fill="none" />
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`bg-h2-${i}`} x1="620" y1={270 + i * 30} x2="750" y2={270 + i * 30} />
            ))}
          </g>

          {/* Center-Right Dominant BIM Skyscraper */}
          <g stroke="#60A5FA" strokeWidth="1.5" opacity="0.9">
            <rect x="340" y="80" width="200" height="560" fill="url(#skylineGrad)" />
            {/* Setback Crown */}
            <polygon points="340,80 375,30 505,30 540,80" fill="none" strokeWidth="1.8" stroke="#93C5FD" />
            <line x1="440" y1="30" x2="440" y2="5" stroke="#93C5FD" strokeWidth="2.2" />
            <circle cx="440" cy="5" r="3" fill="#BAE6FD" />

            {/* Vertical Mullion Lines */}
            <line x1="380" y1="80" x2="380" y2="640" strokeWidth="1" opacity="0.75" />
            <line x1="420" y1="80" x2="420" y2="640" strokeWidth="1" opacity="0.75" />
            <line x1="460" y1="80" x2="460" y2="640" strokeWidth="1" opacity="0.75" />
            <line x1="500" y1="80" x2="500" y2="640" strokeWidth="1" opacity="0.75" />

            {/* Horizontal Floor Plates */}
            {Array.from({ length: 22 }).map((_, i) => (
              <line
                key={`fl-${i}`}
                x1="340"
                y1={105 + i * 24}
                x2="540"
                y2={105 + i * 24}
                strokeWidth={i % 4 === 0 ? "1.8" : "0.9"}
                opacity={i % 4 === 0 ? "0.95" : "0.55"}
              />
            ))}
          </g>

          {/* Isometric Angled Tower on the Far Right */}
          <g stroke="#93C5FD" strokeWidth="1.4" opacity="0.8">
            <polygon points="560,190 640,140 730,180 650,230" fill="none" strokeWidth="1.8" />
            <line x1="560" y1="190" x2="560" y2="640" strokeWidth="1.8" />
            <line x1="650" y1="230" x2="650" y2="640" strokeWidth="1.8" />
            <line x1="730" y1="180" x2="730" y2="640" strokeWidth="1.8" />
            {Array.from({ length: 16 }).map((_, i) => (
              <g key={`iso-${i}`} opacity="0.6">
                <line x1="560" y1={220 + i * 26} x2="650" y2={260 + i * 26} />
                <line x1="650" y1={260 + i * 26} x2="730" y2={210 + i * 26} />
              </g>
            ))}
          </g>

          {/* Foreground Low-Rise Wing */}
          <g stroke="#BAE6FD" strokeWidth="1.5" opacity="0.7">
            <rect x="230" y="340" width="160" height="300" fill="none" />
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`mid-${i}`} x1="230" y1={370 + i * 28} x2="390" y2={370 + i * 28} />
            ))}
          </g>
        </svg>
      </div>

      {/* 3. Main Hero Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 w-full">
        <div className="max-w-3xl space-y-7">
          
          {/* Subtle Top Pill Badge */}
          <ScrollReveal direction="up" delay={50} duration={500}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sky-200 text-xs font-semibold tracking-wider uppercase">
              <Building2 className="w-3.5 h-3.5 text-sky-300" />
              <span>International BIM Standards (LOD 100 - 500)</span>
            </div>
          </ScrollReveal>

          {/* Main Headline - High-End Architectural Sans/Serif Look */}
          <ScrollReveal direction="up" delay={120} duration={600}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-white tracking-tight leading-[1.15]">
              Building Information Modeling Services & Professional Training
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={180} duration={600}>
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
              Partner with us for your building information modeling, 2D/3D visualization, clash detection, and engineering workforce training.
            </p>
          </ScrollReveal>

          {/* Discipline Bullet Grid (Exact match to reference screenshot structure) */}
          <ScrollReveal direction="up" delay={240} duration={600}>
            <div className="space-y-3 pt-1">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-300">
                Core Engineering Disciplines:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2.5 text-sm sm:text-base text-slate-100 font-medium">
                {disciplines.map((d) => (
                  <div key={d} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* CTA Buttons - Matching Reference Screenshot */}
          <ScrollReveal direction="up" delay={300} duration={600}>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#072244] font-extrabold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
              >
                <span>Explore Specialized Courses</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/25 backdrop-blur-md transition-all duration-200"
              >
                <span>Get a Free Consultation</span>
              </Link>
            </div>
          </ScrollReveal>

          {/* Trust Highlights */}
          <ScrollReveal direction="up" delay={360} duration={600}>
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300 font-medium border-t border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Authorized Certification</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Real-World Commercial Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Expert Mentors with 10+ Years Experience</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
