"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { blogsApi } from "@/services/api/blogsApi";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Check,
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react";

// Curated default technical articles to fallback on when API doesn't return full text
const fallbackArticles: Record<
  string,
  {
    title: string;
    category: string;
    date: string;
    readTime: string;
    author: string;
    authorRole: string;
    image: string;
    content: string;
  }
> = {
  "bim-lod-complete-guide": {
    title: "BIM LOD (Level of Development) — Complete Guide (LOD 100–500)",
    category: "BIM LOD",
    date: "November 30, 2025",
    readTime: "7 min read",
    author: "Engr. Maidul Islam",
    authorRole: "Senior BIM Specialist & Structural Engineer",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    content: `
      <h2>What is BIM LOD (Level of Development)?</h2>
      <p>Level of Development (LOD) is an industry-recognized specification standard defined by the American Institute of Architects (AIA) and BIMForum. It clearly outlines the degree of geometric detail, accuracy, and non-geometric data (information) embedded within model elements as a project advances from schematic concept to construction handover.</p>
      
      <blockquote>
        "LOD is not just about 3D graphical detail (Level of Detail); it defines how much reliance project stakeholders can place on the information contained in the element."
      </blockquote>

      <h3>1. LOD 100 — Conceptual & Schematic Design</h3>
      <p>At LOD 100, building elements are depicted as generic shapes, masses, or volumetric spatial placeholders. They convey approximate area, orientation, volume, and location, providing early spatial planning for architects and civil authorities.</p>

      <h3>2. LOD 200 — Approximate Geometry (Design Development)</h3>
      <p>Model elements are modeled as generalized systems or assemblies with approximate quantities, sizes, shapes, and locations. Non-geometric informational attributes may also be attached to assist preliminary MEP routing and structural grid planning.</p>

      <h3>3. LOD 300 — Specific Geometry (Detailed Design & Documentation)</h3>
      <p>At LOD 300, elements are graphically represented as specific assemblies in terms of quantity, size, shape, location, and orientation. This level corresponds to standard municipal approval drawing sets and tender tender submission packages.</p>

      <h3>4. LOD 350 — Construction Documentation & Clash Coordination</h3>
      <p>LOD 350 bridges the gap between design and physical construction. It includes exact physical connection interfaces, joint details, anchor bolts, rebar layouts, and penetrations necessary for clash detection and coordination with neighboring systems.</p>

      <h3>5. LOD 400 — Fabrication & Assembly Detailing</h3>
      <p>Elements are modeled with sufficient detail and information to enable digital fabrication and shop drawing extraction. Common in steel detailing (Tekla), precast concrete assemblies, and sheet metal ductwork fabrication.</p>

      <h3>6. LOD 500 — As-Built & Facility Management (Digital Twin)</h3>
      <p>The field-verified as-constructed model reflecting actual on-site installations, operational manuals, serial numbers, maintenance schedules, and lifecycle parameters for facility owners.</p>
    `,
  },
  "bim-dimensions-1d-7d": {
    title: "BIM Dimensions (1D-7D) Explained: How 7D BIM Transforms Construction",
    category: "BIM DIMENSIONS",
    date: "November 30, 2025",
    readTime: "6 min read",
    author: "Engr. Maidul Islam",
    authorRole: "BIM Coordinator & AEC Trainer",
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80",
    content: `
      <h2>The Evolution of BIM Dimensions</h2>
      <p>Building Information Modeling (BIM) extends far beyond standard 3D visual models. By augmenting models with multidimensional datasets—including time, cost, sustainability, and facility management—the construction industry achieves unprecedented efficiency.</p>

      <h3>Understanding the BIM Dimensional Spectrum:</h3>
      <ul>
        <li><strong>3D BIM (Parametric Modeling):</strong> Spatial geometry, architectural modeling in Revit, structural frames, and MEP coordination.</li>
        <li><strong>4D BIM (Time Scheduling & Phasing):</strong> Linking 3D components to Primavera P6 or MS Project timelines for animated simulation of construction sequencing and logistical crane routing.</li>
        <li><strong>5D BIM (Cost Estimation & Budgeting):</strong> Real-time material takeoff (MTO), dynamic cost forecasting, and instant bill-of-quantities (BOQ) updates when model geometries change.</li>
        <li><strong>6D BIM (Sustainability & Energy Efficiency):</strong> Solar radiation analysis, thermal load calculation, carbon footprint tracking, and LEED green building certification compliance.</li>
        <li><strong>7D BIM (Operations & Facility Management):</strong> Long-term lifecycle asset tracking, maintenance alerts, equipment warranty logging, and integration with modern IoT sensors.</li>
      </ul>
    `,
  },
  "clash-detection-bim": {
    title: "Clash Detection in BIM: Comprehensive Guide (What, Why & How)",
    category: "CLASH DETECTION",
    date: "November 30, 2025",
    readTime: "5 min read",
    author: "BIM Build BD Technical Team",
    authorRole: "Technical Engineering Division",
    image:
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    content: `
      <h2>Why Clash Detection is Essential in Modern AEC</h2>
      <p>In traditional 2D construction workflows, collisions between structural beams, plumbing pipes, and HVAC ductwork were discovered on-site during installation. This caused costly rework, delayed handovers, and extensive disputes.</p>

      <h3>Types of BIM Clashes:</h3>
      <ul>
        <li><strong>Hard Clashes:</strong> Physical intersections where two objects occupy the same physical coordinate (e.g., a duct passing straight through a reinforced concrete beam).</li>
        <li><strong>Soft Clashes (Clearance Clashes):</strong> Geometry does not intersect, but violates minimum spatial tolerances required for maintenance access or thermal expansion.</li>
        <li><strong>Workflow / 4D Clashes:</strong> Temporal scheduling collisions between crane operations, scaffolding delivery, and concrete pouring crews.</li>
      </ul>

      <p>Using Autodesk Navisworks Manage and Revit Coordination spaces, engineering teams run automated matrix tests to eliminate thousands of potential construction conflicts long before concrete is poured.</p>
    `,
  },
};

