"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, User, LogIn, LayoutDashboard } from "lucide-react";
import { getAuthToken } from "@/services/api/apiClient";
import NavMobileMenu from "./NavMobileMenu";

export default function Navbar({ isScrolled = false }: { isScrolled?: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoggedIn(!!getAuthToken());
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "COURSE OFFERED", href: "/courses" },
    { name: "PORTFOLIO", href: "/portfolio" },
    {
      name: "STUDENT CORNER",
      href: "/gallery",
      dropdown: [
        { name: "Student Gallery", href: "/gallery" },
        { name: "Success Stories", href: "/success-stories" },
        { name: "Student Dashboard", href: "/dashboard" },
        { name: "Certificate Verification", href: "/dashboard" },
      ],
    },
    {
      name: "ABOUT US",
      href: "/about",
      dropdown: [
        { name: "About Institute", href: "/about" },
        { name: "Expert Trainers", href: "/trainers" },
        { name: "Engineering & BIM Blogs", href: "/blog" },
        { name: "Contact Us", href: "/contact" },
      ],
    },
  ];

  return (
    <div className="relative z-40 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          className={`flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300 ease-in-out ${
            isScrolled ? "h-14 sm:h-16 lg:h-18" : "h-16 sm:h-18 lg:h-20"
          }`}
        >
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group py-1 shrink-0">
            {/* 3D Wireframe Globe Network Icon */}
            <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <svg
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white shrink-0 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]"
                viewBox="0 0 40 40"
                fill="none"
              >
                <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1.8" className="text-white/90" />
                {/* Longitudes */}
                <ellipse cx="20" cy="20" rx="9.5" ry="17" stroke="currentColor" strokeWidth="1.4" className="text-sky-300/90" />
                <ellipse cx="20" cy="20" rx="4.5" ry="17" stroke="currentColor" strokeWidth="1.2" className="text-sky-200/80" />
                <line x1="20" y1="3" x2="20" y2="37" stroke="currentColor" strokeWidth="1.4" className="text-white/70" />
                {/* Latitudes */}
                <line x1="4" y1="13" x2="36" y2="13" stroke="currentColor" strokeWidth="1.3" className="text-sky-300/80" />
                <line x1="3" y1="20" x2="37" y2="20" stroke="currentColor" strokeWidth="1.5" className="text-white/90" />
                <line x1="4" y1="27" x2="36" y2="27" stroke="currentColor" strokeWidth="1.3" className="text-sky-300/80" />
                {/* Nodes */}
                <circle cx="10.5" cy="13" r="1.5" fill="#38BDF8" />
                <circle cx="20" cy="13" r="1.8" fill="#FFFFFF" />
                <circle cx="29.5" cy="13" r="1.5" fill="#38BDF8" />
                <circle cx="20" cy="20" r="2" fill="#FFFFFF" />
                <circle cx="10.5" cy="27" r="1.5" fill="#38BDF8" />
                <circle cx="29.5" cy="27" r="1.5" fill="#38BDF8" />
              </svg>
            </div>

            {/* Brand Title & Subtitle */}
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl md:text-[22px] font-extrabold tracking-tight text-white leading-tight">
                BIM Build BD
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-sky-200/90 tracking-wide leading-none pt-0.5">
                A Global BiM Training Institute
              </span>
            </div>
          </Link>

          {/* Right: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <div key={item.name} className="relative group py-5">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-xs xl:text-[13px] font-bold tracking-wider uppercase transition-colors duration-200 ${
                      isActive ? "text-sky-300" : "text-white/90 hover:text-sky-300"
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.dropdown && (
                      <ChevronDown className="w-3 h-3 text-white/60 group-hover:text-sky-300 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Active Underline */}
                  <span
                    className={`absolute bottom-3 left-0 h-[2px] bg-sky-400 rounded-full transition-all duration-200 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-0 pt-1 w-64 transition-all duration-200 z-50 transform group-hover:translate-y-0 translate-y-1">
                      <div className="bg-[#072244] border border-[#1c4d80] rounded-xl shadow-2xl py-2 backdrop-blur-xl">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-2.5 text-xs sm:text-[13px] font-medium text-slate-200 hover:text-white hover:bg-[#0e3b6d] transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quick Auth / Portal Access */}
            <div className="pl-2 border-l border-white/15 flex items-center gap-3">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-sky-500/20"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-all"
                >
                  <LogIn className="w-3.5 h-3.5 text-sky-300" />
                  <span>Log in</span>
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex lg:hidden items-center gap-3">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="px-3 py-1.5 rounded-lg bg-sky-500 text-white font-bold text-xs"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold border border-white/20"
              >
                Login
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <NavMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

