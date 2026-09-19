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
  { id: 1, name: "Video Editing Mastery", price: "₹4,999", duration: "05 Months" },
  { id: 2, name: "Poster & Logo Design", price: "₹3,499", duration: "04 Months" },
  { id: 3, name: "Content Creation Mastery", price: "₹4,499", duration: "04 Months" },
  { id: 4, name: "Knowledge Mastery", price: "₹3,499", duration: "03 Months" },
  { id: 5, name: "Business Mastery", price: "₹4,999", duration: "04 Months" },
  { id: 7, name: "Google Ads Mastery", price: "₹3,999", duration: "03 Months" },
];

export default function EnrollModal({ isOpen, onClose, defaultCourseId = 1 }: EnrollModalProps) {
  const [selectedCourseId, setSelectedCourseId] = useState(defaultCourseId);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", mobile: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState({
    name: "",
    email: "",
    mobile: "",
    courseName: "",
    coursePrice: "",
    courseDuration: "",
  });
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const validateEmail = (emailStr: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailStr.trim());
  };

  const validateMobile = (phoneStr: string) => {
    const cleaned = phoneStr.replace(/[^0-9]/g, "");
    return cleaned.length >= 10 && cleaned.length <= 15;
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedCourseId(defaultCourseId || 1);
      setIsSubmitted(false);
      setErrors({ name: "", email: "", mobile: "" });
    }
  }, [isOpen, defaultCourseId]);

  const handleClose = () => {
    setIsSubmitted(false);
    setName("");
    setEmail("");
    setMobile("");
    setErrors({ name: "", email: "", mobile: "" });
    setWhatsappUrl("");
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
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
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedCourse = COURSES.find((c) => c.id === Number(selectedCourseId)) || COURSES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { name: "", email: "", mobile: "" };
    let hasError = false;

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Please enter your full name (at least 2 characters).";
      hasError = true;
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required.";
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address (e.g. name@domain.com).";
      hasError = true;
    }

    if (!mobile.trim()) {
      newErrors.mobile = "WhatsApp / Mobile number is required.";
      hasError = true;
    } else if (!validateMobile(mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile or WhatsApp number.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setErrors({ name: "", email: "", mobile: "" });

    const currentDate = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const textPayload = `🎓 *NEW COURSE ENROLLMENT - SKILL AURA ACADEMY* 🎓\n--------------------------------------------\n👤 *Student Name:* ${name.trim()}\n📱 *WhatsApp / Mobile:* ${mobile.trim()}\n📧 *Email:* ${email.trim()}\n📚 *Selected Course:* ${selectedCourse.name}\n💰 *Course Fee:* ${selectedCourse.price}\n⏱️ *Duration:* ${selectedCourse.duration}\n📅 *Application Time:* ${currentDate}\n💻 *Learning Mode:* 100% Online & Live\n💼 *Benefit:* Freelancing Job & Client Project Opportunity\n--------------------------------------------\n✅ *Status:* Admission Requested. Please confirm my enrollment.`;

    const waLink = `https://wa.me/919144288641?text=${encodeURIComponent(textPayload)}`;
    setWhatsappUrl(waLink);
    setSubmittedData({
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      courseName: selectedCourse.name,
      coursePrice: selectedCourse.price,
      courseDuration: selectedCourse.duration,
    });
    setIsSubmitted(true);

    // Open WhatsApp in a new tab
    try {
      window.open(waLink, "_blank");
    } catch {
      // Fallback if popup is blocked
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[460px] bg-white rounded-xl overflow-hidden animate-in zoom-in-95 duration-250 font-sans shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dark Teal Header Banner */}
        <div className="bg-[#0c5c53] text-white p-4 sm:p-5 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white hover:bg-[#FDA31B] hover:text-white text-[#0c5c53] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>

          <h3 className="text-xl sm:text-2xl font-[family-name:var(--font-yantramanav)] text-white tracking-tight leading-tight">
            Course Enrollment Form
          </h3>
          <p className="text-slate-100 mt-1 leading-normal text-xs sm:text-sm">
            Fill out the form below to secure your seat for <span className="text-[#FDA31B] font-bold">{selectedCourse.name}</span>.
          </p>
        </div>

        {/* Modal Form Body */}
        <div className="p-4 sm:p-5 max-h-[80vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-2 space-y-4">
              <div className="w-13 h-13 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-extrabold text-slate-900 font-[family-name:var(--font-yantramanav)]">
                  Application Confirmed!
                </h4>
                <p className="text-slate-600 text-xs max-w-sm mx-auto leading-relaxed">
                  Thank you <span className="font-bold text-slate-900">{submittedData.name}</span>! Your enrollment details have been submitted directly to our WhatsApp admissions team.
                </p>
              </div>

              {/* SMS Style Digital Receipt Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-left space-y-2 text-xs text-slate-700 shadow-xs">
                <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                  <span className="text-slate-500 font-medium">Student Name:</span>
                  <span className="font-bold text-slate-900">{submittedData.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                  <span className="text-slate-500 font-medium">Selected Course:</span>
                  <span className="font-bold text-[#116E63]">{submittedData.courseName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                  <span className="text-slate-500 font-medium">Course Fee:</span>
                  <span className="font-black text-[#FDA31B]">{submittedData.coursePrice}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                  <span className="text-slate-500 font-medium">WhatsApp / Phone:</span>
                  <span className="font-bold text-slate-800">{submittedData.mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Benefit:</span>
                  <span className="font-bold text-emerald-600">100% Freelancing & Client Work Support</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href={whatsappUrl || `https://wa.me/919144288641?text=Hi%20Skill%20Aura%20Academy%2C%20I%20have%20submitted%20my%20enrollment.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs tracking-wider uppercase px-4 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>Confirm on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3" noValidate>
              {/* SELECTED COURSE DISPLAY & SELECTOR */}
              <div>
                <label className="block text-xs font-medium tracking-wider text-slate-700 mb-1">
                  SELECTED COURSE
                </label>
                <div className="relative">
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(Number(e.target.value))}
                    className="w-full bg-[#f4f7f6] border border-slate-200/90 rounded-sm pl-9 pr-9 py-2.5 text-[#0c5c53] font-bold text-xs sm:text-sm focus:outline-none focus:border-[#0c5c53] transition-all appearance-none cursor-pointer"
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
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name && e.target.value.trim().length >= 2) {
                        setErrors((prev) => ({ ...prev, name: "" }));
                      }
                    }}
                    placeholder="Enter your full name"
                    className={`w-full bg-white border rounded-sm pl-9 pr-3 py-2.5 text-slate-900 font-medium text-xs sm:text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none transition-all ${
                      errors.name ? "border-red-500 bg-red-50/20 focus:border-red-500" : "border-slate-200 focus:border-[#0c5c53]"
                    }`}
                  />
                  <User className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2] ${errors.name ? "text-red-500" : "text-slate-400"}`} />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-[11px] font-semibold mt-1 animate-in fade-in duration-150">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* EMAIL ADDRESS * */}
              <div>
                <label className="block text-xs font-medium tracking-wider text-slate-700 mb-1">
                  EMAIL ADDRESS *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email && validateEmail(e.target.value)) {
                        setErrors((prev) => ({ ...prev, email: "" }));
                      }
                    }}
                    placeholder="yourname@example.com"
                    className={`w-full bg-white border rounded-sm pl-9 pr-3 py-2.5 text-slate-900 font-medium text-xs sm:text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none transition-all ${
                      errors.email ? "border-red-500 bg-red-50/20 focus:border-red-500" : "border-slate-200 focus:border-[#0c5c53]"
                    }`}
                  />
                  <Mail className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2] ${errors.email ? "text-red-500" : "text-slate-400"}`} />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-[11px] font-semibold mt-1 animate-in fade-in duration-150">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PHONE / WHATSAPP NUMBER * */}
              <div>
                <label className="block text-xs font-medium tracking-wider text-slate-700 mb-1">
                  PHONE / WHATSAPP NUMBER *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      if (errors.mobile && validateMobile(e.target.value)) {
                        setErrors((prev) => ({ ...prev, mobile: "" }));
                      }
                    }}
                    placeholder="+91 91442 88641"
                    className={`w-full bg-white border rounded-sm pl-9 pr-3 py-2.5 text-slate-900 font-medium text-xs sm:text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none transition-all ${
                      errors.mobile ? "border-red-500 bg-red-50/20 focus:border-red-500" : "border-slate-200 focus:border-[#0c5c53]"
                    }`}
                  />
                  <Phone className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2] ${errors.mobile ? "text-red-500" : "text-slate-400"}`} />
                </div>
                {errors.mobile && (
                  <p className="text-red-500 text-[11px] font-semibold mt-1 animate-in fade-in duration-150">
                    {errors.mobile}
                  </p>
                )}
              </div>

              {/* Freelancing Opportunity Guarantee Callout */}
              <div className="bg-[#116E63]/10 border border-[#116E63]/20 rounded-md p-2.5 flex items-center gap-2">
                <p className="text-[11px] text-slate-700 font-semibold leading-tight">
                  <strong className="text-[#116E63]">100% Freelancing Support:</strong> Every active student who masters skills will be provided with live freelance client work and project opportunities.
                </p>
              </div>

              {/* SUBMIT ENROLLMENT BUTTON (Size SM) */}
              <div className="pt-1.5">
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#FDA31B] hover:bg-[#116E63] text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-4 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>SUBMIT ENROLLMENT</span>
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
