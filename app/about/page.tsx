import React from "react";
import Link from "next/link";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import AboutSection from "../../components/home/AboutSection";
import FounderSection from "../../components/home/FounderSection";
import CounterSection from "../../components/home/CounterSection";
import TestimonialsSection from "../../components/home/TestimonialsSection";
import { ChevronRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F2F3F5] flex flex-col font-sans">
      {/* Navigation Header */}
      <Header />

      {/* About Banner / Breadcrumb Hero */}
      <section
        className="relative py-20 sm:py-24 bg-cover bg-center bg-fixed text-white overflow-hidden"
        style={{ backgroundImage: "url('/images/hero1.jpg')" }}
      >
        {/* Dark Tinted Overlay */}
        <div className="absolute inset-0 bg-[#19232B]/85 backdrop-blur-[2px]"></div>

        <div className="container relative z-10 text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-[family-name:var(--font-yantramanav)] tracking-[0.02em]">
            About Us
          </h1>

          {/* Breadcrumbs Navigation */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-[0.15em]">
            <Link href="/" className="hover:text-[#FDA31B] transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-4 h-4 text-[#FDA31B]" />
            <span className="text-[#FDA31B]">ABOUT US</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1">
        {/* About Section (Eduka Photo Collage Layout) */}
        <AboutSection />

        {/* Founder Section (SUBHA KUMAR MAHATA) */}
        <FounderSection />

        <div className="flex flex-col gap-8 md:gap-16 mb-8 md:mb-16">
          {/* Counter / Stats Section */}
          <CounterSection />
          {/* Testimonials Section */}
          <TestimonialsSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
