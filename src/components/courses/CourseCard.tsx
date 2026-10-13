"use client";

import React from "react";
import Link from "next/link";

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

import { Clock, ArrowRight } from "lucide-react";

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
        setTimeLeft("Registration Closed");
        setIsEndingSoon(true);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setIsEndingSoon(days < 3); // Highlight in red if less than 3 days

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

  return (
    <Link href={`/courses/${course.id}`} className="block group">
      <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full">
        {/* Image Container */}
        <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3.5 left-3.5">
            <span className="bg-[#0B2B56] text-white px-3 py-1 text-[11px] font-extrabold rounded-lg uppercase tracking-wider shadow-md">
              {course.tag}
            </span>
          </div>
          <div className="absolute top-3.5 right-3.5">
            <span className="bg-gradient-to-r from-rose-500 to-red-600 px-3 py-1 text-[11px] font-black text-white rounded-lg shadow-md">
              {course.discount}
            </span>
          </div>

          {/* Registration Countdown Banner */}
          {timeLeft && (
            <div className={`absolute bottom-0 left-0 right-0 py-2 px-4 backdrop-blur-md border-t border-white/20 flex items-center justify-center gap-2 ${isEndingSoon ? 'bg-rose-500/95 text-white' : 'bg-slate-900/90 text-sky-300'}`}>
              <Clock className={`w-3.5 h-3.5 ${isEndingSoon ? 'animate-pulse' : ''}`} />
              <span className="text-[11px] font-extrabold tracking-wide uppercase">
                Ends In: {timeLeft}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#0B2B56] bg-sky-100/80 border border-sky-200/80 px-2.5 py-1 rounded-md">
                {course.badge}
              </span>
              <span className="font-semibold text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {course.duration.replace("Duration: ", "")}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-[#0B2B56] line-clamp-2 group-hover:text-[#0077b6] transition-colors leading-snug min-h-[46px]">
              {course.title}
            </h3>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-[#0B2B56]">
                ৳{course.price}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-400 line-through">
                ৳{course.originalPrice}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0B2B56] group-hover:bg-[#0077b6] group-hover:shadow-md transition-all duration-200 shadow-xs">
              <span>Enroll</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
