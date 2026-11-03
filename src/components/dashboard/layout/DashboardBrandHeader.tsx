"use client";

import React from "react";
import Link from "next/link";
import { X, ExternalLink } from "lucide-react";

interface DashboardBrandHeaderProps {
  currentRole: string;
  onCloseMobile: () => void;
}

export default function DashboardBrandHeader({
  currentRole,
  onCloseMobile,
}: DashboardBrandHeaderProps) {
  return (
    <div className="p-4 border-b border-white/[0.08] flex items-center justify-between font-sans bg-white/[0.02]">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 p-1 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
          <img
            src="/logo.jpeg"
            alt="BIM Build BD"
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-sm font-bold text-white tracking-tight leading-none group-hover:text-sky-300 transition-colors">
            BIM Build BD
          </h1>
          <span className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded-md bg-sky-500/15 text-sky-300 border border-sky-400/20 text-[9.5px] font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            {currentRole}
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-1">
        <Link
          href="/"
          target="_blank"
          title="Open Live Website"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors text-xs flex items-center gap-1"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
