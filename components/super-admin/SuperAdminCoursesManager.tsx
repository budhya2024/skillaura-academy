"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ENROLLED_COURSES_DATA,
  EnrolledCourse,
  CourseModule,
  Lesson,
} from "../../lib/coursesData";
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Video,
  Play,
  CheckCircle2,
  Search,
  FileText,
  Clock,
  Save,
  Upload,
  Image as ImageIcon,
  Film,
  Check,
  ArrowLeft,
} from "lucide-react";

const PRESET_THUMBNAILS = [
  { name: "Business Mastery", url: "/images/course1.jpg" },
  { name: "High-Ticket Sales", url: "/images/course2.jpg" },
  { name: "Graphic & Brand Design", url: "/images/course3.jpg" },
  { name: "Video Editing Reels", url: "/images/course4.jpg" },
  { name: "Digital Growth Ads", url: "/images/course5.jpg" },
];

const STORAGE_KEY = "skillAuraCoursesRegistry";

// Helper: Flatten all lessons directly from course modules for single-lesson management
const getCourseLessons = (course: EnrolledCourse | null): Lesson[] => {
  if (!course || !course.modules) return [];
  return course.modules.flatMap((m) => m.lessons || []);
};

export default function SuperAdminCoursesManager() {
  const [courses, setCourses] = useState<EnrolledCourse[]>(ENROLLED_COURSES_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // View Mode: "list" shows the full course directory; "editor" opens the dedicated course details & single video lessons page
  const [viewMode, setViewMode] = useState<"list" | "editor">("list");

  // Selected Course being edited
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form states for Course
  const [courseForm, setCourseForm] = useState({
    title: "",
    category: "Business & Sales",
    instructor: "SkillAura Master Team",
    duration: "60 Hours",
    price: 4999,
    image: "/images/course2.jpg",
  });

  // Video Lesson Modal (Lesson-wise single upload directly under course)
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  // Live video preview modal
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form states for Single Lesson
  const [videoSourceType, setVideoSourceType] = useState<"upload" | "url">("upload");
  const [uploadedVideoFileName, setUploadedVideoFileName] = useState<string | null>(null);
  const [uploadedVideoFileSize, setUploadedVideoFileSize] = useState<string | null>(null);

  const [lessonForm, setLessonForm] = useState({
    name: "",
    duration: "35 mins",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "",
    resourceName: "",
  });

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCourses(parsed);
            setSelectedCourse(parsed[0]);
            return;
          }
        }
      } catch (e) {
        console.error("Failed to load courses from localStorage", e);
      }
      setSelectedCourse(ENROLLED_COURSES_DATA[0]);
    }
  }, []);

  const saveAndSyncCourses = (updatedCourses: EnrolledCourse[]) => {
    setCourses(updatedCourses);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCourses));
      } catch (e) {
        console.error("Failed to save courses to localStorage", e);
      }
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Switch to Editor Page: Create New Course
  const handleOpenAddCourse = () => {
    setIsCreatingNew(true);
    setSelectedCourse(null);
    setCourseForm({
      title: "",
      category: "Business & Sales",
      instructor: "SkillAura Master Team",
      duration: "60 Hours",
      price: 4999,
      image: "/images/course2.jpg",
    });
    setViewMode("editor");
  };

  // Switch to Editor Page: Edit Existing Course
  const handleOpenEditCourse = (course: EnrolledCourse) => {
    setIsCreatingNew(false);
    setSelectedCourse(course);
    setCourseForm({
      title: course.title,
      category: course.category,
      instructor: course.instructor,
      duration: course.duration,
      price: course.price || 4999,
      image: course.image,
    });
    setViewMode("editor");
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCourseForm((prev) => ({ ...prev, image: url }));
      showNotification(`Main course thumbnail loaded: ${file.name}`);
    }
  };

  // Save Course details on the dedicated Editor Page
  const handleSaveCourse = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!courseForm.title.trim()) {
      showNotification("Please enter a course title.");
      return;
    }

    if (!isCreatingNew && selectedCourse) {
      const updated = courses.map((c) =>
        c.id === selectedCourse.id
          ? {
              ...c,
              title: courseForm.title,
              category: courseForm.category,
              instructor: courseForm.instructor,
              duration: courseForm.duration,
              price: courseForm.price,
              image: courseForm.image,
            }
          : c
      );
      saveAndSyncCourses(updated);
      setSelectedCourse(updated.find((c) => c.id === selectedCourse.id) || null);
      showNotification("Course details and thumbnail updated successfully!");
    } else {
      const newCourse: EnrolledCourse = {
        id: Date.now(),
        title: courseForm.title,
        category: courseForm.category,
        instructor: courseForm.instructor,
        duration: courseForm.duration,
        price: courseForm.price,
        image: courseForm.image,
        totalLessons: 0,
        completedLessons: 0,
        status: "in-progress",
        modules: [
          {
            id: `curriculum-${Date.now()}`,
            title: "Course Curriculum",
            duration: courseForm.duration,
            lessons: [],
          },
        ],
      };
      const updated = [newCourse, ...courses];
      saveAndSyncCourses(updated);
      setSelectedCourse(newCourse);
      setIsCreatingNew(false);
      showNotification("New course created! You can now upload lessons one by one.");
    }
  };

  const handleDeleteCourse = (courseId: number, courseTitle: string) => {
    if (confirm(`Are you sure you want to delete "${courseTitle}" from the course directory?`)) {
      const updated = courses.filter((c) => c.id !== courseId);
      saveAndSyncCourses(updated);
      if (selectedCourse?.id === courseId) {
        setSelectedCourse(updated[0] || null);
        setViewMode("list");
      }
      showNotification(`"${courseTitle}" removed from courses registry.`);
    }
  };

  // Handlers for Lesson-Wise Single Video Upload (Directly under Course, No Modules)
  const handleOpenAddLesson = () => {
    if (!selectedCourse) return;
    const currentLessonsCount = getCourseLessons(selectedCourse).length;
    setEditingLesson(null);
    setVideoSourceType("upload");
    setUploadedVideoFileName(null);
    setUploadedVideoFileSize(null);
    setLessonForm({
      name: `Lesson ${currentLessonsCount + 1}: `,
      duration: "30 mins",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "",
      resourceName: "",
    });
    setIsLessonModalOpen(true);
  };

  const handleOpenEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setUploadedVideoFileName(null);
    setUploadedVideoFileSize(null);
    setLessonForm({
      name: lesson.name,
      duration: lesson.duration,
      videoUrl: (lesson as any).videoUrl || "",
      description: (lesson as any).description || "",
      resourceName: lesson.resources?.[0]?.name || "",
    });
    setVideoSourceType((lesson as any).videoUrl?.startsWith("blob:") ? "upload" : "url");
    setIsLessonModalOpen(true);
  };

  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setUploadedVideoFileName(file.name);
      setUploadedVideoFileSize(`${sizeMb} MB`);
      setLessonForm((prev) => ({
        ...prev,
        videoUrl: blobUrl,
        name: prev.name.trim().endsWith(":")
          ? `${prev.name} ${file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ")}`
          : prev.name || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      }));
      showNotification(`Video file selected: ${file.name} (${sizeMb} MB)`);
    }
  };

  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || !lessonForm.name.trim()) return;

    const resources = lessonForm.resourceName.trim()
      ? [
          {
            name: lessonForm.resourceName.trim(),
            size: "1.2 MB",
          },
        ]
      : [];

    const existingLessons = getCourseLessons(selectedCourse);

    let updatedLessons: Lesson[];
    if (editingLesson) {
      updatedLessons = existingLessons.map((l) =>
        l.id === editingLesson.id
          ? {
              ...l,
              name: lessonForm.name,
              duration: lessonForm.duration,
              videoUrl: lessonForm.videoUrl,
              description: lessonForm.description,
              resources,
            }
          : l
      );
    } else {
      const newLesson: Lesson = {
        id: `lesson-${Date.now()}`,
        name: lessonForm.name,
        duration: lessonForm.duration,
        completed: false,
        resources,
        ...({
          videoUrl: lessonForm.videoUrl,
          description: lessonForm.description,
        } as any),
      };
      updatedLessons = [...existingLessons, newLesson];
    }

    // Wrap in standard module for compatibility with student viewer
    const updatedModules: CourseModule[] = [
      {
        id: selectedCourse.modules?.[0]?.id || `module-${selectedCourse.id}`,
        title: "Course Lessons",
        duration: selectedCourse.duration,
        lessons: updatedLessons,
      },
    ];

    const updatedCourses = courses.map((c) =>
      c.id === selectedCourse.id
        ? {
            ...c,
            modules: updatedModules,
            totalLessons: updatedLessons.length,
          }
        : c
    );

    saveAndSyncCourses(updatedCourses);
    setSelectedCourse({
      ...selectedCourse,
      modules: updatedModules,
      totalLessons: updatedLessons.length,
    });
    setIsLessonModalOpen(false);
    showNotification(
      editingLesson
        ? "Lesson updated successfully!"
        : "Video lesson added and ready for student streaming!"
    );
  };

  const handleDeleteLesson = (lessonId: string) => {
    if (!selectedCourse) return;
    if (confirm("Are you sure you want to delete this video lesson?")) {
      const existingLessons = getCourseLessons(selectedCourse);
      const updatedLessons = existingLessons.filter((l) => l.id !== lessonId);

      const updatedModules: CourseModule[] = [
        {
          id: selectedCourse.modules?.[0]?.id || `module-${selectedCourse.id}`,
          title: "Course Lessons",
          duration: selectedCourse.duration,
          lessons: updatedLessons,
        },
      ];

      const updatedCourses = courses.map((c) =>
        c.id === selectedCourse.id
          ? {
              ...c,
              modules: updatedModules,
              totalLessons: updatedLessons.length,
            }
          : c
      );

      saveAndSyncCourses(updatedCourses);
      setSelectedCourse({
        ...selectedCourse,
        modules: updatedModules,
        totalLessons: updatedLessons.length,
      });
      showNotification("Video lesson removed.");
    }
  };

  // Filter courses by category and search
  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" ||
      c.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(courses.map((c) => c.category)));

  // Current lessons for the course being edited
  const currentCourseLessons = getCourseLessons(selectedCourse);

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs font-semibold rounded-[4px] shadow-sm flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 1: ALL COURSES DIRECTORY LISTING ("list down all course show")   */}
      {/* ========================================================================= */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {/* Top Header Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#116E63] dark:text-emerald-400" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                  Course Directory &amp; Masterclass Catalog
                </h2>
                <span className="text-xs font-mono font-bold bg-[#116E63] text-white px-2 py-0.5 rounded-full">
                  {courses.length} Courses
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Manage courses, thumbnails, and upload video lessons directly (lesson by lesson, no module grouping).
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleOpenAddCourse}
                className="bg-[#116E63] hover:bg-[#0c5c53] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Course</span>
              </button>
            </div>
          </div>



          {/* Full Courses Directory Grid / List */}
          <div className="space-y-3">
            {filteredCourses.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 text-center rounded-[4px] shadow-xs space-y-3">
                <BookOpen className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  No courses found matching &ldquo;{searchQuery}&rdquo;
                </h4>
                <p className="text-xs text-slate-500">
                  Try adjusting your search query or select another category filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterCategory("all");
                  }}
                  className="px-3 py-1.5 text-xs font-bold uppercase text-[#116E63] hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredCourses.map((course, idx) => {
                const lessonsCount = getCourseLessons(course).length;

                return (
                  <div
                    key={course.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    {/* Course Left Info & Thumbnail */}
                    <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                      {/* Index Tag */}
                      <span className="font-mono text-slate-400 dark:text-slate-500 font-bold text-xs sm:text-sm w-5 shrink-0 hidden sm:block">
                        #{idx + 1}
                      </span>

                      {/* 16:9 Thumbnail Image */}
                      <div className="relative w-28 sm:w-36 aspect-video rounded-[4px] overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700 shadow-2xs">
                        <Image
                          src={course.image || "/images/course2.jpg"}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Content Body */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#116E63] dark:text-emerald-400">
                            {course.category}
                          </span>
                          <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                            ID: #{course.id}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                          {course.title}
                        </h3>

                        {/* Metadata stats row (Lesson-wise count only, no modules) */}
                        <div className="flex items-center gap-3 text-[13px] text-slate-600 dark:text-slate-400 font-medium flex-wrap pt-0.5">
                          <span className="flex items-center gap-1 font-semibold text-[#116E63] dark:text-emerald-400">
                            <Video className="w-3.5 h-3.5" />
                            {lessonsCount} Video Lessons
                          </span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1 font-mono">
                            <Clock className="w-3.5 h-3.5" />
                            {course.duration}
                          </span>
                          <span>&bull;</span>
                          <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                            ₹{course.price?.toLocaleString() || "4,999"}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                          Lead Mentor: <strong className="text-slate-700 dark:text-slate-300 font-semibold">{course.instructor}</strong>
                        </p>
                      </div>
                    </div>

                    {/* Actions Right Column */}
                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 w-full md:w-auto justify-between md:justify-end">
                      <div className="text-xs text-slate-500 md:hidden">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm font-mono">
                          ₹{course.price?.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Edit Course & Video Lessons Button (Full Deep Color) */}
                        <button
                          onClick={() => handleOpenEditCourse(course)}
                          className="px-3.5 py-2 text-xs font-bold text-white bg-[#116E63] hover:bg-[#0c5c53] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-[4px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                          title="Open dedicated editor page for course details & video lessons"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit Course &amp; Lessons</span>
                        </button>

                        {/* Delete Course Button */}
                        <button
                          onClick={() => handleDeleteCourse(course.id, course.title)}
                          className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-[4px] transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                          title="Delete Course from Registry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 2: FULL DEDICATED COURSE EDIT & LESSON-WISE VIDEO UPLOAD PAGE   */}
      {/* ========================================================================= */}
      {viewMode === "editor" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Top Sticky Navigation Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sticky top-16 z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode("list")}
                className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase rounded-[4px] flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Return to full course directory"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Courses</span>
              </button>

              <div className="border-l border-slate-200 dark:border-slate-700 pl-3">
                <span className="text-[11px] font-bold uppercase text-[#116E63] dark:text-emerald-400 block font-mono">
                  {isCreatingNew ? "Creating New Course" : `Course ID: #${selectedCourse?.id}`}
                </span>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)] truncate max-w-md">
                  {isCreatingNew
                    ? "New Masterclass Studio"
                    : selectedCourse?.title || "Course Studio"}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className="px-3 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold uppercase rounded-[4px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveCourse()}
                className="px-4 py-2 bg-[#116E63] hover:bg-[#0c5c53] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{isCreatingNew ? "Create Masterclass" : "Save Course Changes"}</span>
              </button>
            </div>
          </div>

          {/* SECTION 1: MASTERCLASS CORE DETAILS & THUMBNAIL STUDIO */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 rounded-[4px] shadow-xs space-y-5">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
                  <span>Masterclass Identity &amp; Thumbnail Poster</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Set course title, pricing, instructor attribution, and custom thumbnail poster
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (7 cols): Metadata Form */}
              <div className="lg:col-span-7 space-y-4 text-xs">
                {/* Course Title */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1.5">
                    Masterclass Title
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    placeholder="e.g. High-Ticket Closing & Business Sales Mastery"
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] font-bold text-sm text-slate-900 dark:text-white"
                  />
                </div>

                {/* Category, Price, Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1.5">
                      Category
                    </label>
                    <select
                      value={courseForm.category}
                      onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] font-semibold text-slate-800 dark:text-white text-xs"
                    >
                      <option value="Business & Sales">Business &amp; Sales</option>
                      <option value="Video Editing">Video Editing</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Content Creation">Content Creation</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Web Development">Web Development</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1.5">
                      Course Fee (₹)
                    </label>
                    <input
                      type="number"
                      required
                      value={courseForm.price}
                      onChange={(e) => setCourseForm({ ...courseForm, price: Number(e.target.value) })}
                      placeholder="4999"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono font-bold text-slate-900 dark:text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1.5">
                      Total Duration
                    </label>
                    <input
                      type="text"
                      required
                      value={courseForm.duration}
                      onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                      placeholder="e.g. 70 Hours"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono text-slate-900 dark:text-white text-xs"
                    />
                  </div>
                </div>

                {/* Lead Instructor */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1.5">
                    Lead Instructor / Mentor Name
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.instructor}
                    onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })}
                    placeholder="e.g. SkillAura Master Team"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] text-slate-900 dark:text-white text-xs"
                  />
                </div>
              </div>

              {/* Right Column (5 cols): Dedicated Thumbnail Poster Studio */}
              <div className="lg:col-span-5 p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[4px] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
                    <span>Main Course Thumbnail</span>
                  </label>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    16:9 Recommended
                  </span>
                </div>

                {/* Live 16:9 Thumbnail Preview */}
                <div className="relative aspect-video w-full rounded-[4px] overflow-hidden border-2 border-slate-300 dark:border-slate-600 bg-slate-900 shrink-0 shadow-xs">
                  <Image
                    src={courseForm.image || "/images/course2.jpg"}
                    alt="Thumbnail Preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs text-white font-bold uppercase drop-shadow-md truncate">
                      {courseForm.title || "Course Poster Preview"}
                    </span>
                  </div>
                </div>

                {/* File Upload Button from device */}
                <label className="w-full py-2.5 px-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-[4px] flex items-center justify-center gap-2 cursor-pointer transition-colors text-xs font-bold text-slate-700 dark:text-slate-200">
                  <Upload className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
                  <span>Upload Image from Device (PNG / JPG / WEBP)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                  />
                </label>

                {/* External URL input */}
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                    Or paste external image URL / path:
                  </span>
                  <input
                    type="text"
                    value={courseForm.image}
                    onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                    placeholder="/images/course1.jpg or https://..."
                    className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[4px] font-mono text-xs text-slate-800 dark:text-white"
                  />
                </div>

                {/* Preset Thumbnails Picker */}
                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 block">
                    Or select from library preset thumbnails:
                  </span>
                  <div className="grid grid-cols-5 gap-1.5">
                    {PRESET_THUMBNAILS.map((preset) => {
                      const isSelected = courseForm.image === preset.url;
                      return (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => setCourseForm({ ...courseForm, image: preset.url })}
                          className={`relative aspect-video rounded-[3px] overflow-hidden border-2 transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#116E63] ring-2 ring-[#116E63]/40 scale-105"
                              : "border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <Image src={preset.url} alt={preset.name} fill className="object-cover" />
                          {isSelected && (
                            <div className="absolute inset-0 bg-[#116E63]/40 flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: LESSON-WISE VIDEO UPLOAD STUDIO (DIRECT SINGLE LESSONS, NO MODULES) */}
          {!isCreatingNew && selectedCourse ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 rounded-[4px] shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Film className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                      Course Video Lessons ({currentCourseLessons.length} Lessons Total)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Upload and manage video lessons one by one for this masterclass course (single lesson-wise streaming)
                  </p>
                </div>

                {/* Single Video Lesson Upload Button (Full Deep Color) */}
                <button
                  type="button"
                  onClick={handleOpenAddLesson}
                  className="px-4 py-2 bg-[#116E63] hover:bg-[#0c5c53] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Video Lesson</span>
                </button>
              </div>

              {/* Direct Single Lessons List */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-[4px] overflow-hidden bg-slate-50/50 dark:bg-slate-900/60 divide-y divide-slate-100 dark:divide-slate-800">
                {currentCourseLessons.length === 0 ? (
                  <div className="py-12 text-center space-y-2 p-4">
                    <Film className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      No video lessons uploaded yet
                    </p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Click &ldquo;Upload Video Lesson&rdquo; to add your first lesson with video streaming media and downloadable handouts.
                    </p>
                    <button
                      type="button"
                      onClick={handleOpenAddLesson}
                      className="text-xs font-bold text-white bg-[#116E63] hover:bg-[#0c5c53] px-3.5 py-2 rounded-[4px] uppercase inline-flex items-center gap-1.5 cursor-pointer shadow-xs mt-1"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload First Video Lesson</span>
                    </button>
                  </div>
                ) : (
                  currentCourseLessons.map((lesson, lIdx) => (
                    <div
                      key={lesson.id}
                      className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white dark:hover:bg-slate-800/60 transition-colors"
                    >
                      {/* Left Lesson Info */}
                      <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                        {/* Number Badge */}
                        <div className="w-8 h-8 rounded-[4px] bg-[#116E63] text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-2xs">
                          {lIdx + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm leading-snug">
                            {lesson.name}
                          </h4>

                          <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-3 mt-1 font-mono flex-wrap">
                            <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                              <Clock className="w-3.5 h-3.5 text-[#116E63]" /> {lesson.duration}
                            </span>
                            {(lesson as any).videoUrl && (
                              <>
                                <span>&bull;</span>
                                <span className="text-emerald-700 dark:text-emerald-400 font-sans font-semibold flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" /> Video Attached
                                </span>
                              </>
                            )}
                            {lesson.resources?.[0]?.name && (
                              <>
                                <span>&bull;</span>
                                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                  <FileText className="w-3.5 h-3.5" /> {lesson.resources[0].name}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                        {/* Test Preview Video Button (Full Deep Color) */}
                        {(lesson as any).videoUrl && (
                          <button
                            type="button"
                            onClick={() => setPreviewVideoUrl((lesson as any).videoUrl)}
                            className="px-3 py-1.5 text-xs font-bold text-white bg-[#116E63] hover:bg-[#0c5c53] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-[3px] flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                            title="Test & Preview Video Playback"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Preview</span>
                          </button>
                        )}

                        {/* Edit Lesson */}
                        <button
                          type="button"
                          onClick={() => handleOpenEditLesson(lesson)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-[3px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Edit Video Lesson Details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Lesson */}
                        <button
                          type="button"
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 border border-slate-200 dark:border-slate-700 rounded-[3px] hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                          title="Delete Lesson"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="p-5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-[4px] text-xs text-amber-800 dark:text-amber-200">
              Save the initial course details above first to initialize this masterclass and start uploading single video lessons.
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: UPLOAD SINGLE VIDEO LESSON (DIRECT LESSON-WISE)                    */}
      {/* ========================================================================= */}
      {isLessonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 max-w-lg w-full p-5 border border-slate-300 dark:border-slate-700 shadow-xl space-y-4 rounded-[4px] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
                  <span>{editingLesson ? "Edit Video Lesson" : "Upload Single Video Lesson"}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Course: <strong className="text-slate-700 dark:text-slate-300 font-semibold">{selectedCourse?.title}</strong>
                </p>
              </div>
              <button
                onClick={() => setIsLessonModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveLesson} className="space-y-4 text-xs">
              {/* Lesson Name */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                  Video Lesson Title
                </label>
                <input
                  type="text"
                  required
                  value={lessonForm.name}
                  onChange={(e) => setLessonForm({ ...lessonForm, name: e.target.value })}
                  placeholder="e.g. Lesson 4: Overcoming Price Objections with Value Anchoring"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] font-semibold text-slate-800 dark:text-white"
                />
              </div>

              {/* VIDEO UPLOAD & SOURCE SELECTOR */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[4px] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400" />
                    Video Media Source
                  </span>
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-0.5 border border-slate-200 dark:border-slate-700 rounded-[3px]">
                    <button
                      type="button"
                      onClick={() => setVideoSourceType("upload")}
                      className={`px-2.5 py-1 text-xs font-bold uppercase rounded-[2px] cursor-pointer ${
                        videoSourceType === "upload"
                          ? "bg-[#116E63] text-white"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoSourceType("url")}
                      className={`px-2.5 py-1 text-xs font-bold uppercase rounded-[2px] cursor-pointer ${
                        videoSourceType === "url"
                          ? "bg-[#116E63] text-white"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                      }`}
                    >
                      Stream URL
                    </button>
                  </div>
                </div>

                {videoSourceType === "upload" ? (
                  <div className="space-y-2">
                    <label className="w-full py-4 px-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-[4px] flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors text-center">
                      <Upload className="w-6 h-6 text-[#116E63] dark:text-emerald-400 animate-bounce" />
                      <span className="text-xs font-bold text-slate-800 dark:text-white">
                        Click to Browse Video File from Device
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Supports MP4, MOV, WEBM, MKV (1080p / 4K)
                      </span>
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/mkv,video/quicktime"
                        onChange={handleVideoFileUpload}
                        className="hidden"
                      />
                    </label>

                    {uploadedVideoFileName && (
                      <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-[3px] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <div className="truncate">
                            <span className="font-semibold text-slate-900 dark:text-white block truncate">
                              {uploadedVideoFileName}
                            </span>
                            <span className="text-xs text-slate-500 font-mono">
                              File Size: {uploadedVideoFileSize} &bull; Ready for student streaming
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block">
                      Video Stream URL (YouTube, Vimeo, Cloudflare, S3, MP4)
                    </label>
                    <input
                      type="text"
                      required
                      value={lessonForm.videoUrl}
                      onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=... or direct .mp4 link"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[4px] font-mono text-slate-800 dark:text-white text-xs"
                    />
                    <span className="text-xs text-slate-400 dark:text-slate-500 block">
                      Paste YouTube video URL, Vimeo link, or Cloudflare direct stream URL.
                    </span>
                  </div>
                )}
              </div>

              {/* Duration & Resource */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                    Lesson Duration
                  </label>
                  <input
                    type="text"
                    required
                    value={lessonForm.duration}
                    onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                    placeholder="e.g. 35 mins or 24:15"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                    Downloadable Handout (Optional)
                  </label>
                  <input
                    type="text"
                    value={lessonForm.resourceName}
                    onChange={(e) => setLessonForm({ ...lessonForm, resourceName: e.target.value })}
                    placeholder="e.g. Closing-Script.pdf"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Synopsis */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
                  Video Synopsis &amp; Key Takeaways
                </label>
                <textarea
                  rows={2}
                  value={lessonForm.description}
                  onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
                  placeholder="Summary of what the student learns in this video lesson..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] text-slate-800 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                {lessonForm.videoUrl && (
                  <button
                    type="button"
                    onClick={() => setPreviewVideoUrl(lessonForm.videoUrl)}
                    className="text-xs font-bold text-[#116E63] dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Test Video Playback</span>
                  </button>
                )}
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsLessonModalOpen(false)}
                    className="px-3.5 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold uppercase rounded-[4px] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#116E63] hover:bg-[#0c5c53] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-[4px] cursor-pointer shadow-xs"
                  >
                    {editingLesson ? "Save Lesson" : "Upload & Save Video"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: VIDEO LIVE PREVIEW PLAYER                                          */}
      {/* ========================================================================= */}
      {previewVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in">
          <div className="bg-slate-900 max-w-2xl w-full p-4 border border-slate-700 shadow-2xl space-y-3 rounded-[4px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-emerald-400 fill-current" /> Video Player Preview Test
              </span>
              <button
                onClick={() => setPreviewVideoUrl(null)}
                className="text-slate-400 hover:text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black rounded-[4px] overflow-hidden">
              {previewVideoUrl.startsWith("blob:") || previewVideoUrl.endsWith(".mp4") ? (
                <video
                  src={previewVideoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={previewVideoUrl}
                  className="w-full h-full"
                  title="Lesson Video Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-400 font-mono truncate max-w-md">
                Source: {previewVideoUrl}
              </span>
              <button
                onClick={() => setPreviewVideoUrl(null)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase rounded-[4px] cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
