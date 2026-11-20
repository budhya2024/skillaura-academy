"use client";

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { FaQuoteLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { getCmsData, CMS_UPDATE_EVENT, TestimonialContentItem, DEFAULT_CMS_DATA } from "../../lib/cmsData";

import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<TestimonialContentItem[]>(DEFAULT_CMS_DATA.testimonials);

  useEffect(() => {
    setTestimonials(getCmsData().testimonials);
    const handleUpdate = () => {
      setTestimonials(getCmsData().testimonials);
    };
    window.addEventListener(CMS_UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(CMS_UPDATE_EVENT, handleUpdate);
  }, []);
  return (
    <section
      id="testimonials"
      className="relative py-8 md:py-16 bg-cover bg-center bg-fixed text-white overflow-hidden font-sans"
      style={{ backgroundImage: "url('/images/testimonials-bg.jpg')" }}
    >
      {/* Dark Navy Blue Tinted Overlay */}
      <div className="absolute inset-0 bg-[#012758]/90 backdrop-blur-[2px]"></div>

      <div className="container relative z-10 space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="text-center sm:text-left space-y-3 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-yantramanav)] leading-tight">
            What Our Students <span className="text-[#FDA31B]">Say</span>
          </h2>
          <p className="text-slate-200 text-sm sm:text-base font-normal leading-relaxed">
            Hear directly from our graduates who learned real digital skills and received freelancing job opportunities through Skill Aura Academy.
          </p>
        </div>

        {/* Swiper Component */}
        <div className="py-2">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            loop={true}
            allowTouchMove={true}
            grabCursor={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            pagination={{
              clickable: true,
              el: ".testimonials-swiper-pagination",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
            }}
            className="w-full pb-10 [&_.swiper-wrapper]:!flex [&_.swiper-wrapper]:items-stretch [&_.swiper-slide]:!h-auto [&_.swiper-slide]:flex"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto flex flex-col">
                <div className="w-full bg-white rounded-tl-[50px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-[50px] p-6 sm:p-7 text-slate-800 relative flex flex-col justify-between shadow-xl border-b-4 border-[#FDA31B] flex-1 h-full min-h-[290px] sm:min-h-[310px]">
                  {/* Top-Right Quotation Icon Badge */}
                  <div className="absolute top-0 right-0 bg-[#FDA31B] text-white p-3.5 rounded-tr-[24px] rounded-bl-[24px] shadow-md">
                    <FaQuoteLeft className="w-5 h-5 text-white" />
                  </div>

                  <div className="space-y-4 pt-1">
                    {/* 5-Star Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#FDA31B] text-[#FDA31B]"
                        />
                      ))}
                    </div>

                    {/* Testimonial Quote */}
                    <div className="relative">
                      <p className="text-[#757F95] text-sm sm:text-base italic leading-relaxed font-normal relative z-10">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Student Profile Info with Initials Avatar */}
                  <div className="flex items-center gap-3.5 pt-5 mt-6 border-t border-slate-100">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr ${item.avatarBg || "from-[#116E63] to-[#1a9385]"} text-white flex items-center justify-center font-extrabold text-sm sm:text-base shadow-md shrink-0 font-[family-name:var(--font-yantramanav)] tracking-wider border-2 border-white ring-2 ring-[#FDA31B]/40`}
                    >
                      <span>{item.initials}</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-base md:text-lg font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] leading-snug truncate">
                        {item.name}
                      </h4>
                      <span className="text-xs sm:text-sm text-[#116E63] block truncate font-bold">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Pagination Container */}
        <div className="testimonials-swiper-pagination flex items-center justify-center gap-2 pt-1 [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet]:bg-white/40 [&_.swiper-pagination-bullet-active]:!w-8 [&_.swiper-pagination-bullet-active]:!bg-[#FDA31B] [&_.swiper-pagination-bullet-active]:!rounded-full [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet]:cursor-pointer"></div>
      </div>
    </section>
  );
}
