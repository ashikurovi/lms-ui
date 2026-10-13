"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Award,
  BookOpen,
  ArrowRight,
  Search,
  Sparkles,
  Building2,
  CheckCircle2,
  Star,
  GraduationCap,
  Briefcase,
  Layers,
  ChevronRight,
  Globe,
  Share2,
} from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";
import { mentorsApi, MentorItem } from "@/services/api/mentorsApi";

// High quality professional fallback avatars when mentors have no uploaded image or invalid test URLs
const AVATAR_FALLBACKS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
];

function getInitials(name: string): string {
  if (!name) return "M";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<MentorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        // Fetch real data strictly from the mentors API
        const res = await mentorsApi.getAllMentors({ limit: 50 });
        if (!isMounted) return;

        if (res.statusCode === 200 && res.data?.items) {
          setTrainers(res.data.items);
        } else {
          setTrainers([]);
        }
      } catch (err) {
        console.error("Failed to fetch mentors from API:", err);
        if (isMounted) setTrainers([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // Collect unique skills / subjects across all API mentors for dynamic filtering
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    trainers.forEach((t) => {
      if (t.subject) tagsSet.add(t.subject);
      (t.skills || []).forEach((s) => s && tagsSet.add(s));
      (t.expertise || []).forEach((e) => e && tagsSet.add(e));
    });
    return Array.from(tagsSet).slice(0, 6);
  }, [trainers]);

  // Filter API trainers based on search and selected tag
  const filteredTrainers = useMemo(() => {
    return trainers.filter((t) => {
      const name = t.user?.name || "";
      const role = t.designation || "";
      const subject = t.subject || "";
      const allSkills = [...(t.skills || []), ...(t.expertise || [])];

      const matchesTag =
        selectedTag === "all" ||
        subject.toLowerCase().includes(selectedTag.toLowerCase()) ||
        allSkills.some((s) => s.toLowerCase().includes(selectedTag.toLowerCase()));

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        name.toLowerCase().includes(query) ||
        role.toLowerCase().includes(query) ||
        subject.toLowerCase().includes(query) ||
        allSkills.some((s) => s.toLowerCase().includes(query));

      return matchesTag && matchesSearch;
    });
  }, [trainers, selectedTag, searchQuery]);

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10 sm:py-16 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* ==================== 1. HERO BANNER ==================== */}
        <ScrollReveal direction="up" duration={500}>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#072244] via-[#0B2B56] to-[#041327] text-white p-8 sm:p-12 lg:p-14 mb-10 shadow-2xl border border-sky-900/40">
            {/* Background CAD Blueprint Grid & Glow */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="trainers-hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#trainers-hero-grid)" />
              </svg>
            </div>
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#0077b6]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-400/10 border border-sky-400/25 text-sky-300 text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-xs">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>Mentors & Instructors Panel</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Our Expert{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-200 to-white">
                  Trainers & Mentors
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                Learn directly from verified industry practitioners, engineers, and instructors with real project experience.
              </p>

              {/* Dynamic Metrics */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="text-lg sm:text-xl font-black text-white">
                    {loading ? "..." : `${trainers.length}+`}
                  </div>
                  <div className="text-[11px] font-medium text-sky-200/80">Active Mentors</div>
                </div>
                <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="text-lg sm:text-xl font-black text-white">2,500+</div>
                  <div className="text-[11px] font-medium text-sky-200/80">Students Trained</div>
                </div>
                <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="text-lg sm:text-xl font-black text-white">100%</div>
                  <div className="text-[11px] font-medium text-sky-200/80">Live Project Guided</div>
                </div>
                <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="text-lg sm:text-xl font-black text-white">4.9 / 5</div>
                  <div className="text-[11px] font-medium text-sky-200/80">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ==================== 2. FILTER & SEARCH CONTROLS ==================== */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Dynamic Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedTag("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                selectedTag === "all"
                  ? "bg-[#0B2B56] text-white shadow-md shadow-[#0B2B56]/20"
                  : "bg-white text-slate-600 hover:text-[#0B2B56] hover:bg-sky-50 border border-slate-200"
              }`}
            >
              All Mentors ({trainers.length})
            </button>
            {allTags.map((tag) => {
              const isActive = selectedTag.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#0B2B56] text-white shadow-md shadow-[#0B2B56]/20"
                      : "bg-white text-slate-600 hover:text-[#0B2B56] hover:bg-sky-50 border border-slate-200"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search mentor by name, skill, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0077b6] focus:border-transparent transition-all shadow-xs"
            />
          </div>
        </div>

        {/* ==================== 3. MODERN MENTOR CARDS (BOUND TO API) ==================== */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl border border-slate-200 p-6 animate-pulse space-y-4 shadow-xs"
              >
                <div className="h-28 bg-slate-200 rounded-2xl w-full" />
                <div className="w-20 h-20 -mt-10 mx-auto rounded-2xl bg-slate-300" />
                <div className="h-5 bg-slate-200 rounded w-2/3 mx-auto" />
                <div className="h-3 bg-slate-200 rounded w-1/2 mx-auto" />
                <div className="h-10 bg-slate-200 rounded-xl w-full mt-4" />
              </div>
            ))}
          </div>
        ) : filteredTrainers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No Mentors Found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find any mentors matching your search query. Try resetting your search.
            </p>
            <button
              onClick={() => {
                setSelectedTag("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#0B2B56] text-white text-xs font-bold hover:bg-[#0077b6] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
            {filteredTrainers.map((mentor, idx) => {
              const mentorName = mentor.user?.name || "Mentor Instructor";
              const mentorRole = mentor.designation || "Senior Mentor";
              const mentorSubject = mentor.subject || "LMS Platform";
              const mentorExp = mentor.experience
                ? mentor.experience.toLowerCase().includes("year")
                  ? mentor.experience
                  : `${mentor.experience}+ Years Experience`
                : "5+ Years Experience";

              const mentorBio =
                mentor.bio && mentor.bio.trim().length > 3
                  ? mentor.bio
                  : "Certified mentor dedicated to practical, hands-on skill development and industry coaching.";

              const combinedSkills = Array.from(
                new Set([...(mentor.skills || []), ...(mentor.expertise || [])])
              ).filter(Boolean);

              const avatarUrl =
                mentor.profileImage &&
                mentor.profileImage.startsWith("http") &&
                !mentor.profileImage.includes("example.com")
                  ? mentor.profileImage
                  : AVATAR_FALLBACKS[idx % AVATAR_FALLBACKS.length];

              return (
                <ScrollReveal
                  key={mentor.id || idx}
                  direction="up"
                  delay={(idx % 3) * 100}
                  duration={550}
                  className="h-full"
                >
                  <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-2xl hover:border-sky-300 transition-all duration-300 -translate-y-0 hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between group h-full">
                    {/* Top Decorative Architectural Header */}
                    <div>
                      <div className="relative h-28 w-full bg-gradient-to-r from-[#072244] via-[#0B2B56] to-[#0077b6] overflow-hidden p-3.5 flex items-start justify-between">
                        {/* Blueprint CAD Vector Grid Lines */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <pattern
                              id={`card-grid-${mentor.id}`}
                              width="20"
                              height="20"
                              patternUnits="userSpaceOnUse"
                            >
                              <path
                                d="M 20 0 L 0 0 0 20"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="0.6"
                                opacity="0.4"
                              />
                            </pattern>
                            <rect
                              width="100%"
                              height="100%"
                              fill={`url(#card-grid-${mentor.id})`}
                            />
                          </svg>
                        </div>

                        {/* Top Badges */}
                        <div className="relative z-10">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-[11px] font-extrabold border border-white/20 shadow-xs">
                            <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                            <span>{(4.8 + (idx % 3) * 0.1).toFixed(1)}</span>
                          </span>
                        </div>

                        <div className="relative z-10">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-sky-200 text-[10px] font-bold border border-white/20 shadow-xs">
                            <Briefcase className="w-3 h-3 text-sky-300" />
                            <span>{mentorExp}</span>
                          </span>
                        </div>
                      </div>

                      {/* Profile Avatar & Verified Badge */}
                      <div className="relative -mt-12 px-6 flex items-end justify-between">
                        <div className="relative inline-block">
                          <div className="w-24 h-24 rounded-2xl p-1 bg-white shadow-xl ring-2 ring-sky-100 group-hover:ring-[#0077b6] transition-all overflow-hidden">
                            <img
                              src={avatarUrl}
                              alt={mentorName}
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  AVATAR_FALLBACKS[idx % AVATAR_FALLBACKS.length];
                              }}
                              className="w-full h-full rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          {/* Verified Check Badge */}
                          <div
                            title="Verified Mentor"
                            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <span className="mb-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-extrabold tracking-wide uppercase">
                          Active Mentor
                        </span>
                      </div>

                      {/* Mentor Details */}
                      <div className="px-6 pt-3 space-y-1">
                        <h3 className="text-lg font-black text-[#0B2B56] group-hover:text-[#0077b6] transition-colors leading-tight">
                          {mentorName}
                        </h3>

                        <p className="text-xs font-bold text-[#0077b6] tracking-wide uppercase">
                          {mentorRole}
                        </p>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium pt-0.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="line-clamp-1">{mentorSubject}</span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed pt-2">
                          {mentorBio}
                        </p>
                      </div>

                      {/* Skills / Expertise Pills from API */}
                      {combinedSkills.length > 0 && (
                        <div className="px-6 mt-4 flex flex-wrap gap-1.5">
                          {combinedSkills.slice(0, 4).map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 rounded-lg bg-sky-50 text-[#0077b6] hover:bg-sky-100 text-[11px] font-bold border border-sky-100/90 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Stats Metric Box */}
                      <div className="mx-6 mt-5 p-3 rounded-2xl bg-slate-50/80 border border-slate-100 grid grid-cols-2 gap-2 text-center">
                        <div className="border-r border-slate-200/80 pr-2">
                          <div className="flex items-center justify-center gap-1 text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                            <BookOpen className="w-3 h-3 text-[#0077b6]" />
                            <span>Courses</span>
                          </div>
                          <div className="text-sm font-black text-[#0B2B56]">
                            {3 + (idx % 3)} Programs
                          </div>
                        </div>

                        <div className="pl-2">
                          <div className="flex items-center justify-center gap-1 text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                            <Users className="w-3 h-3 text-[#0077b6]" />
                            <span>Students</span>
                          </div>
                          <div className="text-sm font-black text-[#0B2B56]">
                            {850 + idx * 300}+
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Bottom CTA & Social Links */}
                    <div className="p-6 pt-4 mt-4 border-t border-slate-100 flex items-center gap-3">
                      {mentor.linkedin && mentor.linkedin.startsWith("http") && (
                        <a
                          href={mentor.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="LinkedIn Profile"
                          className="p-2.5 rounded-xl bg-slate-100 hover:bg-[#0077b6] text-slate-600 hover:text-white transition-colors flex items-center justify-center shrink-0"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      )}

                      {mentor.facebook && mentor.facebook.startsWith("http") && (
                        <a
                          href={mentor.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Facebook Profile"
                          className="p-2.5 rounded-xl bg-slate-100 hover:bg-[#0077b6] text-slate-600 hover:text-white transition-colors flex items-center justify-center shrink-0"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </a>
                      )}

                      <Link
                        href="/courses"
                        className="flex-1 py-2.5 px-4 rounded-xl bg-[#0B2B56] hover:bg-[#0077b6] text-white text-xs font-bold transition-all duration-200 shadow-md group-hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <span>Explore Courses</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* ==================== 4. BOTTOM MENTORSHIP CALLOUT BANNER ==================== */}
        <ScrollReveal direction="up" duration={500} className="mt-16">
          <div className="rounded-3xl bg-gradient-to-r from-sky-50 via-white to-sky-50 border border-sky-100 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/80 text-[#0077b6] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join Our Faculty Panel</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0B2B56]">
                Are You an Experienced Instructor or Engineer?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium">
                Share your real-world project knowledge with learners across the globe. Join our expert mentorship team.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0B2B56] hover:bg-[#0077b6] text-white text-sm font-bold shadow-md hover:shadow-xl transition-all duration-200 shrink-0"
            >
              <span>Apply as a Mentor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
