"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MOCK_USER_PROFILE } from "../../lib/networkData";
import {
  User,
  ShieldCheck,
  Award,
  CreditCard,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Copy,
  Check,
  CheckCircle2,
  Download,
  Camera,
  Edit3,
  Sparkles,
  TrendingUp,
  Wallet,
  Clock,
  RotateCcw,
} from "lucide-react";

export default function ProfileSection() {
  const [profile, setProfile] = useState(MOCK_USER_PROFILE);
  const [avatarUrl, setAvatarUrl] = useState("/images/founder.jpeg");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Edit Profile Info State
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [infoForm, setInfoForm] = useState({
    name: profile.name,
    role: profile.role,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
    package: profile.package,
  });

  // Edit Banking State
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [upiId, setUpiId] = useState(profile.upiId);
  const [bankAccount, setBankAccount] = useState(profile.bankAccount);
  const [bankName, setBankName] = useState(profile.bankName);
  const [bankIfsc, setBankIfsc] = useState(profile.bankIfsc);

  // Success Notification
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Avatar Upload / Change Handler
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newUrl = URL.createObjectURL(file);
      setAvatarUrl(newUrl);
      showNotification("Profile photo updated successfully!");
    }
  };

  // Save Profile Personal Info
  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      name: infoForm.name,
      role: infoForm.role,
      email: infoForm.email,
      phone: infoForm.phone,
      address: infoForm.address,
      package: infoForm.package,
    }));
    setIsEditingInfo(false);
    showNotification("Profile information updated successfully!");
  };

  // Save Banking Info
  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      upiId,
      bankAccount,
      bankName,
      bankIfsc,
    }));
    setIsEditingBank(false);
    showNotification("Banking & payout credentials saved successfully!");
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Toast Notification Banner */}
      {successMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between rounded-[4px] shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-700 hover:text-emerald-950 font-mono text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* ================= TOP EXECUTIVE BANNER CARD ================= */}
      <div className="bg-white border border-slate-200 p-5 sm:p-6 shadow-xs rounded-[4px]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          {/* Left: Circular Avatar with Change Photo Overlay & Member Info */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* CIRCULAR PROFILE PHOTO WITH HOVER CAMERA BUTTON */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full relative overflow-hidden border-2 border-[#116E63]/30 shadow-md bg-slate-100 ring-4 ring-slate-50">
                <Image
                  src={avatarUrl}
                  alt={profile.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>

              {/* Camera Upload Button */}
              <label
                htmlFor="profile-photo-upload"
                className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 bg-[#116E63] hover:bg-[#0c5048] text-white rounded-full flex items-center justify-center cursor-pointer shadow-md border-2 border-white transition-transform hover:scale-110"
                title="Click to Change Profile Photo"
              >
                <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <input
                  id="profile-photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Profile Text Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-[4px]">
                  Root Partner
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  ID: {profile.id}
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 font-bold flex items-center gap-1 rounded-[4px]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  KYC Verified
                </span>
              </div>

              <h2 className="text-lg sm:text-2xl font-bold font-[family-name:var(--font-yantramanav)] uppercase text-slate-900 leading-tight">
                {profile.name}
              </h2>

              <p className="text-xs text-slate-500 font-medium">
                {profile.role}
              </p>

              {/* PROMINENT JOINING DATE IN BANNER */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600 pt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#116E63] shrink-0" />
                <span>
                  Joining Date:{" "}
                  <strong className="text-slate-900 font-semibold">
                    {profile.joinDate}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setIsEditingInfo(!isEditingInfo)}
              className="flex items-center justify-center gap-1.5 bg-[#116E63] hover:bg-[#0c5048] text-white text-xs font-bold px-4 py-2 transition-colors cursor-pointer uppercase tracking-wider rounded-[4px]"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingInfo ? "Close Editor" : "Edit Profile"}</span>
            </button>

            <button
              onClick={() => handleCopy(profile.id, "memberId")}
              className="flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold px-3 py-2 border border-slate-200 transition-colors cursor-pointer uppercase rounded-[4px]"
            >
              {copiedField === "memberId" ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copiedField === "memberId" ? "Copied" : "Copy ID"}</span>
            </button>

            <button
              onClick={() =>
                alert(
                  `Skill Aura Official Partner Identification\nName: ${profile.name}\nPartner ID: ${profile.id}\nRank: ${profile.rank}\nJoining Date: ${profile.joinDate}\nKYC Status: Verified`
                )
              }
              className="flex items-center justify-center gap-1.5 bg-[#FDA31B] hover:bg-[#e6900f] text-slate-950 text-xs font-bold px-4 py-2 transition-colors cursor-pointer uppercase tracking-wider rounded-[4px]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ID Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= SUMMARY STATS BAR (Light Version, 4px rounded) ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white border border-slate-200 p-3.5 shadow-xs rounded-[4px]">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Joining Date
            </span>
            <Calendar className="w-3.5 h-3.5 text-[#116E63]" />
          </div>
          <div className="text-sm sm:text-base font-bold text-slate-900 font-mono">
            {profile.joinDate}
          </div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-1">
            Active Verified Partner
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 shadow-xs rounded-[4px]">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Personal Sales
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-[#FDA31B]" />
          </div>
          <div className="text-sm sm:text-base font-bold text-slate-900 font-mono">
            {profile.totalActiveSales} Courses
          </div>
          <div className="text-[10px] text-slate-500 font-medium mt-1">
            Direct Personal Enrollments
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 shadow-xs rounded-[4px]">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Direct Earnings
            </span>
            <Wallet className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-sm sm:text-base font-bold text-emerald-700 font-mono">
            ₹{profile.lifetimeEarnings.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-1">
            100% Active Direct Income
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 shadow-xs rounded-[4px]">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Direct Students
            </span>
            <User className="w-3.5 h-3.5 text-[#116E63]" />
          </div>
          <div className="text-sm sm:text-base font-bold text-slate-900 font-mono">
            {profile.directReferrals} Students
          </div>
          <div className="text-[10px] text-slate-500 font-medium mt-1">
            Directly Sponsored
          </div>
        </div>
      </div>

      {/* ================= EDIT INFORMATION FORM (When isEditingInfo is active) ================= */}
      {isEditingInfo && (
        <div className="bg-white border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4 rounded-[4px] animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-[#116E63]" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                Edit Member Information
              </h3>
            </div>
            <button
              onClick={() => setIsEditingInfo(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 uppercase"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSaveInfo} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={infoForm.name}
                  onChange={(e) =>
                    setInfoForm({ ...infoForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 focus:outline-none focus:border-[#116E63] font-semibold text-slate-800 rounded-[4px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Professional Title / Role
                </label>
                <input
                  type="text"
                  required
                  value={infoForm.role}
                  onChange={(e) =>
                    setInfoForm({ ...infoForm, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 focus:outline-none focus:border-[#116E63] font-semibold text-slate-800 rounded-[4px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Official Email Address
                </label>
                <input
                  type="email"
                  required
                  value={infoForm.email}
                  onChange={(e) =>
                    setInfoForm({ ...infoForm, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 focus:outline-none focus:border-[#116E63] font-mono text-xs text-slate-800 rounded-[4px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={infoForm.phone}
                  onChange={(e) =>
                    setInfoForm({ ...infoForm, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 focus:outline-none focus:border-[#116E63] font-mono text-xs text-slate-800 rounded-[4px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Enrolled Masterclass Package
                </label>
                <input
                  type="text"
                  required
                  value={infoForm.package}
                  onChange={(e) =>
                    setInfoForm({ ...infoForm, package: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 focus:outline-none focus:border-[#116E63] font-semibold text-slate-800 rounded-[4px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Joining Date (Locked)
                </label>
                <input
                  type="text"
                  disabled
                  value={profile.joinDate}
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 font-mono text-xs text-slate-500 cursor-not-allowed rounded-[4px]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Registered Residential / Communication Address
                </label>
                <textarea
                  rows={2}
                  required
                  value={infoForm.address}
                  onChange={(e) =>
                    setInfoForm({ ...infoForm, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 focus:outline-none focus:border-[#116E63] text-xs text-slate-800 rounded-[4px]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditingInfo(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold uppercase rounded-[4px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#116E63] hover:bg-[#0c5048] text-white text-xs font-bold uppercase tracking-wider rounded-[4px]"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= RANK ADVANCEMENT TRACKER ================= */}
      <div className="bg-white border border-slate-200 p-5 shadow-xs space-y-3 rounded-[4px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 border-b border-slate-200 pb-2.5">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Current Rank Level
            </span>
            <div className="text-sm font-bold text-[#116E63] uppercase flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#FDA31B]" />
              <span>{profile.rank}</span>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Next Achievement Tier
            </span>
            <div className="text-sm font-bold text-slate-900 uppercase">
              {profile.nextRank} (88% Qualified)
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="h-2 w-full bg-slate-100 overflow-hidden rounded-[4px]">
            <div
              className="h-full bg-gradient-to-r from-[#116E63] to-[#FDA31B] rounded-[4px]"
              style={{ width: `${profile.rankProgress}%` }}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 text-[11px] text-slate-600 font-medium">
            <span>
              Personal Sales: 118 / 100 Courses &bull;{" "}
              <strong className="text-emerald-700">Met</strong>
            </span>
            <span>
              Direct Active Income: ₹3.48L / ₹3.00L &bull;{" "}
              <strong className="text-emerald-700">Met</strong>
            </span>
            <span>
              Direct Students: 28 / 25 &bull;{" "}
              <strong className="text-emerald-700">Met</strong>
            </span>
          </div>
        </div>
      </div>

      {/* ================= MAIN TWO COLUMNS GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Box 1: Personal & Account Details */}
        <div className="bg-white border border-slate-200 p-5 shadow-xs space-y-4 rounded-[4px]">
          <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-[#116E63]" />
              <span>Personal &amp; Network Identification</span>
            </h3>
            <button
              onClick={() => setIsEditingInfo(!isEditingInfo)}
              className="text-xs font-bold text-[#116E63] hover:underline cursor-pointer uppercase tracking-wider flex items-center gap-1"
            >
              <Edit3 className="w-3 h-3" />
              <span>{isEditingInfo ? "Cancel" : "Edit"}</span>
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Member ID</span>
              <span className="font-mono font-bold text-slate-900">
                {profile.id}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Full Name</span>
              <span className="font-bold text-slate-900">{profile.name}</span>
            </div>

            {/* JOINING DATE FIELD */}
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#116E63]" />
                <span>Joining Date</span>
              </span>
              <span className="font-bold text-[#116E63] font-mono">
                {profile.joinDate}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Official Email</span>
              <span className="font-mono font-bold text-slate-900">
                {profile.email}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Contact Phone</span>
              <span className="font-mono font-bold text-slate-900">
                {profile.phone}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Enrolled Package</span>
              <span className="font-bold text-slate-900">
                {profile.package}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Direct Sponsor</span>
              <span className="font-bold text-slate-900">
                {profile.sponsorName} ({profile.sponsorId})
              </span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-slate-500 font-medium">
                Registered Address
              </span>
              <span className="text-slate-800 text-right max-w-xs truncate">
                {profile.address}
              </span>
            </div>
          </div>
        </div>

        {/* Box 2: Banking & Payout Settings */}
        <div className="bg-white border border-slate-200 p-5 shadow-xs space-y-4 rounded-[4px]">
          <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#116E63]" />
              <span>Banking &amp; Settlement Credentials</span>
            </h3>
            <button
              onClick={() => setIsEditingBank(!isEditingBank)}
              className="text-xs font-bold text-[#116E63] hover:underline cursor-pointer uppercase tracking-wider flex items-center gap-1"
            >
              <Edit3 className="w-3 h-3" />
              <span>{isEditingBank ? "Cancel" : "Edit Payout"}</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {/* UPI ID */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                Settlement UPI ID (Instant Payout)
              </label>
              {isEditingBank ? (
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 font-mono text-xs focus:outline-none focus:border-[#116E63] rounded-[4px]"
                />
              ) : (
                <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900 rounded-[4px]">
                  <span>{profile.upiId}</span>
                  <button
                    onClick={() => handleCopy(profile.upiId, "upi")}
                    className="text-slate-400 hover:text-[#116E63]"
                  >
                    {copiedField === "upi" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Bank Details */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                Bank Account Number (NEFT / IMPS)
              </label>
              {isEditingBank ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Bank Name (e.g. HDFC Bank Ltd)"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 font-mono text-xs focus:outline-none focus:border-[#116E63] rounded-[4px]"
                  />
                  <input
                    type="text"
                    placeholder="Account Number"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 font-mono text-xs focus:outline-none focus:border-[#116E63] rounded-[4px]"
                  />
                  <input
                    type="text"
                    placeholder="IFSC Code"
                    value={bankIfsc}
                    onChange={(e) => setBankIfsc(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 font-mono text-xs focus:outline-none focus:border-[#116E63] rounded-[4px]"
                  />
                  <button
                    onClick={handleSaveBank}
                    className="w-full py-2 bg-[#116E63] hover:bg-[#0c5048] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-[4px]"
                  >
                    Save Payout Details
                  </button>
                </div>
              ) : (
                <div className="p-2 bg-slate-50 border border-slate-200 space-y-1 rounded-[4px]">
                  <div className="flex justify-between font-mono font-bold text-slate-900">
                    <span>{profile.bankName}</span>
                    <span>IFSC: {profile.bankIfsc}</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-600">
                    Account: {profile.bankAccount}
                  </div>
                </div>
              )}
            </div>

            {/* Statutory Compliance Badges */}
            <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 border border-slate-200 bg-slate-50 rounded-[4px]">
                <span className="text-slate-500 block text-[9px] uppercase font-bold">
                  PAN Verification
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {profile.panNumber} (Linked)
                </span>
              </div>
              <div className="p-2 border border-slate-200 bg-slate-50 rounded-[4px]">
                <span className="text-slate-500 block text-[9px] uppercase font-bold">
                  Aadhaar Verification
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {profile.aadhaarNumber} (OK)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
