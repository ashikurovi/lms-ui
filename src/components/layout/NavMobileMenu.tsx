"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  BookOpen,
  Briefcase,
  GraduationCap,
  Info,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  LogIn,
  UserPlus,
  MessageCircle,
  Layers,
} from "lucide-react";
import { servicesData } from "./ServicesMegaMenu";

interface NavItem {
  name: string;
  href: string;
  dropdown?: { name: string; href: string }[];
  isMegaMenu?: boolean;
}

interface NavMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavItem[];
  isLoggedIn?: boolean;
}

// Map each main nav section to an appropriate icon and status pill
function getMenuMeta(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("home")) {
    return {
      icon: <Home className="w-4 h-4 text-sky-300" />,
      badge: null,
    };
  }
  if (lower.includes("course")) {
    return {
      icon: <BookOpen className="w-4 h-4 text-sky-300" />,
      badge: (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/30">
          Live Batches
        </span>
      ),
    };
  }
  if (lower.includes("portfolio")) {
    return {
      icon: <Briefcase className="w-4 h-4 text-sky-300" />,
      badge: (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
          Projects
        </span>
      ),
    };
  }
  if (lower.includes("service")) {
    return {
      icon: <Layers className="w-4 h-4 text-sky-300" />,
      badge: (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/30">
          Services
        </span>
      ),
    };
  }
  if (lower.includes("student")) {
    return {
      icon: <GraduationCap className="w-4 h-4 text-sky-300" />,
      badge: (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
          Portal
        </span>
      ),
    };
  }
  return {
    icon: <Info className="w-4 h-4 text-sky-300" />,
    badge: null,
  };
}

