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

export type SuperAdminTab = "overview" | "courses" | "students" | "payouts" | "cms";

interface SuperAdminSidebarProps {
  activeTab: SuperAdminTab;
  setActiveTab: (tab: SuperAdminTab) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  pendingPayoutCount?: number;
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
}: SuperAdminSidebarProps) {
  const handleTabClick = (tab: SuperAdminTab) => {
    setActiveTab(tab);
    setIsMobileOpen(false);
  };

  const navContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200">
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800 shrink-0 bg-slate-950">
        <Link href="/super-admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[4px] bg-[#116E63] text-white flex items-center justify-center font-bold text-sm shadow-xs border border-teal-500/30">
            SA
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-sm uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                Skill Aura
              </span>
              <span className="text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1 py-0.2 rounded-[2px] uppercase">
                Super Admin
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block -mt-0.5">
              Platform Master Console
            </span>
          </div>
        </Link>
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-[4px]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Super Admin Badge Profile */}
      <div className="p-3 mx-3 my-3 bg-slate-800/80 border border-slate-700/60 rounded-[4px]">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400 shrink-0 bg-slate-700">
            <Image
              src="/images/founder.jpeg"
              alt="Super Admin"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs text-white truncate uppercase">
                System Administrator
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </div>
            <span className="text-[10px] text-slate-400 font-mono block">
              superadmin@skillaura.in
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-1 space-y-1 px-2 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Management Controls
        </div>
        {SUPER_ADMIN_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#116E63] text-white shadow-sm font-bold"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.id === "payouts" && pendingPayoutCount > 0 && (
                <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-[3px] ml-1">
                  {pendingPayoutCount}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-4 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          External Quick Portals
        </div>
        <Link
          href="/admin"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-[4px] text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Users className="w-3.5 h-3.5 text-teal-400" />
            <span>Student Dashboard</span>
          </div>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </Link>
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-[4px] text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Public Website</span>
          </div>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </Link>
      </nav>

      {/* Footer System Status */}
      <div className="p-3 border-t border-slate-800 text-[10px] text-slate-400 bg-slate-950">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Platform v2.4 Live</span>
          </span>
          <span className="font-mono text-slate-400">SSL Secure</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (Fixed 64 = 16rem = 256px) */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 z-30 shadow-md">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
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