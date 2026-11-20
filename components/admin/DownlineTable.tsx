"use client";

import React, { useState, useMemo } from "react";
import {
  DownlineMember,
  MOCK_DOWNLINE_LIST,
} from "../../lib/networkData";
import {
  Search,
  Users,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  User,
  Mail,
  Phone,
  Calendar,
  Award,
  Wallet,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function DownlineTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState<DownlineMember | null>(null);
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

  return (
    <div className="bg-white border border-slate-200 shadow-xs overflow-hidden flex flex-col rounded-[4px] font-sans">
      {/* Top Header & Search Controls */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
            Direct Team Members ({filteredMembers.length})
          </h3>
          <p className="text-[11px] text-slate-500">
            Active directly enrolled students and partners.
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
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 focus:outline-none focus:border-[#116E63] rounded-[4px] text-slate-800"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1.5 text-xs bg-white border border-slate-200 focus:outline-none focus:border-[#116E63] text-slate-700 font-semibold rounded-[4px] cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Clean Streamlined Table (Extra Info Hidden) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs min-w-[500px]">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px] tracking-wider">
              <th className="py-2.5 px-4">Member Name &amp; ID</th>
              <th className="py-2.5 px-3">Enrolled Course</th>
              <th className="py-2.5 px-3">Personal Sales</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {paginatedMembers.length > 0 ? (
              paginatedMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  {/* Member Name & ID */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center font-bold text-[10px] shrink-0 rounded-[4px]">
                        {member.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 leading-tight">
                          {member.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">
                          {member.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Course Package */}
                  <td className="py-3 px-3">
                    <span className="text-slate-800 font-medium line-clamp-1">
                      {member.package}
                    </span>
                  </td>

                  {/* Personal Sales */}
                  <td className="py-3 px-3 font-mono">
                    <span className="font-bold text-slate-900">
                      {member.personalActiveSales} Courses
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase rounded-[4px] ${
                        member.status === "active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  {/* Action View Button */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="px-2.5 py-1 text-xs font-bold text-[#116E63] bg-[#116E63]/10 hover:bg-[#116E63] hover:text-white border border-[#116E63]/30 rounded-[4px] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="View Member Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500 text-xs">
                  No members found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
        <div>
          Showing <strong className="text-slate-900">{paginatedMembers.length}</strong> of{" "}
          <strong className="text-slate-900">{filteredMembers.length}</strong> members
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 border border-slate-200 bg-white text-slate-700 disabled:opacity-40 hover:bg-slate-100 cursor-pointer rounded-[4px]"
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
            className="p-1.5 border border-slate-200 bg-white text-slate-700 disabled:opacity-40 hover:bg-slate-100 cursor-pointer rounded-[4px]"
            aria-label="Next Page"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          VIEW BUTTON CLICK: MEMBER DETAILS MODAL / DRAWER
         ========================================================================= */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-lg border border-slate-300 shadow-xl rounded-[4px] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[4px] bg-[#116E63] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {selectedMember.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white uppercase font-[family-name:var(--font-yantramanav)]">
                    {selectedMember.name}
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400">
                    ID: {selectedMember.id}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="w-7 h-7 rounded-[4px] bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body with Structured Member Details */}
            <div className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              {/* Status & Rank Card */}
              <div className="grid grid-cols-2 gap-2.5 bg-slate-50 p-3 rounded-[4px] border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Account Status
                  </span>
                  <span
                    className={`inline-block mt-0.5 px-2 py-0.5 text-[10px] font-bold uppercase rounded-[4px] ${
                      selectedMember.status === "active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {selectedMember.status}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Rank Tier
                  </span>
                  <span className="font-bold text-slate-800 mt-0.5 block">
                    {selectedMember.rank}
                  </span>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Sales &amp; Income Performance
                </span>
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-[4px] border border-slate-200 text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Personal Sales</span>
                    <strong className="text-slate-900 font-mono text-sm block">
                      {selectedMember.personalActiveSales}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Direct Team</span>
                    <strong className="text-slate-900 font-mono text-sm block">
                      {selectedMember.directs}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Total Earnings</span>
                    <strong className="text-emerald-700 font-mono text-sm block">
                      ₹{selectedMember.totalCommission.toLocaleString()}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Course & Sponsor Details */}
              <div className="space-y-2 border border-slate-200 rounded-[4px] p-3 bg-white">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Enrolled Course:</span>
                  <span className="font-bold text-slate-900 text-right">
                    {selectedMember.package}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Direct Sponsor:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedMember.sponsorName}{" "}
                    <span className="font-mono text-slate-500 text-[11px]">
                      ({selectedMember.sponsorId})
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Joined Date:</span>
                  <span className="font-mono text-slate-700">
                    {selectedMember.joinDate}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Email Address:</span>
                  <span className="font-mono text-slate-800">
                    {selectedMember.email}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Phone / Mobile:</span>
                  <span className="font-mono text-slate-800">
                    {selectedMember.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedMember(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-[4px] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
