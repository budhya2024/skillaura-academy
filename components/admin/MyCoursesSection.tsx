"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PlayCircle,
  PauseCircle,
  Play,
  Pause,
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Sparkles,
  Lock,
  Layers,
  Search,
  Filter,
  X,
  GraduationCap,
  Briefcase,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Share2,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Video,
  ListVideo,
} from "lucide-react";

export interface Lesson {
  id: string;
  name: string;
  duration: string;
  completed: boolean;
  description: string;
  keyPoints?: string[];
  resources?: { name: string; size: string; type: string }[];
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
  lastAccessed: string;
  certificateEarned: boolean;
  certificateId?: string;
  modules: CourseModule[];
}

const INITIAL_COURSES: EnrolledCourse[] = [
  {
    id: 1,
    title: "Business Mastery & High-Ticket Closing",
    category: "Business & Sales",
    image: "/images/course2.jpg",
    instructor: "SkillAura Master / Leadership Team",
    totalLessons: 8,
    completedLessons: 5,
    duration: "04 Months / 70 Hours",
    status: "in-progress",
    lastAccessed: "Today, 10:45 AM",
    certificateEarned: false,
    modules: [
      {
        id: "m1-1",
        title: "Module 1: Psychological Selling Fundamentals",
        duration: "12 Hours",
        lessons: [
          {
            id: "l1-1-1",
            name: "The Psychology of Buying Decisions",
            duration: "45 mins",
            completed: true,
            description:
              "Understand consumer dopamine triggers, subconscious objection mechanisms, and cognitive decision trees that govern why clients buy premium packages.",
            keyPoints: [
              "Emotional triggers vs logical justifications in purchasing",
              "How to frame your service as an indispensable investment",
              "The 3-stage buyer awareness model for outbound sales",
            ],
            resources: [
              { name: "Psychological-Buying-Framework.pdf", size: "2.4 MB", type: "PDF" },
              { name: "Buyer-Persona-Worksheet.xlsx", size: "850 KB", type: "XLSX" },
            ],
          },
          {
            id: "l1-1-2",
            name: "Building Instant Rapport & Trust",
            duration: "50 mins",
            completed: true,
            description:
              "Master vocal tonality, pacing, active listening tactics, and opening icebreakers that break down cold client defense mechanisms within 60 seconds.",
            keyPoints: [
              "Tonality matching and pace mirroring on voice calls",
              "Validating client hesitations without becoming defensive",
              "Setting up an assertive discovery agenda from second one",
            ],
            resources: [
              { name: "Rapport-Building-Scripts.pdf", size: "1.8 MB", type: "PDF" },
            ],
          },
          {
            id: "l1-1-3",
            name: "Identifying Customer Pain Points & Urgency",
            duration: "55 mins",
            completed: true,
            description:
              "Deep discovery question sequencing (SPIN methodology adjusted for high-ticket closing) to uncover what is actively costing the prospect money.",
            keyPoints: [
              "Situation vs Implication questions that create self-realization",
              "Quantifying the daily cost of inaction for prospective clients",
              "Transitioning effortlessly from diagnosis to proposal presentation",
            ],
            resources: [
              { name: "Discovery-Call-Questionnaire.pdf", size: "3.1 MB", type: "PDF" },
            ],
          },
        ],
      },
      {
        id: "m1-2",
        title: "Module 2: High-Ticket Objection Elimination",
        duration: "18 Hours",
        lessons: [
          {
            id: "l1-2-1",
            name: "Mastering the 'Too Expensive' Objection",
            duration: "40 mins",
            completed: true,
            description:
              "Deconstruct the price objection completely. Learn how to reframe cost into Return on Investment (ROI) and cost-per-day breakdown models.",
            keyPoints: [
              "Isolating genuine budget constraints from smoke-screen objections",
              "The Net-Profit math demonstration method",
              "Splitting investment into milestone payments safely",
            ],
            resources: [
              { name: "Price-Objection-Flowchart.pdf", size: "1.5 MB", type: "PDF" },
            ],
          },
          {
            id: "l1-2-2",
            name: "Closing Frameworks for 100% Active Direct Sales",
            duration: "60 mins",
            completed: true,
            description:
              "Step-by-step walkthrough of closing scenarios: assumptive closes, urgency closes, and the takeaway close for undecided corporate decision-makers.",
            keyPoints: [
              "The 3-choice closing structure",
              "Handling the 'I need to consult my partner' stall",
              "Securing instant deposit payments on the live call",
            ],
            resources: [
              { name: "Closing-Word-For-Word-Battlecard.pdf", size: "4.2 MB", type: "PDF" },
            ],
          },
          {
            id: "l1-2-3",
            name: "Urgency and Scarcity Creation Without False Hype",
            duration: "35 mins",
            completed: false,
            description:
              "Authentic capacity limitations, onboarding queue protocols, and early-bird incentive structures that compel immediate commitment.",
            keyPoints: [
              "Real client capacity caps vs artificial urgency gimmicks",
              "Bonus package expiration protocols that genuinely stick",
            ],
            resources: [
              { name: "Scarcity-Email-Templates.docx", size: "620 KB", type: "DOCX" },
            ],
          },
        ],
      },
      {
        id: "m1-3",
        title: "Module 3: Scaling Direct Affiliate Conversions",
        duration: "20 Hours",
        lessons: [
          {
            id: "l1-3-1",
            name: "Automating Follow-up Workflows & CRM Tracking",
            duration: "45 mins",
            completed: false,
            description:
              "Build multi-touch follow-up systems combining WhatsApp, email sequences, and reminder pings that recover 35% of lost prospects.",
            keyPoints: [
              "The 9-day follow-up frequency rule",
              "Value-first check-ins that do not sound like spam",
              "CRM automation trigger setup for lead stages",
            ],
            resources: [
              { name: "WhatsApp-Followup-Sequence.pdf", size: "2.1 MB", type: "PDF" },
            ],
          },
          {
            id: "l1-3-2",
            name: "Live Roleplay & Client Call Recordings Breakdown",
            duration: "90 mins",
            completed: false,
            description:
              "Deep analysis of 3 live closed sales calls totaling ₹4,50,000+ in high-ticket deals with real-time mentor commentary and mistake breakdowns.",
            keyPoints: [
              "Deconstructing second-by-second inflection on critical objection turns",
              "How to recover smoothly after a prospect rejects an initial offer",
            ],
            resources: [
              { name: "Call-Breakdown-Timestamps.pdf", size: "900 KB", type: "PDF" },
            ],
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
    instructor: "Alex Rivera & Motion Team",
    totalLessons: 7,
    completedLessons: 4,
    duration: "05 Months / 100 Hours",
    status: "in-progress",
    lastAccessed: "Yesterday, 04:20 PM",
    certificateEarned: false,
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
            description:
              "Project setup, resolution scaling (9:16 vs 16:9), workspace customization, and ultra-smooth bezier curve keyframing for text and icons.",
            keyPoints: [
              "Optimal canvas dimensions and frame rate settings for Instagram & YouTube Shorts",
              "Bezier curve easing vs linear interpolation",
              "Efficient cut trimming hotkeys for 3x faster workflows",
            ],
            resources: [
              { name: "CapCut-Pro-Preset-Pack.zip", size: "18.4 MB", type: "ZIP" },
              { name: "Keyboard-Shortcuts-Cheatsheet.pdf", size: "1.2 MB", type: "PDF" },
            ],
          },
          {
            id: "l2-1-2",
            name: "Sound Design & Cinematic Impact Effects",
            duration: "60 mins",
            completed: true,
            description:
              "Layering swooshes, risers, sub-bass hits, paper crinkles, and ambient room tone to elevate average cuts into Hollywood-grade soundscapes.",
            keyPoints: [
              "Audio ducking behind dialogue tracks",
              "Selecting the right frequency sweeps for visual transitions",
              "Mastering audio loudness normalization (-14 LUFS standard)",
            ],
            resources: [
              { name: "SkillAura-SoundFX-Essential-Pack.zip", size: "45.0 MB", type: "ZIP" },
            ],
          },
          {
            id: "l2-1-3",
            name: "Color Grading with Pro LUTs & Exposure Balancing",
            duration: "45 mins",
            completed: true,
            description:
              "Correcting white balance, skin tone vector scopes, shadow and highlight recovery, and applying custom cinematic LUTs.",
            keyPoints: [
              "Reading RGB parade and waveform monitors",
              "Protecting human skin tones with HSL secondary qualifiers",
              "Export settings for maximum mobile clarity without compression artifacts",
            ],
            resources: [
              { name: "Cinematic-LUTs-Pack-5x.cube", size: "12.0 MB", type: "CUBE" },
            ],
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
            description:
              "Visual pattern interrupts, screen zooms, speed ramps, and typography drops that halt the viewer from scrolling past your video.",
            keyPoints: [
              "The 3-second hook taxonomy (Visual shock, Curiosity gap, Bold claim)",
              "Dynamic zoom cuts synced to speech cadence",
            ],
            resources: [
              { name: "Viral-Hook-Templates.pdf", size: "2.8 MB", type: "PDF" },
            ],
          },
          {
            id: "l2-2-2",
            name: "Dynamic Typography & Motion Titles",
            duration: "55 mins",
            completed: false,
            description:
              "Animated Alex Hormozi style subtitles, animated highlight boxes, glowing text effects, and animated emoji callouts.",
            keyPoints: [
              "Auto-caption styling and keyword color highlighting",
              "Spring animation equations for pop-in text",
            ],
            resources: [
              { name: "Dynamic-Text-Presets.mogrts", size: "8.5 MB", type: "MOGRT" },
            ],
          },
        ],
      },
      {
        id: "m2-3",
        title: "Module 3: Client Reel Delivery & Monetization",
        duration: "25 Hours",
        lessons: [
          {
            id: "l2-3-1",
            name: "Repurposing Long-form Podcasts into 10 Viral Clips",
            duration: "65 mins",
            completed: false,
            description:
              "How to scan a 1-hour interview, clip the best 40-second insights, format vertical framing with multi-cam layout, and package for creators.",
            keyPoints: [
              "Smart reframing tools and manual face-tracking locks",
              "Building batch rendering queues for 10 clips in under 1 hour",
            ],
            resources: [
              { name: "Podcast-Repurposing-Checklist.pdf", size: "1.1 MB", type: "PDF" },
            ],
          },
          {
            id: "l2-3-2",
            name: "Packaging Retainers ($1,500/month Video Editing)",
            duration: "50 mins",
            completed: false,
            description:
              "Create irresistible 30-reels-a-month retainer offers for coaches, consultants, and real estate professionals.",
            keyPoints: [
              "Sample retainer contract and delivery service level agreements (SLAs)",
              "Automated client feedback review portals using Frame.io",
            ],
            resources: [
              { name: "Video-Editor-Client-Contract.docx", size: "750 KB", type: "DOCX" },
            ],
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
    instructor: "Priya Sharma (Senior Art Director)",
    totalLessons: 6,
    completedLessons: 6,
    duration: "04 Months / 80 Hours",
    status: "completed",
    lastAccessed: "12 Nov 2026",
    certificateEarned: true,
    certificateId: "SKA-CERT-2026-9812",
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
            description:
              "Color psychology, 60-30-10 color proportion rules, typographic pairings, and optical kerning principles.",
            keyPoints: [
              "Selecting contrasting accent tones that pass accessibility tests",
              "Heading, Subheading, and Body font pair equations",
            ],
            resources: [
              { name: "Color-Theory-Guide.pdf", size: "4.1 MB", type: "PDF" },
            ],
          },
          {
            id: "l3-1-2",
            name: "Vector Logo Crafting in Illustrator & Canva",
            duration: "75 mins",
            completed: true,
            description:
              "Grid alignment, golden ratio circles, pen tool precision, and converting client napkin sketches into clean vectors.",
            keyPoints: [
              "Mastering anchor points and bezier handles with zero distortion",
              "Constructing minimalist geometric marks with boolean pathfinders",
            ],
            resources: [
              { name: "Golden-Ratio-Grid-Template.ai", size: "5.6 MB", type: "AI" },
            ],
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
            description:
              "Compiling professional brand manuals including clear space rules, prohibited usage, RGB/CMYK/Pantone codes, and social favicons.",
            keyPoints: [
              "Setting up multi-page corporate brand guideline decks",
              "Packaging print-ready CMYK vectors and web-ready SVG icons",
            ],
            resources: [
              { name: "Brand-Guideline-Master-Template.pdf", size: "9.2 MB", type: "PDF" },
            ],
          },
          {
            id: "l3-2-2",
            name: "Live Client Design Case Study & Rebrand",
            duration: "90 mins",
            completed: true,
            description:
              "End-to-end client consultation, 3 concept mockups in realistic environments (storefronts, merchandise), and client sign-off.",
            keyPoints: [
              "Presenting concepts without asking 'do you like it?'",
              "Mockup staging on high-resolution 3D models",
            ],
            resources: [
              { name: "Case-Study-Presentation-Deck.key", size: "22.0 MB", type: "KEY" },
            ],
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
            name: "Building a Behance & Dribbble Portfolio That Sells",
            duration: "55 mins",
            completed: true,
            description:
              "How to curate only top case studies, tell design journey stories, and write clear project descriptions that attract premium agency scouts.",
            keyPoints: [
              "Case study case format: Problem -> Research -> Sketches -> Final Identity",
              "SEO tags for design portfolio directories",
            ],
            resources: [
              { name: "Portfolio-Checklist.pdf", size: "1.4 MB", type: "PDF" },
            ],
          },
          {
            id: "l3-3-2",
            name: "Pricing Logo Packages at ₹25,000 to ₹1,00,000",
            duration: "60 mins",
            completed: true,
            description:
              "Value pricing models, avoiding hourly rates, and offering tiered deliverables that allow clients to self-select higher tiers.",
            keyPoints: [
              "Three-tier proposal pricing framework",
              "Contract revisions clause to prevent scope creep",
            ],
            resources: [
              { name: "Design-Pricing-Calculator.xlsx", size: "520 KB", type: "XLSX" },
            ],
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
    instructor: "Rahul Verma & Creative Collective",
    totalLessons: 6,
    completedLessons: 2,
    duration: "04 Months / 65 Hours",
    status: "in-progress",
    lastAccessed: "08 Nov 2026",
    certificateEarned: false,
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
            description:
              "Anatomy of trending reels: structural hooks, tension build, pacing of visual stimuli, and call-to-actions that drive comment velocity.",
            keyPoints: [
              "Analyzing algorithmic signals: Saves, Shares, and Watch Time %",
              "Deconstructing viral content in your specific industry niche",
            ],
            resources: [
              { name: "Viral-Reel-Deconstruction-Sheet.pdf", size: "2.1 MB", type: "PDF" },
            ],
          },
          {
            id: "l4-1-2",
            name: "High-Retention Storytelling Frameworks",
            duration: "50 mins",
            completed: true,
            description:
              "The 3-act storytelling structure condensed for 60 seconds. Learn how to transform dry facts into captivating narrative journeys.",
            keyPoints: [
              "Setting stakes early: Why the audience must stay until the end",
              "Eliminating unnecessary filler words from scripts",
            ],
            resources: [
              { name: "60-Second-Story-Templates.docx", size: "840 KB", type: "DOCX" },
            ],
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
            name: "Direct Pitch Email Templates for Brand Sponsorships",
            duration: "40 mins",
            completed: false,
            description:
              "How to pitch direct marketing teams with media kits that showcase audience purchasing power rather than just follower counts.",
            keyPoints: [
              "Cold email pitch formula with 40%+ open rates",
              "Calculating your Cost Per Mille (CPM) rates for brand integrations",
            ],
            resources: [
              { name: "Media-Kit-Canva-Template.pdf", size: "3.7 MB", type: "PDF" },
            ],
          },
          {
            id: "l4-2-2",
            name: "Affiliate Link Embeds & Passive Conversion Funnels",
            duration: "45 mins",
            completed: false,
            description:
              "Organizing bio links, lead magnets, and automated direct message bots that deliver affiliate product recommendations on autopilot.",
            keyPoints: [
              "Automating ManyChat DM triggers with zero account flags",
              "Framing tool recommendations authentically inside tutorial content",
            ],
            resources: [
              { name: "Affiliate-Funnel-Blueprint.pdf", size: "1.9 MB", type: "PDF" },
            ],
          },
        ],
      },
      {
        id: "m4-3",
        title: "Module 3: Multi-Platform Growth & Omnichannel Scaling",
        duration: "25 Hours",
        lessons: [
          {
            id: "l4-3-1",
            name: "Cross-Posting to YouTube Shorts, LinkedIn & X",
            duration: "55 mins",
            completed: false,
            description:
              "Transforming a single video script into a text thread, a LinkedIn carousel, and a vertical short without redundant effort.",
            keyPoints: [
              "Content repurposing waterfall system",
              "Tailoring headlines for B2B vs consumer platforms",
            ],
            resources: [
              { name: "Omnichannel-Repurposing-Matrix.xlsx", size: "710 KB", type: "XLSX" },
            ],
          },
          {
            id: "l4-3-2",
            name: "Building an Engaged Community & Private Discord",
            duration: "50 mins",
            completed: false,
            description:
              "Cultivating superfans, moderating community discussion, and hosting exclusive live webinars that build unbreakable brand loyalty.",
            keyPoints: [
              "Discord / Telegram channel structure for high engagement",
              "Hosting weekly live AMAs with high attendee turnout",
            ],
            resources: [
              { name: "Community-Moderator-Guidelines.pdf", size: "1.3 MB", type: "PDF" },
            ],
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

  // Video Player Studio Modal State
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null);
  const [activeModuleIdx, setActiveModuleIdx] = useState<number>(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(38); // Simulated progress %
  const [activeTab, setActiveTab] = useState<"overview" | "resources" | "notes">("overview");
  const [expandedModules, setExpandedModules] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
  });

  const activeCourse = courses.find((c) => c.id === activeCourseId) || null;
  const currentModule = activeCourse?.modules[activeModuleIdx] || null;
  const currentLesson = currentModule?.lessons[activeLessonIdx] || null;

  // Toggle module accordion in player
  const toggleModuleAccordion = (idx: number) => {
    setExpandedModules((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Open video player for a course (optionally starting at first incomplete lesson or specific module/lesson)
  const openCoursePlayer = (course: EnrolledCourse, modIdx: number = 0, lessIdx: number = 0) => {
    setActiveCourseId(course.id);
    setActiveModuleIdx(modIdx);
    setActiveLessonIdx(lessIdx);
    setIsPlaying(true);
    setVideoProgress(15);
    // ensure active module is expanded
    setExpandedModules((prev) => ({
      ...prev,
      [modIdx]: true,
    }));
  };

  // Switch to a specific lesson
  const selectLesson = (modIdx: number, lessIdx: number) => {
    setActiveModuleIdx(modIdx);
    setActiveLessonIdx(lessIdx);
    setIsPlaying(true);
    setVideoProgress(5);
  };

  // Toggle current lesson completion
  const toggleCurrentLessonCompletion = () => {
    if (!activeCourse || !currentModule || !currentLesson) return;

    setCourses((prevCourses) =>
      prevCourses.map((c) => {
        if (c.id !== activeCourse.id) return c;

        let completedDelta = 0;
        const updatedModules = c.modules.map((m, mIdx) => {
          if (mIdx !== activeModuleIdx) return m;
          const updatedLessons = m.lessons.map((l, lIdx) => {
            if (lIdx !== activeLessonIdx) return l;
            const newCompletedState = !l.completed;
            completedDelta = newCompletedState ? 1 : -1;
            return { ...l, completed: newCompletedState };
          });
          return { ...m, lessons: updatedLessons };
        });

        const newCompletedCount = Math.max(
          0,
          Math.min(c.totalLessons, c.completedLessons + completedDelta)
        );
        const isNowCompleted = newCompletedCount === c.totalLessons;

        return {
          ...c,
          completedLessons: newCompletedCount,
          status: isNowCompleted ? "completed" : "in-progress",
          certificateEarned: isNowCompleted || c.certificateEarned,
          certificateId:
            isNowCompleted && !c.certificateId
              ? `SKA-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
              : c.certificateId,
          modules: updatedModules,
        };
      })
    );
  };

  // Next lesson navigation across modules
  const handleNextLesson = () => {
    if (!activeCourse) return;
    const currentMod = activeCourse.modules[activeModuleIdx];
    if (activeLessonIdx < currentMod.lessons.length - 1) {
      // Next lesson in current module
      selectLesson(activeModuleIdx, activeLessonIdx + 1);
    } else if (activeModuleIdx < activeCourse.modules.length - 1) {
      // Advance to next module
      selectLesson(activeModuleIdx + 1, 0);
      setExpandedModules((prev) => ({ ...prev, [activeModuleIdx + 1]: true }));
    }
  };

  // Previous lesson navigation across modules
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

  // Filtered courses
  const filteredCourses = courses.filter((course) => {
    const matchesFilter = filter === "all" || course.status === filter;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalCompletedLessons = courses.reduce((sum, c) => sum + c.completedLessons, 0);
  const totalAllLessons = courses.reduce((sum, c) => sum + c.totalLessons, 0);
  const overallPercentage = Math.round((totalCompletedLessons / totalAllLessons) * 100);

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
                My Enrolled Courses &amp; Module Video Hub
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Select any course below to explore all modules, stream lessons, take practical notes, and download project assets.
              </p>
            </div>
          </div>

          {/* Quick Metrics Header Card */}
          <div className="flex items-center gap-3 w-full lg:w-auto bg-slate-50 border border-slate-200 p-3 sm:px-4 sm:py-3 rounded-[4px]">
            <div className="text-right">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Overall Progress
              </div>
              <div className="text-lg font-black text-slate-900 font-mono">
                {overallPercentage}%
                <span className="text-xs font-normal text-slate-500 ml-1">
                  ({totalCompletedLessons}/{totalAllLessons} Completed)
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-[4px] bg-[#116E63] text-white flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Global Progress Line */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5 font-medium">
            <span>Overall Curriculum Completion Across All Enrolled Programs</span>
            <span className="font-mono font-bold text-slate-900">{overallPercentage}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-[4px] overflow-hidden border border-slate-200/60">
            <div
              className="h-full bg-[#116E63] transition-all duration-500 rounded-[4px]"
              style={{ width: `${overallPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 2. Filter Bar & Search */}
      <div className="bg-white border border-slate-200 p-4 shadow-xs rounded-[4px] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-[4px] border transition-colors cursor-pointer whitespace-nowrap ${
              filter === "all"
                ? "bg-[#116E63] text-white border-[#116E63]"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            All Courses ({courses.length})
          </button>
          <button
            onClick={() => setFilter("in-progress")}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-[4px] border transition-colors cursor-pointer whitespace-nowrap ${
              filter === "in-progress"
                ? "bg-[#116E63] text-white border-[#116E63]"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            In Progress ({courses.filter((c) => c.status === "in-progress").length})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-[4px] border transition-colors cursor-pointer whitespace-nowrap ${
              filter === "completed"
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            Completed ({courses.filter((c) => c.status === "completed").length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search enrolled course, mentor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#116E63] focus:border-[#116E63] text-slate-800 placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Course Cards Grid with Module Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCourses.map((course) => {
          const progressPercent = Math.round(
            (course.completedLessons / course.totalLessons) * 100
          );

          return (
            <div
              key={course.id}
              className="bg-white border border-slate-200 shadow-xs rounded-[4px] overflow-hidden flex flex-col hover:border-[#116E63]/40 transition-colors"
            >
              {/* Top Banner Image with Overlay */}
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden group">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>

                {/* Status Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white border border-white/20 px-2.5 py-1 rounded-[4px]">
                    {course.category}
                  </span>
                  {course.status === "completed" ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-2.5 py-1 rounded-[4px] flex items-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#116E63] text-white px-2.5 py-1 rounded-[4px] flex items-center gap-1 shadow-sm">
                      <Clock className="w-3 h-3" /> In Progress
                    </span>
                  )}
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="flex items-center gap-1 drop-shadow-sm font-semibold">
                    <Layers className="w-3.5 h-3.5 text-[#FDA31B]" />
                    <span>{course.modules.length} Modules</span>
                    <span className="text-white/60 mx-1">•</span>
                    <span>{course.totalLessons} Videos</span>
                  </span>
                  <span className="flex items-center gap-1 drop-shadow-sm font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{course.duration}</span>
                  </span>
                </div>
              </div>

              {/* Course Details Body */}
              <div className="p-4 sm:p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug font-[family-name:var(--font-yantramanav)] uppercase">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Lead Mentor: <strong className="text-slate-700">{course.instructor}</strong>
                  </p>

                  {/* Module Pill Summary */}
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {course.modules.map((m, mIdx) => (
                      <span
                        key={mIdx}
                        className="text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-[4px]"
                      >
                        M{mIdx + 1}: {m.lessons.length} lessons
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="space-y-1.5 bg-slate-50 border border-slate-200/80 p-3 rounded-[4px]">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-600">Video Progress:</span>
                    <span className="font-mono text-slate-900 font-bold">
                      {progressPercent}% ({course.completedLessons}/{course.totalLessons} Lessons)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 overflow-hidden rounded-[4px]">
                    <div
                      className={`h-full transition-all duration-300 ${
                        course.status === "completed" ? "bg-emerald-600" : "bg-[#116E63]"
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                    <span>Last accessed: {course.lastAccessed}</span>
                    {course.certificateEarned && (
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" /> Certificate Unlocked
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex items-center gap-2.5">
                <button
                  onClick={() => openCoursePlayer(course, 0, 0)}
                  className="flex-1 bg-[#116E63] hover:bg-[#0c5c53] text-white py-2.5 px-3 rounded-[4px] font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>
                    {course.status === "completed" ? "Watch Video Modules" : "Resume Video Lessons"}
                  </span>
                </button>

                {course.certificateEarned ? (
                  <button
                    onClick={() =>
                      alert(
                        `Official Certificate for "${course.title}".\nCertificate ID: ${course.certificateId}\nStudent: SkillAura Verified Enrollee`
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
                    onClick={() => openCoursePlayer(course, 0, 0)}
                    className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-[4px] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="View Course Modules & Lessons"
                  >
                    <ListVideo className="w-4 h-4" />
                    <span className="hidden sm:inline">Modules</span>
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

      {/* =========================================================================
          4. MODULE-WISE VIDEO PLAYER STUDIO (FULLSCREEN / DEDICATED POPUP STUDIO)
         ========================================================================= */}
      {activeCourse && currentModule && currentLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-white w-full max-w-6xl border border-slate-300 shadow-2xl rounded-[4px] overflow-hidden max-h-[96vh] flex flex-col my-auto">
            {/* Studio Header Bar */}
            <div className="bg-slate-900 text-white px-4 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between shrink-0 border-b border-slate-800">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-[4px] bg-[#116E63] text-white flex items-center justify-center shrink-0">
                  <Video className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FDA31B] bg-slate-800 px-2 py-0.5 rounded-[4px]">
                      {activeCourse.category}
                    </span>
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      • {activeCourse.instructor}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white uppercase font-[family-name:var(--font-yantramanav)] truncate">
                    {activeCourse.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-[4px] border border-slate-700">
                  <Award className="w-3.5 h-3.5 text-[#FDA31B]" />
                  <span>
                    Course Completion:{" "}
                    <strong className="text-white font-mono">
                      {Math.round((activeCourse.completedLessons / activeCourse.totalLessons) * 100)}%
                    </strong>
                  </span>
                </div>
                <button
                  onClick={() => setActiveCourseId(null)}
                  className="w-8 h-8 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                  aria-label="Close Studio"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Studio Main Workspace: Grid with Video (Left 65%) & Module Playlist (Right 35%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
              {/* LEFT COLUMN: Video Player Screen & Lesson Details (Col 1-7 or 1-8) */}
              <div className="lg:col-span-8 p-3 sm:p-5 flex flex-col space-y-4 border-b lg:border-b-0 lg:border-r border-slate-200 overflow-y-auto">
                {/* 1. Realistic Responsive Video Player Screen */}
                <div className="relative aspect-video w-full bg-slate-950 rounded-[4px] overflow-hidden border border-slate-800 shadow-md group select-none">
                  {/* Backdrop artwork & ambient lighting */}
                  <Image
                    src={activeCourse.image}
                    alt={currentLesson.name}
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      isPlaying ? "opacity-35 blur-[1px]" : "opacity-60"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

                  {/* Watermark / Badge in Top Left */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                    <span className="bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-[4px] border border-white/20 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      1080p HD Streaming
                    </span>
                    <span className="bg-black/70 backdrop-blur-xs text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded-[4px] border border-white/20">
                      Module {activeModuleIdx + 1} • Lesson {activeLessonIdx + 1}
                    </span>
                  </div>

                  {/* Center Play / Pause Indicator */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#116E63]/90 hover:bg-[#116E63] text-white flex items-center justify-center cursor-pointer shadow-xl transition-transform hover:scale-110 active:scale-95 z-10 border-2 border-white/40"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 fill-white" />
                    ) : (
                      <Play className="w-8 h-8 fill-white ml-1" />
                    )}
                  </button>

                  {/* Live Simulation Overlay Text */}
                  <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 text-center pointer-events-none">
                    <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-teal-300/80 mb-1">
                      {currentModule.title}
                    </div>
                    <div className="text-lg sm:text-2xl font-black text-white font-[family-name:var(--font-yantramanav)] uppercase drop-shadow-md px-4">
                      {currentLesson.name}
                    </div>
                  </div>

                  {/* Bottom Video Player Control Bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3 sm:p-4 z-20 space-y-2">
                    {/* Scrub Bar / Timeline */}
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={videoProgress}
                        onChange={(e) => setVideoProgress(Number(e.target.value))}
                        className="w-full h-1.5 bg-white/25 rounded-[4px] appearance-none cursor-pointer accent-[#FDA31B] hover:h-2 transition-all"
                      />
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between text-white text-xs">
                      {/* Left Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="hover:text-[#FDA31B] transition-colors cursor-pointer"
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4 fill-current" />
                          ) : (
                            <Play className="w-4 h-4 fill-current" />
                          )}
                        </button>

                        <button
                          onClick={handlePrevLesson}
                          className="hover:text-[#FDA31B] transition-colors cursor-pointer disabled:opacity-40"
                          disabled={activeModuleIdx === 0 && activeLessonIdx === 0}
                          title="Previous Lesson"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>

                        <button
                          onClick={handleNextLesson}
                          className="hover:text-[#FDA31B] transition-colors cursor-pointer disabled:opacity-40"
                          disabled={
                            activeModuleIdx === activeCourse.modules.length - 1 &&
                            activeLessonIdx === currentModule.lessons.length - 1
                          }
                          title="Next Lesson"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="hover:text-[#FDA31B] transition-colors cursor-pointer ml-1"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>

                        <span className="font-mono text-[11px] text-slate-300">
                          {Math.floor((videoProgress / 100) * 45)}:
                          {String(Math.floor(((videoProgress * 13) % 60))).padStart(2, "0")} / {currentLesson.duration}
                        </span>
                      </div>

                      {/* Right Controls */}
                      <div className="flex items-center gap-3">
                        {/* Speed Toggle */}
                        <button
                          onClick={() => {
                            const speeds = [1, 1.25, 1.5, 2];
                            const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                            setPlaybackSpeed(speeds[nextIdx]);
                          }}
                          className="font-mono font-bold text-[11px] bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-[4px] transition-colors cursor-pointer"
                          title="Playback Speed"
                        >
                          {playbackSpeed}x
                        </button>

                        <button
                          onClick={() => {
                            if (!document.fullscreenElement) {
                              document.documentElement.requestFullscreen().catch(() => {});
                            } else {
                              document.exitFullscreen().catch(() => {});
                            }
                          }}
                          className="hover:text-[#FDA31B] transition-colors cursor-pointer"
                          title="Toggle Fullscreen"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Lesson Title, Completion Toggle, & Navigation */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-[4px] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#116E63] bg-[#116E63]/10 px-2 py-0.5 rounded-[4px]">
                          {currentModule.title}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          Duration: {currentLesson.duration}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 font-[family-name:var(--font-yantramanav)] uppercase">
                        {currentLesson.name}
                      </h4>
                    </div>

                    {/* Mark as Completed Toggle Button */}
                    <button
                      onClick={toggleCurrentLessonCompletion}
                      className={`px-3.5 py-2 rounded-[4px] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 ${
                        currentLesson.completed
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                          : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-300"
                      }`}
                    >
                      {currentLesson.completed ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Lesson Completed</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-slate-400" />
                          <span>Mark as Completed</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Previous / Next Lesson Navigation Buttons */}
                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <button
                      onClick={handlePrevLesson}
                      disabled={activeModuleIdx === 0 && activeLessonIdx === 0}
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-[4px] font-bold uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Previous Video
                    </button>

                    <span className="text-slate-500 text-[11px] font-mono hidden sm:inline">
                      Module {activeModuleIdx + 1} of {activeCourse.modules.length}
                    </span>

                    <button
                      onClick={handleNextLesson}
                      disabled={
                        activeModuleIdx === activeCourse.modules.length - 1 &&
                        activeLessonIdx === currentModule.lessons.length - 1
                      }
                      className="px-3 py-1.5 bg-[#116E63] hover:bg-[#0c5c53] text-white rounded-[4px] font-bold uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      Next Video <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 3. Tabbed Lesson Details: Overview, Resources, Notes */}
                <div className="border border-slate-200 rounded-[4px] overflow-hidden bg-white shadow-xs">
                  {/* Tabs Bar */}
                  <div className="flex items-center border-b border-slate-200 bg-slate-50">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                        activeTab === "overview"
                          ? "border-[#116E63] text-[#116E63] bg-white"
                          : "border-transparent text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Lesson Overview</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("resources")}
                      className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                        activeTab === "resources"
                          ? "border-[#116E63] text-[#116E63] bg-white"
                          : "border-transparent text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>
                        Resources ({currentLesson.resources ? currentLesson.resources.length : 0})
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab("notes")}
                      className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                        activeTab === "notes"
                          ? "border-[#116E63] text-[#116E63] bg-white"
                          : "border-transparent text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Take Notes</span>
                    </button>
                  </div>

                  {/* Tab Body */}
                  <div className="p-4 sm:p-5 text-xs sm:text-sm">
                    {activeTab === "overview" && (
                      <div className="space-y-3.5">
                        <p className="text-slate-700 leading-relaxed">
                          {currentLesson.description}
                        </p>

                        {currentLesson.keyPoints && currentLesson.keyPoints.length > 0 && (
                          <div className="space-y-2 pt-2">
                            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                              Key Learning Objectives:
                            </h5>
                            <ul className="space-y-1.5">
                              {currentLesson.keyPoints.map((pt, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2 text-slate-600">
                                  <Check className="w-3.5 h-3.5 text-[#116E63] shrink-0 mt-0.5" />
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "resources" && (
                      <div className="space-y-3">
                        {currentLesson.resources && currentLesson.resources.length > 0 ? (
                          currentLesson.resources.map((res, rIdx) => (
                            <div
                              key={rIdx}
                              className="p-3 bg-slate-50 border border-slate-200 rounded-[4px] flex items-center justify-between hover:bg-slate-100 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-[4px] bg-[#116E63]/10 text-[#116E63] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                                  {res.type}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900 text-xs sm:text-sm">
                                    {res.name}
                                  </div>
                                  <div className="text-[11px] text-slate-500 font-mono">
                                    File Size: {res.size}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  alert(`Downloading learning asset: ${res.name} (${res.size})`)
                                }
                                className="px-3 py-1.5 bg-[#116E63] hover:bg-[#0c5c53] text-white rounded-[4px] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Download</span>
                              </button>
                            </div>
                          ))
                        ) : (
                          <p className="text-slate-500 italic">
                            No supplementary resource files attached to this video lesson.
                          </p>
                        )}
                      </div>
                    )}

                    {activeTab === "notes" && (
                      <div className="space-y-3">
                        <textarea
                          placeholder="Type your notes for this video lesson here (e.g. timestamps, action items, client pitch lines)..."
                          rows={4}
                          className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#116E63] text-slate-800 placeholder-slate-400"
                        />
                        <button
                          onClick={() => alert("Notes saved to your SkillAura student notebook!")}
                          className="px-4 py-2 bg-[#116E63] hover:bg-[#0c5c53] text-white rounded-[4px] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Save Notes
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: MODULE-WISE PLAYLIST (Col 8-12) */}
              <div className="lg:col-span-4 bg-slate-50/70 p-3 sm:p-5 space-y-4 overflow-y-auto">
                {/* Playlist Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 font-[family-name:var(--font-yantramanav)]">
                      Course Curriculum
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Module-by-Module Video Lessons
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold bg-white border border-slate-200 px-2 py-1 rounded-[4px] text-slate-700">
                    {activeCourse.completedLessons} / {activeCourse.totalLessons} Done
                  </span>
                </div>

                {/* Modules Accordion List */}
                <div className="space-y-3">
                  {activeCourse.modules.map((module, mIdx) => {
                    const isExpanded = expandedModules[mIdx] ?? true;
                    const modCompletedCount = module.lessons.filter((l) => l.completed).length;
                    const isCurrentModule = activeModuleIdx === mIdx;

                    return (
                      <div
                        key={module.id}
                        className={`border rounded-[4px] overflow-hidden bg-white shadow-2xs transition-colors ${
                          isCurrentModule ? "border-[#116E63]/40" : "border-slate-200"
                        }`}
                      >
                        {/* Module Accordion Header */}
                        <button
                          onClick={() => toggleModuleAccordion(mIdx)}
                          className={`w-full p-3 flex items-center justify-between text-left transition-colors cursor-pointer ${
                            isCurrentModule ? "bg-teal-50/50" : "bg-slate-100/70 hover:bg-slate-100"
                          }`}
                        >
                          <div className="space-y-0.5 pr-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[3px] ${
                                  isCurrentModule
                                    ? "bg-[#116E63] text-white"
                                    : "bg-slate-200 text-slate-700"
                                }`}
                              >
                                Module {mIdx + 1}
                              </span>
                              <span className="text-[11px] font-mono text-slate-500">
                                {modCompletedCount}/{module.lessons.length} Completed
                              </span>
                            </div>
                            <div className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                              {module.title}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 text-slate-500">
                            <span className="text-[10px] font-mono hidden sm:inline">
                              {module.duration}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </button>

                        {/* Module Lessons List */}
                        {isExpanded && (
                          <div className="divide-y divide-slate-100">
                            {module.lessons.map((lesson, lIdx) => {
                              const isCurrentLesson =
                                activeModuleIdx === mIdx && activeLessonIdx === lIdx;

                              return (
                                <div
                                  key={lesson.id}
                                  onClick={() => selectLesson(mIdx, lIdx)}
                                  className={`p-3 flex items-center justify-between text-xs transition-colors cursor-pointer group ${
                                    isCurrentLesson
                                      ? "bg-[#116E63]/10 border-l-4 border-l-[#116E63]"
                                      : "hover:bg-slate-50"
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 pr-2 overflow-hidden">
                                    {lesson.completed ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                    ) : isCurrentLesson ? (
                                      <PlayCircle className="w-4 h-4 text-[#116E63] shrink-0 fill-[#116E63]/10 animate-pulse" />
                                    ) : (
                                      <PlayCircle className="w-4 h-4 text-slate-400 group-hover:text-[#116E63] shrink-0 transition-colors" />
                                    )}

                                    <div className="truncate">
                                      <span
                                        className={`font-medium block truncate ${
                                          isCurrentLesson
                                            ? "text-[#116E63] font-bold"
                                            : lesson.completed
                                            ? "text-slate-600 line-through decoration-slate-300"
                                            : "text-slate-800 group-hover:text-[#116E63]"
                                        }`}
                                      >
                                        {lesson.name}
                                      </span>
                                      {isCurrentLesson && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#116E63]">
                                          ▶ Now Playing
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <span className="text-[11px] text-slate-500 font-mono shrink-0">
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

            {/* Studio Footer Bar */}
            <div className="p-3 sm:p-4 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Sparkles className="w-4 h-4 text-[#FDA31B]" />
                <span>
                  Tip: Complete every video lesson in sequence to unlock certification & client referrals.
                </span>
              </div>
              <button
                onClick={() => setActiveCourseId(null)}
                className="w-full sm:w-auto px-5 py-2 bg-[#116E63] hover:bg-[#0c5c53] text-white font-bold text-xs uppercase tracking-wider rounded-[4px] transition-colors cursor-pointer"
              >
                Close Studio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
