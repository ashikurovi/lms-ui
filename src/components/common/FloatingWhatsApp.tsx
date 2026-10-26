"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function FloatingWhatsApp() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/dashboard")) {
    return null;
  }
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.me/8801348196498"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#25d366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer relative group"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing halo ring */}
        <span className="absolute inset-0 rounded-full bg-[#25d366] opacity-75 animate-ping" />

        <svg className="w-6 h-6 fill-current relative z-10" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
        </svg>

        {/* Tooltip on hover */}
        <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
          WhatsApp Support (+880 1348-196498)
        </span>
      </a>
    </div>
  );
}
