"use client";

import React from "react";

export default function HeroSoftwareLogos() {
  const softwares = [
    { char: "3", name: "Autodesk 3ds Max", style: "bg-teal-500/10 text-teal-600 border-teal-200 hover:border-teal-400" },
    { char: "A", name: "Autodesk AutoCAD", style: "bg-red-500/10 text-red-600 border-red-200 hover:border-red-400" },
    { char: "N", name: "Autodesk Navisworks", style: "bg-blue-500/10 text-blue-600 border-blue-200 hover:border-blue-400" },
    { char: "R", name: "Autodesk Revit", style: "bg-blue-600/10 text-blue-700 border-blue-300 hover:border-blue-500" },
    { char: "S", name: "Trimble SketchUp", style: "bg-red-500/10 text-red-500 border-red-200 hover:border-red-400" },
    { char: "T", name: "Trimble Tekla Structure", style: "bg-sky-600/10 text-sky-700 border-sky-300 hover:border-sky-500" },
    { char: "L", name: "Act-3D Lumion 3D", style: "bg-blue-400/10 text-blue-500 border-blue-200 hover:border-blue-400" },
    { char: "V", name: "Chaos V-Ray", style: "bg-slate-700/10 text-slate-800 border-slate-300 hover:border-slate-500" },
  ];

  return (
    <div className="pt-6 border-t border-slate-200/90">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {softwares.map((sw) => (
          <div
            key={sw.name}
            title={sw.name}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-extrabold text-sm sm:text-base border shadow-xs transition-all duration-200 hover:scale-110 cursor-pointer ${sw.style}`}
          >
            {sw.char}
          </div>
        ))}
      </div>
    </div>
  );
}
