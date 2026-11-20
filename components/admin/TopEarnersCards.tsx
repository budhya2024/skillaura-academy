"use client";

import React from "react";
import Image from "next/image";

export interface TopEarnerItem {
  rank: number;
  name: string;
  avatar: string;
  earnings: number;
}

export interface TopEarnersBox {
  timeframe: string;
  dateRange: string;
  top3: TopEarnerItem[]; // Expected in order: Rank 2 (Left), Rank 1 (Center), Rank 3 (Right)
  remaining: TopEarnerItem[]; // Ranks 4, 5
}

export const TOP_EARNERS_DATA: TopEarnersBox[] = [
  {
    timeframe: "TODAY'S",
    dateRange: "(20-Nov-2026)",
    top3: [
      {
        rank: 2,
        name: "HIMANSHU",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        earnings: 3250,
      },
      {
        rank: 1,
        name: "Hemraj",
        avatar: "/images/founder.jpeg",
        earnings: 6500,
      },
      {
        rank: 3,
        name: "Priya",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        earnings: 2100,
      },
    ],
    remaining: [
      {
        rank: 4,
        name: "Alka Singh",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
        earnings: 1450,
      },
      {
        rank: 5,
        name: "Fatima",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
        earnings: 1010,
      },
    ],
  },
  {
    timeframe: "LAST 7 DAY'S",
    dateRange: "(14-Nov-2026 - 20-Nov-2026)",
    top3: [
      {
        rank: 2,
        name: "Shania",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        earnings: 18700,
      },
      {
        rank: 1,
        name: "Ishrat",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
        earnings: 28400,
      },
      {
        rank: 3,
        name: "Ankit (TG)",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
        earnings: 15300,
      },
    ],
    remaining: [
      {
        rank: 4,
        name: "Alka Singh",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
        earnings: 11400,
      },
      {
        rank: 5,
        name: "Fatima",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
        earnings: 10100,
      },
    ],
  },
  {
    timeframe: "LAST 30 DAY'S",
    dateRange: "(21-Oct-2026 - 20-Nov-2026)",
    top3: [
      {
        rank: 2,
        name: "Shania",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        earnings: 62400,
      },
      {
        rank: 1,
        name: "Ishrat",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
        earnings: 84500,
      },
      {
        rank: 3,
        name: "Shahid",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
        earnings: 54000,
      },
    ],
    remaining: [
      {
        rank: 4,
        name: "MALAIK",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        earnings: 39400,
      },
      {
        rank: 5,
        name: "Hadiya",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
        earnings: 39100,
      },
    ],
  },
];

