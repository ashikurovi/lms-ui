"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import CourseCard, { CourseCardItem } from "../courses/CourseCard";
import ScrollReveal from "@/components/common/ScrollReveal";
import { ArrowRight, Layers } from "lucide-react";
import { batchesApi } from "@/services/api";
import { categoryApi } from "@/services/api/categoryApi";

interface BatchItemWithCategory extends CourseCardItem {
  categoryId?: string;
  categoryName?: string;
}

interface ApiCategory {
  id: string;
  name: string;
}

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<BatchItemWithCategory[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);

        // 1. Fetch categories directly from the API
        let apiCategories: ApiCategory[] = [];
        try {
          const catRes = await categoryApi.getAllCategories({ limit: 50 });
          if (catRes.statusCode === 200 && catRes.data?.items?.length) {
            apiCategories = catRes.data.items.map((c) => ({
              id: c.id,
              name: c.name,
            }));
          }
        } catch (catErr) {
          console.error("Failed to fetch course categories:", catErr);
        }

        // 2. Fetch batches directly from the API
        const res = await batchesApi.getAllBatches({ limit: 50 });
        if (!isMounted) return;

        let items: BatchItemWithCategory[] = [];

        if (res.statusCode === 200 && res.data?.items?.length) {
          items = res.data.items
            .filter((b: any) => !b.deleted_at && b.status?.toLowerCase() !== "completed")
            .map((b: any) => {
              const c = b.course || {};
              const price = Number(b.price) || 16000;
              const discountPrice = Number(b.discount_price) || price;
              const catId = c.category?.id || c.category_id || "";
              const catName = c.category?.name || "";

              // Dynamically register any category from batch if not already present
              if (
                catName &&
                !apiCategories.some((ac) => ac.id === catId || ac.name.toLowerCase() === catName.toLowerCase())
              ) {
                apiCategories.push({ id: catId || catName, name: catName });
              }

              return {
                id: c.slug || b.code || b.id,
                title: b.name || c.title || "Live Batch",
                tag: catName.toUpperCase() || c.level?.toUpperCase() || "BATCH",
                discount: price > discountPrice ? `৳${(price - discountPrice).toLocaleString()} OFF` : "",
                badge: b.status ? b.status.charAt(0).toUpperCase() + b.status.slice(1) : "Live Batch",
                duration: `Duration: ${c.duration || 3} ${c.duration_unit || "Months"}`,
                price: discountPrice.toLocaleString(),
                originalPrice: price.toLocaleString(),
                image:
                  c.thumbnail && c.thumbnail.startsWith("http") && !c.thumbnail.includes("example.com")
                    ? c.thumbnail
                    : "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
                categoryId: catId,
                categoryName: catName,
                registrationEnd: b.registration_end,
              };
            });
        }

        // Fallback to courses directly from API if no batches exist
        if (!items.length) {
          const { coursesApi } = await import("@/services/api");
          const cRes = await coursesApi.getAllCourses({ limit: 50 });
          if (cRes.statusCode === 200 && cRes.data?.items?.length) {
            items = cRes.data.items.map((c: any) => {
              const price = Number(c.price) || 16000;
              const discountPrice = Number(c.discount_price) || price;
              const catId = c.category?.id || c.category_id || "";
              const catName = c.category?.name || "";

              if (
                catName &&
                !apiCategories.some((ac) => ac.id === catId || ac.name.toLowerCase() === catName.toLowerCase())
              ) {
                apiCategories.push({ id: catId || catName, name: catName });
              }

              return {
                id: c.slug || c.id,
                title: c.title,
                tag: catName.toUpperCase() || c.level?.toUpperCase() || "COURSE",
                discount: price > discountPrice ? `৳${(price - discountPrice).toLocaleString()} OFF` : "",
                badge: c.level ? c.level.charAt(0).toUpperCase() + c.level.slice(1) : "Course",
                duration: `Duration: ${c.duration || 3} ${c.duration_unit || "Months"}`,
                price: discountPrice.toLocaleString(),
                originalPrice: price.toLocaleString(),
                image:
                  c.thumbnail && c.thumbnail.startsWith("http") && !c.thumbnail.includes("example.com")
                    ? c.thumbnail
                    : "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
                categoryId: catId,
                categoryName: catName,
              };
            });
          }
        }

        // Only display categories that contain active non-completed batches/courses
        const activeCategories = apiCategories.filter((cat) =>
          items.some(
            (b) =>
              b.categoryId === cat.id ||
              (b.categoryName && b.categoryName.toLowerCase() === cat.name.toLowerCase())
          )
        );

        setCategories(activeCategories);
        setCourses(items);
      } catch (err) {
        console.error("Error fetching batches/categories from API:", err);
        setCourses([]);
        setCategories([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter courses strictly by the API category tab
  const filteredCourses = useMemo(() => {
    if (activeTab === "all") return courses;
    return courses.filter(
      (c) =>
        c.categoryId === activeTab ||
        (c.categoryName && c.categoryName.toLowerCase() === activeTab.toLowerCase())
    );
  }, [courses, activeTab]);

  return (
    <section className="bg-white transition-all pt-14 sm:pt-20 pb-16 sm:pb-24 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* ==================== SECTION TITLE (Matching Reference Image Header) ==================== */}
        <ScrollReveal direction="up" duration={500} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-[#0077b6] text-xs font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#0077b6]" />
              <span>Specialized Training & Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#0B2B56] tracking-tight">
              Our Services & Courses
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal">
              Industry-standard BIM modeling and workforce training across Architectural, Structural, and MEPF engineering.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#0B2B56] text-[#0B2B56] hover:bg-[#0B2B56] hover:text-white text-xs sm:text-sm font-bold transition-all duration-200"
            >
              <span>Explore All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* ==================== API CATEGORY TABS ==================== */}
        {categories.length > 0 && (
          <ScrollReveal direction="up" duration={450} delay={100}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8 sm:mt-10">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === "all"
                    ? "bg-[#0B2B56] text-white shadow-lg shadow-[#0B2B56]/25 scale-105"
                    : "bg-slate-100/90 hover:bg-sky-50 text-slate-600 hover:text-[#0B2B56] border border-transparent hover:border-sky-200"
                }`}
              >
                All Batches ({courses.length})
              </button>

              {categories.map((cat) => {
                const isActive = activeTab === cat.id;
                const count = courses.filter(
                  (c) =>
                    c.categoryId === cat.id ||
                    (c.categoryName && c.categoryName.toLowerCase() === cat.name.toLowerCase())
                ).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#0B2B56] text-white shadow-lg shadow-[#0B2B56]/25 scale-105"
                        : "bg-slate-100/90 hover:bg-sky-50 text-slate-600 hover:text-[#0B2B56] border border-transparent hover:border-sky-200"
                    }`}
                  >
                    {cat.name} {count > 0 ? `(${count})` : ""}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        )}

        {/* ==================== BATCHES GRID (API DATA ONLY) ==================== */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 sm:mt-12">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4 animate-pulse shadow-xs"
              >
                <div className="h-48 bg-slate-200 rounded-2xl w-full" />
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-6 bg-slate-200 rounded w-4/5" />
                <div className="h-8 bg-slate-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200/80 mt-10 p-8">
            <Layers className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-800">No Batches Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              There are currently no active batches in this category.
            </p>
            {activeTab !== "all" && (
              <button
                onClick={() => setActiveTab("all")}
                className="mt-4 px-4 py-2 rounded-xl bg-[#0B2B56] text-white text-xs font-bold hover:bg-[#0077b6] transition-colors"
              >
                View All Batches
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 sm:mt-12">
            {filteredCourses.map((course, idx) => (
              <ScrollReveal
                key={course.id || idx}
                direction="up"
                delay={(idx % 3) * 100}
                duration={550}
              >
                <CourseCard course={course} />
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* ==================== BOTTOM VIEW ALL LINK ==================== */}
        <div className="text-center mt-12 sm:mt-14">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0B2B56] hover:bg-[#0077b6] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-xl transition-all duration-200 group"
          >
            <span>Explore All Specialized Courses</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
