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
} from "lucide-react";

export default function CommissionPlanSection() {
  const [payouts, setPayouts] = useState<PayoutRequest[]>(MOCK_PAYOUTS);
  const [activeTab, setActiveTab] = useState<"tiers" | "ledger" | "payouts">(
    "tiers"
  );
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("10000");

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

  return (
    <div className="space-y-5 font-sans">
      {/* Active Income Model Header Banner */}
      <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-xs rounded-[4px]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-emerald-600 text-white font-black text-[10px] px-2 py-0.5 uppercase tracking-wider rounded-[4px]">
            Active Income Only
          </span>
          <span className="font-bold">
            100% Direct Sales Active Model &bull; Zero Passive Overrides &bull; Zero Pyramid Residuals
          </span>
        </div>
        <span className="text-[11px] font-mono text-emerald-800 font-bold">
          High-Commission Direct Pay: Up to 70% per personal sale
        </span>
      </div>

      {/* Top 4 Wallet & Active Summary Metrics (4px rounded, no left-border) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-4 border border-slate-200 shadow-xs rounded-[4px]">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Available Wallet
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 border border-emerald-200 uppercase rounded-[4px]">
              Instant
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 font-[family-name:var(--font-yantramanav)] font-mono">
            ₹48,650
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[11px] text-emerald-700 font-bold">
              Ready for Payout
            </span>
            <button
              onClick={() => setWithdrawModalOpen(true)}
              className="text-xs font-bold text-[#116E63] hover:underline cursor-pointer uppercase tracking-wider"
            >
              Withdraw &rarr;
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 border border-slate-200 shadow-xs rounded-[4px]">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Total Active Direct Income
            </span>
            <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-1.5 py-0.2 border border-teal-200 uppercase rounded-[4px]">
              100% Active
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 font-[family-name:var(--font-yantramanav)] font-mono">
            ₹3,48,500
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-medium">
            Earned from your direct personal sales
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 border border-slate-200 shadow-xs rounded-[4px]">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Personal Active Enrollments
            </span>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.2 border border-amber-200 uppercase rounded-[4px]">
              Direct Sales
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 font-[family-name:var(--font-yantramanav)] font-mono">
            118 Students
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-medium">
            Active Milestone Bonus Unlocked: <strong className="text-slate-800">+₹15,000</strong>
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 border border-slate-200 shadow-xs rounded-[4px]">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Total Disbursed Payouts
            </span>
            <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-1.5 py-0.2 border border-blue-200 uppercase rounded-[4px]">
              UPI / Bank
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 font-[family-name:var(--font-yantramanav)] font-mono">
            ₹2,99,850
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-medium">
            Settled directly into verified bank
          </p>
        </div>
      </div>

      {/* Tabs Bar (Scrollable on Mobile) */}
      <div className="flex border-b border-slate-200 bg-white px-2 sm:px-3 pt-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("tiers")}
          className={`py-2 sm:py-2.5 px-3 sm:px-4 text-xs font-black uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === "tiers"
              ? "border-[#116E63] text-[#116E63]"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Active Income Plan &amp; Direct Tiers
        </button>
        <button
          onClick={() => setActiveTab("ledger")}
          className={`py-2 sm:py-2.5 px-3 sm:px-4 text-xs font-black uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === "ledger"
              ? "border-[#116E63] text-[#116E63]"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Active Commission Ledger ({MOCK_COMMISSIONS.length})
        </button>
        <button
          onClick={() => setActiveTab("payouts")}
          className={`py-2 sm:py-2.5 px-3 sm:px-4 text-xs font-black uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === "payouts"
              ? "border-[#116E63] text-[#116E63]"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Payout Queue ({payouts.length})
        </button>
      </div>

      {/* Tab 1: Active Income Tiers */}
      {activeTab === "tiers" && (
        <div className="bg-white border-x border-b border-slate-300 p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                Direct Active Sales Commission Matrix
              </h3>
              <p className="text-[11px] text-slate-500">
                You earn high active commissions (50% to 70%) on every student who enrolls directly through your sponsor link
              </p>
            </div>
            <span className="text-xs bg-[#0A1628] text-[#FDA31B] font-mono font-bold px-2.5 py-1">
              Active Commission Rate: 50% - 70% Direct
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMMISSION_PLAN_TIERS.map((tier) => (
              <div
                key={tier.level}
                className="p-4 border border-slate-300 bg-white flex flex-col justify-between space-y-3 shadow-xs hover:border-slate-500 transition-colors rounded-[4px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                      {tier.level}
                    </span>
                    <span
                      className={`text-[10px] font-black text-white px-2 py-0.5 rounded-[4px] ${tier.badgeColor}`}
                    >
                      {tier.percentage}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase">
                    {tier.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500 text-[11px]">Direct Earnings:</span>
                  <span className="text-[#116E63] font-bold font-mono">
                    {tier.sampleOnCourse}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Active Income Principle Banner */}
          <div className="p-4 bg-slate-50 border border-slate-300 space-y-2 text-xs text-slate-700 rounded-[4px]">
            <div className="flex items-center gap-2 font-black uppercase text-slate-900 text-[11px] tracking-wider">
              <Zap className="w-4 h-4 text-[#FDA31B]" />
              <span>Why Active Income Direct Selling is Better &amp; 100% Compliant:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 leading-relaxed text-[11px]">
              <li><strong>No Passive Dependency:</strong> You don&apos;t wait for downline members to make sales. Every rupee you earn is the direct fruit of your active personal recommendations.</li>
              <li><strong>Highest Payout Percentage:</strong> Because there are no multi-level downline cuts, up to 70% of the course fee goes straight into your pocket as active commission.</li>
              <li><strong>Instant Real-Time Credit:</strong> As soon as a referred student completes enrollment checkout, your active direct commission is immediately credited to your available wallet.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: Active Commission Ledger */}
      {activeTab === "ledger" && (
        <div className="bg-white border-x border-b border-slate-300 overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Real-Time Active Income Transactions Feed
            </span>
            <span className="text-[11px] font-mono text-emerald-700 font-bold">
              ● Instant Direct Payouts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-600 uppercase font-black text-[10px] tracking-wider">
                  <th className="py-2.5 px-4">Transaction / Time</th>
                  <th className="py-2.5 px-3">Enrolled Student / Activity</th>
                  <th className="py-2.5 px-3">Commission Type</th>
                  <th className="py-2.5 px-3">Course Package</th>
                  <th className="py-2.5 px-3">Package Price</th>
                  <th className="py-2.5 px-3">Active Income Credited</th>
                  <th className="py-2.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                {MOCK_COMMISSIONS.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-4">
                      <div className="font-bold text-slate-900 font-mono">
                        {rec.id}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
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
                    <td className="py-2.5 px-3">
                      <span className="inline-block px-1.5 py-0.2 text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-300 uppercase">
                        {rec.tierType}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-800">
                      {rec.courseName}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                      {rec.coursePrice > 0 ? `₹${rec.coursePrice.toLocaleString()}` : "Milestone Target"}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-black text-emerald-700 text-sm">
                      +₹{rec.commissionAmount.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <span className="inline-block text-[9px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 border border-emerald-300">
                        CREDITED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Payout Requests */}
      {activeTab === "payouts" && (
        <div className="bg-white border-x border-b border-slate-300 overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Active Income Settlement &amp; Payout Queue
            </span>
            <span className="text-[11px] text-slate-600">
              Minimum Threshold: <strong>₹1,000</strong> | Disbursed via UPI &amp; IMPS
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-600 uppercase font-black text-[10px] tracking-wider">
                  <th className="py-2.5 px-4">Payout ID / Date</th>
                  <th className="py-2.5 px-3">Member Details</th>
                  <th className="py-2.5 px-3">Requested Amount</th>
                  <th className="py-2.5 px-3">Payment Mode</th>
                  <th className="py-2.5 px-3">Account / VPA</th>
                  <th className="py-2.5 px-3">Reference / UTR</th>
                  <th className="py-2.5 px-4 text-right">Action / Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
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
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900">
                        {pay.memberName}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">
                        {pay.memberId}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-black text-slate-900 text-sm">
                      ₹{pay.amount.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="inline-block px-1.5 py-0.2 text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-300 uppercase">
                        {pay.method}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-800">
                      {pay.accountDetails}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">
                      {pay.payoutRef || "—"}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      {pay.status === "approved" ? (
                        <span className="inline-block text-[9px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 border border-emerald-300 rounded-[4px]">
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
        </div>
      )}

      {/* Withdrawal Modal */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white max-w-md w-full p-6 border border-slate-400 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto rounded-[4px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider">
                Request Active Income Withdrawal
              </h3>
              <button
                onClick={() => setWithdrawModalOpen(false)}
                className="text-slate-500 hover:text-slate-900 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-3 border border-slate-300 rounded-[4px]">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">
                Available Wallet Balance
              </span>
              <span className="text-xl font-black text-slate-900 font-mono">
                ₹48,650
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block uppercase">
                Withdrawal Amount (₹)
              </label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 focus:outline-none focus:border-[#116E63] font-semibold rounded-[4px]"
                placeholder="Enter amount (min ₹1,000)"
              />
              <span className="text-[11px] text-slate-500 block">
                Net payout after 5% statutory TDS: ₹{(Number(withdrawAmount) * 0.95).toFixed(0)}
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block uppercase">
                Payout Destination
              </label>
              <select className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#116E63] font-bold text-slate-700 rounded-[4px]">
                <option>UPI ID: skillaura@icici</option>
                <option>Bank A/C: HDFC Bank (****4891)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setWithdrawModalOpen(false)}
                className="flex-1 py-2 border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer uppercase rounded-[4px]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(
                    `Active withdrawal request for ₹${withdrawAmount} submitted successfully!`
                  );
                  setWithdrawModalOpen(false);
                }}
                className="flex-1 py-2 bg-[#116E63] hover:bg-[#0c5048] text-white text-xs font-bold transition-colors cursor-pointer uppercase tracking-wider rounded-[4px]"
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
