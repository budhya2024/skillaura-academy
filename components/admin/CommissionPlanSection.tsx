"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MOCK_COMMISSIONS,
} from "../../lib/networkData";
import {
  Wallet,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  TrendingUp,
  Award,
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  Calendar,
  PieChart,
  Download,
  CreditCard,
  ArrowRight,
  Check,
  Crown,
  Users,
} from "lucide-react";

interface PackageSalesStat {
  name: string;
  category: string;
  salesCount: number;
  percentage: number;
  totalIncome: number;
  color: string;
}

const PACKAGE_STATS: PackageSalesStat[] = [
  {
    name: "Business Mastery & High-Ticket Closing",
    category: "Business & Sales",
    salesCount: 48,
    percentage: 41,
    totalIncome: 168000,
    color: "#116E63", // SkillAura Teal
  },
  {
    name: "Video Editing Mastery & Cinematic Reels",
    category: "Video Editing",
    salesCount: 36,
    percentage: 31,
    totalIncome: 108000,
    color: "#FDA31B", // SkillAura Accent Amber
  },
  {
    name: "Poster, Brand Identity & Logo Design",
    category: "Graphic Design",
    salesCount: 22,
    percentage: 19,
    totalIncome: 55000,
    color: "#2563EB", // Blue
  },
  {
    name: "Content Creation Mastery & Viral Scripting",
    category: "Social Media",
    salesCount: 12,
    percentage: 10,
    totalIncome: 17650,
    color: "#9333EA", // Purple
  },
];

