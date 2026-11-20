"use client";

import React, { useState, useEffect } from "react";
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
  Activity,
  CreditCard,
  Building2,
  AlertTriangle,
  Server,
  Database,
  Check,
  Eye,
  Megaphone,
  BarChart3,
  PieChart,
  DollarSign,
  UserCheck,
  ArrowUpRight,
} from "lucide-react";
import { SuperAdminTab } from "./SuperAdminSidebar";
import { MOCK_PAYOUTS, MOCK_LEADERBOARD } from "../../lib/networkData";
import { getKycRecords, KycRecord } from "../../lib/kycData";

interface SuperAdminOverviewProps {
  onNavigate: (tab: SuperAdminTab) => void;
  pendingPayoutCount: number;
  pendingKycCount?: number;
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
    id: "SKA-1284",
    name: "Deepak Patel",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    coursePurchased: "Business Mastery & High-Ticket Closing",
    fee: 4999,
    sponsorName: "Priya Sharma",
    sponsorId: "SKA-1045",
    date: "20 Feb 2026",
    status: "Pending",
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
    status: "Pending",
  },
];

// Monthly Platform Financial Data for Charts
const MONTHLY_CHART_DATA = [
  {
    month: "Oct 25",
    sales: 245000,
    commission: 159250,
    profit: 85750,
    students: 42,
  },
  {
    month: "Nov 25",
    sales: 380000,
    commission: 247000,
    profit: 133000,
    students: 64,
  },
  {
    month: "Dec 25",
    sales: 490000,
    commission: 318500,
    profit: 171500,
    students: 88,
  },
  {
    month: "Jan 26",
    sales: 640000,
    commission: 416000,
    profit: 224000,
    students: 112,
  },
  {
    month: "Feb 26",
    sales: 785000,
    commission: 510250,
    profit: 274750,
    students: 138,
  },
  {
    month: "Mar 26",
    sales: 920000,
    commission: 598000,
    profit: 322000,
    students: 165,
  },
];

// Course Category Distribution
const COURSE_CATEGORY_BREAKDOWN = [
  {
    category: "Business Mastery & High-Ticket Closing",
    sales: 774900,
    percentage: 42,
    profit: 271215,
    students: 155,
    color: "bg-[#116E63]",
  },
  {
    category: "Video Editing Mastery & Cinematic Reels",
    sales: 442800,
    percentage: 24,
    profit: 154980,
    students: 148,
    color: "bg-teal-500",
  },
  {
    category: "Full Stack Web Development & Freelancing",
    sales: 332100,
    percentage: 18,
    profit: 116235,
    students: 42,
    color: "bg-emerald-600",
  },
  {
    category: "Brand Identity, Poster & Logo Design",
    sales: 295200,
    percentage: 16,
    profit: 103320,
    students: 84,
    color: "bg-amber-500",
  },
];

