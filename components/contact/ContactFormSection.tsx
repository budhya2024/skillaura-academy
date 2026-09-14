"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPaperPlane } from "react-icons/fa6";
import { CheckCircle2 } from "lucide-react";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", mobile: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
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
                alt="Students Campus"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#116E63]/80 via-transparent to-transparent"></div>
            </div>

            {/* Right Column: Contact Form (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#19232B] font-[family-name:var(--font-yantramanav)]">
                  Get In Touch
                </h2>
                <p className="text-[#757F95] text-xs sm:text-sm leading-relaxed">
                  It is a long established fact that a reader will be distracted by the readable content of a page randomised words which don&apos;t look even slightly when looking at its layout.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                {/* Inputs Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-[#F2F3F5] text-slate-800 placeholder-slate-400 font-medium px-4 py-3.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-0 focus:border-[#116E63] transition-colors text-sm"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-[#F2F3F5] text-slate-800 placeholder-slate-400 font-medium px-4 py-3.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-0 focus:border-[#116E63] transition-colors text-sm"
                  />
                </div>

                {/* Inputs Row 2: Mobile Number & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number (+91...)"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    className="w-full bg-[#F2F3F5] text-slate-800 placeholder-slate-400 font-medium px-4 py-3.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-0 focus:border-[#116E63] transition-colors text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Your Subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full bg-[#F2F3F5] text-slate-800 placeholder-slate-400 font-medium px-4 py-3.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-0 focus:border-[#116E63] transition-colors text-sm"
                  />
                </div>

                {/* Input Row 3: Message Area */}
                <textarea
                  rows={4}
                  required
                  placeholder="Write Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-[#F2F3F5] text-slate-800 placeholder-slate-400 font-medium p-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-0 focus:border-[#116E63] transition-colors text-sm resize-none"
                ></textarea>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#FDA31B] hover:bg-[#116E63] text-white font-extrabold text-xs tracking-wider uppercase px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span>SEND MESSAGE</span>
                  <FaPaperPlane className="w-3.5 h-3.5" />
                </button>

                {isSubmitted && (
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold pt-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
