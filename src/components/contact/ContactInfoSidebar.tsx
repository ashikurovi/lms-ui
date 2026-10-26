"use client";

import React from "react";
import { Smartphone, Mail, MessageCircle } from "lucide-react";

export default function ContactInfoSidebar() {
  return (
    <div className="lg:col-span-5 space-y-8 font-sans">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight leading-snug">
        Keep In Touch
        <br />
        With Us.
      </h2>

      <div className="space-y-6 pt-2">
        {/* WhatsApp & Hotline */}
        <div className="flex items-start gap-4">
          <div className="text-emerald-500 pt-1">
            <MessageCircle className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <span>WhatsApp & Support</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                Fast Response
              </span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              <a
                href="https://wa.me/8801348196498"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600 transition-colors font-semibold"
              >
                +880 1348-196498 (01348196498)
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100" />

        {/* Alternative Phone */}
        <div className="flex items-start gap-4">
          <div className="text-[#0077b6] pt-1">
            <Smartphone className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-slate-900">Alternative Phone</h4>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              <a href="tel:+8801739081633" className="hover:text-[#0077b6] transition-colors">
                +880 1739-081633
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100" />

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="text-[#0077b6] pt-1">
            <Mail className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-slate-900">Email Address</h4>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              <a href="mailto:info@advancebim.net" className="hover:text-[#0077b6] transition-colors">
                info@advancebim.net
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100" />

        {/* Official Social Links */}
        <div className="space-y-3 pt-1">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
            Official Social Media
          </h4>
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/BIMBuildBD"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1877f2]/10 hover:bg-[#1877f2] text-[#1877f2] hover:text-white transition-all text-xs font-bold border border-[#1877f2]/20 shadow-xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook Page</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/bimbuildbd/home"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0a66c2]/10 hover:bg-[#0a66c2] text-[#0a66c2] hover:text-white transition-all text-xs font-bold border border-[#0a66c2]/20 shadow-xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
