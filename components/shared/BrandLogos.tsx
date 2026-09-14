import React from "react";
import { GraduationCap, Award, ShieldCheck, Globe, Building2, BookMarked } from "lucide-react";

const LOGOS = [
  { name: "Global Academic Alliance", icon: GraduationCap },
  { name: "International Tech Council", icon: Globe },
  { name: "Accredited Excellence Board", icon: Award },
  { name: "National University Hub", icon: Building2 },
  { name: "Certified Skill Standard", icon: ShieldCheck },
  { name: "Digital Learning Institute", icon: BookMarked },
];

export default function BrandLogos() {
  return (
    <section className="py-10 bg-white border-y border-slate-100 font-sans">
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
          {LOGOS.map((logo, idx) => {
            const Icon = logo.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center space-y-2 p-4 rounded-xl hover:bg-slate-50 transition-all duration-300 group text-slate-400 hover:text-[#116E63]"
              >
                <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#EAF5F3] flex items-center justify-center transition-colors">
                  <Icon className="w-6 h-6 stroke-[2] group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-xs font-bold text-center text-[#19232B] group-hover:text-[#116E63] transition-colors leading-tight">
                  {logo.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
