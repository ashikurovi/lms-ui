"use client";

import React, { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/common/ScrollReveal";
import { ChevronDown, ArrowRight } from "lucide-react";

const CLIENT_FAQS = [
  {
    question: "What is Building Information Modeling (BIM) and why is it essential?",
    answer:
      "BIM is an intelligent 3D model-based process that gives architecture, engineering, and construction (AEC) professionals the insight and tools to more efficiently plan, design, construct, and manage buildings and infrastructure. It reduces site conflicts, saves costs, and improves coordination.",
  },
  {
    question: "What Level of Development (LOD) do you cover in training and projects?",
    answer:
      "We cover LOD 100 (Conceptual), LOD 200 (Approximate Geometry), LOD 300/350 (Precise Geometry & Multi-Discipline Coordination), and LOD 400 (Fabrication & Detailing) for Architecture, Structure, and MEPF systems.",
  },
  {
    question: "Do I need prior experience in Revit or 3D modeling to get started?",
    answer:
      "No prior Revit experience is needed. Our courses start from core CAD foundations and progressively transition to advanced parametric modeling, clash detection, and international project deliverables.",
  },
  {
    question: "Are live classes interactive, and do we get recorded video backups?",
    answer:
      "Yes, all live batch sessions are conducted interactively with real-time screen sharing and Q&A. Complete Full HD recordings and exercise family files are available on your student dashboard within 24 hours.",
  },
  {
    question: "Is there installment support for course fees?",
    answer:
      "Yes, we offer flexible 2 to 3-month installment plans via bKash, Nagad, cards, and direct bank transfers to ensure accessible engineering education.",
  },
  {
    question: "How are certificates verified by international employers?",
    answer:
      "Each certificate comes with an encrypted unique serial number and dynamic QR code linking directly to our online public credential database for instant employer verification.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-[#f8fafc] font-sans border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Centered Section Header */}
        <ScrollReveal direction="up" duration={500} className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-[#0077b6] text-xs font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#0077b6]" />
            <span>Common Inquiries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#0B2B56] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Everything you need to know about our BIM training, syllabus, batch schedules, installment options, and certifications.
          </p>
        </ScrollReveal>

        {/* Clean Accordion List */}
        <div className="space-y-3.5">
          {CLIENT_FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <ScrollReveal
                key={idx}
                direction="up"
                delay={idx * 40}
                duration={450}
              >
                <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:border-sky-300 transition-all duration-200">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-[#0077b6] transition-colors cursor-pointer"
                  >
                    <span className="leading-snug">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#0077b6]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Link to Full FAQ Page */}
        <div className="text-center pt-2">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#0B2B56] text-[#0B2B56] hover:bg-[#0B2B56] hover:text-white text-xs sm:text-sm font-bold transition-all duration-200 group"
          >
            <span>Visit Complete FAQ Directory</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
