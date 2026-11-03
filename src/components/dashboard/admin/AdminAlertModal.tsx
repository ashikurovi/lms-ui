"use client";

import React from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";

export type AlertModalType = "success" | "error" | "warning" | "info";

export interface AdminAlertModalProps {
  isOpen: boolean;
  type?: AlertModalType;
  title: string;
  message: string;
  statusCode?: number | string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export default function AdminAlertModal({
  isOpen,
  type = "info",
  title,
  message,
  statusCode,
  confirmText,
  cancelText,
  onClose,
  onConfirm,
}: AdminAlertModalProps) {
  const mounted = useIsMounted();

  if (!mounted || !isOpen) return null;

  const handleAction = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  const config = {
    success: {
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200 ring-4 ring-emerald-50",
      badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
      btnBg: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20",
      defaultConfirm: "Continue",
      defaultBadge: statusCode ? `Status ${statusCode} · Success` : "Success",
    },
    error: {
      icon: AlertCircle,
      iconBg: "bg-rose-50 text-rose-600 border-rose-200 ring-4 ring-rose-50",
      badgeBg: "bg-rose-100 text-rose-800 border-rose-200",
      btnBg: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20",
      defaultConfirm: "Dismiss & Fix",
      defaultBadge: statusCode ? `Status ${statusCode} · Error` : "Error Occurred",
    },
    warning: {
      icon: AlertTriangle,
      iconBg: "bg-amber-50 text-amber-600 border-amber-200 ring-4 ring-amber-50",
      badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
      btnBg: "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20",
      defaultConfirm: "Understood",
      defaultBadge: statusCode ? `Status ${statusCode} · Warning` : "Warning",
    },
    info: {
      icon: Info,
      iconBg: "bg-sky-50 text-[#0077b6] border-sky-200 ring-4 ring-sky-50",
      badgeBg: "bg-sky-100 text-sky-800 border-sky-200",
      btnBg: "bg-[#0077b6] hover:bg-[#023e8a] text-white shadow-sky-600/20",
      defaultConfirm: "OK",
      defaultBadge: statusCode ? `Status ${statusCode}` : "Notice",
    },
  }[type];

  const Icon = config.icon;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 font-sans animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 ring-1 ring-black/5 animate-scale-in my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Icon and Close Button */}
        <div className="flex items-start justify-between">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-xs transition-transform ${config.iconBg}`}
          >
            <Icon className="w-7 h-7" />
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Details */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${config.badgeBg}`}
            >
              {config.defaultBadge}
            </span>
          </div>

          <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
            {title}
          </h3>

          <p className="text-sm text-slate-600 font-medium leading-relaxed whitespace-pre-line">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
          {cancelText && (
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              {cancelText}
            </button>
          )}

          <button
            type="button"
            onClick={handleAction}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer hover:opacity-95 ${config.btnBg}`}
          >
            {confirmText || config.defaultConfirm}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

