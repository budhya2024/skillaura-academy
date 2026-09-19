import React from "react";
import { Phone, Mail, Clock } from "lucide-react";

export interface ContactCardItem {
  id: number;
  icon: React.ElementType;
  title: string;
  subtitle: string;
}

const CARDS: ContactCardItem[] = [
  {
    id: 1,
    icon: Phone,
    title: "Call Us",
    subtitle: "+91 91442 88641",
  },
  {
    id: 2,
    icon: Mail,
    title: "Email Us",
    subtitle: "skillauraacademy.in@gmail.com",
  },
  {
    id: 3,
    icon: Clock,
    title: "Support Hours",
    subtitle: "Mon - Sat (10.00 AM - 06.00 PM)",
  },
];

export default function ContactInfoCards() {
  return (
    <section className="py-8 md:py-16 bg-[#F2F3F5] font-sans">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="bg-white rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-[#116E63] flex flex-col items-center space-y-4 group"
              >
                {/* Circular Teal Badge Icon */}
                <div className="w-16 h-16 rounded-full bg-[#116E63] text-white flex items-center justify-center shadow-md border-2 border-white ring-4 ring-[#116E63]/20 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] pt-1">
                  {card.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm font-medium text-[#757F95]">
                  {card.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
