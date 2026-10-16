"use client";

import React from "react";
import ScrollReveal from "@/components/common/ScrollReveal";
import { FileSearch, Layers, CheckSquare, Send } from "lucide-react";

export default function HowWeWorkSection() {
  const steps = [
    {
      stepNumber: "01",
      title: "Requirement Analysis",
      desc: "Reviewing architectural drawings, engineering design briefs, modeling standards, and client deliverables.",
      icon: <FileSearch className="w-8 h-8 text-[#0077b6] stroke-[1.8]" />,
    },
    {
      stepNumber: "02",
      title: "Modeling & Drafting",
      desc: "Developing accurate 3D parametric BIM geometry, customized families, and integrated multi-trade models.",
      icon: <Layers className="w-8 h-8 text-[#0077b6] stroke-[1.8]" />,
    },
    {
      stepNumber: "03",
      title: "Quality Check",
      desc: "Conducting automated clash detection, LOD verification, sheet extraction audits, and structural code compliance.",
      icon: <CheckSquare className="w-8 h-8 text-[#0077b6] stroke-[1.8]" />,
    },
    {
      stepNumber: "04",
      title: "Delivery & Support",
      desc: "Delivering coordinated IFC/RVT models, construction documentation, schedules, and ongoing mentor assistance.",
      icon: <Send className="w-8 h-8 text-[#0077b6] stroke-[1.8]" />,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#06182c] via-[#082240] to-[#0a2b50] py-20 lg:py-28 text-white font-sans border-b border-[#13375e]">
      {/* Subtle CAD Blueprint Lattice Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="workGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#38BDF8" strokeWidth="0.5" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="1440" height="600" fill="url(#workGrid)" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 space-y-12 lg:space-y-16">
        
        {/* Section Header matching Reference Screenshot */}
        <ScrollReveal direction="up" duration={500} className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sky-200 text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>Workflow & Methodology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-white tracking-tight">
            How We Work
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            A structured engineering workflow ensuring precision modeling, complete clash elimination, and smooth project execution from concept to delivery.
          </p>
        </ScrollReveal>

        {/* 4 White Floating Process Cards (Exact Match to Reference Screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              delay={idx * 90}
              duration={550}
              className="bg-white rounded-2xl p-7 text-slate-800 shadow-xl border border-slate-100 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Top Row: Icon + Step Number */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-xl bg-sky-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <span className="text-3xl font-black text-slate-200 group-hover:text-sky-200 transition-colors font-mono">
                  {step.stepNumber}
                </span>
              </div>

              {/* Step Title & Description */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black text-[#0B2B56] group-hover:text-[#0077b6] transition-colors tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              {/* Bottom Subtle Accent Bar on Hover */}
              <div className="h-1 w-full bg-[#0077b6] rounded-full mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
