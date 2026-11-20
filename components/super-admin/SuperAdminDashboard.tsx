"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SuperAdminSidebar, { SuperAdminTab } from "./SuperAdminSidebar";
import SuperAdminOverview from "./SuperAdminOverview";
import SuperAdminCoursesManager from "./SuperAdminCoursesManager";
import SuperAdminStudentsManager from "./SuperAdminStudentsManager";
import SuperAdminPayoutsManager from "./SuperAdminPayoutsManager";
import SuperAdminCMS from "./SuperAdminCMS";
import { ENROLLED_COURSES_DATA } from "../../lib/coursesData";
import { MOCK_DOWNLINE_LIST, MOCK_PAYOUTS } from "../../lib/networkData";
import ThemeToggle from "../shared/ThemeToggle";
import {
  Menu,
  ShieldCheck,
  Bell,
  Search,
  ExternalLink,
  BookOpen,
  Users,
  Wallet,
  Megaphone,
} from "lucide-react";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState<SuperAdminTab>("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const pendingPayoutCount = MOCK_PAYOUTS.filter((p) => p.status === "pending").length;
  const totalStudents = MOCK_DOWNLINE_LIST.length;
  const totalCourses = ENROLLED_COURSES_DATA.length;

  const getTabTitle = () => {
    switch (activeTab) {
      case "courses":
        return "Courses & Video Lesson Studio";
      case "students":
        return "Student Database & KYC Registry";
      case "payouts":
        return "Payout Approvals & Banking Disbursements";
      case "cms":
        return "Website Announcements & CMS";
      default:
        return "Super Admin Command Center";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex text-slate-800 dark:text-slate-100 font-sans">
      {/* 1. Super Admin Sidebar */}
      <SuperAdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
        pendingPayoutCount={pendingPayoutCount}
      />

      {/* 2. Main Workspace (Offset for Left Sidebar with lg:pl-64) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 min-h-screen">
        {/* Top Header - Fixed & Sticky */}
        <header className="h-14 sm:h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0 rounded-[4px]"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[10px] font-bold bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded-[3px] uppercase shrink-0 hidden sm:inline">
                Master Admin
              </span>
              <h1 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)] truncate">
                {getTabTitle()}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Link to Student Panel */}
            <Link
              href="/admin"
              target="_blank"
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-[#116E63] dark:text-emerald-400 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800 rounded-[4px] transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Student Panel</span>
              <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-500" />
            </Link>

            {/* Quick Link to Website */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-[4px] transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Website</span>
              <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-500" />
            </Link>

            {/* Theme Toggle (Dark / Light) */}
            <ThemeToggle className="border border-slate-200 dark:border-slate-700" />

            {/* Notifications */}
            <button
              onClick={() => setActiveTab("payouts")}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-[4px] cursor-pointer"
              title="Payouts Awaiting Approval"
            >
              <Bell className="w-4 h-4" />
              {pendingPayoutCount > 0 && (
                <span className="w-2 h-2 bg-amber-500 absolute top-1 right-1 rounded-full animate-ping"></span>
              )}
            </button>

            {/* Super Admin User Profile Tag */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-amber-500 shrink-0 bg-slate-100 dark:bg-slate-800 relative">
                <Image
                  src="/images/founder.jpeg"
                  alt="Super Admin"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="hidden md:block text-left text-xs">
                <span className="font-bold text-slate-900 dark:text-white block leading-tight">
                  Super Admin
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  Root Authority
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-3 sm:p-5 lg:p-6 space-y-4 flex-1 pb-16">
          {activeTab === "overview" && (
            <SuperAdminOverview
              onNavigate={setActiveTab}
              pendingPayoutCount={pendingPayoutCount}
              totalStudents={totalStudents}
              totalCourses={totalCourses}
            />
          )}

          {activeTab === "courses" && <SuperAdminCoursesManager />}

          {activeTab === "students" && <SuperAdminStudentsManager />}

          {activeTab === "payouts" && <SuperAdminPayoutsManager />}

          {activeTab === "cms" && <SuperAdminCMS />}
        </main>
      </div>
    </div>
  );
}