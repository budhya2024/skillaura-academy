"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Search,
  Pencil,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";

import HeaderSearch from "./HeaderSearch";
import EnrollModal from "./EnrollModal";

export interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Course",
    href: "#courses",
    dropdown: [
      { label: "AI Mastery", href: "/courses/1" },
      { label: "Poster & Logo Design Mastery", href: "/courses/2" },
      { label: "Attraction Mastery", href: "/courses/3" },
      { label: "Content Creation Mastery", href: "/courses/4" },
      { label: "Video Editing Mastery", href: "/courses/5" },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    onComplete?: () => void
  ) => {
    if (href.includes("#courses")) {
      if (window.location.pathname === "/") {
        e.preventDefault();
        const target = document.getElementById("courses");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    if (onComplete) onComplete();
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full font-sans border-b border-slate-100 relative z-[60]">
      {/* ================= TOP BAR (Desktop Only) ================= */}
      <div className="hidden md:block w-full bg-[#116E63] text-white text-xs sm:text-sm border-b border-white/10">
        <div className="container flex items-center justify-between py-2">
          {/* Left Section: Social Media Follow */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-extrabold text-white tracking-wider text-xs uppercase font-[family-name:var(--font-yantramanav)]">
              Follow Us:
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/share/1Jraz1G15N/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#FDA31B] text-white flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#FDA31B] text-white flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <FaInstagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#FDA31B] text-white flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <FaYoutube className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/919144288641"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#FDA31B] text-white flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <FaWhatsapp className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Section: Contact Info Bar */}
          <div className="flex items-center justify-end gap-6 text-white font-medium text-xs sm:text-sm whitespace-nowrap">
            {/* Address */}
            <div className="flex items-center gap-2 group cursor-pointer hover:text-[#FDA31B] transition-colors">
              <MapPin className="w-5 h-5 text-[#FDA31B] shrink-0" />
              <span>TechShift Tower, HSR Layout, Bengaluru</span>
            </div>

            <span className="text-white/30 h-4 border-r border-white/20"></span>

            {/* Email */}
            <a
              href="mailto:info@example.com"
              className="flex items-center gap-2 group hover:text-[#FDA31B] transition-colors"
            >
              <Mail className="w-5 h-5 text-[#FDA31B] shrink-0" />
              <span>info@example.com</span>
            </a>

            <span className="text-white/30 h-4 border-r border-white/20"></span>

            {/* Phone */}
            <a
              href="tel:+919144288641"
              className="flex items-center gap-2 group hover:text-[#FDA31B] transition-colors"
            >
              <Phone className="w-5 h-5 text-[#FDA31B] shrink-0" />
              <span>+91 91442 88641</span>
            </a>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <div
        className={`w-full bg-white transition-all duration-300 ${isScrolled
          ? "fixed top-0 left-0 right-0 shadow-lg z-[60] animate-in slide-in-from-top-4"
          : "relative shadow-sm"
          }`}
      >
        <div className="container h-20 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center">
              {/* Logo Icon Graphic */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#116E63] to-[#189b8b] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
                <BookOpen className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FDA31B] rounded-full border-2 border-white"></span>
              </div>
            </div>
            {/* Logo Text: Skill Aura Academy */}
            <div className="flex flex-col leading-none font-[family-name:var(--font-yantramanav)]">
              <div className="flex items-baseline font-black tracking-tight text-2xl sm:text-3xl">
                <span className="text-[#116E63]">Skill</span>
                <span className="text-[#FDA31B]">Aura</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#757F95] tracking-[0.2em] uppercase mt-0.5">
                Academy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative group py-6 px-3"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="flex items-center gap-1.5 text-[15px] font-bold text-[#19232B] hover:text-[#116E63] transition-colors"
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown className="w-5 h-5 text-slate-500 group-hover:text-[#116E63] group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#116E63] hover:bg-slate-50 transition-colors"
                      >
                        <span>{subItem.label}</span>
                        <ChevronRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FDA31B]" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action Icons & Apply Button */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#19232B] hover:text-[#116E63] transition-colors rounded-full hover:bg-slate-100"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* ENROLL NOW Button */}
            <button
              onClick={() => setIsEnrollModalOpen(true)}
              className="hidden sm:flex items-center gap-2.5 bg-[#FDA31B] hover:bg-[#116E63] text-white font-bold text-sm tracking-wider uppercase px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <GraduationCap className="w-5 h-5 fill-white/20 stroke-[2.5]" />
              <span>ENROLL NOW</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#19232B] hover:text-[#116E63] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Search Overlay Input Bar */}
        <HeaderSearch
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </div>

      {/* Enroll Modal Popup */}
      <EnrollModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />

      {/* ================= MOBILE NAVIGATION DRAWER ================= */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[200] flex flex-col bg-white animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex flex-col leading-none font-[family-name:var(--font-yantramanav)]"
            >
              <div className="flex items-baseline font-black tracking-tight text-xl">
                <span className="text-[#116E63]">Skill</span>
                <span className="text-[#FDA31B]">Aura</span>
              </div>
              <span className="text-[9px] font-bold text-[#757F95] tracking-[0.2em] uppercase mt-0.5">
                Academy
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Menu Items */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between font-bold text-[#19232B] text-lg py-1">
                  <Link
                    href={item.href}
                    onClick={(e) =>
                      handleSmoothScroll(e, item.href, () =>
                        setIsMobileMenuOpen(false)
                      )
                    }
                    className="flex-1 text-[#19232B] hover:text-[#116E63] cursor-pointer"
                  >
                    {item.label}
                  </Link>

                  {item.dropdown && (
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.label ? null : item.label
                        )
                      }
                      className="p-1 text-slate-400 hover:text-[#116E63] cursor-pointer"
                      aria-label={`Toggle ${item.label} dropdown`}
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${activeDropdown === item.label ? "rotate-180 text-[#116E63]" : ""
                          }`}
                      />
                    </button>
                  )}
                </div>

                {item.dropdown && activeDropdown === item.label && (
                  <div className="mt-2 ml-4 space-y-2 border-l-2 border-[#FDA31B] pl-3">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-[#757F95] hover:text-[#116E63] font-medium py-1 text-sm cursor-pointer"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Enroll Now Button */}
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsEnrollModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#FDA31B] hover:bg-[#e6900f] text-white font-bold text-base uppercase py-3.5 rounded-full shadow-md cursor-pointer"
              >
                <GraduationCap className="w-5 h-5 fill-white/20 stroke-[2.5]" />
                <span>ENROLL NOW</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
