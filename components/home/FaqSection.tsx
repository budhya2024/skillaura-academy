"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { getCmsData, CMS_UPDATE_EVENT, FaqContentItem, DEFAULT_CMS_DATA } from "../../lib/cmsData";

export default function FaqSection() {
  const [faqs, setFaqs] = useState<FaqContentItem[]>(DEFAULT_CMS_DATA.faqs);
  const [openId, setOpenId] = useState<number | null>(1);

  useEffect(() => {
    setFaqs(getCmsData().faqs);
    const handleUpdate = () => {
      setFaqs(getCmsData().faqs);
    };
    window.addEventListener(CMS_UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(CMS_UPDATE_EVENT, handleUpdate);
  }, []);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-8 md:py-16 bg-white font-sans border-t border-slate-100 relative">
      <div className="container">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#19232B] font-[family-name:var(--font-yantramanav)] leading-tight">
            Have Questions? <span className="text-[#116E63]">We Have Answers</span>
          </h2>

          <p className="text-[#757F95] text-sm sm:text-base font-normal leading-relaxed">
            Find answers to common questions about admissions, degree courses, tuition fees, online classes, and student support.
          </p>
        </div>

        {/* Full-Width Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-xl  border transition-all duration-200 overflow-hidden ${isOpen
                  ? "border-[#FDA31B] bg-white shadow-lg"
                  : "border-slate-200 bg-[#F2F3F5] hover:bg-slate-100"
                  }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 sm:px-8 py-5 flex items-center justify-between text-left focus:outline-none gap-4 cursor-pointer"
                >
                  <span className="font-bold text-[#19232B] text-base sm:text-lg font-[family-name:var(--font-yantramanav)]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen
                      ? "bg-[#FDA31B] text-white rotate-180"
                      : "bg-white text-slate-500 shadow-sm"
                      }`}
                  >
                    <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 text-sm sm:text-base text-[#757F95] font-normal leading-relaxed animate-in fade-in duration-200 border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
