"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, LogIn, LayoutDashboard } from "lucide-react";
import { getAuthToken } from "@/services/api/apiClient";
import NavMobileMenu from "./NavMobileMenu";
import ServicesMegaMenu from "./ServicesMegaMenu";

export interface NavLinkItem {
  name: string;
  href: string;
  isMegaMenu?: boolean;
  dropdown?: { name: string; href: string }[];
}

export default function Navbar({ isScrolled = false }: { isScrolled?: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoggedIn(!!getAuthToken());
  }, []);

  const navLinks: NavLinkItem[] = [
    { name: "HOME", href: "/" },
    { name: "COURSE OFFERED", href: "/courses" },
    { name: "PORTFOLIO", href: "/portfolio" },
    {
      name: "SERVICES",
      href: "#",
      isMegaMenu: true,
    },
    {
      name: "STUDENT CORNER",
      href: "/gallery",
      dropdown: [
        { name: "Student Gallery", href: "/gallery" },
        { name: "Success Stories", href: "/success-stories" },
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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div
          className={`flex lg:grid lg:grid-cols-[auto_1fr_auto] items-center justify-between gap-4 transition-all duration-300 ease-in-out ${
            isScrolled ? "h-16 sm:h-18" : "h-20 sm:h-22"
          }`}
        >
          {/* 1. Left: Brand Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center gap-3 sm:gap-3.5 group shrink-0">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-md overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300 ring-1 ring-white/20">
                <img
                  src="/logo.png"
                  alt="BIM Build BD Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Brand Title & Subtitle */}
              <div className="flex flex-col shrink-0">
                <span className="text-xl sm:text-[22px] font-black tracking-tight text-white leading-tight">
                  BIM Build BD
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-sky-300 tracking-wider leading-none pt-0.5">
                  PLAN • BUILD • DELIVER
                </span>
              </div>
            </Link>
          </div>

          {/* 2. Center: Navigation Links (Perfect Symmetrical Center) */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 2xl:gap-8 px-4">
            {navLinks.map((item) => {
              if (item.isMegaMenu) {
                return (
                  <div key={item.name} className="relative group flex items-center py-2">
                    <div
                      className="relative flex items-center gap-1.5 text-[13.5px] xl:text-[14.5px] font-bold tracking-wide uppercase transition-colors duration-200 text-white/90 group-hover:text-sky-300 cursor-pointer select-none py-1"
                      role="button"
                      tabIndex={0}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-white/60 group-hover:text-sky-300 group-hover:rotate-180 transition-transform duration-200" />

                      {/* Snug Hover Underline */}
                      <span className="absolute -bottom-1.5 left-0 h-[2.5px] bg-sky-400 rounded-full transition-all duration-200 w-0 group-hover:w-full" />
                    </div>

                    {/* Mega Menu Dropdown */}
                    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[780px] xl:w-[860px] transition-all duration-200 z-50 transform group-hover:translate-y-0 translate-y-1 pointer-events-none group-hover:pointer-events-auto">
                      <ServicesMegaMenu />
                    </div>
                  </div>
                );
              }

              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <div key={item.name} className="relative group flex items-center py-2">
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1.5 text-[13.5px] xl:text-[14.5px] font-bold tracking-wide uppercase transition-colors duration-200 py-1 ${
                      isActive ? "text-sky-300" : "text-white/90 hover:text-sky-300"
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.dropdown && (
                      <ChevronDown className="w-3.5 h-3.5 text-white/60 group-hover:text-sky-300 group-hover:rotate-180 transition-transform duration-200" />
                    )}

                    {/* Snug Active Underline */}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-[2.5px] bg-sky-400 rounded-full transition-all duration-200 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-0 pt-3 w-64 transition-all duration-200 z-50 transform group-hover:translate-y-0 translate-y-1">
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
          </nav>

          {/* 3. Right: Action Buttons (Dashboard / Login + Explore Courses) */}
          <div className="hidden lg:flex items-center justify-end gap-2.5 xl:gap-3 shrink-0">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="h-10 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs xl:text-sm uppercase tracking-wider inline-flex items-center gap-2 shadow-sm hover:shadow-sky-500/20 transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs xl:text-sm uppercase tracking-wider border border-white/20 inline-flex items-center gap-2 transition-all"
              >
                <LogIn className="w-4 h-4 text-sky-300" />
                <span>Log in</span>
              </Link>
            )}

            {/* White CTA Button */}
            <Link
              href="/courses"
              className="hidden xl:inline-flex h-10 px-4.5 rounded-xl bg-white hover:bg-slate-100 text-[#072244] font-black text-xs xl:text-sm uppercase tracking-wider items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all shrink-0"
            >
              <span>Explore Courses</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex lg:hidden items-center gap-3">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="px-3.5 py-2 rounded-xl bg-sky-500 text-white font-bold text-xs"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-3.5 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold border border-white/20"
              >
                Login
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-white hover:bg-white/10 rounded-xl cursor-pointer transition-colors"
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
