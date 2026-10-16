"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Building, Layers } from "lucide-react";
import { portfoliosApi } from "@/services/api/portfoliosApi";
import ScrollReveal from "@/components/common/ScrollReveal";

const FALLBACK_PROJECTS = [
  {
    id: "anand-data-center",
    title: "Anand Commercial & Data Center Project",
    category: "Commercial BIM & MEPF",
    tools: "Revit • Navisworks • AutoCAD",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80",
    description: "Multi-discipline LOD 400 BIM modeling, HVAC duct routing, electrical cable trays, and structural rebar coordination for a 120,000 sq.ft commercial facility.",
  },
  {
    id: "river-cliff-city",
    title: "River Cliff City High-Rise Complex",
    category: "Architecture & Structure",
    tools: "Tekla • Revit Architecture",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description: "Structural steel detailing, precast concrete framing, parametric facade design, and automated drawing sheet generation.",
  },
  {
    id: "metro-industrial-hub",
    title: "Metro Industrial Logistics Warehouse",
    category: "Industrial BIM",
    tools: "Revit MEP • Navisworks",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    description: "Industrial warehouse clash detection, firefighting sprinkler layout, and plumbing riser coordination with zero site errors.",
  },
];

export default function RecentPortfolioSection() {
  const [projects, setProjects] = useState<any[]>(FALLBACK_PROJECTS);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await portfoliosApi.getAllPortfolios();
        if ((res.statusCode === 200 || res.statusCode === 201) && res.data) {
          const items = Array.isArray(res.data) ? res.data : [];
          if (items.length > 0) {
            setProjects(items);
          }
        }
      } catch (err) {
        console.error("Failed to fetch portfolios:", err);
      }
    };
    fetchPortfolios();
  }, []);

  const currentProject = projects[activeProjectIdx] || FALLBACK_PROJECTS[0];

  const handlePrev = () => {
    setActiveProjectIdx((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveProjectIdx((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 lg:py-28 bg-[#f8fafc] font-sans border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10 sm:space-y-12">
        
        {/* Section Header matching Reference Screenshot */}
        <ScrollReveal direction="up" duration={500} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-[#0077b6] text-xs font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#0077b6]" />
              <span>Deliverables Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#0B2B56] tracking-tight">
              Our Projects
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal">
              Featured 3D building models, coordinated drawing sheets, and student project portfolios.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Arrow Controls */}
            <div className="flex items-center gap-2 mr-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-sky-400 hover:text-[#0077b6] text-slate-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-sky-400 hover:text-[#0077b6] text-slate-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#0B2B56] text-[#0B2B56] hover:bg-[#0B2B56] hover:text-white text-xs sm:text-sm font-bold transition-all duration-200"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Large Featured Project Hero Card (Exact Match to Reference Screenshot) */}
        <ScrollReveal direction="up" duration={600}>
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-2xl group">
            {/* Background 3D Model Image */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
              <img
                src={currentProject.image || "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80"}
                alt={currentProject.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 opacity-80"
              />

              {/* Architectural CAD Grid & Isometric Elevation Markers */}
              <div className="absolute inset-0 pointer-events-none opacity-25">
                <svg className="w-full h-full" viewBox="0 0 1000 400" fill="none">
                  <line x1="50" y1="50" x2="50" y2="350" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="30" y1="100" x2="70" y2="100" stroke="#38BDF8" strokeWidth="1" />
                  <text x="75" y="104" fill="#38BDF8" fontSize="10" fontFamily="monospace">+60m</text>
                  <line x1="30" y1="200" x2="70" y2="200" stroke="#38BDF8" strokeWidth="1" />
                  <text x="75" y="204" fill="#38BDF8" fontSize="10" fontFamily="monospace">00m</text>
                  <line x1="30" y1="300" x2="70" y2="300" stroke="#38BDF8" strokeWidth="1" />
                  <text x="75" y="304" fill="#38BDF8" fontSize="10" fontFamily="monospace">-20m</text>
                </svg>
              </div>

              {/* Gradient Scrim for readable text */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Category Pill on Top Left */}
              <div className="absolute top-5 left-5 sm:top-7 sm:left-7">
                <span className="px-3.5 py-1.5 rounded-lg bg-[#072244]/90 backdrop-blur-md text-white text-xs font-mono font-bold tracking-wider border border-white/20 shadow-lg uppercase">
                  {currentProject.category || "Featured Model"}
                </span>
              </div>

              {/* Floating Bottom Project Details */}
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
                <div className="space-y-2 max-w-2xl">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight drop-shadow-md">
                    {currentProject.title}
                  </h3>
                  {currentProject.description && (
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-xl font-normal drop-shadow">
                      {currentProject.description}
                    </p>
                  )}
                  {currentProject.tools && (
                    <div className="pt-1">
                      <span className="inline-block px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-sky-200">
                        Tools: {currentProject.tools}
                      </span>
                    </div>
                  )}
                </div>

                <div className="shrink-0">
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#0B2B56] font-bold text-xs sm:text-sm shadow-xl transition-all duration-200"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Secondary Project Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((p, idx) => (
            <ScrollReveal
              key={p.id || idx}
              direction="up"
              delay={idx * 100}
              duration={500}
            >
              <div
                onClick={() => setActiveProjectIdx(idx)}
                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer bg-white flex items-center gap-4 ${
                  activeProjectIdx === idx
                    ? "border-sky-500 shadow-md ring-2 ring-sky-100"
                    : "border-slate-200/80 hover:border-slate-300 shadow-xs"
                }`}
              >
                <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={p.image || "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=400&q=80"}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B2B56] truncate">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {p.category || "BIM Model"}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
