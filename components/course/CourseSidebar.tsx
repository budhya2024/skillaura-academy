"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Play,
  Clock,
  BookOpen,
  Award,
  Globe,
  Users,
  ShieldCheck,
  CheckCircle2,
  X,
  User,
  Mail,
  Phone,
  BookMarked,
  Send,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";

export interface CourseSidebarProps {
  priceInr: string;
  originalPriceInr: string;
  discountPercentage: string;
  previewImage?: string;
  duration?: string;
  lessons?: string;
  seats?: string;
  language?: string;
  courseTitle?: string;
}

export default function CourseSidebar({
  priceInr = "₹4,999",
  originalPriceInr = "₹9,999",
  discountPercentage = "50% OFF",
  previewImage = "/images/course-ai.jpg",
  duration = "06 Months / 120 Hours",
  lessons = "85 Lessons",
  seats = "120 Enrolled",
  language = "English & Hindi",
  courseTitle = "AI Mastery",
}: CourseSidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    learningMode: "Online Live Interactive",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsSubmitted(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg p-6 sm:p-7 shadow-xl border border-slate-200 space-y-6 sticky top-28 font-sans">
        {/* Course Preview Video Thumbnail */}
        <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden group cursor-pointer shadow-md">
          <Image
            src={previewImage}
            alt="Course Preview"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#FDA31B] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 fill-white ml-0.5" />
            </div>
          </div>
          <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white font-bold text-xs px-3 py-1 rounded-full">
            Preview Video
          </span>
        </div>

        {/* Pricing Header (INR) */}
        <div className="space-y-3 border-b border-slate-100 pb-4">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#116E63] font-[family-name:var(--font-yantramanav)]">
              {priceInr}
            </span>
            <span className="text-lg font-bold text-slate-400 line-through">
              {originalPriceInr}
            </span>
            <span className="bg-emerald-100 text-emerald-800 font-extrabold text-xs px-2.5 py-1 rounded-full">
              {discountPercentage}
            </span>
          </div>

          {/* Limited Time Urgency Banner with Metallic Shine Effect */}
          <div className="animate-shine relative overflow-hidden  bg-primary px-4 py-2.5 text-white shadow-md flex items-center justify-center gap-2 font-[family-name:var(--font-yantramanav)] mt-2">
            <span className="text-xs sm:text-sm font-black tracking-wide">
              Limited time offer! Price increases soon.
            </span>
          </div>
        </div>

        {/* ENROLL NOW CTA Button */}
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#FDA31B] hover:bg-[#116E63] text-white font-extrabold text-sm uppercase tracking-wider py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span>ENROLL NOW</span>
          </button>
        </div>

        {/* Course Includes Feature Checklist */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <h4 className="text-sm font-bold text-[#19232B] uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
            This Course Includes:
          </h4>

          <ul className="space-y-3 text-xs sm:text-sm text-[#757F95] font-medium">
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FDA31B]" />
                <span>Duration</span>
              </div>
              <span className="font-bold text-[#19232B]">{duration}</span>
            </li>

            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#116E63]" />
                <span>Lessons</span>
              </div>
              <span className="font-bold text-[#19232B]">{lessons}</span>
            </li>

            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#FDA31B]" />
                <span>Enrolled Students</span>
              </div>
              <span className="font-bold text-[#19232B]">{seats}</span>
            </li>

            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#116E63]" />
                <span>Language</span>
              </div>
              <span className="font-bold text-[#19232B]">{language}</span>
            </li>

            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#FDA31B]" />
                <span>Certificate</span>
              </div>
              <span className="font-bold text-[#19232B]">Yes (Accredited)</span>
            </li>

            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#116E63]" />
                <span>Access</span>
              </div>
              <span className="font-bold text-[#19232B]">Full Lifetime</span>
            </li>
          </ul>
        </div>

        {/* Social Share Bar */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <span className="text-xs font-bold text-[#19232B] uppercase tracking-wider block text-center">
            Share This Course:
          </span>
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://www.facebook.com/share/1Jraz1G15N/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#FDA31B] text-slate-700 hover:text-white flex items-center justify-center transition-colors"
            >
              <FaFacebookF className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#FDA31B] text-slate-700 hover:text-white flex items-center justify-center transition-colors"
            >
              <FaInstagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#FDA31B] text-slate-700 hover:text-white flex items-center justify-center transition-colors"
            >
              <FaYoutube className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://wa.me/919144288641"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#FDA31B] text-slate-700 hover:text-white flex items-center justify-center transition-colors"
            >
              <FaWhatsapp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ================= ENROLLMENT FORM MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden relative animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#116E63] p-6 text-white relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="bg-[#FDA31B] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider mb-2 inline-block">
                Skill Aura Admission
              </span>
              <h3 className="text-2xl font-extrabold font-[family-name:var(--font-yantramanav)] leading-tight">
                Enroll In Course
              </h3>
              <p className="text-xs text-slate-200 font-medium mt-1">
                Fill out the form below to secure your seat for <span className="font-bold text-[#FDA31B]">{courseTitle}</span>.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {isSubmitted ? (
                /* Success Confirmation View */
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h4 className="text-2xl font-extrabold text-[#19232B] font-[family-name:var(--font-yantramanav)]">
                    Enrollment Submitted!
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                    Thank you <span className="font-bold text-[#116E63]">{formData.fullName}</span>! Our admissions team will contact you at <span className="font-bold text-[#19232B]">{formData.phone}</span> within 2 hours.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-lg text-xs font-semibold text-slate-600 space-y-1.5 text-left border border-slate-200">
                    <div className="flex justify-between">
                      <span>Course:</span>
                      <span className="font-bold text-[#19232B]">{courseTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="font-bold text-[#116E63]">{priceInr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mode:</span>
                      <span className="font-bold text-[#FDA31B]">{formData.learningMode}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="w-full bg-[#116E63] hover:bg-[#0c5048] text-white font-bold text-sm uppercase py-3 rounded-lg transition-colors"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              ) : (
                /* Enrollment Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Selected Course Field */}
                  <div>
                    <label className="block text-xs font-bold text-[#19232B] uppercase tracking-wider mb-1.5">
                      Selected Course
                    </label>
                    <div className="relative flex items-center">
                      <BookMarked className="w-4 h-4 text-[#116E63] absolute left-3" />
                      <input
                        type="text"
                        value={courseTitle}
                        disabled
                        className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-[#116E63] cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#19232B] uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative flex items-center">
                      <User className="w-4 h-4 text-slate-400 absolute left-3" />
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 focus:border-[#116E63] transition-colors bg-white"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-[#19232B] uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative flex items-center">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@example.com"
                        className="w-full pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 focus:border-[#116E63] transition-colors bg-white"
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-[#19232B] uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <div className="relative flex items-center">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 91442 88641"
                        className="w-full pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 focus:border-[#116E63] transition-colors bg-white"
                      />
                    </div>
                  </div>

                  {/* Learning Mode */}
                  <div>
                    <label className="block text-xs font-bold text-[#19232B] uppercase tracking-wider mb-1.5">
                      Learning Mode Preference
                    </label>
                    <select
                      name="learningMode"
                      value={formData.learningMode}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:ring-0 focus:border-[#116E63] transition-colors bg-white"
                    >
                      <option value="Online Live Interactive">Online Live Interactive</option>
                      <option value="Self-Paced Video Course">Self-Paced Video Course</option>
                      <option value="Hybrid (Classroom + Online)">Hybrid (Classroom + Online)</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#FDA31B] hover:bg-[#116E63] text-white font-extrabold text-sm uppercase tracking-wider py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4 stroke-[2.5]" />
                      <span>SUBMIT ENROLLMENT ({priceInr})</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
