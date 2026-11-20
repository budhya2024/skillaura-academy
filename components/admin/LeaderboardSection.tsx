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
import TopEarnersCards from "./TopEarnersCards";

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

      {/* 3-Box Top Earners Showcase: Today's, Last 7 Days, Last 30 Days */}
      <TopEarnersCards />

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