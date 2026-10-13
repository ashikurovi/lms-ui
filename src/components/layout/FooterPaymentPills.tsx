"use client";

import React from "react";

export default function FooterPaymentPills() {
  return (
    <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
      <div className="text-xs text-slate-400 font-medium">
        © 2026 BIM Build BD. All rights reserved.
      </div>
      <div className="text-xs text-slate-400 font-medium flex items-center gap-2.5">
        <span>Global BIM Standards</span>
        <span className="text-sky-500">•</span>
        <span>ISO 19650 Practical Training</span>
      </div>
    </div>
  );
}

