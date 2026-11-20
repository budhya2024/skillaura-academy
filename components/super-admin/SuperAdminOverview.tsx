"use client";

import React from "react";
import {
  Users,
  BookOpen,
  Wallet,
  TrendingUp,
  Plus,
  Video,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
} from "lucide-react";
import { SuperAdminTab } from "./SuperAdminSidebar";

interface SuperAdminOverviewProps {
  onNavigate: (tab: SuperAdminTab) => void;
  pendingPayoutCount: number;
  totalStudents: number;
  totalCourses: number;
}

export default function SuperAdminOverview({
  onNavigate,
  pendingPayoutCount,
  totalStudents,
  totalCourses,
}: SuperAdminOverviewProps) {
  return (
    <div className="space-y-4 font-sans">
      {/* 1. Welcome Banner */}
      <div className="bg-slate-900 text-white p-5 rounded-[4px] shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-[3px] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-400" /> Super Admin Console
              </span>
              <span className="text-xs text-slate-400 font-mono">v2.4 Production</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase font-[family-name:var(--font-yantramanav)] text-white tracking-wide">
              SkillAura Master Administration
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl">
              Complete administrative authority to manage enrolled student databases, create and edit masterclass video curriculums, approve commission disbursements, and manage sitewide settings.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate("courses")}
              className="bg-[#116E63] hover:bg-[#0c5c53] text-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course / Video</span>
            </button>
            <button
              onClick={() => onNavigate("payouts")}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Wallet className="w-4 h-4" />
              <span>Approve Payouts ({pendingPayoutCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Four Master Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1 */}
        <div
          onClick={() => onNavigate("students")}
          className="bg-white border border-slate-200 p-4 rounded-[4px] shadow-xs cursor-pointer hover:border-[#116E63] transition-colors group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Total Students
            </span>
            <Users className="w-4 h-4 text-[#116E63]" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {totalStudents} Learners
          </div>
          <div className="text-[10px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Active KYC Verified
          </div>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => onNavigate("courses")}
          className="bg-white border border-slate-200 p-4 rounded-[4px] shadow-xs cursor-pointer hover:border-[#116E63] transition-colors group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Published Courses
            </span>
            <BookOpen className="w-4 h-4 text-[#116E63]" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {totalCourses} Masterclasses
          </div>
          <div className="text-[10px] text-slate-500 font-medium mt-1">
            48 Video Lessons Live
          </div>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => onNavigate("payouts")}
          className="bg-white border border-slate-200 p-4 rounded-[4px] shadow-xs cursor-pointer hover:border-[#116E63] transition-colors group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Pending Settlements
            </span>
            <Wallet className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-600 font-mono">
            {pendingPayoutCount} Pending
          </div>
          <div className="text-[10px] text-amber-700 font-semibold mt-1">
            Requires Super Admin approval
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-slate-200 p-4 rounded-[4px] shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Total Sales Volume
            </span>
            <Zap className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono">
            ₹18,45,000
          </div>
          <div className="text-[10px] text-emerald-600 font-medium mt-1">
            100% platform gross fee volume
          </div>
        </div>
      </div>

      {/* 3. Operational Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div
          onClick={() => onNavigate("courses")}
          className="bg-white border border-slate-200 p-4 rounded-[4px] shadow-xs hover:border-[#116E63] cursor-pointer transition-colors group space-y-2"
        >
          <div className="w-8 h-8 rounded-[4px] bg-teal-50 text-[#116E63] flex items-center justify-center">
            <Video className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 group-hover:text-[#116E63] transition-colors">
            Course Curriculum &amp; Video Manager
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Attach YouTube, Vimeo, or direct MP4 links to lesson modules. Edit titles and download handouts.
          </p>
          <span className="text-xs font-bold text-[#116E63] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-1">
            <span>Manage Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={() => onNavigate("students")}
          className="bg-white border border-slate-200 p-4 rounded-[4px] shadow-xs hover:border-[#116E63] cursor-pointer transition-colors group space-y-2"
        >
          <div className="w-8 h-8 rounded-[4px] bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 group-hover:text-[#116E63] transition-colors">
            Enrolled Students Directory
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Inspect all registered student profiles, verify KYC documents, and monitor student referral earnings.
          </p>
          <span className="text-xs font-bold text-[#116E63] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-1">
            <span>Inspect Students</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={() => onNavigate("cms")}
          className="bg-white border border-slate-200 p-4 rounded-[4px] shadow-xs hover:border-[#116E63] cursor-pointer transition-colors group space-y-2"
        >
          <div className="w-8 h-8 rounded-[4px] bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 group-hover:text-[#116E63] transition-colors">
            Website Announcements &amp; CMS
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Update top headline announcement strips, discount coupon codes, and public WhatsApp support numbers.
          </p>
          <span className="text-xs font-bold text-[#116E63] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-1">
            <span>Configure CMS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}