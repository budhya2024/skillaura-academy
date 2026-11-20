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
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs rounded-[4px]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-amber-400 ring-4 ring-amber-100/70 dark:ring-amber-950/40 p-0.5 bg-white dark:bg-slate-800 shrink-0 shadow-xs">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                <Image
                  src="/images/founder.jpeg"
                  alt="SkillAura Master"
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#FDA31B] text-slate-950 p-1 rounded-full shadow-xs border-2 border-white dark:border-slate-900 flex items-center justify-center">
                <Crown className="w-3.5 h-3.5 text-slate-950" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-[4px]">
                  Rank #1 Overall
                </span>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono font-bold">
                  SKA-ROOT88
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-bold font-[family-name:var(--font-yantramanav)] uppercase text-slate-900 dark:text-white leading-tight">
                SkillAura Master
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Top Earn Money &amp; Direct Referral Performer
              </p>
            </div>
          </div>

          {/* Quick Metrics: Earn Money & Referrals */}
          <div className="w-full md:w-auto grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 rounded-[4px]">
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Earn Money
              </span>
              <span className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono block mt-0.5">
                ₹3,48,500
              </span>
            </div>
            <div className="border-l border-slate-200 dark:border-slate-700 pl-3.5">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Direct Referrals
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono block mt-0.5">
                28 Referrals
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Box Top Earners Showcase: Today's, Last 7 Days, Last 30 Days */}
      <TopEarnersCards />

      {/* Complete Leaderboard Table: SL No, Rank, Member, Referrals, Earn Amount, Growth */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden rounded-[4px]">
        <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
              Top Earners &amp; Referrals Leaderboard
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 px-2.5 py-0.5 border border-slate-200 dark:border-slate-700 rounded-[3px]">
            {MOCK_LEADERBOARD.length} Top Performers
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[640px]">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 uppercase font-bold text-[10px] sm:text-xs tracking-wider">
                <th className="py-2.5 sm:py-3 px-3 sm:px-4 w-12 sm:w-14 text-center">SL No.</th>
                <th className="py-2.5 sm:py-3 px-3 w-24 text-center">Rank</th>
                <th className="py-2.5 sm:py-3 px-3">Student / Member</th>
                <th className="py-2.5 sm:py-3 px-3 text-right">Direct Referrals</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4 text-right">Earn Amount</th>
                <th className="py-2.5 sm:py-3 px-3 text-right hidden sm:table-cell">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-800 dark:text-slate-200">
              {MOCK_LEADERBOARD.map((user, idx) => (
                <tr
                  key={user.id}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                    user.rankPosition === 1 ? "bg-amber-50/30 dark:bg-amber-950/20" : ""
                  }`}
                >
                  {/* SL No. Column */}
                  <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-center font-mono font-bold text-slate-500 dark:text-slate-400 text-xs">
                    {idx + 1}
                  </td>

                  {/* Rank Column */}
                  <td className="py-2.5 sm:py-3 px-3 text-center">
                    <span
                      className={`font-black font-mono text-[11px] sm:text-xs px-2.5 py-0.5 border rounded-[3px] inline-flex items-center justify-center ${
                        user.rankPosition === 1
                          ? "bg-[#FDA31B] text-slate-950 border-amber-600 shadow-2xs"
                          : user.rankPosition === 2
                          ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600"
                          : user.rankPosition === 3
                          ? "bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      Rank #{user.rankPosition}
                    </span>
                  </td>

                  {/* Member Column */}
                  <td className="py-2.5 sm:py-3 px-3">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 relative shrink-0 bg-slate-100 dark:bg-slate-800 shadow-2xs">
                        <Image
                          src={user.avatarImage || "/images/founder.jpeg"}
                          alt={user.name}
                          fill
                          sizes="40px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 dark:text-white leading-tight text-xs sm:text-sm truncate">
                          {user.name}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span>{user.id}</span>
                          {user.state && (
                            <>
                              <span>&bull;</span>
                              <span className="font-sans text-[10px] text-slate-400">{user.state}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Direct Referrals Column */}
                  <td className="py-2.5 sm:py-3 px-3 text-right">
                    <span className="font-bold font-mono text-slate-900 dark:text-slate-200 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-[3px] border border-slate-200 dark:border-slate-700">
                      {user.directs} <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans hidden sm:inline">Referrals</span>
                    </span>
                  </td>

                  {/* Earn Amount Column */}
                  <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-right">
                    <span className="font-mono font-black text-emerald-700 dark:text-emerald-400 text-sm sm:text-base">
                      ₹{user.totalEarnings.toLocaleString()}
                    </span>
                  </td>

                  {/* Growth Column */}
                  <td className="py-2.5 sm:py-3 px-3 text-right hidden sm:table-cell">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold font-mono text-xs bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.5 rounded-[3px]">
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