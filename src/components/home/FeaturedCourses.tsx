"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CourseCard, { CourseCardItem } from "../courses/CourseCard";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<CourseCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { batchesApi } = await import("@/services/api");
        const res = await batchesApi.getAllBatches({ limit: 12 });
        if (!isMounted) return;

        let items: CourseCardItem[] = [];

        if (res.statusCode === 200 && res.data?.items?.length) {
          items = res.data.items
            .filter((b: any) => b.status === "ongoing")
            .map((b: any) => {
              const c = b.course || {};
              const price = b.price || 16000;
              const discountPrice = b.discount_price || 12000;
              return {
                id: c.slug || b.code || b.id,
                title: b.name || c.title,
                tag: c.level?.toUpperCase() || "BIM",
                discount: `৳${price - discountPrice} OFF`,
                badge: c.level || "Professional",
                duration: `Duration: ${c.duration || 3} ${c.duration_unit || "Months"}`,
                price: discountPrice.toLocaleString(),
                originalPrice: price.toLocaleString(),
                image:
                  c.thumbnail ||
                  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
                registrationEnd: b.registration_end,
              };
            });
        }

        // Fallback to courses if no active batches exist
        if (!items.length) {
          const { coursesApi } = await import("@/services/api");
          const cRes = await coursesApi.getAllCourses({ limit: 12 });
          if (cRes.statusCode === 200 && cRes.data?.items?.length) {
            items = cRes.data.items.map((c: any) => ({
              id: c.slug || c.id,
              title: c.title,
              tag: c.level?.toUpperCase() || "BIM",
              discount: c.discount_price ? `৳${c.price - c.discount_price} OFF` : "-30%",
              badge: c.level || "Professional",
              duration: `Duration: ${c.duration || 3} ${c.duration_unit || "Months"}`,
              price: (c.discount_price || c.price || 12000).toLocaleString(),
              originalPrice: ((c.price || 16000) * 1.25).toLocaleString(),
              image:
                c.thumbnail ||
                "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
            }));
          }
        }

        setCourses(items);
      } catch {
        // Fallback
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      className={`bg-white transition-all ${courses.length > 0 ? "pt-14 sm:pt-18 pb-12 sm:pb-16" : "pt-12 sm:pt-14 pb-2 sm:pb-3"
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollReveal direction="up" duration={500} className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002b5b] tracking-tight">
            Explore All Batches
          </h2>
        </ScrollReveal>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 sm:mt-12">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 animate-pulse"
              >
                <div className="h-48 bg-slate-200 rounded-xl w-full" />
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-6 bg-slate-200 rounded w-4/5" />
                <div className="h-8 bg-slate-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 sm:mt-12">
            {courses.map((course, idx) => (
              <ScrollReveal
                key={course.id}
                direction="up"
                delay={(idx % 3) * 100}
                duration={550}
              >
                <CourseCard course={course} />
              </ScrollReveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
