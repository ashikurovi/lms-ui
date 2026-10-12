"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon, Sparkles, Tag, Globe, FileText } from "lucide-react";
import { blogsApi, uploadApi } from "@/services/api";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const CATEGORY_SUGGESTIONS = [
  "BIM & AEC",
  "Civil Engineering",
  "Structural Engineering",
  "Revit & Modeling",
  "Tekla & Steel Detailing",
  "Architecture",
  "Industry Insights",
];

export default function AdminBlogsTab() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    seoTitle: "",
    seoDescription: "",
    content: "",
    image: "",
  });

  const fetchBlogs = async () => {
    try {
      const res = await blogsApi.getAllBlogs();
      if ((res.statusCode === 200 || res.statusCode === 201) && res.data) {
        const items = Array.isArray(res.data)
          ? res.data
          : ((res.data as unknown as { items?: any[] })?.items || []);
        setBlogs(items);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentBlogId(null);
    setFormData({
      title: "",
      category: "BIM & AEC",
      seoTitle: "",
      seoDescription: "",
      content: "",
      image: "",
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (blog: any) => {
    setIsEditing(true);
    setCurrentBlogId(blog.id);
    setFormData({
      title: blog.title || "",
      category: blog.category || "",
      seoTitle: blog.seoTitle || "",
      seoDescription: blog.seoDescription || "",
      content: blog.content || "",
      image: blog.image || "",
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        await blogsApi.deleteBlog(id);
        fetchBlogs();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res;
      if (isEditing && currentBlogId) {
        res = await blogsApi.updateBlog(currentBlogId, formData);
      } else {
        res = await blogsApi.createBlog(formData);
      }

      if (res.statusCode === 200 || res.statusCode === 201) {
        setIsFormOpen(false);
        fetchBlogs();
      } else {
        alert("Failed to save blog: " + (res.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Error saving blog");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadApi.uploadFile(file);
      if ((res.statusCode === 200 || res.statusCode === 201) && res.data?.url) {
        const imageUrl = res.data.url;
        setFormData((prev) => ({ ...prev, image: imageUrl }));
      } else {
        alert("Failed to upload image: " + (res.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Blogs Management</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Create, edit, and optimize SEO metadata and categories for your blog posts
          </p>
        </div>
        {!isFormOpen && (
          <button
            onClick={handleOpenAdd}
            className="bg-[#0077b6] hover:bg-[#023e8a] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#0077b6]/20 transition-all cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Add Blog
          </button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-6">
          <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              {isEditing ? <Edit2 className="w-5 h-5 text-[#0077b6]" /> : <Plus className="w-5 h-5 text-[#0077b6]" />}
              {isEditing ? "Edit Blog" : "Add New Blog"}
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
              {/* Blog Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Blog Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      title: val,
                      // Pre-fill seoTitle if it hasn't been edited separately yet
                      seoTitle: prev.seoTitle === prev.title || !prev.seoTitle ? val : prev.seoTitle,
                    }));
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 transition-all font-medium text-slate-900 bg-slate-50 focus:bg-white"
                  placeholder="e.g. Master BIM LOD Standards for Structural Engineering"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#0077b6]" />
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 transition-all font-medium text-slate-900 bg-slate-50 focus:bg-white"
                  placeholder="e.g. BIM & AEC, Structural Engineering..."
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {CATEGORY_SUGGESTIONS.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        formData.category === cat
                          ? "bg-[#0077b6] text-white border-[#0077b6]"
                          : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cover Image Upload / URL */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#0077b6]" />
                  Cover Image
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-sm shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center shrink-0 text-slate-400">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 transition-all font-medium text-slate-900 bg-slate-50 focus:bg-white file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-[#0077b6] hover:file:bg-sky-100 disabled:opacity-50 cursor-pointer text-xs"
                    />
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Or paste direct image URL (https://...)"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 font-mono text-slate-700 bg-white"
                    />
                    {isUploading && (
                      <p className="text-xs text-[#0077b6] font-semibold animate-pulse">Uploading image...</p>
                    )}
                  </div>
                </div>
              </div>

              {/* SEO Title */}
              <div className="md:col-span-2 bg-sky-50/50 p-4 rounded-2xl border border-sky-100 space-y-4">
                <div className="flex items-center gap-2 text-sm font-extrabold text-[#002b5b]">
                  <Globe className="w-4 h-4 text-[#0077b6]" />
                  <span>SEO & Meta Configuration</span>
                  <span className="text-xs font-normal text-slate-500">(Used for search engines and landing page cards)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      SEO Title
                    </label>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 transition-all font-medium text-slate-900 bg-white text-sm"
                      placeholder="SEO optimized headline (default: Blog Title)"
                    />
                  </div>

                  {/* SEO Short Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        SEO Short Description <span className="text-[#0077b6] font-medium">(Landing Page Summary)</span>
                      </label>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {formData.seoDescription.length} chars
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 transition-all font-medium text-slate-900 bg-white text-sm"
                      placeholder="A punchy 1-2 sentence preview for landing page cards and Google search snippet..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Rich Content Editor */}
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
              <label className="block text-sm font-bold text-slate-700 p-4 border-b border-slate-100 bg-slate-50 mb-0 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#0077b6]" />
                Blog Article Content <span className="text-rose-500">*</span>
              </label>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(val) => setFormData((prev) => ({ ...prev, content: val }))}
                className="h-64 mb-12"
              />
            </div>

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
                className="bg-[#0077b6] hover:bg-[#023e8a] text-white px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Save className="w-5 h-5" />
                {isEditing ? "Save Changes" : "Publish Blog"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="px-6 py-4">Blog Article</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">SEO Short Description</th>
                  <th className="px-6 py-4">Created Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {blog.image ? (
                          <img
                            src={blog.image}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}
                        <div className="max-w-xs">
                          <div className="font-bold text-slate-900 line-clamp-1">{blog.title}</div>
                          {blog.seoTitle && blog.seoTitle !== blog.title && (
                            <div className="text-xs text-slate-400 line-clamp-1">
                              SEO: {blog.seoTitle}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-sky-50 text-[#0077b6] text-xs font-bold whitespace-nowrap">
                        {blog.category || "General"}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-sm">
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {blog.seoDescription || "—"}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap text-xs">
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(blog)}
                          className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {blogs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No blogs found. Click &quot;Add Blog&quot; to publish your first article.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
