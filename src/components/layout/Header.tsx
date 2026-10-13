"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide public website header when inside dashboard
  if (pathname && pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full max-w-full print:hidden transition-all duration-300 ease-in-out ${
        isScrolled
          ? "shadow-2xl shadow-slate-950/40 bg-[#072244]/95 backdrop-blur-md border-b border-sky-900/50"
          : "bg-[#0a284f] border-b border-white/10"
      }`}
    >
      <Navbar isScrolled={isScrolled} />
    </header>
  );
}

