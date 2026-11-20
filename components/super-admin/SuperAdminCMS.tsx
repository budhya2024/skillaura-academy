"use client";

import React, { useState } from "react";
import {
  Megaphone,
  Save,
  CheckCircle2,
  Globe,
  Tag,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react";

export default function SuperAdminCMS() {
  const [topBannerText, setTopBannerText] = useState(
    "🔥 Special Launch Offer: Earn up to 70% Direct Commission on All Student Enrollments — Start Learning Today!"
  );
  const [isTopBannerActive, setIsTopBannerActive] = useState(true);
  const [activeCouponCode, setActiveCouponCode] = useState("SKILL50");
  const [discountPercent, setDiscountPercent] = useState("50");
  const [supportWhatsApp, setSupportWhatsApp] = useState("+91 91442 88641");
  const [supportEmail, setSupportEmail] = useState("skillauraacademy.in@gmail.com");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-4 font-sans max-w-4xl">
      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-[4px] flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Website configuration and banner updates saved live!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        {/* Card 1: Top Announcement Bar CMS */}
        <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-[#116E63]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-[family-name:var(--font-yantramanav)]">
                Website Top Announcement Banner
              </h3>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={isTopBannerActive}
                onChange={(e) => setIsTopBannerActive(e.target.checked)}
                className="w-4 h-4 accent-[#116E63]"
              />
              <span>Banner Active</span>
            </label>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
              Banner Headline / Announcement Text
            </label>
            <input
              type="text"
              required
              value={topBannerText}
              onChange={(e) => setTopBannerText(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-semibold text-slate-800"
            />
          </div>

          {/* Live Preview Strip */}
          <div className="p-2.5 bg-gradient-to-r from-[#116E63] to-teal-800 text-white text-xs font-semibold rounded-[4px] flex items-center justify-between">
            <span className="truncate">{topBannerText}</span>
            <span className="text-[10px] uppercase font-bold bg-white/20 px-2 py-0.5 rounded-[3px] shrink-0 ml-2">
              Preview
            </span>
          </div>
        </div>

        {/* Card 2: Promotional Discount Coupons */}
        <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <Tag className="w-4 h-4 text-[#116E63]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-[family-name:var(--font-yantramanav)]">
              Sitewide Promo Discount Vouchers
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                Active Promo Code
              </label>
              <input
                type="text"
                required
                value={activeCouponCode}
                onChange={(e) => setActiveCouponCode(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                Discount Percentage (%)
              </label>
              <input
                type="number"
                required
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono font-bold text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Support & Contact Channels */}
        <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <Globe className="w-4 h-4 text-[#116E63]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-[family-name:var(--font-yantramanav)]">
              Public Contact &amp; Support Channels
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                Official Support WhatsApp
              </label>
              <input
                type="tel"
                required
                value={supportWhatsApp}
                onChange={(e) => setSupportWhatsApp(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono text-slate-800"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                Support Email Address
              </label>
              <input
                type="email"
                required
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#116E63] hover:bg-[#0c5c53] text-white font-bold text-xs uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Publish Website Updates</span>
          </button>
        </div>
      </form>
    </div>
  );
}