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
  Layers,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  X,
  FileText,
  Clock,
  Sparkles,
  Eye,
  Save,
  Upload,
  Image as ImageIcon,
  Film,
  Link as LinkIcon,
  Check,
  FolderPlus,
  HelpCircle,
  AlertCircle,
} from "lucide-react";

const PRESET_THUMBNAILS = [
  { name: "Business Mastery", url: "/images/course1.jpg" },
  { name: "High-Ticket Sales", url: "/images/course2.jpg" },
  { name: "Graphic & Brand Design", url: "/images/course3.jpg" },
  { name: "Video Editing Reels", url: "/images/course4.jpg" },
  { name: "Digital Growth Ads", url: "/images/course5.jpg" },
];

const STORAGE_KEY = "skillAuraCoursesRegistry";

export default function SuperAdminCoursesManager() {
  const [courses, setCourses] = useState<EnrolledCourse[]>(ENROLLED_COURSES_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Selection for Module/Lesson view
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);

  // Modal states
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<EnrolledCourse | null>(null);

  // Module Modal (Curriculum Module e.g. "Facebook Ads", "Google Ads")
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<CourseModule | null>(null);
  const [moduleForm, setModuleForm] = useState({
    title: "",
    duration: "10 Hours",
  });

  // Video Lesson Modal (Upload video to specific module)
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [targetModuleId, setTargetModuleId] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  // Delete Confirmation Modal (Module or Lesson)
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: "module" | "lesson";
    moduleId: string;
    lessonId?: string;
    title: string;
  } | null>(null);

  // Live video preview
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form states for Course
  const [courseForm, setCourseForm] = useState({
    title: "",
    category: "Business & Sales",
    instructor: "SkillAura Master Team",
    duration: "60 Hours",
    price: 4999,
    image: "/images/course2.jpg",
  });

  // Form states for Lesson
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

  const saveAndSyncCourses = (newCourses: EnrolledCourse[]) => {
    setCourses(newCourses);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newCourses));
        window.dispatchEvent(new Event("skillaura_courses_updated"));
      } catch (e) {
        console.error("Failed to save courses to localStorage", e);
      }
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Filtered courses
  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === "all" || c.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const categories = Array.from(new Set(courses.map((c) => c.category)));

  // Handlers for Course
  const handleOpenAddCourse = () => {
    setEditingCourse(null);
    setCourseForm({
      title: "",
      category: "Business & Sales",
      instructor: "SkillAura Master Team",
      duration: "40 Hours",
      price: 4999,
      image: "/images/course1.jpg",
    });
    setIsCourseModalOpen(true);
  };

  const handleOpenEditCourse = (course: EnrolledCourse) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      category: course.category,
      instructor: course.instructor,
      duration: course.duration,
      price: course.price || 4999,
      image: course.image,
    });
    setIsCourseModalOpen(true);
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCourseForm((prev) => ({ ...prev, image: url }));
      showNotification(`Main course thumbnail loaded: ${file.name}`);
    }
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title.trim()) return;

    if (editingCourse) {
      const updated = courses.map((c) =>
        c.id === editingCourse.id
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
      if (selectedCourse?.id === editingCourse.id) {
        setSelectedCourse(updated.find((c) => c.id === editingCourse.id) || null);
      }
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
            id: `mod-1`,
            title: "Module 1: Foundations & Orientation",
            duration: "8 Hours",
            lessons: [],
          },
        ],
      };
      const updated = [newCourse, ...courses];
      saveAndSyncCourses(updated);
      setSelectedCourse(newCourse);
      showNotification("New course created with Module 1 ready!");
    }
    setIsCourseModalOpen(false);
  };

  // Handlers for Modules
  const handleOpenAddModule = () => {
    if (!selectedCourse) return;
    const nextModNum = selectedCourse.modules.length + 1;
    setEditingModule(null);
    setModuleForm({
      title: `Module ${nextModNum}: `,
      duration: "10 Hours",
    });
    setIsModuleModalOpen(true);
  };

  const handleOpenEditModule = (mod: CourseModule) => {
    setEditingModule(mod);
    setModuleForm({
      title: mod.title,
      duration: mod.duration,
    });
    setIsModuleModalOpen(true);
  };

  const handleSaveModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;

    let updatedModules: CourseModule[];
    if (editingModule) {
      updatedModules = selectedCourse.modules.map((m) =>
        m.id === editingModule.id
          ? {
              ...m,
              title: moduleForm.title,
              duration: moduleForm.duration,
            }
          : m
      );
      showNotification("Module updated!");
    } else {
      const newModule: CourseModule = {
        id: `mod-${Date.now()}`,
        title: moduleForm.title,
        duration: moduleForm.duration,
        lessons: [],
      };
      updatedModules = [...selectedCourse.modules, newModule];
      showNotification("New module added!");
    }

    const updatedCourse: EnrolledCourse = {
      ...selectedCourse,
      modules: updatedModules,
    };
    setSelectedCourse(updatedCourse);
    saveAndSyncCourses(courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
    setIsModuleModalOpen(false);
  };

  const handleDeleteModuleClick = (moduleId: string, moduleTitle: string) => {
    if (!selectedCourse) return;
    if (selectedCourse.modules.length <= 1) {
      alert("A course must have at least one module.");
      return;
    }
    setDeleteConfirm({
      type: "module",
      moduleId,
      title: moduleTitle,
    });
  };

  const handleDeleteLessonClick = (moduleId: string, lessonId: string, lessonName: string) => {
    setDeleteConfirm({
      type: "lesson",
      moduleId,
      lessonId,
      title: lessonName,
    });
  };

  const handleConfirmDelete = () => {
    if (!selectedCourse || !deleteConfirm) return;

    if (deleteConfirm.type === "module") {
      const updatedModules = selectedCourse.modules.filter((m) => m.id !== deleteConfirm.moduleId);
      const totalLes = updatedModules.reduce((acc, m) => acc + m.lessons.length, 0);

      const updatedCourse: EnrolledCourse = {
        ...selectedCourse,
        modules: updatedModules,
        totalLessons: totalLes,
      };
      setSelectedCourse(updatedCourse);
      saveAndSyncCourses(courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
      showNotification(`Module "${deleteConfirm.title}" deleted.`);
    } else if (deleteConfirm.type === "lesson" && deleteConfirm.lessonId) {
      const updatedModules = selectedCourse.modules.map((mod) => {
        if (mod.id !== deleteConfirm.moduleId) return mod;
        return {
          ...mod,
          lessons: mod.lessons.filter((l) => l.id !== deleteConfirm.lessonId),
        };
      });

      const totalLes = updatedModules.reduce((acc, m) => acc + m.lessons.length, 0);

      const updatedCourse: EnrolledCourse = {
        ...selectedCourse,
        modules: updatedModules,
        totalLessons: totalLes,
      };

      setSelectedCourse(updatedCourse);
      saveAndSyncCourses(courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
      showNotification(`Video lesson "${deleteConfirm.title}" deleted.`);
    }

    setDeleteConfirm(null);
  };

  // Handlers for Video Lessons
  const handleOpenAddLesson = (moduleId: string) => {
    setTargetModuleId(moduleId);
    setEditingLesson(null);
    setVideoSourceType("upload");
    setUploadedVideoFileName(null);
    setUploadedVideoFileSize(null);
    setLessonForm({
      name: "",
      duration: "35 mins",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "",
      resourceName: "",
    });
    setIsLessonModalOpen(true);
  };

  const handleOpenEditLesson = (moduleId: string, lesson: Lesson) => {
    setTargetModuleId(moduleId);
    setEditingLesson(lesson);
    setVideoSourceType((lesson as any).videoUrl?.startsWith("blob:") ? "upload" : "url");
    setUploadedVideoFileName(null);
    setUploadedVideoFileSize(null);
    setLessonForm({
      name: lesson.name,
      duration: lesson.duration,
      videoUrl: (lesson as any).videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: lesson.description || "",
      resourceName: lesson.resources?.[0]?.name || "",
    });
    setIsLessonModalOpen(true);
  };

  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setUploadedVideoFileName(file.name);
      setUploadedVideoFileSize(`${sizeMb} MB`);
      setLessonForm((prev) => ({
        ...prev,
        videoUrl: url,
        name: prev.name || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      }));
      showNotification(`Video selected: ${file.name} (${sizeMb} MB)`);
    }
  };

  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || !targetModuleId) return;

    // Standardize YouTube embed links if user pasted watch URL
    let finalVideoUrl = lessonForm.videoUrl.trim();
    if (finalVideoUrl.includes("youtube.com/watch?v=")) {
      const videoId = finalVideoUrl.split("v=")[1]?.split("&")[0];
      if (videoId) finalVideoUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (finalVideoUrl.includes("youtu.be/")) {
      const videoId = finalVideoUrl.split("youtu.be/")[1]?.split("?")[0];
      if (videoId) finalVideoUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    const updatedModules = selectedCourse.modules.map((mod) => {
      if (mod.id !== targetModuleId) return mod;

      if (editingLesson) {
        return {
          ...mod,
          lessons: mod.lessons.map((les) =>
            les.id === editingLesson.id
              ? {
                  ...les,
                  name: lessonForm.name,
                  duration: lessonForm.duration,
                  description: lessonForm.description,
                  videoUrl: finalVideoUrl,
                  resources: lessonForm.resourceName
                    ? [{ name: lessonForm.resourceName, size: "2.4 MB" }]
                    : [],
                }
              : les
          ),
        };
      } else {
        const newLesson: Lesson = {
          id: `les-${Date.now()}`,
          name: lessonForm.name,
          duration: lessonForm.duration,
          completed: false,
          description: lessonForm.description,
          videoUrl: finalVideoUrl,
          resources: lessonForm.resourceName
            ? [{ name: lessonForm.resourceName, size: "2.4 MB" }]
            : [],
        };
        return {
          ...mod,
          lessons: [...mod.lessons, newLesson],
        };
      }
    });

    const totalLes = updatedModules.reduce((acc, m) => acc + m.lessons.length, 0);

    const updatedCourse: EnrolledCourse = {
      ...selectedCourse,
      modules: updatedModules,
      totalLessons: totalLes,
    };

    setSelectedCourse(updatedCourse);
    saveAndSyncCourses(courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
    setIsLessonModalOpen(false);
    showNotification("Video lesson saved successfully!");
  };

  const getTargetModuleName = () => {
    if (!selectedCourse || !targetModuleId) return "Module";
    const found = selectedCourse.modules.find((m) => m.id === targetModuleId);
    return found ? found.title : "Module";
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-[4px] flex items-center justify-between shadow-xs animate-in fade-in">
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

      {/* Top Controls Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
              Courses &amp; Module Studio
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleOpenAddCourse}
            className="bg-[#116E63] hover:bg-[#0c5c53] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Course</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Studio: Left Course Catalog (5 Cols), Right Module & Video Inspector (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT COLUMN: COURSE CATALOG */}
        <div className="lg:col-span-5 space-y-3">
          {/* Search & Filter Header */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-[4px] shadow-xs space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search masterclasses..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-[4px] focus:outline-none focus:border-[#116E63]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
              <button
                onClick={() => setFilterCategory("all")}
                className={`px-2.5 py-1 text-xs font-bold uppercase rounded-[3px] border cursor-pointer shrink-0 transition-colors ${
                  filterCategory === "all"
                    ? "bg-[#116E63] text-white border-[#116E63]"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
                }`}
              >
                All ({courses.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-2.5 py-1 text-xs font-bold uppercase rounded-[3px] border cursor-pointer shrink-0 transition-colors ${
                    filterCategory === cat
                      ? "bg-[#116E63] text-white border-[#116E63]"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Courses List */}
          <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
            {filteredCourses.map((course) => {
              const isSelected = selectedCourse?.id === course.id;
              const totalLessonsCount = course.modules.reduce((a, m) => a + m.lessons.length, 0);

              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`p-3 bg-white dark:bg-slate-900 border rounded-[4px] shadow-xs cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#116E63] dark:border-emerald-500 ring-1 ring-[#116E63]/30 bg-teal-50/20 dark:bg-teal-950/20"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Course Thumbnail Preview */}
                    <div className="relative w-20 h-14 rounded-[4px] overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                      <Image
                        src={course.image || "/images/course2.jpg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#116E63] dark:text-emerald-400">
                          {course.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEditCourse(course);
                            }}
                            className="p-1 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-[2px]"
                            title="Edit Course & Change Thumbnail"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                        {course.title}
                      </h4>

                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium mt-1.5 flex-wrap">
                        <span className="font-semibold text-[#116E63] dark:text-emerald-400">
                          {course.modules.length} Modules
                        </span>
                        <span>&bull;</span>
                        <span>{totalLessonsCount} Videos</span>
                        <span>&bull;</span>
                        <span className="font-mono">{course.duration}</span>
                        {course.price && (
                          <>
                            <span>&bull;</span>
                            <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                              ₹{course.price.toLocaleString()}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: MODULE-WISE & VIDEO CURRICULUM INSPECTOR */}
        <div className="lg:col-span-7 space-y-3">
          {selectedCourse ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-4">
              {/* Selected Course Header Strip with Thumbnail Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <div className="relative w-20 h-14 rounded-[4px] overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={selectedCourse.image || "/images/course2.jpg"}
                      alt={selectedCourse.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#116E63] dark:text-emerald-400">
                      {selectedCourse.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white uppercase font-[family-name:var(--font-yantramanav)] mt-0.5 leading-snug">
                      {selectedCourse.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {selectedCourse.instructor} &bull; <span className="font-mono">{selectedCourse.duration}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenEditCourse(selectedCourse)}
                    className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 cursor-pointer"
                    title="Change Thumbnail & Metadata"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Thumbnail</span>
                  </button>
                  <button
                    onClick={handleOpenAddModule}
                    className="px-3 py-1.5 bg-[#116E63] hover:bg-[#0c5c53] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Module</span>
                  </button>
                </div>
              </div>

              {/* Modules List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-xs sm:text-sm">
                    Course Modules ({selectedCourse.modules.length} Modules &bull; {selectedCourse.totalLessons} Lessons)
                  </span>
                </div>

                {selectedCourse.modules.map((mod, mIdx) => (
                  <div
                    key={mod.id}
                    className="border border-slate-200 dark:border-slate-800 rounded-[4px] overflow-hidden bg-slate-50/50 dark:bg-slate-900/60"
                  >
                    {/* Module Header Strip */}
                    <div className="p-3 bg-slate-100/70 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-[3px] bg-[#116E63] text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                          {mIdx + 1}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                            {mod.title}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 font-mono">
                            {mod.lessons.length} Video Lessons &bull; {mod.duration}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 self-end sm:self-auto">
                        <button
                          onClick={() => handleOpenAddLesson(mod.id)}
                          className="px-3 py-1.5 bg-[#116E63] hover:bg-[#0c5c53] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold uppercase rounded-[3px] flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                          title="Upload video lesson to this module"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Video</span>
                        </button>
                        <button
                          onClick={() => handleOpenEditModule(mod)}
                          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-[2px]"
                          title="Edit Module Name & Duration"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteModuleClick(mod.id, mod.title)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-[2px]"
                          title="Delete Module"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Lessons / Videos inside this Module */}
                    <div className="p-2 sm:p-3 divide-y divide-slate-100 dark:divide-slate-800/70">
                      {mod.lessons.length === 0 ? (
                        <div className="py-5 text-center space-y-1">
                          <Film className="w-5 h-5 text-slate-400 mx-auto" />
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            No videos in this module yet.
                          </p>
                          <button
                            onClick={() => handleOpenAddLesson(mod.id)}
                            className="text-xs font-bold text-[#116E63] dark:text-emerald-400 hover:underline uppercase inline-flex items-center gap-1"
                          >
                            <Upload className="w-3 h-3" />
                            <span>Upload First Video</span>
                          </button>
                        </div>
                      ) : (
                        mod.lessons.map((lesson, lIdx) => (
                          <div
                            key={lesson.id}
                            className="py-2.5 flex items-center justify-between gap-3 hover:bg-white dark:hover:bg-slate-800/50 px-2 rounded-[3px] transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="font-mono font-bold text-slate-400 text-xs sm:text-sm w-6 text-right shrink-0">
                                {mIdx + 1}.{lIdx + 1}
                              </span>

                              <div className="min-w-0">
                                <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm leading-snug">
                                  {lesson.name}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5 font-mono flex-wrap">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {lesson.duration}
                                  </span>
                                  {(lesson as any).videoUrl && (
                                    <>
                                      <span>&bull;</span>
                                      <span className="text-emerald-700 dark:text-emerald-400 font-sans font-semibold flex items-center gap-1 text-[11px]">
                                        <Check className="w-3 h-3" /> Video Attached
                                      </span>
                                    </>
                                  )}
                                  {lesson.resources?.[0]?.name && (
                                    <>
                                      <span>&bull;</span>
                                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 text-[11px]">
                                        <FileText className="w-3 h-3" /> {lesson.resources[0].name}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {(lesson as any).videoUrl && (
                                <button
                                  onClick={() => setPreviewVideoUrl((lesson as any).videoUrl)}
                                  className="px-2.5 py-1 text-xs font-bold text-white bg-[#116E63] hover:bg-[#0c5c53] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-[3px] flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                                  title="Test & Preview Video Playback"
                                >
                                  <Play className="w-3 h-3 fill-current" />
                                  <span>Preview</span>
                                </button>
                              )}
                              <button
                                onClick={() => handleOpenEditLesson(mod.id, lesson)}
                                className="p-1 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-[2px]"
                                title="Edit Video Lesson"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteLessonClick(mod.id, lesson.id, lesson.name)}
                                className="p-1 text-slate-400 hover:text-rose-600 rounded-[2px]"
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
                ))}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-[4px] text-slate-500">
              Select a course from the left catalog to edit its modules and upload videos.
            </div>
          )}
        </div>
      </div>

      {/* ================= MODAL 1: ADD / EDIT COURSE & THUMBNAIL UPLOAD ================= */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 max-w-xl w-full p-5 border border-slate-300 dark:border-slate-700 shadow-xl space-y-4 rounded-[4px] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
                <span>{editingCourse ? "Edit Masterclass Details & Thumbnail" : "Create New Masterclass Course"}</span>
              </h3>
              <button
                onClick={() => setIsCourseModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              {/* Course Title */}
              <div>
                <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                  Masterclass Course Title
                </label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  placeholder="e.g. High-Ticket Closing & Business Sales Mastery"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] font-semibold text-slate-800 dark:text-white"
                />
              </div>

              {/* MAIN COURSE THUMBNAIL UPLOAD SECTION (Dedicated) */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[4px] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400" />
                    Main Course Thumbnail / Poster
                  </label>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    16:9 Recommended (1280x720)
                  </span>
                </div>

                {/* Live Thumbnail Preview */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative w-full sm:w-44 h-28 rounded-[4px] overflow-hidden border-2 border-slate-300 dark:border-slate-600 bg-slate-900 shrink-0 shadow-xs">
                    <Image
                      src={courseForm.image || "/images/course2.jpg"}
                      alt="Thumbnail Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span className="absolute bottom-1.5 left-2 text-[10px] text-white font-bold uppercase drop-shadow-md">
                      Live Preview
                    </span>
                  </div>

                  <div className="space-y-2 flex-1 w-full">
                    {/* File Upload Button */}
                    <label className="w-full py-2 px-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-[4px] flex items-center justify-center gap-2 cursor-pointer transition-colors text-xs font-bold text-slate-700 dark:text-slate-200">
                      <Upload className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400" />
                      <span>Upload Image from Device (PNG / JPG / WEBP)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Or URL input */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block">
                        Or paste external image URL / path:
                      </span>
                      <input
                        type="text"
                        value={courseForm.image}
                        onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                        placeholder="/images/course1.jpg or https://..."
                        className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[4px] font-mono text-[11px] text-slate-800 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Preset Thumbnails Picker */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 block">
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

              {/* Category & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                    Category
                  </label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] font-semibold text-slate-800 dark:text-white text-xs"
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
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                    Course Fee (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={courseForm.price}
                    onChange={(e) => setCourseForm({ ...courseForm, price: Number(e.target.value) })}
                    placeholder="4999"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono font-bold text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                    Total Duration
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    placeholder="e.g. 60 Hours"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Instructor */}
              <div>
                <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                  Lead Instructor / Mentor
                </label>
                <input
                  type="text"
                  required
                  value={courseForm.instructor}
                  onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })}
                  placeholder="e.g. SkillAura Master Team"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] text-slate-800 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold uppercase rounded-[4px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#116E63] hover:bg-[#0c5c53] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-[4px] cursor-pointer shadow-xs"
                >
                  {editingCourse ? "Save Course Changes" : "Create Masterclass"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: ADD / EDIT MODULE ================= */}
      {isModuleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full p-5 border border-slate-300 dark:border-slate-700 shadow-xl space-y-4 rounded-[4px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <FolderPlus className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
                <span>{editingModule ? "Edit Module Details" : "Add New Curriculum Module"}</span>
              </h3>
              <button
                onClick={() => setIsModuleModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModule} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                  Module Title (e.g. Facebook Ads, Google Ads)
                </label>
                <input
                  type="text"
                  required
                  value={moduleForm.title}
                  onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                  placeholder="e.g. Facebook Ads Mastery & Pixel Setup"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] font-semibold text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                  Estimated Module Duration
                </label>
                <input
                  type="text"
                  required
                  value={moduleForm.duration}
                  onChange={(e) => setModuleForm({ ...moduleForm, duration: e.target.value })}
                  placeholder="e.g. 10 Hours"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono text-slate-800 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModuleModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold uppercase rounded-[4px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#116E63] hover:bg-[#0c5c53] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-[4px] cursor-pointer"
                >
                  {editingModule ? "Save Module" : "Create Module"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: UPLOAD VIDEO LESSON (Module-Wise) ================= */}
      {isLessonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 max-w-lg w-full p-5 border border-slate-300 dark:border-slate-700 shadow-xl space-y-4 rounded-[4px] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
                  <span>{editingLesson ? "Edit Video Lesson" : "Upload Video to Module"}</span>
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Target: <strong className="text-slate-700 dark:text-slate-300">{getTargetModuleName()}</strong>
                </p>
              </div>
              <button
                onClick={() => setIsLessonModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveLesson} className="space-y-3.5 text-xs">
              {/* Lesson Name */}
              <div>
                <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                  Video Lesson Title
                </label>
                <input
                  type="text"
                  required
                  value={lessonForm.name}
                  onChange={(e) => setLessonForm({ ...lessonForm, name: e.target.value })}
                  placeholder="e.g. Campaign Objectives & Audience Targeting"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] font-semibold text-slate-800 dark:text-white"
                />
              </div>

              {/* VIDEO UPLOAD & SOURCE SELECTOR TABS */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[4px] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400" />
                    Video Media Source
                  </span>
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-0.5 border border-slate-200 dark:border-slate-700 rounded-[3px]">
                    <button
                      type="button"
                      onClick={() => setVideoSourceType("upload")}
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-[2px] cursor-pointer ${
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
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-[2px] cursor-pointer ${
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
                      <Upload className="w-6 h-6 text-[#116E63] dark:text-emerald-400" />
                      <span className="text-xs font-bold text-slate-800 dark:text-white">
                        Click to Browse Video File
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        Supports MP4, MOV, WEBM (1080p / 4K)
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
                            <span className="text-[10px] text-slate-500 font-mono">
                              File Size: {uploadedVideoFileSize}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block">
                      Video Stream URL (YouTube, Vimeo, Cloudflare)
                    </label>
                    <input
                      type="text"
                      required
                      value={lessonForm.videoUrl}
                      onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=... or direct video link"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[4px] font-mono text-slate-800 dark:text-white text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Duration & Resource */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                    Lesson Duration
                  </label>
                  <input
                    type="text"
                    required
                    value={lessonForm.duration}
                    onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                    placeholder="e.g. 35 mins"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                    Handout Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={lessonForm.resourceName}
                    onChange={(e) => setLessonForm({ ...lessonForm, resourceName: e.target.value })}
                    placeholder="e.g. Ad-Copy-Template.pdf"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] focus:outline-none focus:border-[#116E63] text-slate-800 dark:text-white"
                  />
                </div>
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
                    className="px-4 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold uppercase rounded-[4px] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-1.5 bg-[#116E63] hover:bg-[#0c5c53] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-[4px] cursor-pointer shadow-xs"
                  >
                    {editingLesson ? "Save Lesson" : "Upload & Save Video"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: DELETE CONFIRMATION ================= */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-sm w-full p-5 rounded-[4px] shadow-2xl space-y-4">
            <div className="text-center space-y-2">
              <div className="w-11 h-11 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white font-[family-name:var(--font-yantramanav)]">
                Confirm Deletion
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Are you sure you want to delete {deleteConfirm.type === "module" ? "module and all its video lessons" : "video lesson"}{" "}
                <strong className="text-slate-900 dark:text-white font-semibold">
                  &ldquo;{deleteConfirm.title}&rdquo;
                </strong>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="px-3.5 py-1.5 text-xs font-bold uppercase text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-1.5 text-xs font-bold uppercase text-white bg-rose-600 hover:bg-rose-700 rounded-[4px] cursor-pointer shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 4: VIDEO LIVE PREVIEW PLAYER ================= */}
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
              <span className="text-[11px] text-slate-400 font-mono truncate max-w-md">
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
