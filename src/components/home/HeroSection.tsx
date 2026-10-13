"use client";

import React from "react";
import Link from "next/link";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function HeroSection() {
  const softwares = [
    {
      name: "Autodesk Revit",
      labelTop: "Autodesk",
      labelBottom: "Revit",
      href: "/courses",
      icon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md" fill="none">
          <defs>
            <linearGradient id="revit-body" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="revit-shade" x1="24" y1="28" x2="48" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <rect x="14" y="8" width="10" height="48" rx="1.5" fill="url(#revit-body)" />
          <path d="M24 8h16c8.5 0 14 5.5 14 13.5s-5.5 13.5-14 13.5H24V8zm10 9v9h6c3 0 5-1.5 5-4.5s-2-4.5-5-4.5h-6z" fill="url(#revit-body)" />
          <path d="M33 33l13 23h-11l-9-17h7z" fill="url(#revit-shade)" />
          <path d="M14 8h5v48h-5z" fill="#FFFFFF" opacity="0.6" />
        </svg>
      ),
    },
    {
      name: "Navisworks",
      labelTop: "Navisworks",
      labelBottom: "",
      href: "/courses",
      icon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md" fill="none">
          <defs>
            <linearGradient id="navis-body" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="navis-diag" x1="20" y1="8" x2="48" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <rect x="13" y="8" width="10" height="48" rx="1.5" fill="url(#navis-body)" />
          <rect x="41" y="8" width="10" height="48" rx="1.5" fill="url(#navis-body)" />
          <path d="M23 8h5.5l18 40V56h-5.5l-18-40V8z" fill="url(#navis-diag)" />
          <path d="M13 8h5v48h-5z" fill="#FFFFFF" opacity="0.6" />
        </svg>
      ),
    },
    {
      name: "AutoCAD",
      labelTop: "AutoCAD",
      labelBottom: "",
      href: "/courses",
      icon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md" fill="none">
          <defs>
            <linearGradient id="acad-body" x1="10" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="acad-shadow" x1="32" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <path d="M32 8L12 56h10.5l5.5-14h16l-5-12.5h-8l6-15.5H32z" fill="url(#acad-body)" />
          <path d="M32 8l20 48H41.5l-4-11h-11l5-13h3.5l-3-8h-1z" fill="url(#acad-shadow)" />
          <polygon points="26.5,38 37.5,38 35,32 29,32" fill="#FFFFFF" opacity="0.9" />
        </svg>
      ),
    },
    {
      name: "3D Studio Max",
      labelTop: "3D Studio",
      labelBottom: "Max",
      href: "/courses",
      icon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md" fill="none">
          <defs>
            <linearGradient id="max-top" x1="16" y1="12" x2="48" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#5EEAD4" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
            <linearGradient id="max-mid" x1="24" y1="24" x2="52" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#0F766E" />
            </linearGradient>
            <linearGradient id="max-bot" x1="12" y1="36" x2="44" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#115E59" />
            </linearGradient>
          </defs>
          <polygon points="18,16 38,10 48,22 28,28" fill="url(#max-top)" />
          <polygon points="28,28 48,22 44,38 24,44" fill="url(#max-mid)" />
          <polygon points="24,44 44,38 38,54 18,48" fill="url(#max-bot)" />
          <polyline points="18,16 28,28 24,44 18,48" stroke="#CCFBF1" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      name: "SketchUp",
      labelTop: "SketchUp",
      labelBottom: "",
      href: "/courses",
      icon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md" fill="none">
          <defs>
            <linearGradient id="su-top" x1="16" y1="12" x2="48" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
            <linearGradient id="su-left" x1="16" y1="28" x2="32" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>
            <linearGradient id="su-right" x1="32" y1="28" x2="48" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
          </defs>
          <polygon points="32,10 48,19 32,28 16,19" fill="url(#su-top)" stroke="#FCA5A5" strokeWidth="0.8" />
          <polygon points="16,19 32,28 32,48 16,39" fill="url(#su-left)" />
          <polygon points="32,28 48,19 48,39 32,48" fill="url(#su-right)" />
          <polygon points="24,23.5 32,28 32,38 24,33.5" fill="#FFFFFF" opacity="0.9" />
          <polygon points="32,28 40,23.5 40,33.5 32,38" fill="#E2E8F0" opacity="0.95" />
        </svg>
      ),
    },
    {
      name: "Tekla",
      labelTop: "Tekla",
      labelBottom: "",
      href: "/courses",
      icon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md" fill="none">
          <defs>
            <linearGradient id="tekla-body" x1="12" y1="16" x2="52" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="50%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="tekla-facet" x1="20" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DBEAFE" />
              <stop offset="100%" stopColor="#93C5FD" />
            </linearGradient>
          </defs>
          <polygon points="14,16 38,12 50,32 26,36" fill="url(#tekla-facet)" />
          <polygon points="26,36 50,32 44,52 20,48" fill="url(#tekla-body)" />
          <polyline points="14,16 26,36 20,48" stroke="#BFDBFE" strokeWidth="1.5" />
          <polyline points="38,12 50,32 44,52" stroke="#1D4ED8" strokeWidth="1.5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#061e38] via-[#092c52] to-[#0c3866] pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 text-white">
      {/* 1. Architectural CAD Blueprint Background (center & left) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blueprint Grid Lines */}
          <defs>
            <pattern id="cadGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#38BDF8" strokeWidth="0.5" opacity="0.3" />
              <circle cx="80" cy="80" r="1.5" fill="#38BDF8" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="1440" height="800" fill="url(#cadGrid)" />

          {/* Architectural Floor Plan Vector Drawing */}
          <g stroke="#38BDF8" strokeWidth="1.2" opacity="0.65">
            {/* Outer Building Envelope */}
            <rect x="180" y="80" width="680" height="420" fill="none" strokeWidth="2" />
            <rect x="186" y="86" width="668" height="408" fill="none" strokeWidth="1" strokeDasharray="6 4" />

            {/* Structural Core & Column Grid */}
            <rect x="420" y="180" width="200" height="220" fill="none" strokeWidth="1.8" />
            <line x1="420" y1="240" x2="620" y2="240" />
            <line x1="420" y1="300" x2="620" y2="300" />
            <line x1="420" y1="360" x2="620" y2="360" />

            {/* Room Partitions */}
            <line x1="180" y1="240" x2="420" y2="240" />
            <line x1="180" y1="360" x2="420" y2="360" />
            <line x1="620" y1="220" x2="860" y2="220" />
            <line x1="620" y1="340" x2="860" y2="340" />
            <line x1="300" y1="80" x2="300" y2="240" />
            <line x1="740" y1="80" x2="740" y2="220" />

            {/* Door Swing Arcs */}
            <path d="M 300 240 A 40 40 0 0 0 260 200" fill="none" strokeDasharray="3 3" />
            <path d="M 420 180 A 40 40 0 0 1 460 140" fill="none" strokeDasharray="3 3" />
            <path d="M 620 340 A 40 40 0 0 0 660 380" fill="none" strokeDasharray="3 3" />

            {/* Dimension Lines */}
            <line x1="150" y1="80" x2="150" y2="500" strokeWidth="0.8" />
            <line x1="140" y1="80" x2="160" y2="80" strokeWidth="0.8" />
            <line x1="140" y1="500" x2="160" y2="500" strokeWidth="0.8" />
            <text x="135" y="290" fill="#38BDF8" fontSize="12" fontFamily="monospace" transform="rotate(-90 135 290)">
              DIM 42,000 mm
            </text>

            <line x1="180" y1="50" x2="860" y2="50" strokeWidth="0.8" />
            <line x1="180" y1="40" x2="180" y2="60" strokeWidth="0.8" />
            <line x1="860" y1="40" x2="860" y2="60" strokeWidth="0.8" />
            <text x="480" y="42" fill="#38BDF8" fontSize="12" fontFamily="monospace">
              DIM 68,000 mm
            </text>

            {/* Column Grid Markers */}
            <circle cx="180" cy="530" r="14" fill="none" strokeWidth="1" />
            <text x="176" y="534" fill="#38BDF8" fontSize="11" fontWeight="bold">1</text>
            <circle cx="420" cy="530" r="14" fill="none" strokeWidth="1" />
            <text x="416" y="534" fill="#38BDF8" fontSize="11" fontWeight="bold">2</text>
            <circle cx="620" cy="530" r="14" fill="none" strokeWidth="1" />
            <text x="616" y="534" fill="#38BDF8" fontSize="11" fontWeight="bold">3</text>
            <circle cx="860" cy="530" r="14" fill="none" strokeWidth="1" />
            <text x="856" y="534" fill="#38BDF8" fontSize="11" fontWeight="bold">4</text>
          </g>
        </svg>
      </div>

      {/* 2. Modern High-Rise Skyscraper Wireframe Skyline (Right Side, exactly matching screenshot) */}
      <div className="absolute right-0 bottom-0 top-0 w-full lg:w-1/2 pointer-events-none overflow-hidden opacity-35 sm:opacity-45 lg:opacity-55 flex items-end justify-end">
        <svg
          className="w-full max-w-[760px] h-[90%] object-contain object-right-bottom"
          viewBox="0 0 760 620"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="towerGrad" x1="0" y1="0" x2="0" y2="620" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Background Secondary Towers */}
          <g stroke="#38BDF8" strokeWidth="1" opacity="0.4">
            <rect x="220" y="160" width="130" height="460" fill="none" />
            {Array.from({ length: 15 }).map((_, i) => (
              <line key={`bg-t1-${i}`} x1="220" y1={190 + i * 28} x2="350" y2={190 + i * 28} />
            ))}
            {/* Tower 2 background */}
            <rect x="580" y="220" width="140" height="400" fill="none" />
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`bg-t2-${i}`} x1="580" y1={250 + i * 30} x2="720" y2={250 + i * 30} />
            ))}
          </g>

          {/* Prominent High-Rise Skyscraper 1 (Center-Right Tower) */}
          <g stroke="#60A5FA" strokeWidth="1.6" opacity="0.85">
            {/* Main Tower Body */}
            <rect x="360" y="70" width="190" height="550" fill="url(#towerGrad)" />
            {/* Architectural Setback Crown */}
            <polygon points="360,70 390,25 520,25 550,70" fill="none" strokeWidth="2" stroke="#93C5FD" />
            {/* Spire antenna */}
            <line x1="455" y1="25" x2="455" y2="0" stroke="#93C5FD" strokeWidth="2.5" />
            <circle cx="455" cy="0" r="3" fill="#BAE6FD" />

            {/* Vertical Mullion Lines */}
            <line x1="398" y1="70" x2="398" y2="620" strokeWidth="1" opacity="0.7" />
            <line x1="436" y1="70" x2="436" y2="620" strokeWidth="1" opacity="0.7" />
            <line x1="474" y1="70" x2="474" y2="620" strokeWidth="1" opacity="0.7" />
            <line x1="512" y1="70" x2="512" y2="620" strokeWidth="1" opacity="0.7" />

            {/* Horizontal Floor Plates */}
            {Array.from({ length: 22 }).map((_, i) => (
              <line
                key={`floor-${i}`}
                x1="360"
                y1={95 + i * 24}
                x2="550"
                y2={95 + i * 24}
                strokeWidth={i % 4 === 0 ? "2" : "1"}
                opacity={i % 4 === 0 ? "0.9" : "0.5"}
              />
            ))}
          </g>

          {/* Isometric Angled Tower on Far Right */}
          <g stroke="#93C5FD" strokeWidth="1.5" opacity="0.8">
            <polygon points="560,180 640,130 730,170 650,220" fill="none" strokeWidth="2" />
            <line x1="560" y1="180" x2="560" y2="620" strokeWidth="2" />
            <line x1="650" y1="220" x2="650" y2="620" strokeWidth="2" />
            <line x1="730" y1="170" x2="730" y2="620" strokeWidth="2" />

            {Array.from({ length: 16 }).map((_, i) => (
              <g key={`iso-f-${i}`} opacity="0.6">
                <line x1="560" y1={210 + i * 26} x2="650" y2={250 + i * 26} />
                <line x1="650" y1={250 + i * 26} x2="730" y2={200 + i * 26} />
              </g>
            ))}
          </g>

          {/* Foreground Mid-Rise Office Block */}
          <g stroke="#BAE6FD" strokeWidth="1.6" opacity="0.75">
            <rect x="250" y="320" width="160" height="300" fill="none" />
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`mid-${i}`} x1="250" y1={350 + i * 28} x2="410" y2={350 + i * 28} />
            ))}
            <line x1="290" y1="320" x2="290" y2="620" opacity="0.6" />
            <line x1="330" y1="320" x2="330" y2="620" opacity="0.6" />
            <line x1="370" y1="320" x2="370" y2="620" opacity="0.6" />
          </g>
        </svg>
      </div>

      {/* 3. Main Hero Banner Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 w-full">
        <div className="max-w-5xl space-y-6 sm:space-y-7">
          
          {/* Main Headline (2 lines matching reference screenshot) */}
          <ScrollReveal direction="up" delay={50} duration={600}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[56px] font-black tracking-normal text-white uppercase leading-[1.15]">
              BUILD YOUR FUTURE IN BUILDING
              <br />
              INFORMATION MODELING
            </h1>
          </ScrollReveal>

          {/* Subtitle & Discipline Bullets */}
          <ScrollReveal direction="up" delay={150} duration={600}>
            <div className="space-y-3">
              <p className="text-lg sm:text-xl font-medium text-slate-100">
                Expert BIM training for:
              </p>

              {/* 2-Column Bullet List matching reference screenshot */}
              <div className="grid grid-cols-2 gap-x-8 sm:gap-x-14 gap-y-2 text-base sm:text-lg text-white font-medium max-w-lg">
                {/* Column 1 */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-white text-xl leading-none">•</span>
                    <span>Architecture</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-white text-xl leading-none">•</span>
                    <span>Structure</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-white text-xl leading-none">•</span>
                    <span>Mechanical (HVAC)</span>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-white text-xl leading-none">•</span>
                    <span>Electrical</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-white text-xl leading-none">•</span>
                    <span>Plumbing</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-white text-xl leading-none">•</span>
                    <span>Fire</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* CTA Buttons (Both White Buttons matching reference screenshot) */}
          <ScrollReveal direction="up" delay={250} duration={600}>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3 rounded-lg bg-white hover:bg-slate-100 text-[#092c52] font-bold text-base sm:text-[17px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Explore Courses
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3 rounded-lg bg-white hover:bg-slate-100 text-[#092c52] font-bold text-base sm:text-[17px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Register Now
              </Link>
            </div>
          </ScrollReveal>

          {/* 4. Software Tools Row (Bottom of Banner matching screenshot) */}
          <ScrollReveal direction="up" delay={350} duration={600}>
            <div className="pt-6 sm:pt-8">
              <div className="flex flex-wrap items-end gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                {softwares.map((sw) => (
                  <Link
                    key={sw.name}
                    href={sw.href}
                    title={sw.name}
                    className="group flex flex-col items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
                  >
                    <div className="transition-transform duration-200 group-hover:-translate-y-1">
                      {sw.icon}
                    </div>
                    <div className="text-center leading-tight">
                      <span className="block text-xs sm:text-[13px] font-semibold text-white/95 group-hover:text-sky-300 transition-colors">
                        {sw.labelTop}
                      </span>
                      {sw.labelBottom && (
                        <span className="block text-xs sm:text-[13px] font-semibold text-white/95 group-hover:text-sky-300 transition-colors">
                          {sw.labelBottom}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}

