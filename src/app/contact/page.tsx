"use client";

import React from "react";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="bg-[#fafbfc] min-h-screen py-8 sm:py-14">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8 sm:space-y-12">
        {/* Breadcrumb */}
        <div className="text-xs sm:text-sm text-slate-400 font-medium">
          <Link href="/" className="hover:text-slate-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700 font-semibold">Contact us</span>
        </div>

        {/* Page Title & Subtitle */}
        <div className="text-center pt-1 pb-2 space-y-2 max-w-xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002b5b] tracking-tight">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Have questions about our BIM courses, installments, or engineering consultancy? Leave us a message below.
          </p>
        </div>

        {/* Centered Contact Form Container */}
        <div className="max-w-2xl mx-auto w-full">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
