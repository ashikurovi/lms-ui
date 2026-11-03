"use client";

import React, { useState } from "react";
import { MessageCircle, LogOut, Headphones, ShieldAlert, Check } from "lucide-react";
import { authApi } from "@/services/api/authApi";

export default function DashboardSidebarFooter() {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await authApi.logout();
    } catch {}
    if (typeof window !== "undefined") {
      localStorage.removeItem("bim_access_token");
      localStorage.removeItem("bim_user_role");
      localStorage.removeItem("bim_user_name");
      localStorage.removeItem("bim_user_email");
      localStorage.removeItem("bim_user_id");
      window.location.href = "/login";
    }
  };



  return (
    <div className="p-3 border-t border-white/[0.08] bg-[#011221] space-y-2 font-sans">
      {/* WhatsApp Quick Help */}
      <a
        href="https://wa.me/8801348196498"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] text-slate-300 hover:text-white transition-all text-xs font-medium group"
      >
        <div className="flex items-center gap-2">
          <Headphones className="w-3.5 h-3.5 text-sky-400" />
          <span>Support</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Help</span>
        </div>
      </a>

      {/* Logout Controls */}
      <button
        type="button"
        onClick={handleLogout}
        disabled={loggingOut}
        className="w-full py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 hover:text-rose-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
        title="Log out from this device"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span>{loggingOut ? "Logging out..." : "Log Out"}</span>
      </button>
    </div>
  );
}
