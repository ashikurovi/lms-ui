"use client";

import React from "react";
import Link from "next/link";

export default function FooterSocialShare() {
  return (
    <div className="lg:col-span-5 space-y-6">
      {/* Brand Logo matching Header & Banner */}
      <Link href="/" className="flex items-center gap-3.5 group inline-flex">
        <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <svg
            className="w-11 h-11 text-white shrink-0 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]"
            viewBox="0 0 40 40"
            fill="none"
          >
            <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1.8" className="text-white/90" />
            <ellipse cx="20" cy="20" rx="9.5" ry="17" stroke="currentColor" strokeWidth="1.4" className="text-sky-300/90" />
            <ellipse cx="20" cy="20" rx="4.5" ry="17" stroke="currentColor" strokeWidth="1.2" className="text-sky-200/80" />
            <line x1="20" y1="3" x2="20" y2="37" stroke="currentColor" strokeWidth="1.4" className="text-white/70" />
            <line x1="4" y1="13" x2="36" y2="13" stroke="currentColor" strokeWidth="1.3" className="text-sky-300/80" />
            <line x1="3" y1="20" x2="37" y2="20" stroke="currentColor" strokeWidth="1.5" className="text-white/90" />
            <line x1="4" y1="27" x2="36" y2="27" stroke="currentColor" strokeWidth="1.3" className="text-sky-300/80" />
            <circle cx="10.5" cy="13" r="1.5" fill="#38BDF8" />
            <circle cx="20" cy="13" r="1.8" fill="#FFFFFF" />
            <circle cx="29.5" cy="13" r="1.5" fill="#38BDF8" />
            <circle cx="20" cy="20" r="2" fill="#FFFFFF" />
            <circle cx="10.5" cy="27" r="1.5" fill="#38BDF8" />
            <circle cx="29.5" cy="27" r="1.5" fill="#38BDF8" />
          </svg>
        </div>

        <div className="flex flex-col">
          <span className="text-2xl sm:text-[26px] font-black tracking-tight text-white leading-tight">
            BIM Build BD
          </span>
          <span className="text-xs font-semibold text-sky-200/90 tracking-wide pt-0.5">
            A Global BiM Training Institute
          </span>
        </div>
      </Link>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
        Empowering engineers, architects, and modelers with industry-grade practical BIM workflows in Revit, Navisworks, Tekla, AutoCAD, and 3ds Max.
      </p>

      {/* Share / Social links row */}
      <div className="space-y-3 pt-1">
        <div className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
          Connect & Share
        </div>
        <div className="flex items-center gap-2.5 text-white">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-[#1877f2] flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"
            aria-label="Share Facebook"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/8801879526108"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-[#25d366] flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"
            aria-label="Share WhatsApp"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-[#0077b5] flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"
            aria-label="Share LinkedIn"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          {/* Telegram */}
          <a
            href="https://telegram.org"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-[#0088cc] flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"
            aria-label="Share Telegram"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.536-.195 1.006.128.832.942z" />
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:info@advancebim.net"
            className="w-9 h-9 rounded-lg bg-[#ea4335] flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"
            aria-label="Share Email"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

