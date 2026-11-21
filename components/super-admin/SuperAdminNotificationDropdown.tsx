"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  CheckCheck,
  Trash2,
  X,
  Wallet,
  Users,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Check,
  Mail,
  MailOpen,
  MessageSquare,
} from "lucide-react";

export type SuperAdminTab =
  | "overview"
  | "courses"
  | "students"
  | "kyc"
  | "payouts"
  | "cms"
  | "inquiries"
  | "profile";

export interface SuperAdminNotificationItem {
  id: string;
  type: "kyc" | "payout" | "student" | "course" | "system" | "inquiry";
  title: string;
  message: string;
  time: string;
  read: boolean;
  targetTab: SuperAdminTab;
  linkText: string;
}

const INITIAL_NOTIFICATIONS: SuperAdminNotificationItem[] = [
  {
    id: "notif-sa-0",
    type: "inquiry",
    title: "New Contact Form Inquiry / SMS",
    message: "Rohan Sharma submitted inquiry for Digital Marketing & Performance Ads enrollment.",
    time: "10 mins ago",
    read: false,
    targetTab: "inquiries",
    linkText: "View & Reply to SMS →",
  },
  {
    id: "notif-sa-1",
    type: "payout",
    title: "Payout Request: ₹45,000",
    message: "Rajesh Mehta (SKA-1052) requested instant bank payout withdrawal via UPI.",
    time: "5 mins ago",
    read: false,
    targetTab: "payouts",
    linkText: "Review in Payouts Console →",
  },
  {
    id: "notif-sa-2",
    type: "kyc",
    title: "New KYC Verification Submitted",
    message: "Priya Sharma (SKA-1045) uploaded PAN card & Bank passbook proof for verification.",
    time: "25 mins ago",
    read: false,
    targetTab: "kyc",
    linkText: "Review in KYC Console →",
  },
  {
    id: "notif-sa-3",
    type: "student",
    title: "New Student Enrolled: ₹4,999",
    message: "Rahul Verma registered in Video Editing Mastery under sponsor SKA-ROOT88.",
    time: "2 hours ago",
    read: false,
    targetTab: "students",
    linkText: "View in Student Roster →",
  },
  {
    id: "notif-sa-4",
    type: "kyc",
    title: "KYC Pending Verification",
    message: "Ananya Roy (SKA-1180) submitted Aadhaar Card proof awaiting approval.",
    time: "4 hours ago",
    read: false,
    targetTab: "kyc",
    linkText: "Inspect KYC Application →",
  },
  {
    id: "notif-sa-5",
    type: "course",
    title: "Course Curriculum Updated",
    message: "New video lesson upload and session metadata updated for Business Mastery.",
    time: "Yesterday",
    read: true,
    targetTab: "courses",
    linkText: "Open Course Studio →",
  },
];

interface SuperAdminNotificationDropdownProps {
  onNavigate: (tab: SuperAdminTab) => void;
}

