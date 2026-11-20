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
  Crown,
  Users,
  Wallet,
  TrendingUp,
} from "lucide-react";

export default function LeaderboardSection() {
  const [timeframe, setTimeframe] = useState<"all" | "month" | "directs">("all");
  const topThree = MOCK_LEADERBOARD.slice(0, 3);
  const remainingLeaders = MOCK_LEADERBOARD.slice(3);

  return (
    <div className="space-y-4 font-sans">
      {/* Top Banner: Your Standing (Light Executive SaaS, 4px rounded, Circular Avatar) */}
      <div className="bg-white border border-slate-200 p-4 sm:p-5 shadow-xs rounded-[4px]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-amber-400 ring-4 ring-amber-100/70 p-0.5 bg-white shrink-0 shadow-xs">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-100">
                <Image
                  src="/images/founder.jpeg"
                  alt="SkillAura Master"
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#FDA31B] text-slate-950 p-1 rounded-full shadow-xs border-2 border-white flex items-center justify-center">
                <Crown className="w-3.5 h-3.5 text-slate-950" />
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
              <h2 className="text-base sm:text-xl font-bold font-[family-name:var(--font-yantramanav)] uppercase text-slate-900 leading-tight">
                SkillAura Master
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Top Earn Money &amp; Direct Referral Performer
              </p>
            </div>
          </div>

          {/* Quick Metrics: Earn Money & Referrals */}
          <div className="w-full md:w-auto grid grid-cols-2 gap-3 bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-[4px]">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Earn Money
              </span>
              <span className="text-xl sm:text-2xl font-black text-emerald-700 font-mono block mt-0.5">
                ₹3,48,500
              </span>
            </div>
            <div className="border-l border-slate-200 pl-3.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Direct Referrals
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono block mt-0.5">
                28 Referrals
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 sm:px-4 pt-1 overflow-x-auto scrollbar-none rounded-t-[4px]">
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setTimeframe("all")}
            className={`py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${
              timeframe === "all"
                ? "border-[#116E63] text-[#116E63]"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            All-Time Top Earners
          </button>
          <button
            onClick={() => setTimeframe("month")}
            className={`py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${
              timeframe === "month"
                ? "border-[#116E63] text-[#116E63]"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setTimeframe("directs")}
            className={`py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer shrink-0 ${
              timeframe === "directs"
                ? "border-[#116E63] text-[#116E63]"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Top Referrals
          </button>
        </div>

        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:block">
          Auto-Updated Hourly
        </span>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Rank 2 (Silver) */}
        {topThree[1] && (
          <div className="bg-white border border-slate-200 p-4 shadow-xs flex flex-col justify-between order-2 md:order-1 rounded-[4px]">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full border-2 border-slate-300 ring-2 ring-slate-100 p-0.5 bg-white shrink-0 shadow-2xs">
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-100">
                      <Image
                        src={topThree[1].avatarImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"}
                        alt={topThree[1].name}
                        fill
                        sizes="48px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-slate-200 text-slate-700 p-0.5 rounded-full border border-white">
                      <Medal className="w-3 h-3 text-slate-600" />
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                      Rank #2 &bull; Silver
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base uppercase leading-tight mt-0.5">
                      {topThree[1].name}
                    </h4>
                    <span className="text-xs font-mono text-slate-500">
                      {topThree[1].id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="my-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 bg-slate-50/70 p-2.5 sm:p-3 rounded-[4px]">
                <div>
                  <span className="text-xs text-slate-500 uppercase block font-bold">
                    Earn Money
                  </span>
                  <span className="font-black text-emerald-700 text-base sm:text-lg font-mono">
                    ₹{topThree[1].totalEarnings.toLocaleString()}
                  </span>
                </div>
                <div className="border-l border-slate-200 pl-3">
                  <span className="text-xs text-slate-500 uppercase block font-bold">
                    Referrals
                  </span>
                  <span className="font-black text-slate-900 text-base sm:text-lg font-mono">
                    {topThree[1].directs}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-500 font-medium">Monthly Growth</span>
              <span className="text-emerald-700 font-bold font-mono">{topThree[1].growth}</span>
            </div>
          </div>
        )}

        {/* Rank 1 (Gold / Champion) */}
        {topThree[0] && (
          <div className="bg-white border-2 border-amber-300/80 p-4 shadow-xs flex flex-col justify-between order-1 md:order-2 relative bg-gradient-to-b from-amber-50/40 via-white to-white rounded-[4px]">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-full border-2 border-amber-400 ring-4 ring-amber-100 p-0.5 bg-white shrink-0 shadow-xs">
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-amber-50">
                      <Image
                        src={topThree[0].avatarImage || "/images/founder.jpeg"}
                        alt={topThree[0].name}
                        fill
                        sizes="56px"
                        className="object-cover object-top"
                        priority
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 bg-[#FDA31B] text-slate-950 p-1 rounded-full border border-white shadow-xs">
                      <Crown className="w-3.5 h-3.5 text-slate-950" />
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 border border-amber-300 rounded-[4px] inline-flex items-center gap-1">
                      <Crown className="w-3.5 h-3.5 text-amber-700" /> Champion #1
                    </span>
                    <h4 className="font-black text-slate-950 text-base sm:text-lg uppercase leading-tight mt-1">
                      {topThree[0].name}
                    </h4>
                    <span className="text-xs font-mono text-slate-600">
                      {topThree[0].id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="my-3 pt-3 border-t border-amber-100 grid grid-cols-2 gap-2 bg-amber-50/50 p-2.5 sm:p-3 rounded-[4px]">
                <div>
                  <span className="text-xs text-amber-900 uppercase block font-bold">
                    Earn Money
                  </span>
                  <span className="font-black text-emerald-800 text-lg sm:text-xl font-mono">
                    ₹{topThree[0].totalEarnings.toLocaleString()}
                  </span>
                </div>
                <div className="border-l border-amber-200/70 pl-3">
                  <span className="text-xs text-amber-900 uppercase block font-bold">
                    Referrals
                  </span>
                  <span className="font-black text-slate-950 text-lg sm:text-xl font-mono">
                    {topThree[0].directs}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-600 font-medium">Monthly Growth</span>
              <span className="text-emerald-700 font-bold font-mono">{topThree[0].growth}</span>
            </div>
          </div>
        )}

        {/* Rank 3 (Bronze) */}
        {topThree[2] && (
          <div className="bg-white border border-slate-200 p-4 shadow-xs flex flex-col justify-between order-3 rounded-[4px]">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full border-2 border-amber-600/40 ring-2 ring-amber-100 p-0.5 bg-white shrink-0 shadow-2xs">
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-amber-50">
                      <Image
                        src={topThree[2].avatarImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"}
                        alt={topThree[2].name}
                        fill
                        sizes="48px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-amber-700 text-white p-0.5 rounded-full border border-white">
                      <Medal className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                      Rank #3 &bull; Bronze
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base uppercase leading-tight mt-0.5">
                      {topThree[2].name}
                    </h4>
                    <span className="text-xs font-mono text-slate-500">
                      {topThree[2].id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="my-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 bg-slate-50/70 p-2.5 sm:p-3 rounded-[4px]">
                <div>
                  <span className="text-xs text-slate-500 uppercase block font-bold">
                    Earn Money
                  </span>
                  <span className="font-bold text-emerald-700 text-base sm:text-lg font-mono">
                    ₹{topThree[2].totalEarnings.toLocaleString()}
                  </span>
                </div>
                <div className="border-l border-slate-200 pl-3">
                  <span className="text-xs text-slate-500 uppercase block font-bold">
                    Referrals
                  </span>
                  <span className="font-bold text-slate-900 text-base sm:text-lg font-mono">
                    {topThree[2].directs}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-500 font-medium">Monthly Growth</span>
              <span className="text-emerald-700 font-bold font-mono">{topThree[2].growth}</span>
            </div>
          </div>
        )}
      </div>

      {/* Complete Leaderboard Table: Rank, Member, Earn Money, Referrals */}
      <div className="bg-white border border-slate-200 shadow-xs overflow-hidden rounded-[4px]">
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              Top Earners &amp; Referrals Leaderboard
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600">
            {MOCK_LEADERBOARD.length} Top Partners
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px] sm:text-xs tracking-wider">
                <th className="py-2.5 px-3 sm:px-4 w-16">Rank</th>
                <th className="py-2.5 px-3">Member</th>
                <th className="py-2.5 px-3 text-right">Referrals</th>
                <th className="py-2.5 px-3 sm:px-4 text-right">Earn Money</th>
                <th className="py-2.5 px-3 text-right hidden sm:table-cell">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {MOCK_LEADERBOARD.map((user) => (
                <tr
                  key={user.id}
                  className={`hover:bg-slate-50 transition-colors ${
                    user.rankPosition === 1 ? "bg-amber-50/30" : ""
                  }`}
                >
                  <td className="py-2.5 px-3 sm:px-4">
                    <span
                      className={`font-black font-mono text-xs px-2 py-0.5 border rounded-[4px] inline-block ${
                        user.rankPosition === 1
                          ? "bg-[#FDA31B] text-slate-950 border-amber-600"
                          : user.rankPosition === 2
                          ? "bg-slate-300 text-slate-900 border-slate-400"
                          : user.rankPosition === 3
                          ? "bg-amber-100 text-amber-900 border-amber-300"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      #{user.rankPosition}
                    </span>
                  </td>

                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-slate-200 relative shrink-0 bg-slate-100 shadow-2xs">
                        <Image
                          src={user.avatarImage || "/images/founder.jpeg"}
                          alt={user.name}
                          fill
                          sizes="40px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 leading-tight text-xs sm:text-sm truncate">
                          {user.name}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500">
                          {user.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-right">
                    <span className="font-bold font-mono text-slate-900 text-xs sm:text-sm bg-slate-100 px-2 py-0.5 rounded-[3px] border border-slate-200">
                      {user.directs} <span className="text-[10px] text-slate-500 font-sans hidden sm:inline">Referrals</span>
                    </span>
                  </td>

                  <td className="py-2.5 px-3 sm:px-4 text-right">
                    <span className="font-mono font-black text-emerald-700 text-xs sm:text-sm">
                      ₹{user.totalEarnings.toLocaleString()}
                    </span>
                  </td>

                  <td className="py-2.5 px-3 text-right hidden sm:table-cell">
                    <span className="text-emerald-700 font-bold font-mono text-xs">
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