export default function NavMobileMenu({
  isOpen,
  onClose,
  navLinks,
  isLoggedIn,
}: NavMobileMenuProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSection = (name: string) => {
    setOpenSection(openSection === name ? null : name);
  };

  return (
    <div className="lg:hidden bg-gradient-to-b from-[#072244] to-[#04152b] border-t border-sky-900/60 shadow-2xl animate-in slide-in-from-top-2 duration-200 text-white max-h-[85vh] overflow-y-auto">
      <div className="px-5 py-6 space-y-5">
        {/* Quick Admission Helpline Bar */}
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">BIM Admission Desk:</span>
          </div>
          <a
            href="https://wa.me/8801700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sky-300 font-bold hover:text-white transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Main Navigation Items - Balanced Full-Width Interactive Cards */}
        <div className="space-y-2">
          {navLinks.map((item) => {
            const { icon, badge } = getMenuMeta(item.name);
            const isExpanded = openSection === item.name;

            return (
              <div
                key={item.name}
                className="rounded-2xl border border-white/8 bg-white/[0.04] overflow-hidden transition-all duration-200 hover:border-sky-400/30"
              >
                {/* Main Link / Header Row */}
                <div className="flex items-center justify-between p-3.5">
                  {item.isMegaMenu ? (
                    <button
                      type="button"
                      onClick={() => toggleSection(item.name)}
                      className="flex items-center gap-3 flex-1 text-sm font-bold tracking-wide uppercase text-slate-100 hover:text-sky-300 transition-colors text-left cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-400/20 flex items-center justify-center shrink-0">
                        {icon}
                      </div>
                      <span>{item.name}</span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => {
                        if (!item.dropdown) onClose();
                      }}
                      className="flex items-center gap-3 flex-1 text-sm font-bold tracking-wide uppercase text-slate-100 hover:text-sky-300 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-400/20 flex items-center justify-center shrink-0">
                        {icon}
                      </div>
                      <span>{item.name}</span>
                    </Link>
                  )}

                  {/* Right side: Badge or Dropdown Chevron Toggle */}
                  <div className="flex items-center gap-2 shrink-0">
                    {badge}

                    {item.dropdown || item.isMegaMenu ? (
                      <button
                        onClick={() => toggleSection(item.name)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        aria-label={`Toggle ${item.name} submenu`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-sky-300" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="p-1 text-slate-400 hover:text-sky-300"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Submenu Accordion for regular dropdown */}
                {item.dropdown && isExpanded && (
                  <div className="px-3.5 pb-3 pt-1 space-y-1.5 border-t border-white/5 bg-[#031326]/60">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={onClose}
                        className="flex items-center justify-between py-2 px-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-sky-500/15 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                          <span>{sub.name}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                      </Link>
                    ))}
                  </div>
                )}

                {/* Services Mega Menu Accordion */}
                {item.isMegaMenu && isExpanded && (
                  <div className="px-4 pb-4 pt-2 space-y-4 border-t border-white/5 bg-[#031326]/80 text-slate-200 text-xs">
                    {/* BIM Services */}
                    <div>
                      <h4 className="font-bold text-sky-400 uppercase tracking-wider text-[11px] mb-1.5">
                        {servicesData.column1[0].title}
                      </h4>
                      <ul className="space-y-1 pl-2">
                        {servicesData.column1[0].items.map((srv) => (
                          <li key={srv}>
                            <span className="block py-1 text-slate-300 hover:text-sky-300 active:text-sky-300 cursor-pointer transition-colors">
                              {srv}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Architectural Services */}
                    <div className="border-t border-white/5 pt-3">
                      <h4 className="font-bold text-sky-400 uppercase tracking-wider text-[11px] mb-1.5">
                        {servicesData.column1[1].title}
                      </h4>
                      <ul className="space-y-1 pl-2">
                        {servicesData.column1[1].items.map((srv) => (
                          <li key={srv}>
                            <span className="block py-1 text-slate-300 hover:text-sky-300 active:text-sky-300 cursor-pointer transition-colors">
                              {srv}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Structural Services */}
                    <div className="border-t border-white/5 pt-3">
                      <h4 className="font-bold text-sky-400 uppercase tracking-wider text-[11px] mb-1.5">
                        {servicesData.column2[0].title}
                      </h4>
                      <ul className="space-y-1 pl-2">
                        {servicesData.column2[0].items.map((srv) => (
                          <li key={srv}>
                            <span className="block py-1 text-slate-300 hover:text-sky-300 active:text-sky-300 cursor-pointer transition-colors">
                              {srv}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 3D Visualization */}
                    <div className="border-t border-white/5 pt-3">
                      <h4 className="font-bold text-sky-400 uppercase tracking-wider text-[11px] mb-1.5">
                        {servicesData.column2[1].title}
                      </h4>
                      <ul className="space-y-1 pl-2">
                        {servicesData.column2[1].items.map((srv) => (
                          <li key={srv}>
                            <span className="block py-1 text-slate-300 hover:text-sky-300 active:text-sky-300 cursor-pointer transition-colors">
                              {srv}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* MEPF Services */}
                    <div className="border-t border-white/5 pt-3">
                      <h4 className="font-bold text-sky-400 uppercase tracking-wider text-[11px] mb-2">
                        {servicesData.column3.title}
                      </h4>
                      <div className="space-y-3 pl-2">
                        {servicesData.column3.subgroups.map((grp) => (
                          <div key={grp.subtitle} className="space-y-1">
                            <span className="font-semibold text-white block hover:text-sky-300 cursor-pointer transition-colors">
                              {grp.subtitle}
                            </span>
                            {grp.items.length > 0 && (
                              <ul className="space-y-1 pl-2">
                                {grp.items.map((subItem) => (
                                  <li key={subItem}>
                                    <span className="block py-0.5 text-slate-300 hover:text-sky-300 active:text-sky-300 cursor-pointer transition-colors">
                                      {subItem}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons: Full Width & Balanced */}
        <div className="pt-2">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-sky-500/25"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Go to Student Dashboard</span>
            </Link>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/login"
                onClick={onClose}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all text-center"
              >
                <LogIn className="w-4 h-4 text-sky-300" />
                <span>Log in</span>
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#0077b6] hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-all text-center shadow-md shadow-[#0077b6]/30"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>

        {/* Footer Info inside mobile menu */}
        <div className="pt-3 border-t border-white/10 text-center space-y-1">
          <p className="text-[11px] font-medium text-slate-400">
            BIM Build BD • Empowering Civil, Architectural & MEP Engineers
          </p>
        </div>
      </div>
    </div>
  );
}
