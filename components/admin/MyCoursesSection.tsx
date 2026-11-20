"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PlayCircle,
  Search,
  LayoutGrid,
  List,
  CheckCircle2,
  Clock,
  BookOpen,
  Filter,
} from "lucide-react";
import { ENROLLED_COURSES_DATA, EnrolledCourse } from "../../lib/coursesData";

export default function MyCoursesSection() {
  const [courses] = useState<EnrolledCourse[]>(ENROLLED_COURSES_DATA);
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const inProgressCount = courses.filter((c) => c.status === "in-progress").length;
  const completedCount = courses.filter((c) => c.status === "completed").length;

  const filteredCourses = courses.filter((c) => {
    const matchesFilter = filter === "all" || c.status === filter;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4 font-sans">
      {/* =========================================================================
          TOP TOOLBAR: SEARCH, STATUS TABS & GRID / LIST VIEW TOGGLE
         ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 rounded-[4px] shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Left: Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
              filter === "all"
                ? "bg-[#116E63] text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            All Courses ({courses.length})
          </button>
          <button
            onClick={() => setFilter("in-progress")}
            className={`px-3 py-1.5 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
              filter === "in-progress"
                ? "bg-[#116E63] text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            In Progress ({inProgressCount})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1.5 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
              filter === "completed"
                ? "bg-[#116E63] text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Right: Search Input & View Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search enrolled courses..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#116E63]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-[4px] border border-slate-200 dark:border-slate-700 shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              title="Grid View"
              className={`p-1.5 rounded-[3px] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-900 text-[#116E63] dark:text-emerald-400 shadow-2xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              title="List View"
              className={`p-1.5 rounded-[3px] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-white dark:bg-slate-900 text-[#116E63] dark:text-emerald-400 shadow-2xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider">List</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          COURSES DISPLAY: GRID VIEW
         ========================================================================= */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => {
            const progressPercent = Math.round(
              (course.completedLessons / course.totalLessons) * 100
            );

            return (
              <div
                key={course.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4px] overflow-hidden shadow-xs flex flex-col hover:border-[#116E63]/40 dark:hover:border-[#116E63]/60 transition-colors group"
              >
                {/* Thumbnail */}
                <div className="relative h-40 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white px-2 py-0.5 rounded-[3px] backdrop-blur-xs">
                      {course.category}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5">
                    {course.status === "completed" ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600/90 text-white px-2 py-0.5 rounded-[3px] flex items-center gap-1 shadow-xs">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/90 text-slate-950 px-2 py-0.5 rounded-[3px] flex items-center gap-1 shadow-xs font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{progressPercent}% Done</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white drop-shadow-sm font-medium">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> {course.modules.length} Modules
                    </span>
                    <span>{course.totalLessons} Lessons</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white font-[family-name:var(--font-yantramanav)] uppercase leading-snug line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Mentor: <strong className="text-slate-700 dark:text-slate-300">{course.instructor}</strong>
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
                      <span>Progress:</span>
                      <span className="font-mono text-slate-900 dark:text-white font-bold">
                        {course.completedLessons}/{course.totalLessons} ({progressPercent}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-[4px] overflow-hidden">
                      <div
                        className={`h-full ${
                          course.status === "completed"
                            ? "bg-emerald-600 dark:bg-emerald-500"
                            : "bg-[#116E63] dark:bg-emerald-400"
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/admin/courses/${course.id}`}
                    className="w-full bg-[#116E63] hover:bg-[#0c5c53] text-white py-2 px-3 rounded-[4px] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>
                      {course.status === "completed" ? "Review Course Videos" : "Watch Course Videos"}
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================================================
          COURSES DISPLAY: LIST VIEW
         ========================================================================= */}
      {viewMode === "list" && (
        <div className="space-y-3">
          {filteredCourses.map((course) => {
            const progressPercent = Math.round(
              (course.completedLessons / course.totalLessons) * 100
            );

            return (
              <div
                key={course.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4px] p-3 sm:p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 hover:border-[#116E63]/40 dark:hover:border-[#116E63]/60 transition-colors group"
              >
                {/* Left: Thumbnail & Badges */}
                <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                  <div className="relative w-28 sm:w-36 h-20 sm:h-24 rounded-[4px] overflow-hidden shrink-0 bg-slate-900">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-1.5 left-1.5 text-[9px] font-bold bg-black/70 text-white px-1.5 py-0.2 rounded-[2px] uppercase">
                      {course.duration}
                    </div>
                  </div>

                  {/* Middle Info */}
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2 py-0.2 rounded-[3px]">
                        {course.category}
                      </span>
                      {course.status === "completed" ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.2 rounded-[3px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Completed</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 px-2 py-0.2 rounded-[3px] flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />
                          <span>{progressPercent}% Complete</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase leading-snug truncate">
                      {course.title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span>Mentor: <strong className="text-slate-700 dark:text-slate-300">{course.instructor}</strong></span>
                      <span className="hidden sm:inline">&bull;</span>
                      <span className="hidden sm:inline">{course.modules.length} Modules ({course.totalLessons} Lessons)</span>
                    </div>

                    {/* Compact Progress Bar */}
                    <div className="max-w-md space-y-0.5 pt-0.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        <span>Lessons Completed:</span>
                        <span className="font-mono text-slate-900 dark:text-white font-bold">
                          {course.completedLessons}/{course.totalLessons}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-[4px] overflow-hidden">
                        <div
                          className={`h-full ${
                            course.status === "completed"
                              ? "bg-emerald-600 dark:bg-emerald-500"
                              : "bg-[#116E63] dark:bg-emerald-400"
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: CTA Button */}
                <div className="shrink-0 flex items-center justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  <Link
                    href={`/admin/courses/${course.id}`}
                    className="w-full sm:w-auto bg-[#116E63] hover:bg-[#0c5c53] text-white py-2 px-4 rounded-[4px] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs whitespace-nowrap"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>
                      {course.status === "completed" ? "Review Videos" : "Watch Videos"}
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 text-center rounded-[4px] space-y-2">
          <BookOpen className="w-8 h-8 mx-auto text-slate-400" />
          <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            No courses found
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            No enrolled courses match your current search &quot;{searchQuery}&quot; or status filter.
          </p>
          {(searchQuery || filter !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setFilter("all");
              }}
              className="mt-2 text-xs font-bold text-[#116E63] dark:text-emerald-400 hover:underline uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
