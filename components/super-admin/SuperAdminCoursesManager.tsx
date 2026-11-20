"use client";

import React, { useState } from "react";
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
} from "lucide-react";

export default function SuperAdminCoursesManager() {
  const [courses, setCourses] = useState<EnrolledCourse[]>(ENROLLED_COURSES_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Selection for Module/Lesson view
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(courses[0]);

  // Modal states
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<EnrolledCourse | null>(null);

  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [targetModuleId, setTargetModuleId] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);

  // Form states for Course
  const [courseForm, setCourseForm] = useState({
    title: "",
    category: "Business & Sales",
    instructor: "SkillAura Master Team",
    duration: "60 Hours",
    image: "/images/course2.jpg",
  });

  // Form states for Lesson
  const [lessonForm, setLessonForm] = useState({
    name: "",
    duration: "45 mins",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "",
    resourceName: "",
  });

  // Filtered courses
  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === "all" || c.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  // Categories list
  const categories = Array.from(new Set(courses.map((c) => c.category)));

  // Handlers for Course
  const handleOpenAddCourse = () => {
    setEditingCourse(null);
    setCourseForm({
      title: "",
      category: "Business & Sales",
      instructor: "SkillAura Master Team",
      duration: "40 Hours",
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
      image: course.image,
    });
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editingCourse.id
            ? {
                ...c,
                title: courseForm.title,
                category: courseForm.category,
                instructor: courseForm.instructor,
                duration: courseForm.duration,
                image: courseForm.image,
              }
            : c
        )
      );
      if (selectedCourse?.id === editingCourse.id) {
        setSelectedCourse((prev) =>
          prev
            ? {
                ...prev,
                title: courseForm.title,
                category: courseForm.category,
                instructor: courseForm.instructor,
                duration: courseForm.duration,
                image: courseForm.image,
              }
            : null
        );
      }
    } else {
      const newCourse: EnrolledCourse = {
        id: Date.now(),
        title: courseForm.title,
        category: courseForm.category,
        instructor: courseForm.instructor,
        duration: courseForm.duration,
        image: courseForm.image,
        totalLessons: 0,
        completedLessons: 0,
        status: "in-progress",
        modules: [
          {
            id: `m-${Date.now()}`,
            title: "Module 1: Introduction & Fundamentals",
            duration: "10 Hours",
            lessons: [],
          },
        ],
      };
      setCourses((prev) => [newCourse, ...prev]);
      setSelectedCourse(newCourse);
    }
    setIsCourseModalOpen(false);
  };

  // Handlers for Module
  const handleAddModule = () => {
    if (!selectedCourse) return;
    const newModuleNumber = selectedCourse.modules.length + 1;
    const newModule: CourseModule = {
      id: `mod-${Date.now()}`,
      title: `Module ${newModuleNumber}: Advanced Strategies & Deep Dive`,
      duration: "12 Hours",
      lessons: [],
    };
    const updated = {
      ...selectedCourse,
      modules: [...selectedCourse.modules, newModule],
    };
    setSelectedCourse(updated);
    setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  // Handlers for Lesson
  const handleOpenAddLesson = (moduleId: string) => {
    setTargetModuleId(moduleId);
    setEditingLesson(null);
    setLessonForm({
      name: "",
      duration: "45 mins",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "",
      resourceName: "Handout-CheatSheet.pdf",
    });
    setIsLessonModalOpen(true);
  };

  const handleOpenEditLesson = (moduleId: string, lesson: Lesson) => {
    setTargetModuleId(moduleId);
    setEditingLesson(lesson);
    setLessonForm({
      name: lesson.name,
      duration: lesson.duration,
      videoUrl: (lesson as any).videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: lesson.description || "",
      resourceName: lesson.resources?.[0]?.name || "",
    });
    setIsLessonModalOpen(true);
  };

  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || !targetModuleId) return;

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
                  videoUrl: lessonForm.videoUrl,
                  resources: lessonForm.resourceName
                    ? [{ name: lessonForm.resourceName, size: "2.5 MB" }]
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
          resources: lessonForm.resourceName
            ? [{ name: lessonForm.resourceName, size: "2.5 MB" }]
            : [],
        };
        (newLesson as any).videoUrl = lessonForm.videoUrl;
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
    setCourses((prev) => prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
    setIsLessonModalOpen(false);
  };

  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    if (!selectedCourse) return;
    if (!confirm("Are you sure you want to delete this video lesson?")) return;

    const updatedModules = selectedCourse.modules.map((mod) => {
      if (mod.id !== moduleId) return mod;
      return {
        ...mod,
        lessons: mod.lessons.filter((l) => l.id !== lessonId),
      };
    });

    const totalLes = updatedModules.reduce((acc, m) => acc + m.lessons.length, 0);

    const updatedCourse: EnrolledCourse = {
      ...selectedCourse,
      modules: updatedModules,
      totalLessons: totalLes,
    };

    setSelectedCourse(updatedCourse);
    setCourses((prev) => prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Top Controls Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-[4px] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#116E63]" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
              Courses &amp; Video Lesson Studio
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Create and edit masterclass courses, manage curriculum modules, and attach video URLs
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleOpenAddCourse}
            className="bg-[#116E63] hover:bg-[#0c5c53] text-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
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
          <div className="bg-white border border-slate-200 p-3 rounded-[4px] shadow-xs space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses by title..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63]"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs scrollbar-none">
              <button
                onClick={() => setFilterCategory("all")}
                className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-[3px] border cursor-pointer shrink-0 ${
                  filterCategory === "all"
                    ? "bg-[#116E63] text-white border-[#116E63]"
                    : "bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                All ({courses.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-[3px] border cursor-pointer shrink-0 ${
                    filterCategory === cat
                      ? "bg-[#116E63] text-white border-[#116E63]"
                      : "bg-slate-50 text-slate-600 border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Courses List */}
          <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
            {filteredCourses.map((course) => {
              const isSelected = selectedCourse?.id === course.id;
              const totalLessonsCount = course.modules.reduce((a, m) => a + m.lessons.length, 0);

              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`p-3 bg-white border rounded-[4px] shadow-xs cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#116E63] ring-1 ring-[#116E63]/30 bg-teal-50/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative w-16 h-12 rounded-[4px] overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded-[2px] border border-slate-200">
                          {course.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEditCourse(course);
                            }}
                            className="p-1 text-slate-400 hover:text-slate-800 rounded-[2px]"
                            title="Edit Course Details"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">
                        {course.title}
                      </h4>

                      <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium mt-1">
                        <span>{course.modules.length} Modules</span>
                        <span>&bull;</span>
                        <span>{totalLessonsCount} Lessons</span>
                        <span>&bull;</span>
                        <span className="font-mono">{course.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: MODULE & VIDEO LESSON INSPECTOR */}
        <div className="lg:col-span-7 space-y-3">
          {selectedCourse ? (
            <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-4">
              {/* Selected Course Header Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      Curriculum Editor
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      ID: #{selectedCourse.id}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 uppercase font-[family-name:var(--font-yantramanav)] mt-0.5 leading-snug">
                    {selectedCourse.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Instructor: <strong className="text-slate-700">{selectedCourse.instructor}</strong> &bull; Total Duration: <strong className="text-slate-700 font-mono">{selectedCourse.duration}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddModule}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Module</span>
                  </button>
                  <button
                    onClick={() => handleOpenEditCourse(selectedCourse)}
                    className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Info</span>
                  </button>
                </div>
              </div>

              {/* Modules List */}
              <div className="space-y-4">
                {selectedCourse.modules.map((module, mIdx) => (
                  <div
                    key={module.id}
                    className="border border-slate-200 rounded-[4px] overflow-hidden bg-slate-50/30"
                  >
                    {/* Module Title & Actions */}
                    <div className="p-3 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#116E63]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-[family-name:var(--font-yantramanav)]">
                          {module.title}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono font-semibold hidden sm:inline">
                          ({module.lessons.length} Lessons &bull; {module.duration})
                        </span>
                      </div>

                      <button
                        onClick={() => handleOpenAddLesson(module.id)}
                        className="bg-[#116E63] hover:bg-[#0c5c53] text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Video Lesson</span>
                      </button>
                    </div>

                    {/* Lessons inside Module */}
                    <div className="divide-y divide-slate-100 bg-white">
                      {module.lessons.length === 0 ? (
                        <div className="p-4 text-center text-xs text-slate-400">
                          No lessons added to this module yet. Click &quot;Add Video Lesson&quot; above.
                        </div>
                      ) : (
                        module.lessons.map((lesson, lIdx) => (
                          <div
                            key={lesson.id}
                            className="p-3 flex items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-slate-200">
                                {lIdx + 1}
                              </span>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <h5 className="text-xs font-bold text-slate-900 truncate">
                                    {lesson.name}
                                  </h5>
                                  {(lesson as any).videoUrl && (
                                    <span className="text-[9px] font-bold bg-teal-50 text-teal-700 border border-teal-200 px-1.5 py-0.2 rounded-[3px] flex items-center gap-0.5">
                                      <Video className="w-2.5 h-2.5" /> Video Linked
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-2.5 h-2.5" /> {lesson.duration}
                                  </span>
                                  {lesson.resources && lesson.resources.length > 0 && (
                                    <>
                                      <span>&bull;</span>
                                      <span className="flex items-center gap-1">
                                        <FileText className="w-2.5 h-2.5" /> {lesson.resources[0].name}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() =>
                                  setPreviewVideoUrl(
                                    (lesson as any).videoUrl ||
                                      "https://www.youtube.com/embed/dQw4w9WgXcQ"
                                  )
                                }
                                className="p-1.5 text-slate-600 hover:text-[#116E63] hover:bg-teal-50 rounded-[3px] transition-colors"
                                title="Preview Video"
                              >
                                <Play className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleOpenEditLesson(module.id, lesson)}
                                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-[3px] transition-colors"
                                title="Edit Lesson & Video URL"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteLesson(module.id, lesson.id)}
                                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-[3px] transition-colors"
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
            <div className="bg-white border border-slate-200 p-8 text-center text-slate-400 rounded-[4px]">
              Select a course from the left catalog to inspect or edit lessons.
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: ADD / EDIT COURSE */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white max-w-lg w-full p-5 border border-slate-300 shadow-xl space-y-4 rounded-[4px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                {editingCourse ? "Edit Masterclass Course" : "Create New Masterclass Course"}
              </h3>
              <button
                onClick={() => setIsCourseModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  placeholder="e.g. AI Prompt Engineering & Automation Mastery"
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-semibold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Category
                  </label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-bold text-slate-700"
                  >
                    <option value="Business & Sales">Business &amp; Sales</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Total Duration
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    placeholder="e.g. 50 Hours"
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Instructor
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.instructor}
                    onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Cover Image URL / Asset
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.image}
                    onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] text-slate-800 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold uppercase rounded-[4px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#116E63] hover:bg-[#0c5c53] text-white text-xs font-bold uppercase tracking-wider rounded-[4px] cursor-pointer shadow-xs"
                >
                  {editingCourse ? "Save Course Changes" : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT VIDEO LESSON */}
      {isLessonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white max-w-lg w-full p-5 border border-slate-300 shadow-xl space-y-4 rounded-[4px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <Video className="w-4 h-4 text-[#116E63]" />
                <span>{editingLesson ? "Edit Video Lesson" : "Add New Video Lesson"}</span>
              </h3>
              <button
                onClick={() => setIsLessonModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveLesson} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Lesson Name / Title
                </label>
                <input
                  type="text"
                  required
                  value={lessonForm.name}
                  onChange={(e) => setLessonForm({ ...lessonForm, name: e.target.value })}
                  placeholder="e.g. High-Ticket Closing Scripts & Rebuttals"
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Video URL (YouTube, Vimeo, MP4, or Embed)
                </label>
                <input
                  type="url"
                  required
                  value={lessonForm.videoUrl}
                  onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono text-slate-800 text-xs"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Supports YouTube embed, Vimeo, Google Drive video, or direct MP4 CDN links.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Lesson Duration
                  </label>
                  <input
                    type="text"
                    required
                    value={lessonForm.duration}
                    onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                    placeholder="e.g. 45 mins"
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Downloadable Resource (Optional)
                  </label>
                  <input
                    type="text"
                    value={lessonForm.resourceName}
                    onChange={(e) => setLessonForm({ ...lessonForm, resourceName: e.target.value })}
                    placeholder="e.g. Sales-Blueprint.pdf"
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Lesson Synopsis / Key Takeaways
                </label>
                <textarea
                  rows={2}
                  value={lessonForm.description}
                  onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
                  placeholder="Brief summary of what students learn in this video lesson..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsLessonModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold uppercase rounded-[4px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#116E63] hover:bg-[#0c5c53] text-white text-xs font-bold uppercase tracking-wider rounded-[4px] cursor-pointer shadow-xs"
                >
                  {editingLesson ? "Save Lesson" : "Add Video Lesson"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: VIDEO LIVE PREVIEW */}
      {previewVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-slate-900 max-w-2xl w-full p-4 border border-slate-700 shadow-2xl space-y-3 rounded-[4px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-teal-400" /> Video Player Preview
              </span>
              <button
                onClick={() => setPreviewVideoUrl(null)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black rounded-[4px] overflow-hidden">
              <iframe
                src={previewVideoUrl}
                className="w-full h-full"
                title="Lesson Video Preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="text-right">
              <button
                onClick={() => setPreviewVideoUrl(null)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase rounded-[4px]"
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