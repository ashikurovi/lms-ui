"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FolderKanban, Loader2, X, ExternalLink } from "lucide-react";
import DrawingProjectsSection, { DrawingProject } from "@/components/portfolio/DrawingProjectsSection";
import VideoProjectsSection, { VideoProject } from "@/components/portfolio/VideoProjectsSection";
import VideoModal from "@/components/common/VideoModal";
import { portfoliosApi, PortfolioItem } from "@/services/api";

function formatVideoEmbedUrl(url: string): string {
  if (!url) return "";
  if (url.includes("youtube.com/embed/")) return url;
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }
  return url;
}

function isVideoUrl(url?: string): boolean {
  if (!url) return false;
  return /youtube\.com|youtu\.be|vimeo\.com|\.mp4/i.test(url);
}

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [previewProject, setPreviewProject] = useState<DrawingProject | null>(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      setLoading(true);
      try {
        const res = await portfoliosApi.getAllPortfolios();
        if ((res.statusCode === 200 || res.statusCode === 201) && res.data) {
          const items = Array.isArray(res.data)
            ? res.data
            : ((res.data as unknown as { items?: PortfolioItem[] })?.items || []);
          setPortfolios(items);
        } else {
          setPortfolios([]);
        }
      } catch (err) {
        console.error("Failed to fetch portfolios:", err);
        setPortfolios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  // Split into Video projects and Drawing/Image projects based on item.link
  const videoProjects: VideoProject[] = portfolios
    .filter((item) => isVideoUrl(item.link))
    .map((item) => ({
      id: item.id,
      title: item.title,
      subtitle: item.description || "Video Presentation",
      image: item.image,
      url: formatVideoEmbedUrl(item.link || ""),
    }));

  const drawingProjects: DrawingProject[] = portfolios
    .filter((item) => !isVideoUrl(item.link))
    .map((item) => ({
      id: item.id,
      status: item.description ? "Project Work" : "Featured",
      title: item.title,
      image: item.image,
      link: item.link,
    }));

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
        {/* Breadcrumb */}
        <div className="text-xs sm:text-sm text-slate-400 font-medium">
          <Link href="/" className="hover:text-slate-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700 font-semibold">Our Portfolio</span>
        </div>

        {/* Page Title */}
        <div className="text-center pt-1 pb-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight">
            Our Portfolio
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-3 max-w-2xl mx-auto">
            Explore industry-standard architectural drawings, BIM modeling, and 3D visualization projects created by our students and expert team.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-8">
            <div className="flex items-center justify-center py-12 gap-3 text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin text-[#0077b6]" />
              <span className="text-sm font-medium">Loading portfolio items...</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 space-y-4 animate-pulse"
                >
                  <div className="w-24 h-6 bg-slate-200 rounded-full" />
                  <div className="w-full h-64 bg-slate-200 rounded-xl" />
                  <div className="w-3/4 h-5 bg-slate-200 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && portfolios.length === 0 && (
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center mx-auto">
              <FolderKanban className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              No Portfolio Projects Found
            </h3>
            <p className="text-sm text-slate-500">
              New project files and student works are being uploaded. Please check back soon or browse our courses.
            </p>
            <div className="pt-2">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#0077b6] hover:bg-[#005f92] text-white text-xs font-bold transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        )}

        {/* Dynamic Project Content */}
        {!loading && portfolios.length > 0 && (
          <div className="space-y-16">
            {/* Section 1: Project Gallery (Drawings / 3D Renders) */}
            {drawingProjects.length > 0 && (
              <DrawingProjectsSection
                projects={drawingProjects}
                onSelectProject={(proj) => setPreviewProject(proj)}
              />
            )}

            {/* Section 2: Project Video Gallery (Walkthroughs / Presentations) */}
            {videoProjects.length > 0 && (
              <VideoProjectsSection
                videos={videoProjects}
                onPlayVideo={(url) => setActiveVideo(url)}
              />
            )}
          </div>
        )}

        {/* Drawing Project Lightbox Modal */}
        {previewProject && (
          <div
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs"
            onClick={() => setPreviewProject(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {previewProject.title}
                  </h3>
                  {previewProject.status && (
                    <span className="text-xs text-[#0077b6] font-semibold">
                      {previewProject.status}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setPreviewProject(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full max-h-[70vh] overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center">
                <img
                  src={previewProject.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"}
                  alt={previewProject.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>

              {previewProject.link && (
                <div className="pt-2 flex justify-end">
                  <a
                    href={previewProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0077b6] hover:underline"
                  >
                    Open Project Link <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Video Player Modal */}
        <VideoModal
          videoUrl={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      </div>
    </div>
  );
}