export default function SuperAdminNotificationDropdown({
  onNavigate,
}: SuperAdminNotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notifications, setNotifications] = useState<SuperAdminNotificationItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("skillaura_superadmin_notifications");
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error("Error reading superadmin notifications", e);
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem("skillaura_superadmin_notifications", JSON.stringify(notifications));
    } catch (e) {
      console.error("Error saving superadmin notifications", e);
    }
  }, [notifications]);

  // Click outside to close popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const totalCount = notifications.length;

  const toggleRead = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAllAsUnread = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: false })));
  };

  // Delete a particular notification
  const deleteParticularNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Handle clicking the link / notification to navigate
  const handleNotificationLink = (notif: SuperAdminNotificationItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    // Mark as read automatically when navigated
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    setIsOpen(false);
    onNavigate(notif.targetTab);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    return true;
  });

  const getIcon = (type: SuperAdminNotificationItem["type"]) => {
    switch (type) {
      case "payout":
        return <Wallet className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case "kyc":
        return <ShieldCheck className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />;
      case "student":
        return <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case "course":
        return <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case "inquiry":
        return <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  const getTypeBadge = (type: SuperAdminNotificationItem["type"]) => {
    switch (type) {
      case "inquiry":
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-[3px] border border-emerald-200 dark:border-emerald-800">
            SMS / Inquiry
          </span>
        );
      case "payout":
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded-[3px] border border-amber-200 dark:border-amber-800">
            Payout
          </span>
        );
      case "kyc":
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#116E63] dark:text-emerald-400 bg-teal-50 dark:bg-teal-950/60 px-1.5 py-0.5 rounded-[3px] border border-teal-200 dark:border-teal-800">
            KYC
          </span>
        );
      case "student":
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-1.5 py-0.5 rounded-[3px] border border-sky-200 dark:border-sky-800">
            Student
          </span>
        );
      case "course":
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded-[3px] border border-indigo-200 dark:border-indigo-800">
            Course
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger Button with Notification Quantity Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-[4px] cursor-pointer transition-colors ${
          isOpen ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : ""
        }`}
        title={`Notifications (${unreadCount} unread)`}
        aria-label="Open Super Admin Notifications"
      >
        <Bell className="w-4 h-4" />
        {/* Notification Quantity Count Badge */}
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 bg-rose-500 text-white font-mono font-bold text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow-xs animate-pulse"
            title={`${unreadCount} unread notifications`}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-[-60px] sm:right-0 mt-2 w-[340px] sm:w-[420px] max-w-[calc(100vw-1.5rem)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-[6px] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header with Quantity Display */}
          <div className="p-3 sm:p-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-800/70">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                  Notifications
                </h3>
                {/* Quantity Pill */}
                <span className="text-xs font-mono font-bold bg-[#116E63] text-white px-2 py-0.5 rounded-full shadow-2xs">
                  {unreadCount} / {totalCount}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 cursor-pointer rounded-[4px] hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Tabs & Bulk Actions */}
            <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700/70 text-xs">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-2.5 py-1 rounded-[3px] font-bold text-xs transition-colors cursor-pointer ${
                    filter === "all"
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                  }`}
                >
                  All ({totalCount})
                </button>
                <button
                  onClick={() => setFilter("unread")}
                  className={`px-2.5 py-1 rounded-[3px] font-bold text-xs transition-colors cursor-pointer ${
                    filter === "unread"
                      ? "bg-[#116E63] text-white"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                  }`}
                >
                  Unread ({unreadCount})
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                {unreadCount > 0 ? (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs font-bold text-[#116E63] dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
                    title="Mark all notifications as read"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Read all</span>
                  </button>
                ) : (
                  totalCount > 0 && (
                    <button
                      onClick={markAllAsUnread}
                      className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:underline cursor-pointer flex items-center gap-1"
                      title="Mark all as unread"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Unread all</span>
                    </button>
                  )
                )}

                {totalCount > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer flex items-center gap-1"
                    title="Clear all notifications"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Notifications Scroll List */}
          <div className="max-h-[380px] sm:max-h-[420px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredNotifications.length === 0 ? (
              <div className="py-12 text-center px-4 space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  {filter === "unread" ? "No unread notifications" : "No notifications"}
                </p>
                <p className="text-xs text-slate-400 max-w-[260px] mx-auto">
                  {filter === "unread"
                    ? "You are all caught up with super admin activities!"
                    : "When new student enrollments, KYC submissions, or payout requests arrive, they will appear here."}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => toggleRead(notif.id)}
                  className={`p-3 sm:p-3.5 transition-colors cursor-pointer group flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                    !notif.read
                      ? "bg-teal-50/40 dark:bg-teal-950/20"
                      : "bg-white dark:bg-slate-900"
                  }`}
                >
                  {/* Icon Avatar */}
                  <div className="w-8 h-8 rounded-[4px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 mt-0.5 shadow-2xs">
                    {getIcon(notif.type)}
                  </div>

                  {/* Notification Content Body */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-1.5 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        {getTypeBadge(notif.type)}
                        <span className="text-xs font-mono text-slate-400">
                          {notif.time}
                        </span>
                      </div>

                      {/* Right: Unread indicator & Item Actions */}
                      <div className="flex items-center gap-1">
                        {!notif.read && (
                          <span
                            className="w-2 h-2 rounded-full bg-[#116E63] dark:bg-emerald-400 shrink-0"
                            title="Unread"
                          />
                        )}

                        {/* Read/Unread Toggle */}
                        <button
                          onClick={(e) => toggleRead(notif.id, e)}
                          className="p-1 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-[3px] transition-colors cursor-pointer opacity-80 sm:opacity-0 group-hover:opacity-100"
                          title={notif.read ? "Mark as unread" : "Mark as read"}
                        >
                          {notif.read ? (
                            <Mail className="w-3.5 h-3.5" />
                          ) : (
                            <MailOpen className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400" />
                          )}
                        </button>

                        {/* Particular Notification Delete Button */}
                        <button
                          onClick={(e) => deleteParticularNotification(notif.id, e)}
                          className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-[3px] transition-colors cursor-pointer opacity-90 sm:opacity-0 group-hover:opacity-100"
                          title="Delete this notification"
                          aria-label="Delete notification"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <h4
                      className={`text-xs sm:text-sm leading-snug ${
                        !notif.read
                          ? "font-bold text-slate-900 dark:text-white"
                          : "font-semibold text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {notif.title}
                    </h4>

                    {/* Description Message */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {notif.message}
                    </p>

                    {/* Notification Link Button (No Approve / Disapprove, only Direct Link) */}
                    <div className="pt-1.5 flex items-center justify-between">
                      <button
                        onClick={(e) => handleNotificationLink(notif, e)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#116E63] dark:text-emerald-400 hover:text-[#0c5c53] dark:hover:text-emerald-300 hover:underline cursor-pointer group/link transition-colors"
                      >
                        <span>{notif.linkText}</span>
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                      </button>

                      {/* Particular notification delete quick button */}
                      <button
                        onClick={(e) => deleteParticularNotification(notif.id, e)}
                        className="text-xs text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer flex items-center gap-0.5 transition-colors sm:hidden"
                        title="Delete this notification"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Instruction */}
          {totalCount > 0 && (
            <div className="p-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-3">
              <span>Click link to view details in corresponding console</span>
              <span className="font-mono font-semibold text-[#116E63] dark:text-emerald-400">
                {totalCount} Total
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
