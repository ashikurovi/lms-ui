"use client";

import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { reviewsApi } from "@/services/api";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Mojahedur Rahman",
      role: "BIM Modeler",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
      text: "BIM Build BD teaches international-standard live project workflows. Learning alongside experienced structural engineers and architects made all the difference in my career!",
      rating: 5,
    },
    {
      name: "Md. Ariful Haque",
      role: "MEP Engineer",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80",
      text: "Enrolling in the Complete BIM Revit Course was the best decision for my professional path. The structured modules and practical hands-on exercises are unmatched in quality.",
      rating: 5,
    },
    {
      name: "Souvik Karmakar",
      role: "BIM Coordinator",
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=300&q=80",
      text: "Premier platform for mastering modern BIM. The live classes, recorded lecture backups, and dedicated mentor support are top tier!",
      rating: 5,
    },
    {
      name: "Matiur Rahaman",
      role: "CAD & BIM Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      text: "Highly recommended for anyone looking to enter the AEC industry. The instructors teach complex modeling with immense care and practical clarity.",
      rating: 5,
    },
    {
      name: "Md. Mizanur Rahman",
      role: "Structural Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      text: "The structural rebar detailing and schedule generation methodologies were explained so clearly that I immediately applied them to our real construction projects.",
      rating: 5,
    },
  ];

  const [apiReviews, setApiReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await reviewsApi.getAllReviews();
        if (res.statusCode === 200 && res.data && res.data.length > 0) {
          const formattedReviews = res.data.map((r: any) => ({
            name: r.student?.name || "Student",
            role: r.batch?.name || "BIM Specialist",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
            text: r.comment,
            rating: r.rating || 5,
          }));
          setApiReviews(formattedReviews);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchReviews();
  }, []);

  const displayList = apiReviews.length > 0 ? apiReviews : testimonials;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === displayList.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#06182c] via-[#082343] to-[#0a2c53] py-20 lg:py-28 text-white font-sans border-b border-[#143d6b]">
      {/* Subtle Geometric Pattern Overlay (Exact match to reference screenshot) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1440 650"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="testPattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <polygon points="30,0 60,15 60,45 30,60 0,45 0,15" stroke="#38BDF8" strokeWidth="0.5" fill="none" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="1440" height="650" fill="url(#testPattern)" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 space-y-12">
        
        {/* Section Header */}
        <ScrollReveal direction="up" duration={500} className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sky-200 text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>Client & Student Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-white tracking-tight">
            Our Testimonials
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            Real feedback from practicing architects, civil engineers, and BIM modelers who trained with our mentors.
          </p>
        </ScrollReveal>

        {/* Carousel Container with Left & Right Arrow Buttons (Exact Match to Screenshot) */}
        <div className="relative">
          {/* Arrow Buttons */}
          <button
            onClick={handlePrev}
            className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-slate-800 shadow-xl flex items-center justify-center hover:bg-slate-100 hover:scale-105 transition-all cursor-pointer border border-slate-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-[#0B2B56]" />
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-slate-800 shadow-xl flex items-center justify-center hover:bg-slate-100 hover:scale-105 transition-all cursor-pointer border border-slate-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-[#0B2B56]" />
          </button>

          {/* Testimonial Cards Grid (3 cards displayed on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6">
            {[0, 1, 2].map((offset) => {
              const item = displayList[(currentIndex + offset) % displayList.length];
              return (
                <div
                  key={offset}
                  className="bg-white rounded-2xl p-6 sm:p-7 text-slate-800 shadow-2xl border border-slate-100 flex flex-col justify-between space-y-6 hover:-translate-y-1 transition-transform duration-300 relative group"
                >
                  <div className="space-y-4">
                    {/* Top Row: Stars + Quote Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < (item.rating || 5)
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-200 text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <Quote className="w-6 h-6 text-sky-200 group-hover:text-sky-400 transition-colors" />
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      &ldquo;{item.text}&rdquo;
                    </p>
                  </div>

                  {/* Author Profile */}
                  <div className="flex items-center gap-3.5 pt-5 border-t border-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-sky-100"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-black text-[#0B2B56] truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs font-semibold text-slate-500 truncate">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
