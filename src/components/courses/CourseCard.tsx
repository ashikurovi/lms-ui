"use client";

import React from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

export interface CourseCardItem {
  id: string;
  title: string;
  tag: string;
  discount: string;
  badge: string;
  duration: string;
  price: string;
  originalPrice: string;
  image: string;
  category?: string;
  registrationEnd?: string;
}

function formatPrice(val: string | number | undefined): string {
  if (!val) return "0";
  const str = String(val).trim();
  const cleaned = str.replace(/\.00$/, "");
  const num = Number(cleaned.replace(/,/g, ""));
  if (!isNaN(num) && num > 0) {
    return num.toLocaleString();
  }
  return cleaned;
}

function formatDuration(val: string | undefined): string {
  if (!val) return "";
  let clean = val.replace(/^Duration:\s*/i, "").trim();
  clean = clean.replace(/(\d+)\.00(\s*hours|\s*hrs|\s*h|\s*months|\s*days)?/i, "$1$2");
  return clean;
}

export default function CourseCard({ course }: { course: CourseCardItem }) {
  const [timeLeft, setTimeLeft] = React.useState<string | null>(null);
  const [isEndingSoon, setIsEndingSoon] = React.useState(false);

  React.useEffect(() => {
    if (!course.registrationEnd) return;
    const updateCountdown = () => {
      const end = new Date(course.registrationEnd!).getTime();
      const now = new Date().getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeLeft("Closed");
        setIsEndingSoon(true);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setIsEndingSoon(days < 3);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h left`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m left`);
      } else {
        setTimeLeft(`${minutes}m ${seconds}s left`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [course.registrationEnd]);

  const hasDiscount =
    course.originalPrice &&
    formatPrice(course.originalPrice) !== formatPrice(course.price);

  return (
    <Link href={`/courses/${course.id}`} className="block group h-full">
      <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full">
        {/* Thumbnail Container */}
        <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100 shrink-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Top Left Tag */}
          {course.tag && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-[#072244]/95 backdrop-blur-md text-white px-2.5 py-1 text-[10px] sm:text-[11px] font-extrabold rounded-lg uppercase tracking-wider shadow-md border border-white/10">
                {course.tag}
              </span>
            </div>
          )}

          {/* Top Right Discount Badge */}
          {course.discount && (
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-gradient-to-r from-rose-500 to-red-600 px-2.5 py-1 text-[10px] sm:text-[11px] font-black text-white rounded-lg shadow-md tracking-tight">
                {course.discount}
              </span>
            </div>
          )}

          {/* Bottom Countdown Banner */}
          {timeLeft && (
            <div
              className={`absolute bottom-0 left-0 right-0 py-1.5 px-3 backdrop-blur-md border-t border-white/10 flex items-center justify-center gap-1.5 z-10 ${
                isEndingSoon
                  ? "bg-rose-600/95 text-white"
                  : "bg-[#072244]/90 text-sky-300"
              }`}
            >
              <Clock className={`w-3 h-3 ${isEndingSoon ? "animate-pulse" : ""}`} />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
                Ends In: {timeLeft}
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3">
          {/* Top Meta & Title */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-bold text-[#072244] bg-sky-50 border border-sky-200/80 px-2.5 py-0.5 rounded-md text-[11px] sm:text-xs capitalize">
                {course.badge}
              </span>
              <span className="font-medium text-slate-500 flex items-center gap-1 text-[11px] sm:text-xs shrink-0">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatDuration(course.duration)}</span>
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-extrabold text-[#072244] line-clamp-2 group-hover:text-sky-600 transition-colors leading-snug min-h-[40px] sm:min-h-[44px]">
              {course.title}
            </h3>
          </div>

          {/* Bottom Price & Enroll Action */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <div className="min-w-0 flex flex-col justify-center">
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <span className="text-lg sm:text-xl font-black text-[#072244] tracking-tight">
                  ৳{formatPrice(course.price)}
                </span>
                {hasDiscount && (
                  <span className="text-xs font-semibold text-slate-400 line-through">
                    ৳{formatPrice(course.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="shrink-0 inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#072244] group-hover:bg-[#0077b6] group-hover:shadow-md transition-all duration-200 shadow-xs">
              <span>Enroll</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
