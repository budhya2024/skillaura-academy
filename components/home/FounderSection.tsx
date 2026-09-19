"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Sparkles,
  ArrowRight,
  Quote,
  CheckCircle2,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";

export default function FounderSection() {
  return (
    <section className="pb-8 md:pb-16 bg-[#F4F8F7] font-sans">
      <div className="container">
        {/* Main Light Card Container (No Black, Clean & Professional) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border border-slate-100 relative overflow-hidden">
          {/* Subtle Decorative Gradient Accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#116E63]/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FDA31B]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left Column: Clean Portrait Photo Frame (lg:col-span-5) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm">
                {/* Photo Frame with Teal/Gold Border Accent */}
                <div className="relative rounded-full overflow-hidden bg-slate-100 border-2 border-[#116E63]/20 shadow-md aspect-[3/4] group">
                  <Image
                    src="/images/founder.jpeg"
                    alt="Subha Kumar Mahata - Founder & CEO of Skill Aura Academy"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    priority
                  />

                </div>

                {/* Floating Accredited Badge */}

              </div>
            </div>

            {/* Right Column: Founder Details & Story (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-5">


              {/* Founder Name & Designation on Right Side */}
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#19232B] font-[family-name:var(--font-yantramanav)] tracking-tight">
                  SUBHA KUMAR MAHATA
                </h2>
                <p className="text-xs sm:text-sm font-bold text-[#116E63]">
                  Founder, CEO & Lead Educator | Skill Aura Academy
                </p>
              </div>

              {/* Quote Box in Soft Teal/Amber Light Card */}
              <div className="relative bg-[#F4FAF8] border-l-4 border-[#116E63] rounded-r-xl p-4 shadow-xs">
                <Quote className="w-6 h-6 text-[#116E63]/20 absolute top-2 right-3" />
                <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed pr-6">
                  &ldquo;Education without practical execution is incomplete. At Skill Aura Academy, our mission is to empower youth with high-income practical digital skills to build rewarding careers and achieve financial independence.&rdquo;
                </p>
              </div>

              {/* Bio Summary */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Under the visionary leadership of <strong>Subha Kumar Mahata</strong>, Skill Aura Academy has grown into a leading 100% online practical learning platform. With project-focused masterclasses in Video Editing, Graphic Design, Content Creation, Performance Marketing, and Sales, we equip students with real-world industry competencies.
              </p>

              {/* Special Freelancing Job Opportunity Banner in English */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[#116E63]/10 via-[#FDA31B]/10 to-[#116E63]/10 border border-[#116E63]/25 flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#116E63] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm text-sm">
                  💼
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-black text-[#19232B] font-[family-name:var(--font-yantramanav)] uppercase tracking-wide">
                      100% Freelancing & Job Opportunity Support
                    </h4>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#116E63] text-white">
                      Guaranteed For All Learners
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-medium">
                    Every student who enrolls, completes their masterclass, and masters skills will be directly provided with live freelance client projects, gig acquisition support, and income opportunities.
                  </p>
                </div>
              </div>

              {/* 3 Compact Metric Highlights */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-2.5 sm:p-3 text-center">
                  <span className="block text-lg sm:text-xl font-black text-[#116E63] font-[family-name:var(--font-yantramanav)]">
                    25,000+
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-500">
                    Students Guided
                  </span>
                </div>

                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-2.5 sm:p-3 text-center">
                  <span className="block text-lg sm:text-xl font-black text-[#FDA31B] font-[family-name:var(--font-yantramanav)]">
                    100%
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-500">
                    Online System
                  </span>
                </div>

                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-2.5 sm:p-3 text-center">
                  <span className="block text-lg sm:text-xl font-black text-[#116E63] font-[family-name:var(--font-yantramanav)]">
                    7+
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-500">
                    Masterclasses
                  </span>
                </div>
              </div>





            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
