"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Pause,
  Clock,
  CheckCircle2,
  Download,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Check,
  Volume2,
  VolumeX,
  Menu,
} from "lucide-react";
import { ENROLLED_COURSES_DATA, EnrolledCourse } from "../../../../lib/coursesData";
import AdminSidebar from "../../../../components/admin/AdminSidebar";

export default function CourseWatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const courseId = Number(unwrappedParams.id);

  const initialCourse =
    ENROLLED_COURSES_DATA.find((c) => c.id === courseId) || ENROLLED_COURSES_DATA[0];

  const [course, setCourse] = useState<EnrolledCourse>(initialCourse);
  const [activeModuleIdx, setActiveModuleIdx] = useState<number>(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(25);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [expandedModules, setExpandedModules] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
  });

  const currentModule = course.modules[activeModuleIdx] || course.modules[0];
  const currentLesson = currentModule?.lessons[activeLessonIdx] || currentModule?.lessons[0];

  const toggleModuleAccordion = (idx: number) => {
    setExpandedModules((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const selectLesson = (modIdx: number, lessIdx: number) => {
    setActiveModuleIdx(modIdx);
    setActiveLessonIdx(lessIdx);
    setIsPlaying(true);
    setVideoProgress(10);
  };

  const toggleLessonCompletion = () => {
    if (!currentModule || !currentLesson) return;

    let delta = 0;
    const updatedModules = course.modules.map((m, mIdx) => {
      if (mIdx !== activeModuleIdx) return m;
      const updatedLessons = m.lessons.map((l, lIdx) => {
        if (lIdx !== activeLessonIdx) return l;
        const newCompleted = !l.completed;
        delta = newCompleted ? 1 : -1;
        return { ...l, completed: newCompleted };
      });
      return { ...m, lessons: updatedLessons };
    });

    const newCompletedCount = Math.max(0, Math.min(course.totalLessons, course.completedLessons + delta));

    setCourse({
      ...course,
      completedLessons: newCompletedCount,
      status: newCompletedCount === course.totalLessons ? "completed" : "in-progress",
      modules: updatedModules,
    });
  };

  const handleNextLesson = () => {
    if (activeLessonIdx < currentModule.lessons.length - 1) {
      selectLesson(activeModuleIdx, activeLessonIdx + 1);
    } else if (activeModuleIdx < course.modules.length - 1) {
      selectLesson(activeModuleIdx + 1, 0);
      setExpandedModules((prev) => ({ ...prev, [activeModuleIdx + 1]: true }));
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIdx > 0) {
      selectLesson(activeModuleIdx, activeLessonIdx - 1);
    } else if (activeModuleIdx > 0) {
      const prevMod = course.modules[activeModuleIdx - 1];
      selectLesson(activeModuleIdx - 1, prevMod.lessons.length - 1);
      setExpandedModules((prev) => ({ ...prev, [activeModuleIdx - 1]: true }));
    }
  };

  const courseProgress = Math.round((course.completedLessons / course.totalLessons) * 100);

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-800 font-sans">
      {/* 1. Admin Left Sidebar - ALWAYS PRESENT & VISIBLE */}
      <AdminSidebar
        activeTab="courses"
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* 2. Main Workspace (Offset for Left Sidebar with lg:pl-64) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 overflow-y-auto min-h-screen">
        {/* Top Header */}
        <header className="h-14 sm:h-16 bg-white border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 cursor-pointer shrink-0 rounded-[4px]"
              aria-label="Open sidebar drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 min-w-0">
              <Link
                href="/admin?tab=courses"
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1 shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">My Courses</span>
              </Link>
              <span className="text-slate-400 hidden sm:inline">/</span>
              <h1 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider font-[family-name:var(--font-yantramanav)] truncate">
                {course.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs shrink-0">
            <span className="text-slate-600 font-medium hidden sm:inline">
              Progress: <strong className="text-slate-900 font-mono">{course.completedLessons}/{course.totalLessons}</strong> ({courseProgress}%)
            </span>
            <div className="w-20 sm:w-28 h-2 bg-slate-200 rounded-[4px] overflow-hidden">
              <div
                className="h-full bg-[#116E63] transition-all"
                style={{ width: `${courseProgress}%` }}
              ></div>
            </div>
          </div>
        </header>

        {/* Studio Content Area */}
        <main className="p-3 sm:p-5 lg:p-6 space-y-4 flex-1">
          {/* 2-Column Clean Workspace: Video & Lesson (Left) + Module Playlist (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            {/* Main Video & Lesson Details (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Clean Video Player */}
              <div className="relative aspect-video w-full bg-slate-950 rounded-[4px] overflow-hidden border border-slate-800 shadow-xs select-none">
                <Image
                  src={course.image}
                  alt={currentLesson.name}
                  fill
                  className={`object-cover transition-opacity duration-300 ${isPlaying ? "opacity-30 blur-[1px]" : "opacity-60"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                {/* Top Tag */}
                <div className="absolute top-3 left-3 text-[10px] font-bold text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-[4px] border border-white/20 uppercase tracking-wider">
                  Module {activeModuleIdx + 1} • Lesson {activeLessonIdx + 1}
                </div>

                {/* Center Play/Pause Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#116E63] hover:bg-[#0c5c53] text-white flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-105 active:scale-95"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
                </button>

                {/* Video Title in Video */}
                <div className="absolute bottom-12 left-4 right-4 text-white text-xs sm:text-sm font-bold truncate drop-shadow-md">
                  {currentLesson.name}
                </div>

                {/* Bottom Control Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-black/90 p-2 sm:p-3 flex items-center justify-between text-white text-xs gap-1.5 sm:gap-3">
                  <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-[#FDA31B] cursor-pointer p-0.5" aria-label={isPlaying ? "Pause" : "Play"}>
                      {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />}
                    </button>
                    <button onClick={() => setIsMuted(!isMuted)} className="hover:text-[#FDA31B] cursor-pointer p-0.5" aria-label={isMuted ? "Unmute" : "Mute"}>
                      {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    </button>
                    <span className="font-mono text-[10px] sm:text-[11px] text-slate-300">
                      {Math.floor((videoProgress / 100) * 45)}:00 / {currentLesson.duration}
                    </span>
                  </div>

                  <div className="flex-1 min-w-[50px] max-w-xs mx-1 sm:mx-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={videoProgress}
                      onChange={(e) => setVideoProgress(Number(e.target.value))}
                      className="w-full h-1 bg-white/30 rounded-[4px] appearance-none cursor-pointer accent-[#116E63]"
                    />
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                    <button
                      onClick={() => {
                        const speeds = [1, 1.25, 1.5];
                        const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                        setPlaybackSpeed(next);
                      }}
                      className="font-mono text-[10px] sm:text-[11px] px-1.5 py-0.5 bg-white/10 hover:bg-white/20 rounded-[4px] cursor-pointer"
                    >
                      {playbackSpeed}x
                    </button>
                  </div>
                </div>
              </div>

              {/* Current Lesson Header & Action Controls */}
              <div className="bg-white border border-slate-200 p-4 rounded-[4px] shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#116E63]">
                      {currentModule.title}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 font-[family-name:var(--font-yantramanav)] uppercase">
                      {currentLesson.name}
                    </h2>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" /> {currentLesson.duration}
                      </span>
                      <span>• Instructor: {course.instructor}</span>
                    </div>
                  </div>

                  {/* Mark as Completed Button */}
                  <button
                    onClick={toggleLessonCompletion}
                    className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                      currentLesson.completed
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300"
                    }`}
                  >
                    {currentLesson.completed ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-slate-500" />
                        <span>Mark as Complete</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Previous / Next Lesson Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={handlePrevLesson}
                    disabled={activeModuleIdx === 0 && activeLessonIdx === 0}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-[4px] text-xs font-bold uppercase tracking-wider flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous
                  </button>

                  <button
                    onClick={handleNextLesson}
                    disabled={
                      activeModuleIdx === course.modules.length - 1 &&
                      activeLessonIdx === currentModule.lessons.length - 1
                    }
                    className="px-3 py-1.5 bg-[#116E63] hover:bg-[#0c5c53] text-white rounded-[4px] text-xs font-bold uppercase tracking-wider flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Next Video <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Lesson Overview & Resources */}
              {currentLesson.description && (
                <div className="bg-white border border-slate-200 p-4 rounded-[4px] shadow-xs space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Lesson Summary
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {currentLesson.description}
                  </p>

                  {currentLesson.resources && currentLesson.resources.length > 0 && (
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Lesson Resource Files
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentLesson.resources.map((res, rIdx) => (
                          <button
                            key={rIdx}
                            onClick={() => alert(`Downloading: ${res.name}`)}
                            className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-[4px] text-xs text-slate-700 flex items-center gap-1.5 cursor-pointer font-medium"
                          >
                            <Download className="w-3.5 h-3.5 text-[#116E63]" />
                            <span>{res.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">({res.size})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Module-Wise Curriculum Playlist (4 Cols) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="bg-white border border-slate-200 p-3.5 rounded-[4px] shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Course Modules
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {course.modules.length} Modules • {course.totalLessons} Lessons
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-[4px]">
                  {course.completedLessons}/{course.totalLessons} Done
                </span>
              </div>

              {/* Modules Accordion */}
              <div className="space-y-2.5">
                {course.modules.map((module, mIdx) => {
                  const isExpanded = expandedModules[mIdx] ?? true;
                  const isCurrentMod = activeModuleIdx === mIdx;
                  const completedInMod = module.lessons.filter((l) => l.completed).length;

                  return (
                    <div
                      key={module.id}
                      className={`border rounded-[4px] overflow-hidden bg-white shadow-2xs ${
                        isCurrentMod ? "border-[#116E63]" : "border-slate-200"
                      }`}
                    >
                      {/* Module Header Button */}
                      <button
                        onClick={() => toggleModuleAccordion(mIdx)}
                        className={`w-full p-3 text-left flex items-center justify-between cursor-pointer transition-colors ${
                          isCurrentMod ? "bg-teal-50/60" : "bg-slate-50 hover:bg-slate-100"
                        }`}
                      >
                        <div className="pr-2 space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-[3px] ${
                                isCurrentMod ? "bg-[#116E63] text-white" : "bg-slate-200 text-slate-700"
                              }`}
                            >
                              Module {mIdx + 1}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">
                              {completedInMod}/{module.lessons.length}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-slate-900 line-clamp-1">
                            {module.title.replace(/^Module \d+:\s*/, "")}
                          </div>
                        </div>

                        <div className="shrink-0 text-slate-400">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {/* Lessons Under Module */}
                      {isExpanded && (
                        <div className="divide-y divide-slate-100">
                          {module.lessons.map((lesson, lIdx) => {
                            const isCurrent = activeModuleIdx === mIdx && activeLessonIdx === lIdx;

                            return (
                              <div
                                key={lesson.id}
                                onClick={() => selectLesson(mIdx, lIdx)}
                                className={`p-2.5 sm:p-3 flex items-center justify-between text-xs cursor-pointer transition-colors ${
                                  isCurrent
                                    ? "bg-[#116E63]/10 font-bold text-[#116E63] border-l-4 border-l-[#116E63]"
                                    : "hover:bg-slate-50 text-slate-700"
                                }`}
                              >
                                <div className="flex items-center gap-2 pr-2 truncate">
                                  {lesson.completed ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                  ) : isCurrent ? (
                                    <Play className="w-3.5 h-3.5 text-[#116E63] fill-current shrink-0" />
                                  ) : (
                                    <Play className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  )}
                                  <span className="truncate">{lesson.name}</span>
                                </div>

                                <span className="text-[11px] font-mono text-slate-400 shrink-0">
                                  {lesson.duration}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