export default function CommissionPlanSection() {
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("10000");

  const totalSalesCount = PACKAGE_STATS.reduce((acc, curr) => acc + curr.salesCount, 0);
  const totalPackageIncome = PACKAGE_STATS.reduce((acc, curr) => acc + curr.totalIncome, 0);

  // SVG Donut calculation
  let cumulativeOffset = 0;
  const radius = 64;
  const circumference = 2 * Math.PI * radius; // ~402.12

  return (
    <div className="space-y-4 font-sans">
      {/* =========================================================================
          1. SIX INCOME METRIC CARDS (3x2 GRID WITH FULL SOLID BACKGROUND COLORS)
         ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {/* Metric 1: Today's Income - Full Emerald Background */}
        <div className="bg-emerald-100/80 dark:bg-emerald-950/80 p-4 border border-emerald-300 dark:border-emerald-700/80 shadow-xs rounded-[4px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-200">
                Today&apos;s Income
              </span>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                +1 Sale
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-950 dark:text-white font-mono mt-1">
              ₹3,250
            </div>
          </div>
          <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-2.5 font-medium flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 shrink-0 text-emerald-700 dark:text-emerald-400" />
            <span>Credited today at 10:45 AM</span>
          </p>
        </div>

        {/* Metric 2: Last 7 Days Income - Full Sky Blue Background */}
        <div className="bg-sky-100/80 dark:bg-sky-950/80 p-4 border border-sky-300 dark:border-sky-700/80 shadow-xs rounded-[4px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-900 dark:text-sky-200">
                Last 7 Days
              </span>
              <span className="text-xs font-bold text-sky-800 dark:text-sky-300">
                5 Sales
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-sky-950 dark:text-white font-mono mt-1">
              ₹18,400
            </div>
          </div>
          <p className="text-xs text-sky-800 dark:text-sky-300 mt-2.5 font-medium flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 shrink-0 text-sky-700 dark:text-sky-400" />
            <span>Weekly active direct earnings</span>
          </p>
        </div>

        {/* Metric 3: Last 30 Days Income - Full Indigo/Purple Background */}
        <div className="bg-indigo-100/80 dark:bg-indigo-950/80 p-4 border border-indigo-300 dark:border-indigo-700/80 shadow-xs rounded-[4px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-200">
                Last 30 Days
              </span>
              <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300">
                24 Sales
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-950 dark:text-white font-mono mt-1">
              ₹76,500
            </div>
          </div>
          <p className="text-xs text-indigo-800 dark:text-indigo-300 mt-2.5 font-medium flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 shrink-0 text-indigo-700 dark:text-indigo-400" />
            <span>Monthly active direct income</span>
          </p>
        </div>

        {/* Metric 4: Total Commission Earned - Full Amber/Gold Background */}
        <div className="bg-amber-100/80 dark:bg-amber-950/80 p-4 border border-amber-300 dark:border-amber-700/80 shadow-xs rounded-[4px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                Total Earned
              </span>
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300">
                All Time (118 Sales)
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-950 dark:text-white font-mono mt-1">
              ₹3,48,650
            </div>
          </div>
          <p className="text-xs text-amber-900 dark:text-amber-300 mt-2.5 font-medium flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 shrink-0 text-amber-700 dark:text-amber-400" />
            <span>100% active direct performance</span>
          </p>
        </div>

        {/* Metric 5: Total Withdrawn - Full Rose/Pink Background */}
        <div className="bg-rose-100/80 dark:bg-rose-950/80 p-4 border border-rose-300 dark:border-rose-700/80 shadow-xs rounded-[4px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-rose-900 dark:text-rose-200">
                Total Withdrawn
              </span>
              <span className="text-xs font-bold text-rose-800 dark:text-rose-300">
                Bank Transferred
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-950 dark:text-white font-mono mt-1">
              ₹3,00,000
            </div>
          </div>
          <p className="text-xs text-rose-800 dark:text-rose-300 mt-2.5 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-rose-700 dark:text-rose-400" />
            <span>Verified direct NEFT/UPI payouts</span>
          </p>
        </div>

        {/* Metric 6: Available Wallet Balance - Full Teal/Mint Background */}
        <div className="bg-teal-100/90 dark:bg-teal-950/90 p-4 border-2 border-[#116E63] dark:border-emerald-500 shadow-xs rounded-[4px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#116E63] dark:text-emerald-300">
                Available Balance
              </span>
              <span className="text-xs font-bold text-[#116E63] dark:text-emerald-300">
                Instant
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#116E63] dark:text-emerald-300 font-mono mt-1">
              ₹48,650
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-teal-300/80 dark:border-teal-800/80 flex items-center justify-between">
            <span className="text-xs text-teal-900 dark:text-teal-200 font-bold">Ready in wallet</span>
            <button
              onClick={() => setWithdrawModalOpen(true)}
              className="text-xs font-bold text-white bg-[#116E63] hover:bg-[#0d5950] dark:bg-emerald-600 dark:hover:bg-emerald-500 uppercase tracking-wider px-3.5 py-1 rounded-[4px] flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <span>Withdraw</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. CIRCLE / DONUT CHART: TOTAL SALES COUNT & INCOME BY PACKAGE
         ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 rounded-[4px] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
              <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                Package-Wise Income &amp; Total Sales Count Distribution
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Breakdown of 118 total direct sales and ₹3,48,650 income generated across course packages
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs sm:text-sm font-mono font-bold text-slate-700 dark:text-slate-300">
              Total Sales: <strong className="text-slate-900 dark:text-white">{totalSalesCount} Courses</strong>
            </span>
          </div>
        </div>

        {/* Chart Layout: Donut on Left, Detailed Legend on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
          {/* LEFT: Clean SVG Donut Chart (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-3">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                {/* Background Ring */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-800"
                  strokeWidth="18"
                  fill="none"
                />

                {/* Segments */}
                {PACKAGE_STATS.map((pkg, idx) => {
                  const strokeDash = (pkg.percentage / 100) * circumference;
                  const strokeOffset = circumference - (cumulativeOffset / 100) * circumference;
                  cumulativeOffset += pkg.percentage;

                  return (
                    <circle
                      key={idx}
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke={pkg.color}
                      strokeWidth="18"
                      strokeDasharray={`${strokeDash} ${circumference - strokeDash}`}
                      strokeDashoffset={strokeOffset}
                      fill="none"
                      className="transition-all duration-500 hover:opacity-85"
                    />
                  );
                })}
              </svg>

              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Total Sales
                </span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono leading-none my-1">
                  {totalSalesCount}
                </span>
                <span className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                  ₹3,48,650
                </span>
              </div>
            </div>
            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Circle Chart: Proportion by Sales Count &amp; Income
            </span>
          </div>

          {/* RIGHT: Package Legend & Detailed Table Breakdown (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-[4px] overflow-hidden bg-slate-50/40 dark:bg-slate-800/40">
              {PACKAGE_STATS.map((pkg, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs"
                      style={{ backgroundColor: pkg.color }}
                    ></span>
                    <div className="truncate">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        {pkg.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {pkg.category} &bull; {pkg.percentage}% of total
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-6 sm:pl-0">
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono block">
                        {pkg.salesCount} Sales
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Units Sold
                      </span>
                    </div>

                    <div className="text-right min-w-[85px]">
                      <span className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 font-mono block">
                        ₹{pkg.totalIncome.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Income Earned
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary Strip */}
            <div className="p-3 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-[4px] flex items-center justify-between text-xs sm:text-sm font-bold">
              <span className="uppercase text-slate-700 dark:text-slate-300">Combined Direct Portfolio Total</span>
              <div className="flex items-center gap-4 font-mono">
                <span className="text-slate-900 dark:text-white">{totalSalesCount} Courses Sold</span>
                <span className="text-emerald-700 dark:text-emerald-400">₹{totalPackageIncome.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. DIRECT SALES INCOME LEDGER (STANDALONE TABLE)
         ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4px] overflow-hidden shadow-xs">
        {/* Table Header Bar */}
        <div className="p-3.5 sm:p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
              Direct Sales Income Ledger
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Detailed transaction records of all commissions earned from enrolled students
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 self-start sm:self-auto">
            {MOCK_COMMISSIONS.length} Transactions
          </span>
        </div>

        {/* Income Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[560px]">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 uppercase font-bold text-xs tracking-wider whitespace-nowrap">
                <th className="py-2.5 px-2 w-10 text-center">#</th>
                <th className="py-2.5 px-3">Transaction &amp; Time</th>
                <th className="py-2.5 px-2.5">Student</th>
                <th className="py-2.5 px-2.5">Course</th>
                <th className="py-2.5 px-2.5">Fee</th>
                <th className="py-2.5 px-2.5">Income</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-800 dark:text-slate-200">
              {MOCK_COMMISSIONS.map((rec, idx) => (
                <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 whitespace-nowrap">
                  <td className="py-2.5 px-2 text-center font-mono font-bold text-slate-500 dark:text-slate-400 text-xs">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-slate-900 dark:text-white font-mono text-xs sm:text-sm">
                      {rec.id}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {rec.date}
                    </div>
                  </td>
                  <td className="py-2.5 px-2.5">
                    <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                      {rec.fromMemberName}
                    </div>
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {rec.fromMemberId}
                    </div>
                  </td>
                  <td className="py-2.5 px-2.5 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
                    {rec.courseName}
                  </td>
                  <td className="py-2.5 px-2.5 font-mono font-bold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                    {rec.coursePrice > 0 ? `₹${rec.coursePrice.toLocaleString()}` : "Milestone Target"}
                  </td>
                  <td className="py-2.5 px-2.5 font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm sm:text-base">
                    +₹{rec.commissionAmount.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="inline-block text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300">
                      Credited
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full p-5 border border-slate-300 dark:border-slate-700 shadow-xl space-y-4 rounded-[4px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                Withdraw Available Income
              </h3>
              <button
                onClick={() => setWithdrawModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/70 p-3 border border-slate-200 dark:border-slate-700 rounded-[4px]">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold">
                Available Wallet Balance
              </span>
              <span className="text-xl font-bold text-[#116E63] dark:text-emerald-400 font-mono">
                ₹48,650
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block uppercase">
                Withdrawal Amount (₹)
              </label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#116E63] font-semibold rounded-[4px]"
                placeholder="Enter amount (min ₹1,000)"
              />
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                Net payout after 5% statutory TDS: ₹{(Number(withdrawAmount) * 0.95).toFixed(0)}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block uppercase">
                Payout Destination
              </label>
              <select className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-[#116E63] font-bold rounded-[4px]">
                <option>UPI ID: skillaura@icici</option>
                <option>Bank A/C: HDFC Bank (****4891)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setWithdrawModalOpen(false)}
                className="flex-1 py-2 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer uppercase rounded-[4px]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Withdrawal request for ₹${withdrawAmount} submitted successfully!`);
                  setWithdrawModalOpen(false);
                }}
                className="flex-1 py-2 bg-[#116E63] hover:bg-[#0c5c53] text-white text-xs font-bold transition-colors cursor-pointer uppercase tracking-wider rounded-[4px]"
              >
                Confirm Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}