function RealisticCrown({ tier }: { tier: "gold" | "silver" | "bronze" }) {
  if (tier === "gold") {
    return (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 mx-auto -mb-1 drop-shadow-xs"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2.5 19.5h19v2h-19z" fill="#B45309" />
        <path
          d="M3 19l2-11 4.5 5 2.5-9 2.5 9 4.5-5 2 11H3z"
          fill="url(#gold-crown)"
          stroke="#B45309"
          strokeWidth="0.8"
        />
        <circle cx="3" cy="8" r="1.3" fill="#FEF08A" stroke="#B45309" strokeWidth="0.5" />
        <circle cx="9.5" cy="13" r="1.1" fill="#FEF08A" stroke="#B45309" strokeWidth="0.5" />
        <circle cx="12" cy="4" r="1.5" fill="#FEF08A" stroke="#B45309" strokeWidth="0.5" />
        <circle cx="14.5" cy="13" r="1.1" fill="#FEF08A" stroke="#B45309" strokeWidth="0.5" />
        <circle cx="21" cy="8" r="1.3" fill="#FEF08A" stroke="#B45309" strokeWidth="0.5" />
        <defs>
          <linearGradient id="gold-crown" x1="3" y1="4" x2="21" y2="19.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE047" />
            <stop offset="0.5" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (tier === "silver") {
    return (
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7 mx-auto -mb-1 drop-shadow-xs"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3.5 19.5h17v2h-17z" fill="#475569" />
        <path
          d="M4 19l1.8-10 4 4.5 2.2-8 2.2 8 4-4.5 1.8 10H4z"
          fill="url(#silver-crown)"
          stroke="#475569"
          strokeWidth="0.8"
        />
        <circle cx="4" cy="9.5" r="1.2" fill="#F8FAFC" stroke="#64748B" strokeWidth="0.5" />
        <circle cx="9.8" cy="13.5" r="1" fill="#F8FAFC" stroke="#64748B" strokeWidth="0.5" />
        <circle cx="12" cy="5.5" r="1.4" fill="#F8FAFC" stroke="#64748B" strokeWidth="0.5" />
        <circle cx="14.2" cy="13.5" r="1" fill="#F8FAFC" stroke="#64748B" strokeWidth="0.5" />
        <circle cx="20" cy="9.5" r="1.2" fill="#F8FAFC" stroke="#64748B" strokeWidth="0.5" />
        <defs>
          <linearGradient id="silver-crown" x1="4" y1="5.5" x2="20" y2="19.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F8FAFC" />
            <stop offset="0.5" stopColor="#CBD5E1" />
            <stop offset="1" stopColor="#94A3B8" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      className="w-6 h-6 sm:w-7 sm:h-7 mx-auto -mb-1 drop-shadow-xs"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.5 19.5h17v2h-17z" fill="#78350F" />
      <path
        d="M4 19l1.8-10 4 4.5 2.2-8 2.2 8 4-4.5 1.8 10H4z"
        fill="url(#bronze-crown)"
        stroke="#78350F"
        strokeWidth="0.8"
      />
      <circle cx="4" cy="9.5" r="1.2" fill="#FED7AA" stroke="#92400E" strokeWidth="0.5" />
      <circle cx="9.8" cy="13.5" r="1" fill="#FED7AA" stroke="#92400E" strokeWidth="0.5" />
      <circle cx="12" cy="5.5" r="1.4" fill="#FED7AA" stroke="#92400E" strokeWidth="0.5" />
      <circle cx="14.2" cy="13.5" r="1" fill="#FED7AA" stroke="#92400E" strokeWidth="0.5" />
      <circle cx="20" cy="9.5" r="1.2" fill="#FED7AA" stroke="#92400E" strokeWidth="0.5" />
      <defs>
        <linearGradient id="bronze-crown" x1="4" y1="5.5" x2="20" y2="19.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDBA74" />
          <stop offset="0.5" stopColor="#EA580C" />
          <stop offset="1" stopColor="#9A3412" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function TopEarnersCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {TOP_EARNERS_DATA.map((box, bIdx) => {
        // Order: Left = Rank 2, Center = Rank 1, Right = Rank 3
        const rank2 = box.top3.find((u) => u.rank === 2) || box.top3[0];
        const rank1 = box.top3.find((u) => u.rank === 1) || box.top3[1];
        const rank3 = box.top3.find((u) => u.rank === 3) || box.top3[2];

        return (
          <div
            key={bIdx}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[6px] p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-shadow hover:shadow-md"
          >
            <div>
              {/* Box Header (Centered) */}
              <div className="text-center pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs sm:text-sm font-black tracking-widest text-slate-900 dark:text-white uppercase font-[family-name:var(--font-yantramanav)]">
                  Top Earners
                </h3>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#116E63] dark:text-emerald-400 mt-0.5">
                  {box.timeframe}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                  {box.dateRange}
                </div>
              </div>

              {/* Podium: Rank 2 (Left) | Rank 1 (Center) | Rank 3 (Right) */}
              <div className="grid grid-cols-3 gap-2 items-end pt-5 pb-3">
                {/* RANK 2 (Left) */}
                {rank2 && (
                  <div className="flex flex-col items-center text-center">
                    <RealisticCrown tier="silver" />
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-xs">
                      <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                        <Image
                          src={rank2.avatar}
                          alt={rank2.name}
                          fill
                          sizes="64px"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                    {/* Rank Badge */}
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-black text-[11px] sm:text-xs border-2 border-white dark:border-slate-900 flex items-center justify-center -mt-2.5 z-10 shadow-2xs">
                      2
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate w-full mt-1 px-1">
                      {rank2.name}
                    </div>
                    {/* Earnings Pill */}
                    <div className="mt-1 px-2.5 py-0.5 rounded-[4px] bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 font-mono font-bold text-xs sm:text-sm shadow-2xs">
                      ₹{rank2.earnings.toLocaleString()}
                    </div>
                  </div>
                )}

                {/* RANK 1 (Center - Elevated & Larger) */}
                {rank1 && (
                  <div className="flex flex-col items-center text-center -mt-3">
                    <RealisticCrown tier="gold" />
                    <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full p-0.5 border-2 border-amber-400 ring-4 ring-amber-100/80 dark:ring-amber-950/40 bg-white dark:bg-slate-800 shadow-md">
                      <div className="w-full h-full rounded-full overflow-hidden relative bg-amber-50 dark:bg-amber-950/30">
                        <Image
                          src={rank1.avatar}
                          alt={rank1.name}
                          fill
                          sizes="80px"
                          className="object-cover object-top"
                          priority
                        />
                      </div>
                    </div>
                    {/* Rank Badge */}
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FDA31B] text-slate-950 font-black text-xs sm:text-sm border-2 border-white dark:border-slate-900 flex items-center justify-center -mt-3 z-10 shadow-xs">
                      1
                    </div>
                    <div className="font-black text-sm sm:text-base text-slate-950 dark:text-white truncate w-full mt-1 px-1">
                      {rank1.name}
                    </div>
                    {/* Earnings Pill */}
                    <div className="mt-1 px-3 py-0.5 sm:py-1 rounded-[4px] bg-emerald-100/90 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 font-mono font-black text-xs sm:text-sm shadow-2xs">
                      ₹{rank1.earnings.toLocaleString()}
                    </div>
                  </div>
                )}

                {/* RANK 3 (Right) */}
                {rank3 && (
                  <div className="flex flex-col items-center text-center">
                    <RealisticCrown tier="bronze" />
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border-2 border-amber-600/50 dark:border-amber-700/60 bg-white dark:bg-slate-800 shadow-xs">
                      <div className="w-full h-full rounded-full overflow-hidden relative bg-amber-50 dark:bg-amber-950/30">
                        <Image
                          src={rank3.avatar}
                          alt={rank3.name}
                          fill
                          sizes="64px"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                    {/* Rank Badge */}
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-black text-[11px] sm:text-xs border-2 border-white dark:border-slate-900 flex items-center justify-center -mt-2.5 z-10 shadow-2xs">
                      3
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate w-full mt-1 px-1">
                      {rank3.name}
                    </div>
                    {/* Earnings Pill */}
                    <div className="mt-1 px-2.5 py-0.5 rounded-[4px] bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 font-mono font-bold text-xs sm:text-sm shadow-2xs">
                      ₹{rank3.earnings.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom List: Ranks 4, 5 */}
            {box.remaining && box.remaining.length > 0 && (
              <div className="border-t border-slate-100 dark:border-slate-800/80 mt-3 pt-2.5 space-y-1">
                {box.remaining.map((user) => (
                  <div
                    key={user.rank}
                    className="flex items-center justify-between p-2 rounded-[4px] hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono font-bold text-xs sm:text-sm text-slate-400 dark:text-slate-500 w-4 text-center shrink-0">
                        {user.rank}
                      </span>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden relative border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-800">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          fill
                          sizes="32px"
                          className="object-cover object-top"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                        {user.name}
                      </span>
                    </div>

                    <span className="font-mono font-black text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-[4px] shrink-0">
                      ₹{user.earnings.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
