"use client";

import React, { useState, useEffect } from "react";
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
  Bell,
  Search,
  Copy,
  Check,
  TrendingUp,
  Award,
  Layers,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Activity,
  ArrowDownRight,
  MoreHorizontal,
  GraduationCap,
} from "lucide-react";

import DownlineTable from "./DownlineTable";
import CommissionPlanSection from "./CommissionPlanSection";
import LeaderboardSection from "./LeaderboardSection";
import ProfileSection from "./ProfileSection";
import PromoToolsSection from "./PromoToolsSection";
import MyCoursesSection from "./MyCoursesSection";
import AdminSidebar from "./AdminSidebar";

export type AdminTab =
  | "overview"
  | "courses"
  | "profile"
  | "leaderboard"
  | "downline"
  | "commissions"
  | "marketing"
  | "settings";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [copiedLink, setCopiedLink] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as AdminTab;
      if (
        tabParam &&
        [
          "overview",
          "courses",
          "profile",
          "leaderboard",
          "downline",
          "commissions",
          "marketing",
          "settings",
        ].includes(tabParam)
      ) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const referralUrl = "https://skillauraacademy.in/register?ref=SKA-ROOT88";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const navItems = [
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
      label: "Active Plan Rules",
      icon: Settings,
    },
  ];

  const getPageTitle = () => {
    switch (activeTab) {
      case "courses":
        return "My Enrolled Courses & Learning Hub";
      case "profile":
        return "Member Profile & Account Identification";
      case "leaderboard":
        return "Network Leaderboard & Top Earners";
      case "downline":
        return "Direct Team Members & Active Sales Roster";
      case "commissions":
        return "Active Direct Income & Settlement Queue";
      case "marketing":
        return "Referral Links & Promotional Kit";
      case "settings":
        return "Active Commission Rules & Direct Payout Terms";
      default:
        return "Active Income Command Station";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans">
      {/* ================= SHARED ADMIN SIDEBAR (Desktop Fixed & Mobile Drawer) ================= */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 overflow-y-auto min-h-screen">
        {/* Top Header */}
        <header className="h-14 sm:h-16 bg-white border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 cursor-pointer shrink-0 rounded-[4px]"
              aria-label="Open navigation drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 truncate">

                <h1 className="text-xs sm:text-base font-bold text-slate-900 uppercase tracking-wider font-[family-name:var(--font-yantramanav)] truncate">
                  {getPageTitle()}
                </h1>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 hidden md:block font-medium">
                Skill Aura Academy Direct Sales &amp; Active Income Center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">


            {/* Notifications */}
            <button
              onClick={() =>
                alert("Live Alert: ₹3,250 Active Direct Commission credited for Business Mastery sale!")
              }
              className="p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 relative cursor-pointer rounded-[4px]"
              title="Alerts"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 bg-rose-500 absolute top-1 right-1 rounded-full"></span>
            </button>

            {/* Profile Avatar Shortcut */}
            <div
              onClick={() => setActiveTab("profile")}
              className="flex items-center gap-2 pl-2 sm:pl-3 cursor-pointer hover:opacity-85 transition-opacity"
              title="View Profile"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 relative overflow-hidden rounded-full border border-slate-200 shrink-0 bg-slate-100">
                <Image
                  src="/images/founder.jpeg"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="hidden md:block text-left text-xs">
                <span className="font-bold text-slate-900 block leading-tight">
                  Super Admin
                </span>
                <span className="text-[10px] font-mono text-slate-500 font-medium">
                  SKA-ROOT88
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="p-3 sm:p-6 space-y-4 sm:space-y-5 flex-1 pb-24 lg:pb-8">
          {/* TAB 1: OVERVIEW / DASHBOARD (Streamlined Light Version, Extra Content Hidden) */}
          {activeTab === "overview" && (
            <div className="space-y-4 sm:space-y-5">
              {/* Executive Welcome Card (Light Version) */}
              <div className="bg-white border border-slate-200 p-4 sm:p-5 shadow-xs rounded-[4px]">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-slate-100 text-slate-700 font-bold text-[10px] px-2 py-0.5 uppercase tracking-wider rounded-[4px] border border-slate-200">
                        Direct Partner
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        ID: <strong className="text-slate-800">SKA-ROOT88</strong>
                      </span>
                      <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5" /> 100% Active Direct Income
                      </span>
                    </div>
                    <h2 className="text-base sm:text-xl font-bold text-slate-900 uppercase tracking-wide font-[family-name:var(--font-yantramanav)]">
                      Welcome back, SkillAura Master
                    </h2>
                    <p className="text-xs text-slate-500 max-w-xl">
                      Monitor your personal direct course sales, milestone progress, and available wallet balance.
                    </p>
                  </div>

                  {/* Referral Link Quick Box */}
                  <div className="w-full lg:w-auto lg:min-w-[340px] space-y-1.5 bg-slate-50 p-3 border border-slate-200 rounded-[4px]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                        Your Direct Referral Link
                      </span>
                      <span className="text-[10px] font-bold text-[#116E63] uppercase">
                        65% Commission
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 p-1 rounded-[4px]">
                      <input
                        type="text"
                        readOnly
                        value={referralUrl}
                        className="bg-transparent text-xs text-slate-700 font-mono flex-1 min-w-0 outline-none px-2 truncate py-1"
                      />
                      <button
                        onClick={handleCopyLink}
                        className="bg-[#116E63] hover:bg-[#0c5048] text-white font-bold text-xs px-3 py-1.5 shrink-0 flex items-center justify-center gap-1 transition-colors cursor-pointer uppercase rounded-[4px]"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedLink ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top 4 KPI Cards: Light, Professional, Soft Tones */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                <div className="bg-white border border-slate-200 p-3 sm:p-4 shadow-xs rounded-[4px]">
                  <div className="flex items-center justify-between gap-1 flex-wrap mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Active Income
                    </span>
                    <span className="text-emerald-700 font-semibold text-[10px] bg-emerald-50 px-1.5 py-0.2 border border-emerald-200 uppercase rounded-[4px]">
                      100% Active
                    </span>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-slate-900 font-mono">
                    ₹3,48,500
                  </div>
                  <div className="mt-1 text-[10px] sm:text-[11px] text-emerald-700 font-medium flex items-center gap-1 truncate">
                    <TrendingUp className="w-3 h-3 shrink-0" /> Direct sales revenue
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-3 sm:p-4 shadow-xs rounded-[4px]">
                  <div className="flex items-center justify-between gap-1 flex-wrap mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Direct Students
                    </span>
                    <span className="text-teal-700 font-semibold text-[10px] bg-teal-50 px-1.5 py-0.2 border border-teal-200 uppercase rounded-[4px]">
                      Personal
                    </span>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-slate-900 font-mono">
                    28 Directs
                  </div>
                  <div className="mt-1 text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">
                    Total: <strong className="text-slate-800">118 Sold</strong>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-3 sm:p-4 shadow-xs rounded-[4px]">
                  <div className="flex items-center justify-between gap-1 flex-wrap mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Active Tier
                    </span>
                    <span className="text-amber-700 font-semibold text-[10px] bg-amber-50 px-1.5 py-0.2 border border-amber-200 uppercase rounded-[4px]">
                      Tier 3
                    </span>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-slate-900 font-mono">
                    65% Direct
                  </div>
                  <div className="mt-1 text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">
                    Unlocks 70% at 30 sales
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-3 sm:p-4 shadow-xs rounded-[4px]">
                  <div className="flex items-center justify-between gap-1 flex-wrap mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Wallet Balance
                    </span>
                    <span className="text-blue-700 font-semibold text-[10px] bg-blue-50 px-1.5 py-0.2 border border-blue-200 uppercase rounded-[4px]">
                      Instant
                    </span>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-slate-900 font-mono">
                    ₹48,650
                  </div>
                  <div className="mt-1 text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">
                    Settled: ₹2,99,850
                  </div>
                </div>
              </div>

              {/* Direct Sales Performance & Milestone Tracker */}
              <div className="bg-white border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3 sm:space-y-4 rounded-[4px]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Monthly Active Sales Goal &amp; Milestone Bonus
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Achieve 25 direct personal student enrollments this month to unlock a ₹15,000 cash bonus
                    </p>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 border border-slate-200 self-start sm:self-auto rounded-[4px]">
                    18 / 25 Enrolled (72%)
                  </span>
                </div>

                {/* Direct Sales Highlights (Light Tones) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 space-y-1 rounded-[4px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Personal Sales This Month
                      </span>
                      <span className="text-[10px] font-bold text-[#116E63] bg-teal-50 px-1.5 py-0.2 border border-teal-200 rounded-[4px]">
                        18 Enrollments
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">
                      ₹78,400 Earned
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Average payout: <strong className="text-slate-800">₹4,355 / sale</strong>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 space-y-1 rounded-[4px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Next Milestone Reward
                      </span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 border border-amber-200 rounded-[4px]">
                        Target: 25 Sales
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">
                      +₹15,000 Cash
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Just <strong className="text-slate-800">7 direct sales</strong> away
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 pt-1">
                  <div className="h-2 w-full bg-slate-100 overflow-hidden rounded-[4px]">
                    <div
                      className="bg-[#116E63] h-full transition-all rounded-[4px]"
                      style={{ width: "72%" }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-500 font-mono">
                    <span>18 Completed</span>
                    <span>7 Remaining</span>
                    <span>25 Sales Goal</span>
                  </div>
                </div>
              </div>

              {/* Quick Navigation Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div
                  onClick={() => setActiveTab("courses")}
                  className="bg-white border border-slate-200 hover:border-[#116E63] p-4 rounded-[4px] shadow-xs cursor-pointer transition-colors group flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded-[4px] bg-slate-100 group-hover:bg-[#116E63]/10 text-slate-700 group-hover:text-[#116E63] flex items-center justify-center transition-colors">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 group-hover:text-[#116E63] transition-colors">
                      My Enrolled Courses
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Access training modules, video lessons, and certification.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#116E63] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Go to Courses</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab("leaderboard")}
                  className="bg-white border border-slate-200 hover:border-[#116E63] p-4 rounded-[4px] shadow-xs cursor-pointer transition-colors group flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded-[4px] bg-slate-100 group-hover:bg-[#116E63]/10 text-slate-700 group-hover:text-[#116E63] flex items-center justify-center transition-colors">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 group-hover:text-[#116E63] transition-colors">
                      Network Leaderboard
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Top performers, direct sales rankings, and partner standings.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#116E63] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Rankings</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab("downline")}
                  className="bg-white border border-slate-200 hover:border-[#116E63] p-4 rounded-[4px] shadow-xs cursor-pointer transition-colors group flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded-[4px] bg-slate-100 group-hover:bg-[#116E63]/10 text-slate-700 group-hover:text-[#116E63] flex items-center justify-center transition-colors">
                      <Users className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 group-hover:text-[#116E63] transition-colors">
                      Direct Team Members
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Searchable roster of all 28 direct students and 118 course sales.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#116E63] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Directory</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab("commissions")}
                  className="bg-white border border-slate-200 hover:border-[#116E63] p-4 rounded-[4px] shadow-xs cursor-pointer transition-colors group flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded-[4px] bg-slate-100 group-hover:bg-[#116E63]/10 text-slate-700 group-hover:text-[#116E63] flex items-center justify-center transition-colors">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 group-hover:text-[#116E63] transition-colors">
                      Commissions &amp; Payouts
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Wallet balance of ₹48,650 ready for instant settlement.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#116E63] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Manage Payouts</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {/* TAB: MY COURSES */}
          {activeTab === "courses" && <MyCoursesSection />}

          {/* TAB 2: PROFILE */}
          {activeTab === "profile" && <ProfileSection />}

          {/* TAB 3: LEADERBOARD */}
          {activeTab === "leaderboard" && <LeaderboardSection />}

          {/* TAB 4: DOWNLINE DIRECTORY */}
          {activeTab === "downline" && (
            <div className="space-y-4">
              <DownlineTable />
            </div>
          )}

          {/* TAB 6: COMMISSIONS & PAYOUTS */}
          {activeTab === "commissions" && (
            <div className="space-y-4">
              <CommissionPlanSection />
            </div>
          )}

          {/* TAB 5: MARKETING & PROMO TOOLS (With Commission Chart Underneath) */}
          {activeTab === "marketing" && <PromoToolsSection />}

          {/* TAB 6: PLAN SETTINGS */}
          {activeTab === "settings" && (
            <div className="bg-white border border-slate-200 p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-xs max-w-3xl rounded-[4px]">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                  Active Direct Selling Plan Configuration
                </h3>
                <p className="text-[11px] text-slate-500">
                  Configure direct active payout rules, statutory tax withholdings, and instant settlement limits
                </p>
              </div>

              <div className="space-y-3 text-xs font-semibold text-slate-700">
                <div className="flex items-center justify-between p-3.5 border border-slate-200 bg-slate-50 gap-3 rounded-[4px]">
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                      Instant Direct Commission Credit
                    </span>
                    <span className="text-slate-500 font-normal text-[11px]">
                      Automatically credit 50% - 70% active earnings into partner wallet immediately upon checkout
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-[#116E63] shrink-0"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 border border-slate-200 bg-slate-50 gap-3 rounded-[4px]">
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                      Statutory TDS Deduction (5%)
                    </span>
                    <span className="text-slate-500 font-normal text-[11px]">
                      Deduct standard 5% TDS with quarterly Form 16A generation for active earnings
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-[#116E63] shrink-0"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 border border-slate-200 bg-slate-50 gap-3 rounded-[4px]">
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                      Auto UPI Withdrawal Settlement
                    </span>
                    <span className="text-slate-500 font-normal text-[11px]">
                      Disburse withdrawal requests up to ₹10,000 instantly to verified UPI VPA
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-[#116E63] shrink-0"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ================= STICKY MOBILE BOTTOM NAVIGATION BAR (Light Version) ================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex items-center justify-around py-1.5 px-1 sm:px-2 text-slate-700 shadow-md">
        <button
          onClick={() => setActiveTab("courses")}
          className={`flex flex-col items-center justify-center py-1 px-1.5 sm:px-2.5 transition-colors cursor-pointer rounded-[4px] min-w-0 ${activeTab === "courses"
            ? "text-[#116E63] font-bold"
            : "text-slate-500 hover:text-slate-900"
            }`}
        >
          <GraduationCap className="w-4 h-4 mb-0.5 shrink-0" />
          <span className="text-[10px] uppercase font-bold tracking-wider truncate">Courses</span>
        </button>

        <button
          onClick={() => setActiveTab("overview")}
          className={`flex flex-col items-center justify-center py-1 px-1.5 sm:px-2.5 transition-colors cursor-pointer rounded-[4px] min-w-0 ${activeTab === "overview"
            ? "text-[#116E63] font-bold"
            : "text-slate-500 hover:text-slate-900"
            }`}
        >
          <LayoutDashboard className="w-4 h-4 mb-0.5 shrink-0" />
          <span className="text-[10px] uppercase font-bold tracking-wider truncate">Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`flex flex-col items-center justify-center py-1 px-1.5 sm:px-2.5 transition-colors cursor-pointer rounded-[4px] min-w-0 ${activeTab === "leaderboard"
            ? "text-[#116E63] font-bold"
            : "text-slate-500 hover:text-slate-900"
            }`}
        >
          <Trophy className="w-4 h-4 mb-0.5 shrink-0" />
          <span className="text-[10px] uppercase font-bold tracking-wider truncate">Leaders</span>
        </button>

        <button
          onClick={() => setActiveTab("downline")}
          className={`flex flex-col items-center justify-center py-1 px-1.5 sm:px-2.5 transition-colors cursor-pointer rounded-[4px] min-w-0 ${activeTab === "downline"
            ? "text-[#116E63] font-bold"
            : "text-slate-500 hover:text-slate-900"
            }`}
        >
          <Users className="w-4 h-4 mb-0.5 shrink-0" />
          <span className="text-[10px] uppercase font-bold tracking-wider truncate">Team</span>
        </button>

        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-1.5 sm:px-2.5 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer rounded-[4px] min-w-0"
        >
          <MoreHorizontal className="w-4 h-4 mb-0.5 shrink-0" />
          <span className="text-[10px] uppercase font-bold tracking-wider truncate">More</span>
        </button>
      </div>
    </div>
  );
}
