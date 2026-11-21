"use client";

import React, { useState } from "react";
import { MOCK_PAYOUTS, PayoutRequest } from "../../lib/networkData";
import {
  Wallet,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpRight,
  Search,
  Filter,
  Check,
  CreditCard,
  Building2,
  ShieldCheck,
  Send,
} from "lucide-react";

export default function SuperAdminPayoutsManager() {
  const [payouts, setPayouts] = useState<PayoutRequest[]>(MOCK_PAYOUTS);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const handleApprove = (id: string, amount: number) => {
    const utr = `UTR${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    setPayouts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "approved",
              payoutRef: utr,
            }
          : item
      )
    );
    setActionSuccess(`Payout ${id} of ₹${amount.toLocaleString()} approved! UTR: ${utr}`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const handleReject = (id: string) => {
    setPayouts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "rejected",
              payoutRef: "REJECTED_INVALID_VPA",
            }
          : item
      )
    );
    setActionSuccess(`Payout request ${id} rejected.`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const filteredPayouts = payouts.filter((p) => {
    const matchesSearch =
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.accountDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.payoutRef && p.payoutRef.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "pending" && p.status === "pending") ||
      (filterStatus === "approved" && p.status === "approved");

    return matchesSearch && matchesFilter;
  });

  const pendingCount = payouts.filter((p) => p.status === "pending").length;
  const pendingAmount = payouts
    .filter((p) => p.status === "pending")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalPaidOut = payouts
    .filter((p) => p.status === "approved")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* Toast Alert */}
      {actionSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-[4px] flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess(null)} className="text-emerald-700 dark:text-emerald-400">✕</button>
        </div>
      )}

      {/* Top Settlement KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Pending Super Admin Approvals
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
              ₹{pendingAmount.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
              ({pendingCount} Requests)
            </span>
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">Awaiting payment disbursement</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Total Commission Disbursed
          </span>
          <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono block mt-0.5">
            ₹{totalPaidOut.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">100% direct bank / UPI transfers</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Average Settlement Time
          </span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono block mt-0.5">
            &lt; 2 Hours
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">Automated IMPS &amp; UPI Rails</span>
        </div>
      </div>

      {/* Payout Queue Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4px] shadow-xs overflow-hidden">
        {/* Controls Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-800/60">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Payout ID, VPA, UTR..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white focus:outline-none focus:border-[#116E63] dark:focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[4px] p-0.5">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1 text-[11px] font-bold uppercase rounded-[3px] cursor-pointer ${
                filterStatus === "all"
                  ? "bg-[#116E63] text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              All ({payouts.length})
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`px-3 py-1 text-[11px] font-bold uppercase rounded-[3px] cursor-pointer ${
                filterStatus === "pending"
                  ? "bg-[#116E63] text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilterStatus("approved")}
              className={`px-3 py-1 text-[11px] font-bold uppercase rounded-[3px] cursor-pointer ${
                filterStatus === "approved"
                  ? "bg-[#116E63] text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Paid Out
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px] min-w-[720px]">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 uppercase font-bold text-[13px] tracking-wider">
                <th className="py-2.5 px-3 w-12 sm:w-14 text-center">SL No.</th>
                <th className="py-2.5 px-4">Payout ID / Date</th>
                <th className="py-2.5 px-3">Requested Amount</th>
                <th className="py-2.5 px-3">Transfer Mode</th>
                <th className="py-2.5 px-3">Beneficiary VPA / A/C</th>
                <th className="py-2.5 px-3">Bank UTR Reference</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-4 text-right">Super Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-800 dark:text-slate-200">
              {filteredPayouts.map((pay, idx) => (
                <tr key={pay.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-500 dark:text-slate-400 text-[13px]">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="font-bold text-slate-900 dark:text-white font-mono block text-[13px]">
                      {pay.id}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {pay.requestedDate}
                    </span>
                  </td>

                  <td className="py-2.5 px-3 font-mono font-black text-slate-900 dark:text-white text-base">
                    ₹{pay.amount.toLocaleString()}
                  </td>

                  <td className="py-2.5 px-3">
                    <span className="inline-block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase font-mono">
                      {pay.method}
                    </span>
                  </td>

                  <td className="py-2.5 px-3 font-mono text-slate-700 dark:text-slate-300 text-[13px]">
                    {pay.accountDetails}
                  </td>

                  <td className="py-2.5 px-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                    {pay.payoutRef || "—"}
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    {pay.status === "approved" ? (
                      <span className="inline-block text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">
                        PAID ✓
                      </span>
                    ) : pay.status === "rejected" ? (
                      <span className="inline-block text-xs font-bold uppercase text-rose-700 dark:text-rose-400">
                        REJECTED
                      </span>
                    ) : (
                      <span className="inline-block text-xs font-bold uppercase text-amber-700 dark:text-amber-400">
                        PENDING
                      </span>
                    )}
                  </td>

                  <td className="py-2.5 px-4 text-right">
                    {pay.status === "pending" ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleApprove(pay.id, pay.amount)}
                          className="bg-[#116E63] hover:bg-[#0c5c53] text-white font-bold px-3 py-1.5 text-xs uppercase tracking-wider rounded-[3px] cursor-pointer transition-colors shadow-2xs"
                        >
                          Approve &amp; Pay
                        </button>
                        <button
                          onClick={() => handleReject(pay.id)}
                          className="border border-slate-300 hover:bg-rose-50 text-rose-600 hover:text-rose-700 font-bold px-2.5 py-1.5 text-xs uppercase tracking-wider rounded-[3px] cursor-pointer transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}