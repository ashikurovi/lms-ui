"use client";

import React, { useState, useEffect, useRef } from "react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { overviewApi, PublicStatsReport } from "@/services/api/overviewApi";
import ScrollReveal from "@/components/common/ScrollReveal";
import {
  Calendar,
  Users,
  Briefcase,
  Globe,
  UserCheck,
  Star,
} from "lucide-react";

export default function StartToSuccess() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const [statsData, setStatsData] = useState<PublicStatsReport | null>(null);

  useEffect(() => {
    overviewApi
      .getPublicStats()
      .then((data) => {
        if (data) setStatsData(data);
      })
      .catch(console.error);
  }, []);

  const whyChooseUsMetrics = [
    {
      targetNumber: statsData?.yearsOfExperience || 10,
      suffix: "+",
      label: "Years Experience",
      icon: <Calendar className="w-8 h-8 text-[#0077b6] stroke-[1.8]" />,
    },
    {
      targetNumber: statsData?.expertTrainers || 50,
      suffix: "+",
      label: "BIM Experts & Trainers",
      icon: <Users className="w-8 h-8 text-[#0077b6] stroke-[1.8]" />,
    },
    {
      targetNumber: statsData?.students || 100,
      suffix: "+",
      label: "Completed Projects",
      icon: <Briefcase className="w-8 h-8 text-[#0077b6] stroke-[1.8]" />,
    },
    {
      targetNumber: statsData?.programs || 15,
      suffix: "+",
      label: "Countries Served",
      icon: <Globe className="w-8 h-8 text-[#0077b6] stroke-[1.8]" />,
    },
    {
      targetNumber: 99,
      suffix: "%",
      label: "Happy Clients & Students",
      icon: <UserCheck className="w-8 h-8 text-[#0077b6] stroke-[1.8]" />,
    },
    {
      targetNumber: 4.9,
      suffix: "",
      isDecimal: true,
      label: "Average Rating",
      icon: <Star className="w-8 h-8 text-[#0077b6] stroke-[1.8]" />,
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-white font-sans border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        {/* Section Headline matching Reference Screenshot */}
        <ScrollReveal direction="up" duration={500} className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-[#0077b6] text-xs font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#0077b6]" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#0B2B56] tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            A decade of leadership in building information modeling education, engineering coordination, and student career success.
          </p>
        </ScrollReveal>

        {/* 6 Metric Boxes Row (Exact Match to Reference Screenshot) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {whyChooseUsMetrics.map((item, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              delay={idx * 70}
              duration={500}
              className="flex flex-col items-center text-center p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-sky-300 transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Minimal Clean Outline Icon */}
              <div className="w-14 h-14 rounded-xl bg-sky-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Bold Stat Counter */}
              <div className="text-2xl sm:text-3xl font-black text-[#0B2B56] tracking-tight">
                {item.isDecimal ? (
                  <span>4.9</span>
                ) : (
                  <AnimatedCounter
                    target={item.targetNumber}
                    suffix={item.suffix}
                    duration={1500}
                    trigger={isInView}
                  />
                )}
              </div>

              {/* Label */}
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                {item.label}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
