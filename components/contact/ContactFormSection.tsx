"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPaperPlane } from "react-icons/fa6";
import { CheckCircle2 } from "lucide-react";
import { addContactInquiry } from "../../lib/contactData";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [submittedData, setSubmittedData] = useState({
    name: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const validateEmail = (emailStr: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailStr.trim());
  };

  const validateMobile = (phoneStr: string) => {
    const cleaned = phoneStr.replace(/[^0-9]/g, "");
    return cleaned.length >= 10 && cleaned.length <= 15;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { name: "", email: "", mobile: "", message: "" };
    let hasError = false;

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your name (at least 2 characters).";
      hasError = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
      hasError = true;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      hasError = true;
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile / WhatsApp number is required.";
      hasError = true;
    } else if (!validateMobile(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number.";
      hasError = true;
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      newErrors.message = "Please enter your message (at least 5 characters).";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setErrors({ name: "", email: "", mobile: "", message: "" });

    // 1. Save Inquiry to platform storage for Super Admin
    try {
      addContactInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        subject: formData.subject.trim() || "Course & Admission Inquiry",
        message: formData.message.trim(),
      });
    } catch (err) {
      console.error("Failed to record inquiry:", err);
    }

    setSubmittedData({
      name: formData.name,
      mobile: formData.mobile,
      subject: formData.subject,
      message: formData.message,
    });
    setIsSubmitted(true);
    setFormData({ name: "", email: "", mobile: "", subject: "", message: "" });
  };

  return (
    <section className="py-8 md:py-16 bg-[#F2F3F5] font-sans">
      <div className="container">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10 border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Slanted Campus Image (lg:col-span-5) */}
            <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[480px] rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/hero1.jpg"
                alt="Students Learning Online"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#116E63]/80 via-transparent to-transparent"></div>
            </div>

            {/* Right Column: Contact Form (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-black text-[#116E63] uppercase tracking-wider inline-block">
                  Get In Touch
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#19232B] font-[family-name:var(--font-yantramanav)]">
                  Send Us A Message Anytime
                </h2>
                <p className="text-[#757F95] text-xs sm:text-sm leading-relaxed">
                  Have questions about our courses or enrollment? Send us a message and our team will get back to you.
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-4 shadow-sm animate-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-emerald-700 text-xs font-extrabold uppercase tracking-wide">
                      ✓ Message Sent Successfully
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 font-[family-name:var(--font-yantramanav)]">
                      Thank You, {submittedData.name}!
                    </h3>
                    <p className="text-xs text-slate-600">
                      Your message has been received. Our team will contact you shortly.
                    </p>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-bold text-white bg-[#116E63] hover:bg-[#0c5c53] rounded-full px-5 py-2.5 cursor-pointer transition-colors shadow-xs"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-1" noValidate>
                  {/* Inputs Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name && e.target.value.trim().length >= 2) {
                            setErrors((prev) => ({ ...prev, name: "" }));
                          }
                        }}
                        className={`w-full bg-[#F2F3F5] text-slate-800 placeholder-slate-400 font-medium px-4 py-3 rounded-lg border focus:outline-none transition-colors text-sm ${errors.name ? "border-red-500 bg-red-50/20" : "border-slate-200 focus:border-[#116E63]"
                          }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-[11px] font-semibold mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email && validateEmail(e.target.value)) {
                            setErrors((prev) => ({ ...prev, email: "" }));
                          }
                        }}
                        className={`w-full bg-[#F2F3F5] text-slate-800 placeholder-slate-400 font-medium px-4 py-3 rounded-lg border focus:outline-none transition-colors text-sm ${errors.email ? "border-red-500 bg-red-50/20" : "border-slate-200 focus:border-[#116E63]"
                          }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[11px] font-semibold mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Inputs Row 2: Mobile Number & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="tel"
                        placeholder="Mobile / WhatsApp Number (+91...) *"
                        value={formData.mobile}
                        onChange={(e) => {
                          setFormData({ ...formData, mobile: e.target.value });
                          if (errors.mobile && validateMobile(e.target.value)) {
                            setErrors((prev) => ({ ...prev, mobile: "" }));
                          }
                        }}
                        className={`w-full bg-[#F2F3F5] text-slate-800 placeholder-slate-400 font-medium px-4 py-3 rounded-lg border focus:outline-none transition-colors text-sm ${errors.mobile ? "border-red-500 bg-red-50/20" : "border-slate-200 focus:border-[#116E63]"
                          }`}
                      />
                      {errors.mobile && (
                        <p className="text-red-500 text-[11px] font-semibold mt-1">
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full bg-[#F2F3F5] text-slate-800 placeholder-slate-400 font-medium px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-0 focus:border-[#116E63] transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Input Row 3: Message Area */}
                  <div>
                    <textarea
                      rows={4}
                      placeholder="Write your message or inquiry here... *"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message && e.target.value.trim().length >= 5) {
                          setErrors((prev) => ({ ...prev, message: "" }));
                        }
                      }}
                      className={`w-full bg-[#F2F3F5] text-slate-800 placeholder-slate-400 font-medium p-4 rounded-lg border focus:outline-none transition-colors text-sm resize-none ${errors.message ? "border-red-500 bg-red-50/20" : "border-slate-200 focus:border-[#116E63]"
                        }`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-[11px] font-semibold mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button (Size SM) */}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-[#FDA31B] hover:bg-[#116E63] text-white font-extrabold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <span>SEND MESSAGE</span>
                    <FaPaperPlane className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
