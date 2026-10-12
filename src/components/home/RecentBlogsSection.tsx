"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { blogsApi } from "@/services/api/blogsApi";
import ScrollReveal from "@/components/common/ScrollReveal";

const FALLBACK_BLOGS = [
  {
    id: "bim-lod-complete-guide",
    title: "BIM LOD (Level of Development) — Complete Guide (LOD 100–500)",
    category: "BIM & AEC",
    seoDescription:
      "A comprehensive guide to LOD standards in architectural modeling and structural engineering coordination from LOD 100 to 500.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: "tekla-structures-steel-detailing",
    title: "Tekla Structures in Modern Steel Detailing & Fabrication",
    category: "Structural Engineering",
    seoDescription:
      "Explore how parametric 3D modeling and automated shop drawings reduce fabrication errors and accelerate project timelines.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: "revit-clash-detection-navisworks",
    title: "Clash Detection Workflows using Revit & Navisworks Manage",
    category: "Coordination",
    seoDescription:
      "Master MEP, architectural, and structural coordination matrices to resolve costly site clashes before construction.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date().toISOString(),
  },
];

const getExcerpt = (html?: string, maxLength: number = 120) => {
  if (!html) return "";
  const text = html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

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
  const [recentBlogs, setRecentBlogs] = useState<any[]>(FALLBACK_BLOGS);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await blogsApi.getAllBlogs();
        if ((res.statusCode === 200 || res.statusCode === 201) && res.data) {
          const items = Array.isArray(res.data)
            ? res.data
            : ((res.data as unknown as { items?: any[] })?.items || []);
          if (items && items.length > 0) {
            setRecentBlogs(items.slice(0, 3));
          }
        }
      } catch (err) {
        console.error("Failed to fetch blogs for landing page:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={500} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#0077b6] text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Industry Insights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002b5b] tracking-tight">
              Recent Engineering & BIM Blogs
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-xl">
              Stay ahead with expert tutorials, industry best practices, and career advice from leading BIM & civil engineering professionals.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0077b6] hover:text-[#002b5b] group transition-colors shrink-0"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>

        {/* 3-Column Recent Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {recentBlogs.map((blog, idx) => {
            const shortDesc =
              blog.seoDescription ||
              getExcerpt(blog.content) ||
              "Discover actionable insights, modeling standards, and practical industry workflows.";
            const displayTitle = blog.seoTitle || blog.title;
            const categoryName = blog.category || "Engineering & BIM";

            return (
              <ScrollReveal
                key={blog.id}
                direction="up"
                delay={(idx % 3) * 100}
                duration={550}
                className="h-full"
              >
                <Link
                  href={`/blog/${blog.id}`}
                  className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 cursor-pointer h-full"
                >
                  <div>
                    {/* Inset Framed Image with Category Badge */}
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-xs">
                      <img
                        src={
                          blog.image ||
                          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                        }
                        alt={blog.title}
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";
                        }}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md text-[#0077b6] font-extrabold text-[11px] tracking-wider uppercase shadow-xs">
                          {categoryName}
                        </span>
                      </div>
                    </div>

                    {/* Meta Row: Date */}
                    <div className="pt-5 flex items-center gap-2 text-xs font-semibold text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatDate(blog.createdAt || blog.updatedAt)}</span>
                    </div>

                    {/* Blog Title */}
                    <h3 className="mt-2.5 text-base sm:text-lg font-extrabold text-[#002b5b] group-hover:text-[#0077b6] transition-colors line-clamp-2 leading-snug">
                      {displayTitle}
                    </h3>

                    {/* SEO Short Description */}
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {shortDesc}
                    </p>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-[#0077b6] transition-colors">
                      Read Full Article
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0077b6] group-hover:bg-[#0077b6] group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
