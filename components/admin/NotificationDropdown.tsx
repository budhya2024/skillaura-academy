"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  CheckCheck,
  Trash2,
  X,
  Wallet,
  UserPlus,
  Award,
  BookOpen,
  ArrowUpRight,
  Mail,
  MailOpen,
  Check,
} from "lucide-react";

export interface NotificationItem {
  id: string;
  type: "commission" | "student" | "milestone" | "payout" | "course";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    type: "commission",
    title: "Commission Credited: ₹3,250",
    message: "Direct sales commission for Full Stack Web Dev course purchased by Priya Sharma.",
    time: "10 mins ago",
    read: false,
  },
  {
    id: "notif-2",
    type: "student",
    title: "New Student Enrolled",
    message: "Amit Verma registered using your direct referral link SKA-ROOT88.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "notif-3",
    type: "milestone",
    title: "Tier 3 Milestone Approaching",
    message: "You are only 7 direct enrollments away from unlocking the ₹15,000 cash bonus!",
    time: "5 hours ago",
    read: false,
  },
  {
    id: "notif-4",
    type: "payout",
    title: "Instant Payout Settled",
    message: "Your withdrawal of ₹45,000 has been verified and dispatched via UPI/NEFT.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "notif-5",
    type: "course",
    title: "New Course Lesson Added",
    message: "Video Editing Mastery updated with Module 3: Alight Motion Pro Effects.",
    time: "2 days ago",
    read: true,
  },
];

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("skillaura_notifications");
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error("Error reading notifications", e);
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem("skillaura_notifications", JSON.stringify(notifications));
    } catch (e) {
      console.error("Error saving notifications", e);
    }
  }, [notifications]);

  // Click outside to close
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

  const deleteNotification = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    return true;
  });

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "commission":
        return <Wallet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case "student":
        return <UserPlus className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case "milestone":
        return <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case "payout":
        return <ArrowUpRight className="w-4 h-4 text-[#116E63] dark:text-teal-400" />;
      case "course":
        return <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 relative cursor-pointer rounded-full transition-colors ${
          isOpen ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : ""
        }`}
        title="Notifications"
        aria-label="Open Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-mono font-bold text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow-xs animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-[-45px] sm:right-0 mt-2 w-[330px] sm:w-[380px] max-w-[calc(100vw-1.5rem)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-[6px] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="p-3 sm:p-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                  Notifications
                </h3>
                {unreadCount > 0 ? (
                  <span className="text-[10px] font-bold bg-[#116E63] text-white px-1.5 py-0.2 rounded-full">
                    {unreadCount} new
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-slate-400">All read</span>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer rounded-[4px]"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Tabs & Quick Actions */}
            <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-2 py-0.5 rounded-[4px] font-bold text-[11px] transition-colors cursor-pointer ${
                    filter === "all"
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                  }`}
                >
                  All ({notifications.length})
                </button>
                <button
                  onClick={() => setFilter("unread")}
                  className={`px-2 py-0.5 rounded-[4px] font-bold text-[11px] transition-colors cursor-pointer ${
                    filter === "unread"
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                  }`}
                >
                  Unread ({unreadCount})
                </button>
              </div>

              <div className="flex items-center gap-2">
                {unreadCount > 0 ? (
                  <button
                    onClick={markAllAsRead}
                    className="text-[10px] font-bold text-[#116E63] dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-0.5"
                    title="Mark all notifications as read"
                  >
                    <CheckCheck className="w-3 h-3" />
                    <span>Read all</span>
                  </button>
                ) : (
                  notifications.length > 0 && (
                    <button
                      onClick={markAllAsUnread}
                      className="text-[10px] font-medium text-slate-500 dark:text-slate-400 hover:underline cursor-pointer flex items-center gap-0.5"
                      title="Mark all as unread"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Unread all</span>
                    </button>
                  )
                )}

                {notifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-[10px] font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer flex items-center gap-0.5"
                    title="Delete all notifications"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Notifications Scroll List */}
          <div className="max-h-[340px] sm:max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredNotifications.length === 0 ? (
              <div className="py-10 text-center px-4 space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {filter === "unread" ? "No unread notifications" : "No notifications"}
                </p>
                <p className="text-[11px] text-slate-400">
                  {filter === "unread"
                    ? "You are all caught up with your latest updates!"
                    : "When you receive commissions, team updates, or payouts, they will appear here."}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => toggleRead(notif.id)}
                  className={`p-3 sm:p-3.5 transition-colors cursor-pointer group flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                    !notif.read
                      ? "bg-teal-50/40 dark:bg-emerald-950/20"
                      : "bg-white dark:bg-slate-900"
                  }`}
                >
                  {/* Icon Avatar */}
                  <div className="w-8 h-8 rounded-[4px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 mt-0.5">
                    {getIcon(notif.type)}
                  </div>

                  {/* Body */}
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center justify-between gap-1">
                      <h4
                        className={`text-xs truncate ${
                          !notif.read
                            ? "font-bold text-slate-900 dark:text-white"
                            : "font-semibold text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <span
                          className="w-2 h-2 rounded-full bg-[#116E63] dark:bg-emerald-400 shrink-0"
                          title="Unread"
                        />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>

                    {/* Direct Link (No Approve/Disapprove) */}
                    <div className="pt-1 flex items-center justify-between">
                      <a
                        href={
                          notif.type === "commission"
                            ? "/admin?tab=earnings"
                            : notif.type === "student"
                            ? "/admin?tab=referrals"
                            : notif.type === "milestone"
                            ? "/admin?tab=leaderboard"
                            : notif.type === "payout"
                            ? "/admin?tab=payouts"
                            : "/admin?tab=courses"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRead(notif.id);
                          setIsOpen(false);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#116E63] dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        <span>
                          {notif.type === "commission"
                            ? "View Commission →"
                            : notif.type === "student"
                            ? "View Referral Team →"
                            : notif.type === "milestone"
                            ? "View Milestones →"
                            : notif.type === "payout"
                            ? "View Payout History →"
                            : "View Course →"}
                        </span>
                      </a>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-400 font-mono">
                        {notif.time}
                      </span>

                      {/* Item Actions (Read/Unread Toggle & Delete particular notification) */}
                      <div className="flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => toggleRead(notif.id, e)}
                          className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700 rounded-[3px] transition-colors cursor-pointer"
                          title={notif.read ? "Mark as unread" : "Mark as read"}
                        >
                          {notif.read ? (
                            <Mail className="w-3.5 h-3.5" />
                          ) : (
                            <MailOpen className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400" />
                          )}
                        </button>
                        <button
                          onClick={(e) => deleteNotification(notif.id, e)}
                          className="p-1 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-[3px] transition-colors cursor-pointer"
                          title="Delete this notification"
                          aria-label="Delete notification"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-center">
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Click any notification to toggle read / unread status
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
