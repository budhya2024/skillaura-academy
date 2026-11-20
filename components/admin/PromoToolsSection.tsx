"use client";

import React, { useState } from "react";
import {
  Share2,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Award,
  Wallet,
  TrendingUp,
  Download,
  CheckCircle2,
  Zap,
  BookOpen,
} from "lucide-react";
import { FaWhatsapp, FaTelegram, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";

export interface PromoCourse {
  id: number;
  title: string;
  category: string;
  price: number;
  tier1_50: number;
  tier2_60: number;
  tier3_65: number;
  tier4_70: number;
}

export const PROMO_COURSE_COMMISSIONS: PromoCourse[] = [
  {
    id: 1,
    title: "Video Editing Mastery",
    category: "Reels & YouTube Video Editing",
    price: 4999,
    tier1_50: 2500,
    tier2_60: 3000,
    tier3_65: 3249,
    tier4_70: 3500,
  },
  {
    id: 2,
    title: "Poster & Logo Design",
    category: "Graphic & Vector Design",
    price: 3499,
    tier1_50: 1750,
    tier2_60: 2100,
    tier3_65: 2274,
    tier4_70: 2450,
  },
  {
    id: 3,
    title: "Content Creation Mastery",
    category: "Instagram & Viral Scripting",
    price: 4499,
    tier1_50: 2250,
    tier2_60: 2700,
    tier3_65: 2924,
    tier4_70: 3150,
  },
  {
    id: 4,
    title: "Knowledge Mastery",
    category: "Affiliate & Personality Growth",
    price: 3499,
    tier1_50: 1750,
    tier2_60: 2100,
    tier3_65: 2274,
    tier4_70: 2450,
  },
  {
    id: 5,
    title: "Business Mastery",
    category: "High-Ticket Client Sales",
    price: 4999,
    tier1_50: 2500,
    tier2_60: 3000,
    tier3_65: 3249,
    tier4_70: 3500,
  },
  {
    id: 6,
    title: "Facebook Ads Mastery",
    category: "Meta Ads & Performance Marketing",
    price: 3999,
    tier1_50: 2000,
    tier2_60: 2400,
    tier3_65: 2600,
    tier4_70: 2800,
  },
  {
    id: 7,
    title: "Google Ads Mastery",
    category: "Search & PMax Performance",
    price: 3999,
    tier1_50: 2000,
    tier2_60: 2400,
    tier3_65: 2600,
    tier4_70: 2800,
  },
];

export default function PromoToolsSection() {
  const referralUrl = "https://skillauraacademy.in/register?ref=SKA-ROOT88";
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSwipe, setCopiedSwipe] = useState(false);

  const promoMessage = `🔥 Learn High-Income Practical Skills with 100% Freelance Job & Client Project Support at Skill Aura Academy! Master Video Editing, Design, Content Creation, Performance Ads, & Sales. Enroll here: ${referralUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopySwipe = () => {
    navigator.clipboard.writeText(promoMessage);
    setCopiedSwipe(true);
    setTimeout(() => setCopiedSwipe(false), 2500);
  };

  return (
    <div className="space-y-5 font-sans">
      {/* ================= 1. PROMO TOOLS & SHARING CARD ================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-xs rounded-[4px]">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
              Direct Referral Links &amp; Promotional Kit
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Share your direct sponsor link to enroll students and earn 50% to 70% direct active commissions
            </p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.5 rounded-[4px]">
            Your Active Tier: 65% Direct Pay
          </span>
        </div>

        {/* Referral Link Box */}
        <div className="space-y-1.5 max-w-3xl">
          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
            Your Personalized Sponsor Link
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-50 dark:bg-slate-800/80 p-2 border border-slate-200 dark:border-slate-700 rounded-[4px]">
            <input
              type="text"
              readOnly
              value={referralUrl}
              className="bg-transparent text-xs text-slate-900 dark:text-white font-mono flex-1 min-w-0 outline-none px-2 py-1 truncate"
            />
            <button
              onClick={handleCopyLink}
              className="bg-[#116E63] hover:bg-[#0c5048] text-white text-xs font-bold px-4 py-2 transition-colors cursor-pointer uppercase flex items-center justify-center gap-1.5 rounded-[4px] shrink-0"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 1-Click Quick Social Sharing */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
            Instant 1-Click Share:
          </span>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(promoMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2 text-xs font-bold transition-opacity rounded-[4px]"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(
                referralUrl
              )}&text=${encodeURIComponent(
                "Learn in-demand skills at Skill Aura Academy!"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-[#0088cc] hover:bg-[#0077b5] text-white px-3.5 py-2 text-xs font-bold transition-opacity rounded-[4px]"
            >
              <FaTelegram className="w-4 h-4" />
              <span>Telegram</span>
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                referralUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-[#1877F2] hover:bg-[#1466d1] text-white px-3.5 py-2 text-xs font-bold transition-opacity rounded-[4px]"
            >
              <FaFacebookF className="w-3.5 h-3.5" />
              <span>Facebook</span>
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                referralUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-[#0A66C2] hover:bg-[#084e96] text-white px-3.5 py-2 text-xs font-bold transition-opacity rounded-[4px]"
            >
              <FaLinkedinIn className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <button
              onClick={handleCopySwipe}
              className="flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer rounded-[4px]"
            >
              {copiedSwipe ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Pitch Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                  <span>Copy Pitch Text</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Ready-Made High-Converting Promo Swipe Box */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[4px] space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400" />
              <span>Ready-To-Use Status / Story Pitch Message</span>
            </span>
            <button
              onClick={handleCopySwipe}
              className="text-[11px] font-bold text-[#116E63] dark:text-emerald-400 hover:underline cursor-pointer"
            >
              {copiedSwipe ? "Copied!" : "Copy Pitch"}
            </button>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-white dark:bg-slate-900 p-2.5 border border-slate-200 dark:border-slate-800 rounded-[4px] select-all">
            &ldquo;{promoMessage}&rdquo;
          </p>
        </div>
      </div>

      {/* ================= 2. ACTIVE COMMISSION CHART (Directly Under Promo Tools) ================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden rounded-[4px]">
        {/* Chart Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                Direct Active Sales Commission Chart
              </h3>
              <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider">
                100% Active Pay
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Exact rupees earned per course enrollment across all tier volumes (Credited instantly to your wallet)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded-[4px]">
              Current Rate: <strong className="text-emerald-700 dark:text-emerald-400">65% Direct</strong>
            </span>
          </div>
        </div>

        {/* Commission Table Container (Scrollable on mobile) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 uppercase font-bold text-[10px] tracking-wider">
                <th className="py-3 px-4">Masterclass Course</th>
                <th className="py-3 px-3">Price (INR)</th>
                <th className="py-3 px-3">
                  Tier 1 (50%)
                  <span className="block text-[9px] font-normal text-slate-400 dark:text-slate-500">1 - 5 Sales</span>
                </th>
                <th className="py-3 px-3">
                  Tier 2 (60%)
                  <span className="block text-[9px] font-normal text-slate-400 dark:text-slate-500">6 - 15 Sales</span>
                </th>
                <th className="py-3 px-3 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-x border-emerald-200 dark:border-emerald-800/60">
                  <div className="flex items-center gap-1">
                    <span>Tier 3 (65%)</span>
                    <span className="text-[8px] bg-emerald-600 text-white px-1 py-0.2 rounded font-black">YOU</span>
                  </div>
                  <span className="block text-[9px] font-normal text-emerald-700 dark:text-emerald-400">16 - 25 Sales</span>
                </th>
                <th className="py-3 px-4 text-right">
                  Tier 4 (70%)
                  <span className="block text-[9px] font-normal text-slate-400 dark:text-slate-500">26+ Sales (Max)</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-800 dark:text-slate-200">
              {PROMO_COURSE_COMMISSIONS.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                >
                  {/* Course Title & Category */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 dark:text-white text-xs">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      {item.category}
                    </div>
                  </td>

                  {/* Course Price */}
                  <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                    ₹{item.price.toLocaleString()}
                  </td>

                  {/* Tier 1 (50%) */}
                  <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-400">
                    ₹{item.tier1_50.toLocaleString()}
                  </td>

                  {/* Tier 2 (60%) */}
                  <td className="py-3 px-3 font-mono text-slate-700 dark:text-slate-300 font-semibold">
                    ₹{item.tier2_60.toLocaleString()}
                  </td>

                  {/* Tier 3 (65% - Current User Tier) */}
                  <td className="py-3 px-3 font-mono font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20 border-x border-emerald-100 dark:border-emerald-900/50 text-sm">
                    ₹{item.tier3_65.toLocaleString()}
                  </td>

                  {/* Tier 4 (70% - Max Tier) */}
                  <td className="py-3 px-4 font-mono font-black text-slate-900 dark:text-white text-right text-sm">
                    ₹{item.tier4_70.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Summary Note */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/70 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5 font-medium text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Commissions credit to available wallet balance immediately upon customer checkout.</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-[#116E63] dark:text-emerald-400">
            Instant UPI &amp; Bank Withdrawal: Min ₹500
          </span>
        </div>
      </div>

      {/* ================= 3. ACTIVE MILESTONE CASH BONUSES ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Milestone 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-xs rounded-[4px] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Milestone 1 (10 Sales)
            </span>
            <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 border border-emerald-200 dark:border-emerald-800/60 uppercase rounded-[4px]">
              Achieved
            </span>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
            +₹5,000 Cash
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            One-time direct active performance cash bonus credited to your wallet.
          </p>
        </div>

        {/* Milestone 2 */}
        <div className="bg-white dark:bg-slate-900 border-2 border-[#116E63] dark:border-emerald-500 p-4 shadow-xs rounded-[4px] space-y-2 relative bg-gradient-to-b from-teal-50/20 to-white dark:from-teal-950/20 dark:to-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#116E63] dark:text-emerald-400">
              Milestone 2 (25 Sales)
            </span>
            <span className="text-[9px] font-bold text-teal-800 dark:text-teal-300 bg-teal-100 dark:bg-teal-950/80 px-1.5 py-0.2 rounded-[4px] uppercase">
              18 / 25 Done
            </span>
          </div>
          <div className="text-xl font-black text-[#116E63] dark:text-emerald-400 font-mono">
            +₹15,000 Cash
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300">
            Just <strong>7 direct personal sales</strong> away from unlocking ₹15,000 cash bonus!
          </p>
        </div>

        {/* Milestone 3 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-xs rounded-[4px] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Milestone 3 (50 Sales)
            </span>
            <span className="text-[9px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded-[4px] uppercase">
              Upcoming
            </span>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
            +₹35,000 Cash
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Executive direct sales performer bonus credited directly upon 50 personal enrollments.
          </p>
        </div>
      </div>
    </div>
  );
}
