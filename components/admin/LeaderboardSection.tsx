"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MOCK_LEADERBOARD,
  LeaderboardUser,
} from "../../lib/networkData";
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Users,
  Layers,
  Sparkles,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Crown,
} from "lucide-react";

export default function LeaderboardSection() {
  const [timeframe, setTimeframe] = useState<"all" | "month" | "directs">("all");
  const topThree = MOCK_LEADERBOARD.slice(0, 3);
  const remainingLeaders = MOCK_LEADERBOARD.slice(3);

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner: Your Standing (Light Version, 4px rounded, Circular Avatar) */}
      <div className="bg-white border border-slate-200 p-5 sm:p-6 shadow-xs rounded-[4px]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-amber-400 ring-4 ring-amber-100/70 p-0.5 bg-white shrink-0 shadow-xs">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-100">
                <Image
                  src="/images/founder.jpeg"
                  alt="SkillAura Master"
                  fill
                  sizes="72px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#FDA31B] text-slate-950 p-1.5 rounded-full shadow-xs border-2 border-white flex items-center justify-center">
                <Crown className="w-4 h-4 text-slate-950" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-[4px]">
                  Rank #1 Overall
                </span>
                <span className="text-xs sm:text-sm text-slate-500 font-mono font-bold">
                  SKA-ROOT88
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-yantramanav)] uppercase text-slate-900 leading-tight">
                SkillAura Master — Crown Ambassador
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Top Direct Sales &amp; Active Enrollment Performer across all branches
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto grid grid-cols-3 gap-3 bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-[4px]">
            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold block truncate">
                Total Active Income
              </span>
              <span className="text-base sm:text-xl font-black text-emerald-700 font-mono block truncate mt-0.5">
                ₹3,48,500
              </span>
            </div>
            <div className="border-l border-slate-200 pl-3">
              <span className="text-xs text-slate-500 uppercase font-semibold block truncate">
                Personal Sales
              </span>
              <span className="text-base sm:text-xl font-black text-slate-900 font-mono block truncate mt-0.5">
                118 Courses
              </span>
            </div>
            <div className="border-l border-slate-200 pl-3">
              <span className="text-xs text-slate-500 uppercase font-semibold block truncate">
                Direct Students
              </span>
              <span className="text-base sm:text-xl font-black text-slate-900 font-mono block truncate mt-0.5">
                28
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs (Horizontal Scrollable on Mobile to prevent overlap) */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 sm:px-5 pt-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setTimeframe("all")}
            className={`py-3 px-3 sm:px-5 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${timeframe === "all"
              ? "border-[#116E63] text-[#116E63]"
              : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
          >
            All-Time Champions
          </button>
          <button
            onClick={() => setTimeframe("month")}
            className={`py-3 px-3 sm:px-5 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${timeframe === "month"
              ? "border-[#116E63] text-[#116E63]"
              : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
          >
            Top Earners (This Month)
          </button>
          <button
            onClick={() => setTimeframe("directs")}
            className={`py-3 px-3 sm:px-5 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${timeframe === "directs"
              ? "border-[#116E63] text-[#116E63]"
              : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
          >
            Top Sponsors (Direct Referrals)
          </button>
        </div>

        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:block">
          Auto-updated hourly
        </span>
      </div>

      {/* Top 3 Podium Cards (4px rounded, Circular Image Avatars) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Rank 2 (Silver) */}
        {topThree[1] && (
          <div className="bg-white border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between order-2 md:order-1 rounded-[4px]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-13 h-13 rounded-full border-2 border-slate-300 ring-2 ring-slate-100 p-0.5 bg-white shrink-0 shadow-2xs">
                  <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-100">
                    <Image
                      src={topThree[1].avatarImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"}
                      alt={topThree[1].name}
                      fill
                      sizes="52px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-slate-200 text-slate-700 p-0.5 rounded-full border border-white">
                    <Medal className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                    Rank #2 (Silver Medal)
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm uppercase leading-tight mt-0.5">
                    {topThree[1].name}
                  </h4>
                  <span className="text-xs font-mono text-slate-500">
                    {topThree[1].id}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-[4px]">
                {topThree[1].rankTitle}
              </span>
            </div>

            <div className="my-4 pt-3 border-t border-slate-200 grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-slate-500 uppercase block font-semibold">
                  Active Income
                </span>
                <span className="font-black text-emerald-700 text-base font-mono">
                  ₹{topThree[1].totalEarnings.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 uppercase block font-semibold">
                  Direct Sales
                </span>
                <span className="font-black text-slate-900 text-base font-mono">
                  {topThree[1].activeSalesCount} Courses
                </span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-600 font-medium">
                {topThree[1].state}
              </span>
              <span className="text-emerald-700 font-bold">
                {topThree[1].growth}
              </span>
            </div>
          </div>
        )}

        {/* Rank 1 (Gold / Champion) */}
        {topThree[0] && (
          <div className="bg-white border-2 border-amber-300/80 p-4 sm:p-5 shadow-sm flex flex-col justify-between order-1 md:order-2 relative bg-gradient-to-b from-amber-50/40 via-white to-white rounded-[4px]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="relative w-15 h-15 rounded-full border-2 border-amber-400 ring-4 ring-amber-100 p-0.5 bg-white shrink-0 shadow-xs">
                  <div className="w-full h-full rounded-full overflow-hidden relative bg-amber-50">
                    <Image
                      src={topThree[0].avatarImage || "/images/founder.jpeg"}
                      alt={topThree[0].name}
                      fill
                      sizes="60px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-[#FDA31B] text-slate-950 p-1 rounded-full border border-white shadow-xs">
                    <Crown className="w-4 h-4 text-slate-950" />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 border border-amber-300 rounded-[4px] inline-flex items-center gap-1">
                    <Crown className="w-3 h-3 text-amber-700" /> Champion (#1)
                  </span>
                  <h4 className="font-black text-slate-950 text-base uppercase leading-tight mt-1">
                    {topThree[0].name}
                  </h4>
                  <span className="text-xs font-mono text-slate-600">
                    {topThree[0].id}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-[4px]">
                {topThree[0].rankTitle}
              </span>
            </div>

            <div className="my-4 pt-3 border-t border-slate-200 grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-slate-500 uppercase block font-semibold">
                  Active Income
                </span>
                <span className="font-black text-emerald-800 text-lg font-mono">
                  ₹{topThree[0].totalEarnings.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 uppercase block font-semibold">
                  Direct Sales
                </span>
                <span className="font-black text-slate-950 text-lg font-mono">
                  {topThree[0].activeSalesCount} Courses
                </span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-700 font-bold">
                {topThree[0].state}
              </span>
              <span className="text-emerald-700 font-black">
                {topThree[0].growth} Growth
              </span>
            </div>
          </div>
        )}

        {/* Rank 3 (Bronze) */}
        {topThree[2] && (
          <div className="bg-white border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between order-3 rounded-[4px]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-13 h-13 rounded-full border-2 border-amber-600/40 ring-2 ring-amber-100 p-0.5 bg-white shrink-0 shadow-2xs">
                  <div className="w-full h-full rounded-full overflow-hidden relative bg-amber-50">
                    <Image
                      src={topThree[2].avatarImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"}
                      alt={topThree[2].name}
                      fill
                      sizes="52px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-amber-700 text-white p-0.5 rounded-full border border-white">
                    <Medal className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                    Rank #3 (Bronze Medal)
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm uppercase leading-tight mt-0.5">
                    {topThree[2].name}
                  </h4>
                  <span className="text-xs font-mono text-slate-500">
                    {topThree[2].id}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-[4px]">
                {topThree[2].rankTitle}
              </span>
            </div>

            <div className="my-4 pt-3 border-t border-slate-200 grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-slate-500 uppercase block font-semibold">
                  Active Income
                </span>
                <span className="font-bold text-emerald-700 text-base font-mono">
                  ₹{topThree[2].totalEarnings.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 uppercase block font-semibold">
                  Direct Sales
                </span>
                <span className="font-bold text-slate-900 text-base font-mono">
                  {topThree[2].activeSalesCount} Courses
                </span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-600 font-medium">
                {topThree[2].state}
              </span>
              <span className="text-emerald-700 font-bold">
                {topThree[2].growth}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Complete Leaderboard Table (4px rounded, Circular Image Avatars) */}
      <div className="bg-white border border-slate-200 shadow-xs overflow-hidden rounded-[4px]">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
            Network Standing &amp; Direct Sales Roster (Top 8)
          </h3>
          <span className="text-xs sm:text-sm font-mono font-bold text-slate-600">
            Total Direct Sales: 480 Courses
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-xs tracking-wider">
                <th className="py-3 px-4">Standing</th>
                <th className="py-3 px-3">Partner / ID</th>
                <th className="py-3 px-3">Rank Title</th>
                <th className="py-3 px-3">Region</th>
                <th className="py-3 px-3">Directs</th>
                <th className="py-3 px-3">Direct Sales</th>
                <th className="py-3 px-3">Active Income</th>
                <th className="py-3 px-4 text-right">MoM Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              {MOCK_LEADERBOARD.map((user) => (
                <tr
                  key={user.id}
                  className={`hover:bg-slate-50 transition-colors ${user.rankPosition === 1 ? "bg-amber-50/40" : ""
                    }`}
                >
                  <td className="py-3 px-4">
                    <span
                      className={`font-black font-mono text-xs px-2.5 py-1 border rounded-[4px] inline-block ${user.rankPosition === 1
                        ? "bg-[#FDA31B] text-slate-950 border-amber-600"
                        : user.rankPosition === 2
                          ? "bg-slate-300 text-slate-900 border-slate-400"
                          : user.rankPosition === 3
                            ? "bg-amber-100 text-amber-900 border-amber-300"
                            : "bg-slate-100 text-slate-700 border-slate-300"
                        }`}
                    >
                      #{user.rankPosition}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 relative shrink-0 bg-slate-100 shadow-2xs">
                        <Image
                          src={user.avatarImage || "/images/founder.jpeg"}
                          alt={user.name}
                          fill
                          sizes="40px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 leading-tight text-sm">
                          {user.name}
                        </div>
                        <div className="text-xs font-mono text-slate-500 mt-0.5">
                          {user.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-300 uppercase rounded-[4px]">
                      {user.rankTitle}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-slate-700 font-medium text-sm">
                    {user.state}
                  </td>

                  <td className="py-3 px-3 font-bold font-mono text-slate-900 text-sm">
                    {user.directs}
                  </td>

                  <td className="py-3 px-3 font-mono text-sm">
                    <span className="font-bold text-slate-900">
                      {user.activeSalesCount} Courses
                    </span>
                  </td>

                  <td className="py-3 px-3 font-mono font-black text-emerald-700 text-sm sm:text-base">
                    ₹{user.totalEarnings.toLocaleString()}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <span className="text-emerald-700 font-bold font-mono text-xs sm:text-sm">
                      {user.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
