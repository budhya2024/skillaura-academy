"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
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
  LogIn,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa6";
import { getCmsData, CMS_UPDATE_EVENT, WebsiteCmsData, DEFAULT_CMS_DATA } from "../../lib/cmsData";

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
      { label: "Video Editing Mastery", href: "/courses/1" },
      { label: "Poster & Logo Design", href: "/courses/2" },
      { label: "Content Creation Mastery", href: "/courses/3" },
      { label: "Knowledge Mastery", href: "/courses/4" },
      { label: "Business Mastery", href: "/courses/5" },
      { label: "Facebook Ads Mastery", href: "/courses/6" },
      { label: "Google Ads Mastery", href: "/courses/7" },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

export default function Header() {
  const [cms, setCms] = useState<WebsiteCmsData>(DEFAULT_CMS_DATA);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setCms(getCmsData());
    const handleUpdate = () => {
      setCms(getCmsData());
    };
    window.addEventListener(CMS_UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(CMS_UPDATE_EVENT, handleUpdate);
  }, []);

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
    // Ensure public website pages remain strictly in clean light mode
    document.documentElement.classList.remove("dark");

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
    <header className="sticky top-0 z-[60] w-full font-sans bg-white shadow-xs border-b border-slate-100">
      {/* ================= TOP BAR (Desktop Only) ================= */}
      <div
        className={`hidden md:block w-full bg-[#116E63] text-white text-xs sm:text-sm transition-all duration-300 overflow-hidden ${
          isScrolled
            ? "max-h-0 opacity-0 py-0 border-none"
            : "max-h-12 opacity-100 py-2 border-b border-white/10"
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Left Section: Social Media Follow */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-extrabold text-white tracking-wider text-xs uppercase font-[family-name:var(--font-yantramanav)]">
              Follow Us:
            </span>
            <div className="flex items-center gap-2">
              <a
                href={cms.contactInfo.facebookUrl || "https://www.facebook.com/share/1EQZ7zHQaZ/"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#FDA31B] text-white flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>
              <a
                href={cms.contactInfo.instagramUrl || "https://www.instagram.com/skillaura.academy_?stkn=c3N5eW1uamp1bndu"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#FDA31B] text-white flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <FaInstagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={cms.contactInfo.telegramUrl || "https://whatsapp.com/channel/0029Vb8yz5uG8l55QwjXzE0w"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Channel"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#FDA31B] text-white flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <FaWhatsapp className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Section: Contact Info Bar */}
          <div className="flex items-center justify-end gap-6 text-white font-medium text-xs sm:text-sm whitespace-nowrap">
            {/* Email */}
            <a
              href={`mailto:${cms.contactInfo.supportEmail || "skillauraacademy.in@gmail.com"}`}
              className="flex items-center gap-2 group hover:text-[#FDA31B] transition-colors"
            >
              <Mail className="w-5 h-5 text-[#FDA31B] shrink-0" />
              <span>{cms.contactInfo.supportEmail || "skillauraacademy.in@gmail.com"}</span>
            </a>

            <span className="text-white/30 h-4 border-r border-white/20"></span>

            {/* Phone */}
            <a
              href={`tel:${cms.contactInfo.supportPhone || "+919144288641"}`}
              className="flex items-center gap-2 group hover:text-[#FDA31B] transition-colors"
            >
              <Phone className="w-5 h-5 text-[#FDA31B] shrink-0" />
              <span>{cms.contactInfo.supportPhone || "+91 91442 88641"}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <div className="w-full bg-white">
        <div className="container h-16 sm:h-20 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center group py-1">
            <Image
              src="/images/brand-logo.png"
              alt="Skill Aura Academy Logo"
              width={200}
              height={55}
              className="h-8 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
              priority
            />
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

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#19232B] hover:text-[#116E63] transition-colors rounded-full hover:bg-slate-100 cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Single Login Button: Icon-only on mobile, Icon + Text on sm+ */}
            <Link
              href="/login"
              className="flex items-center justify-center gap-1.5 bg-[#116E63] hover:bg-[#0c5c53] text-white font-bold text-xs sm:text-sm w-9 h-9 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-full transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer"
              aria-label="Login"
              title="Login"
            >
              <LogIn className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Login</span>
            </Link>

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
              className="flex items-center"
            >
              <Image
                src="/images/brand-logo.png"
                alt="Skill Aura Academy Logo"
                width={160}
                height={45}
                className="h-9 w-auto object-contain"
              />
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

            {/* Mobile Login Button */}
            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-[#116E63] hover:bg-[#0c5c53] text-white py-2.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
