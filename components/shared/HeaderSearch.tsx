"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, X, ChevronRight } from "lucide-react";

export interface CourseSearchItem {
  id: number;
  title: string;
  category: string;
  price: string;
  keywords: string[];
}

export const SEARCH_COURSES: CourseSearchItem[] = [
  {
    id: 1,
    title: "AI Mastery",
    category: "Artificial Intelligence",
    price: "₹4,999",
    keywords: ["ai", "chatgpt", "prompt engineering", "artificial intelligence", "llm", "automation", "machine learning"],
  },
  {
    id: 2,
    title: "Poster & Logo Design Mastery",
    category: "Graphic Design",
    price: "₹3,499",
    keywords: ["design", "poster", "logo", "photoshop", "illustrator", "graphic", "branding", "canva"],
  },
  {
    id: 3,
    title: "Attraction Mastery",
    category: "Personal Branding",
    price: "₹3,999",
    keywords: ["attraction", "branding", "personality", "confidence", "public speaking", "communication", "social skills"],
  },
  {
    id: 4,
    title: "Content Creation Mastery",
    category: "Social Media",
    price: "₹4,499",
    keywords: ["content", "creation", "reels", "youtube", "instagram", "viral", "copywriting", "social media"],
  },
  {
    id: 5,
    title: "Video Editing Mastery",
    category: "Media Production",
    price: "₹4,999",
    keywords: ["video", "editing", "premiere pro", "davinci", "capcut", "reel editing", "youtube editing", "color grading"],
  },
];

interface HeaderSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HeaderSearch({ isOpen, onClose }: HeaderSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const filteredCourses = searchQuery.trim() === ""
    ? []
    : SEARCH_COURSES.filter((course) => {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = course.title.toLowerCase().includes(q);
      const matchCategory = course.category.toLowerCase().includes(q);
      const matchKeyword = course.keywords.some((kw) => kw.toLowerCase().includes(q));
      return matchTitle || matchCategory || matchKeyword;
    });

  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  return (
    <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-md p-4 animate-in slide-in-from-top-2 duration-200 z-50">
      <div className="max-w-3xl mx-auto space-y-3">
        {/* Search Input Bar with Border */}
        <div className="flex items-center gap-3 border-2 border-primary rounded-full  px-3.5 py-1.5 focus-within:border-secondary  transition-all">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, programs, pages..."
            className="w-full rounded-full py-1 px-1 text-slate-800  placeholder-slate-400 focus:outline-none text-base bg-transparent"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-full text-xs  shrink-0"
            >
              Clear
            </button>
          )}
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full shrink-0"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Dropdown */}
        {searchQuery.trim() !== "" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden max-h-80 overflow-y-auto mt-2">
            {filteredCourses.length > 0 ? (
              <div className="divide-y divide-slate-100">
                <div className="px-4 py-2 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Found {filteredCourses.length} matching course{filteredCourses.length > 1 ? "s" : ""}
                </div>
                {filteredCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    onClick={handleClose}
                    className="flex items-center justify-between p-3.5 hover:bg-[#116E63]/5 transition-colors group"
                  >
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800 text-sm sm:text-base group-hover:text-[#116E63] transition-colors">
                        {course.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-[#116E63] bg-[#116E63]/10 px-2 py-0.5 rounded-md">
                          {course.category}
                        </span>
                        <span className="text-xs text-slate-400">
                          Keywords: {course.keywords.slice(0, 3).join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-[#FDA31B] text-sm sm:text-base">
                        {course.price}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#116E63] group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-slate-500 space-y-1">
                <p className="font-semibold text-slate-700">No matching courses found</p>
                <p className="text-xs text-slate-400">
                  Try searching with keywords like &quot;AI&quot;, &quot;Design&quot;, &quot;Editing&quot;, or &quot;Branding&quot;
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
