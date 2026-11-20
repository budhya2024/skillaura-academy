"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
  Sun,
  Moon,
  CheckCircle2,
  AlertCircle,
  Save,
  User,
  Mail,
  Phone,
  Lock,
  Smartphone,
  LogOut,
  Calendar,
  Sparkles,
  RefreshCw,
} from "lucide-react";

export default function SuperAdminProfileSettings() {
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

  // Profile Form state
  const [profileData, setProfileData] = useState({
    name: "Subha Kumar Mahata",
    email: "superadmin@skillaura.in",
    phone: "+91 91442 88641",
    role: "Super Administrator",
    accessLevel: "Root Authority (All Permissions)",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3500);
  };

  // Password Change state
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
        message: "Please enter your current master password.",
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
        message: "Super admin password updated successfully! Credentials synchronized.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 700);
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Header Strip */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
              Super Admin Profile &amp; Security Settings
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your master credentials, change root password, and configure dashboard dark mode appearance
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
          Root Authority Active
        </span>
      </div>

      {/* Profile Save Toast */}
      {profileSaved && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-[4px] flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Super admin profile details saved successfully.</span>
        </div>
      )}

      {/* Main Grid: Left Profile & Password, Right Appearance & Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT COLUMN: Profile Info & Password Change (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* 1. Admin Profile Info Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <User className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
                <span>Super Administrator Details</span>
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                ID: SA-MASTER-01
              </span>
            </div>

            {/* Avatar & Name Header */}
            <div className="flex items-center gap-3.5 pb-2">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400 ring-4 ring-amber-100/70 dark:ring-amber-950/40 shrink-0 bg-slate-100 dark:bg-slate-800 shadow-xs">
                <Image
                  src="/images/founder.jpeg"
                  alt="Super Admin"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  {profileData.name}
                </h4>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                  {profileData.email}
                </div>
                <div className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{profileData.role}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#116E63]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                    Master Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white font-mono focus:outline-none focus:border-[#116E63]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                    Official WhatsApp / Contact
                  </label>
                  <input
                    type="text"
                    required
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white font-mono focus:outline-none focus:border-[#116E63]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                    Access Privileges
                  </label>
                  <input
                    type="text"
                    disabled
                    value={profileData.accessLevel}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-500 dark:text-slate-400 font-medium cursor-not-allowed text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#116E63] hover:bg-[#0c5950] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile Details</span>
                </button>
              </div>
            </form>
          </div>

          {/* 2. Password Change Function Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Change Master Password</span>
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Min 8 characters
              </span>
            </div>

            {/* Status Alert */}
            {passwordStatus.type && (
              <div
                className={`p-3 rounded-[4px] flex items-start gap-2.5 text-xs font-bold ${
                  passwordStatus.type === "success"
                    ? "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-200"
                    : "bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/80 text-rose-800 dark:text-rose-200"
                }`}
              >
                {passwordStatus.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                )}
                <span>{passwordStatus.message}</span>
              </div>
            )}

            <form onSubmit={handlePasswordUpdate} className="space-y-3.5 text-xs">
              {/* Current Password */}
              <div>
                <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                  Current Master Password *
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter existing password"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white font-mono focus:outline-none focus:border-[#116E63] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                    New Master Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white font-mono focus:outline-none focus:border-[#116E63] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white font-mono focus:outline-none focus:border-[#116E63] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Requirements Notice */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[4px] space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="font-bold uppercase text-[10px] text-slate-700 dark:text-slate-300">
                  Security Recommendations:
                </div>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>Use at least 8 characters with a mix of numbers &amp; symbols</li>
                  <li>Do not reuse passwords from personal email accounts</li>
                </ul>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-[#116E63] hover:bg-[#0c5950] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Updating..." : "Update Master Password"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Dark Mode Appearance & System Sessions (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Dark Mode & Appearance Selector Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Dashboard Appearance</span>
              </h3>
              <span className="text-xs font-bold uppercase text-[#116E63] dark:text-emerald-400">
                {theme === "dark" ? "Dark Mode" : "Light Mode"}
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Select your preferred color theme for the Super Admin panel. Changes take effect across all dashboard views immediately:
            </p>

            {/* Theme Toggle Buttons */}
            <div className="space-y-2.5">
              {/* Light Mode Option */}
              <button
                type="button"
                onClick={() => handleSelectTheme("light")}
                className={`w-full p-3.5 rounded-[4px] border-2 text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                  theme === "light"
                    ? "border-[#116E63] bg-teal-50/20 dark:bg-teal-950/20 shadow-xs ring-2 ring-[#116E63]/20"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    theme === "light"
                      ? "bg-amber-100 text-amber-600 border border-amber-300"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <Sun className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                      Light Theme
                    </span>
                    {theme === "light" && (
                      <span className="text-xs font-bold uppercase text-[#116E63] dark:text-emerald-400">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    Crisp white backgrounds with high-contrast slate typography and teal branding.
                  </p>
                </div>
              </button>

              {/* Dark Mode Option */}
              <button
                type="button"
                onClick={() => handleSelectTheme("dark")}
                className={`w-full p-3.5 rounded-[4px] border-2 text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                  theme === "dark"
                    ? "border-[#116E63] dark:border-emerald-500 bg-slate-900 text-white shadow-xs ring-2 ring-emerald-500/20"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    theme === "dark"
                      ? "bg-slate-800 text-amber-300 border border-slate-600"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <Moon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                      Dark Theme
                    </span>
                    {theme === "dark" && (
                      <span className="text-xs font-bold uppercase text-[#116E63] dark:text-emerald-400">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    Low-glare dark slate palette optimized for nighttime administration and extended monitoring.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Session Security Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
                <span>Active Admin Session</span>
              </h3>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Online</span>
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Current Device:</span>
                <span className="font-bold text-slate-900 dark:text-white">Windows 11 (Chrome 131)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">IP Location:</span>
                <span className="font-mono text-slate-900 dark:text-white">Kolkata, WB (India)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Session Started:</span>
                <span className="font-mono text-slate-900 dark:text-white">20-Nov-2026, 09:30 AM</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 dark:text-slate-400">Encryption:</span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">TLS 1.3 / AES-256</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
