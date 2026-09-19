"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  ChevronRight,
  Send,
  BookOpen,
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          {/* Column 1: Brand Info & Contacts (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-tr from-[#116E63] to-[#189b8b] flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col leading-none font-[family-name:var(--font-yantramanav)]">
                <div className="flex items-baseline font-black tracking-tight text-2xl sm:text-3xl">
                  <span className="text-white">Skill</span>
                  <span className="text-[#FDA31B]">Aura</span>
                </div>
                <span className="text-[10px] font-bold text-slate-300 tracking-[0.2em] uppercase mt-0.5">
                  Academy
                </span>
              </div>
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              We offer world-class educational programs, practical skill masterclasses, and globally accredited degree pathways.
            </p>

            {/* Contact Items */}
            <div className="space-y-3.5 pt-1">
              {/* Phone */}
              <a
                href="tel:+919144288641"
                className="flex items-center gap-3 group text-sm text-slate-200 hover:text-[#FDA31B] transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#FDA31B] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4 fill-white/20" />
                </div>
                <span className="font-semibold">+91 91442 88641</span>
              </a>

              {/* Email */}
              <a
                href="mailto:skillauraacademy.in@gmail.com"
                className="flex items-center gap-3 group text-sm text-slate-200 hover:text-[#FDA31B] transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#FDA31B] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-semibold">skillauraacademy.in@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-yantramanav)]">
                Quick Links
              </h3>
              {/* Double Color Underline Bar */}
              <div className="flex items-center h-0.5 w-14">
                <span className="bg-[#FDA31B] h-full w-7"></span>
                <span className="bg-slate-600 h-full w-7"></span>
              </div>
            </div>

            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Top Courses", href: "#courses" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-[#FDA31B] font-medium transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#FDA31B] group-hover:translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Courses (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-5">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-yantramanav)]">
                Our Courses
              </h3>
              <div className="flex items-center h-0.5 w-14">
                <span className="bg-[#FDA31B] h-full w-7"></span>
                <span className="bg-slate-600 h-full w-7"></span>
              </div>
            </div>

            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Video Editing Mastery", href: "/courses/1" },
                { label: "Poster & Logo Design", href: "/courses/2" },
                { label: "Content Creation Mastery", href: "/courses/3" },
                { label: "Knowledge Mastery", href: "/courses/4" },
                { label: "Business Mastery", href: "/courses/5" },
                { label: "Facebook Ads Mastery", href: "/courses/6" },
                { label: "Google Ads Mastery", href: "/courses/7" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-[#FDA31B] font-medium transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#FDA31B] group-hover:translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-5">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-yantramanav)]">
                Newsletter
              </h3>
              <div className="flex items-center h-0.5 w-14">
                <span className="bg-[#FDA31B] h-full w-7"></span>
                <span className="bg-slate-600 h-full w-7"></span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Subscribe Our Newsletter To Get Latest Update And News
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  required
                  className="w-full bg-white text-slate-800 placeholder-slate-400 font-medium px-4 py-3.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FDA31B] text-sm shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FDA31B] hover:bg-[#116E63] text-white font-extrabold text-xs tracking-wider uppercase py-2.5 px-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
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
        <div className="border-t border-white/10 pt-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-sm sm:text-base text-slate-300 text-center lg:text-left">
          {/* Left: Copyright */}
          <p className="font-normal">
            © Copyright 2026{" "}
            <span className="text-[#FDA31B] font-bold">Skill Aura Academy</span>.{" "}
            All Rights Reserved.
          </p>

          {/* Center: Developed by TechShift Technology */}
          <p className="font-normal text-center">
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

          {/* Right: Social Icons Rounded White Buttons */}
          <div className="flex items-center justify-center gap-2.5">
            <a
              href="https://www.facebook.com/share/1EQZ7zHQaZ/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-lg bg-white text-[#012758] flex items-center justify-center hover:bg-[#FDA31B] hover:text-white transition-all duration-200 shadow-sm"
            >
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/skillaura.academy_?stkn=c3N5eW1uamp1bndu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-lg bg-white text-[#012758] flex items-center justify-center hover:bg-[#FDA31B] hover:text-white transition-all duration-200 shadow-sm"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href="https://whatsapp.com/channel/0029Vb8yz5uG8l55QwjXzE0w"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Channel"
              className="w-9 h-9 rounded-lg bg-white text-[#012758] flex items-center justify-center hover:bg-[#FDA31B] hover:text-white transition-all duration-200 shadow-sm"
            >
              <FaWhatsapp className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
