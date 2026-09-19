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
    question: "How does Skill Aura Academy provide freelancing job opportunities?",
    answer:
      "Upon completing your practical masterclass and mastering the required tools, our dedicated mentorship team directly connects you to live client projects, gig assignments, and remote freelance opportunities to help you start earning immediately.",
  },
  {
    id: 2,
    question: "Are the masterclasses conducted 100% online?",
    answer:
      "Yes! All 7 masterclasses are delivered through our 100% online practical learning system. You can join live interactive sessions or watch high-definition recordings flexibly from your mobile phone or laptop at any time.",
  },
  {
    id: 3,
    question: "How do I enroll and confirm my admission?",
    answer:
      "Simply click the 'ENROLL NOW' button on any course. Fill out the short registration form, and your enrollment request will be processed immediately with instant WhatsApp confirmation and support from our admissions team.",
  },
  {
    id: 4,
    question: "Will I receive an accredited certification upon completion?",
    answer:
      "Yes! After successfully completing all module assignments and the capstone portfolio project, you will receive a verified Skill Aura Academy Certificate of Completion to showcase to global clients.",
  },
  {
    id: 5,
    question: "What kind of student support and mentorship is provided?",
    answer:
      "You receive direct 1-on-1 problem-solving support, WhatsApp community access, live feedback on client work, and personal guidance from Founder & CEO Subha Kumar Mahata.",
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
