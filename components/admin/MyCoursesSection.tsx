"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PlayCircle,
  Search,
} from "lucide-react";
import { ENROLLED_COURSES_DATA, EnrolledCourse } from "../../lib/coursesData";

export default function MyCoursesSection() {
  const [courses] = useState<EnrolledCourse[]>(ENROLLED_COURSES_DATA);
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((c) => {
    const matchesFilter = filter === "all" || c.status === filter;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4 font-sans">


      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => {
          const progressPercent = Math.round((course.completedLessons / course.totalLessons) * 100);

          return (
            <div
              key={course.id}
              className="bg-white border border-slate-200 rounded-[4px] overflow-hidden shadow-xs flex flex-col hover:border-[#116E63]/40 transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative h-40 w-full bg-slate-900 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white px-2 py-0.5 rounded-[4px]">
                    {course.category}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white drop-shadow-sm font-medium">
                  <span>{course.modules.length} Modules</span>
                  <span>{course.totalLessons} Lessons</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 font-[family-name:var(--font-yantramanav)] uppercase leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Mentor: <strong className="text-slate-700">{course.instructor}</strong>
                  </p>
                </div>

                {/* Simple Progress Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span>Progress:</span>
                    <span className="font-mono text-slate-900 font-bold">
                      {course.completedLessons}/{course.totalLessons} ({progressPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-[4px] overflow-hidden">
                    <div
                      className={`h-full ${course.status === "completed" ? "bg-emerald-600" : "bg-[#116E63]"}`}
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Direct Link to Dedicated Page - NOT a modal */}
                <Link
                  href={`/admin/courses/${course.id}`}
                  className="w-full bg-[#116E63] hover:bg-[#0c5c53] text-white py-2 px-3 rounded-[4px] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
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

      {filteredCourses.length === 0 && (
        <div className="bg-white border border-slate-200 p-8 text-center rounded-[4px] text-slate-500 text-xs">
          No courses found matching your filter.
        </div>
      )}
    </div>
  );
}
