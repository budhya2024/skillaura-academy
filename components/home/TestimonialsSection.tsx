"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { FaQuoteLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  enrolledCourse: string;
  quote: string;
  avatar: string;
  rating: number;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "AI Specialist & Agency Founder",
    enrolledCourse: "AI Mastery",
    quote:
      "The AI Mastery course completely transformed my agency! Learning prompt engineering, ChatGPT 4o, and building automated AI agents helped us scale revenue 3x in 90 days.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Commercial Video Editor",
    enrolledCourse: "Video Editing Mastery",
    quote:
      "DaVinci Resolve color grading and sound design modules were absolute game-changers. I landed 3 high-paying commercial editing clients right after finishing!",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    rating: 5,
  },
  {
    id: 3,
    name: "Rohan Malhotra",
    role: "Brand Identity Designer",
    enrolledCourse: "Poster & Logo Design Mastery",
    quote:
      "From vector logo concepts in Illustrator to movie poster manipulation in Photoshop, the step-by-step guidance and mentorship were world-class.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
    rating: 5,
  },
  {
    id: 4,
    name: "Ananya Deshmukh",
    role: "Social Media Growth Lead",
    enrolledCourse: "Content Creation Mastery",
    quote:
      "I learned viral scriptwriting hooks and content batching systems. My Instagram account grew from 1k to over 50k followers in just 3 months!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    rating: 5,
  },
  {
    id: 5,
    name: "Karan Verma",
    role: "Executive Consultant",
    enrolledCourse: "Attraction Mastery",
    quote:
      "The public speaking charisma and voice modulation modules gave me unshakeable confidence in high-stakes investor pitch meetings. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    rating: 5,
  },
  {
    id: 6,
    name: "Simran Kaur",
    role: "Freelance Motion Artist",
    enrolledCourse: "Video Editing Mastery",
    quote:
      "The After Effects motion graphics masterclass helped me transition from basic cuts to high-end commercial motion design. Worth every rupee!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    rating: 5,
  },
];

export default function TestimonialsSection() {

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
            Hear directly from our graduates who transformed their careers and launched successful businesses through Skill Aura Academy.
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
            {TESTIMONIALS.map((item) => (
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

                  {/* Student Profile Info */}
                  <div className="flex items-center gap-3.5 pt-5 mt-6 border-t border-slate-100">
                    <div className="relative w-14 h-14 rounded-full border border-[#FDA31B] shrink-0 overflow-hidden bg-amber-50">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        width={56}
                        height={56}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-base md:text-xl font-semibold text-[#19232B] font-[family-name:var(--font-yantramanav)] leading-snug truncate">
                        {item.name}
                      </h4>
                      <span className="text-xs sm:text-sm text-[#FDA31B] block truncate font-medium">
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
