"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SuperAdminSidebar, { SuperAdminTab } from "./SuperAdminSidebar";
import SuperAdminOverview from "./SuperAdminOverview";
import SuperAdminCoursesManager from "./SuperAdminCoursesManager";
import SuperAdminStudentsManager from "./SuperAdminStudentsManager";
import SuperAdminPayoutsManager from "./SuperAdminPayoutsManager";
import SuperAdminCMS from "./SuperAdminCMS";
import SuperAdminKYCManager from "./SuperAdminKYCManager";
import SuperAdminProfileSettings from "./SuperAdminProfileSettings";
import SuperAdminNotificationDropdown from "./SuperAdminNotificationDropdown";
import { ENROLLED_COURSES_DATA } from "../../lib/coursesData";
import { MOCK_DOWNLINE_LIST, MOCK_PAYOUTS } from "../../lib/networkData";
import { getKycRecords } from "../../lib/kycData";
import ThemeToggle from "../shared/ThemeToggle";
import {
  Menu,
  ShieldCheck,
  Bell,
  Search,
  Wallet,
  Megaphone,
} from "lucide-react";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState<SuperAdminTab>("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [pendingKycCount, setPendingKycCount] = useState(4);

  useEffect(() => {
    const updateCount = () => {
      const records = getKycRecords();
      setPendingKycCount(records.filter((k) => k.status === "pending").length);
    };

    updateCount();
    window.addEventListener("skillaura_kyc_updated", updateCount);
    window.addEventListener("storage", updateCount);
    return () => {
      window.removeEventListener("skillaura_kyc_updated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  const pendingPayoutCount = MOCK_PAYOUTS.filter((p) => p.status === "pending").length;
  const totalStudents = MOCK_DOWNLINE_LIST.length;
  const totalCourses = ENROLLED_COURSES_DATA.length;

  const getTabTitle = () => {
    switch (activeTab) {
      case "courses":
        return "Courses & Video Lesson Studio";
      case "students":
        return "Student Database & Referral Roster";
      case "kyc":
        return "KYC & Identity Verification Console";
      case "payouts":
        return "Payout Approvals & Banking Disbursements";
      case "cms":
        return "Website Announcements & CMS";
      case "profile":
        return "Admin Profile & Security Settings";
      case "overview":
      default:
        return "Dashboard";
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
        pendingKycCount={pendingKycCount}
      />

      {/* 2. Main Workspace (Offset for Left Sidebar with lg:pl-64) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 min-h-screen">
        {/* Top Header - Not Fixed / Static Flow */}
        <header className="h-14 sm:h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0 rounded-[4px]"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2 truncate">
                <h1 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)] truncate">
                  {getTabTitle()}
                </h1>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 hidden md:block font-medium">
                Skill Aura Academy Master Control &amp; Central Operations Hub
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Theme Toggle (Dark / Light) */}
            <ThemeToggle className="border border-slate-200 dark:border-slate-700" />

            {/* Notifications Dropdown (Shows quantity, direct links, no approve/disapprove, supports deleting individual notifications) */}
            <SuperAdminNotificationDropdown onNavigate={(tab) => setActiveTab(tab)} />

            {/* Admin Profile Avatar Shortcut (Clean, Super Admin text hidden) */}
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800 cursor-pointer hover:opacity-85 transition-all text-left rounded-[4px] p-1 ${
                activeTab === "profile"
                  ? "bg-[#116E63]/10 dark:bg-[#116E63]/25 ring-1 ring-[#116E63]/40"
                  : ""
              }`}
              title="Manage profile, password & security settings"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-amber-500 shrink-0 bg-slate-100 dark:bg-slate-800 relative">
                <Image
                  src="/images/founder.jpeg"
                  alt="Admin"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="hidden md:block text-left text-xs">
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block leading-tight">
                  Settings
                </span>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-medium">
                  Root
                </span>
              </div>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-3 sm:p-5 lg:p-6 space-y-4 flex-1 pb-16">
          {activeTab === "overview" && (
            <SuperAdminOverview
              onNavigate={setActiveTab}
              pendingPayoutCount={pendingPayoutCount}
              pendingKycCount={pendingKycCount}
              totalStudents={totalStudents}
              totalCourses={totalCourses}
            />
          )}

          {activeTab === "courses" && <SuperAdminCoursesManager />}

          {activeTab === "students" && <SuperAdminStudentsManager />}

          {activeTab === "kyc" && <SuperAdminKYCManager />}

          {activeTab === "payouts" && <SuperAdminPayoutsManager />}

          {activeTab === "cms" && <SuperAdminCMS />}

          {activeTab === "profile" && <SuperAdminProfileSettings />}
        </main>
      </div>
    </div>
  );
}