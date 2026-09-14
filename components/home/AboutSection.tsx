"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, GraduationCap, Award, ChevronRight, Headphones } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-20 bg-[#F8F9FA] overflow-hidden font-sans">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Image Collage (lg:col-span-6) */}
          <div className="lg:col-span-6 relative pb-6 sm:pb-8">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 items-center">
              {/* 1. Tall Left Image with Custom Asymmetric Corner Radius */}
              <div
                className="relative h-[360px] sm:h-[440px] w-full overflow-hidden shadow-xl"
                style={{ borderRadius: "80px 80px 0 80px" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600"
                  alt="Student Studying"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Right Side Stack: Circular Top Image & Lower Arch Image */}
              <div className="space-y-4 sm:space-y-6">
                {/* 2. Top Right Circular Image with Dashed Border */}
                <div className="relative w-36 h-36 sm:w-60 sm:h-60 mx-auto rounded-full border-2 border-dashed border-[#FDA31B] p-1.5 shadow-md bg-white">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400"
                      alt="Group Study"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* 3. Bottom Right Image with Custom Corner Radius */}
                <div
                  className="relative h-44 sm:h-80 w-full overflow-hidden shadow-lg"
                  style={{ borderRadius: "0 80px 80px 80px" }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=400"
                    alt="Teacher and Student Mentorship"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 4. Bottom Left Floating Orange Quality Service Badge */}
            <div
              className="absolute -bottom-2 left-2 sm:left-4 bg-[#FDA31B] text-white flex items-center gap-3.5 z-20 transition-transform duration-300"
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "left",
                background: "#FDA31B",
                padding: "15px 20px 15px 15px",
                color: "#ffffff",
                borderRadius: "50px 50px 50px 0",
                boxShadow: "0 0 40px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="w-11 h-11 rounded-full bg-white text-[#FDA31B] flex items-center justify-center shrink-0 shadow-sm">
                <Award className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="pr-1">
                <h4 className="text-sm md:text-base font-extrabold font-[family-name:var(--font-yantramanav)] leading-tight text-white">
                  15+ Years Of
                </h4>
                <p className="text-xs md:text-sm font-bold text-white/95 leading-tight">
                  Quality Education Service
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Feature Cards (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-5 pt-4 lg:pt-0">
            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#19232B] font-[family-name:var(--font-yantramanav)] leading-[1.15] tracking-tight">
              Our Education System <span className="text-[#FDA31B]">Inspires</span> You More.
            </h2>

            {/* Subtext Paragraph */}
            <p className="text-[#6C757D] text-sm md:text-base leading-relaxed font-normal">
              Skill Aura Academy provides world-class educational opportunities through practical hands-on learning, career-focused degree pathways, and industry-accredited certifications.
            </p>

            {/* Features Row & Quote Callout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch pt-2">
              {/* Left Column: 2 Feature Items (md:col-span-7) */}
              <div className="md:col-span-7 space-y-5 flex flex-col justify-center">
                {/* Feature 1 */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FDA31B] to-[#ffb84d] text-white flex items-center justify-center shrink-0 shadow-md">
                    <BookOpen className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)]">
                      Edukation Services
                    </h3>
                    <p className="text-[#6C757D] text-sm md:text-base leading-relaxed mt-0.5">
                      Comprehensive academic curriculum designed by industry experts and veteran university professors.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FDA31B] to-[#ffb84d] text-white flex items-center justify-center shrink-0 shadow-md">
                    <GraduationCap className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)]">
                      International Hubs
                    </h3>
                    <p className="text-[#6C757D] text-sm md:text-base leading-relaxed mt-0.5">
                      Worldwide recognized pathways, global student community, and 1-on-1 career mentorship.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Soft Mint Teal Quote Callout Box (md:col-span-5) */}
              <div className="md:col-span-5 bg-[#EAF5F3] rounded-2xl p-5 relative flex flex-col justify-between border border-[#116E63]/15 shadow-sm min-h-[160px]">
                <p className="text-[#3A4E5E] font-medium text-sm md:text-base leading-relaxed relative z-10">
                  It is a long established fact that a reader will be distracted by the content of a page when looking at its reader for the long words layout.
                </p>

                {/* Green 99 Watermark in Bottom Right */}
                <div className="text-right pt-3">
                  <span className="text-[#116E63] font-black text-4xl leading-none opacity-90 select-none">
                    99
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Action Row: DISCOVER MORE Button + Call Now Widget */}
            <div className="pt-3 flex flex-wrap items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#FDA31B] hover:bg-[#116E63] text-white font-extrabold text-sm md:text-base tracking-wider uppercase px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span>DISCOVER MORE</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </Link>

              {/* Call Now Widget */}
              <a
                href="tel:+919144288641"
                className="flex items-center gap-3 group hover:opacity-90 transition-opacity"
              >
                <div className="w-11 h-11 rounded-full bg-[#116E63] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Headphones className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="block text-sm md:text-base font-extrabold text-[#FDA31B] leading-none uppercase tracking-wide">
                    Call Now
                  </span>
                  <span className="block text-sm sm:text-base font-black text-[#19232B] font-[family-name:var(--font-yantramanav)] mt-1">
                    +91 91442 88641
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
