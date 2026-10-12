"use client";

import React from "react";
import { ExternalLink, Maximize2 } from "lucide-react";

export interface DrawingProject {
  id?: string;
  status?: string;
  title: string;
  image?: string;
  link?: string;
}

interface DrawingProjectsSectionProps {
  projects: DrawingProject[];
  onSelectProject?: (project: DrawingProject) => void;
}

export default function DrawingProjectsSection({
  projects,
  onSelectProject,
}: DrawingProjectsSectionProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="text-left">
        <h2 className="text-xl sm:text-2xl font-black text-[#002b5b] tracking-tight">
          Project{" "}
          <span className="relative inline-block">
            <span className="text-[#0f4c81]">Gallery</span>
            <svg
              className="w-full h-3 text-[#0077b6] absolute -bottom-1.5 left-0"
              viewBox="0 0 100 12"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8C25 2 75 2 98 9"
                stroke="#0077b6"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((proj, idx) => (
          <div
            key={proj.id || idx}
            className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
          >
            {/* Status / Badge Header */}
            {proj.status && (
              <div className="px-5 pt-4 pb-2 flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-[#0077b6] border border-sky-100">
                  {proj.status}
                </span>
                {proj.link && !proj.link.includes("youtube") && !proj.link.includes("youtu.be") && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-[#0077b6] inline-flex items-center gap-1 font-semibold transition-colors"
                  >
                    Details <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}

            {/* Image Container with Lightbox Trigger */}
            <div
              onClick={() => onSelectProject && onSelectProject(proj)}
              className="relative w-full h-64 sm:h-72 bg-slate-900 cursor-pointer overflow-hidden"
            >
              <img
                src={proj.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"}
                alt={proj.title}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 text-slate-900 font-bold text-xs shadow-lg backdrop-blur-xs">
                  <Maximize2 className="w-4 h-4 text-[#0077b6]" />
                  Preview Drawing
                </span>
              </div>
            </div>

            {/* Project Title */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0077b6] transition-colors line-clamp-2">
                {proj.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
