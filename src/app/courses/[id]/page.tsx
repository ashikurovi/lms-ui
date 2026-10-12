"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { batchesApi, BatchItem, reviewsApi } from "@/services/api";
import { getAuthToken } from "@/services/api/apiClient";
import Link from "next/link";
import {
  Clock,
  Calendar,
  Star,
  Check,
  Play,
  Lock,
  ChevronDown,
  User,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  BookOpen,
  Award,
  Video,
  MessageSquare,
} from "lucide-react";

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [batch, setBatch] = useState<BatchItem | any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"about" | "curriculum" | "instructors" | "reviews">("about");
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [playingLesson, setPlayingLesson] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [enrollError, setEnrollError] = useState("");
  const [paymentType, setPaymentType] = useState<"full" | "installment">("full");
  const [reviews, setReviews] = useState<any[]>([]);
  const [avgRating, setAvgRating] = useState(0);

  const enrollCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await batchesApi.getBatchById(id);
        if (!isMounted) return;
        if (res.statusCode === 200 && res.data) {
          setBatch(res.data);

          // Expand the first module by default
          if (res.data.course?.modules?.[0]) {
            const firstModId = res.data.course.modules[0].id || "mod-0";
            setExpandedModules([firstModId]);
          }

          // Fetch reviews
          const reviewRes = await reviewsApi.getAllReviews();
          if (reviewRes.statusCode === 200 && reviewRes.data) {
            const allReviews = reviewRes.data;
            const batchReviews = allReviews.filter(
              (r: any) => r.batch?.id === id || r.batch?.code === res.data?.code
            );
            setReviews(batchReviews);
            if (batchReviews.length > 0) {
              const avg =
                batchReviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
                batchReviews.length;
              setAvgRating(avg);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch batch details", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((m) => m !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleEnroll = () => {
    if (!termsAccepted) {
      setEnrollError("Please accept the Terms & Conditions to proceed.");
      if (enrollCardRef.current) {
        enrollCardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setEnrollError("");
    const token = getAuthToken();
    if (!token) {
      router.push(
        `/login?redirect=${encodeURIComponent(
          `/checkout/${batch.id || batch.code}?type=${paymentType}`
        )}`
      );
      return;
    }

    router.push(`/checkout/${batch.id || batch.code}?type=${paymentType}`);
  };

  const scrollToEnroll = () => {
    if (enrollCardRef.current) {
      enrollCardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-3 border-slate-200 border-t-[#0077b6]"></div>
          <span className="text-xs font-semibold text-slate-500">Loading course...</span>
        </div>
      </div>
    );
  }

  if (!batch || !batch.course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white flex-col space-y-4 px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Course Not Found</h2>
        <p className="text-sm text-slate-500">The requested course batch is not available.</p>
        <Link
          href="/courses"
          className="px-6 py-2.5 bg-[#0077b6] text-white font-semibold rounded-xl text-sm hover:bg-[#005a8c] transition-all"
        >
          Browse All Courses
        </Link>
      </div>
    );
  }

  const { course } = batch;
  const price = batch.price || 16000;
  const discountPrice = batch.discount_price || 12000;
  const currentPrice =
    paymentType === "full" ? discountPrice : Math.round(discountPrice / 2);
  const mentors = course.mentors || [];

  const getYoutubeVideoId = (url: string) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?\/\s]{11})/i
    );
    return match ? match[1] : null;
  };

  const youtubeId = getYoutubeVideoId(course.intro_video_url);

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-800 pb-24 lg:pb-16">
      
      {/* 1. Clean Top Header & Breadcrumb */}
      <div className="bg-white border-b border-slate-200/70 pt-6 pb-8">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-[#0077b6] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/courses" className="hover:text-[#0077b6] transition-colors">Courses</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold truncate max-w-xs">{course.title || batch.name}</span>
          </nav>

          {/* Title & Short Description */}
          <div className="max-w-4xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-[#0077b6] text-xs font-bold uppercase tracking-wider">
                {course.level || "Professional"}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">
                Batch: {batch.code}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{avgRating > 0 ? avgRating.toFixed(1) : "5.0"}</span>
                <span className="text-slate-400 font-normal">({reviews.length || 12})</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002b5b] tracking-tight leading-tight">
              {course.title || batch.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              {course.short_description ||
                course.description?.replace(/<[^>]+>/g, "").slice(0, 200) ||
                "Comprehensive, industry-standard BIM modeling and architecture curriculum with practical hands-on training."}
            </p>

            {/* Quick Meta Row */}
            <div className="flex flex-wrap items-center gap-5 pt-1 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{course.duration || "3"} {course.duration_unit || "Months"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Starts: {batch.start_date ? new Date(batch.start_date).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "Soon"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Video className="w-4 h-4 text-slate-400" />
                <span className="capitalize">{batch.mode || "Online Live"}</span>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Column (8 cols): Media, Navigation Tabs, and Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Video / Thumbnail Player */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-sm border border-slate-200/80">
              {youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title="Course Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                />
              ) : course.intro_video_url ? (
                <video
                  src={course.intro_video_url}
                  controls
                  className="w-full h-full object-cover"
                  poster={course.thumbnail}
                />
              ) : course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                  <Play className="w-10 h-10 text-slate-500 stroke-[1.5]" />
                  <span className="text-xs font-medium">Course Preview</span>
                </div>
              )}
            </div>

            {/* Segmented Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200/80 overflow-x-auto scrollbar-none pb-px">
              {[
                { id: "about", label: "About", icon: BookOpen },
                { id: "curriculum", label: `Curriculum (${course.modules?.length || 0})`, icon: Video },
                { id: "instructors", label: `Instructors (${mentors.length || 1})`, icon: User },
                { id: "reviews", label: `Reviews (${reviews.length})`, icon: MessageSquare },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "border-[#0077b6] text-[#0077b6]"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: About Course */}
            {activeTab === "about" && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#002b5b] mb-4">
                    Course Overview
                  </h2>
                  <div
                    className="prose max-w-none text-slate-700 leading-relaxed text-sm sm:text-[15px] break-words [&_img]:rounded-xl [&_img]:max-w-full [&_table]:w-full [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 font-normal"
                    dangerouslySetInnerHTML={{
                      __html: course.description || "<p>Detailed course outline is covered in the curriculum tab.</p>",
                    }}
                  />
                </div>

                {/* 4 Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-slate-100">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#0077b6] flex items-center justify-center shrink-0">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">Live Interactive Classes</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Real-time doubt clearing with mentors</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#0077b6] flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">Certificate of Completion</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Shareable industry-recognized certificate</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#0077b6] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">Lifetime Resource Access</h4>
                      <p className="text-xs text-slate-500 mt-0.5">HD recording backups & BIM family assets</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#0077b6] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">Project-Based Training</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Hands-on practice on real structural projects</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Curriculum Accordion */}
            {activeTab === "curriculum" && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h2 className="text-lg sm:text-xl font-bold text-[#002b5b]">
                    Curriculum Content
                  </h2>
                  <span className="text-xs font-semibold text-slate-500">
                    {course.modules?.length || 0} Modules
                  </span>
                </div>

                {course.modules && course.modules.length > 0 ? (
                  <div className="space-y-3">
                    {course.modules.map((mod: any, idx: number) => {
                      const modId = mod.id || `mod-${idx}`;
                      const isExpanded = expandedModules.includes(modId);
                      const totalLessons = mod.lessons?.length || 0;

                      return (
                        <div
                          key={modId}
                          className="border border-slate-200/80 rounded-xl overflow-hidden transition-all"
                        >
                          <button
                            onClick={() => toggleModule(modId)}
                            className={`w-full flex items-center justify-between p-4 text-left gap-3 transition-colors cursor-pointer ${
                              isExpanded ? "bg-slate-50" : "bg-white hover:bg-slate-50/60"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="w-7 h-7 rounded-lg bg-sky-50 text-[#0077b6] font-bold text-xs flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <div className="min-w-0">
                                <h4 className="text-sm font-bold text-slate-900 truncate">
                                  {mod.title || mod.name || `Module ${idx + 1}`}
                                </h4>
                                <span className="text-xs text-slate-400 font-medium">
                                  {totalLessons} {totalLessons === 1 ? "lesson" : "lessons"}
                                </span>
                              </div>
                            </div>

                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                                isExpanded ? "rotate-180 text-[#0077b6]" : ""
                              }`}
                            />
                          </button>

                          {isExpanded && mod.lessons && mod.lessons.length > 0 && (
                            <div className="divide-y divide-slate-100 bg-white border-t border-slate-100">
                              {mod.lessons.map((lesson: any, lIdx: number) => {
                                const isPlaying =
                                  playingLesson === (lesson.id || `lesson-${lIdx}`);
                                const lessonYoutubeId = getYoutubeVideoId(lesson.video_url);

                                return (
                                  <div
                                    key={lesson.id || lIdx}
                                    className={`p-3.5 sm:px-4 flex flex-col gap-2 ${
                                      lesson.is_preview
                                        ? "cursor-pointer hover:bg-sky-50/30"
                                        : "opacity-85"
                                    }`}
                                    onClick={() => {
                                      if (lesson.is_preview) {
                                        setPlayingLesson(
                                          isPlaying ? null : lesson.id || `lesson-${lIdx}`
                                        );
                                      }
                                    }}
                                  >
                                    <div className="flex items-center justify-between gap-3">
                                      <div className="flex items-center gap-2.5 min-w-0">
                                        {lesson.is_preview ? (
                                          <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 shrink-0" />
                                        ) : (
                                          <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        )}
                                        <span className="text-xs sm:text-sm font-medium text-slate-700 truncate">
                                          {lesson.title}
                                        </span>
                                      </div>

                                      {lesson.is_preview && (
                                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                                          Preview
                                        </span>
                                      )}
                                    </div>

                                    {/* Inline preview player */}
                                    {isPlaying && lesson.video_url && (
                                      <div
                                        className="mt-2 w-full aspect-video rounded-xl overflow-hidden bg-black shadow-md"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        {lessonYoutubeId ? (
                                          <iframe
                                            src={`https://www.youtube.com/embed/${lessonYoutubeId}?autoplay=1`}
                                            title={lesson.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                          />
                                        ) : (
                                          <video
                                            src={lesson.video_url}
                                            controls
                                            autoPlay
                                            className="w-full h-full object-contain"
                                          />
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 py-4 text-center">Curriculum details will be posted shortly.</p>
                )}
              </div>
            )}

            {/* Tab 3: Instructors */}
            {activeTab === "instructors" && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-4 shadow-xs">
                <h2 className="text-lg sm:text-xl font-bold text-[#002b5b] pb-2 border-b border-slate-100">
                  Course Mentors
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {mentors.length > 0 ? (
                    mentors.map((mentor: any) => (
                      <div
                        key={mentor.id}
                        className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200/80 bg-slate-50/50"
                      >
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-white ring-2 ring-slate-100 shrink-0 shadow-xs">
                          {mentor.profileImage || mentor.user?.profile_image ? (
                            <img
                              src={mentor.profileImage || mentor.user?.profile_image}
                              alt={mentor.user?.first_name || "Mentor"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                              <User className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-bold text-slate-900 truncate">
                            {mentor.user
                              ? `${mentor.user.first_name || ""} ${mentor.user.last_name || ""}`.trim()
                              : "Instructor"}
                          </h4>
                          <p className="text-xs font-semibold text-[#0077b6] mt-0.5">
                            {mentor.designation || "Lead BIM Instructor"}
                          </p>
                          {mentor.bio && (
                            <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                              {mentor.bio}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">BIM Build BD Faculty</h4>
                        <p className="text-xs text-slate-500">Senior Industry Professionals</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 4: Reviews */}
            {activeTab === "reviews" && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h2 className="text-lg sm:text-xl font-bold text-[#002b5b]">
                    Student Feedback
                  </h2>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{avgRating > 0 ? avgRating.toFixed(1) : "5.0"} out of 5.0</span>
                  </div>
                </div>

                {reviews.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < (review.rating || 5)
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-slate-200 text-slate-200"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-slate-700 italic leading-relaxed">
                            &ldquo;{review.comment}&rdquo;
                          </p>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400">
                          <span className="font-bold text-slate-800 truncate">
                            {review.student?.name || "Student"}
                          </span>
                          <span>{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Recent"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 py-6 text-center">No reviews yet for this batch.</p>
                )}
              </div>
            )}

          </div>

          {/* Right Column (4 cols): Modern Sleek Pricing Card */}
          <div className="lg:col-span-4" ref={enrollCardRef}>
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-sm lg:sticky lg:top-24 space-y-6">
              
              {/* Pricing Section */}
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Course Fee
                </span>
                
                <div className="flex items-baseline gap-2.5 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#002b5b] tracking-tight">
                    ৳{currentPrice.toLocaleString()}
                  </span>
                  {price > discountPrice && paymentType === "full" && (
                    <span className="text-sm font-semibold text-slate-400 line-through">
                      ৳{price.toLocaleString()}
                    </span>
                  )}
                </div>

                {price > discountPrice && paymentType === "full" && (
                  <span className="inline-block mt-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    ৳{(price - discountPrice).toLocaleString()} instant discount
                  </span>
                )}
              </div>

              {/* Modern Payment Segment Switcher */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-500 block">Payment Option:</span>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPaymentType("full")}
                    className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      paymentType === "full"
                        ? "bg-white text-[#002b5b] shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Pay in Full
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType("installment")}
                    className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      paymentType === "installment"
                        ? "bg-white text-[#002b5b] shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    2 Installments
                  </button>
                </div>
              </div>

              {/* Checklist Features */}
              <ul className="space-y-2.5 text-xs text-slate-700 font-medium pt-1">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full access to ongoing live classes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Lifetime lecture backup & files</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified course certificate</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Job & freelance mentoring</span>
                </li>
              </ul>

              {/* Terms Checkbox */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                {enrollError && (
                  <p className="text-rose-600 text-xs font-semibold bg-rose-50 p-2.5 rounded-lg border border-rose-100">
                    {enrollError}
                  </p>
                )}

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      if (e.target.checked) setEnrollError("");
                    }}
                    className="w-4 h-4 rounded border-slate-300 text-[#0077b6] mt-0.5 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 leading-snug">
                    I agree to the{" "}
                    <Link href="/terms-conditions" className="text-[#0077b6] font-semibold underline">
                      Terms & Conditions
                    </Link>
                  </span>
                </label>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={handleEnroll}
                className="w-full py-3.5 rounded-xl bg-[#0077b6] hover:bg-[#005a8c] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enroll Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Safe & Secure Enrollment</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Floating Bottom Bar for Mobile Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 py-3 shadow-lg flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-slate-400 font-bold block uppercase">
            {paymentType === "installment" ? "1st Installment" : "Total Fee"}
          </span>
          <span className="text-lg font-extrabold text-[#002b5b]">
            ৳{currentPrice.toLocaleString()}
          </span>
        </div>

        <button
          onClick={scrollToEnroll}
          className="px-6 py-2.5 rounded-xl bg-[#0077b6] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 active:scale-95 transition-all"
        >
          <span>Enroll Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
