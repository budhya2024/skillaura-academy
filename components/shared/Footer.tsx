"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPaperPlane,
} from "react-icons/fa6";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  return (
    <footer
      className="relative bg-cover bg-center bg-fixed text-white pt-16 pb-8 font-sans overflow-hidden"
      style={{ backgroundImage: "url('/images/hero1.jpg')" }}
    >
      {/* Dark Royal Navy Blue Background Tint Overlay */}
      <div className="absolute inset-0 bg-[#012758]/95 backdrop-blur-[1px]"></div>
      <div className="container relative z-10">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12">
          {/* Column 1: Brand Info & Contacts (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-5">
            {/* White Logo rendered using CSS brightness-0 invert */}
            <Link href="/" className="inline-block group py-1">
              <Image
                src="/images/brand-logo.png"
                alt="Skill Aura Academy Logo"
                width={190}
                height={50}
                className="h-8 sm:h-10 w-auto object-contain brightness-0 invert transition-transform duration-200 group-hover:scale-[1.03]"
              />
            </Link>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              We offer world-class educational programs, practical skill masterclasses, and globally accredited degree pathways.
            </p>

            {/* Social Media Icons (Left Side under Logo Text) */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://www.facebook.com/share/1EQZ7zHQaZ/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-[#FDA31B] transition-all duration-200 shadow-sm"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/skillaura.academy_?stkn=c3N5eW1uamp1bndu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-[#FDA31B] transition-all duration-200 shadow-sm"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://whatsapp.com/channel/0029Vb8yz5uG8l55QwjXzE0w"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Channel"
                className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-[#FDA31B] transition-all duration-200 shadow-sm"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white font-[family-name:var(--font-yantramanav)]">
                Quick Links
              </h3>
              <div className="flex items-center h-0.5 w-12">
                <span className="bg-[#FDA31B] h-full w-6"></span>
                <span className="bg-slate-600 h-full w-6"></span>
              </div>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Top Courses", href: "#courses" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-[#FDA31B] font-medium transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#FDA31B] group-hover:translate-x-1 transition-transform shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Policies (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white font-[family-name:var(--font-yantramanav)]">
                Legal & Policies
              </h3>
              <div className="flex items-center h-0.5 w-12">
                <span className="bg-[#FDA31B] h-full w-6"></span>
                <span className="bg-slate-600 h-full w-6"></span>
              </div>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Refund Policy", href: "/refund-policy" },
                { label: "Affiliate Terms", href: "/affiliate-terms" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-[#FDA31B] font-medium transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#FDA31B] group-hover:translate-x-1 transition-transform shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Top Courses (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white font-[family-name:var(--font-yantramanav)]">
                Our Courses
              </h3>
              <div className="flex items-center h-0.5 w-12">
                <span className="bg-[#FDA31B] h-full w-6"></span>
                <span className="bg-slate-600 h-full w-6"></span>
              </div>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { label: "Video Editing", href: "/courses/1" },
                { label: "Poster & Logo Design", href: "/courses/2" },
                { label: "Content Creation", href: "/courses/3" },
                { label: "Knowledge Mastery", href: "/courses/4" },
                { label: "Facebook & Google Ads", href: "/courses/6" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-[#FDA31B] font-medium transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#FDA31B] group-hover:translate-x-1 transition-transform shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Newsletter (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white font-[family-name:var(--font-yantramanav)]">
                Newsletter
              </h3>
              <div className="flex items-center h-0.5 w-12">
                <span className="bg-[#FDA31B] h-full w-6"></span>
                <span className="bg-slate-600 h-full w-6"></span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Subscribe to get the latest updates, course announcements, and educational news.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  required
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 font-medium px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FDA31B] text-xs sm:text-sm shadow-sm transition-all"
                />
              </div>

              {/* Increased Y-axis padding for Subscribe button */}
              <button
                type="submit"
                className="w-full bg-[#FDA31B] hover:bg-[#116E63] text-white font-extrabold text-xs tracking-wider uppercase py-3.5 sm:py-4 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>SUBSCRIBE NOW</span>
                <FaPaperPlane className="w-3.5 h-3.5" />
              </button>

              {isSubscribed && (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold pt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Successfully subscribed to newsletter!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Copyright & Social Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col gap-1 text-center  text-xs sm:text-sm text-slate-300 text-center ">
          {/* Left: Copyright */}
          <p className="font-normal">
            © Copyright 2026{" "}
            <span className="text-[#FDA31B] font-bold">Skill Aura Academy</span>.{" "}
            All Rights Reserved.
          </p>


          {/* Right: Developed by TechShift Technology & Social Icons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mx-auto">
            <p className="font-normal text-xs text-slate-400">
              Developed by{" "}
              <a
                href="https://www.facebook.com/profile.php?id=61557874367373"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FDA31B] font-bold hover:underline hover:text-white transition-all"
              >
                TechShift Technology
              </a>
            </p>


          </div>
        </div>
      </div>
    </footer>
  );
}
