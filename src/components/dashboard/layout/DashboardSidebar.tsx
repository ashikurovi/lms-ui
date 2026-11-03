"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { StudentDashboardTab, InstructorDashboardTab, AdminDashboardTab } from "@/types/dashboard";
import { STUDENT_NAV_ITEMS, INSTRUCTOR_NAV_ITEMS, ADMIN_NAV_ITEMS } from "./dashboardNavConfig";
import DashboardBrandHeader from "./DashboardBrandHeader";
import DashboardSidebarFooter from "./DashboardSidebarFooter";

interface DashboardSidebarProps {
  currentRole: "student" | "instructor" | "admin";
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  studentTab: StudentDashboardTab;
  setStudentTab: (tab: StudentDashboardTab) => void;
  instructorTab: InstructorDashboardTab;
  setInstructorTab: (tab: InstructorDashboardTab) => void;
  adminTab: AdminDashboardTab;
  setAdminTab: (tab: AdminDashboardTab) => void;
}

export default function DashboardSidebar({
  currentRole,
  isMobileOpen,
  onCloseMobile,
  studentTab,
  setStudentTab,
  instructorTab,
  setInstructorTab,
  adminTab,
  setAdminTab,
}: DashboardSidebarProps) {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    user_management: true,
    batch_management: true,
  });
  const [dynamicBadges, setDynamicBadges] = useState<Record<string, string>>({});
  const [navSearch, setNavSearch] = useState("");

  const activeTabId =
    currentRole === "student"
      ? studentTab
      : currentRole === "instructor"
      ? instructorTab
      : adminTab;

  useEffect(() => {
    if (currentRole !== "admin") return;

    (async () => {
      try {
        const { enrollmentsApi } = await import("@/services/api/enrollmentsApi");
        const { studentsApi } = await import("@/services/api/studentsApi");
        const { mentorsApi } = await import("@/services/api/mentorsApi");
        const { batchesApi } = await import("@/services/api/batchesApi");

        const [enrollRes, stdRes, mentRes, btcRes] = await Promise.all([
          enrollmentsApi.getAllEnrollments({ limit: 100 }),
          studentsApi.getAllStudents({ limit: 1000 }),
          mentorsApi.getAllMentors({ limit: 100 }),
          batchesApi.getAllBatches({ limit: 100 }),
        ]);

        const pendingAdmissions =
          enrollRes.data?.items?.filter((e) => e.status === "pending").length || 0;
        const students =
          stdRes.data?.items?.filter(
            (s) =>
              s.role?.toLowerCase() === "student" ||
              s.user?.role?.toLowerCase() === "student"
          ).length || 0;
        const mentors = mentRes.data?.items?.length || 0;
        const batches = btcRes.data?.items?.length || 0;

        setDynamicBadges({
          admissions: pendingAdmissions > 0 ? `${pendingAdmissions}` : "",
          user_management: `${students + mentors}`,
          students: `${students}`,
          instructors: `${mentors}`,
          batches: `${batches}`,
        });
      } catch (error) {
        console.error("Failed to fetch sidebar counts:", error);
      }
    })();
  }, [currentRole]);

  const baseNavItems =
    currentRole === "student"
      ? STUDENT_NAV_ITEMS
      : currentRole === "instructor"
      ? INSTRUCTOR_NAV_ITEMS
      : ADMIN_NAV_ITEMS;

  const currentNavItems = useMemo(() => {
    return baseNavItems.map((item) => {
      const badge =
        dynamicBadges[item.id] !== undefined ? dynamicBadges[item.id] : item.badge;
      const children = item.children?.map((child) => ({
        ...child,
        badge:
          dynamicBadges[child.id] !== undefined
            ? dynamicBadges[child.id]
            : child.badge,
      }));
      return { ...item, badge, children };
    });
  }, [baseNavItems, dynamicBadges]);

  // Live filter menu items by search query
  const filteredNavItems = useMemo(() => {
    if (!navSearch.trim()) return currentNavItems;
    const q = navSearch.toLowerCase().trim();

    return currentNavItems
      .map((item) => {
        const itemMatches = item.label.toLowerCase().includes(q);
        const matchingChildren = item.children?.filter((child) =>
          child.label.toLowerCase().includes(q)
        );

        if (itemMatches) {
          return item;
        }
        if (matchingChildren && matchingChildren.length > 0) {
          return { ...item, children: matchingChildren };
        }
        return null;
      })
      .filter(Boolean) as typeof currentNavItems;
  }, [currentNavItems, navSearch]);

  const toggleDropdown = (id: string) =>
    setOpenDropdowns((p) => ({ ...p, [id]: !p[id] }));

  const handleNavClick = (id: string) => {
    if (currentRole === "student") setStudentTab(id as StudentDashboardTab);
    else if (currentRole === "instructor") setInstructorTab(id as InstructorDashboardTab);
    else setAdminTab(id as AdminDashboardTab);
    onCloseMobile();
  };

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 sm:w-72 bg-[#02182B] text-slate-200 z-50 lg:z-30 flex flex-col justify-between transition-transform duration-300 shrink-0 overflow-hidden shadow-2xl lg:shadow-none border-r border-slate-800/80 font-sans ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col min-h-0 flex-1">
          {/* Header Brand */}
          <DashboardBrandHeader
            currentRole={currentRole}
            onCloseMobile={onCloseMobile}
          />

          {/* Quick Menu Search (Admin/Desktop User Friendly) */}
          {currentRole === "admin" && (
            <div className="px-3.5 pt-3 pb-1">
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Quick find tab..."
                  value={navSearch}
                  onChange={(e) => setNavSearch(e.target.value)}
                  className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs text-white placeholder-slate-400 focus:bg-white/[0.09] focus:border-sky-400/40 focus:outline-none transition-all"
                />
                {navSearch && (
                  <button
                    onClick={() => setNavSearch("")}
                    className="absolute right-2 p-0.5 text-slate-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Navigation Links with Clean Minimalist Groups */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 custom-scrollbar">
            {filteredNavItems.length === 0 ? (
              <div className="px-3 py-6 text-center text-xs text-slate-400 font-medium">
                No matching tabs found.
              </div>
            ) : (
              filteredNavItems.map((item, idx) => {
                const Icon = item.icon;
                const hasChildren = !!item.children?.length;
                const isChildActive =
                  hasChildren && item.children?.some((c) => c.id === activeTabId);
                const isActive = activeTabId === item.id || isChildActive;
                const isExpanded =
                  !!navSearch.trim() || isChildActive || !!openDropdowns[item.id];

                // Group header divider
                const prevItem = filteredNavItems[idx - 1];
                const showGroupHeader =
                  item.group && (!prevItem || prevItem.group !== item.group);

                return (
                  <div key={item.id} className="space-y-0.5">
                    {showGroupHeader && (
                      <div className="px-3 pt-3.5 pb-1 text-[10px] font-bold tracking-wider uppercase text-slate-400/80">
                        {item.group}
                      </div>
                    )}

                    {hasChildren ? (
                      <div className="space-y-0.5">
                        <button
                          type="button"
                          onClick={() => toggleDropdown(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                            isChildActive
                              ? "bg-white/[0.09] text-white"
                              : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Icon
                              className={`w-4 h-4 shrink-0 transition-colors ${
                                isChildActive ? "text-sky-400" : "text-slate-400"
                              }`}
                            />
                            <span className="truncate">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {item.badge && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-sky-500/20 text-sky-200 font-bold border border-sky-400/20">
                                {item.badge}
                              </span>
                            )}
                            <ChevronDown
                              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                                isExpanded ? "rotate-180 text-sky-300" : ""
                              }`}
                            />
                          </div>
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-200 ease-in-out ${
                            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="ml-4 pl-2.5 border-l border-slate-700/60 space-y-0.5 py-1 mt-0.5">
                            {item.children?.map((sub) => {
                              const isSubActive = activeTabId === sub.id;
                              return (
                                <button
                                  key={sub.id}
                                  type="button"
                                  onClick={() => handleNavClick(sub.id)}
                                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                                    isSubActive
                                      ? "bg-[#0077b6] text-white font-bold shadow-xs"
                                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                                  }`}
                                >
                                  <span className="truncate">{sub.label}</span>
                                  {sub.badge && (
                                    <span
                                      className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded ${
                                        isSubActive
                                          ? "bg-white/20 text-white"
                                          : "bg-slate-800 text-slate-400 border border-slate-700"
                                      }`}
                                    >
                                      {sub.badge}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#0077b6] text-white shadow-sm font-bold border border-sky-400/20"
                            : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon
                            className={`w-4 h-4 shrink-0 ${
                              isActive ? "text-white" : "text-slate-400"
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-sky-500/15 text-sky-200 border border-sky-500/20"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Sidebar Footer */}
        <DashboardSidebarFooter />
      </aside>
    </>
  );
}
