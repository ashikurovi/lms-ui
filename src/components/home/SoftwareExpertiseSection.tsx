"use client";

import React from "react";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function SoftwareExpertiseSection() {
  const softwares = [
    {
      name: "Autodesk Revit",
      label: "Revit",
      sub: "BIM Modeling",
      icon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-13 sm:h-13 drop-shadow-md" fill="none">
          <defs>
            <linearGradient id="rvt-spine" x1="12" y1="8" x2="26" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="60%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <linearGradient id="rvt-loop-2024" x1="22" y1="8" x2="52" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="50%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>
            <linearGradient id="rvt-leg-2024" x1="26" y1="28" x2="50" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0C4A6E" />
            </linearGradient>
          </defs>
          {/* Modern 2024 Autodesk Revit Brand Icon */}
          <rect x="13" y="8" width="11" height="48" rx="2" fill="url(#rvt-spine)" />
          {/* Upper Loop */}
          <path
            d="M24 8h16.5c8 0 14.5 5 14.5 13s-6.5 13-14.5 13H24V8zm11 8v10h5.5c3.2 0 5.5-1.8 5.5-5s-2.3-5-5.5-5H35z"
            fill="url(#rvt-loop-2024)"
          />
          {/* Diagonal Strut Leg with 3D Depth */}
          <path d="M33 33.5l14.5 22.5h-12l-9.5-17.5h7z" fill="url(#rvt-leg-2024)" />
          {/* Architectural Highlight Bevel */}
          <path d="M13 8h4v48h-4z" fill="#FFFFFF" opacity="0.35" />
          <path d="M24 8h16c6 0 11 2.5 13 7-2-3-6-4.5-11-4.5H24V8z" fill="#FFFFFF" opacity="0.4" />
        </svg>
      ),
    },
    {
      name: "AutoCAD",
      label: "AutoCAD",
      sub: "2D & 3D Drafting",
      icon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-13 sm:h-13 drop-shadow-md" fill="none">
          <defs>
            <linearGradient id="acad-left-2024" x1="12" y1="8" x2="36" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF4D4D" />
              <stop offset="60%" stopColor="#E51937" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
            <linearGradient id="acad-right-2024" x1="32" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E51937" />
              <stop offset="60%" stopColor="#B91C1C" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </linearGradient>
          </defs>
          {/* Modern 2024 Autodesk AutoCAD Brand Icon */}
          <path d="M32 7L10 57h11l6-15h16l-5-12.5h-8l6-16.5H32z" fill="url(#acad-left-2024)" />
          <path d="M32 7l22 50H42.5l-4-11h-12l5.5-13.5h3l-3-9h-2z" fill="url(#acad-right-2024)" />
          {/* Crisp Geometric Inner Highlight */}
          <polygon points="26,38 38,38 35,31 29,31" fill="#FFFFFF" opacity="0.85" />
          <path d="M32 7l-2 5 12 30 2-4L32 7z" fill="#FFFFFF" opacity="0.3" />
        </svg>
      ),
    },
    {
      name: "SketchUp",
      label: "SketchUp",
      sub: "3D Visualization",
      icon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-13 sm:h-13 drop-shadow-md" fill="none">
          <defs>
            {/* Official Trimble SketchUp RED Palette (2021-2025) */}
            <linearGradient id="su-top-red" x1="16" y1="10" x2="48" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="100%" stopColor="#ED2124" />
            </linearGradient>
            <linearGradient id="su-left-red" x1="16" y1="24" x2="32" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ED2124" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
            <linearGradient id="su-right-red" x1="32" y1="24" x2="48" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>
          </defs>
          {/* Official Modern Trimble SketchUp Red Isometric Cube */}
          <polygon points="32,9 49,19 32,29 15,19" fill="url(#su-top-red)" stroke="#FFA3A3" strokeWidth="0.8" />
          <polygon points="15,19 32,29 32,51 15,41" fill="url(#su-left-red)" />
          <polygon points="32,29 49,19 49,41 32,51" fill="url(#su-right-red)" />
          {/* Stepped Architectural Modeling Extrusion Cutout */}
          <polygon points="23.5,24 32,29 32,40 23.5,35" fill="#FFFFFF" opacity="0.95" />
          <polygon points="32,29 40.5,24 40.5,35 32,40" fill="#E2E8F0" opacity="0.9" />
          <polygon points="23.5,24 32,19 40.5,24 32,29" fill="#F8FAFC" opacity="0.95" />
        </svg>
      ),
    },
    {
      name: "Navisworks",
      label: "Navisworks",
      sub: "Clash Detection",
      icon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-13 sm:h-13 drop-shadow-md" fill="none">
          <defs>
            <linearGradient id="nav-spine-2024" x1="12" y1="8" x2="26" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="60%" stopColor="#16A34A" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
            <linearGradient id="nav-diag-2024" x1="20" y1="8" x2="48" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="60%" stopColor="#15803D" />
              <stop offset="100%" stopColor="#14532D" />
            </linearGradient>
            <linearGradient id="nav-right-2024" x1="38" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#16A34A" />
              <stop offset="100%" stopColor="#052E16" />
            </linearGradient>
          </defs>
          {/* Modern 2024 Autodesk Navisworks Brand Icon */}
          <rect x="12" y="8" width="11" height="48" rx="2" fill="url(#nav-spine-2024)" />
          <rect x="41" y="8" width="11" height="48" rx="2" fill="url(#nav-right-2024)" />
          <path d="M22 8h6.5l19 39V56h-6.5l-19-39V8z" fill="url(#nav-diag-2024)" />
          {/* Highlight Bevels */}
          <path d="M12 8h4v48h-4z" fill="#FFFFFF" opacity="0.35" />
          <path d="M22 8h6.5l12 25-3 5-15.5-30z" fill="#FFFFFF" opacity="0.25" />
        </svg>
      ),
    },
    {
      name: "Tekla Structures",
      label: "Tekla",
      sub: "Steel & Rebar Detailing",
      icon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-13 sm:h-13 drop-shadow-md" fill="none">
          <defs>
            {/* Official Trimble Tekla Blue Palette (2021-2025) */}
            <linearGradient id="tekla-facet-top" x1="16" y1="12" x2="48" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="50%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="tekla-facet-base" x1="20" y1="28" x2="52" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="60%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
            <linearGradient id="tekla-facet-side" x1="12" y1="16" x2="36" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DBEAFE" />
              <stop offset="100%" stopColor="#93C5FD" />
            </linearGradient>
          </defs>
          {/* Official Trimble Tekla 3D Diamond / Chevron Mark */}
          <polygon points="14,16 38,11 50,31 26,36" fill="url(#tekla-facet-side)" />
          <polygon points="26,36 50,31 44,53 20,49" fill="url(#tekla-facet-base)" />
          <polygon points="14,16 26,36 20,49 8,30" fill="url(#tekla-facet-top)" opacity="0.9" />
          <polyline points="14,16 26,36 20,49" stroke="#EFF6FF" strokeWidth="1.2" />
          <polyline points="38,11 50,31 44,53" stroke="#1D4ED8" strokeWidth="1.2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative z-30 -mt-16 sm:-mt-20 lg:-mt-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 font-sans pointer-events-auto">
      <ScrollReveal direction="up" duration={600}>
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-8 lg:p-9 hover:border-sky-300 transition-all duration-300">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 gap-6 sm:gap-0">
            {softwares.map((sw, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center text-center px-4 py-3 sm:py-0 space-y-2 group cursor-default"
              >
                <div className="transition-transform duration-300 group-hover:scale-110 drop-shadow-md">
                  {sw.icon}
                </div>
                <div className="pt-1">
                  <h4 className="text-sm sm:text-base font-extrabold text-[#0B2B56] group-hover:text-[#0077b6] transition-colors">
                    {sw.label}
                  </h4>
                  <span className="text-xs text-slate-500 font-medium block">
                    {sw.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
