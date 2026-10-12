"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Loader2, BookOpen, ArrowRight } from "lucide-react";
import { blogsApi, BlogItem } from "@/services/api";

function getExcerpt(content?: string, length = 135): string {
  if (!content) return "";
  const plain = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return plain.length > length ? plain.slice(0, length) + "..." : plain;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "Recently Published";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await blogsApi.getAllBlogs();
        if ((res.statusCode === 200 || res.statusCode === 201) && res.data) {
          const items = Array.isArray(res.data)
            ? res.data
            : ((res.data as unknown as { items?: BlogItem[] })?.items || []);
          setBlogs(items);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8 sm:space-y-10">
        {/* Breadcrumb */}
        <div className="text-xs sm:text-sm text-slate-400 font-medium">
          <Link href="/" className="hover:text-slate-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700 font-semibold">Blogs</span>
        </div>

        {/* Page Title */}
        <div className="text-center pt-2 pb-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002b5b] tracking-tight">
            Engineering & BIM Blogs
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-2 max-w-2xl mx-auto">
            Latest industry insights, technical guides, AEC best practices, and BIM tutorials
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-8">
            <div className="flex items-center justify-center py-10 gap-3 text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin text-[#0077b6]" />
              <span className="text-sm font-medium">Loading articles...</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4 animate-pulse"
                >
                  <div className="w-full h-48 bg-slate-200 rounded-xl" />
                  <div className="w-20 h-4 bg-slate-200 rounded-md" />
                  <div className="w-3/4 h-5 bg-slate-200 rounded-md" />
                  <div className="w-full h-12 bg-slate-100 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && blogs.length === 0 && (
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              No Blog Articles Found
            </h3>
            <p className="text-sm text-slate-500">
              Technical articles and guides are being prepared. Please check back soon or browse our available courses.
            </p>
            <div className="pt-2">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#0077b6] hover:bg-[#005f92] text-white text-xs font-bold transition-colors"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        )}

        {/* Blog Cards Grid */}
        {!loading && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogs.map((blog) => {
              const category = blog.category || "Engineering";
              const shortDesc = blog.seoDescription || getExcerpt(blog.content);
              const displayTitle = blog.seoTitle || blog.title;

              return (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.id}`}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 cursor-pointer"
                >
                  <div>
                    {/* Image */}
                    <div className="relative h-52 sm:h-56 w-full bg-slate-900 overflow-hidden">
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
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[#0077b6] font-bold text-[11px] tracking-wider uppercase shadow-xs">
                          {category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formatDate(blog.createdAt || blog.updatedAt)}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#0077b6] transition-colors line-clamp-2">
                        {displayTitle}
                      </h3>

                      {shortDesc && (
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {shortDesc}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom Read More CTA */}
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-[#0077b6] group-hover:text-[#002b5b] transition-colors">
                      Read Article
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0077b6] group-hover:bg-[#0077b6] group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
