"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  User,
  Trophy,
  Users,
  Wallet,
  Share2,
  Settings,
  LogOut,
  X,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { AdminTab } from "./AdminDashboard";

interface AdminSidebarProps {
  activeTab: AdminTab | "courses";
  setActiveTab?: (tab: AdminTab) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const NAV_ITEMS = [
  {
    id: "overview",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "courses",
    label: "My Courses",
    icon: GraduationCap,
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "leaderboard",
    label: "Leaderboard",
    icon: Trophy,
  },
  {
    id: "downline",
    label: "Direct Team Members",
    icon: Users,
  },
  {
    id: "commissions",
    label: "Active Income & Payouts",
    icon: Wallet,
  },
  {
    id: "marketing",
    label: "Referral & Promo Tools",
    icon: Share2,
  },
  {
    id: "settings",
    label: "Account Settings",
    icon: Settings,
  },
];

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
}: AdminSidebarProps) {
  const handleItemClick = (id: string) => {
    setIsMobileOpen(false);
    if (setActiveTab) {
      setActiveTab(id as AdminTab);
    } else {
      window.location.href = `/admin?tab=${id}`;
    }
  };

  const renderNavContent = () => (
    <>
      <div className="flex flex-col min-h-0 flex-1">
        {/* Logo Branding */}
        <div className="h-16 flex items-center px-4 border-b border-slate-200 shrink-0 bg-white">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[4px] bg-[#116E63] text-white flex items-center justify-center font-bold font-[family-name:var(--font-yantramanav)] text-sm shadow-xs">
              SA
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-wider text-sm block font-[family-name:var(--font-yantramanav)] uppercase">
                Skill Aura
              </span>
              <span className="text-[10px] text-slate-500 font-mono tracking-tight block -mt-1 font-semibold">
                Student &amp; Affiliate Hub
              </span>
            </div>
          </Link>
        </div>

        {/* User Card */}
        <div
          onClick={() => handleItemClick("profile")}
          className={`p-3 mx-3 my-3 border transition-all cursor-pointer rounded-[4px] shrink-0 ${
            activeTab === "profile"
              ? "bg-[#116E63]/5 border-[#116E63]/30"
              : "bg-slate-50 border-slate-200 hover:border-slate-300"
          }`}
          title="View & Edit Profile"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 relative overflow-hidden rounded-full border border-slate-200 shrink-0 bg-slate-100 shadow-xs">
              <Image
                src="/images/founder.jpeg"
                alt="SkillAura Master"
                width={44}
                height={44}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-sm text-slate-900 truncate uppercase tracking-wider">
                SkillAura Student
              </h4>
              <div className="text-xs font-mono text-slate-500 font-medium truncate mt-0.5">
                SKA-ROOT88 &bull; Student
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-1 space-y-1 overflow-y-auto">
          <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            Main Menu
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-[calc(100%-16px)] mx-2 flex items-center gap-3 px-3.5 py-2.5 sm:py-3 text-sm font-semibold transition-colors cursor-pointer rounded-[4px] ${
                  isActive
                    ? "bg-[#116E63]/10 text-[#116E63] font-bold"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive ? "text-[#116E63]" : "text-slate-500"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions with Bottom Logout Button */}
      <div className="p-3 border-t border-slate-100 space-y-2 bg-slate-50/50 shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3.5 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors rounded-[4px]"
        >
          <BookOpen className="w-4.5 h-4.5 text-slate-500" />
          <span>Academy Main Site</span>
        </Link>
        <button
          onClick={() => {
            if (confirm("Are you sure you want to log out?")) {
              window.location.href = "/login";
            }
          }}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-[4px]"
        >
          <LogOut className="w-4.5 h-4.5 text-rose-600" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col shrink-0 fixed inset-y-0 left-0 z-30 shadow-xs h-screen overflow-y-auto">
        {renderNavContent()}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] bg-white text-slate-800 flex flex-col h-full z-50 shadow-2xl border-r border-slate-200 justify-between overflow-y-auto animate-in slide-in-from-left duration-250">
            {renderNavContent()}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-[4px] cursor-pointer"
              aria-label="Close navigation drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
