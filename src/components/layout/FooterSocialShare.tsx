"use client";

import React from "react";
import Link from "next/link";

export default function FooterSocialShare() {
  return (
    <div className="lg:col-span-5 space-y-6">
      {/* Brand Logo matching Header */}
      <Link href="/" className="flex items-center gap-3.5 group inline-flex">
        <div className="relative w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300 ring-1 ring-white/20">
          <img
            src="/logo.png"
            alt="BIM Build BD Logo"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-2xl sm:text-[26px] font-black tracking-tight text-white leading-tight">
            BIM Build BD
          </span>
          <span className="text-xs font-semibold text-sky-300 tracking-wider pt-0.5">
            PLAN • BUILD • DELIVER
          </span>
        </div>
      </Link>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
        Empowering engineers, architects, and modelers with industry-grade practical BIM workflows in Revit, Navisworks, Tekla, AutoCAD, and 3ds Max.
      </p>

      {/* Share / Social links row */}
      <div className="space-y-3 pt-1">
        <div className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
          Connect With Us
        </div>
        <div className="flex items-center gap-2.5 text-white">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/BIMBuildBD"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-[#1877f2] flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"
            aria-label="Facebook Page"
            title="Facebook Page"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/bimbuildbd/home"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-[#0077b5] flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"
            aria-label="LinkedIn Company Page"
            title="LinkedIn Company Page"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/8801348196498"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-[#25d366] flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"
            aria-label="WhatsApp Helpline (01348196498)"
            title="Chat on WhatsApp (+880 1348-196498)"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
          </a>

          {/* Telegram */}
          <a
            href="https://telegram.org"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-[#0088cc] flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"
            aria-label="Share Telegram"
            title="Telegram"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.536-.195 1.006.128.832.942z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
