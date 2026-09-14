import React from "react";
import Link from "next/link";

export default function ContactBanner() {
  return (
    <section
      className="relative py-24 sm:py-32 bg-cover bg-center text-white overflow-hidden"
      style={{ backgroundImage: "url('/images/hero1.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#19232B]/90 via-[#19232B]/80 to-[#19232B]/85"></div>

      <div className="container relative z-10 text-center space-y-4">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-[0.02em] font-[family-name:var(--font-yantramanav)]">
          Contact Us
        </h1>

        {/* Breadcrumb Links */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-[0.15em]">
          <Link href="/" className="hover:text-[#FDA31B] transition-colors">
            HOME
          </Link>
          <span className="text-[#FDA31B]">»</span>
          <span className="text-[#FDA31B]">CONTACT US</span>
        </div>
      </div>
    </section>
  );
}
