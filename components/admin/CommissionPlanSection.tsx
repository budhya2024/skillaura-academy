"use client";

import React, { useState } from "react";
import {
  MOCK_COMMISSIONS,
  MOCK_PAYOUTS,
  COMMISSION_PLAN_TIERS,
  PayoutRequest,
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
  const [payouts, setPayouts] = useState<PayoutRequest[]>(MOCK_PAYOUTS);
  const [activeTab, setActiveTab] = useState<"chart" | "ledger" | "payouts" | "tiers">("chart");
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("10000");

  const totalSalesCount = PACKAGE_STATS.reduce((acc, curr) => acc + curr.salesCount, 0);
  const totalPackageIncome = PACKAGE_STATS.reduce((acc, curr) => acc + curr.totalIncome, 0);

  const handleApprovePayout = (id: string) => {
    setPayouts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "approved",
              payoutRef: `UTR${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            }
          : item
      )
    );
  };

  // SVG Donut calculation
  let cumulativeOffset = 0;
  const radius = 64;
  const circumference = 2 * Math.PI * radius; // ~402.12

  return (
    <div className="space-y-4 font-sans">
      {/* =========================================================================
          1. FIVE INCOME METRIC CARDS (Today, 7 Days, Last 30 Days, Total, Balance)
         ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Metric 1: Today's Income */}
        <div className="bg-white p-3.5 sm:p-4 border border-slate-200 shadow-xs rounded-[4px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                Today&apos;s Income
              </span>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-[3px] border border-emerald-200">
                +1 Sale
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
              ₹3,250
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">
            Credited today at 10:45 AM
          </p>
        </div>

        {/* Metric 2: Last 7 Days Income */}
        <div className="bg-white p-3.5 sm:p-4 border border-slate-200 shadow-xs rounded-[4px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                Last 7 Days
              </span>
              <span className="text-[9px] font-bold text-teal-800 bg-teal-50 px-1.5 py-0.2 rounded-[3px] border border-teal-200">
                5 Sales
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
              ₹18,400
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">
            Weekly active earnings
          </p>
        </div>

        {/* Metric 3: Last 30 Days Income */}
        <div className="bg-white p-3.5 sm:p-4 border border-slate-200 shadow-xs rounded-[4px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                Last 30 Days
              </span>
              <span className="text-[9px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded-[3px] border border-amber-200">
                18 Sales
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
              ₹78,400
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">
            Monthly active direct sales
          </p>
        </div>

        {/* Metric 4: Total Lifetime Earnings */}
        <div className="bg-white p-3.5 sm:p-4 border border-slate-200 shadow-xs rounded-[4px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                Total Earnings
              </span>
              <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded-[3px] border border-emerald-200">
                100% Active
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">
              ₹3,48,650
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">
            Across 118 direct students
          </p>
        </div>

        {/* Metric 5: Available Balance */}
        <div className="bg-white p-3.5 sm:p-4 border border-[#116E63]/30 shadow-xs rounded-[4px] flex flex-col justify-between col-span-2 sm:col-span-1 bg-teal-50/20">
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#116E63]">
                Available Balance
              </span>
              <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-[3px]">
                Instant
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#116E63] font-mono">
              ₹48,650
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-teal-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-medium">Ready</span>
            <button
              onClick={() => setWithdrawModalOpen(true)}
              className="text-xs font-bold text-[#116E63] hover:text-[#0c5c53] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <span>Withdraw</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. CIRCLE / DONUT CHART: TOTAL SALES COUNT & INCOME BY PACKAGE
         ========================================================================= */}
      <div className="bg-white border border-slate-200 p-4 sm:p-6 rounded-[4px] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#116E63]" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                Package-Wise Income &amp; Total Sales Count Distribution
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Breakdown of 118 total direct sales and ₹3,48,650 income generated across course packages
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-[4px] border border-slate-200">
              Total Sales: <strong className="text-slate-900">{totalSalesCount} Courses</strong>
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
                  stroke="#E2E8F0"
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
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Total Sales
                </span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono leading-none my-0.5">
                  {totalSalesCount}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 font-mono">
                  ₹3,48,650
                </span>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 mt-2 font-medium">
              Circle Chart: Proportion by Sales Count &amp; Income
            </span>
          </div>

          {/* RIGHT: Package Legend & Detailed Table Breakdown (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-[4px] overflow-hidden bg-slate-50/40">
              {PACKAGE_STATS.map((pkg, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs"
                      style={{ backgroundColor: pkg.color }}
                    ></span>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {pkg.name}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {pkg.category} &bull; {pkg.percentage}% of total
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-6 sm:pl-0">
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900 font-mono block">
                        {pkg.salesCount} Sales
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Units Sold
                      </span>
                    </div>

                    <div className="text-right min-w-[85px]">
                      <span className="text-xs font-bold text-emerald-700 font-mono block">
                        ₹{pkg.totalIncome.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Income Earned
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary Strip */}
            <div className="p-3 bg-slate-100/80 border border-slate-200 rounded-[4px] flex items-center justify-between text-xs font-bold">
              <span className="uppercase text-slate-700">Combined Direct Portfolio Total</span>
              <div className="flex items-center gap-4 font-mono">
                <span className="text-slate-900">{totalSalesCount} Courses Sold</span>
                <span className="text-emerald-700">₹{totalPackageIncome.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. TABS: COMMISSION LEDGER, PAYOUT REQUESTS, AND DIRECT INCOME TIERS
         ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-[4px] overflow-hidden shadow-xs">
        {/* Tab Headers */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 overflow-x-auto">
          <button
            onClick={() => setActiveTab("chart")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === "chart"
                ? "border-[#116E63] text-[#116E63] bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Direct Sales Matrix
          </button>
          <button
            onClick={() => setActiveTab("ledger")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === "ledger"
                ? "border-[#116E63] text-[#116E63] bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Income Ledger ({MOCK_COMMISSIONS.length})
          </button>
          <button
            onClick={() => setActiveTab("payouts")}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === "payouts"
                ? "border-[#116E63] text-[#116E63] bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Payout History ({payouts.length})
          </button>
        </div>

        {/* Tab Content 1: Direct Sales Commission Matrix */}
        {activeTab === "chart" && (
          <div className="p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Direct Commission Payout Matrix
                </h4>
                <p className="text-[11px] text-slate-500">
                  Earn 50% to 70% active direct commission on every student enrollment through your sponsor link.
                </p>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-800 font-mono font-bold px-2.5 py-1 rounded-[4px] border border-emerald-200">
                Rate: 50% - 70% Direct
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {COMMISSION_PLAN_TIERS.map((tier) => (
                <div
                  key={tier.level}
                  className="p-3.5 border border-slate-200 bg-white rounded-[4px] flex flex-col justify-between space-y-2 hover:border-[#116E63]/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {tier.level}
                      </span>
                      <span
                        className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-[4px] ${tier.badgeColor}`}
                      >
                        {tier.percentage}
                      </span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-xs uppercase">
                      {tier.name}
                    </h5>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500 text-[11px]">Payout Example:</span>
                    <span className="text-[#116E63] font-bold font-mono">
                      {tier.sampleOnCourse}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 2: Income Ledger Table */}
        {activeTab === "ledger" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs min-w-[580px]">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-2.5 px-4">Transaction / Time</th>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Course Package</th>
                  <th className="py-2.5 px-3">Package Fee</th>
                  <th className="py-2.5 px-3">Income Credited</th>
                  <th className="py-2.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {MOCK_COMMISSIONS.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-4">
                      <div className="font-bold text-slate-900 font-mono">
                        {rec.id}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {rec.date}
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900">
                        {rec.fromMemberName}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">
                        {rec.fromMemberId}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-800">
                      {rec.courseName}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                      {rec.coursePrice > 0 ? `₹${rec.coursePrice.toLocaleString()}` : "Milestone Target"}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-700 text-sm">
                      +₹{rec.commissionAmount.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <span className="inline-block text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-[3px]">
                        Credited
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab Content 3: Payout History */}
        {activeTab === "payouts" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs min-w-[560px]">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-2.5 px-4">Payout ID / Date</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Mode</th>
                  <th className="py-2.5 px-3">Account / VPA</th>
                  <th className="py-2.5 px-3">Reference / UTR</th>
                  <th className="py-2.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {payouts.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-4">
                      <div className="font-bold text-slate-900 font-mono">
                        {pay.id}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {pay.requestedDate}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 text-sm">
                      ₹{pay.amount.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="inline-block px-1.5 py-0.2 text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200 uppercase rounded-[3px]">
                        {pay.method}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-700">
                      {pay.accountDetails}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">
                      {pay.payoutRef || "—"}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      {pay.status === "approved" ? (
                        <span className="inline-block text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-[3px]">
                          PAID
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApprovePayout(pay.id)}
                          className="bg-[#116E63] hover:bg-[#0c5048] text-white font-bold px-3 py-1 text-xs transition-colors cursor-pointer uppercase tracking-wider rounded-[4px]"
                        >
                          Approve &amp; Pay
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Withdrawal Modal */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white max-w-md w-full p-5 border border-slate-300 shadow-xl space-y-4 rounded-[4px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                Withdraw Available Income
              </h3>
              <button
                onClick={() => setWithdrawModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-3 border border-slate-200 rounded-[4px]">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">
                Available Wallet Balance
              </span>
              <span className="text-xl font-bold text-[#116E63] font-mono">
                ₹48,650
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block uppercase">
                Withdrawal Amount (₹)
              </label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 focus:outline-none focus:border-[#116E63] font-semibold rounded-[4px]"
                placeholder="Enter amount (min ₹1,000)"
              />
              <span className="text-[11px] text-slate-500 block">
                Net payout after 5% statutory TDS: ₹{(Number(withdrawAmount) * 0.95).toFixed(0)}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block uppercase">
                Payout Destination
              </label>
              <select className="w-full px-3 py-2 text-xs border border-slate-200 focus:outline-none focus:border-[#116E63] font-bold text-slate-700 rounded-[4px]">
                <option>UPI ID: skillaura@icici</option>
                <option>Bank A/C: HDFC Bank (****4891)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setWithdrawModalOpen(false)}
                className="flex-1 py-2 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer uppercase rounded-[4px]"
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
