"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MOCK_USER_PROFILE } from "../../lib/networkData";
import {
  User,
  CheckCircle2,
  Camera,
  Edit3,
  Copy,
  Check,
  CreditCard,
  Building2,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Lock,
} from "lucide-react";

export default function ProfileSection() {
  const [profile, setProfile] = useState(MOCK_USER_PROFILE);
  const [avatarUrl, setAvatarUrl] = useState("/images/founder.jpeg");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Edit Mode States
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingBank, setIsEditingBank] = useState(false);

  // Forms
  const [infoForm, setInfoForm] = useState({
    name: profile.name,
    role: profile.role,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
    package: profile.package,
  });

  const [bankForm, setBankForm] = useState({
    upiId: profile.upiId,
    bankAccount: profile.bankAccount,
    bankName: profile.bankName,
    bankIfsc: profile.bankIfsc,
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarUrl(URL.createObjectURL(file));
      showNotification("Profile photo updated successfully!");
    }
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      name: infoForm.name,
      role: infoForm.role,
      address: infoForm.address,
      phone: infoForm.phone,
      package: infoForm.package,
      // Official email remains locked
      email: prev.email,
    }));
    setIsEditingInfo(false);
    showNotification("Profile details saved successfully!");
  };

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      ...bankForm,
    }));
    setIsEditingBank(false);
    showNotification("Payout credentials updated successfully!");
  };

  return (
    <div className="space-y-4 font-sans max-w-5xl">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-[4px] flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-emerald-700 hover:text-emerald-900"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. Clean Executive Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 sm:gap-4">
            {/* Avatar with Camera Overlay */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-xs relative">
                <Image
                  src={avatarUrl}
                  alt={profile.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-[#116E63] hover:bg-[#0c5c53] text-white rounded-full flex items-center justify-center cursor-pointer shadow-md border-2 border-white dark:border-slate-900 transition-transform hover:scale-110"
                title="Change Photo"
              >
                <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Core Member Identity */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.5 rounded-[4px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> KYC Verified
                </span>
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-[4px] border border-slate-200 dark:border-slate-700">
                  ID: {profile.id}
                </span>
              </div>

              <h2 className="text-base sm:text-xl font-bold uppercase text-slate-900 dark:text-white font-[family-name:var(--font-yantramanav)] leading-tight">
                {profile.name}
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {profile.role} &bull; Joined: <span className="font-semibold text-slate-700 dark:text-slate-300">{profile.joinDate}</span>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
            <button
              onClick={() => handleCopy(profile.id, "id")}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-[4px] flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copiedField === "id" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
            <button
              onClick={() => setIsEditingInfo(!isEditingInfo)}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#116E63] hover:bg-[#0c5c53] text-white rounded-[4px] flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingInfo ? "Close Editor" : "Edit Profile"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Clean Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ================= CARD 1: PERSONAL & ACCOUNT INFORMATION ================= */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-[family-name:var(--font-yantramanav)]">
                Personal &amp; Account Details
              </h3>
            </div>
            <button
              onClick={() => setIsEditingInfo(!isEditingInfo)}
              className="text-xs font-bold text-[#116E63] dark:text-emerald-400 hover:underline uppercase tracking-wider cursor-pointer"
            >
              {isEditingInfo ? "Cancel" : "Edit"}
            </button>
          </div>

          {isEditingInfo ? (
            <form onSubmit={handleSaveInfo} className="space-y-3 text-xs sm:text-sm pt-1">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={infoForm.name}
                  onChange={(e) => setInfoForm({ ...infoForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-[4px] focus:outline-none focus:border-[#116E63] font-semibold text-slate-800 dark:text-slate-100 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Official Email
                    </label>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  </div>
                  <input
                    type="email"
                    disabled
                    value={profile.email}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-mono text-xs sm:text-sm rounded-[4px] cursor-not-allowed select-none"
                    title="Official Email ID is verified and cannot be changed"
                  />
                  <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">
                    Verified email cannot be changed
                  </span>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={infoForm.phone}
                    onChange={(e) => setInfoForm({ ...infoForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-semibold"
                    placeholder="+91 91442 88641"
                  />
                  <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">
                    Used for OTP and instant payout alerts
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                  Enrolled Masterclass Package
                </label>
                <input
                  type="text"
                  required
                  value={infoForm.package}
                  onChange={(e) => setInfoForm({ ...infoForm, package: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-[4px] focus:outline-none focus:border-[#116E63] font-semibold text-slate-800 dark:text-slate-100 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                  Registered Address
                </label>
                <textarea
                  rows={2}
                  required
                  value={infoForm.address}
                  onChange={(e) => setInfoForm({ ...infoForm, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-[4px] focus:outline-none focus:border-[#116E63] text-xs sm:text-sm text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditingInfo(false)}
                  className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-bold uppercase rounded-[4px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#116E63] hover:bg-[#0c5c53] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-[4px] cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Partner ID:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{profile.id}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Full Name:</span>
                <span className="font-bold text-slate-900 dark:text-white">{profile.name}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Official Email:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-slate-800 dark:text-slate-200">{profile.email}</span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-[3px] flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                </div>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Phone / WhatsApp:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{profile.phone}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Joining Date:</span>
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{profile.joinDate}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Direct Sponsor:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {profile.sponsorName}{" "}
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">({profile.sponsorId})</span>
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Course Package:</span>
                <span className="font-bold text-slate-900 dark:text-white">{profile.package}</span>
              </div>
              <div className="py-2.5 flex items-start justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Registered Address:</span>
                <span className="text-slate-800 dark:text-slate-200 text-right max-w-xs">{profile.address}</span>
              </div>
            </div>
          )}
        </div>

        {/* ================= CARD 2: PAYOUT & BANKING SETTINGS ================= */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-[family-name:var(--font-yantramanav)]">
                Banking &amp; Settlement Details
              </h3>
            </div>
            <button
              onClick={() => setIsEditingBank(!isEditingBank)}
              className="text-xs font-bold text-[#116E63] dark:text-emerald-400 hover:underline uppercase tracking-wider cursor-pointer"
            >
              {isEditingBank ? "Cancel" : "Edit"}
            </button>
          </div>

          {isEditingBank ? (
            <form onSubmit={handleSaveBank} className="space-y-3 text-xs sm:text-sm pt-1">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                  Settlement UPI ID (Instant Payout)
                </label>
                <input
                  type="text"
                  required
                  value={bankForm.upiId}
                  onChange={(e) => setBankForm({ ...bankForm, upiId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-[4px] font-mono text-xs sm:text-sm focus:outline-none focus:border-[#116E63]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  required
                  value={bankForm.bankName}
                  onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-[4px] font-semibold text-xs sm:text-sm focus:outline-none focus:border-[#116E63]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    required
                    value={bankForm.bankAccount}
                    onChange={(e) => setBankForm({ ...bankForm, bankAccount: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-[4px] font-mono text-xs sm:text-sm focus:outline-none focus:border-[#116E63]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    required
                    value={bankForm.bankIfsc}
                    onChange={(e) => setBankForm({ ...bankForm, bankIfsc: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-[4px] font-mono text-xs sm:text-sm focus:outline-none focus:border-[#116E63]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditingBank(false)}
                  className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-bold uppercase rounded-[4px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#116E63] hover:bg-[#0c5c53] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-[4px] cursor-pointer"
                >
                  Save Payout Details
                </button>
              </div>
            </form>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 block">
                    Settlement UPI ID
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm sm:text-base mt-0.5 block">
                    {profile.upiId}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(profile.upiId, "upi")}
                  className="p-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-600 dark:text-slate-300 hover:text-[#116E63] cursor-pointer"
                  title="Copy UPI"
                >
                  {copiedField === "upi" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Bank Name:</span>
                <span className="font-bold text-slate-900 dark:text-white">{profile.bankName}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Account Number:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{profile.bankAccount}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">IFSC Code:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{profile.bankIfsc}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">PAN Verification:</span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-[4px] border border-emerald-200 dark:border-emerald-800/60 text-xs">
                  {profile.panNumber} (Verified)
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Aadhaar Status:</span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-[4px] border border-emerald-200 dark:border-emerald-800/60 text-xs">
                  {profile.aadhaarNumber} (Verified)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
