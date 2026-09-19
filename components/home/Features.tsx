import React from "react";
import { Briefcase, Laptop, UserCheck, Globe } from "lucide-react";

export interface FeatureItem {
  number: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    number: "01",
    icon: Briefcase,
    title: "Freelancing Job Opportunities",
    subtitle: "Client Project Support",
    description: "Every student who completes their course and masters skills is provided with direct live client freelance project opportunities.",
  },
  {
    number: "02",
    icon: Laptop,
    title: "100% Practical Training",
    subtitle: "Hands-on Live Projects",
    description: "Master industry tools like CapCut, Premiere Pro, Photoshop, Illustrator, and Meta Ads through real-world workflows.",
  },
  {
    number: "03",
    icon: UserCheck,
    title: "Direct Founder Mentorship",
    subtitle: "1-on-1 Guidance",
    description: "Personal guidance and dedicated problem-solving mentorship directly from Founder Subha Kumar Mahata.",
  },
  {
    number: "04",
    icon: Globe,
    title: "100% Online System",
    subtitle: "Lifetime Community Access",
    description: "Learn flexibly from home on phone or computer with lifetime access to all learning materials and community channels.",
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