export default function SuperAdminOverview({
  onNavigate,
  pendingPayoutCount,
  pendingKycCount = 4,
  totalStudents,
  totalCourses,
}: SuperAdminOverviewProps) {
  const [kycList, setKycList] = useState<KycRecord[]>([]);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(MONTHLY_CHART_DATA.length - 1);
  const [chartMetric, setChartMetric] = useState<"all" | "sales" | "profit">("all");

  useEffect(() => {
    const refreshKyc = () => {
      setKycList(getKycRecords());
    };
    refreshKyc();
    window.addEventListener("skillaura_kyc_updated", refreshKyc);
    window.addEventListener("storage", refreshKyc);
    return () => {
      window.removeEventListener("skillaura_kyc_updated", refreshKyc);
      window.removeEventListener("storage", refreshKyc);
    };
  }, []);

  const pendingKycRecords = kycList.filter((k) => k.status === "pending").slice(0, 4);
  const pendingPayoutsList = MOCK_PAYOUTS.filter((p) => p.status === "pending").slice(0, 3);
  const topEarners = MOCK_LEADERBOARD.slice(0, 4);

  const activeMonthData = MONTHLY_CHART_DATA[selectedMonthIndex];
  const maxSales = Math.max(...MONTHLY_CHART_DATA.map((d) => d.sales));

  return (
    <div className="space-y-4 sm:space-y-5 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Master Executive Welcome Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs rounded-[4px] transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> System Administrator
              </span>
              <span className="text-slate-300 dark:text-slate-700">&bull;</span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> All Services Operational
              </span>
              <span className="text-slate-300 dark:text-slate-700">&bull;</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                SkillAura HQ Bhopal
              </span>
            </div>

            <h2 className="text-base sm:text-2xl font-bold uppercase font-[family-name:var(--font-yantramanav)] text-slate-900 dark:text-white tracking-wide">
              Platform Executive Dashboard
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
              Platform analytics, student referral income generation, course curriculum studio, and company profit tracking.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Six Master Key Metric KPI Cards (matching Student Admin Style) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* KPI 1: Students */}
        <div
          onClick={() => onNavigate("students")}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 rounded-[4px] shadow-xs cursor-pointer hover:border-[#116E63] dark:hover:border-emerald-500 transition-colors"
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center justify-between">
            <span>Total Students</span>
            <Users className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white font-mono">
            {totalStudents} Learners
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-emerald-700 dark:text-emerald-400 font-medium truncate flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 10 KYC Verified
          </div>
        </div>

        {/* KPI 2: Gross Course Sales Volume */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 rounded-[4px] shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center justify-between">
            <span>Course Sales</span>
            <Zap className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 font-mono">
            ₹18,45,000
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
            Gross enrollment tuition
          </div>
        </div>

        {/* KPI 3: Affiliate Commissions Disbursed */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 rounded-[4px] shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center justify-between">
            <span>Student Income</span>
            <Award className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white font-mono">
            ₹3,62,400
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-emerald-700 dark:text-emerald-400 font-medium truncate">
            65% Direct Commission
          </div>
        </div>

        {/* KPI 4: Company Net Profit Retained */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 rounded-[4px] shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center justify-between">
            <span>Company Profit</span>
            <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 font-mono">
            ₹6,45,750
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-emerald-600 dark:text-emerald-400 font-medium truncate">
            35% Retained Margin
          </div>
        </div>

        {/* KPI 5: Pending Payouts */}
        <div
          onClick={() => onNavigate("payouts")}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 rounded-[4px] shadow-xs cursor-pointer hover:border-amber-500 transition-colors"
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center justify-between">
            <span>Pending Payouts</span>
            <Wallet className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-amber-700 dark:text-amber-400 font-mono">
            {pendingPayoutCount} Pending
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-amber-600 dark:text-amber-400 font-medium truncate">
            Awaiting Disbursement
          </div>
        </div>

        {/* KPI 6: Pending KYC Applications */}
        <div
          onClick={() => onNavigate("kyc")}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 rounded-[4px] shadow-xs cursor-pointer hover:border-[#116E63] dark:hover:border-emerald-500 transition-colors"
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center justify-between">
            <span>Pending KYC</span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white font-mono">
            {pendingKycCount} Queue
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
            Compliance Review
          </div>
        </div>
      </div>

      {/* ================= 3. INTERACTIVE VISUAL ANALYTICS CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Chart 1: Revenue, Student Income & Platform Profit Trends (8 Cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                  Platform Financial &amp; Profit Velocity Chart
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Monthly gross course sales vs student direct income (65%) vs company net profit (35%)
              </p>
            </div>

            {/* Metric Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-[3px] text-xs self-start sm:self-auto">
              <button
                onClick={() => setChartMetric("all")}
                className={`px-2 py-1 text-[10px] font-bold uppercase rounded-[2px] transition-colors cursor-pointer ${
                  chartMetric === "all"
                    ? "bg-[#116E63] text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                All Metrics
              </button>
              <button
                onClick={() => setChartMetric("sales")}
                className={`px-2 py-1 text-[10px] font-bold uppercase rounded-[2px] transition-colors cursor-pointer ${
                  chartMetric === "sales"
                    ? "bg-[#116E63] text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Course Sales
              </button>
              <button
                onClick={() => setChartMetric("profit")}
                className={`px-2 py-1 text-[10px] font-bold uppercase rounded-[2px] transition-colors cursor-pointer ${
                  chartMetric === "profit"
                    ? "bg-[#116E63] text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Company Profit
              </button>
            </div>
          </div>

          {/* Interactive Bar Chart Visualization */}
          <div className="space-y-3">
            {/* Visual Bar Columns */}
            <div className="h-56 sm:h-64 flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 px-1 border-b border-slate-200 dark:border-slate-800">
              {MONTHLY_CHART_DATA.map((item, idx) => {
                const isSelected = selectedMonthIndex === idx;
                const salesHeight = (item.sales / maxSales) * 100;
                const commissionHeight = (item.commission / maxSales) * 100;
                const profitHeight = (item.profit / maxSales) * 100;

                return (
                  <div
                    key={item.month}
                    onClick={() => setSelectedMonthIndex(idx)}
                    className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end cursor-pointer group"
                    title={`Click to inspect ${item.month} financials`}
                  >
                    {/* Tooltip on active */}
                    <div
                      className={`text-[10px] font-mono font-bold transition-opacity whitespace-nowrap ${
                        isSelected
                          ? "text-[#116E63] dark:text-emerald-400 opacity-100"
                          : "opacity-0 group-hover:opacity-100 text-slate-500"
                      }`}
                    >
                      ₹{(item.sales / 1000).toFixed(0)}k
                    </div>

                    {/* Bars Container */}
                    <div className="w-full max-w-[42px] flex items-end justify-center gap-0.5 h-full">
                      {(chartMetric === "all" || chartMetric === "sales") && (
                        <div
                          style={{ height: `${salesHeight}%` }}
                          className={`w-full rounded-t-[3px] transition-all duration-300 ${
                            isSelected
                              ? "bg-[#116E63] dark:bg-emerald-500 shadow-sm"
                              : "bg-slate-300 dark:bg-slate-700 group-hover:bg-[#116E63]/70"
                          }`}
                        />
                      )}
                      {chartMetric === "all" && (
                        <div
                          style={{ height: `${commissionHeight}%` }}
                          className={`w-full rounded-t-[3px] transition-all duration-300 ${
                            isSelected
                              ? "bg-teal-400 dark:bg-teal-500"
                              : "bg-teal-200/80 dark:bg-teal-900/60 group-hover:bg-teal-400/80"
                          }`}
                        />
                      )}
                      {(chartMetric === "all" || chartMetric === "profit") && (
                        <div
                          style={{ height: `${profitHeight}%` }}
                          className={`w-full rounded-t-[3px] transition-all duration-300 ${
                            isSelected
                              ? "bg-amber-500 dark:bg-amber-400"
                              : "bg-amber-200 dark:bg-amber-900/60 group-hover:bg-amber-400"
                          }`}
                        />
                      )}
                    </div>

                    {/* Month Label */}
                    <span
                      className={`text-[10px] sm:text-xs font-mono font-bold uppercase transition-colors ${
                        isSelected
                          ? "text-slate-900 dark:text-white underline underline-offset-4 decoration-[#116E63]"
                          : "text-slate-400 dark:text-slate-500 group-hover:text-slate-800 dark:group-hover:text-slate-200"
                      }`}
                    >
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Chart Legend & Selected Month Highlights */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1">
              <div className="flex items-center gap-3 flex-wrap text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-[2px] bg-[#116E63] dark:bg-emerald-500"></span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Course Sales Volume</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-[2px] bg-teal-400 dark:bg-teal-500"></span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Student Income (65%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-[2px] bg-amber-500 dark:bg-amber-400"></span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Company Profit (35%)</span>
                </div>
              </div>

              {/* Inspected Month Stat Strip */}
              <div className="p-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-[3px] text-[11px] font-mono flex items-center gap-3">
                <span>
                  <strong>{activeMonthData.month}:</strong>
                </span>
                <span>Sales: <strong className="text-slate-900 dark:text-white">₹{activeMonthData.sales.toLocaleString()}</strong></span>
                <span>Profit: <strong className="text-emerald-700 dark:text-emerald-400">+₹{activeMonthData.profit.toLocaleString()}</strong></span>
                <span>Students: <strong className="text-[#116E63] dark:text-emerald-400">{activeMonthData.students} Added</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 2: Course Category Sales & Profit Contribution (4 Cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-3.5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <PieChart className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
                <span>Course Revenue &amp; Profit Share</span>
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Sales volume and retained platform margins per course
            </p>
          </div>

          {/* Progress / Share Bars */}
          <div className="space-y-3 text-xs">
            {COURSE_CATEGORY_BREAKDOWN.map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[190px]">
                    {item.category}
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {item.percentage}% &bull; ₹{(item.sales / 1000).toFixed(0)}k
                  </span>
                </div>

                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  <span>{item.students} Enrolled</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                    Net Profit: +₹{item.profit.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Profit Retention Highlight Card */}
          <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-[3px] text-xs space-y-1">
            <div className="flex items-center justify-between font-bold text-emerald-900 dark:text-emerald-300 text-[11px]">
              <span>SkillAura Affiliate Payout Model:</span>
              <span className="font-mono">65% / 35%</span>
            </div>
            <p className="text-[10px] text-emerald-700 dark:text-emerald-400/90 leading-relaxed">
              Every course sale generates instant 65% student commission with 35% company retained net profit without multi-level middleman delays.
            </p>
          </div>
        </div>
      </div>

      {/* ================= 4. OPERATIONAL FEED: ENROLLMENTS & PAYOUTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Left Column (7 cols): Recent Enrollments & Pending Payouts */}
        <div className="lg:col-span-7 space-y-4">
          {/* Section A: Recent Student Enrollments */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4px] shadow-xs overflow-hidden">
            <div className="p-3 sm:p-4 bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                  Recent Student Enrollments &amp; Purchases
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Real-time course enrollments with direct affiliate referral attribution
                </p>
              </div>
              <button
                onClick={() => onNavigate("students")}
                className="text-xs font-bold text-[#116E63] dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>All ({totalStudents})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs min-w-[540px]">
                <thead>
                  <tr className="bg-slate-100/70 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 uppercase font-bold text-[10px] tracking-wider">
                    <th className="py-2.5 px-3">Student Name &amp; ID</th>
                    <th className="py-2.5 px-3">Course Purchased</th>
                    <th className="py-2.5 px-3">Fee Paid</th>
                    <th className="py-2.5 px-3">Referred By</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
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
                          <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 relative shrink-0 bg-slate-100 dark:bg-slate-800">
                            <Image
                              src={item.avatar}
                              alt={item.name}
                              fill
                              sizes="28px"
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
                      <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white truncate max-w-[170px]">
                        {item.coursePurchased}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        ₹{item.fee.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[140px]">
                          {item.sponsorName}
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          {item.sponsorId}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => onNavigate("students")}
                          className="px-2 py-1 text-[11px] font-bold text-[#116E63] dark:text-emerald-400 hover:text-white bg-teal-50 dark:bg-teal-950/60 hover:bg-[#116E63] dark:hover:bg-emerald-600 border border-teal-200 dark:border-teal-800 rounded-[4px] transition-colors cursor-pointer"
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

          {/* Section B: Pending Payout Requests Queue */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4px] shadow-xs overflow-hidden">
            <div className="p-3 sm:p-4 bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                  Pending Payout Requests ({pendingPayoutCount})
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Student affiliate income withdrawal requests awaiting admin approval
                </p>
              </div>
              <button
                onClick={() => onNavigate("payouts")}
                className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Manage Payouts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {pendingPayoutsList.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-xs">
                  No pending payout requests at this time.
                </div>
              ) : (
                pendingPayoutsList.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 sm:p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-[4px] bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                        <Wallet className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white truncate">
                            {item.memberName}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                            ({item.memberId})
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
                          {item.method}: {item.accountDetails} &bull; {item.requestedDate}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                        ₹{item.amount.toLocaleString()}
                      </span>
                      <button
                        onClick={() => onNavigate("payouts")}
                        className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white bg-[#116E63] hover:bg-[#0c5c53] rounded-[4px] transition-colors cursor-pointer"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): KYC Review Queue & Top Performers */}
        <div className="lg:col-span-5 space-y-4">
          {/* Section C: Pending KYC Review Queue */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4px] shadow-xs overflow-hidden">
            <div className="p-3 sm:p-4 bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                  KYC Verification Queue ({pendingKycCount})
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Government document submissions awaiting compliance review
                </p>
              </div>
              <button
                onClick={() => onNavigate("kyc")}
                className="text-xs font-bold text-[#116E63] dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {pendingKycRecords.length === 0 ? (
                <div className="p-5 text-center text-slate-500 text-xs">
                  All student KYC documents are fully verified!
                </div>
              ) : (
                pendingKycRecords.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 flex items-center justify-between gap-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 relative shrink-0 bg-slate-100 dark:bg-slate-800">
                        <Image
                          src={item.avatarImage}
                          alt={item.studentName}
                          fill
                          sizes="28px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 dark:text-white truncate leading-tight">
                          {item.studentName}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">
                          {item.docType}: {item.docNumber}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate("kyc")}
                      className="px-2.5 py-1 text-[11px] font-bold uppercase text-[#116E63] dark:text-emerald-400 hover:text-white bg-teal-50 dark:bg-teal-950/60 hover:bg-[#116E63] dark:hover:bg-emerald-600 border border-teal-200 dark:border-teal-800 rounded-[4px] transition-colors cursor-pointer shrink-0"
                    >
                      Verify
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Section D: Top Affiliate Performers - Income & Profit Generation */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4px] shadow-xs overflow-hidden">
            <div className="p-3 sm:p-4 bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                  Top Student Income &amp; Profit Leaders
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Direct students added, commission earned &amp; company profit generated
                </p>
              </div>
              <button
                onClick={() => onNavigate("students")}
                className="text-xs font-bold text-[#116E63] dark:text-emerald-400 hover:underline"
              >
                All Students
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {topEarners.map((user, idx) => {
                const estProfit = Math.round((user.totalEarnings / 0.65) * 0.35);

                return (
                  <div
                    key={user.id}
                    className="p-3 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 text-center font-mono font-bold text-slate-400 text-xs">
                        #{idx + 1}
                      </span>
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 relative shrink-0 bg-slate-100 dark:bg-slate-800">
                        <Image
                          src={user.avatarImage || "/images/founder.jpeg"}
                          alt={user.name}
                          fill
                          sizes="32px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 dark:text-white truncate">
                          {user.name}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                          {user.directs} Students Added &bull; {user.activeSalesCount} Sales
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-xs">
                        ₹{user.totalEarnings.toLocaleString()} Earned
                      </div>
                      <div className="text-[10px] text-[#116E63] dark:text-teal-300 font-mono font-semibold">
                        +₹{estProfit.toLocaleString()} Profit (35%)
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section E: Platform System Health Status */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4px] p-3.5 shadow-xs space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-[family-name:var(--font-yantramanav)]">
              Core Platform Infrastructure
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Next.js 16 Turbopack</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Video Streaming CDN</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>IMPS / UPI Payout Webhook</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>KYC Registry Synced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
