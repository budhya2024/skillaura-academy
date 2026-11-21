"use client";

import React, { useState, useEffect, use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Pause,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Check,
  Volume2,
  VolumeX,
  Menu,
  Maximize2,
  BookOpen,
  FileText,
  LayoutDashboard,
  GraduationCap,
  Trophy,
  Users,
  Wallet,
  CreditCard,
} from "lucide-react";
import { ENROLLED_COURSES_DATA, EnrolledCourse } from "../../../../lib/coursesData";
import AdminSidebar from "../../../../components/admin/AdminSidebar";
import ThemeToggle from "../../../../components/shared/ThemeToggle";

export default function CourseWatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const rawId = unwrappedParams?.id;
  const courseId = Number(rawId);

  // Safe course matching: by ID or title slug fallback, guaranteed never undefined
  const initialCourse = useMemo(() => {
    return (
      ENROLLED_COURSES_DATA.find((c) => c.id === courseId) ||
      ENROLLED_COURSES_DATA.find((c) =>
        c.title.toLowerCase().includes(String(rawId || "").toLowerCase())
      ) ||
      ENROLLED_COURSES_DATA[0]
    );
  }, [courseId, rawId]);

  const [course, setCourse] = useState<EnrolledCourse>(initialCourse);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("skillAuraCoursesRegistry");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            const found =
              parsed.find((c: EnrolledCourse) => c.id === courseId) ||
              parsed.find((c: EnrolledCourse) =>
                c.title.toLowerCase().includes(String(rawId || "").toLowerCase())
              );
            if (found) {
              setCourse(found);
            }
          }
        }
      } catch (e) {
        console.error("Failed to load course from registry", e);
      }
    }
  }, [courseId, rawId]);
  const [activeModuleIdx, setActiveModuleIdx] = useState<number>(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(25);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [expandedModules, setExpandedModules] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
  });

  // Clamp safely to prevent undefined runtime errors
  const safeModuleIdx = Math.max(0, Math.min(activeModuleIdx, (course.modules?.length || 1) - 1));
  const currentModule = course.modules?.[safeModuleIdx] || {
    id: "m-default",
    title: "Module 1: Course Curriculum",
    duration: "10 Hours",
    lessons: [],
  };

  const safeLessonIdx = Math.max(0, Math.min(activeLessonIdx, (currentModule.lessons?.length || 1) - 1));
  const currentLesson = currentModule.lessons?.[safeLessonIdx] || {
    id: "l-default",
    name: "Course Overview & Orientation",
    duration: "15 mins",
    completed: false,
    description: "Welcome to this practical hands-on masterclass. Follow along with step-by-step videos.",
    resources: [],
  };

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
    setVideoProgress(5);
  };

  const toggleLessonCompletion = () => {
    if (!currentModule || !currentLesson) return;

    let delta = 0;
    const updatedModules = course.modules.map((m, mIdx) => {
      if (mIdx !== safeModuleIdx) return m;
      const updatedLessons = m.lessons.map((l, lIdx) => {
        if (lIdx !== safeLessonIdx) return l;
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
    if (safeLessonIdx < currentModule.lessons.length - 1) {
      selectLesson(safeModuleIdx, safeLessonIdx + 1);
    } else if (safeModuleIdx < course.modules.length - 1) {
      selectLesson(safeModuleIdx + 1, 0);
      setExpandedModules((prev) => ({ ...prev, [safeModuleIdx + 1]: true }));
    }
  };

  const handlePrevLesson = () => {
    if (safeLessonIdx > 0) {
      selectLesson(safeModuleIdx, safeLessonIdx - 1);
    } else if (safeModuleIdx > 0) {
      const prevMod = course.modules[safeModuleIdx - 1];
      selectLesson(safeModuleIdx - 1, (prevMod?.lessons?.length || 1) - 1);
      setExpandedModules((prev) => ({ ...prev, [safeModuleIdx - 1]: true }));
    }
  };

  const courseProgress = course.totalLessons > 0
    ? Math.round((course.completedLessons / course.totalLessons) * 100)
    : 0;

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 font-sans">
      {/* 1. Admin Left Sidebar - ALWAYS PRESENT & VISIBLE */}
      <AdminSidebar
        activeTab="courses"
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* 2. Main Workspace (Offset for Left Sidebar with lg:pl-64) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 min-h-screen">
        {/* Top Header - Fixed / Sticky at top */}
        <header className="h-14 sm:h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile Sidebar Hamburger Toggle */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0 rounded-[4px]"
              aria-label="Open sidebar drawer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Clean Breadcrumb Navigation: No Boxed Badges */}
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <Link
                href="/admin?tab=courses"
                className="text-slate-600 dark:text-slate-300 hover:text-[#116E63] dark:hover:text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span className="hidden xs:inline">My Courses</span>
              </Link>
              <span className="text-slate-300 dark:text-slate-700 shrink-0">/</span>
              <h1 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)] truncate max-w-[150px] xs:max-w-[220px] sm:max-w-md">
                {course.title}
              </h1>
            </div>
          </div>

          {/* Right Controls: Dark Mode Toggle & Progress Counter */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0">
            <ThemeToggle className="border border-slate-200 dark:border-slate-700" />

            <div className="flex items-center gap-2">
              <span className="text-slate-600 dark:text-slate-400 font-medium text-[11px] sm:text-xs">
                <span className="hidden sm:inline">Progress: </span>
                <strong className="text-slate-900 dark:text-white font-mono">{course.completedLessons}/{course.totalLessons}</strong>
                <span className="text-slate-500 font-mono hidden xs:inline"> ({courseProgress}%)</span>
              </span>
              <div className="w-14 sm:w-24 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#116E63] dark:bg-emerald-400 transition-all duration-300"
                  style={{ width: `${courseProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </header>

        {/* Studio Content Area */}
        <main className="p-3 sm:p-5 lg:p-6 space-y-4 flex-1 pb-24 lg:pb-8">
          {/* 2-Column Responsive Workspace: Left (Curriculum Playlist) + Right (Video & Lesson) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            {/* Left Column: Course Curriculum Playlist (4 Cols on Desktop, Order 2 on Mobile) */}
            <div className="order-2 lg:order-1 lg:col-span-4 space-y-3">
              <CurriculumPlaylist
                course={course}
                activeModuleIdx={safeModuleIdx}
                activeLessonIdx={safeLessonIdx}
                expandedModules={expandedModules}
                toggleModuleAccordion={toggleModuleAccordion}
                selectLesson={selectLesson}
              />
            </div>

            {/* Right Column: Main Video Stream & Lesson Details (8 Cols on Desktop, Order 1 on Mobile) */}
            <div className="order-1 lg:order-2 lg:col-span-8 space-y-4">
              {/* Interactive Video Player */}
              <div className="relative aspect-video w-full bg-slate-950 rounded-[4px] overflow-hidden border border-slate-800 shadow-sm select-none group">
                <Image
                  src={course.image || "/images/course2.jpg"}
                  alt={currentLesson.name}
                  fill
                  priority
                  className={`object-cover transition-all duration-500 ${isPlaying ? "opacity-40" : "opacity-70"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                {/* Top Lesson Indicator */}
                <div className="absolute top-3 left-3 text-[11px] font-bold text-white drop-shadow-md uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#116E63] animate-pulse"></span>
                  <span>Module {safeModuleIdx + 1} • Lesson {safeLessonIdx + 1}</span>
                </div>

                {/* Center Play/Pause Overlay - Visible on pause or hover */}
                <div
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
                    isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                  }`}
                >
                  <button
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#116E63]/90 hover:bg-[#116E63] text-white flex items-center justify-center cursor-pointer shadow-xl transition-transform hover:scale-110 active:scale-95 backdrop-blur-xs"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-white" />
                    ) : (
                      <Play className="w-6 h-6 fill-white ml-1" />
                    )}
                  </button>
                </div>

                {/* Video Title inside Player */}
                <div className="absolute bottom-11 sm:bottom-12 left-3 right-3 text-white text-xs sm:text-sm font-bold truncate drop-shadow-md">
                  {currentLesson.name}
                </div>

                {/* Bottom Video Controls Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-black/90 backdrop-blur-xs p-2 sm:p-2.5 flex items-center justify-between text-white text-xs gap-2">
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-[#FDA31B] cursor-pointer p-1 transition-colors"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                      )}
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="hover:text-[#FDA31B] cursor-pointer p-1 transition-colors"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? (
                        <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                    </button>
                    <span className="font-mono text-[10px] sm:text-[11px] text-slate-300">
                      {Math.floor((videoProgress / 100) * 45)}:00 / {currentLesson.duration}
                    </span>
                  </div>

                  {/* Scrubber Bar */}
                  <div className="flex-1 min-w-[50px] mx-1 sm:mx-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={videoProgress}
                      onChange={(e) => setVideoProgress(Number(e.target.value))}
                      className="w-full h-1 sm:h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer accent-[#116E63]"
                    />
                  </div>

                  {/* Right Video Actions: Speed & Fullscreen */}
                  <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                    <button
                      onClick={() => {
                        const speeds = [1, 1.25, 1.5, 2];
                        const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                        setPlaybackSpeed(next);
                      }}
                      className="font-mono text-[10px] sm:text-[11px] px-1.5 py-0.5 bg-white/10 hover:bg-white/20 rounded-[4px] cursor-pointer text-slate-200"
                      title="Playback Speed"
                    >
                      {playbackSpeed}x
                    </button>
                    <button
                      onClick={() => {
                        if (!document.fullscreenElement) {
                          document.documentElement.requestFullscreen?.();
                        } else {
                          document.exitFullscreen?.();
                        }
                      }}
                      className="p-1 hover:text-[#FDA31B] cursor-pointer text-slate-300"
                      title="Toggle Fullscreen"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Current Lesson Header & Action Controls */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#116E63] dark:text-emerald-400 block">
                      {currentModule.title}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5 font-[family-name:var(--font-yantramanav)] uppercase leading-snug">
                      {currentLesson.name}
                    </h2>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" /> {currentLesson.duration}
                      </span>
                      <span>• Instructor: {course.instructor}</span>
                    </div>
                  </div>

                  {/* Mark as Completed Button */}
                  <button
                    onClick={toggleLessonCompletion}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                      currentLesson.completed
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
                    }`}
                  >
                    {currentLesson.completed ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span>Mark as Complete</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Previous / Next Lesson Navigation Strip */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={handlePrevLesson}
                    disabled={safeModuleIdx === 0 && safeLessonIdx === 0}
                    className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-[4px] text-xs font-bold uppercase tracking-wider flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous
                  </button>

                  <button
                    onClick={handleNextLesson}
                    disabled={
                      safeModuleIdx === course.modules.length - 1 &&
                      safeLessonIdx === currentModule.lessons.length - 1
                    }
                    className="px-3.5 py-1.5 bg-[#116E63] hover:bg-[#0c5c53] text-white rounded-[4px] text-xs font-bold uppercase tracking-wider flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-xs"
                  >
                    Next Video <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* 3. Mobile View Bottom Navigation Bar (Sticky Bottom Bar) */}
        <nav
          aria-label="Mobile bottom navigation"
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-1 py-1 shadow-lg flex items-center justify-around"
        >
          <Link
            href="/admin?tab=overview"
            className="flex flex-col items-center justify-center py-1 px-1.5 sm:px-2.5 transition-colors cursor-pointer rounded-[4px] min-w-0 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span className="text-[10px] font-semibold mt-0.5 truncate">Overview</span>
          </Link>

          <Link
            href="/admin?tab=courses"
            className="flex flex-col items-center justify-center py-1 px-1.5 sm:px-2.5 transition-colors cursor-pointer rounded-[4px] min-w-0 text-[#116E63] dark:text-emerald-400 font-bold"
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span className="text-[10px] font-semibold mt-0.5 truncate">Courses</span>
          </Link>

          <Link
            href="/admin?tab=leaderboard"
            className="flex flex-col items-center justify-center py-1 px-1.5 sm:px-2.5 transition-colors cursor-pointer rounded-[4px] min-w-0 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <Trophy className="w-4 h-4 shrink-0" />
            <span className="text-[10px] font-semibold mt-0.5 truncate">Leaderboard</span>
          </Link>

          <Link
            href="/admin?tab=downline"
            className="flex flex-col items-center justify-center py-1 px-1.5 sm:px-2.5 transition-colors cursor-pointer rounded-[4px] min-w-0 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <Users className="w-4 h-4 shrink-0" />
            <span className="text-[10px] font-semibold mt-0.5 truncate">Directs</span>
          </Link>

          <Link
            href="/admin?tab=commissions"
            className="flex flex-col items-center justify-center py-1 px-1.5 sm:px-2.5 transition-colors cursor-pointer rounded-[4px] min-w-0 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <Wallet className="w-4 h-4 shrink-0" />
            <span className="text-[10px] font-semibold mt-0.5 truncate">Income</span>
          </Link>

          <Link
            href="/admin?tab=commissions"
            className="flex flex-col items-center justify-center py-1 px-1.5 sm:px-2.5 transition-colors cursor-pointer rounded-[4px] min-w-0 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <CreditCard className="w-4 h-4 shrink-0" />
            <span className="text-[10px] font-semibold mt-0.5 truncate">Payment</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

// Curriculum Playlist Component (Shared cleanly across Mobile & Desktop)
function CurriculumPlaylist({
  course,
  activeModuleIdx,
  activeLessonIdx,
  expandedModules,
  toggleModuleAccordion,
  selectLesson,
}: {
  course: EnrolledCourse;
  activeModuleIdx: number;
  activeLessonIdx: number;
  expandedModules: { [key: number]: boolean };
  toggleModuleAccordion: (idx: number) => void;
  selectLesson: (modIdx: number, lessIdx: number) => void;
}) {
  return (
    <div className="space-y-3 font-sans">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 rounded-[4px] shadow-xs flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-[family-name:var(--font-yantramanav)]">
            Course Curriculum
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {course.modules?.length || 0} Modules • {course.totalLessons} Lessons
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
          {course.completedLessons}/{course.totalLessons} Done
        </span>
      </div>

      {/* Modules Accordion List */}
      <div className="space-y-2">
        {course.modules?.map((module, mIdx) => {
          const isExpanded = expandedModules[mIdx] ?? true;
          const isCurrentMod = activeModuleIdx === mIdx;
          const completedInMod = module.lessons?.filter((l) => l.completed).length || 0;

          return (
            <div
              key={module.id || mIdx}
              className={`border rounded-[4px] overflow-hidden bg-white dark:bg-slate-900 shadow-2xs transition-colors ${
                isCurrentMod
                  ? "border-[#116E63] dark:border-emerald-500"
                  : "border-slate-200 dark:border-slate-800"
              }`}
            >
              {/* Module Accordion Header */}
              <button
                onClick={() => toggleModuleAccordion(mIdx)}
                className={`w-full p-3 text-left flex items-center justify-between cursor-pointer transition-colors ${
                  isCurrentMod
                    ? "bg-teal-50/50 dark:bg-teal-950/30"
                    : "bg-slate-50 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="pr-2 space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-[#116E63] dark:text-emerald-400">
                      Module {mIdx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      ({completedInMod}/{module.lessons?.length || 0})
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {module.title.replace(/^Module \d+:\s*/, "")}
                  </div>
                </div>

                <div className="shrink-0 text-slate-400 dark:text-slate-500">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Module Lessons List */}
              {isExpanded && (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {module.lessons?.map((lesson, lIdx) => {
                    const isCurrent = activeModuleIdx === mIdx && activeLessonIdx === lIdx;

                    return (
                      <div
                        key={lesson.id || lIdx}
                        onClick={() => selectLesson(mIdx, lIdx)}
                        className={`p-2.5 sm:p-3 flex items-center justify-between text-xs cursor-pointer transition-colors ${
                          isCurrent
                            ? "bg-[#116E63]/10 dark:bg-[#116E63]/25 font-bold text-[#116E63] dark:text-emerald-400 border-l-4 border-l-[#116E63] dark:border-l-emerald-400"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2 pr-2 truncate min-w-0">
                          {lesson.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          ) : isCurrent ? (
                            <Play className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400 fill-current shrink-0" />
                          ) : (
                            <Play className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                          )}
                          <span className="truncate">{lesson.name}</span>
                        </div>

                        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 shrink-0">
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
  );
}
