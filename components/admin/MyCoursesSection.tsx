"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  PlayCircle,
  Play,
  Pause,
  Clock,
  CheckCircle2,
  Download,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Volume2,
  VolumeX,
  Maximize2,
  FileText,
  BookOpen,
} from "lucide-react";

export interface Lesson {
  id: string;
  name: string;
  duration: string;
  completed: boolean;
  description?: string;
  resources?: { name: string; size: string }[];
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
}

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
  modules: CourseModule[];
}

const INITIAL_COURSES: EnrolledCourse[] = [
  {
    id: 1,
    title: "Business Mastery & High-Ticket Closing",
    category: "Business & Sales",
    image: "/images/course2.jpg",
    instructor: "SkillAura Master Team",
    totalLessons: 8,
    completedLessons: 5,
    duration: "70 Hours",
    status: "in-progress",
    modules: [
      {
        id: "m1",
        title: "Module 1: Psychological Selling Fundamentals",
        duration: "12 Hours",
        lessons: [
          {
            id: "l1-1",
            name: "The Psychology of Buying Decisions",
            duration: "45 mins",
            completed: true,
            description: "Understand core buyer emotions, subconscious friction points, and value perception.",
            resources: [{ name: "Buyer-Psychology-Guide.pdf", size: "2.4 MB" }],
          },
          {
            id: "l1-2",
            name: "Building Instant Rapport & Trust",
            duration: "50 mins",
            completed: true,
            description: "Master tone, pacing, and conversation openers that establish authority on calls.",
            resources: [{ name: "Rapport-Scripts.pdf", size: "1.8 MB" }],
          },
          {
            id: "l1-3",
            name: "Identifying Customer Pain Points & Urgency",
            duration: "55 mins",
            completed: true,
            description: "Effective questioning frameworks to uncover urgency and budget capabilities.",
            resources: [{ name: "Discovery-Questions.pdf", size: "1.2 MB" }],
          },
        ],
      },
      {
        id: "m2",
        title: "Module 2: High-Ticket Objection Elimination",
        duration: "18 Hours",
        lessons: [
          {
            id: "l2-1",
            name: "Mastering the 'Too Expensive' Objection",
            duration: "40 mins",
            completed: true,
            description: "Reframing price into return on investment and demonstrating high daily value.",
          },
          {
            id: "l2-2",
            name: "Closing Frameworks for Active Direct Sales",
            duration: "60 mins",
            completed: true,
            description: "Live step-by-step objection handling and closing formulas for high-ticket offers.",
            resources: [{ name: "Closing-Formulas.pdf", size: "3.1 MB" }],
          },
          {
            id: "l2-3",
            name: "Creating Urgency Without False Hype",
            duration: "35 mins",
            completed: false,
            description: "Ethical urgency tactics and authentic onboarding capacity management.",
          },
        ],
      },
      {
        id: "m3",
        title: "Module 3: Scaling Direct Conversions",
        duration: "20 Hours",
        lessons: [
          {
            id: "l3-1",
            name: "Automating Follow-up Workflows & CRM",
            duration: "45 mins",
            completed: false,
            description: "Setting up WhatsApp & email sequences that recover interested prospects.",
          },
          {
            id: "l3-2",
            name: "Live Roleplay & Call Breakdown Analysis",
            duration: "90 mins",
            completed: false,
            description: "Real closed deal recordings reviewed line-by-line with actionable commentary.",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Video Editing Mastery & Cinematic Reels",
    category: "Video Editing",
    image: "/images/video.jpeg",
    instructor: "Alex Rivera",
    totalLessons: 7,
    completedLessons: 4,
    duration: "100 Hours",
    status: "in-progress",
    modules: [
      {
        id: "m2-1",
        title: "Module 1: Mobile & Desktop Workflows (Premiere & CapCut)",
        duration: "20 Hours",
        lessons: [
          {
            id: "l2-1-1",
            name: "Timeline Setup and Keyframe Animation",
            duration: "50 mins",
            completed: true,
            description: "Optimal aspect ratios, project canvas settings, and smooth keyframe curves.",
            resources: [{ name: "CapCut-Presets.zip", size: "18 MB" }],
          },
          {
            id: "l2-1-2",
            name: "Sound Design & Cinematic Impact Effects",
            duration: "60 mins",
            completed: true,
            description: "Layering whooshes, risers, and sound hits to drive viewer retention.",
            resources: [{ name: "Sound-Effects-Pack.zip", size: "45 MB" }],
          },
          {
            id: "l2-1-3",
            name: "Color Grading with Pro LUTs",
            duration: "45 mins",
            completed: true,
            description: "Exposure balance, skin tones, and applying cinematic color profiles.",
          },
        ],
      },
      {
        id: "m2-2",
        title: "Module 2: Viral Hooks & Fast Paced Retention Edits",
        duration: "30 Hours",
        lessons: [
          {
            id: "l2-2-1",
            name: "First 3-Second Retention Mastery",
            duration: "40 mins",
            completed: true,
            description: "Creating visual patterns and hooks that stop users from scrolling away.",
          },
          {
            id: "l2-2-2",
            name: "Dynamic Typography & Motion Titles",
            duration: "55 mins",
            completed: false,
            description: "Word-by-word animated captions, highlight boxes, and animated graphics.",
          },
        ],
      },
      {
        id: "m2-3",
        title: "Module 3: Client Reels Delivery & Pricing",
        duration: "25 Hours",
        lessons: [
          {
            id: "l2-3-1",
            name: "Repurposing Long Podcasts into Viral Shorts",
            duration: "65 mins",
            completed: false,
            description: "Extracting high-impact moments and formatting for vertical platforms.",
          },
          {
            id: "l2-3-2",
            name: "Pitching Video Editing Retainers to Brands",
            duration: "50 mins",
            completed: false,
            description: "How to package monthly retainers and deliver client files efficiently.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Poster, Brand Identity & Logo Design Mastery",
    category: "Graphic Design",
    image: "/images/course-design.jpg",
    instructor: "Priya Sharma",
    totalLessons: 6,
    completedLessons: 6,
    duration: "80 Hours",
    status: "completed",
    modules: [
      {
        id: "m3-1",
        title: "Module 1: Visual Design Theory & Vector Geometry",
        duration: "25 Hours",
        lessons: [
          {
            id: "l3-1-1",
            name: "Color Harmony, Contrast & Typography Hierarchy",
            duration: "60 mins",
            completed: true,
            description: "Selecting clean palettes and readable font combinations for brand systems.",
          },
          {
            id: "l3-1-2",
            name: "Vector Logo Crafting in Illustrator & Canva",
            duration: "75 mins",
            completed: true,
            description: "Pen tool mastery, grid systems, and exporting sharp vector marks.",
          },
        ],
      },
      {
        id: "m3-2",
        title: "Module 2: Client Brand Guidelines & Portfolio Delivery",
        duration: "35 Hours",
        lessons: [
          {
            id: "l3-2-1",
            name: "Exporting Multi-Asset Brand Guidelines",
            duration: "60 mins",
            completed: true,
            description: "Compiling brand manuals, logo variations, and color specifications.",
          },
          {
            id: "l3-2-2",
            name: "Live Client Case Study & Mockups",
            duration: "90 mins",
            completed: true,
            description: "Creating realistic 3D mockups for merchandise, cards, and digital assets.",
          },
        ],
      },
      {
        id: "m3-3",
        title: "Module 3: Freelance Portfolio & Client Acquisition",
        duration: "20 Hours",
        lessons: [
          {
            id: "l3-3-1",
            name: "Building a Portfolio That Attracts High-Paying Clients",
            duration: "55 mins",
            completed: true,
            description: "Curating case studies and crafting project stories that win freelance deals.",
          },
          {
            id: "l3-3-2",
            name: "Pricing Logo & Identity Packages Confidently",
            duration: "60 mins",
            completed: true,
            description: "Value pricing strategies and contract essentials for design projects.",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Content Creation Mastery & Viral Scripting",
    category: "Social Media",
    image: "/images/course-content.jpg",
    instructor: "Rahul Verma",
    totalLessons: 6,
    completedLessons: 2,
    duration: "65 Hours",
    status: "in-progress",
    modules: [
      {
        id: "m4-1",
        title: "Module 1: Audience Research & Content Architecture",
        duration: "18 Hours",
        lessons: [
          {
            id: "l4-1-1",
            name: "Reverse-Engineering 1M+ View Reels & Shorts",
            duration: "45 mins",
            completed: true,
            description: "Analyzing pacing, topic selection, and audio triggers that fuel algorithmic reach.",
          },
          {
            id: "l4-1-2",
            name: "High-Retention Storytelling Frameworks",
            duration: "50 mins",
            completed: true,
            description: "Condensing stories into engaging 60-second scripts with clear calls to action.",
          },
        ],
      },
      {
        id: "m4-2",
        title: "Module 2: Monetization & Sponsor Partnerships",
        duration: "22 Hours",
        lessons: [
          {
            id: "l4-2-1",
            name: "Pitching Brands for Sponsored Content",
            duration: "40 mins",
            completed: false,
            description: "Creating simple media kits and pitching brand marketing managers directly.",
          },
          {
            id: "l4-2-2",
            name: "Affiliate Funnels & Automated Link Delivery",
            duration: "45 mins",
            completed: false,
            description: "Directing viewers into automated recommendation funnels that earn commission.",
          },
        ],
      },
      {
        id: "m4-3",
        title: "Module 3: Omnichannel Content Scaling",
        duration: "25 Hours",
        lessons: [
          {
            id: "l4-3-1",
            name: "Cross-Posting to YouTube Shorts, Instagram & LinkedIn",
            duration: "55 mins",
            completed: false,
            description: "Repurposing one core video idea across platforms without duplicating work.",
          },
          {
            id: "l4-3-2",
            name: "Building an Active Community of Loyal Followers",
            duration: "50 mins",
            completed: false,
            description: "Engagement tactics that turn passive viewers into repeat buyers and subscribers.",
          },
        ],
      },
    ],
  },
];

export default function MyCoursesSection() {
  const [courses, setCourses] = useState<EnrolledCourse[]>(INITIAL_COURSES);
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Course Page View State (activeCourseId != null shows the full Course Learning Page)
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null);
  const [activeModuleIdx, setActiveModuleIdx] = useState<number>(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(30);
  const [expandedModules, setExpandedModules] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
  });

  const activeCourse = courses.find((c) => c.id === activeCourseId) || null;
  const currentModule = activeCourse?.modules[activeModuleIdx] || null;
  const currentLesson = currentModule?.lessons[activeLessonIdx] || null;

  const toggleModuleAccordion = (idx: number) => {
    setExpandedModules((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const openCoursePage = (courseId: number, modIdx: number = 0, lessIdx: number = 0) => {
    setActiveCourseId(courseId);
    setActiveModuleIdx(modIdx);
    setActiveLessonIdx(lessIdx);
    setIsPlaying(true);
    setVideoProgress(15);
    setExpandedModules((prev) => ({ ...prev, [modIdx]: true }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectLesson = (modIdx: number, lessIdx: number) => {
    setActiveModuleIdx(modIdx);
    setActiveLessonIdx(lessIdx);
    setIsPlaying(true);
    setVideoProgress(10);
  };

  const toggleCurrentLessonCompletion = () => {
    if (!activeCourse || !currentModule || !currentLesson) return;

    setCourses((prevCourses) =>
      prevCourses.map((c) => {
        if (c.id !== activeCourse.id) return c;

        let delta = 0;
        const updatedModules = c.modules.map((m, mIdx) => {
          if (mIdx !== activeModuleIdx) return m;
          const updatedLessons = m.lessons.map((l, lIdx) => {
            if (lIdx !== activeLessonIdx) return l;
            const newCompleted = !l.completed;
            delta = newCompleted ? 1 : -1;
            return { ...l, completed: newCompleted };
          });
          return { ...m, lessons: updatedLessons };
        });

        const newCompletedCount = Math.max(0, Math.min(c.totalLessons, c.completedLessons + delta));
        return {
          ...c,
          completedLessons: newCompletedCount,
          status: newCompletedCount === c.totalLessons ? "completed" : "in-progress",
          modules: updatedModules,
        };
      })
    );
  };

  const handleNextLesson = () => {
    if (!activeCourse) return;
    const currentMod = activeCourse.modules[activeModuleIdx];
    if (activeLessonIdx < currentMod.lessons.length - 1) {
      selectLesson(activeModuleIdx, activeLessonIdx + 1);
    } else if (activeModuleIdx < activeCourse.modules.length - 1) {
      selectLesson(activeModuleIdx + 1, 0);
      setExpandedModules((prev) => ({ ...prev, [activeModuleIdx + 1]: true }));
    }
  };

  const handlePrevLesson = () => {
    if (!activeCourse) return;
    if (activeLessonIdx > 0) {
      selectLesson(activeModuleIdx, activeLessonIdx - 1);
    } else if (activeModuleIdx > 0) {
      const prevMod = activeCourse.modules[activeModuleIdx - 1];
      selectLesson(activeModuleIdx - 1, prevMod.lessons.length - 1);
      setExpandedModules((prev) => ({ ...prev, [activeModuleIdx - 1]: true }));
    }
  };

  // =========================================================================
  // VIEW 1: DEDICATED FULL COURSE LEARNING PAGE (Simple, Clean, Module-Wise)
  // =========================================================================
  if (activeCourse && currentModule && currentLesson) {
    const courseProgress = Math.round((activeCourse.completedLessons / activeCourse.totalLessons) * 100);

    return (
      <div className="space-y-4 font-sans animate-in fade-in">
        {/* Top Navigation Bar: Back Button & Course Details */}
        <div className="bg-white border border-slate-200 p-3.5 sm:p-4 rounded-[4px] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveCourseId(null)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to My Courses</span>
            </button>
            <div className="truncate">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#116E63] bg-[#116E63]/10 px-2 py-0.5 rounded-[4px]">
                {activeCourse.category}
              </span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 uppercase truncate mt-0.5 font-[family-name:var(--font-yantramanav)]">
                {activeCourse.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs self-end sm:self-auto shrink-0">
            <span className="text-slate-600 font-medium">
              Progress: <strong className="text-slate-900 font-mono">{activeCourse.completedLessons}/{activeCourse.totalLessons} Lessons</strong> ({courseProgress}%)
            </span>
            <div className="w-24 h-2 bg-slate-200 rounded-[4px] overflow-hidden">
              <div
                className="h-full bg-[#116E63] transition-all"
                style={{ width: `${courseProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 2-Column Clean Workspace: Video & Lesson (Left) + Module Playlist (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          {/* Main Video & Details (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Clean Video Player */}
            <div className="relative aspect-video w-full bg-slate-950 rounded-[4px] overflow-hidden border border-slate-800 shadow-xs select-none">
              <Image
                src={activeCourse.image}
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
              <div className="absolute bottom-0 inset-x-0 bg-black/90 p-2.5 sm:p-3 flex items-center justify-between text-white text-xs gap-3">
                <div className="flex items-center gap-2.5">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-[#FDA31B] cursor-pointer">
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <button onClick={() => setIsMuted(!isMuted)} className="hover:text-[#FDA31B] cursor-pointer">
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-[11px] text-slate-300">
                    {Math.floor((videoProgress / 100) * 45)}:00 / {currentLesson.duration}
                  </span>
                </div>

                <div className="flex-1 max-w-xs mx-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={videoProgress}
                    onChange={(e) => setVideoProgress(Number(e.target.value))}
                    className="w-full h-1 bg-white/30 rounded-[4px] appearance-none cursor-pointer accent-[#116E63]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const speeds = [1, 1.25, 1.5];
                      const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                      setPlaybackSpeed(next);
                    }}
                    className="font-mono text-[11px] px-1.5 py-0.5 bg-white/10 hover:bg-white/20 rounded-[4px] cursor-pointer"
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
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 font-[family-name:var(--font-yantramanav)] uppercase">
                    {currentLesson.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" /> {currentLesson.duration}
                    </span>
                    <span>• Instructor: {activeCourse.instructor}</span>
                  </div>
                </div>

                {/* Mark as Completed Button */}
                <button
                  onClick={toggleCurrentLessonCompletion}
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
                    activeModuleIdx === activeCourse.modules.length - 1 &&
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
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Lesson Summary
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {currentLesson.description}
                </p>

                {currentLesson.resources && currentLesson.resources.length > 0 && (
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Lesson Resource Files
                    </h5>
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
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Course Modules
                </h4>
                <p className="text-[11px] text-slate-500">
                  {activeCourse.modules.length} Modules • {activeCourse.totalLessons} Lessons
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-[4px]">
                {activeCourse.completedLessons}/{activeCourse.totalLessons} Done
              </span>
            </div>

            {/* Modules Accordion */}
            <div className="space-y-2.5">
              {activeCourse.modules.map((module, mIdx) => {
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
                          <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-[3px] ${
                            isCurrentMod ? "bg-[#116E63] text-white" : "bg-slate-200 text-slate-700"
                          }`}>
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
                                  <PlayCircle className="w-4 h-4 text-slate-400 shrink-0" />
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
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: COURSE CATALOG LIST (Clean, Simple Structure, No Unnecessary Info)
  // =========================================================================
  const filteredCourses = courses.filter((c) => {
    const matchesFilter = filter === "all" || c.status === filter;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4 font-sans">
      {/* Top Header Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-[4px] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wide text-slate-900 font-[family-name:var(--font-yantramanav)]">
            My Courses
          </h2>
          <p className="text-xs text-slate-500">
            Select any course to view module-wise video lessons.
          </p>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-[4px] border cursor-pointer ${
                filter === "all"
                  ? "bg-[#116E63] text-white border-[#116E63]"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              All ({courses.length})
            </button>
            <button
              onClick={() => setFilter("in-progress")}
              className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-[4px] border cursor-pointer ${
                filter === "in-progress"
                  ? "bg-[#116E63] text-white border-[#116E63]"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-[4px] border cursor-pointer ${
                filter === "completed"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              Completed
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1 text-xs bg-slate-50 border border-slate-200 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#116E63] w-full sm:w-44 text-slate-800"
            />
          </div>
        </div>
      </div>

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

                {/* Clean Action Button */}
                <button
                  onClick={() => openCoursePage(course.id, 0, 0)}
                  className="w-full bg-[#116E63] hover:bg-[#0c5c53] text-white py-2 px-3 rounded-[4px] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>
                    {course.status === "completed" ? "Review Course Videos" : "Watch Course Videos"}
                  </span>
                </button>
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
