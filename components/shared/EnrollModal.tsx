"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, BookOpen, User, Mail, Phone, Send, ChevronDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseId?: number;
}

const COURSES = [
  { id: 1, name: "AI Mastery", price: "₹4,999", duration: "06 Months" },
  { id: 2, name: "Poster & Logo Design Mastery", price: "₹3,499", duration: "04 Months" },
  { id: 3, name: "Attraction Mastery", price: "₹3,999", duration: "03 Months" },
  { id: 4, name: "Content Creation Mastery", price: "₹4,499", duration: "04 Months" },
  { id: 5, name: "Video Editing Mastery", price: "₹4,999", duration: "05 Months" },
];

export default function EnrollModal({ isOpen, onClose, defaultCourseId = 2 }: EnrollModalProps) {
  const [selectedCourseId, setSelectedCourseId] = useState(defaultCourseId);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [learningMode, setLearningMode] = useState("Online Live Interactive");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (defaultCourseId) {
      setSelectedCourseId(defaultCourseId);
    }
  }, [defaultCourseId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedCourse = COURSES.find((c) => c.id === Number(selectedCourseId)) || COURSES[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName("");
    setEmail("");
    setMobile("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-[440px] bg-white rounded-xl overflow-hidden animate-in zoom-in-95 duration-250 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dark Teal Header Banner */}
        <div className="bg-[#0c5c53] text-white p-4 sm:p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full  bg-white  hover:bg-secondary hover:text-white text-primary flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>




          <h3 className="text-xl sm:text-2xl  font-[family-name:var(--font-yantramanav)] text-white tracking-tight leading-tight">
            Enroll In Course
          </h3>
          <p className="text-slate-100 text-xs mt-1 font-medium leading-normal">
            Fill out the form below to secure your seat for{" "}
            <span className="text-[#FDA31B] font-bold">{selectedCourse.name}</span>.
          </p>
        </div>

        {/* Modal Form Body */}
        <div className="p-4 sm:p-5 max-h-[80vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl  text-slate-900 font-[family-name:var(--font-yantramanav)]">
                  Enrollment Successful!
                </h4>
                <p className="text-slate-600 text-xs max-w-xs mx-auto leading-relaxed">
                  Thank you <span className="font-bold text-slate-900">{name || "Student"}</span>! Your application for <span className="font-bold text-[#116E63]">{selectedCourse.name}</span> has been confirmed.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-left space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500 font-medium">Selected Course:</span>
                  <span className="font-bold text-[#116E63]">{selectedCourse.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500 font-medium">Fee:</span>
                  <span className="font-black text-[#FDA31B]">{selectedCourse.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Mobile:</span>
                  <span className="font-bold text-slate-800">{mobile || "+91 91442 88641"}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href={`https://wa.me/919144288641?text=Hi%20Skill%20Aura%20Academy%2C%20I%20have%20submitted%20my%20enrollment%20for%20${encodeURIComponent(selectedCourse.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs tracking-wider uppercase px-4 py-3 rounded-sm shadow-md transition-all"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>Confirm via WhatsApp</span>
                </a>

                <button
                  onClick={handleReset}
                  className="text-xs font-medium-500 hover:text-slate-800 underline block mx-auto cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* SELECTED COURSE DISPLAY & SELECTOR */}
              <div>
                <label className="block text-xs font-medium tracking-wider text-slate-700 mb-1">
                  SELECTED COURSE
                </label>
                <div className="relative">
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(Number(e.target.value))}
                    className="w-full bg-[#f4f7f6] border border-slate-200/90 rounded-sm pl-9 pr-9 py-3 text-[#0c5c53] font-bold text-xs sm:text-sm focus:outline-none focus:border-[#0c5c53] transition-all appearance-none cursor-pointer"
                  >
                    {COURSES.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name} ({course.price})
                      </option>
                    ))}
                  </select>
                  <BookOpen className="w-4 h-4 text-[#0c5c53] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                  <ChevronDown className="w-4 h-4 text-[#0c5c53] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
                </div>
              </div>

              {/* FULL NAME * */}
              <div>
                <label className="block text-xs font-medium tracking-wider text-slate-700 mb-1">
                  FULL NAME *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-white border border-slate-200 rounded-sm pl-9 pr-3 py-3 text-slate-900 font-medium text-xs sm:text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#0c5c53] transition-all"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2]" />
                </div>
              </div>

              {/* EMAIL ADDRESS * */}
              <div>
                <label className="block text-xs font-medium tracking-wider text-slate-700 mb-1">
                  EMAIL ADDRESS *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@example.com"
                    className="w-full bg-white border border-slate-200 rounded-sm pl-9 pr-3 py-3 text-slate-900 font-medium text-xs sm:text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#0c5c53] transition-all"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2]" />
                </div>
              </div>

              {/* PHONE / WHATSAPP NUMBER * */}
              <div>
                <label className="block text-xs font-medium tracking-wider text-slate-700 mb-1">
                  PHONE / WHATSAPP NUMBER *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 91442 88641"
                    className="w-full bg-white border border-slate-200 rounded-sm pl-9 pr-3 py-3 text-slate-900 font-medium text-xs sm:text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#0c5c53] transition-all"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2]" />
                </div>
              </div>

              {/* LEARNING MODE PREFERENCE */}
              <div>
                <label className="block text-xs font-medium tracking-wider text-slate-700 mb-1">
                  LEARNING MODE PREFERENCE
                </label>
                <div className="relative">
                  <select
                    value={learningMode}
                    onChange={(e) => setLearningMode(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-sm pl-3 pr-9 py-3 text-slate-900 font-medium text-xs sm:text-sm focus:outline-none focus:border-[#0c5c53] transition-all appearance-none cursor-pointer"
                  >
                    <option value="Online Live Interactive">Online Live Interactive</option>
                    <option value="Self-Paced Recorded + Mentorship">Self-Paced Recorded + Mentorship</option>
                    <option value="Weekend Fast-Track Bootcamp">Weekend Fast-Track Bootcamp</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2]" />
                </div>
              </div>

              {/* SUBMIT ENROLLMENT BUTTON */}
              <div className="pt-1.5">
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#FDA31B] hover:bg-primary text-white  text-xs sm:text-sm tracking-wider uppercase py-3  shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >

                  <span>SUBMIT ENROLLMENT</span>
                  <Send className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
