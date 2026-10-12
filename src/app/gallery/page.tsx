"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Images, Loader2, X } from "lucide-react";
import BatchGallerySection, { BatchItem } from "@/components/gallery/BatchGallerySection";
import VideoReviewsSection, { VideoReview } from "@/components/gallery/VideoReviewsSection";
import VideoModal from "@/components/common/VideoModal";
import { galleriesApi, GalleryItem } from "@/services/api";

function isVideoUrl(url?: string): boolean {
  if (!url) return false;
  return /youtube\.com|youtu\.be|vimeo\.com|\.mp4/i.test(url);
}

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

export default function StudentsGalleryPage() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<BatchItem | null>(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      setLoading(true);
      try {
        const res = await galleriesApi.getAllGalleries();
        if ((res.statusCode === 200 || res.statusCode === 201) && res.data) {
          const items = Array.isArray(res.data)
            ? res.data
            : ((res.data as unknown as { items?: GalleryItem[] })?.items || []);
          setGalleries(items);
        } else {
          setGalleries([]);
        }
      } catch (err) {
        console.error("Failed to fetch galleries:", err);
        setGalleries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  const photoBatches: BatchItem[] = galleries
    .filter((g) => !isVideoUrl(g.imageUrl) && !isVideoUrl(g.description))
    .map((g) => {
      const batchName =
        typeof g.batch === "object" && g.batch !== null
          ? (g.batch as { name?: string; batch_code?: string }).name ||
            (g.batch as { name?: string; batch_code?: string }).batch_code
          : undefined;

      return {
        id: g.id,
        title: g.title,
        subtitle: batchName ? `Batch: ${batchName}` : g.description || "Student Batch",
        image: g.imageUrl,
        hasImage: !!g.imageUrl,
      };
    });

  const videoReviews: VideoReview[] = galleries
    .filter((g) => isVideoUrl(g.imageUrl) || isVideoUrl(g.description))
    .map((g) => {
      const videoLink = isVideoUrl(g.imageUrl) ? g.imageUrl : g.description || "";
      return {
        id: g.id,
        title: g.title,
        author: g.description && !isVideoUrl(g.description) ? g.description : "BIM Build BD",
        image: !isVideoUrl(g.imageUrl) ? g.imageUrl : "",
        url: formatVideoEmbedUrl(videoLink),
      };
    });

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
        {/* Breadcrumb */}
        <div className="text-xs sm:text-sm text-slate-400 font-medium">
          <Link href="/" className="hover:text-slate-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700 font-semibold">Students Gallery</span>
        </div>

        {/* Page Title */}
        <div className="text-center pt-1 pb-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight">
            Students Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-3 max-w-2xl mx-auto">
            Memories, batches, and success stories of our engineering students and training sessions.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-8">
            <div className="flex items-center justify-center py-10 gap-3 text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin text-[#0077b6]" />
              <span className="text-sm font-medium">Loading gallery items...</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4 animate-pulse"
                >
                  <div className="w-full h-56 bg-slate-200 rounded-xl" />
                  <div className="w-3/4 h-5 bg-slate-200 rounded-md mx-auto" />
                  <div className="w-1/2 h-4 bg-slate-100 rounded-md mx-auto" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && galleries.length === 0 && (
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center mx-auto">
              <Images className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              No Gallery Photos Found
            </h3>
            <p className="text-sm text-slate-500">
              New batch photos and student memories will be updated soon. Browse our latest courses in the meantime.
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

        {/* Dynamic Gallery Content */}
        {!loading && galleries.length > 0 && (
          <div className="space-y-16">
            {/* Section 1: Batch Photo Gallery */}
            {photoBatches.length > 0 && (
              <BatchGallerySection
                batches={photoBatches}
                onSelectBatch={(batch) => setPreviewPhoto(batch)}
              />
            )}

            {/* Section 2: Video Reviews (if video links exist) */}
            {videoReviews.length > 0 && (
              <VideoReviewsSection
                videos={videoReviews}
                onPlayVideo={(url) => setActiveVideo(url)}
              />
            )}
          </div>
        )}

        {/* Lightbox Photo Preview Modal */}
        {previewPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs"
            onClick={() => setPreviewPhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {previewPhoto.title}
                  </h3>
                  {previewPhoto.subtitle && (
                    <span className="text-xs text-[#0077b6] font-semibold">
                      {previewPhoto.subtitle}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setPreviewPhoto(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full max-h-[70vh] overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center">
                <img
                  src={previewPhoto.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"}
                  alt={previewPhoto.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>
            </div>
          </div>
        )}

        {/* Reusable Video Modal */}
        <VideoModal
          videoUrl={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      </div>
    </div>
  );
}