export default function BlogDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [blog, setBlog] = useState<any>(null);
  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        // Fetch specific blog from backend API
        const res = await blogsApi.getBlogById(id);
        if (isMounted && res.statusCode === 200 && res.data) {
          setBlog(res.data);
        } else if (fallbackArticles[id]) {
          // If not in DB, use rich fallback
          setBlog({
            id,
            ...fallbackArticles[id],
          });
        }

        // Fetch recent blogs for the sidebar
        const listRes = await blogsApi.getAllBlogs();
        if (isMounted && listRes.statusCode === 200 && listRes.data) {
          setAllBlogs(listRes.data.filter((b: any) => b.id !== id).slice(0, 4));
        }
      } catch {
        if (fallbackArticles[id]) {
          setBlog({
            id,
            ...fallbackArticles[id],
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-3 border-slate-200 border-t-[#0077b6]"></div>
          <span className="text-xs font-semibold text-slate-500">Loading article...</span>
        </div>
      </div>
    );
  }

  // Fallback if not found anywhere
  const currentBlog =
    blog ||
    fallbackArticles[id] || {
      title: "BIM & AEC Engineering Insights",
      category: "Engineering",
      date: "Recent",
      readTime: "5 min read",
      author: "BIM Build BD Faculty",
      authorRole: "AEC Technical Specialist",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      content:
        "<p>This article provides an in-depth analysis of architectural modeling and engineering coordination workflows. Visit our courses to master these industry tools hands-on.</p>",
    };

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-800 pb-20">
      
      {/* 1. Top Breadcrumb & Article Header */}
      <div className="bg-white border-b border-slate-200/70 pt-6 pb-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          
          {/* Back button & Breadcrumb */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-[#0077b6] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all blogs</span>
            </Link>

            <span className="px-3 py-1 rounded-full bg-sky-50 text-[#0077b6] text-xs font-bold uppercase tracking-wider">
              {currentBlog.category || "Engineering"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#002b5b] tracking-tight leading-tight max-w-4xl">
            {currentBlog.title}
          </h1>

          {/* Author & Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-100 text-[#0077b6] flex items-center justify-center font-bold text-sm shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">{currentBlog.author || "BIM Build BD"}</p>
                <p className="text-xs text-slate-500">{currentBlog.authorRole || "Editorial Team"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{currentBlog.date || "Recent"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{currentBlog.readTime || "5 min read"}</span>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Article Body & Sidebar */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Content Column (8 cols) */}
          <article className="lg:col-span-8 space-y-6">
            
            {/* Featured Image */}
            {currentBlog.image && (
              <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-xs">
                <img
                  src={currentBlog.image}
                  alt={currentBlog.title}
                  className="w-full h-auto max-h-[460px] object-cover"
                />
              </div>
            )}

            {/* Rich Content Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-xs">
              <div
                className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base break-words
                  [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-[#002b5b] [&_h2]:mt-8 [&_h2]:mb-4
                  [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-6 [&_h3]:mb-3
                  [&_p]:mb-4 [&_p]:leading-relaxed
                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_li]:mb-1.5
                  [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-1.5
                  [&_blockquote]:border-l-4 [&_blockquote]:border-[#0077b6] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_blockquote]:my-6 [&_blockquote]:bg-sky-50/50 [&_blockquote]:p-3 [&_blockquote]:rounded-r-lg
                  [&_strong]:text-slate-900 [&_strong]:font-bold"
                dangerouslySetInnerHTML={{
                  __html: currentBlog.content || currentBlog.excerpt || "<p>Article content is loading...</p>",
                }}
              />

              {/* Share & Feedback Box */}
              <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <Share2 className="w-4 h-4 text-[#0077b6]" />
                  <span>Share this article</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </article>

          {/* Right Sidebar Column (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Enrollment Promo Card */}
            <div className="bg-gradient-to-br from-[#002b5b] to-[#0f4c81] text-white rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sky-300">
                <Sparkles className="w-5 h-5" />
              </div>

              <div>
                <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
                  Upcoming Live Batches
                </span>
                <h3 className="text-lg font-bold text-white mt-1 leading-snug">
                  Master Revit, Tekla & BIM Coordination
                </h3>
                <p className="text-xs text-slate-200/90 mt-2 leading-relaxed">
                  Join our hands-on engineering courses with verified certificates, lifetime lecture backups, and job support.
                </p>
              </div>

              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-[#002b5b] font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-[0.98]"
              >
                <span>View Live Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Recent Articles Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#002b5b] uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#0077b6]" />
                <span>Related Articles</span>
              </h3>

              <div className="space-y-3.5 divide-y divide-slate-100">
                {(allBlogs.length > 0
                  ? allBlogs.map((item) => ({
                      key: item.id,
                      category: item.category || "Engineering",
                      title: item.title,
                      readTime: "5 min read",
                    }))
                  : Object.entries(fallbackArticles)
                      .filter(([key]) => key !== id)
                      .slice(0, 3)
                      .map(([key, item]) => ({
                        key,
                        category: item.category,
                        title: item.title,
                        readTime: item.readTime,
                      }))
                ).map((item) => (
                  <Link
                    key={item.key}
                    href={`/blog/${item.key}`}
                    className="block pt-3.5 first:pt-0 group cursor-pointer"
                  >
                    <span className="text-[10px] font-bold text-[#0077b6] uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0077b6] transition-colors leading-snug mt-1">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      {item.readTime}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </div>

    </div>
  );
}
