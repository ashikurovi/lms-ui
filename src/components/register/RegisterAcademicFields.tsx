"use client";

import React from "react";
import { Briefcase, Building2, BookOpen, Globe, Calendar } from "lucide-react";

interface RegisterAcademicFieldsProps {
  formData: {
    institute?: string;
    department?: string;
    currentStatus?: string;
    nationality?: string;
    passingYear?: string;
    companyName?: string;
    [key: string]: any;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function RegisterAcademicFields({ formData, onChange }: RegisterAcademicFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-black uppercase tracking-wider text-[#0077b6] flex items-center gap-2 border-b border-slate-100 pb-2">
        <Briefcase className="w-4 h-4" />
        <span>2. Personal & Professional Information</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Institute Name / University Name */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-600 uppercase">
            INSTITUTE NAME / UNIVERSITY NAME
          </label>
          <div className="relative">
            <input
              type="text"
              name="institute"
              placeholder="e.g. BUET / DU / Dhaka Polytechnic"
              value={formData.institute || ""}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6] transition-all"
            />
            <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Department */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-600 uppercase">
            DEPARTMENT
          </label>
          <div className="relative">
            <input
              type="text"
              name="department"
              placeholder="e.g. Civil Engineering, EEE, Architecture"
              value={formData.department || ""}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6] transition-all"
            />
            <BookOpen className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Current Status (Dropdown) */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-600 uppercase">
            CURRENT STATUS
          </label>
          <select
            name="currentStatus"
            value={formData.currentStatus || "student"}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6] cursor-pointer transition-all"
          >
            <option value="student">Student</option>
            <option value="job_holder">Job Holder</option>
          </select>
        </div>

        {/* Nationality */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-600 uppercase">
            NATIONALITY
          </label>
          <div className="relative">
            <input
              type="text"
              name="nationality"
              placeholder="e.g. Bangladeshi"
              value={formData.nationality || ""}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6] transition-all"
            />
            <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Passing Year */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-600 uppercase">
            PASSING YEAR
          </label>
          <div className="relative">
            <input
              type="text"
              name="passingYear"
              placeholder="e.g. 2024"
              value={formData.passingYear || ""}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6] transition-all"
            />
            <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Company Name */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-600 uppercase">
            COMPANY NAME
          </label>
          <div className="relative">
            <input
              type="text"
              name="companyName"
              placeholder={formData.currentStatus === "job_holder" ? "e.g. ABC Engineering Ltd." : "e.g. ABC Ltd. (Optional)"}
              value={formData.companyName || ""}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#0077b6] transition-all"
            />
            <Briefcase className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
