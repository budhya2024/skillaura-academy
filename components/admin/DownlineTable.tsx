"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  DownlineMember,
  MOCK_DOWNLINE_LIST,
} from "../../lib/networkData";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  User,
  Mail,
  Phone,
  Calendar,
  Wallet,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";

export default function DownlineTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState<DownlineMember | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const itemsPerPage = 8;

  const filteredMembers = useMemo(() => {
    return MOCK_DOWNLINE_LIST.filter((member) => {
      const matchSearch =
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.id.toLowerCase().includes(search.toLowerCase()) ||
        member.package.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" || member.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage) || 1;
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMembers.slice(start, start + itemsPerPage);
  }, [filteredMembers, currentPage, itemsPerPage]);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col rounded-[4px] font-sans transition-colors">
      {/* Top Header & Search Controls */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
            Direct Team Members ({filteredMembers.length})
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Active directly enrolled students and direct partners.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search member, ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#116E63] rounded-[4px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#116E63] text-slate-700 dark:text-slate-200 font-semibold rounded-[4px] cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Streamlined Table (Personal Sales Removed, Income Shown) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[540px]">
          <thead>
            <tr className="bg-slate-100/70 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 uppercase font-bold text-xs tracking-wider whitespace-nowrap">
              <th className="py-2.5 px-2 w-10 text-center">#</th>
              <th className="py-2.5 px-3">Member &amp; ID</th>
              <th className="py-2.5 px-2.5">Course</th>
              <th className="py-2.5 px-2.5">Earning</th>
              <th className="py-2.5 px-2.5">Status</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-800 dark:text-slate-200">
            {paginatedMembers.length > 0 ? (
              paginatedMembers.map((member, idx) => (
                <tr
                  key={member.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors whitespace-nowrap"
                >
                  {/* Serial Number */}
                  <td className="py-2.5 px-2 text-center font-mono font-bold text-slate-500 dark:text-slate-400 text-xs">
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </td>

                  {/* Member Name & ID */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0 relative shadow-2xs">
                        <Image
                          src="/images/founder.jpeg"
                          alt={member.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white leading-tight text-xs sm:text-sm">
                          {member.name}
                        </div>
                        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">
                          ID: {member.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Course Package */}
                  <td className="py-2.5 px-2.5">
                    <span className="text-slate-800 dark:text-slate-300 font-medium text-xs sm:text-sm">
                      {member.package}
                    </span>
                  </td>

                  {/* My Earning */}
                  <td className="py-2.5 px-2.5 font-mono">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm sm:text-base block">
                      +₹{member.totalCommission.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-sans uppercase font-semibold">
                      My Commission
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-2.5 px-2.5">
                    <span
                      className={`inline-flex items-center text-xs font-bold uppercase ${member.status === "active"
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-amber-700 dark:text-amber-400"
                        }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  {/* Action View Button -> Opens Right-Side Drawer (Full Deep Color Background) */}
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-[#116E63] hover:bg-[#0c5c53] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-[4px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      title="View Member Details on Right Side"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 dark:text-slate-400 text-xs">
                  No members found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
        <div>
          Showing <strong className="text-slate-900 dark:text-white">{paginatedMembers.length}</strong> of{" "}
          <strong className="text-slate-900 dark:text-white">{filteredMembers.length}</strong> members
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer rounded-[4px]"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 font-bold font-mono">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer rounded-[4px]"
            aria-label="Next Page"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          RIGHT-SIDE SLIDE-OVER DRAWER (OPENS ON RIGHT SIDE ON VIEW CLICK)
         ========================================================================= */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedMember(null)}
          />

          {/* Right-Side Drawer Panel */}
          <div className="relative w-full max-w-md sm:max-w-md bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col h-full z-50 shadow-2xl border-l border-slate-200 dark:border-slate-800 overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="bg-slate-900 dark:bg-slate-950 text-white p-4 flex items-center justify-between shrink-0 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-[family-name:var(--font-yantramanav)]">
                Member Profile Details
              </span>
              <button
                onClick={() => setSelectedMember(null)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-5 space-y-5 flex-1 overflow-y-auto text-xs">
              {/* Circle Profile Image & Member ID Highlight */}
              <div className="text-center space-y-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                {/* CIRCLE PROFILE IMAGE */}
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#116E63]/30 bg-slate-100 dark:bg-slate-800 shadow-md relative mx-auto ring-4 ring-slate-50 dark:ring-slate-800">
                  <Image
                    src="/images/founder.jpeg"
                    alt={selectedMember.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white uppercase font-[family-name:var(--font-yantramanav)]">
                    {selectedMember.name}
                  </h4>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {selectedMember.rank}
                  </div>
                </div>

                {/* MEMBER ID WITH QUICK COPY */}
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                    Member ID: <strong className="text-slate-950 dark:text-white">{selectedMember.id}</strong>
                  </span>
                  <button
                    onClick={() => handleCopyId(selectedMember.id)}
                    className="p-1 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-600 dark:text-slate-300 hover:text-[#116E63] cursor-pointer"
                    title="Copy Member ID"
                  >
                    {copiedId ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* MY EARNING DISPLAY CARD (Prominently Highlighted) */}
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-[4px] text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                  My Earning From This Student
                </span>
                <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono block">
                  +₹{selectedMember.totalCommission.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400/80 font-medium block">
                  Direct Referral Commission Credited &bull; KYC Verified
                </span>
              </div>

              {/* Account Status */}
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[4px]">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Account Status:</span>
                <span
                  className={`text-xs font-bold uppercase ${selectedMember.status === "active"
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-amber-700 dark:text-amber-400"
                    }`}
                >
                  {selectedMember.status}
                </span>
              </div>

              {/* Enrolled Course & Direct Team Details */}
              <div className="space-y-2 border border-slate-200 dark:border-slate-800 rounded-[4px] p-3.5 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Enrolled Course:</span>
                  <span className="font-bold text-slate-900 dark:text-white text-right max-w-[200px] truncate">
                    {selectedMember.package}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Direct Sponsor:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedMember.sponsorName}{" "}
                    <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">
                      ({selectedMember.sponsorId})
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Joining Date:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">
                    {selectedMember.joinDate}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Direct Referrals:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {selectedMember.directs} Students
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Official Email:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">
                    {selectedMember.email}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Phone / WhatsApp:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">
                    {selectedMember.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedMember(null)}
                className="w-full py-2 bg-[#116E63] hover:bg-[#0c5c53] text-white font-bold text-xs uppercase tracking-wider rounded-[4px] transition-colors cursor-pointer text-center"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
