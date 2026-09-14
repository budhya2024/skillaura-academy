import React from "react";
import Link from "next/link";

export interface CourseBannerProps {
  title: string;
  category?: string;
  rating?: number;
  reviewsCount?: number;
  instructorName?: string;
  lastUpdated?: string;
  language?: string;
}

export default function CourseBanner({
  title,
}: CourseBannerProps) {
  return (
    <section
      className="relative py-16 sm:py-20 bg-cover bg-center text-white overflow-hidden"
      style={{ backgroundImage: "url('/images/hero1.jpg')" }}
    >
      {/* Dark Teal Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#19232B]/95 via-[#0d5950]/90 to-[#19232B]/90"></div>

      <div className="container relative z-10 space-y-4">
        {/* Course Main Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-[0.01em] font-[family-name:var(--font-yantramanav)] leading-tight max-w-4xl">
          {title}
        </h1>

        {/* Breadcrumb Links */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-[0.12em] pt-1">
          <Link href="/" className="hover:text-[#FDA31B] transition-colors">
            HOME
          </Link>
          <span className="text-[#FDA31B]">»</span>
          <Link href="/#courses" className="hover:text-[#FDA31B] transition-colors">
            COURSES
          </Link>
          <span className="text-[#FDA31B]">»</span>
          <span className="text-[#FDA31B]">{title}</span>
        </div>
      </div>
    </section>
  );
}
