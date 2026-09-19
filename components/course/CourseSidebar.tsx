"use client";

import React, { useState, useEffect } from "react";
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
  priceInr = "₹3,499",
  originalPriceInr = "₹6,999",
  discountPercentage = "50% OFF",
  previewImage = "/images/course-design.jpg",
  duration = "04 Months / 100 Hours",
  lessons = "64 Lessons",
  seats = "100 Enrolled",
  language = "English & Hindi",
  courseTitle = "Poster & Logo Design Mastery",
}: CourseSidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [whatsappUrl, setWhatsappUrl] = useState("");

  const validateEmail = (emailStr: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailStr.trim());
  };

  const validatePhone = (phoneStr: string) => {
    const cleaned = phoneStr.replace(/[^0-9]/g, "");
    return cleaned.length >= 10 && cleaned.length <= 15;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "fullName" && errors.fullName && value.trim().length >= 2) {
      setErrors((prev) => ({ ...prev, fullName: "" }));
    }
    if (name === "email" && errors.email && validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
    if (name === "phone" && errors.phone && validatePhone(value)) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { fullName: "", email: "", phone: "" };
    let hasError = false;

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name (at least 2 characters).";
      hasError = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
      hasError = true;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address (e.g. name@domain.com).";
      hasError = true;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "WhatsApp / Phone number is required.";
      hasError = true;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile or WhatsApp number.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setErrors({ fullName: "", email: "", phone: "" });

    const currentDate = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const textPayload = `🎓 *NEW COURSE ENROLLMENT - SKILL AURA ACADEMY* 🎓\n--------------------------------------------\n👤 *Student Name:* ${formData.fullName.trim()}\n📱 *WhatsApp / Phone:* ${formData.phone.trim()}\n📧 *Email:* ${formData.email.trim()}\n📚 *Course:* ${courseTitle}\n💰 *Price:* ${priceInr}\n⏱️ *Duration:* ${duration}\n📅 *Application Time:* ${currentDate}\n📝 *Notes:* ${formData.notes || "None"}\n💻 *Mode:* 100% Online Live\n💼 *Benefit:* Freelancing Job & Project Opportunity\n--------------------------------------------\n✅ *Status:* Admission Requested. Please confirm my enrollment.`;

    const waLink = `https://wa.me/919144288641?text=${encodeURIComponent(textPayload)}`;
    setWhatsappUrl(waLink);
    setIsSubmitted(true);

    try {
      window.open(waLink, "_blank");
    } catch {
      // Fallback if popup is blocked
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setErrors({ fullName: "", email: "", phone: "" });
    setWhatsappUrl("");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="bg-white rounded-xl p-6 sm:p-7 shadow-xl border border-slate-200 space-y-6 font-sans">
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

        {/* ENROLL NOW CTA Button (Size SM) */}
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#FDA31B] hover:bg-[#116E63] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-2.5 px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
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
              href="https://www.facebook.com/share/1EQZ7zHQaZ/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#FDA31B] text-slate-700 hover:text-white flex items-center justify-center transition-colors"
            >
              <FaFacebookF className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.instagram.com/skillaura.academy_?stkn=c3N5eW1uamp1bndu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#FDA31B] text-slate-700 hover:text-white flex items-center justify-center transition-colors"
            >
              <FaInstagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://whatsapp.com/channel/0029Vb8yz5uG8l55QwjXzE0w"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Channel"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#FDA31B] text-slate-700 hover:text-white flex items-center justify-center transition-colors"
            >
              <FaWhatsapp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ================= ENROLLMENT FORM MODAL ================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#116E63] p-6 text-white relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>


              <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-yantramanav)] leading-tight text-white">
                Enroll In Course
              </h3>
              <p className="text-xs md:text-sm text-slate-200 font-medium mt-1">
                Fill out the form below to secure your seat for <span className="font-bold text-[#FDA31B]">{courseTitle}</span>.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {isSubmitted ? (
                /* Success Confirmation View */
                <div className="text-center py-4 space-y-4">
                  <div className="w-13 h-13 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-extrabold uppercase tracking-wide">
                      ✓ Enrollment Confirmation SMS / Receipt
                    </span>
                    <h4 className="text-xl font-extrabold text-[#19232B] font-[family-name:var(--font-yantramanav)]">
                      Enrollment Submitted!
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                      Thank you <span className="font-bold text-[#116E63]">{formData.fullName}</span>! Your details have been submitted and sent to WhatsApp.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl text-xs font-semibold text-slate-700 space-y-2 text-left border border-slate-200 shadow-xs">
                    <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                      <span className="text-slate-500 font-medium">Course:</span>
                      <span className="font-bold text-[#19232B]">{courseTitle}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                      <span className="text-slate-500 font-medium">Course Fee:</span>
                      <span className="font-black text-[#FDA31B]">{priceInr}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                      <span className="text-slate-500 font-medium">Mobile / WhatsApp:</span>
                      <span className="font-bold text-slate-900">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Benefits:</span>
                      <span className="font-bold text-emerald-600">100% Freelancing & Client Support</span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <a
                      href={whatsappUrl || `https://wa.me/919144288641`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs tracking-wider uppercase px-4 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                      <span>Chat & Confirm on WhatsApp</span>
                    </a>

                    <button
                      onClick={handleCloseModal}
                      className="text-xs font-medium text-slate-500 hover:text-slate-800 underline block mx-auto cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                /* Enrollment Form */
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
                      <User className={`w-4 h-4 absolute left-3 ${errors.fullName ? "text-red-500" : "text-slate-400"}`} />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full pl-9 pr-3.5 py-2.5 border rounded-lg text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none transition-colors bg-white ${
                          errors.fullName ? "border-red-500 bg-red-50/20" : "border-slate-200 focus:border-[#116E63]"
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-500 text-[11px] font-semibold mt-1 animate-in fade-in duration-150">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-[#19232B] uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative flex items-center">
                      <Mail className={`w-4 h-4 absolute left-3 ${errors.email ? "text-red-500" : "text-slate-400"}`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@example.com"
                        className={`w-full pl-9 pr-3.5 py-2.5 border rounded-lg text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none transition-colors bg-white ${
                          errors.email ? "border-red-500 bg-red-50/20" : "border-slate-200 focus:border-[#116E63]"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-[11px] font-semibold mt-1 animate-in fade-in duration-150">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-[#19232B] uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <div className="relative flex items-center">
                      <Phone className={`w-4 h-4 absolute left-3 ${errors.phone ? "text-red-500" : "text-slate-400"}`} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 91442 88641"
                        className={`w-full pl-9 pr-3.5 py-2.5 border rounded-lg text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none transition-colors bg-white ${
                          errors.phone ? "border-red-500 bg-red-50/20" : "border-slate-200 focus:border-[#116E63]"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-[11px] font-semibold mt-1 animate-in fade-in duration-150">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Submit Button (Size SM) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#FDA31B] hover:bg-[#116E63] text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 stroke-[2.5]" />
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
