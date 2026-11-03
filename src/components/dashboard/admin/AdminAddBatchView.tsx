"use client";

import React, { useState, useEffect } from "react";
import { Layers, ArrowLeft } from "lucide-react";
import { batchesApi, CreateBatchPayload } from "@/services/api/batchesApi";
import { coursesApi } from "@/services/api/coursesApi";
import AdminAlertModal, { AlertModalType } from "./AdminAlertModal";

interface AdminAddBatchViewProps {
  onBack: () => void;
  onAdd: (batch: CreateBatchPayload) => void | Promise<void>;
}

export default function AdminAddBatchView({
  onBack,
  onAdd,
}: AdminAddBatchViewProps) {
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([]);
  
  const [form, setForm] = useState<CreateBatchPayload>({
    course_id: "",
    name: "",
    code: "",
    start_date: "",
    end_date: "",
    registration_start: "",
    registration_end: "",
    capacity: 50,
    status: "upcoming",
    mode: "online",
    class_type: "live",
    price: 0,
    discount_price: 0,
    fb_group_link: "",
    timezone: "Asia/Dhaka",
  });
  
  const [loading, setLoading] = useState(false);

  // Alert Modal State
  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: AlertModalType;
    title: string;
    message: string;
    statusCode?: number | string;
    confirmText?: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  useEffect(() => {
    coursesApi.getAllCourses({ limit: 100 }).then((res) => {
      if (res.statusCode === 200 && res.data?.items) {
        setCourses(res.data.items);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.course_id) {
      setAlertModal({
        isOpen: true,
        type: "warning",
        title: "Course Selection Required",
        message: "Please select a course for this batch before proceeding.",
        confirmText: "OK",
        onConfirm: () => setAlertModal((p) => ({ ...p, isOpen: false })),
      });
      return;
    }

    if (!form.name.trim() || !form.code.trim()) {
      setAlertModal({
        isOpen: true,
        type: "warning",
        title: "Batch Name & Code Required",
        message: "Please enter both a batch name and a batch code.",
        confirmText: "OK",
        onConfirm: () => setAlertModal((p) => ({ ...p, isOpen: false })),
      });
      return;
    }

    setLoading(true);
    try {
      const res = await batchesApi.createBatch(form);
      if (res.statusCode === 201 || res.statusCode === 200) {
        const savedCode = res.data?.code || form.code;
        const wasAutoIncremented = savedCode !== form.code;

        setAlertModal({
          isOpen: true,
          type: "success",
          statusCode: res.statusCode,
          title: "Batch Launched Successfully!",
          message: wasAutoIncremented
            ? `Batch "${form.name}" launched successfully! The code "${form.code}" was already taken, so it was automatically made unique as "${savedCode}".`
            : res.message ||
              `The batch "${form.name}" (${savedCode}) has been successfully created and launched.`,
          confirmText: "View Batches",
          onConfirm: () => {
            setAlertModal((p) => ({ ...p, isOpen: false }));
            onAdd({ ...form, code: savedCode });
            onBack();
          },
        });
      } else {
        const rawMsg = Array.isArray(res.message)
          ? res.message.join("\n")
          : res.message || res.error || "Unable to create batch.";

        const isDuplicateCode =
          res.statusCode === 409 ||
          rawMsg.toLowerCase().includes("code") ||
          rawMsg.toLowerCase().includes("slug") ||
          rawMsg.toLowerCase().includes("already taken") ||
          rawMsg.toLowerCase().includes("already exists") ||
          rawMsg.toLowerCase().includes("duplicate key");

        setAlertModal({
          isOpen: true,
          type: isDuplicateCode ? "warning" : "error",
          statusCode: res.statusCode || (isDuplicateCode ? 409 : 400),
          title: isDuplicateCode ? "Duplicate Batch Code" : "Batch Creation Failed",
          message: isDuplicateCode
            ? (rawMsg.toLowerCase().includes("already taken") || rawMsg.toLowerCase().includes("already exists")
                ? rawMsg
                : `The batch code "${form.code}" is already in use. Please enter a different code or modify the batch name.`)
            : rawMsg,
          confirmText: isDuplicateCode ? "Change Code & Retry" : "Dismiss & Review",
          onConfirm: () => setAlertModal((p) => ({ ...p, isOpen: false })),
        });
      }
    } catch (err: any) {
      const errMsg = err?.message || "";
      const isDuplicateCode =
        err?.statusCode === 409 ||
        errMsg.toLowerCase().includes("code") ||
        errMsg.toLowerCase().includes("slug") ||
        errMsg.toLowerCase().includes("already taken") ||
        errMsg.toLowerCase().includes("already exists") ||
        errMsg.toLowerCase().includes("duplicate key");

      setAlertModal({
        isOpen: true,
        type: isDuplicateCode ? "warning" : "error",
        statusCode: err?.statusCode || (isDuplicateCode ? 409 : 500),
        title: isDuplicateCode ? "Duplicate Batch Code" : "Submission Error",
        message: isDuplicateCode
          ? `The batch code "${form.code}" is already taken by another batch. Please choose a different code.`
          : errMsg || "An unexpected server or network error occurred while submitting the batch.",
        confirmText: isDuplicateCode ? "Change Code & Retry" : "Dismiss",
        onConfirm: () => setAlertModal((p) => ({ ...p, isOpen: false })),
      });
    } finally {
      setLoading(false);
    }
  };

  const update = (k: keyof CreateBatchPayload, v: any) => setForm((p) => ({ ...p, [k]: v }));

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const code = name.split(/\s+/).map(w => w.match(/[A-Za-z0-9]/) ? w.replace(/[^A-Za-z0-9]/g, '')[0].toUpperCase() : '').join('') + (name.match(/\d+/) ? name.match(/\d+/)?.[0] : '');
    const fallbackCode = name.toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setForm(p => ({ ...p, name, code: fallbackCode }));
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans animate-in fade-in duration-200">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
        <button onClick={onBack} className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#0077b6]" /> Launch New Batch
          </h2>
          <p className="text-sm text-slate-500 mt-1">Configure schedule, pricing, and details below.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Basic Information</h3>
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Course *</label>
            <select required value={form.course_id} onChange={(e) => update("course_id", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none">
              <option value="">Select a Course</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Batch Name *</label>
              <input type="text" required placeholder="e.g. Full Stack - Batch 1" value={form.name} onChange={handleNameChange} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Batch Code *</label>
              <input type="text" required placeholder="e.g. FSWD-B1" value={form.code} onChange={(e) => update("code", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] uppercase font-bold focus:outline-none" />
              <p className="text-[11px] text-slate-400 mt-1">Unique batch identifier (automatically made unique if already in use)</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Pricing & Schedule</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-semibold">
            <div>
              <label className="font-sans font-bold text-slate-700 block mb-1.5">Regular Fee (BDT ৳)</label>
              <input type="number" required placeholder="20000" value={form.price} onChange={(e) => update("price", parseFloat(e.target.value) || 0)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div>
              <label className="font-sans font-bold text-slate-700 block mb-1.5">Discount Offer Fee (BDT ৳)</label>
              <input type="number" required placeholder="16000" value={form.discount_price} onChange={(e) => update("discount_price", parseFloat(e.target.value) || 0)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none font-bold text-[#0077b6]" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Start Date</label>
              <input type="datetime-local" value={form.start_date ? form.start_date.slice(0, 16) : ""} onChange={(e) => update("start_date", new Date(e.target.value).toISOString())} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">End Date</label>
              <input type="datetime-local" value={form.end_date ? form.end_date.slice(0, 16) : ""} onChange={(e) => update("end_date", new Date(e.target.value).toISOString())} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Registration Start</label>
              <input type="datetime-local" value={form.registration_start ? form.registration_start.slice(0, 16) : ""} onChange={(e) => update("registration_start", new Date(e.target.value).toISOString())} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Registration End</label>
              <input type="datetime-local" value={form.registration_end ? form.registration_end.slice(0, 16) : ""} onChange={(e) => update("registration_end", new Date(e.target.value).toISOString())} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Configuration</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Capacity</label>
              <input type="number" required min="1" value={form.capacity} onChange={(e) => update("capacity", parseInt(e.target.value) || 0)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Status</label>
              <select value={form.status} onChange={(e) => update("status", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none">
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Mode</label>
              <select value={form.mode} onChange={(e) => update("mode", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none">
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Class Type</label>
              <select value={form.class_type} onChange={(e) => update("class_type", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none">
                <option value="live">Live</option>
                <option value="recorded">Recorded</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5">FB Support Group Link</label>
            <input type="url" placeholder="https://facebook.com/groups/..." value={form.fb_group_link} onChange={(e) => update("fb_group_link", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#0077b6] focus:outline-none font-semibold text-xs" />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <button type="button" onClick={onBack} disabled={loading} className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer">Cancel</button>
          <button type="submit" disabled={loading} className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold shadow-md transition-all cursor-pointer hover:scale-102 disabled:opacity-50">
            {loading ? "Launching..." : "Launch Live Batch"}
          </button>
        </div>
      </form>

      {/* Alert Modal */}
      <AdminAlertModal
        isOpen={alertModal.isOpen}
        type={alertModal.type}
        title={alertModal.title}
        message={alertModal.message}
        statusCode={alertModal.statusCode}
        confirmText={alertModal.confirmText}
        onClose={() => setAlertModal((p) => ({ ...p, isOpen: false }))}
        onConfirm={alertModal.onConfirm}
      />
    </div>
  );
}
