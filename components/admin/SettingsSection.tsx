"use client";

import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Lock,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Bell,
  Smartphone,
  Save,
  Check,
} from "lucide-react";

export default function SettingsSection() {
  // Theme state
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("skillAuraDashboardTheme");
      if (saved === "dark") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }
  }, []);

  const handleSelectTheme = (mode: "light" | "dark") => {
    setTheme(mode);
    if (typeof window !== "undefined") {
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("skillAuraDashboardTheme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("skillAuraDashboardTheme", "light");
      }
    }
  };

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus({ type: null, message: "" });

    if (!currentPassword) {
      setPasswordStatus({
        type: "error",
        message: "Please enter your current account password.",
      });
      return;
    }

    if (newPassword.length < 8) {
      setPasswordStatus({
        type: "error",
        message: "New password must be at least 8 characters long.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordStatus({
        type: "error",
        message: "New password and confirmation password do not match.",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setPasswordStatus({
        type: "success",
        message: "Your account password has been updated successfully!",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 600);
  };

  return (
    <div className="space-y-5 font-sans max-w-4xl">
      {/* =========================================================================
          1. THEME PREFERENCE: DARK MODE & LIGHT MODE SWITCHER
         ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[4px] bg-[#116E63]/10 dark:bg-[#116E63]/30 text-[#116E63] dark:text-emerald-400 flex items-center justify-center">
              {theme === "light" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                Dashboard Theme &amp; Appearance
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose your preferred visual mode for the student learning portal
              </p>
            </div>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Current: {theme === "light" ? "Light" : "Dark"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {/* Light Mode Card */}
          <button
            type="button"
            onClick={() => handleSelectTheme("light")}
            className={`p-3.5 sm:p-4 rounded-[4px] border-2 text-left transition-all cursor-pointer flex items-start gap-3.5 ${
              theme === "light"
                ? "border-[#116E63] bg-teal-50/40 dark:bg-slate-800 shadow-xs ring-2 ring-[#116E63]/20"
                : "border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-600"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                theme === "light"
                  ? "bg-amber-100 text-amber-600 border border-amber-300"
                  : "bg-slate-100 text-slate-500 border border-slate-200"
              }`}
            >
              <Sun className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                  Light Mode
                </span>
                {theme === "light" && (
                  <span className="text-xs font-bold uppercase text-[#116E63] dark:text-emerald-400">
                    Active
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                Crisp, high-contrast light theme with clean slate typography and white backgrounds.
              </p>
            </div>
          </button>

          {/* Dark Mode Card */}
          <button
            type="button"
            onClick={() => handleSelectTheme("dark")}
            className={`p-3.5 sm:p-4 rounded-[4px] border-2 text-left transition-all cursor-pointer flex items-start gap-3.5 ${
              theme === "dark"
                ? "border-[#116E63] dark:border-emerald-500 bg-slate-900 text-white shadow-xs ring-2 ring-emerald-500/20"
                : "border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-600"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                theme === "dark"
                  ? "bg-slate-800 text-amber-300 border border-slate-600"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
              }`}
            >
              <Moon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                  Dark Mode
                </span>
                {theme === "dark" && (
                  <span className="text-xs font-bold uppercase text-[#116E63] dark:text-emerald-400">
                    Active
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                Low-glare dark theme optimized for night-time learning and long study sessions.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. SECURITY & CHANGE PASSWORD FORM
         ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[4px] bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                Security &amp; Change Password
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Update your student portal login password to keep your account safe
              </p>
            </div>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Protected
          </span>
        </div>

        {/* Feedback Alert */}
        {passwordStatus.type === "success" && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 rounded-[4px] flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-200 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{passwordStatus.message}</span>
          </div>
        )}

        {passwordStatus.type === "error" && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/80 rounded-[4px] flex items-center gap-2 text-xs font-bold text-rose-800 dark:text-rose-200 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>{passwordStatus.message}</span>
          </div>
        )}

        <form onSubmit={handlePasswordUpdate} className="space-y-3.5 max-w-xl">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#116E63] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                title={showCurrentPassword ? "Hide password" : "Show password"}
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#116E63] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  title={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#116E63] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  title={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Password must be at least <strong>8 characters</strong>. For strong security, include a combination of letters, numbers, and symbols.
          </p>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-[#116E63] hover:bg-[#0c5c53] text-white text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSubmitting ? "Updating..." : "Update Password"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* =========================================================================
          3. NOTIFICATION & PREFERENCE SWITCHES
         ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-3">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
            Account &amp; Notification Preferences
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Configure automated WhatsApp alerts and verification rules
          </p>
        </div>

        <div className="space-y-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 gap-3 rounded-[4px]">
            <div>
              <span className="font-bold text-slate-900 dark:text-white block text-xs uppercase tracking-wider">
                Instant WhatsApp Payout Alerts
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-normal text-[11px]">
                Receive automated WhatsApp messages whenever referral income or payouts are credited
              </span>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 accent-[#116E63] shrink-0 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 gap-3 rounded-[4px]">
            <div>
              <span className="font-bold text-slate-900 dark:text-white block text-xs uppercase tracking-wider">
                Course Completion Certificates
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-normal text-[11px]">
                Automatically generate verified skill certificates upon finishing all video lessons
              </span>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 accent-[#116E63] shrink-0 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 gap-3 rounded-[4px]">
            <div>
              <span className="font-bold text-slate-900 dark:text-white block text-xs uppercase tracking-wider">
                Two-Factor Account Security (OTP)
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-normal text-[11px]">
                Secure wallet withdrawals with SMS and WhatsApp OTP verification
              </span>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 accent-[#116E63] shrink-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
