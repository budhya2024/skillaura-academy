"use client";

import React from "react";
import Image from "next/image";
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
  Share2,
  ExternalLink,
} from "lucide-react";
import { SuperAdminTab } from "./SuperAdminSidebar";

interface SuperAdminOverviewProps {
  onNavigate: (tab: SuperAdminTab) => void;
  pendingPayoutCount: number;
  totalStudents: number;
  totalCourses: number;
}

const RECENT_STUDENT_ENROLLMENTS = [
  {
    id: "SKA-1045",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    coursePurchased: "Business Mastery & High-Ticket Closing",
    fee: 4999,
    sponsorName: "SkillAura Master (Aman Singhania)",
    sponsorId: "SKA-ROOT88",
    date: "28 Jan 2026",
    status: "Verified",
  },
  {
    id: "SKA-1052",
    name: "Rajesh Mehta",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    coursePurchased: "Business Mastery & High-Ticket Closing",
    fee: 4999,
    sponsorName: "SkillAura Master (Aman Singhania)",
    sponsorId: "SKA-ROOT88",
    date: "01 Feb 2026",
    status: "Verified",
  },
  {
    id: "SKA-1120",
    name: "Rahul Verma",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    coursePurchased: "Video Editing Mastery & Cinematic Reels",
    fee: 2999,
    sponsorName: "SkillAura Master (Aman Singhania)",
    sponsorId: "SKA-ROOT88",
    date: "05 Feb 2026",
    status: "Verified",
  },
  {
    id: "SKA-1144",
    name: "Kavita Joshi",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    coursePurchased: "Poster, Brand Identity & Logo Design Mastery",
    fee: 3499,
    sponsorName: "Rajesh Mehta",
    sponsorId: "SKA-1052",
    date: "14 Feb 2026",
    status: "Verified",
  },
  {
    id: "SKA-1480",
    name: "Amit Kumar",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    coursePurchased: "Full Stack Web Development & Freelancing",
    fee: 7999,
    sponsorName: "Kavita Joshi",
    sponsorId: "SKA-1144",
    date: "05 Mar 2026",
    status: "Verified",
  },
];

export default function SuperAdminOverview({
  onNavigate,
  pendingPayoutCount,
  totalStudents,
  totalCourses,
}: SuperAdminOverviewProps) {
  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Welcome Banner */}
      <div className="bg-slate-900 dark:bg-slate-900 text-white p-4 sm:p-5 rounded-[4px] shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Super Admin Platform Console
              </span>
              <span className="text-xs text-slate-400 font-mono">v2.4 Production</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase font-[family-name:var(--font-yantramanav)] text-white tracking-wide">
              SkillAura Master Administration
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl">
              Centralized command center for managing enrolled students, purchased course tracking, student referral genealogy, and instant banking payout approvals.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate("students")}
              className="bg-[#116E63] hover:bg-[#0c5950] text-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Users className="w-4 h-4" />
              <span>Student Directory</span>
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div
          onClick={() => onNavigate("students")}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs cursor-pointer hover:border-[#116E63] dark:hover:border-emerald-500 transition-colors group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Total Students
            </span>
            <Users className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
            {totalStudents} Learners
          </div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active KYC Verified</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => onNavigate("courses")}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs cursor-pointer hover:border-[#116E63] dark:hover:border-emerald-500 transition-colors group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Published Courses
            </span>
            <BookOpen className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
            {totalCourses} Masterclasses
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">
            48 Video Lessons Live
          </div>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => onNavigate("payouts")}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs cursor-pointer hover:border-amber-500 transition-colors group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Pending Settlements
            </span>
            <Wallet className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-700 dark:text-amber-400 font-mono">
            {pendingPayoutCount} Pending
          </div>
          <div className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold mt-1">
            Requires Super Admin approval
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Total Course Sales Volume
            </span>
            <Zap className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
            ₹18,45,000
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            Gross enrollment receipts
          </div>
        </div>
      </div>

      {/* 3. Recent Enrollments with Purchased Course & Referral Info */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4px] shadow-xs overflow-hidden">
        <div className="p-3 sm:p-4 bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
              Recent Student Enrollments &amp; Course Purchases
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Real-time feed of learners, courses purchased, and affiliate sponsor referral attribution
            </p>
          </div>
          <button
            onClick={() => onNavigate("students")}
            className="text-xs font-bold text-[#116E63] dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Directory ({totalStudents})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[760px]">
            <thead>
              <tr className="bg-slate-100/80 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 uppercase font-bold text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Student Name &amp; ID</th>
                <th className="py-2.5 px-3">Course Purchased</th>
                <th className="py-2.5 px-3">Course Fee</th>
                <th className="py-2.5 px-3">Referred By (Sponsor)</th>
                <th className="py-2.5 px-3">Enrollment Date</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium text-slate-800 dark:text-slate-200">
              {RECENT_STUDENT_ENROLLMENTS.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 relative shrink-0 bg-slate-100 dark:bg-slate-800">
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          fill
                          sizes="32px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white leading-tight">
                          {item.name}
                        </div>
                        <span className="font-mono text-[10px] text-[#116E63] dark:text-emerald-400 font-bold">
                          {item.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white truncate max-w-[220px]">
                    {item.coursePurchased}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-black text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm">
                    ₹{item.fee.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
                      {item.sponsorName}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      ID: {item.sponsorId}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-500 dark:text-slate-400 text-[11px]">
                    {item.date}
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      onClick={() => onNavigate("students")}
                      className="px-2.5 py-1 text-[11px] font-bold text-[#116E63] dark:text-emerald-400 hover:text-white bg-teal-50 dark:bg-teal-950/60 hover:bg-[#116E63] dark:hover:bg-emerald-600 border border-teal-200 dark:border-teal-800 rounded-[4px] transition-colors cursor-pointer"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Operational Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <div
          onClick={() => onNavigate("students")}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs hover:border-[#116E63] dark:hover:border-emerald-500 cursor-pointer transition-colors group space-y-2"
        >
          <div className="w-8 h-8 rounded-[4px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white group-hover:text-[#116E63] dark:group-hover:text-emerald-400 transition-colors">
            Student &amp; Referral Genealogy
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Inspect all enrolled students, verify KYC documents, and monitor multi-tier student referral earnings.
          </p>
          <span className="text-xs font-bold text-[#116E63] dark:text-emerald-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-1">
            <span>Inspect Students</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={() => onNavigate("courses")}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs hover:border-[#116E63] dark:hover:border-emerald-500 cursor-pointer transition-colors group space-y-2"
        >
          <div className="w-8 h-8 rounded-[4px] bg-teal-50 dark:bg-teal-950/60 text-[#116E63] dark:text-emerald-400 flex items-center justify-center">
            <Video className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white group-hover:text-[#116E63] dark:group-hover:text-emerald-400 transition-colors">
            Course Studio &amp; Video Manager
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Attach YouTube, Vimeo, or direct MP4 links to lesson modules. Edit titles, prices, and upload handouts.
          </p>
          <span className="text-xs font-bold text-[#116E63] dark:text-emerald-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-1">
            <span>Manage Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={() => onNavigate("payouts")}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs hover:border-amber-500 cursor-pointer transition-colors group space-y-2"
        >
          <div className="w-8 h-8 rounded-[4px] bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
            <Wallet className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
            Banking Payout Approvals
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Review student withdrawal requests, verify UPI/NEFT account details, and mark payouts as completed.
          </p>
          <span className="text-xs font-bold text-amber-700 dark:text-amber-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-1">
            <span>Approve Payouts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
