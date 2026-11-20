"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Wallet,
  Settings,
  Megaphone,
  ShieldCheck,
  LogOut,
  ExternalLink,
  ChevronRight,
  X,
} from "lucide-react";

export type SuperAdminTab = "overview" | "courses" | "students" | "kyc" | "payouts" | "cms";

interface SuperAdminSidebarProps {
  activeTab: SuperAdminTab;
  setActiveTab: (tab: SuperAdminTab) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  pendingPayoutCount?: number;
  pendingKycCount?: number;
}

export const SUPER_ADMIN_NAV_ITEMS = [
  {
    id: "overview" as SuperAdminTab,
    label: "Executive Overview",
    icon: LayoutDashboard,
  },
  {
    id: "courses" as SuperAdminTab,
    label: "Courses & Video Lessons",
    icon: BookOpen,
  },
  {
    id: "students" as SuperAdminTab,
    label: "Student Database",
    icon: Users,
  },
  {
    id: "kyc" as SuperAdminTab,
    label: "KYC Verifications",
    icon: ShieldCheck,
  },
  {
    id: "payouts" as SuperAdminTab,
    label: "Payout Approvals",
    icon: Wallet,
  },
  {
    id: "cms" as SuperAdminTab,
    label: "Website & Banner CMS",
    icon: Megaphone,
  },
];

export default function SuperAdminSidebar({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
  pendingPayoutCount = 2,
  pendingKycCount = 3,
}: SuperAdminSidebarProps) {
  const handleTabClick = (tab: SuperAdminTab) => {
    setActiveTab(tab);
    setIsMobileOpen(false);
  };

  const navContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-sans">
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900">
        <Link href="/super-admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[4px] bg-[#116E63] text-white flex items-center justify-center font-bold font-[family-name:var(--font-yantramanav)] text-sm shadow-xs">
            SA
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 dark:text-white tracking-wider text-sm block font-[family-name:var(--font-yantramanav)] uppercase">
                Skill Aura
              </span>
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase">
                Super Admin
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-tight block -mt-1 font-semibold">
              Platform Master Console
            </span>
          </div>
        </Link>
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-[4px] cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Super Admin User Profile Card - Identical to Student Dashboard */}
      <div className="p-3 mx-3 my-3 border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 rounded-[4px] shrink-0 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 relative overflow-hidden rounded-full border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-800 shadow-xs">
            <Image
              src="/images/founder.jpeg"
              alt="Super Admin"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate uppercase tracking-wider">
                System Admin
              </h4>
              <ShieldCheck className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400 shrink-0" />
            </div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
              superadmin@skillaura.in
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links - Matching Student Admin font size, padding, and colors */}
      <nav className="flex-1 py-1 space-y-1 overflow-y-auto">
        <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Management Controls
        </div>
        {SUPER_ADMIN_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-[calc(100%-16px)] mx-2 flex items-center justify-between px-3.5 py-2.5 sm:py-3 text-sm font-semibold transition-colors cursor-pointer rounded-[4px] ${
                isActive
                  ? "bg-[#116E63]/10 dark:bg-[#116E63]/25 text-[#116E63] dark:text-emerald-400 font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive
                      ? "text-[#116E63] dark:text-emerald-400"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.id === "payouts" && pendingPayoutCount > 0 && (
                <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
                  ({pendingPayoutCount})
                </span>
              )}
              {item.id === "kyc" && pendingKycCount !== undefined && pendingKycCount > 0 && (
                <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
                  ({pendingKycCount})
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-4 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Quick Portals
        </div>
        <Link
          href="/admin"
          target="_blank"
          className="w-[calc(100%-16px)] mx-2 flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-[4px] transition-colors"
        >
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-[#116E63] dark:text-emerald-400" />
            <span>Student Dashboard</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>
        <Link
          href="/"
          target="_blank"
          className="w-[calc(100%-16px)] mx-2 flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-[4px] transition-colors"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#FDA31B]" />
            <span>Public Website</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>
      </nav>

      {/* Footer System Status */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium">Platform v2.4 Live</span>
          </span>
          <span className="font-mono text-slate-400 text-[11px]">SSL Secure</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (Fixed 64 = 16rem = 256px) */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 z-30 shadow-xs">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileOpen(false)}
          ></div>
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}
