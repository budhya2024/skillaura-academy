"use client";

import React, { useState, useMemo } from "react";
import {
  DownlineMember,
  MOCK_DOWNLINE_LIST,
} from "../../lib/networkData";
import {
  Search,
  Filter,
  Users,
  Eye,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export default function DownlineTable() {
  const [search, setSearch] = useState("");
  const [rankFilter, setRankFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredMembers = useMemo(() => {
    return MOCK_DOWNLINE_LIST.filter((member) => {
      const matchSearch =
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.id.toLowerCase().includes(search.toLowerCase()) ||
        member.sponsorName.toLowerCase().includes(search.toLowerCase()) ||
        member.email.toLowerCase().includes(search.toLowerCase());

      const matchRank = rankFilter === "all" || member.rank === rankFilter;
      const matchStatus =
        statusFilter === "all" || member.status === statusFilter;

      return matchSearch && matchRank && matchStatus;
    });
  }, [search, rankFilter, statusFilter]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage) || 1;
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMembers.slice(start, start + itemsPerPage);
  }, [filteredMembers, currentPage, itemsPerPage]);

  const totalFilteredSales = useMemo(
    () => filteredMembers.reduce((acc, curr) => acc + curr.personalActiveSales, 0),
    [filteredMembers]
  );

  return (
    <div className="bg-white border border-slate-200 shadow-xs overflow-hidden flex flex-col rounded-[4px]">
      {/* Top Controls Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
              Direct Referral &amp; Sales Directory
            </h3>
            <p className="text-[11px] text-slate-500">
              Track your directly referred students, partners, and active direct sales performance
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 border border-slate-200 rounded-[4px]">
              Members: <strong className="text-slate-950">{filteredMembers.length}</strong>
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-200 rounded-[4px]">
              Personal Sales: <strong>{totalFilteredSales} Courses</strong>
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {/* Search Box */}
          <div className="relative md:col-span-2">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID, name, or sponsor..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 focus:outline-none focus:border-[#116E63] rounded-[4px]"
            />
          </div>

          {/* Rank Filter */}
          <select
            value={rankFilter}
            onChange={(e) => {
              setRankFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2 py-1.5 text-xs bg-white border border-slate-200 focus:outline-none focus:border-[#116E63] text-slate-700 font-bold rounded-[4px]"
          >
            <option value="all">All Ranks</option>
            <option value="Diamond Leader">Diamond Leader</option>
            <option value="Platinum Partner">Platinum Partner</option>
            <option value="Gold Associate">Gold Associate</option>
            <option value="Silver Member">Silver Member</option>
            <option value="Bronze Starter">Bronze Starter</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2 py-1.5 text-xs bg-white border border-slate-200 focus:outline-none focus:border-[#116E63] text-slate-700 font-bold rounded-[4px]"
          >
            <option value="all">All Status</option>
            <option value="active">Active Members</option>
            <option value="pending">Pending KYC</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px] tracking-wider">
              <th className="py-2.5 px-4">Member / ID</th>
              <th className="py-2.5 px-3">Joined Date</th>
              <th className="py-2.5 px-3">Direct Sponsor</th>
              <th className="py-2.5 px-3">Enrolled Course</th>
              <th className="py-2.5 px-3">Rank Tier</th>
              <th className="py-2.5 px-3">Directs</th>
              <th className="py-2.5 px-3">Personal Sales</th>
              <th className="py-2.5 px-3">Active Earnings</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
            {paginatedMembers.length > 0 ? (
              paginatedMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  {/* Member Name & ID */}
                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="w-6 h-6 bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center font-bold text-[10px] shrink-0 rounded-[4px]">
                        {member.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 leading-tight">
                          {member.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 font-semibold">
                          {member.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Joined Date */}
                  <td className="py-2.5 px-3">
                    <span className="font-mono text-slate-600 text-xs">
                      {member.joinDate}
                    </span>
                  </td>

                  {/* Sponsor */}
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-slate-800">
                      {member.sponsorName}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {member.sponsorId}
                    </div>
                  </td>

                  {/* Course Package */}
                  <td className="py-2.5 px-3">
                    <span className="text-slate-800 font-medium">
                      {member.package}
                    </span>
                  </td>

                  {/* Rank */}
                  <td className="py-2.5 px-3">
                    <span className="inline-block px-1.5 py-0.2 text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-300 uppercase rounded-[4px]">
                      {member.rank}
                    </span>
                  </td>

                  {/* Directs */}
                  <td className="py-2.5 px-3 font-bold text-slate-900 font-mono">
                    {member.directs}
                  </td>

                  {/* Personal Sales */}
                  <td className="py-2.5 px-3 font-mono">
                    <span className="font-bold text-slate-900">
                      {member.personalActiveSales} Courses
                    </span>
                  </td>

                  {/* Total Earnings */}
                  <td className="py-2.5 px-3 font-bold text-emerald-700 font-mono">
                    ₹{member.totalCommission.toLocaleString()}
                  </td>

                  {/* Status */}
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.2 text-[9px] font-black uppercase rounded-[4px] ${member.status === "active"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-2.5 px-4 text-right">
                    <button
                      onClick={() =>
                        alert(
                          `Member Details:\nName: ${member.name}\nID: ${member.id}\nSponsor: ${member.sponsorName}\nRank: ${member.rank}\nTotal Commission: ₹${member.totalCommission}\nEmail: ${member.email}\nPhone: ${member.phone}`
                        )
                      }
                      className="p-1 text-slate-500 hover:text-[#116E63] border border-slate-200 hover:bg-slate-100 transition-colors rounded-[4px]"
                      title="Inspect Member"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="py-8 text-center text-slate-500">
                  No downline members match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
        <div>
          Showing{" "}
          <strong className="text-slate-900">
            {paginatedMembers.length}
          </strong>{" "}
          of <strong className="text-slate-900">{filteredMembers.length}</strong>{" "}
          members
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 border border-slate-200 bg-white text-slate-700 disabled:opacity-40 hover:bg-slate-100 cursor-pointer rounded-[4px]"
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
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
