"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function TeklaBanner() {
  return (
    <section className="pt-6 sm:pt-8 pb-16 sm:pb-20 bg-white font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <ScrollReveal direction="up" duration={500} className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#0077b6] text-xs font-bold tracking-wider uppercase shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0077b6]" />
            <span>Specialized Structural Masterclass</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0B2B56] tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0077b6] to-sky-500">Tekla Structure</span> Course
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={150} duration={650}>
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200/80 group">
            <div className="p-8 sm:p-12 lg:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
              <div className="text-left space-y-4">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-400">
                  Tekla Structures
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
                  PROFESSIONAL STEEL DETAILING COURSE
                </h3>
                <p className="text-sm sm:text-base text-slate-300">
                  By Tekla Software • Instructor: Engr. Maidul
                </p>
                <div className="pt-2">
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B2B56] font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  >
                    <span>Enroll Tekla Course</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-60 lg:h-60 rounded-2xl overflow-hidden border-2 border-sky-400/40 shrink-0 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80"
                  alt="Tekla Instructor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#002b5b] via-[#0f4c81] to-slate-900 opacity-95" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
