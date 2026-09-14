"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export default function FloatingWidgets() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* 1. Floating WhatsApp Button (Bottom Left) */}
      <a
        href="https://wa.me/919144288641?text=Hi%20Skill%20Aura%20Academy%2C%20I%20want%20to%20know%20more%20about%20your%20courses."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="fixed bottom-28 right-6 z-50 w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        {/* Pulsing Outer Aura Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40 -z-10"></span>
        <FaWhatsapp className="w-7 h-7 fill-white group-hover:rotate-12 transition-transform duration-300" />
      </a>

      {/* 2. Scroll To Top Button (Bottom Right) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 w-13 h-13 rounded-full cursor-pointer bg-[#FDA31B] hover:bg-[#116E63] text-white flex items-center justify-center shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
        >
          <ChevronUp className="w-7 h-7 stroke-[3]" />
        </button>
      )}
    </>
  );
}
