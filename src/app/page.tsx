import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ArchitectingSuccessSection from "@/components/home/ArchitectingSuccessSection";
import AutoSwipingVideoSection from "@/components/home/AutoSwipingVideoSection";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import StartToSuccess from "@/components/home/StartToSuccess";
import HowWeWorkSection from "@/components/home/HowWeWorkSection";
import RecentPortfolioSection from "@/components/home/RecentPortfolioSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import SoftwareExpertiseSection from "@/components/home/SoftwareExpertiseSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/home/FaqSection";
import RecentBlogsSection from "@/components/home/RecentBlogsSection";
import RecentGalleriesSection from "@/components/home/RecentGalleriesSection";
import CommunityCards from "@/components/home/CommunityCards";
import NoticePopup from "@/components/home/NoticePopup";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Dynamic Notice Popup */}
      <NoticePopup />

      {/* 1. Hero Section (Navy blueprint CAD + Skyscraper Wireframe) */}
      <HeroSection />

      {/* Floating Software Expertise Card (Overlaps Blue & White Junction) */}
      <SoftwareExpertiseSection />

      {/* 2. Architecting Success in the Digital Age (Dual-style Architectural Building + Overview) */}
      <ArchitectingSuccessSection />

      {/* Auto-Swiping Interactive Video Showcase */}
      <AutoSwipingVideoSection />

      {/* 3. Our Services & Specialized Courses (3D BIM Course Cards) */}
      <FeaturedCourses />

      {/* 4. Why Choose Us (6 Metric Counters with Clean Outline Icons) */}
      <StartToSuccess />

      {/* 5. How We Work (Navy Blueprint Banner with 4 White Process Cards) */}
      <HowWeWorkSection />

      {/* 6. Our Projects (Featured Isometric 3D Showcase & Portfolios) */}
      <RecentPortfolioSection />

      {/* 7. Industries We Serve (12 Dark Rounded Cards with Minimal Stroke Icons) */}
      <IndustriesSection />

      {/* 8. Our Testimonials (Deep Navy Patterned Carousel with Review Cards) */}
      <TestimonialsSection />

      {/* 10. Frequently Asked Questions from Clients & Get a Quote Today Form */}
      <FaqSection />

      {/* 11. Our Latest Blogs (Engineering & BIM Articles) */}
      <RecentBlogsSection />

      {/* 12. Student Gallery */}
      <RecentGalleriesSection />

      {/* 13. Learning Community (Facebook, YouTube, LinkedIn) */}
      <CommunityCards />
    </div>
  );
}
