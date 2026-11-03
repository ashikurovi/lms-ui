"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Save, Upload, User, Briefcase, Phone, Mail, Award, Loader2, Image as ImageIcon } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { mentorsApi, MentorItem } from "@/services/api/mentorsApi";
import { uploadApi } from "@/services/api/uploadApi";

interface AdminEditInstructorModalProps {
  isOpen: boolean;
  instructor: MentorItem | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminEditInstructorModal({
  isOpen,
  instructor,
  onClose,
  onSuccess,
}: AdminEditInstructorModalProps) {
  const mounted = useIsMounted();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [subject, setSubject] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [expertise, setExpertise] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (instructor) {
      setName(instructor.user?.name || "");
      setPhone(instructor.user?.phone || "");
      setDesignation(instructor.designation || "");
      setSubject(instructor.subject || "");
      setExperience(instructor.experience || "");
      setSkills(Array.isArray(instructor.skills) ? instructor.skills.join(", ") : "");
      setExpertise(Array.isArray(instructor.expertise) ? instructor.expertise.join(", ") : "");
      setBio(instructor.bio || "");
      setProfileImage(instructor.profileImage || "");
      setFacebook(instructor.facebook || "");
      setLinkedin(instructor.linkedin || "");
      setError(null);
    }
  }, [instructor, isOpen]);

  if (!mounted || !isOpen || !instructor) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await uploadApi.uploadFile(file);
      if ((res.statusCode === 200 || res.statusCode === 201) && res.data?.url) {
        setProfileImage(res.data.url);
      } else {
        alert("Image upload failed: " + (res.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!designation.trim() && !subject.trim()) {
      setError("Please provide at least a designation or technical subject.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const parsedSkills = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const parsedExpertise = expertise
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        name: name.trim() || undefined,
        phone: phone.trim() || undefined,
        designation: designation.trim(),
        subject: subject.trim(),
        experience: experience.trim(),
        bio: bio.trim(),
        profileImage: profileImage.trim() || undefined,
        skills: parsedSkills,
        expertise: parsedExpertise,
        facebook: facebook.trim() || undefined,
        linkedin: linkedin.trim() || undefined,
      };

      const res = await mentorsApi.updateMentor(instructor.id, payload);

      if (res.statusCode === 200 || res.statusCode === 201) {
        onSuccess();
        onClose();
      } else {
        setError(res.message || "Failed to update instructor record.");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 font-sans animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 ring-1 ring-black/5 animate-scale-in my-auto max-h-[92vh] overflow-y-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0077b6] flex items-center justify-center border border-sky-100 shadow-xs shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Edit Trainer / Mentor
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Update instructor profile, specialization, and credentials
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Section 1: User Account Details */}
          <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/70 space-y-4">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#0077b6]" />
              <span>Personal Information</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none transition-all"
                  placeholder="e.g. Engr. Tanvir Ahmed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Contact Phone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none transition-all"
                    placeholder="+880 1800-000000"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address (Account Login)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    disabled
                    value={instructor.user?.email || "N/A"}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-500 font-medium cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Professional Profile */}
          <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/70 space-y-4">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#0077b6]" />
              <span>Professional & BIM Designation</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Designation / Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none transition-all"
                  placeholder="e.g. Senior BIM Specialist — Architecture"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Subject / Domain <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none transition-all"
                  placeholder="e.g. Revit Architecture & MEPF"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Experience
                </label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none transition-all"
                  placeholder="e.g. 6+ Years"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Profile Photo URL
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={profileImage}
                    onChange={(e) => setProfileImage(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:border-[#0077b6] focus:outline-none"
                    placeholder="URL or upload below"
                  />
                  {profileImage && (
                    <img
                      src={profileImage}
                      alt="Avatar"
                      className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/trainer-avatar.png";
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Photo File Upload */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Upload Profile Avatar
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-sky-50 file:text-[#0077b6] hover:file:bg-sky-100 cursor-pointer"
                  />
                  {uploadingImage && (
                    <span className="text-xs text-[#0077b6] font-bold flex items-center gap-1 shrink-0">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...
                    </span>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Technical Software & Skills (Comma-separated)
                </label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none transition-all"
                  placeholder="e.g. Autodesk Revit, Navisworks Manage, AutoCAD 2D/3D, Dynamo BIM"
                />
              </div>

              {/* Expertise */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Specialized Areas of Expertise (Comma-separated)
                </label>
                <input
                  type="text"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none transition-all"
                  placeholder="e.g. BIM Coordination, Clash Matrix, LOD 100-400 Detailing, Parametric Family Creation"
                />
              </div>

              {/* Biography */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Instructor Biography & Career Summary
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none transition-all resize-y"
                  placeholder="Detailed instructor summary, industry project experience, and training credentials..."
                />
              </div>
            </div>
          </div>

          {/* Section 3: Social Profiles */}
          <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/70 space-y-4">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#0077b6]" />
              <span>Social & Portfolio Links (Optional)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] text-xs sm:text-sm text-slate-900 focus:outline-none"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Facebook Profile URL
                </label>
                <input
                  type="url"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] text-xs sm:text-sm text-slate-900 focus:outline-none"
                  placeholder="https://facebook.com/..."
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-[#0077b6] hover:bg-[#023e8a] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-[#0077b6]/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

