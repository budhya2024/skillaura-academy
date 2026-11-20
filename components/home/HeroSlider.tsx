"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { getCmsData, CMS_UPDATE_EVENT, HeroSlideItem, DEFAULT_CMS_DATA } from "../../lib/cmsData";

export default function HeroSlider() {
  const [slides, setSlides] = useState<HeroSlideItem[]>(DEFAULT_CMS_DATA.heroSlides);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setSlides(getCmsData().heroSlides);
    const handleUpdate = () => {
      setSlides(getCmsData().heroSlides);
    };
    window.addEventListener(CMS_UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(CMS_UPDATE_EVENT, handleUpdate);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section
      className="relative w-full min-h-[520px] sm:min-h-[580px] lg:h-160 flex items-center justify-center overflow-hidden select-none bg-[#19232B]"
    >
      {/* Slides Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          {/* Background Image */}
          <Image
            src={slide.bgImage}
            alt={slide.titlePrefix + slide.titleHighlight}
            fill
            priority={index === 0}
            className="object-cover object-center transform scale-105 transition-transform duration-[10000ms] ease-out"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#19232B]/90 via-[#19232B]/70 to-[#19232B]/60"></div>
        </div>
      ))}

      {/* Main Slide Content Layer */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-0">
        <div className="max-w-3xl space-y-6 sm:space-y-8">
          {slides.map((slide, index) => {
            if (index !== currentSlide) return null;
            return (
              <div
                key={slide.id}
                className="space-y-6 sm:space-y-7 animate-in fade-in slide-in-from-bottom-6 duration-700"
              >


                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl  font-extrabold text-white leading-[1.15] tracking-[0.01em] font-[family-name:var(--font-yantramanav)] drop-shadow-md">
                  {slide.titlePrefix}
                  <span className="text-[#FDA31B]">{slide.titleHighlight}</span>
                  {slide.titleSuffix}
                </h1>

                {/* Description Subtext */}
                <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl font-normal leading-relaxed tracking-[0.01em] drop-shadow-sm">
                  {slide.description}
                </p>

                {/* CTA Action Buttons Always in Flex Row (Size SM) */}
                <div className="flex flex-wrap items-center justify-start gap-2.5 sm:gap-3 pt-2">
                  {/* Primary Orange Button */}
                  <Link
                    href={slide.primaryBtnHref}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#FDA31B] hover:bg-[#116E63] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap cursor-pointer"
                  >
                    <span>{slide.primaryBtnText}</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                  </Link>

                  {/* Secondary White Button */}
                  <Link
                    href={slide.secondaryBtnHref}
                    className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-[#FDA31B] text-[#19232B] hover:text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
                  >
                    <span>{slide.secondaryBtnText}</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrow Controls (Hidden on Mobile) */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/20 hover:bg-[#FDA31B] backdrop-blur-md text-white hidden sm:flex items-center justify-center transition-all duration-300 shadow-xl border border-white/20 hover:border-[#FDA31B] group"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/20 hover:bg-[#FDA31B] backdrop-blur-md text-white hidden sm:flex items-center justify-center transition-all duration-300 shadow-xl border border-white/20 hover:border-[#FDA31B] group"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-5 sm:bottom-28 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
              ? "w-8 bg-[#FDA31B]"
              : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
