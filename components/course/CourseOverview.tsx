"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronDown, PlayCircle } from "lucide-react";

export interface CurriculumLesson {
  name: string;
  duration: string;
  preview: boolean;
}

export interface CurriculumModule {
  id: number;
  title: string;
  lessonsCount: string;
  duration: string;
  lessons: CurriculumLesson[];
}

export interface CourseOverviewProps {
  description?: string;
  whatYouWillLearn?: string[];
  totalModules?: string;
  totalLessons?: string;
  totalHours?: string;
  curriculum?: CurriculumModule[];
  instructorName?: string;
  instructorTitle?: string;
  instructorImage?: string;
  instructorRating?: number;
  instructorStudents?: string;
  instructorExperience?: string;
  instructorBio?: string;
}

export default function CourseOverview({
  description = "Master this comprehensive, career-focused masterclass designed by industry veterans. Learn through real-world projects, live workshops, step-by-step guidance, and certified skill assessments.",
  whatYouWillLearn = [
    "Master core concepts, frameworks, and practical strategies from ground up.",
    "Hands-on real-world projects to build a standout professional portfolio.",
    "Learn industry-standard workflows, automation techniques, and best practices.",
    "Expert tips to boost efficiency, productivity, and market readiness.",
    "Monetization strategies, freelance setup, and agency-level workflows.",
    "Lifetime access to exclusive tools, templates, and student community.",
  ],
  totalModules = "4 Modules",
  totalLessons = "70 Lessons",
  totalHours = "120 Hours Total",
  curriculum = [
    {
      id: 1,
      title: "Module 1: Foundations & Core Concepts",
      lessonsCount: "15 Lessons",
      duration: "25 Hours",
      lessons: [
        { name: "Course Introduction & Setup", duration: "30 mins", preview: true },
        { name: "Core Principles & Framework Overview", duration: "1 hr 15 mins", preview: true },
        { name: "Essential Tools & Environment", duration: "45 mins", preview: false },
      ],
    },
    {
      id: 2,
      title: "Module 2: Advanced Techniques & Practical Applications",
      lessonsCount: "20 Lessons",
      duration: "35 Hours",
      lessons: [
        { name: "Deep Dive into Advanced Strategies", duration: "1 hr 10 mins", preview: false },
        { name: "Real-World Case Studies & Analysis", duration: "50 mins", preview: false },
      ],
    },
    {
      id: 3,
      title: "Module 3: Portfolio Projects & Monetization",
      lessonsCount: "18 Lessons",
      duration: "30 Hours",
      lessons: [
        { name: "Building Capstone Project", duration: "2 hrs", preview: false },
        { name: "Freelancing & Client Acquisition", duration: "1 hr 15 mins", preview: false },
      ],
    },
  ],
  instructorName = "Alex Rivera",
  instructorTitle = "Senior Industry Specialist & Founder",
  instructorImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
  instructorRating = 4.9,
  instructorStudents = "15,400+ Students",
  instructorExperience = "10+ Years Experience",
  instructorBio = "Alex Rivera is an industry pioneer with over a decade of practical experience, having trained over 15,000 professionals and built multi-figure digital brands.",
}: CourseOverviewProps) {
  const [activeCurriculum, setActiveCurriculum] = useState<number | null>(1);

  const toggleCurriculum = (id: number) => {
    setActiveCurriculum(activeCurriculum === id ? null : id);
  };

  return (
    <div className="space-y-12 font-sans">
      {/* 1. What You Will Learn Card */}
      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19232B] font-[family-name:var(--font-yantramanav)]">
          What You Will Learn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whatYouWillLearn.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#FDA31B] shrink-0 mt-0.5" />
              <span className="text-sm font-semibold text-[#19232B] leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Guaranteed Freelancing Job Opportunity Callout */}
        <div className="p-4  bg-primary">
          <h3 className="text-sm md:text-base  text-white uppercase ">
            100% Freelancing & Client Job Opportunity Guarantee
          </h3>
          <p className="text-xs md:text-sm  text-white ">
            Every enrolled student who completes the training and masters the skills will receive direct live freelancing client work and earning opportunities.
          </p>


        </div>
      </div>

      {/* 2. Course Description */}
      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19232B] font-[family-name:var(--font-yantramanav)]">
          Course Overview
        </h2>
        <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
          <p>{description}</p>
        </div>
      </div>

      {/* 3. Course Curriculum Accordion */}
      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19232B] font-[family-name:var(--font-yantramanav)]">
            Course Curriculum
          </h2>
          <span className="text-xs font-bold text-[#757F95]">
            {totalModules} • {totalLessons} • {totalHours}
          </span>
        </div>

        <div className="space-y-4">
          {curriculum.map((module) => {
            const isOpen = activeCurriculum === module.id;
            return (
              <div
                key={module.id}
                className="border border-slate-200 rounded-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleCurriculum(module.id)}
                  className="w-full bg-[#F2F3F5] px-6 py-4 flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
                >
                  <span className="font-bold text-[#19232B] text-base font-[family-name:var(--font-yantramanav)]">
                    {module.title}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold text-[#757F95] hidden sm:inline">
                      {module.lessonsCount} ({module.duration})
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#116E63] transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-6 bg-white space-y-3 border-t border-slate-100">
                    {module.lessons.map((lesson, lIdx) => (
                      <div
                        key={lIdx}
                        className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 text-xs sm:text-sm"
                      >
                        <div className="flex items-center gap-3">
                          <PlayCircle className="w-4 h-4 text-[#FDA31B] shrink-0" />
                          <span className="font-medium text-[#19232B]">
                            {lesson.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {lesson.preview && (
                            <span className="bg-[#116E63]/10 text-[#116E63] font-bold text-[10px] uppercase px-2 py-0.5 rounded-full">
                              Free Preview
                            </span>
                          )}
                          <span className="text-[#757F95] font-semibold">
                            {lesson.duration}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
