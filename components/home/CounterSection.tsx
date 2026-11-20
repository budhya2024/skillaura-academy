"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, GraduationCap, UserCheck, Trophy } from "lucide-react";
import { getCmsData, CMS_UPDATE_EVENT, CounterMetricItem, DEFAULT_CMS_DATA } from "../../lib/cmsData";

const ICON_MAP = [GraduationCap, BookOpen, UserCheck, Trophy];

export default function CounterSection() {
  const [counters, setCounters] = useState<CounterMetricItem[]>(DEFAULT_CMS_DATA.counterMetrics);

  useEffect(() => {
    setCounters(getCmsData().counterMetrics);
    const handleUpdate = () => {
      setCounters(getCmsData().counterMetrics);
    };
    window.addEventListener(CMS_UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(CMS_UPDATE_EVENT, handleUpdate);
  }, []);

  return (
    <section
      className="relative py-8 md:py-16 bg-cover bg-center bg-fixed text-white overflow-hidden"
      style={{ backgroundImage: "url('/images/hero1.jpg')" }}
    >
      {/* Teal Green Tint Overlay */}
      <div className="absolute inset-0 bg-[#116E63]/90 backdrop-blur-[1px]"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {counters.map((item, idx) => {
            const Icon = ICON_MAP[idx % ICON_MAP.length];
            return (
              <div
                key={item.id}
                className="flex flex-col items-center text-center space-y-3 group"
              >
                {/* Organic Yellow Blob Icon Badge with White Outline */}
                <div className="relative mb-2">
                  <div className="w-20 h-20 sm:w-22 sm:h-22 bg-[#FDA31B] text-white rounded-[45%_55%_65%_35%/50%_45%_55%_50%] flex items-center justify-center shadow-xl border-2 border-white/90 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-9 h-9 stroke-[2]" />
                  </div>
                  {/* Outer White Offset Ring */}
                  <div className="absolute top-0 left-0 w-20 h-20 sm:w-22 sm:h-22 border-2 border-white/70 rounded-[45%_55%_65%_35%/50%_45%_55%_50%] transform translate-x-1.5 translate-y-1.5 pointer-events-none -z-10"></div>
                </div>

                {/* Counter Number */}
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-[family-name:var(--font-yantramanav)] drop-shadow-md">
                  {item.count}
                </h3>

                {/* Counter Label */}
                <p className="text-sm sm:text-base font-bold text-slate-100 tracking-wide">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
