"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, CheckSquare, ArrowRight } from "lucide-react";
import HeroShowcaseCard from "./HeroShowcaseCard";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f4f8fb] py-14 sm:py-18 lg:py-20 xl:py-24 flex items-center">
      {/* Background Architectural Photo with Luxury Blueprint Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Modern Architectural Infrastructure Background"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-30 filter contrast-105"
        />
        {/* Architectural Light Gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8fb] via-[#f4f8fb]/80 to-[#f4f8fb]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f8fb] via-transparent to-[#f4f8fb]/60" />
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1440 650" fill="none">
          <circle cx="1180" cy="360" r="300" stroke="#0077b6" strokeWidth="1.5" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, Checkmarks, Buttons */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            {/* Main Headline with Locked Elements */}
            <ScrollReveal direction="up" delay={50} duration={600}>
              <div className="space-y-1">
                {/* Row 1: Learn BIM (with cap perched exactly on I) */}
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#002b5b] tracking-tight leading-none">
                    Learn
                  </span>
                  <span className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#0077b6] tracking-tight leading-none relative inline-flex items-center">
                    B
                    <span className="relative inline-flex items-center">
                      I
                      <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-[#002b5b] absolute -top-5 sm:-top-7 left-1/2 -translate-y-1/2" />
                    </span>
                    M
                  </span>
                </div>

                {/* Row 2: Build Your Career */}
                <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#002b5b] tracking-tight leading-tight">
                  <span>Build Your </span>
                  <span className="relative inline-block">
                    <span className="text-[#0f4c81]">Career</span>
                    <svg
                      className="w-full h-3 sm:h-4 text-[#0077b6] absolute -bottom-2 sm:-bottom-2.5 left-0"
                      viewBox="0 0 160 14"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M3 10C45 2 115 2 157 11"
                        stroke="#0077b6"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* 3 Checkmark Bullet Points */}
            <ScrollReveal direction="up" delay={150} duration={600}>
              <div className="space-y-3 pt-1 text-sm sm:text-base font-semibold text-slate-700">
                <div className="flex items-center gap-3">
                  <CheckSquare className="w-5 h-5 text-[#0077b6] shrink-0" />
                  <span>Revit Architecture | Structure | MEP</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckSquare className="w-5 h-5 text-[#0077b6] shrink-0" />
                  <span>Project-Based Training</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckSquare className="w-5 h-5 text-[#0077b6] shrink-0" />
                  <span>Freelancing & Job Placement Support</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Modern Clean CTA Buttons */}
            <ScrollReveal direction="up" delay={250} duration={600}>
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link
                  href="/courses"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
                >
                  <span>Join Our Live Courses!</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/courses"
                  className="inline-flex items-center px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#002b5b] border border-slate-200 hover:border-slate-300 font-bold text-sm sm:text-base shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
                >
                  Admission
                </Link>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column: Visual Showcase Card */}
          <ScrollReveal direction="left" delay={200} duration={700} className="lg:col-span-6 flex justify-center lg:justify-end">
            <HeroShowcaseCard />
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
