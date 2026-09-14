import React from "react";
import { Award, UserCheck, BookOpen, GraduationCap } from "lucide-react";

export interface FeatureItem {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    number: "01",
    icon: GraduationCap,
    title: "Scholarship Facility",
    description: "Merit-based scholarships & financial aid options for high-performing students.",
  },
  {
    number: "02",
    icon: UserCheck,
    title: "Skilled Instructors",
    description: "Learn directly from senior industry leaders, AI engineers, and domain experts.",
  },
  {
    number: "03",
    icon: BookOpen,
    title: "Practical Masterclasses",
    description: "Master real-world tools with step-by-step practical projects & downloadable assets.",
  },
  {
    number: "04",
    icon: Award,
    title: "Accredited Certification",
    description: "Earn globally verified credentials to boost your resume and professional portfolio.",
  },
];

export default function Features() {
  return (
    <section className="relative z-30 -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-28 mb-8 md:mb-16 font-sans">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-tl-[50px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-[50px] p-7 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100/80 group flex flex-col justify-between"
              >
                {/* Top Row: Icon Badge (Left) & Outline Number (Right) */}
                <div className="flex items-center justify-between">
                  {/* Teal Circular Icon Badge */}
                  <div className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#116E63] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0">
                    <Icon className="w-7 h-7 stroke-[2]" />
                  </div>

                  {/* Outline Green Number (01, 02, 03, 04) */}
                  <span className="text-3xl sm:text-4xl font-black font-mono text-transparent [-webkit-text-stroke:2px_#116E63] select-none tracking-tight">
                    {feature.number}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-6">
                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#19232B] mb-2 font-[family-name:var(--font-yantramanav)] group-hover:text-[#116E63] transition-colors leading-snug">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#757F95] text-sm sm:text-base leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
