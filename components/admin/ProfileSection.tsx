"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MOCK_USER_PROFILE } from "../../lib/networkData";
import {
  KycRecord,
  getStudentKyc,
  updateStudentKycDetails,
  getKycRecords,
} from "../../lib/kycData";
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
  ShieldCheck,
  Clock,
  AlertTriangle,
  Eye,
  X,
  FileText,
  Upload,
} from "lucide-react";

export default function ProfileSection() {
  const [profile, setProfile] = useState(MOCK_USER_PROFILE);
  const [avatarUrl, setAvatarUrl] = useState("/images/founder.jpeg");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Synchronized KYC State
  const [kycData, setKycData] = useState<KycRecord | null>(null);
  const [isPreviewDocOpen, setIsPreviewDocOpen] = useState(false);
  const [previewDocUrl, setPreviewDocUrl] = useState<string | null>(null);
  const [previewDocTitle, setPreviewDocTitle] = useState<string>("");

  // Edit Mode States
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [isResubmittingKyc, setIsResubmittingKyc] = useState(false);

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

  const [resubmitDocType, setResubmitDocType] = useState<"Aadhaar Card" | "PAN Card" | "Voter ID">("Aadhaar Card");
  const [resubmitDocNumber, setResubmitDocNumber] = useState("");

  const [notification, setNotification] = useState<string | null>(null);

  const syncKycData = () => {
    const studentKyc = getStudentKyc("SKA-ROOT88");
    if (studentKyc) {
      setKycData(studentKyc);
      setProfile((prev) => ({
        ...prev,
        bankName: studentKyc.bankName,
        bankAccount: studentKyc.accountNumber,
        bankIfsc: studentKyc.ifscCode,
        upiId: studentKyc.upiId,
        aadhaarNumber: studentKyc.docType === "Aadhaar Card" ? studentKyc.docNumber : prev.aadhaarNumber,
        kycStatus:
          studentKyc.status === "verified"
            ? "Verified"
            : studentKyc.status === "rejected"
            ? "Action Required"
            : "Under Review",
      }));
      setBankForm({
        upiId: studentKyc.upiId,
        bankAccount: studentKyc.accountNumber,
        bankName: studentKyc.bankName,
        bankIfsc: studentKyc.ifscCode,
      });
      setResubmitDocNumber(studentKyc.docNumber);
    }
  };

  useEffect(() => {
    syncKycData();

    const handleUpdate = () => {
      syncKycData();
    };

    window.addEventListener("skillaura_kyc_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("skillaura_kyc_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
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

    // Synchronize directly with unified KYC registry so Super Admin sees it
    updateStudentKycDetails("SKA-ROOT88", {
      bankName: bankForm.bankName,
      accountNumber: bankForm.bankAccount,
      ifscCode: bankForm.bankIfsc,
      upiId: bankForm.upiId,
    });

    setIsEditingBank(false);
    showNotification("Payout credentials updated and synced with Super Admin KYC registry!");
  };

  const handleResubmitKyc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resubmitDocNumber.trim()) return;

    updateStudentKycDetails("SKA-ROOT88", {
      docType: resubmitDocType,
      docNumber: resubmitDocNumber.trim(),
      status: "pending",
      rejectionReason: undefined,
      submittedDate: new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    setIsResubmittingKyc(false);
    showNotification("KYC documents resubmitted! Super Admin team has been notified for verification.");
  };

  const openDocPreview = (url: string, title: string) => {
    setPreviewDocUrl(url);
    setPreviewDocTitle(title);
    setIsPreviewDocOpen(true);
  };

  const currentKycStatus = kycData?.status || "verified";

  return (
    <div className="space-y-4 font-sans max-w-5xl">
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
                {currentKycStatus === "verified" ? (
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> KYC Verified
                  </span>
                ) : currentKycStatus === "pending" ? (
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> KYC Under Review
                  </span>
                ) : (
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> KYC Action Required
                  </span>
                )}
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
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
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
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
                <span className="text-slate-500 dark:text-slate-400 font-medium">Account Holder:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {kycData?.accountHolderName || profile.name}
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Settlement Status:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active for Daily Auto-Transfer
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= CARD 3: GOVERNMENT KYC DOCUMENT VERIFICATION ================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-[family-name:var(--font-yantramanav)]">
                Government KYC &amp; Identity Verification
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Synchronized live with Super Admin Compliance Console
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentKycStatus === "verified" ? (
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Super Admin Approved
              </span>
            ) : currentKycStatus === "pending" ? (
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Verification in Progress
              </span>
            ) : (
              <button
                onClick={() => setIsResubmittingKyc(true)}
                className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline uppercase flex items-center gap-1 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" /> Re-Submit Document
              </button>
            )}
          </div>
        </div>

        {/* KYC Status Banner */}
        {currentKycStatus === "verified" ? (
          <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-900 dark:text-emerald-300">
                  Identity &amp; Bank KYC 100% Verified
                </p>
                <p className="text-emerald-700 dark:text-emerald-400/90 text-[11px] mt-0.5">
                  Verified by Super Admin Compliance on{" "}
                  <strong>{kycData?.reviewedDate || "15-Jan-2026, 12:45 PM"}</strong>. Your profile is eligible for unlimited instant withdrawals.
                </p>
              </div>
            </div>
            <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-mono shrink-0">
              KYC ID: {kycData?.id || "KYC-2026-001"}
            </div>
          </div>
        ) : currentKycStatus === "pending" ? (
          <div className="p-3 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-900 dark:text-amber-300">
                  KYC Verification Pending Review
                </p>
                <p className="text-amber-700 dark:text-amber-400/90 text-[11px] mt-0.5">
                  Submitted on <strong>{kycData?.submittedDate || "Recent"}</strong>. Verification typically completes within 12-24 business hours.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-[4px] space-y-2 text-xs">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-900 dark:text-rose-300">
                  Action Required: KYC Verification Incomplete
                </p>
                <p className="text-rose-700 dark:text-rose-400 text-[11px] mt-0.5">
                  <strong>Super Admin Note:</strong> {kycData?.rejectionReason || "Please upload a clear scan of the document with matching bank details."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Resubmit Modal / Form */}
        {isResubmittingKyc && (
          <form onSubmit={handleResubmitKyc} className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
              <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Resubmit Identity Document
              </h4>
              <button
                type="button"
                onClick={() => setIsResubmittingKyc(false)}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                  Document Type
                </label>
                <select
                  value={resubmitDocType}
                  onChange={(e) => setResubmitDocType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[4px] font-semibold text-slate-900 dark:text-white"
                >
                  <option value="Aadhaar Card">Aadhaar Card</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Voter ID">Voter ID</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase block mb-1">
                  Document Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. XXXX-XXXX-8842 or ABCDE1234F"
                  value={resubmitDocNumber}
                  onChange={(e) => setResubmitDocNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[4px] font-mono text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setIsResubmittingKyc(false)}
                className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold uppercase rounded-[4px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#116E63] hover:bg-[#0c5c53] text-white text-xs font-bold uppercase rounded-[4px] cursor-pointer"
              >
                Submit for Verification
              </button>
            </div>
          </form>
        )}

        {/* Verified Documents Detail Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-[4px] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400" />
                Primary ID ({kycData?.docType || "Aadhaar Card"})
              </span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold uppercase">
                Verified
              </span>
            </div>
            <div className="flex items-center justify-between font-mono text-slate-900 dark:text-white text-sm font-bold">
              <span>{kycData?.docNumber || profile.aadhaarNumber}</span>
              {kycData?.frontDocUrl && (
                <button
                  type="button"
                  onClick={() => openDocPreview(kycData.frontDocUrl, `${kycData.docType} (Front)`)}
                  className="text-xs text-[#116E63] dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer font-sans"
                >
                  <Eye className="w-3 h-3" /> View Scan
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Government issue verified against student identity
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-[4px] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400" />
                PAN Card Record
              </span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold uppercase">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between font-mono text-slate-900 dark:text-white text-sm font-bold">
              <span>{profile.panNumber}</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-sans font-normal">
                TDS / Compliance OK
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Income tax identification linked for tax credit certificates
            </p>
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      {isPreviewDocOpen && previewDocUrl && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-[4px] max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-900 dark:text-white font-[family-name:var(--font-yantramanav)]">
                {previewDocTitle}
              </span>
              <button
                onClick={() => setIsPreviewDocOpen(false)}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
              <div className="relative w-full h-64 rounded-[4px] overflow-hidden border border-slate-200 dark:border-slate-800">
                <Image
                  src={previewDocUrl}
                  alt={previewDocTitle}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setIsPreviewDocOpen(false)}
                className="px-4 py-1.5 bg-[#116E63] text-white text-xs font-bold uppercase rounded-[4px] cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
