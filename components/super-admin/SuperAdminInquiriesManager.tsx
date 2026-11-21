"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";
import {
  ContactInquiry,
  getContactInquiries,
  updateInquiryStatus,
  deleteContactInquiry,
} from "../../lib/contactData";

export default function SuperAdminInquiriesManager() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "read">("all");
  const [notification, setNotification] = useState<string | null>(null);

  const loadInquiries = () => {
    setInquiries(getContactInquiries());
  };

  useEffect(() => {
    loadInquiries();
    const handleUpdate = () => loadInquiries();
    window.addEventListener("skillaura_inquiries_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("skillaura_inquiries_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleToggleStatus = (inq: ContactInquiry) => {
    const nextStatus = inq.status === "unread" ? "read" : "unread";
    updateInquiryStatus(inq.id, nextStatus);
    showNotification(`Marked as ${nextStatus}`);
    loadInquiries();
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete message from "${name}"?`)) {
      deleteContactInquiry(id);
      showNotification(`Message deleted`);
      loadInquiries();
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      inq.mobile.includes(searchQuery) ||
      inq.subject.toLowerCase().includes(q) ||
      inq.message.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "all" || inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalCount = inquiries.length;
  const unreadCount = inquiries.filter((i) => i.status === "unread").length;
  const readCount = inquiries.filter((i) => i.status === "read").length;

  return (
    <div className="space-y-3 font-sans text-slate-800 dark:text-slate-100">
      {/* Toast Notification */}
      {notification && (
        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-[4px] flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <MessageSquare className="w-5 h-5 text-[#116E63] dark:text-emerald-400" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
            Contact Messages
          </h2>
          <span className="text-xs font-mono font-bold bg-[#116E63] text-white px-2 py-0.5 rounded-full">
            {totalCount}
          </span>
          {unreadCount > 0 && (
            <span className="text-xs font-mono font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
              {unreadCount} Unread
            </span>
          )}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-[4px] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#116E63]"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 text-xs font-bold uppercase rounded-[3px] border cursor-pointer transition-colors ${
              statusFilter === "all"
                ? "bg-[#116E63] text-white border-[#116E63]"
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
            }`}
          >
            All ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("unread")}
            className={`px-3 py-1.5 text-xs font-bold uppercase rounded-[3px] border cursor-pointer transition-colors ${
              statusFilter === "unread"
                ? "bg-amber-600 text-white border-amber-600"
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("read")}
            className={`px-3 py-1.5 text-xs font-bold uppercase rounded-[3px] border cursor-pointer transition-colors ${
              statusFilter === "read"
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
            }`}
          >
            Read ({readCount})
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-2.5">
        {filteredInquiries.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 text-center rounded-[4px] shadow-xs text-xs text-slate-400">
            No messages found.
          </div>
        ) : (
          filteredInquiries.map((inq) => (
            <div
              key={inq.id}
              className={`bg-white dark:bg-slate-900 border rounded-[4px] p-3.5 sm:p-4 shadow-xs transition-all space-y-2.5 ${
                inq.status === "unread"
                  ? "border-amber-300 dark:border-amber-800/80 bg-amber-50/15 dark:bg-amber-950/10"
                  : "border-slate-200 dark:border-slate-800"
              }`}
            >
              {/* Header: Sender, Metadata, Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-[#116E63] text-white flex items-center justify-center font-bold text-xs uppercase shrink-0">
                    {inq.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                        {inq.name}
                      </span>
                      {inq.status === "unread" ? (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded-[2px] bg-amber-500 text-slate-950 font-mono">
                          New
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded-[2px] bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                          Read
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2.5 text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#116E63]" />
                        {inq.mobile}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        {inq.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {inq.createdAt}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(inq)}
                    className="px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 border border-slate-200 dark:border-slate-700 rounded-[3px] hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    {inq.status === "unread" ? "Mark Read" : "Mark Unread"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(inq.id, inq.name)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-[3px] cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Subject & Message */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {inq.subject}
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-[3px] text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {inq.message}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
