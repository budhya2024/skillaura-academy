"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, BookOpen, Users, Clock, ChevronRight, Link2 } from "lucide-react";
import EnrollModal from "@/components/shared/EnrollModal";

export interface CourseCard {
  id: number;
  category: string;
  image: string;
  lessons: string;
  rating: number;
  title: string;
  description: string;
  seats: string;
  duration: string;
  price: string;
}

const COURSES_DATA: CourseCard[] = [
  {
    id: 1,
    category: "Artificial Intelligence",
    image: "/images/course-ai.jpg",
    lessons: "85 Lessons",
    rating: 5,
    title: "AI Mastery",
    description:
      "Master ChatGPT, Midjourney, AI automation, LLMs, prompt engineering, and modern AI tools for business and productivity.",
    seats: "120 Enrolled",
    duration: "06 Months",
    price: "₹4,999",
  },
  {
    id: 2,
    category: "Graphic Design",
    image: "/images/course-design.jpg",
    lessons: "64 Lessons",
    rating: 5,
    title: "Poster & Logo Design Mastery",
    description:
      "Create high-converting brand identity logos, cinematic posters, Photoshop & Illustrator masterclass from beginner to pro.",
    seats: "100 Enrolled",
    duration: "04 Months",
    price: "₹3,499",
  },
  {
    id: 3,
    category: "Personal Branding",
    image: "/images/course-attraction.jpg",
    lessons: "50 Lessons",
    rating: 5,
    title: "Attraction Mastery",
    description:
      "Unlock high-status communication, personal branding, public speaking charisma, and client attraction psychology.",
    seats: "90 Enrolled",
    duration: "03 Months",
    price: "₹3,999",
  },
  {
    id: 4,
    category: "Social Media",
    image: "/images/course-content.jpg",
    lessons: "72 Lessons",
    rating: 5,
    title: "Content Creation Mastery",
    description:
      "Build viral reels, podcasts, copywriting scripts, audience growth strategies across Instagram, YouTube, and LinkedIn.",
    seats: "150 Enrolled",
    duration: "04 Months",
    price: "₹4,499",
  },
  {
    id: 5,
    category: "Media Production",
    image: "/images/course-video.jpg",
    lessons: "90 Lessons",
    rating: 5,
    title: "Video Editing Mastery",
    description:
      "Master Adobe Premiere Pro, DaVinci Resolve, sound design, motion graphics, color grading, and commercial cinematic editing.",
    seats: "110 Enrolled",
    duration: "05 Months",
    price: "₹4,999",
  },
];

export default function CoursesSection() {
  const [selectedCourseId, setSelectedCourseId] = useState<number>(1);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const handleOpenEnroll = (courseId: number) => {
    setSelectedCourseId(courseId);
    setIsEnrollModalOpen(true);
  };

  return (
    <section id="courses" className="py-8 md:py-16 bg-white font-sans">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 max-w-3xl mx-auto space-y-3">


          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#19232B] font-[family-name:var(--font-yantramanav)] leading-tight">
            Explore Our <span className="text-[#116E63]">Top Courses</span>
          </h2>

          <p className="section-details">
            Discover industry-accredited practical courses designed to help you master AI, Graphic Design, Video Editing, Content Creation, and Personal Branding.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES_DATA.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col justify-between group"
            >
              <div>
                {/* Top Image Thumbnail */}
                <div className="relative w-full h-52 sm:h-56 rounded-xl overflow-hidden mb-4 bg-slate-100 group/thumb">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover Overlay with White Blur & Centered Zooming Link Icon */}
                  <Link
                    href={`/courses/${course.id}`}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                    aria-label={`View ${course.title}`}
                  >
                    <div className="w-14 h-14 rounded-full bg-white text-[#FDA31B] flex items-center justify-center shadow-2xl transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out">
                      <Link2 className="w-7 h-7 text-[#FDA31B] stroke-[2.5]" />
                    </div>
                  </Link>
                </div>

                {/* Lessons & Rating Row */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs sm:text-sm">
                    <BookOpen className="w-4 h-4 text-[#FDA31B]" />
                    <span>{course.lessons}</span>
                  </div>

                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(course.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#FDA31B] text-[#FDA31B]"
                      />
                    ))}
                  </div>
                </div>

                {/* Course Name (Base Font Size) */}
                <h3 className="text-base sm:text-lg font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] hover:text-[#116E63] transition-colors leading-snug my-2">
                  <Link href={`/courses/${course.id}`}>{course.title}</Link>
                </h3>

                {/* Short Description */}
                <p className="text-[#757F95] text-sm sm:text-base leading-relaxed line-clamp-3">
                  {course.description}
                </p>
              </div>

              {/* Bottom Metadata, Price Tag & Action Buttons */}
              <div className="border-t border-slate-100 pt-4 mt-4 space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#757F95]">
                  <div className="flex items-center gap-4">
                    {/* Seats */}
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#FDA31B]" />
                      <span>{course.seats}</span>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#FDA31B]" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Price Tag Pill (INR) */}
                  <div className="bg-[#116E63]/10 text-[#116E63] font-black text-sm px-3 py-1 rounded-lg">
                    {course.price}
                  </div>
                </div>

                {/* Details & Enroll Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <Link
                    href={`/courses/${course.id}`}
                    className="flex-1 bg-slate-100 hover:bg-[#116E63] text-[#19232B] hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-3 rounded-full transition-all text-center cursor-pointer"
                  >
                    DETAILS
                  </Link>

                  <button
                    onClick={() => handleOpenEnroll(course.id)}
                    className="flex-1 bg-[#FDA31B] hover:bg-[#116E63] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-center flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>ENROLL NOW</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enroll Modal Popup */}
      <EnrollModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        defaultCourseId={selectedCourseId}
      />
    </section>
  );
}
