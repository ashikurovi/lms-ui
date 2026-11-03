"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Save, Video, Play, ExternalLink, Eye, EyeOff } from "lucide-react";
import { walkthroughsApi, WalkthroughItem, uploadApi } from "@/services/api";

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  return match && match[1] ? match[1] : null;
}

function getFallbackThumbnail(videoUrl: string): string {
  const ytId = extractYouTubeId(videoUrl);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  return "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80";
}

export default function AdminWalkthroughsTab() {
  const [walkthroughs, setWalkthroughs] = useState<WalkthroughItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnail: "",
    isActive: true,
  });

  const fetchWalkthroughs = async () => {
    setLoading(true);
    try {
      const res = await walkthroughsApi.getAllWalkthroughs();
      if ((res.statusCode === 200 || res.statusCode === 201) && res.data) {
        setWalkthroughs(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch walkthroughs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalkthroughs();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      title: "",
      description: "",
      videoUrl: "",
      thumbnail: "",
      isActive: true,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: WalkthroughItem) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setFormData({
      title: item.title,
      description: item.description || "",
      videoUrl: item.videoUrl || "",
      thumbnail: item.thumbnail || "",
      isActive: item.isActive ?? true,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this BIM walkthrough video?")) {
      try {
        await walkthroughsApi.deleteWalkthrough(id);
        fetchWalkthroughs();
      } catch (err) {
        console.error("Failed to delete walkthrough:", err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: Partial<WalkthroughItem> = {
        title: formData.title,
        description: formData.description,
        videoUrl: formData.videoUrl,
        thumbnail: formData.thumbnail || getFallbackThumbnail(formData.videoUrl),
        isActive: formData.isActive,
      };

      let res;
      if (isEditing && currentId) {
        res = await walkthroughsApi.updateWalkthrough(currentId, payload);
      } else {
        res = await walkthroughsApi.createWalkthrough(payload);
      }

      if (res.statusCode === 200 || res.statusCode === 201) {
        setIsFormOpen(false);
        fetchWalkthroughs();
      } else {
        alert("Failed to save walkthrough: " + (res.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error saving walkthrough:", err);
      alert("Error saving walkthrough");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadApi.uploadFile(file);
      if ((res.statusCode === 200 || res.statusCode === 201) && res.data?.url) {
        setFormData((prev) => ({ ...prev, thumbnail: res.data!.url }));
      } else {
        alert("Failed to upload image: " + (res.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading thumbnail image");
    } finally {
      setIsUploading(false);
    }
  };

  const previewThumbnail = formData.thumbnail || (formData.videoUrl ? getFallbackThumbnail(formData.videoUrl) : "");

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-sky-50 text-[#0077b6]">
              <Video className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Featured Live BIM Walkthroughs
            </h2>
          </div>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Manage video walkthroughs, titles, and short descriptions displayed on the landing page
          </p>
        </div>

        {!isFormOpen && (
          <button
            onClick={handleOpenAdd}
            className="bg-[#0077b6] hover:bg-[#023e8a] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#0077b6]/20 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-5 h-5" />
            Add Walkthrough
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal / Box */}
      {isFormOpen && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              {isEditing ? <Edit2 className="w-5 h-5 text-[#0077b6]" /> : <Plus className="w-5 h-5 text-[#0077b6]" />}
              {isEditing ? "Edit BIM Walkthrough" : "Add New BIM Walkthrough"}
            </h3>
            <button
              onClick={() => setIsFormOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Video Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 transition-all font-medium text-slate-900 bg-slate-50 focus:bg-white"
                  placeholder="e.g. 20-Story Commercial Tower — Revit Structure & Clash Walkthrough"
                />
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Video URL (YouTube / Vimeo / MP4) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 transition-all font-medium text-slate-900 bg-slate-50 focus:bg-white"
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                />
                <p className="text-xs text-slate-400 mt-1.5 font-medium">
                  YouTube video links will automatically generate a high-res thumbnail preview.
                </p>
              </div>

              {/* Custom Thumbnail Upload */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Custom Thumbnail (Optional)
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {previewThumbnail && (
                    <img
                      src={previewThumbnail}
                      alt="Thumbnail preview"
                      className="w-20 h-14 rounded-xl object-cover border border-slate-200 shadow-sm shrink-0 bg-slate-100"
                    />
                  )}
                  <div className="flex-1 w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 transition-all font-medium text-slate-900 bg-slate-50 focus:bg-white file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-sky-50 file:text-[#0077b6] hover:file:bg-sky-100 cursor-pointer"
                    />
                    {isUploading && (
                      <p className="text-xs text-[#0077b6] mt-1.5 font-semibold animate-pulse">
                        Uploading thumbnail...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Short Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 transition-all font-medium text-slate-900 bg-slate-50 focus:bg-white h-24 resize-y"
                placeholder="Brief summary of the live walkthrough, BIM modeling workflow, clash detection techniques, or key takeaways..."
              />
            </div>

            {/* Status Checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="walkthrough_status"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-[#0077b6] border-slate-300 rounded focus:ring-[#0077b6] cursor-pointer"
              />
              <label htmlFor="walkthrough_status" className="text-sm font-bold text-slate-700 cursor-pointer">
                Publish on Landing Page (Active)
              </label>
            </div>

            {/* Submit / Cancel Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-6 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#0077b6] hover:bg-[#023e8a] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#0077b6]/20 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {isEditing ? "Update Walkthrough" : "Save Walkthrough"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Walkthroughs Grid / List */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 font-medium">
          Loading walkthroughs...
        </div>
      ) : walkthroughs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 text-[#0077b6] mx-auto flex items-center justify-center">
            <Video className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">No BIM Walkthroughs Yet</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Add your first Live BIM Walkthrough video with title and description to show it in the landing page section.
            </p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0077b6] text-white font-bold hover:bg-[#023e8a] transition-all cursor-pointer shadow-md shadow-[#0077b6]/20"
          >
            <Plus className="w-4 h-4" />
            Add First Walkthrough
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {walkthroughs.map((item) => {
            const thumb = item.thumbnail || getFallbackThumbnail(item.videoUrl);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Thumbnail Header with Play Overlay */}
                <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                  <img
                    src={thumb}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform pl-0.5">
                      <Play className="w-5 h-5 fill-current" />
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    {item.isActive ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/90 text-white backdrop-blur-xs">
                        <Eye className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-600/90 text-white backdrop-blur-xs">
                        <EyeOff className="w-3 h-3" /> Inactive
                      </span>
                    )}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-900 group-hover:text-[#0077b6] transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    {item.description ? (
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 italic">No description provided</p>
                    )}
                  </div>

                  {/* Video URL Link & Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#0077b6] hover:underline font-bold truncate max-w-[150px]"
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      Watch Link
                    </a>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 rounded-lg text-slate-400 hover:text-[#0077b6] hover:bg-sky-50 transition-colors cursor-pointer"
                        title="Edit walkthrough"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete walkthrough"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

