"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { blogsApi } from "@/services/api/blogsApi";
import ScrollReveal from "@/components/common/ScrollReveal";

const FALLBACK_BLOGS = [
  {
    id: "bim-lod-complete-guide",
    title: "BIM LOD (Level of Development) — Complete Guide (LOD 100–500)",
    category: "BIM & AEC",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: "tekla-structures-steel-detailing",
    title: "Tekla Structures in Modern Steel Detailing & Fabrication",
    category: "Structural Engineering",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: "revit-clash-detection-navisworks",
    title: "Clash Detection Workflows using Revit & Navisworks Manage",
    category: "Coordination",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: "mepf-coordination-matrix",
    title: "Comprehensive MEPF Coordination Matrix for High-Rise Projects",
    category: "MEP Engineering",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date().toISOString(),
  },
];

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "Recent";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Recent";
  }
};

export default function RecentBlogsSection() {
  const [blogs, setBlogs] = useState<any[]>(FALLBACK_BLOGS);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await blogsApi.getAllBlogs();
        if ((res.statusCode === 200 || res.statusCode === 201) && res.data) {
          const items = Array.isArray(res.data)
            ? res.data
            : ((res.data as unknown as { items?: any[] })?.items || []);
          if (items && items.length > 0) {
            setBlogs(items);
          }
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, blogs.length - 3) : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 3 >= blogs.length ? 0 : prev + 1));
  };

  return (
    <section className="py-20 lg:py-28 bg-white font-sans border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10 sm:space-y-12">
        
        {/* Section Header matching Reference Screenshot */}
        <ScrollReveal direction="up" duration={500} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-[#0077b6] text-xs font-bold tracking-wider uppercase">
              <BookOpen className="w-3.5 h-3.5 text-[#0077b6]" />
              <span>Articles & Tutorials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#0B2B56] tracking-tight">
              Our Latest Blogs
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal">
              Practical guides, engineering insights, and industry best practices from leading BIM specialists.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Arrow Controls */}
            {blogs.length > 3 && (
              <div className="flex items-center gap-2 mr-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-sky-400 hover:text-[#0077b6] text-slate-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                  aria-label="Previous blogs"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-sky-400 hover:text-[#0077b6] text-slate-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                  aria-label="Next blogs"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#0B2B56] text-[#0B2B56] hover:bg-[#0B2B56] hover:text-white text-xs sm:text-sm font-bold transition-all duration-200"
            >
              <span>View All Blogs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.slice(0, 4).map((blog, idx) => (
            <ScrollReveal
              key={blog.id || idx}
              direction="up"
              delay={idx * 80}
              duration={500}
              className="h-full"
            >
              <Link
                href={`/blog/${blog.slug || blog.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 h-full"
              >
                {/* Thumbnail with Category Pill */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={blog.image || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#0B2B56] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                      {blog.category || "BIM"}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0B2B56] group-hover:text-[#0077b6] transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>
                  </div>

                  {/* Read More Link */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0077b6] group-hover:underline">
                      Read Article
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0077b6] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
