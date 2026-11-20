"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Download,
  ExternalLink,
  ChevronRight,
  Eye,
  Check,
  X,
  FileText,
  CreditCard,
  Building,
  User,
  Phone,
  Mail,
  Calendar,
  Share2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  KycRecord,
  INITIAL_KYC_RECORDS,
  getKycRecords,
  saveKycRecords,
  updateKycStatus,
} from "../../lib/kycData";

export default function SuperAdminKYCManager() {
  const [records, setRecords] = useState<KycRecord[]>(INITIAL_KYC_RECORDS);

  useEffect(() => {
    // Load persisted KYC registry
    setRecords(getKycRecords());

    const handleSync = () => {
      setRecords(getKycRecords());
    };

    window.addEventListener("skillaura_kyc_updated", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("skillaura_kyc_updated", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "verified" | "rejected">("all");
  const [docFilter, setDocFilter] = useState<string>("all");

  // Inspection Drawer & Modal state
  const [selectedRecord, setSelectedRecord] = useState<KycRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [rejectingRecord, setRejectingRecord] = useState<KycRecord | null>(null);
  const [customRejectReason, setCustomRejectReason] = useState("");
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Computed metrics
  const totalCount = records.length;
  const pendingCount = records.filter((r) => r.status === "pending").length;
  const verifiedCount = records.filter((r) => r.status === "verified").length;
  const rejectedCount = records.filter((r) => r.status === "rejected").length;

  // Filtered list
  const filteredRecords = records.filter((r) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      r.studentName.toLowerCase().includes(query) ||
      r.studentId.toLowerCase().includes(query) ||
      r.studentEmail.toLowerCase().includes(query) ||
      r.studentPhone.includes(query) ||
      r.docNumber.toLowerCase().includes(query) ||
      r.upiId.toLowerCase().includes(query);

    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    const matchesDoc = docFilter === "all" || r.docType === docFilter;

    return matchesSearch && matchesStatus && matchesDoc;
  });

  // Action: Approve
  const handleApprove = (recordId: string) => {
    const updated = updateKycStatus(recordId, "verified");
    if (updated) {
      setRecords(getKycRecords());
      if (selectedRecord && selectedRecord.id === recordId) {
        setSelectedRecord(updated);
      }
    }

    setNotificationMsg("KYC verification approved successfully & synchronized with Student Portal!");
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  // Action: Open Reject Modal
  const handleOpenReject = (record: KycRecord) => {
    setRejectingRecord(record);
    setCustomRejectReason("");
  };

  // Action: Confirm Rejection
  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingRecord) return;

    const finalReason =
      customRejectReason.trim() ||
      "Document unreadable or bank account details mismatch with registered identity.";

    const updated = updateKycStatus(rejectingRecord.id, "rejected", finalReason);
    if (updated) {
      setRecords(getKycRecords());
      if (selectedRecord && selectedRecord.id === rejectingRecord.id) {
        setSelectedRecord(updated);
      }
    }

    setNotificationMsg("KYC application rejected with student feedback note & synchronized!");
    setRejectingRecord(null);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      "Application ID",
      "Student ID",
      "Student Name",
      "Phone",
      "Email",
      "Document Type",
      "Document Number",
      "Bank Name",
      "Account Number",
      "IFSC Code",
      "UPI ID",
      "Submission Date",
      "Status",
      "Reviewed Date",
      "Rejection Note",
    ];

    const rows = filteredRecords.map((r) => [
      r.id,
      r.studentId,
      `"${r.studentName}"`,
      r.studentPhone,
      r.studentEmail,
      r.docType,
      r.docNumber,
      `"${r.bankName}"`,
      r.accountNumber,
      r.ifscCode,
      r.upiId,
      r.submittedDate,
      r.status,
      r.reviewedDate || "N/A",
      `"${r.rejectionReason || "None"}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SkillAura-KYC-Registry-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-[4px] flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{notificationMsg}</span>
          </div>
          <button
            onClick={() => setNotificationMsg(null)}
            className="text-xs hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Banner & Action */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
              KYC &amp; Identity Verification Console
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Review Indian government ID cards, verify bank passbooks &amp; UPI handles for affiliate payouts
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Registry CSV</span>
          </button>
        </div>
      </div>

      {/* Metric Cards - Clean styling without boxed badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Applications */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 rounded-[4px] shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Applications
            </span>
            <FileText className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
            {totalCount}
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block">
            Submitted by enrolled students
          </span>
        </div>

        {/* Pending Action Required */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 rounded-[4px] shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Action Required
            </span>
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-amber-700 dark:text-amber-400">
            {pendingCount}
          </div>
          <span className="text-[10px] text-amber-700/80 dark:text-amber-400/80 font-medium block">
            Awaiting manual document review
          </span>
        </div>

        {/* Approved & Verified */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 rounded-[4px] shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              KYC Verified
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-emerald-700 dark:text-emerald-400">
            {verifiedCount}
          </div>
          <span className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80 font-medium block">
            Eligible for direct bank withdrawals
          </span>
        </div>

        {/* Rejected / Incomplete */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 rounded-[4px] shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
              Rejected / Needs Resubmit
            </span>
            <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-rose-700 dark:text-rose-400">
            {rejectedCount}
          </div>
          <span className="text-[10px] text-rose-700/80 dark:text-rose-400/80 font-medium block">
            Student notified to correct info
          </span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4px] shadow-xs overflow-hidden">
        {/* Controls Toolbar: Search & Filter Tabs */}
        <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student, ID, phone, Aadhaar/PAN, UPI..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white focus:outline-none focus:border-[#116E63]"
            />
          </div>

          {/* Right Filters: Status Tabs & Doc Type Dropdown */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={docFilter}
              onChange={(e) => setDocFilter(e.target.value)}
              className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-[4px] px-2.5 py-1.5 focus:outline-none focus:border-[#116E63]"
            >
              <option value="all">All ID Types</option>
              <option value="Aadhaar Card">Aadhaar Card</option>
              <option value="PAN Card">PAN Card</option>
              <option value="Voter ID">Voter ID</option>
              <option value="Passport">Passport</option>
            </select>

            {/* Status Tabs */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[4px] p-0.5">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-2.5 py-1 text-xs font-bold uppercase transition-colors cursor-pointer rounded-[3px] ${
                  statusFilter === "all"
                    ? "bg-[#116E63] text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                All ({records.length})
              </button>
              <button
                onClick={() => setStatusFilter("pending")}
                className={`px-2.5 py-1 text-xs font-bold uppercase transition-colors cursor-pointer rounded-[3px] ${
                  statusFilter === "pending"
                    ? "bg-[#116E63] text-white"
                    : "text-amber-700 dark:text-amber-400 hover:text-amber-900"
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setStatusFilter("verified")}
                className={`px-2.5 py-1 text-xs font-bold uppercase transition-colors cursor-pointer rounded-[3px] ${
                  statusFilter === "verified"
                    ? "bg-[#116E63] text-white"
                    : "text-emerald-700 dark:text-emerald-400 hover:text-emerald-900"
                }`}
              >
                Verified ({verifiedCount})
              </button>
              <button
                onClick={() => setStatusFilter("rejected")}
                className={`px-2.5 py-1 text-xs font-bold uppercase transition-colors cursor-pointer rounded-[3px] ${
                  statusFilter === "rejected"
                    ? "bg-[#116E63] text-white"
                    : "text-rose-700 dark:text-rose-400 hover:text-rose-900"
                }`}
              >
                Rejected ({rejectedCount})
              </button>
            </div>
          </div>
        </div>

        {/* KYC Registry Table - Minimized Clean Layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[880px]">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 uppercase font-bold text-xs tracking-wider">
                <th className="py-3 px-3 w-12 text-center">SL No.</th>
                <th className="py-3 px-3">Student</th>
                <th className="py-3 px-3">Document</th>
                <th className="py-3 px-3">Bank / Payout</th>
                <th className="py-3 px-3">Submission Date</th>
                <th className="py-3 px-3 text-center">KYC Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-800 dark:text-slate-200">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400 text-xs">
                    No KYC verification records match the selected filter or search query.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    {/* 1. SL No. */}
                    <td className="py-3 px-3 text-center font-mono font-semibold text-slate-500 dark:text-slate-400 text-xs">
                      {idx + 1}
                    </td>

                    {/* 2. Student (Minimized: Clean Avatar, Name & ID only) */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full overflow-hidden relative bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 shadow-2xs">
                          <Image
                            src={item.avatarImage}
                            alt={item.studentName}
                            fill
                            sizes="32px"
                            className="object-cover object-top"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate leading-tight">
                            {item.studentName}
                          </div>
                          <span className="font-mono text-xs text-[#116E63] dark:text-emerald-400 font-semibold block mt-0.5">
                            {item.studentId}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 3. Government Document (Clean: Type & Number only) */}
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900 dark:text-white text-xs">
                        {item.docType}
                      </div>
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                        {item.docNumber}
                      </span>
                    </td>

                    {/* 4. Bank / Payout (Clean: Bank Name & UPI only) */}
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900 dark:text-white text-xs truncate max-w-[160px]">
                        {item.bankName}
                      </div>
                      <span className="font-mono text-xs text-[#116E63] dark:text-emerald-400 font-semibold block mt-0.5 truncate max-w-[160px]">
                        {item.upiId}
                      </span>
                    </td>

                    {/* 5. Submission Date (Clean single line) */}
                    <td className="py-3 px-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                      {item.submittedDate}
                    </td>

                    {/* 6. Verification Status */}
                    <td className="py-3 px-3 text-center">
                      {item.status === "verified" ? (
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold inline-flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Verified</span>
                        </span>
                      ) : item.status === "rejected" ? (
                        <span className="text-rose-700 dark:text-rose-400 font-bold inline-flex items-center gap-1 text-[11px]">
                          <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                          <span>Rejected</span>
                        </span>
                      ) : (
                        <span className="text-amber-700 dark:text-amber-400 font-bold inline-flex items-center gap-1 text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>

                    {/* 7. Action: Inspect (Opens full document view & action drawer) */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedRecord(item);
                          setIsDrawerOpen(true);
                        }}
                        className="px-2.5 py-1 text-[11px] font-bold text-[#116E63] dark:text-emerald-400 hover:text-white bg-teal-50 dark:bg-teal-950/60 hover:bg-[#116E63] dark:hover:bg-emerald-600 border border-teal-200 dark:border-teal-800 rounded-[4px] transition-colors cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                        title="Inspect full documents, bank proofs & verification actions"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSPECTION DRAWER: Full Document & Bank Verification Details */}
      {isDrawerOpen && selectedRecord && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-screen max-w-lg bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200 font-sans">
            {/* Drawer Header */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                  KYC Verification &amp; Document Review
                </h3>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-[4px] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
              {/* Student Identification Strip */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[4px] flex items-center gap-3">
                <div className="w-14 h-14 rounded-full overflow-hidden relative bg-slate-100 dark:bg-slate-700 border-2 border-[#116E63] shrink-0 shadow-xs">
                  <Image
                    src={selectedRecord.avatarImage}
                    alt={selectedRecord.studentName}
                    fill
                    sizes="56px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {selectedRecord.studentName}
                    </h4>
                    {selectedRecord.status === "verified" ? (
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold uppercase text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : selectedRecord.status === "rejected" ? (
                      <span className="text-rose-700 dark:text-rose-400 font-bold uppercase text-xs flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Rejected
                      </span>
                    ) : (
                      <span className="text-amber-700 dark:text-amber-400 font-bold uppercase text-xs flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    ID: {selectedRecord.studentId} &bull; {selectedRecord.studentEmail}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 pt-1 border-t border-slate-200 dark:border-slate-700 text-xs">
                    <span className="font-mono text-slate-700 dark:text-slate-300 font-bold">
                      {selectedRecord.studentPhone}
                    </span>
                    <a
                      href={`https://wa.me/${selectedRecord.studentPhone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#116E63] dark:text-emerald-400 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <FaWhatsapp className="w-3 h-3 text-emerald-600" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Rejection Alert if rejected */}
              {selectedRecord.rejectionReason && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 rounded-[4px] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold uppercase text-[10px] text-rose-700 dark:text-rose-400">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Rejection Reason Given:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {selectedRecord.rejectionReason}
                  </p>
                </div>
              )}

              {/* Document Review Box */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-[4px] p-3.5 space-y-3 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400" />
                    <span>{selectedRecord.docType} Proof</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                    {selectedRecord.docNumber}
                  </span>
                </div>

                {/* Simulated Document Preview Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">
                      Front Side Document
                    </span>
                    <div className="relative aspect-4/3 w-full rounded-[4px] overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 group">
                      <Image
                        src={selectedRecord.frontDocUrl}
                        alt="Front ID Document"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                      <a
                        href={selectedRecord.frontDocUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold gap-1 transition-opacity"
                      >
                        <ExternalLink className="w-4 h-4" /> Full View
                      </a>
                    </div>
                  </div>

                  {selectedRecord.backDocUrl ? (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">
                        Back Side Document
                      </span>
                      <div className="relative aspect-4/3 w-full rounded-[4px] overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 group">
                        <Image
                          src={selectedRecord.backDocUrl}
                          alt="Back ID Document"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                        <a
                          href={selectedRecord.backDocUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold gap-1 transition-opacity"
                        >
                          <ExternalLink className="w-4 h-4" /> Full View
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 flex flex-col justify-end">
                      <div className="aspect-4/3 w-full rounded-[4px] border border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 text-center p-3">
                        <FileText className="w-5 h-5 mb-1" />
                        <span className="text-[10px]">Single-sided card (e.g. PAN)</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bank & Payout Routing Information */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-[4px] p-3.5 space-y-2.5 bg-white dark:bg-slate-900">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <Building className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400" />
                  <span>Bank &amp; UPI Payout Details</span>
                </span>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Account Holder Name:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">
                      {selectedRecord.accountHolderName}
                    </strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Bank Name:</span>
                    <strong className="text-slate-900 dark:text-white">
                      {selectedRecord.bankName}
                    </strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Account Number:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">
                      {selectedRecord.accountNumber}
                    </strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">IFSC Code:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">
                      {selectedRecord.ifscCode}
                    </strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">UPI Handle:</span>
                    <strong className="text-[#116E63] dark:text-emerald-400 font-mono font-bold">
                      {selectedRecord.upiId}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Compliance Note */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-[4px] text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Verified KYC records permanently unlock automated instant bank payouts via IMPS &amp; UPI transfers on student commission withdrawal requests.
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => handleOpenReject(selectedRecord)}
                className="flex-1 py-2 text-xs font-bold text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 border border-rose-300 dark:border-rose-800 uppercase tracking-wider rounded-[4px] cursor-pointer text-center"
              >
                Reject / Request Resubmit
              </button>
              <button
                onClick={() => handleApprove(selectedRecord.id)}
                className="flex-1 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 uppercase tracking-wider rounded-[4px] cursor-pointer shadow-xs text-center flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark KYC Verified</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECTION REASON MODAL */}
      {rejectingRecord && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full p-5 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-[4px] space-y-4 font-sans animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                  Reject KYC Application
                </h3>
              </div>
              <button
                onClick={() => setRejectingRecord(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Rejecting KYC for <strong>{rejectingRecord.studentName}</strong> ({rejectingRecord.studentId}). Please select or enter the specific reason so the student can correct their submission:
            </p>

            <form onSubmit={handleConfirmReject} className="space-y-3 text-xs">
              {/* Quick Preset Buttons */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase block">
                  Quick Preset Reasons:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Photo ID image is blurred / unreadable",
                    "Name on bank passbook differs from student name",
                    "IFSC code or Account Number invalid",
                    "Back side of Aadhaar card is missing",
                    "Expired document submitted",
                  ].map((preset, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setCustomRejectReason(preset)}
                      className="px-2 py-1 text-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-[3px] transition-colors cursor-pointer text-left"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                  Custom Rejection Feedback Note *
                </label>
                <textarea
                  required
                  rows={3}
                  value={customRejectReason}
                  onChange={(e) => setCustomRejectReason(e.target.value)}
                  placeholder="Explain why the KYC was rejected so the student can re-upload..."
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white focus:outline-none focus:border-[#116E63]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setRejectingRecord(null)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold uppercase rounded-[4px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-[4px] cursor-pointer shadow-xs"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
