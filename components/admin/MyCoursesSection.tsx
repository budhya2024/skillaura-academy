"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PlayCircle,
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  Download,
  ExternalLink,
  ChevronRight,
  FileText,
  Sparkles,
  Lock,
  Layers,
  Search,
  Filter,
  X,
  GraduationCap,
  Briefcase,
} from "lucide-react";

export interface EnrolledCourse {
  id: number;
  title: string;
  category: string;
  image: string;
  instructor: string;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  status: "in-progress" | "completed";
  lastAccessed: string;
  certificateEarned: boolean;
  certificateId?: string;
  modules: {
    title: string;
    duration: string;
    lessons: {
      name: string;
      duration: string;
      completed: boolean;
    }[];
  }[];
}

const ENROLLED_COURSES: EnrolledCourse[] = [
  {
    id: 1,
    title: "Business Mastery & High-Ticket Closing",
    category: "Business & Sales",
    image: "/images/course2.jpg",
    instructor: "SkillAura Master / Leadership Team",
    totalLessons: 55,
    completedLessons: 43,
    duration: "04 Months / 70 Hours",
    status: "in-progress",
    lastAccessed: "Today, 10:45 AM",
    certificateEarned: false,
    modules: [
      {
        title: "Module 1: Psychological Selling Fundamentals",
        duration: "12 Hours",
        lessons: [
          { name: "The Psychology of Buying Decisions", duration: "45 mins", completed: true },
          { name: "Building Instant Rapport & Trust", duration: "50 mins", completed: true },
          { name: "Identifying Customer Pain Points", duration: "55 mins", completed: true },
        ],
      },
      {
        title: "Module 2: High-Ticket Objection Elimination",
        duration: "18 Hours",
        lessons: [
          { name: "Mastering the 'Too Expensive' Objection", duration: "40 mins", completed: true },
          { name: "Closing Frameworks for 100% Active Direct Sales", duration: "60 mins", completed: true },
          { name: "Urgency and Scarcity Creation", duration: "35 mins", completed: false },
        ],
      },
      {
        title: "Module 3: Scaling Direct Affiliate Conversions",
        duration: "20 Hours",
        lessons: [
          { name: "Automating Follow-up Workflows", duration: "45 mins", completed: false },
          { name: "Live Roleplay & Client Call Recordings", duration: "90 mins", completed: false },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Video Editing Mastery & Cinematic Reels",
    category: "Video Editing",
    image: "/images/video.jpeg",
    instructor: "Alex Rivera & Motion Team",
    totalLessons: 80,
    completedLessons: 48,
    duration: "05 Months / 100 Hours",
    status: "in-progress",
    lastAccessed: "Yesterday, 04:20 PM",
    certificateEarned: false,
    modules: [
      {
        title: "Module 1: Mobile & Desktop Workflows (Premiere Pro & CapCut)",
        duration: "20 Hours",
        lessons: [
          { name: "Timeline Setup and Keyframe Animation", duration: "50 mins", completed: true },
          { name: "Sound Design & Cinematic Impact Effects", duration: "60 mins", completed: true },
          { name: "Color Grading with Pro LUTs", duration: "45 mins", completed: true },
        ],
      },
      {
        title: "Module 2: Viral Hooks & Fast Paced Retention Edits",
        duration: "30 Hours",
        lessons: [
          { name: "First 3-Second Retention Mastery", duration: "40 mins", completed: true },
          { name: "Dynamic Typography & Motion Titles", duration: "55 mins", completed: false },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Poster, Brand Identity & Logo Design Mastery",
    category: "Graphic Design",
    image: "/images/course-design.jpg",
    instructor: "Priya Sharma (Senior Art Director)",
    totalLessons: 65,
    completedLessons: 65,
    duration: "04 Months / 80 Hours",
    status: "completed",
    lastAccessed: "12 Nov 2026",
    certificateEarned: true,
    certificateId: "SKA-CERT-2026-9812",
    modules: [
      {
        title: "Module 1: Visual Design Theory & Vector Geometry",
        duration: "25 Hours",
        lessons: [
          { name: "Color Harmony & Hierarchy", duration: "60 mins", completed: true },
          { name: "Vector Logo Crafting in Illustrator & Canva", duration: "75 mins", completed: true },
        ],
      },
      {
        title: "Module 2: Client Brand Guidelines & Portfolio Delivery",
        duration: "35 Hours",
        lessons: [
          { name: "Exporting Multi-Asset Brand Guidelines", duration: "60 mins", completed: true },
          { name: "Live Client Design Case Study", duration: "90 mins", completed: true },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Content Creation Mastery & Viral Scripting",
    category: "Social Media",
    image: "/images/course-content.jpg",
    instructor: "Rahul Verma & Creative Collective",
    totalLessons: 60,
    completedLessons: 24,
    duration: "04 Months / 65 Hours",
    status: "in-progress",
    lastAccessed: "08 Nov 2026",
    certificateEarned: false,
    modules: [
      {
        title: "Module 1: Audience Research & Content Architecture",
        duration: "18 Hours",
        lessons: [
          { name: "Reverse-Engineering 1M+ View Reels", duration: "45 mins", completed: true },
          { name: "High-Retention Storytelling Frameworks", duration: "50 mins", completed: true },
        ],
      },
      {
        title: "Module 2: Monetization & Sponsor Partnerships",
        duration: "22 Hours",
        lessons: [
          { name: "Direct Pitch Email Templates for Brands", duration: "40 mins", completed: false },
          { name: "Affiliate Link Embeds in Social Media", duration: "45 mins", completed: false },
        ],
      },
    ],
  },
];

export default function MyCoursesSection() {
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);

  const filteredCourses = ENROLLED_COURSES.filter((course) => {
    const matchesFilter = filter === "all" || course.status === filter;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalCompletedLessons = ENROLLED_COURSES.reduce(
    (sum, c) => sum + c.completedLessons,
    0
  );
  const totalAllLessons = ENROLLED_COURSES.reduce(
    (sum, c) => sum + c.totalLessons,
    0
  );
  const overallPercentage = Math.round(
    (totalCompletedLessons / totalAllLessons) * 100
  );

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Top Executive Learning Hub Banner */}
      <div className="bg-white border border-slate-200 p-5 sm:p-6 shadow-xs rounded-[4px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-[4px] bg-[#116E63]/10 text-[#116E63] flex items-center justify-center shrink-0 border border-[#116E63]/20">
              <GraduationCap className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-[4px]">
                  Enrolled Student Portal
                </span>
                <span className="text-xs text-slate-500 font-mono font-bold">
                  Active Access
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-yantramanav)] uppercase text-slate-900 leading-tight">
                My Enrolled Courses &amp; Training Hub
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Master career skills, complete live project exercises, and unlock live freelancing client work.
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="w-full lg:w-auto grid grid-cols-3 gap-2.5 sm:gap-4 bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-[4px]">
            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold block truncate">
                Enrolled Courses
              </span>
              <span className="text-base sm:text-xl font-black text-slate-900 font-mono block truncate mt-0.5">
                {ENROLLED_COURSES.length} Courses
              </span>
            </div>
            <div className="border-l border-slate-200 pl-3">
              <span className="text-xs text-slate-500 uppercase font-semibold block truncate">
                Lessons Completed
              </span>
              <span className="text-base sm:text-xl font-black text-[#116E63] font-mono block truncate mt-0.5">
                {totalCompletedLessons}/{totalAllLessons}
              </span>
            </div>
            <div className="border-l border-slate-200 pl-3">
              <span className="text-xs text-slate-500 uppercase font-semibold block truncate">
                Certificates
              </span>
              <span className="text-base sm:text-xl font-black text-amber-600 font-mono block truncate mt-0.5">
                1 Verified
              </span>
            </div>
          </div>
        </div>

        {/* Overall Curriculum Progress Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1.5">
            <span className="text-slate-700">Overall Course Progress:</span>
            <span className="font-mono text-[#116E63] font-bold">
              {overallPercentage}% Completed ({totalCompletedLessons} Lessons Mastered)
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 border border-slate-200 overflow-hidden rounded-[4px]">
            <div
              className="h-full bg-gradient-to-r from-[#116E63] to-emerald-500 transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 2. Freelancing & Client Support Guarantee Callout */}
      <div className="bg-[#116E63]/10 border border-[#116E63]/25 p-4 rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#116E63] text-white flex items-center justify-center shrink-0">
            <Briefcase className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              100% Freelancing Support &amp; Client Projects Guarantee
            </h4>
            <p className="text-xs text-slate-600">
              Partners who finish &ge;75% of their course modules receive direct freelance client referrals and earning projects.
            </p>
          </div>
        </div>
        <Link
          href="/courses"
          className="shrink-0 px-3.5 py-1.5 bg-white hover:bg-slate-50 text-[#116E63] border border-[#116E63]/30 font-bold text-xs uppercase tracking-wider transition-colors rounded-[4px]"
        >
          Browse More Courses
        </Link>
      </div>

      {/* 3. Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white border border-slate-200 p-3 sm:px-4 rounded-[4px]">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-[4px] ${
              filter === "all"
                ? "bg-[#116E63] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            All ({ENROLLED_COURSES.length})
          </button>
          <button
            onClick={() => setFilter("in-progress")}
            className={`px-3 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-[4px] ${
              filter === "in-progress"
                ? "bg-[#116E63] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            In Progress (3)
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-[4px] ${
              filter === "completed"
                ? "bg-[#116E63] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Completed (1)
          </button>
        </div>

        {/* Search Field */}
        <div className="relative sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search enrolled course..."
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-slate-200 focus:outline-none focus:border-[#116E63] text-slate-800 rounded-[4px]"
          />
        </div>
      </div>

      {/* 4. Enrolled Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {filteredCourses.map((course) => {
          const progressPercent = Math.round(
            (course.completedLessons / course.totalLessons) * 100
          );
          return (
            <div
              key={course.id}
              className="bg-white border border-slate-200 shadow-xs hover:border-[#116E63]/40 transition-all rounded-[4px] overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Course Banner Image & Status */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-white/95 text-slate-900 font-bold text-[11px] uppercase tracking-wider px-2 py-0.5 border border-slate-200 rounded-[4px] shadow-xs">
                    {course.category}
                  </span>

                  {/* Status Pill */}
                  <span
                    className={`absolute top-3 right-3 font-bold text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-[4px] shadow-xs ${
                      course.status === "completed"
                        ? "bg-emerald-600 text-white"
                        : "bg-[#FDA31B] text-slate-950 font-black"
                    }`}
                  >
                    {course.status === "completed" ? "Completed" : "In Progress"}
                  </span>

                  {/* Bottom Image Stats */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 drop-shadow-sm font-medium">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{course.totalLessons} Lessons</span>
                    </span>
                    <span className="flex items-center gap-1 drop-shadow-sm font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </span>
                  </div>
                </div>

                {/* Course Details Body */}
                <div className="p-4 sm:p-5 space-y-3.5">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug font-[family-name:var(--font-yantramanav)] uppercase">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Mentor: <strong className="text-slate-700">{course.instructor}</strong>
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="space-y-1.5 bg-slate-50 border border-slate-200/80 p-3 rounded-[4px]">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-600">Course Completion:</span>
                      <span className="font-mono text-slate-900 font-bold">
                        {progressPercent}% ({course.completedLessons}/{course.totalLessons} Lessons)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 overflow-hidden rounded-[4px]">
                      <div
                        className={`h-full ${
                          course.status === "completed"
                            ? "bg-emerald-600"
                            : "bg-[#116E63]"
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                      <span>Last accessed: {course.lastAccessed}</span>
                      {course.certificateEarned && (
                        <span className="font-bold text-emerald-700 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" /> Certificate Ready
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex items-center gap-2.5">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="flex-1 bg-[#116E63] hover:bg-[#0c5c53] text-white py-2.5 px-3 rounded-[4px] font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>
                    {course.status === "completed" ? "Review Course" : "Continue Learning"}
                  </span>
                </button>

                {course.certificateEarned ? (
                  <button
                    onClick={() =>
                      alert(
                        `Downloading Official Certificate for "${course.title}". Certificate ID: ${course.certificateId}`
                      )
                    }
                    className="px-3 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-[4px] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Download Verified Certificate"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Certificate</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-[4px] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="View Course Syllabus"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">Syllabus</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="bg-white border border-slate-200 p-8 text-center rounded-[4px] space-y-3">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">No courses match your filter</h4>
          <p className="text-xs text-slate-500">
            Try adjusting your search query or switch tabs to view all enrolled courses.
          </p>
        </div>
      )}

      {/* 5. Course Syllabus & Lesson Modal Player */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white max-w-2xl w-full border border-slate-300 shadow-2xl rounded-[4px] overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FDA31B] bg-slate-800 px-2 py-0.5 rounded-[4px]">
                  {selectedCourse.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold mt-1 text-white uppercase font-[family-name:var(--font-yantramanav)]">
                  {selectedCourse.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="w-8 h-8 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Modules & Lessons (Scrollable) */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              {/* Notice */}
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-[4px] flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#116E63] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#116E63]">Live Learning Access:</strong> Complete each module lesson sequentially to unlock practical assignments, quizzes, and your accredited certification.
                </div>
              </div>

              {/* Modules Accordion / List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Course Modules &amp; Video Lessons
                </h4>

                {selectedCourse.modules.map((module, mIdx) => (
                  <div
                    key={mIdx}
                    className="border border-slate-200 rounded-[4px] overflow-hidden bg-white shadow-2xs"
                  >
                    <div className="bg-slate-50 p-3 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>{module.title}</span>
                      <span className="text-slate-500 font-mono font-normal">
                        {module.duration}
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100">
                      {module.lessons.map((lesson, lIdx) => (
                        <div
                          key={lIdx}
                          onClick={() =>
                            alert(
                              `Starting Video Lesson: "${lesson.name}" (${lesson.duration}). High-definition video player streaming live.`
                            )
                          }
                          className="p-3 flex items-center justify-between text-xs hover:bg-teal-50/40 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-2.5">
                            {lesson.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                              <PlayCircle className="w-4 h-4 text-slate-400 group-hover:text-[#116E63] shrink-0 transition-colors" />
                            )}
                            <span
                              className={`font-medium ${
                                lesson.completed
                                  ? "text-slate-700 line-through decoration-slate-400"
                                  : "text-slate-900 group-hover:text-[#116E63] font-semibold"
                              }`}
                            >
                              {lesson.name}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {lesson.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-600">
                Total Lessons: <strong>{selectedCourse.totalLessons}</strong>
              </span>
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 bg-[#116E63] hover:bg-[#0c5c53] text-white font-bold text-xs uppercase tracking-wider rounded-[4px] transition-colors cursor-pointer"
              >
                Done Viewing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
