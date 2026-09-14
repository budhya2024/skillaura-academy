"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    id: 1,
    question: "How do I apply for courses or degree programs at Skill Aura Academy?",
    answer:
      "Applying is simple! Click the 'APPLY NOW' button in the navigation header or visit our Admissions page. Fill out the online application form, select your desired program, and submit required academic transcripts or credentials.",
  },
  {
    id: 2,
    question: "Are the certificates and degrees accredited globally?",
    answer:
      "Yes! All programs offered at Skill Aura Academy are fully accredited and recognized by global educational boards and top industry organizations, ensuring your diploma holds high value in the job market.",
  },
  {
    id: 3,
    question: "What financial aid or scholarship opportunities are available?",
    answer:
      "We offer over $2M+ in merit-based and need-based scholarships annually. Eligible applicants can apply for financial grants, flexible installment payment plans, or employer tuition assistance.",
  },
  {
    id: 4,
    question: "Can I study online at my own flexible pace?",
    answer:
      "Absolutely! We offer 100% online self-paced modules as well as interactive live weekend classes, allowing working professionals and international students to balance education with career commitments.",
  },
  {
    id: 5,
    question: "What career guidance and placement assistance do you offer?",
    answer:
      "Our dedicated Career Services center provides 1-on-1 resume reviews, mock interviews, career mentorship, and direct recruitment access to our global network of 500+ partner hiring companies.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(1);

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
          {FAQ_LIST.map((faq) => {
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
