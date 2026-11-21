"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Trash2,
  ExternalLink,
  Mail,
  Phone,
  Send,
  Eye,
  Check,
  RotateCcw,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import {
  ContactInquiry,
  getContactInquiries,
  updateInquiryStatus,
  deleteContactInquiry,
  addContactInquiry,
} from "../../lib/contactData";

export default function SuperAdminInquiriesManager() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "read" | "replied">("all");
  const [notification, setNotification] = useState<string | null>(null);

  // Load inquiries
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
    setTimeout(() => setNotification(null), 3500);
  };

  const handleStatusChange = (id: string, newStatus: "unread" | "read" | "replied") => {
    updateInquiryStatus(id, newStatus);
    showNotification(`Inquiry status updated to ${newStatus.toUpperCase()}`);
    loadInquiries();
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete message from "${name}"?`)) {
      deleteContactInquiry(id);
      showNotification(`Message from ${name} deleted.`);
      loadInquiries();
    }
  };

  const handleSimulateTestInquiry = () => {
    const sampleNames = ["Kabir Das", "Aayush Mehra", "Meera Sen", "Vikram Rathore"];
    const sampleCourses = [
      "Can I know batch timing for High-Ticket Closing?",
      "Digital Marketing Google Ads fee structure inquiry",
      "Do you provide placement assistance after Video Editing course?",
    ];
    const pickedName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const pickedSubject = sampleCourses[Math.floor(Math.random() * sampleCourses.length)];

    addContactInquiry({
      name: pickedName,
      email: `${pickedName.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
      mobile: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
      subject: pickedSubject,
      message: `Hello SkillAura team, I want complete details and syllabus PDF for this course. Please contact me on WhatsApp as soon as possible.`,
    });
    showNotification(`New test SMS inquiry received from ${pickedName}!`);
    loadInquiries();
  };

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.mobile.includes(searchQuery) ||
      inq.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalCount = inquiries.length;
  const unreadCount = inquiries.filter((i) => i.status === "unread").length;
  const repliedCount = inquiries.filter((i) => i.status === "replied").length;
  const readCount = inquiries.filter((i) => i.status === "read").length;

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-[4px] flex items-center justify-between shadow-xs animate-in fade-in">
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

      {/* Top Header Controls Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#116E63] dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
              Contact Us Inquiries &amp; SMS Messages
            </h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold bg-amber-500 text-slate-950 rounded-full font-mono">
                {unreadCount} New
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time inquiries and SMS messages submitted by visitors on the Contact Us page (/contact).
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSimulateTestInquiry}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold uppercase rounded-[4px] flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
            title="Simulate a new incoming contact form submission to test inbox"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>+ Simulate Test SMS</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Counters Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4px] shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-mono">
            Total Messages
          </span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white block">
            {totalCount}
          </span>
          <span className="text-[11px] text-slate-400 block">All recorded submissions</span>
        </div>

        <div className="p-3.5 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 rounded-[4px] shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block font-mono">
            Unread SMS / Messages
          </span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-amber-700 dark:text-amber-400 block">
            {unreadCount}
          </span>
          <span className="text-[11px] text-amber-600/80 dark:text-amber-400/80 block">Requires response</span>
        </div>

        <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-[4px] shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block font-mono">
            Replied Inquiries
          </span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-400 block">
            {repliedCount}
          </span>
          <span className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 block">Answered via WhatsApp/Email</span>
        </div>

        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[4px] shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block font-mono">
            Read / Reviewed
          </span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-slate-800 dark:text-slate-200 block">
            {readCount}
          </span>
          <span className="text-[11px] text-slate-400 block">Opened &amp; archived</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 rounded-[4px] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by sender, phone, email, subject, or message..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#116E63]"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 text-xs font-bold uppercase rounded-[3px] border cursor-pointer transition-colors ${
              statusFilter === "all"
                ? "bg-[#116E63] text-white border-[#116E63]"
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
            }`}
          >
            All ({totalCount})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("unread")}
            className={`px-3 py-1.5 text-xs font-bold uppercase rounded-[3px] border cursor-pointer transition-colors flex items-center gap-1.5 ${
              statusFilter === "unread"
                ? "bg-amber-600 text-white border-amber-600"
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
            }`}
          >
            <span>Unread</span>
            {unreadCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                statusFilter === "unread" ? "bg-white text-amber-700" : "bg-amber-100 text-amber-800 font-bold"
              }`}>
                {unreadCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("replied")}
            className={`px-3 py-1.5 text-xs font-bold uppercase rounded-[3px] border cursor-pointer transition-colors ${
              statusFilter === "replied"
                ? "bg-[#116E63] text-white border-[#116E63]"
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
            }`}
          >
            Replied ({repliedCount})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("read")}
            className={`px-3 py-1.5 text-xs font-bold uppercase rounded-[3px] border cursor-pointer transition-colors ${
              statusFilter === "read"
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
            }`}
          >
            Read ({readCount})
          </button>
        </div>
      </div>

      {/* Messages List Container */}
      <div className="space-y-3">
        {filteredInquiries.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 text-center rounded-[4px] shadow-xs space-y-2">
            <MessageSquare className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              No contact inquiries found
            </h4>
            <p className="text-xs text-slate-500">
              {searchQuery
                ? `No messages matched "${searchQuery}". Try clearing the search.`
                : "Any inquiries submitted from the Contact Us page (/contact) will appear here in real time."}
            </p>
          </div>
        ) : (
          filteredInquiries.map((inq) => {
            const cleanPhone = inq.mobile.replace(/[^0-9]/g, "");
            const whatsappText = encodeURIComponent(
              `Hello ${inq.name},\n\nThank you for contacting SkillAura Academy regarding "${inq.subject}". How can we assist you further today?`
            );
            const waUrl = `https://wa.me/${cleanPhone}?text=${whatsappText}`;
            const mailUrl = `mailto:${inq.email}?subject=SkillAura Academy - Re: ${encodeURIComponent(inq.subject)}`;

            return (
              <div
                key={inq.id}
                className={`bg-white dark:bg-slate-900 border rounded-[4px] p-4 sm:p-5 shadow-xs transition-all space-y-3 ${
                  inq.status === "unread"
                    ? "border-amber-300 dark:border-amber-800/80 bg-amber-50/20 dark:bg-amber-950/10"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {/* Header Row: Sender, Status Badge, Timestamp */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#116E63] text-white flex items-center justify-center font-bold text-xs uppercase shrink-0 shadow-2xs">
                      {inq.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">
                          {inq.name}
                        </span>
                        {inq.status === "unread" && (
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-[2px] bg-amber-500 text-slate-950 font-mono">
                            New SMS / Inquiry
                          </span>
                        )}
                        {inq.status === "replied" && (
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-[2px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 font-mono">
                            <Check className="w-3 h-3" /> Replied
                          </span>
                        )}
                        {inq.status === "read" && (
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-[2px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                            Read
                          </span>
                        )}
                      </div>

                      {/* Contact metadata strip */}
                      <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mt-1 flex-wrap font-mono">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-[#116E63] dark:text-emerald-400 font-semibold hover:underline"
                          title="Open WhatsApp Chat"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{inq.mobile}</span>
                        </a>
                        <span>&bull;</span>
                        <a
                          href={mailUrl}
                          className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white hover:underline truncate"
                          title="Send Email"
                        >
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{inq.email}</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Timestamp & Quick Status Selector */}
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {inq.createdAt}
                    </span>
                  </div>
                </div>

                {/* Subject & Message Content Box */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Subject: <span className="text-slate-900 dark:text-white font-semibold normal-case text-sm">{inq.subject}</span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[4px] text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                    &ldquo;{inq.message}&rdquo;
                  </div>
                </div>

                {/* Action Buttons Row (Full Deep Color Buttons) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Reply via WhatsApp Button (Full Deep Color) */}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => handleStatusChange(inq.id, "replied")}
                      className="px-3.5 py-1.5 bg-[#116E63] hover:bg-[#0c5c53] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                      title="Directly message this lead via WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Reply</span>
                    </a>

                    {/* Reply via Email Button */}
                    <a
                      href={mailUrl}
                      onClick={() => handleStatusChange(inq.id, "replied")}
                      className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email Reply</span>
                    </a>
                  </div>

                  {/* Status & Delete Controls */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {inq.status !== "replied" && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(inq.id, "replied")}
                        className="px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-700 border border-slate-200 dark:border-slate-700 rounded-[3px] hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                        title="Mark as Replied"
                      >
                        Mark Replied
                      </button>
                    )}

                    {inq.status === "unread" ? (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(inq.id, "read")}
                        className="px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 border border-slate-200 dark:border-slate-700 rounded-[3px] hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                        title="Mark as Read"
                      >
                        Mark Read
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(inq.id, "unread")}
                        className="px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-amber-600 border border-slate-200 dark:border-slate-700 rounded-[3px] hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                        title="Mark as Unread"
                      >
                        Mark Unread
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDelete(inq.id, inq.name)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 border border-slate-200 dark:border-slate-700 rounded-[3px] hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Delete this message"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
