"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAuthToken } from "@/services/api/apiClient";
import { usePathname } from "next/navigation";
import FooterSocialShare from "./FooterSocialShare";
import FooterPaymentPills from "./FooterPaymentPills";

export default function Footer() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getAuthToken());
  }, []);

  // Hide public footer inside dashboard
  if (pathname && pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-b from-[#072244] via-[#051a33] to-[#031122] text-slate-300 pt-16 sm:pt-20 pb-12 border-t border-[#133d6b]/70">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12">
          
          {/* Col 1: Logo, Bio & Share Icons (lg:col-span-5) */}
          <FooterSocialShare />

          {/* Col 2: About Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
              About
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
              <li>
                <Link href="/" className="hover:text-sky-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-sky-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="hover:text-sky-300 transition-colors">
                  Expert Trainers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-sky-300 transition-colors">
                  Engineering Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
              <li>
                <Link href="/courses" className="hover:text-sky-300 transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-sky-300 transition-colors">
                  Students Gallery
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-sky-300 transition-colors">
                  Our Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
              Support & Portal
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
              <li>
                <Link href="/faq" className="hover:text-sky-300 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-sky-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-sky-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li className="pt-1">
                {isLoggedIn ? (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all"
                  >
                    Student Portal Login
                  </Link>
                )}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Verification Row */}
        <FooterPaymentPills />
      </div>
    </footer>
  );
}

